import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import { build } from "esbuild";

ed.etc.sha512Sync = (...messages) => sha512(ed.etc.concatBytes(...messages));
const INTERNAL_TEST_PRIVATE_KEY = Uint8Array.from(
  { length: 32 },
  (_, index) => index + 1,
);
const INTERNAL_TEST_PUBLIC_KEY = ed.etc.bytesToHex(
  ed.getPublicKey(INTERNAL_TEST_PRIVATE_KEY),
);

async function importBundled(entryPoint) {
  const outfile = path.join(
    os.tmpdir(),
    `medexia-${path.basename(entryPoint).replace(/\W/g, "-")}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.mjs`,
  );
  await build({
    entryPoints: [path.resolve(entryPoint)],
    outfile,
    bundle: true,
    format: "esm",
    platform: "browser",
    logLevel: "silent",
  });
  return import(`${pathToFileURL(outfile).href}?v=${Date.now()}`);
}

const {
  MARKETING_STORAGE_KEYS,
  OFFER_IDS,
  attributionForEvent,
  canonicalizeCampaignLabel,
  determineOfferContext,
  getMarketingSnapshot,
  initMarketingAttribution,
  isInternalTestTraffic,
  normalizeReferralCode,
} = await importBundled("src/lib/marketing/attribution.ts");
const { getPricingFaqs } = await importBundled("src/data/product-positioning.ts");
const {
  appHandoffEventHref,
  buildAppFallbackUrl,
  buildAppHydrationUrl,
  buildAppUrl,
  getAppHandoffConsentSignature,
} = await importBundled("src/lib/marketing/url.ts");
const {
  PROMO_APP_JOIN_URL,
  PROMO_QUERY_SESSION_STORAGE_KEY,
  capturePromoPassThroughQuery,
} = await importBundled("src/lib/marketing/promo-pass-through.ts");
const {
  TRIAL_APP_JOIN_URL,
  TRIAL_CODE_SESSION_STORAGE_KEY,
  buildTrialAppUrl,
  captureTrialCode,
  validateTrialCode,
} = await importBundled("src/lib/marketing/trial-pass-through.ts");
const {
  REFERRAL_CODE_SESSION_STORAGE_KEY,
  REFERRAL_FREE_APP_JOIN_URL,
  REFERRAL_FULL_ACCESS_APP_JOIN_URL,
  REFERRAL_VALIDATION_URL,
  buildReferralAppUrl,
  captureReferralCode,
  validateReferralCode,
} = await importBundled("src/lib/marketing/referral-pass-through.ts");
const {
  REFERRAL_OG_DESCRIPTION,
  REFERRAL_OG_IMAGE_URL,
  REFERRAL_OG_TITLE,
  buildReferralShareUrl,
  isReferralLandingRequest,
} = await importBundled("src/lib/marketing/referral-og.ts");
const {
  CONSENT_STORAGE_KEY,
  acceptAllConsent,
  rejectAllConsent,
  saveConsent,
} = await importBundled("src/lib/consent/consent.ts");
const { flushLandingEvent, trackLandingEvent } = await importBundled("src/lib/marketing/events.ts");
const { maybeLoadMarketingPixels } = await importBundled("src/lib/marketing/pixels.ts");
const { verifyInternalTestToken } = await importBundled(
  "src/lib/marketing/internal-test-token.ts",
);

function setReferralFlags(enabled) {
  process.env.NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED = enabled ? "true" : "false";
  process.env.NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED = enabled ? "true" : "false";
}

function storageMock() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
    clear: () => values.clear(),
    values,
  };
}

function installBrowser(url, referrer = "", existingSessionStorage = null) {
  const localStorage = storageMock();
  const sessionStorage = existingSessionStorage ?? storageMock();
  const cookies = new Map();
  const scripts = [];
  const listeners = new Map();
  const location = new URL(url);

  const windowMock = {
    location,
    localStorage,
    sessionStorage,
    addEventListener: (event, handler) => {
      const handlers = listeners.get(event) || [];
      handlers.push(handler);
      listeners.set(event, handlers);
    },
    removeEventListener: (event, handler) => {
      const handlers = listeners.get(event) || [];
      listeners.set(event, handlers.filter((candidate) => candidate !== handler));
    },
    dispatchEvent: (event) => {
      const handlers = listeners.get(event.type) || [];
      handlers.forEach((handler) => handler(event));
      return true;
    },
  };

  const documentMock = {
    referrer,
    head: {
      appendChild: (script) => {
        scripts.push(script);
      },
    },
    createElement: (tag) => ({ tagName: tag.toUpperCase(), async: false, id: "", src: "" }),
    getElementById: (id) => scripts.find((script) => script.id === id) || null,
  };
  Object.defineProperty(documentMock, "cookie", {
    get() {
      return Array.from(cookies.entries())
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("; ");
    },
    set(value) {
      const [pair, ...attributes] = String(value).split(";");
      const [rawKey, rawValue = ""] = pair.split("=");
      const key = rawKey.trim();
      const maxAge = attributes.find((attr) => attr.trim().toLowerCase().startsWith("max-age="));
      if (maxAge && maxAge.includes("0")) {
        cookies.delete(key);
      } else {
        cookies.set(key, decodeURIComponent(rawValue));
      }
    },
  });

  const sendBeaconCalls = [];
  const fetchCalls = [];
  Object.defineProperty(globalThis, "window", { value: windowMock, configurable: true });
  Object.defineProperty(globalThis, "document", { value: documentMock, configurable: true });
  Object.defineProperty(globalThis, "navigator", {
    value: {
      userAgent: "Mozilla/5.0 Test Browser",
      sendBeacon: (endpoint, body) => {
        sendBeaconCalls.push({ endpoint, body });
        return true;
      },
    },
    configurable: true,
  });
  Object.defineProperty(globalThis, "fetch", {
    value: (endpoint, options) => {
      fetchCalls.push({ endpoint, options });
      return Promise.resolve({ ok: true });
    },
    configurable: true,
  });
  if (typeof globalThis.CustomEvent === "undefined") {
    Object.defineProperty(globalThis, "CustomEvent", {
      value: class CustomEvent extends Event {
        constructor(type, init = {}) {
          super(type);
          this.detail = init.detail;
        }
      },
      configurable: true,
    });
  }

  return { localStorage, sessionStorage, cookies, scripts, sendBeaconCalls, fetchCalls };
}

function resetTrackingEnv() {
  process.env.NEXT_PUBLIC_APP_BASE_URL = "https://app.medexia-akt.com";
  process.env.NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT = "https://app.medexia-akt.com/api/marketing/events";
  process.env.NEXT_PUBLIC_ENABLE_MARKETING_PIXELS = "false";
  process.env.NEXT_PUBLIC_META_PIXEL_ID = "";
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "";
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = "";
  process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID = "";
  process.env.NEXT_PUBLIC_CONSENT_BANNER_ENABLED = "true";
  process.env.NEXT_PUBLIC_CONSENT_VERSION = "2026-06-23-v1";
  process.env.NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY = "";
}

async function parseBeaconPayload(call) {
  const body = call.body;
  if (body && typeof body.text === "function") {
    return JSON.parse(await body.text());
  }
  return JSON.parse(String(body));
}

async function parseFetchPayload(call) {
  const body = call.options.body;
  if (body && typeof body.text === "function") {
    return JSON.parse(await body.text());
  }
  return JSON.parse(String(body));
}

function fullyDecode(value) {
  let decoded = value;
  for (let depth = 0; depth < 3; depth += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return decoded;
}

function makeInternalTestToken(lifetimeSeconds = 1800) {
  const expiresAt = Math.floor(Date.now() / 1000) + lifetimeSeconds;
  const payload = `v1.${expiresAt}`;
  const signature = Buffer.from(
    ed.sign(
      new TextEncoder().encode(payload),
      INTERNAL_TEST_PRIVATE_KEY,
    ),
  ).toString("base64url");
  return `${payload}.${signature}`;
}

test("app url fallback targets the deployed Replit app domain", () => {
  resetTrackingEnv();
  delete process.env.NEXT_PUBLIC_APP_BASE_URL;
  installBrowser("https://landing.medexia-akt.com/");

  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(appUrl.origin, "https://app.medexia-akt.com");
  assert.equal(appUrl.pathname, "/join/free");
});

test("trial link routes signup CTAs only after the code has been validated", async () => {
  resetTrackingEnv();
  const browser = installBrowser(
    "https://medexia-akt.com/?trial_code=TRIAL-RM7FAA&utm_source=mid_wessex",
  );
  const code = captureTrialCode();
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ valid: true, trialDays: 14, label: "Thames Valley" }),
  });

  const unvalidatedUrl = new URL(
    buildAppUrl("/join/free", { intent: "start_free" }),
  );
  assert.equal(unvalidatedUrl.pathname, "/join/free");
  assert.equal(unvalidatedUrl.searchParams.has("code"), false);

  const validation = await validateTrialCode(code);
  assert.deepEqual(validation, {
    valid: true,
    trialDays: 14,
    label: "Thames Valley",
  });

  assert.equal(
    buildAppUrl("/join/free", {
      intent: "start_free",
      validatedTrialCode: validation ? code : null,
    }),
    `${TRIAL_APP_JOIN_URL}?code=TRIAL-RM7FAA`,
  );
  assert.equal(
    buildTrialAppUrl(code),
    `${TRIAL_APP_JOIN_URL}?code=TRIAL-RM7FAA`,
  );
  assert.equal(
    browser.sessionStorage.getItem(TRIAL_CODE_SESSION_STORAGE_KEY),
    "TRIAL-RM7FAA",
  );
  assert.equal(
    new URL(buildAppHydrationUrl("/join/free", { intent: "start_free" })).pathname,
    "/join/free",
  );
});

test("trial link does not hijack login, demo, or existing-user app CTAs", () => {
  resetTrackingEnv();
  installBrowser("https://medexia-akt.com/?trial_code=TRIAL-RM7FAA");
  const trialOptions = { validatedTrialCode: "TRIAL-RM7FAA" };

  assert.equal(
    new URL(buildAppUrl("/login", { intent: "login", ...trialOptions })).pathname,
    "/login",
  );
  assert.equal(
    new URL(buildAppUrl("/demo", { intent: "demo", ...trialOptions })).pathname,
    "/demo",
  );
  assert.equal(
    new URL(buildAppUrl("/library", { intent: "app_open", ...trialOptions })).pathname,
    "/library",
  );
});

test("trial code survives client navigation but not a fresh clean page load", () => {
  resetTrackingEnv();
  const linkedVisit = installBrowser(
    "https://medexia-akt.com/?trial_code=TRIAL-RM7FAA",
  );
  captureTrialCode();
  window.location = new URL("https://medexia-akt.com/akt-audio-revision");

  assert.equal(
    buildAppUrl("/join/audio", {
      intent: "start_audio",
      validatedTrialCode: captureTrialCode(),
    }),
    `${TRIAL_APP_JOIN_URL}?code=TRIAL-RM7FAA`,
  );

  const cleanVisit = installBrowser(
    "https://medexia-akt.com/akt-audio-revision",
    "",
    linkedVisit.sessionStorage,
  );
  assert.equal(captureTrialCode(), null);
  const normalUrl = new URL(buildAppUrl("/join/audio", { intent: "start_audio" }));

  assert.equal(cleanVisit.sessionStorage.getItem(TRIAL_CODE_SESSION_STORAGE_KEY), null);
  assert.equal(normalUrl.pathname, "/join/audio");
  assert.equal(normalUrl.searchParams.has("code"), false);
});

test("trial code survives a same-site full document navigation", () => {
  resetTrackingEnv();
  const linkedVisit = installBrowser(
    "https://medexia-akt.com/?trial_code=TRIAL-RM7FAA",
  );
  assert.equal(captureTrialCode(), "TRIAL-RM7FAA");

  const nextDocument = installBrowser(
    "https://medexia-akt.com/akt-audio-revision",
    "https://medexia-akt.com/",
    linkedVisit.sessionStorage,
  );

  assert.equal(captureTrialCode(), "TRIAL-RM7FAA");
  assert.equal(
    nextDocument.sessionStorage.getItem(TRIAL_CODE_SESSION_STORAGE_KEY),
    "TRIAL-RM7FAA",
  );
});

test("trial code is treated as opaque when constructing the app URL", () => {
  resetTrackingEnv();
  installBrowser("https://medexia-akt.com/?trial_code=Trial%2BRM%2F7");
  const code = captureTrialCode();

  assert.equal(
    buildAppUrl("/join/free", {
      intent: "start_free",
      validatedTrialCode: code,
    }),
    `${TRIAL_APP_JOIN_URL}?code=Trial%2BRM%2F7`,
  );
});

test("trial validation accepts only a well-formed live trial response", async () => {
  resetTrackingEnv();
  installBrowser("https://medexia-akt.com/?trial_code=TRIAL-RM7FAA");
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      json: async () => ({ valid: true, trialDays: 14, label: "Thames Valley" }),
    };
  };

  assert.deepEqual(await validateTrialCode("TRIAL-RM7FAA"), {
    valid: true,
    trialDays: 14,
    label: "Thames Valley",
  });
  assert.equal(calls[0].url, "/api/trial/validate/TRIAL-RM7FAA");
  assert.equal(calls[0].options.cache, "no-store");
});

test("invalid or malformed trial validation never produces a banner payload", async () => {
  resetTrackingEnv();
  installBrowser("https://medexia-akt.com/?trial_code=EXPIRED");
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ valid: false, trialDays: 14, label: "Mid-Wessex Committee" }),
  });

  const invalidValidation = await validateTrialCode("EXPIRED");
  assert.equal(invalidValidation, null);

  const invalidUrl = new URL(
    buildAppUrl("/join/free", {
      intent: "start_free",
      validatedTrialCode: invalidValidation ? "EXPIRED" : null,
    }),
  );
  assert.equal(invalidUrl.pathname, "/join/free");
  assert.equal(invalidUrl.searchParams.has("code"), false);

  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ valid: true, trialDays: 0, label: "" }),
  });
  assert.equal(await validateTrialCode("MALFORMED"), null);
});

test("trial banner is globally mounted and uses validated duration and label", () => {
  const provider = fs.readFileSync(
    "src/components/marketing/MarketingAttributionProvider.tsx",
    "utf8",
  );
  const banner = fs.readFileSync(
    "src/components/marketing/TrialOfferBanner.tsx",
    "utf8",
  );
  const proxy = fs.readFileSync(
    "src/app/api/trial/validate/[code]/route.ts",
    "utf8",
  );
  const trackedLink = fs.readFileSync(
    "src/components/marketing/TrackedAppLink.tsx",
    "utf8",
  );

  assert.match(
    provider,
    /<TrialOfferProvider>[\s\S]*<TrialOfferBanner\s*\/>[\s\S]*\{children\}[\s\S]*<\/TrialOfferProvider>/,
  );
  assert.match(
    banner,
    /setValidatedOffer\(result \? \{ \.\.\.result, code: capturedCode \} : null\)/,
  );
  assert.match(banner, /setValidationSettled\(true\)/);
  assert.match(banner, /\{trial\.label\} trial applied/);
  assert.match(banner, /start your \{trial\.trialDays\}-day free trial/);
  assert.match(proxy, /app\.medexia-akt\.com\/api\/trial\/validate/);
  assert.match(proxy, /cache:\s*"no-store"/);
  assert.match(trackedLink, /useState\(\(\) =>\s*buildAppHydrationUrl/);
  assert.match(trackedLink, /validatedTrialCode:\s*trialOffer\?\.code/);
});

test("referral link is held for the session and routes signup and purchase CTAs only to supported app paths", () => {
  resetTrackingEnv();
  const browser = installBrowser(
    "https://medexia-akt.com/?ref=COLLEAGUE%2BCODE&utm_source=whatsapp",
  );

  assert.equal(captureReferralCode(), "COLLEAGUE+CODE");
  assert.equal(
    browser.sessionStorage.getItem(REFERRAL_CODE_SESSION_STORAGE_KEY),
    "COLLEAGUE+CODE",
  );

  const freeUrl = new URL(
    buildAppUrl("/join/audio", { intent: "start_audio" }),
  );
  assert.equal(freeUrl.origin + freeUrl.pathname, REFERRAL_FREE_APP_JOIN_URL);
  assert.equal(freeUrl.searchParams.get("referral_code"), "COLLEAGUE+CODE");
  assert.deepEqual(Array.from(freeUrl.searchParams.keys()), ["referral_code"]);

  const fullAccessUrl = new URL(
    buildAppUrl("/join/full-access", { intent: "checkout" }),
  );
  assert.equal(
    fullAccessUrl.origin + fullAccessUrl.pathname,
    REFERRAL_FULL_ACCESS_APP_JOIN_URL,
  );
  assert.equal(
    fullAccessUrl.searchParams.get("referral_code"),
    "COLLEAGUE+CODE",
  );
  assert.deepEqual(Array.from(fullAccessUrl.searchParams.keys()), ["referral_code"]);

  assert.equal(
    buildReferralAppUrl("COLLEAGUE+CODE", "/join/free", "start_free"),
    `${REFERRAL_FREE_APP_JOIN_URL}?referral_code=COLLEAGUE%2BCODE`,
  );
});

test("referral survives landing-page loads for the session and a later explicit referral replaces it", () => {
  resetTrackingEnv();
  const firstVisit = installBrowser("https://medexia-akt.com/?ref=FIRST-CODE");
  assert.equal(captureReferralCode(), "FIRST-CODE");

  const nextPage = installBrowser(
    "https://medexia-akt.com/akt-audio-revision",
    "https://medexia-akt.com/",
    firstVisit.sessionStorage,
  );
  assert.equal(captureReferralCode(), "FIRST-CODE");
  assert.equal(
    new URL(buildAppUrl("/join/free", { intent: "start_free" })).searchParams.get(
      "referral_code",
    ),
    "FIRST-CODE",
  );

  window.location = new URL("https://medexia-akt.com/?ref=SECOND-CODE");
  assert.equal(captureReferralCode(), "SECOND-CODE");
  assert.equal(
    nextPage.sessionStorage.getItem(REFERRAL_CODE_SESSION_STORAGE_KEY),
    "SECOND-CODE",
  );
});

test("referral does not invent a code and does not hijack login, demo, or existing-user CTAs", () => {
  resetTrackingEnv();
  const cleanVisit = installBrowser("https://medexia-akt.com/?utm_source=google");
  assert.equal(captureReferralCode(), null);
  assert.equal(
    cleanVisit.sessionStorage.getItem(REFERRAL_CODE_SESSION_STORAGE_KEY),
    null,
  );

  window.location = new URL("https://medexia-akt.com/?ref=REF123");
  captureReferralCode();
  for (const [path, intent] of [
    ["/login", "login"],
    ["/demo", "demo"],
    ["/library", "app_open"],
  ]) {
    const url = new URL(buildAppUrl(path, { intent }));
    assert.equal(url.pathname, path);
    assert.equal(url.searchParams.has("referral_code"), false);
    assert.equal(url.searchParams.has("ref"), false);
  }
});

test("referral validation accepts only a well-formed live pricing response", async () => {
  resetTrackingEnv();
  installBrowser("https://medexia-akt.com/?ref=REF%2F123");
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      json: async () => ({
        valid: true,
        friendPricePence: 6900,
        standardPricePence: 7900,
        sprintEndsAt: "2026-11-01T00:00:00.000Z",
      }),
    };
  };

  assert.deepEqual(await validateReferralCode("REF/123"), {
    valid: true,
    friendPricePence: 6900,
    standardPricePence: 7900,
    sprintEndsAt: "2026-11-01T00:00:00.000Z",
  });
  assert.equal(calls[0].url, `${REFERRAL_VALIDATION_URL}/REF%2F123`);
  assert.equal(calls[0].options.cache, "no-store");
  assert.equal(calls[0].options.credentials, "omit");

  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({
      valid: false,
      friendPricePence: 6900,
      standardPricePence: 7900,
      sprintEndsAt: "2026-11-01T00:00:00.000Z",
    }),
  });
  assert.equal(await validateReferralCode("INVALID"), null);

  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({
      valid: true,
      friendPricePence: 7900,
      standardPricePence: 6900,
      sprintEndsAt: "not-a-date",
    }),
  });
  assert.equal(await validateReferralCode("MALFORMED"), null);
});

test("referral banner is globally mounted and prices come from a validated response", () => {
  const provider = fs.readFileSync(
    "src/components/marketing/MarketingAttributionProvider.tsx",
    "utf8",
  );
  const banner = fs.readFileSync(
    "src/components/marketing/ReferralOfferBanner.tsx",
    "utf8",
  );
  const proxy = fs.readFileSync(
    "src/app/api/referral/validate/[code]/route.ts",
    "utf8",
  );
  const urlBuilder = fs.readFileSync("src/lib/marketing/url.ts", "utf8");
  const trackedLink = fs.readFileSync(
    "src/components/marketing/TrackedAppLink.tsx",
    "utf8",
  );

  assert.match(
    provider,
    /<ReferralOfferProvider>[\s\S]*<ReferralOfferBanner\s*\/>[\s\S]*\{children\}[\s\S]*<\/ReferralOfferProvider>/,
  );
  assert.match(
    banner,
    /setCode\(capturedCode\)/,
  );
  assert.match(
    banner,
    /setValidatedOffer\(result \? \{ \.\.\.result, code: capturedCode \} : null\)/,
  );
  assert.match(banner, /useHeldReferralCode/);
  assert.match(banner, /promoOwnsHandoff/);
  assert.match(banner, /trialOwnsOrMayOwnHandoff/);
  assert.match(banner, /useSearchParams\(\)/);
  assert.match(banner, /A colleague shared their referral with you/);
  assert.match(banner, /formatPrice\(referral\.friendPricePence\)/);
  assert.match(banner, /formatPrice\(referral\.standardPricePence\)/);
  assert.doesNotMatch(banner, /£69|£79/);
  assert.match(proxy, /app\.medexia-akt\.com\/api\/referral\/validate/);
  assert.match(proxy, /cache:\s*"no-store"/);
  assert.match(urlBuilder, /buildReferralAppUrl\(/);
  assert.match(trackedLink, /const heldReferralCode = useHeldReferralCode\(\)/);
  assert.match(
    trackedLink,
    /trialOffer\?\.code,[\s\S]*heldReferralCode,[\s\S]*options\.intent/,
  );
});

test("only root requests carrying ref select the referral social preview", () => {
  assert.equal(
    isReferralLandingRequest("/", new URLSearchParams("ref=COLLEAGUE")),
    true,
  );
  assert.equal(
    isReferralLandingRequest("/", new URLSearchParams("utm_source=whatsapp")),
    false,
  );
  assert.equal(
    isReferralLandingRequest("/", new URLSearchParams("ref=")),
    false,
  );
  assert.equal(
    isReferralLandingRequest(
      "/akt-audio-revision",
      new URLSearchParams("ref=COLLEAGUE"),
    ),
    false,
  );
  assert.equal(
    buildReferralShareUrl("COLLEAGUE+CODE/1"),
    "https://medexia-akt.com/invite?ref=COLLEAGUE%2BCODE%2F1",
  );
});

test("referral landing rewrite serves exact OG copy and image without changing homepage content", () => {
  const middleware = fs.readFileSync("src/middleware.ts", "utf8");
  const invitePage = fs.readFileSync("src/app/invite/page.tsx", "utf8");

  assert.equal(
    REFERRAL_OG_TITLE,
    "You've been invited to AKT Navigator - £10 off Full Audio",
  );
  assert.equal(
    REFERRAL_OG_DESCRIPTION,
    "A colleague shared their referral link. Try it free, and pay £69 instead of £79 if you upgrade to Full Audio.",
  );
  assert.equal(
    REFERRAL_OG_IMAGE_URL,
    "https://app.medexia-akt.com/referral-og.png",
  );
  assert.match(middleware, /isReferralLandingRequest/);
  assert.match(middleware, /inviteUrl\.pathname = "\/invite"/);
  assert.match(middleware, /NextResponse\.rewrite\(inviteUrl\)/);
  assert.match(invitePage, /if \(!referralCode\) redirect\("\/"\)/);
  assert.match(invitePage, /url:\s*referralUrl/);
  assert.match(invitePage, /index:\s*false/);
  assert.match(invitePage, /width:\s*1200/);
  assert.match(invitePage, /height:\s*630/);
  assert.match(invitePage, /return <Home \/>/);
});

test("a validated trial owns mixed trial and referral handoffs", () => {
  resetTrackingEnv();
  installBrowser(
    "https://medexia-akt.com/?trial_code=TRIAL-OWNER&ref=REFERRAL-SUPPRESSED",
  );
  captureReferralCode();

  assert.equal(
    buildAppUrl("/join/full-access", {
      intent: "checkout",
      validatedTrialCode: "TRIAL-OWNER",
    }),
    `${TRIAL_APP_JOIN_URL}?code=TRIAL-OWNER`,
  );
});

test("a promo owns mixed promo and referral handoffs", () => {
  resetTrackingEnv();
  const query =
    "?promo_code=PROMO-OWNER&ref=REFERRAL-SUPPRESSED&utm_source=faculty";
  installBrowser(`https://medexia-akt.com/${query}`);
  captureReferralCode();

  assert.equal(
    buildAppUrl("/join/free", { intent: "start_free" }),
    `${PROMO_APP_JOIN_URL}${query}`,
  );
});

test("promo landing query is passed unchanged to the fixed full-access app target", () => {
  resetTrackingEnv();
  const rawQuery =
    "?promo_code=MiD%2BWESSEX%2F20&utm_source=mid_wessex_gp_training&utm_medium=registrar_committee_email&utm_campaign=midwessex_oct_2026&campaign_id=midwessex_oct_2026&offer_id=midwessex_oct26_59&intent=institutional_offer&future_param=a%2Bb";
  const browser = installBrowser(`https://medexia-akt.com/${rawQuery}`);

  const appUrl = buildAppUrl("/join/free", { intent: "start_free" });
  const fallbackUrl = buildAppFallbackUrl("/demo", { intent: "demo" });

  assert.equal(appUrl, `${PROMO_APP_JOIN_URL}${rawQuery}`);
  assert.equal(fallbackUrl, `${PROMO_APP_JOIN_URL}${rawQuery}`);
  assert.equal(
    browser.sessionStorage.getItem(PROMO_QUERY_SESSION_STORAGE_KEY),
    rawQuery,
  );
});

test("promo query survives landing-page navigation for the browser session", () => {
  resetTrackingEnv();
  const rawQuery =
    "?promo_code=FIRST-CODE&utm_source=mid_wessex_gp_training&utm_campaign=midwessex_oct_2026";
  const browser = installBrowser(`https://medexia-akt.com/${rawQuery}`);

  capturePromoPassThroughQuery();
  window.location = new URL("https://medexia-akt.com/free-akt-questions");

  assert.equal(
    buildAppUrl("/join/audio", { intent: "start_audio" }),
    `${PROMO_APP_JOIN_URL}${rawQuery}`,
  );
  assert.equal(
    browser.sessionStorage.getItem(PROMO_QUERY_SESSION_STORAGE_KEY),
    rawQuery,
  );
});

test("first promo query wins and a later landing does not replace it", () => {
  resetTrackingEnv();
  const firstQuery = "?promo_code=FIRST&utm_source=first";
  const browser = installBrowser(`https://medexia-akt.com/${firstQuery}`);

  capturePromoPassThroughQuery();
  window.location = new URL(
    "https://medexia-akt.com/akt-audio-revision?promo_code=SECOND&utm_source=second",
  );

  assert.equal(capturePromoPassThroughQuery(), firstQuery);
  assert.equal(
    browser.sessionStorage.getItem(PROMO_QUERY_SESSION_STORAGE_KEY),
    firstQuery,
  );
  assert.equal(buildAppUrl("/login", { intent: "login" }), `${PROMO_APP_JOIN_URL}${firstQuery}`);
});

test("a fresh clean entry cannot inherit a promo remembered by the browser session", () => {
  resetTrackingEnv();
  const promoQuery = "?promo_code=EARLIER&utm_source=registrar_email";
  const promoVisit = installBrowser(`https://medexia-akt.com/${promoQuery}`);

  assert.equal(
    buildAppUrl("/join/free", { intent: "start_free" }),
    `${PROMO_APP_JOIN_URL}${promoQuery}`,
  );

  const cleanVisit = installBrowser(
    "https://medexia-akt.com/free-akt-questions",
    "",
    promoVisit.sessionStorage,
  );
  const cleanAppUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(cleanVisit.sessionStorage.getItem(PROMO_QUERY_SESSION_STORAGE_KEY), null);
  assert.equal(cleanAppUrl.origin, "https://app.medexia-akt.com");
  assert.equal(cleanAppUrl.pathname, "/join/free");
  assert.equal(cleanAppUrl.searchParams.has("promo_code"), false);
});

test("a fresh promo link replaces a stale promo remembered by the browser session", () => {
  resetTrackingEnv();
  const earlierVisit = installBrowser(
    "https://medexia-akt.com/?promo_code=EARLIER&utm_source=first",
  );
  buildAppUrl("/join/free", { intent: "start_free" });

  const currentQuery = "?promo_code=CURRENT%2BOPAQUE&utm_source=current";
  const currentVisit = installBrowser(
    `https://medexia-akt.com/${currentQuery}`,
    "",
    earlierVisit.sessionStorage,
  );

  assert.equal(
    buildAppUrl("/join/free", { intent: "start_free" }),
    `${PROMO_APP_JOIN_URL}${currentQuery}`,
  );
  assert.equal(
    currentVisit.sessionStorage.getItem(PROMO_QUERY_SESSION_STORAGE_KEY),
    currentQuery,
  );
});

test("no promo parameter creates no promo state or default code", () => {
  resetTrackingEnv();
  const browser = installBrowser(
    "https://medexia-akt.com/?utm_source=mid_wessex_gp_training&utm_campaign=midwessex_oct_2026",
  );

  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(browser.sessionStorage.getItem(PROMO_QUERY_SESSION_STORAGE_KEY), null);
  assert.equal(appUrl.pathname, "/join/free");
  assert.equal(appUrl.searchParams.has("promo_code"), false);
});

test("landing events default to the app backend bridge when no endpoint env is set", async () => {
  resetTrackingEnv();
  delete process.env.NEXT_PUBLIC_MARKETING_EVENTS_ENDPOINT;
  const browser = installBrowser("https://medexia-akt.com/?utm_source=reddit");

  saveConsent({ functional: false, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();
  trackLandingEvent("cta_clicked_start_free", {
    href: "https://app.medexia-akt.com/join/free",
    intent: "start_free",
  });

  assert.equal(browser.sendBeaconCalls.length, 1);
  assert.equal(browser.sendBeaconCalls[0].endpoint, "https://app.medexia-akt.com/api/marketing/events");
  const payload = await parseBeaconPayload(browser.sendBeaconCalls[0]);
  assert.equal(payload.event_name, "cta_clicked_start_free");
});

test("flushed CTA events use fetch keepalive so navigation does not abort them", async () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/?utm_source=reddit&utm_medium=organic&utm_campaign=audio_first_post");

  saveConsent({ functional: false, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();
  const ok = await flushLandingEvent("cta_clicked_start_free", {
    href: "https://app.medexia-akt.com/join/free",
    intent: "start_free",
  });

  assert.equal(ok, true);
  assert.equal(browser.sendBeaconCalls.length, 0);
  assert.equal(browser.fetchCalls.length, 1);
  assert.equal(browser.fetchCalls[0].endpoint, "https://app.medexia-akt.com/api/marketing/events");
  assert.equal(browser.fetchCalls[0].options.keepalive, true);
  assert.equal(browser.fetchCalls[0].options.credentials, "omit");
  const payload = await parseFetchPayload(browser.fetchCalls[0]);
  assert.equal(payload.event_name, "cta_clicked_start_free");
  assert.equal(payload.source, "reddit");
  assert.equal(payload.first_touch.source, "reddit");
  assert.equal(payload.first_touch.campaign, "audio_first_post");
  assert.deepEqual(Object.keys(payload.first_touch).sort(), [
    "campaign",
    "content",
    "medium",
    "source",
    "term",
  ].sort());
});

test("CTA event href keeps only the app destination and never persists handoff identifiers", () => {
  resetTrackingEnv();
  installBrowser("https://medexia-akt.com/");

  const eventHref = appHandoffEventHref(
    "https://app.medexia-akt.com/join/audio?mx_test=v1.1785071300.signature&utm_source=google&gclid=TEST_GCLID#chapter",
  );

  assert.equal(eventHref, "https://app.medexia-akt.com/join/audio");
  assert.doesNotMatch(eventHref, /mx_test|utm_source|gclid|1785071300|signature/);
});

test("app url ignores a same-origin landing base to avoid CTA 404s", () => {
  resetTrackingEnv();
  process.env.NEXT_PUBLIC_APP_BASE_URL = "https://medexia-akt.com";
  installBrowser("https://medexia-akt.com/?utm_source=reddit");

  const fallbackUrl = new URL(buildAppFallbackUrl("/join/free", { intent: "start_free" }));
  const startFreeUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));
  const loginUrl = new URL(buildAppUrl("/login", { intent: "login" }));

  assert.equal(fallbackUrl.origin, "https://app.medexia-akt.com");
  assert.equal(fallbackUrl.pathname, "/join/free");
  assert.equal(startFreeUrl.origin, "https://app.medexia-akt.com");
  assert.equal(startFreeUrl.pathname, "/join/free");
  assert.equal(loginUrl.origin, "https://app.medexia-akt.com");
  assert.equal(loginUrl.pathname, "/login");
});

test("referral launch flags default to official on unless explicitly disabled", () => {
  const now = new Date("2026-06-23T12:00:00+01:00");
  delete process.env.NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED;
  delete process.env.NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED;

  assert.equal(
    determineOfferContext({
      referralCode: "ABC123",
      intent: "referral_earlybird",
      now,
    }).offer_id,
    OFFER_IDS.earlybird49ReferralPre,
  );

  setReferralFlags(false);
  assert.equal(
    determineOfferContext({
      referralCode: "ABC123",
      intent: "referral_earlybird",
      now,
    }).offer_id,
    OFFER_IDS.earlybird59Pre,
  );
});

test("referral offer is only selected when public sprint and discount flags are enabled", () => {
  const now = new Date("2026-06-23T12:00:00+01:00");

  setReferralFlags(false);
  assert.equal(
    determineOfferContext({
      referralCode: "ABC123",
      intent: "referral_earlybird",
      now,
    }).offer_id,
    OFFER_IDS.earlybird59Pre,
  );

  setReferralFlags(true);
  assert.equal(
    determineOfferContext({
      referralCode: "ABC123",
      intent: "referral_earlybird",
      now,
    }).offer_id,
    OFFER_IDS.earlybird49ReferralPre,
  );

  assert.equal(
    determineOfferContext({
      referralCode: null,
      intent: "earlybird_upgrade",
      explicitOfferId: OFFER_IDS.earlybird49ReferralPre,
      now,
    }).offer_id,
    OFFER_IDS.earlybird59Pre,
  );
});

test("post-cutover never selects the referral early-bird offer", () => {
  setReferralFlags(true);
  assert.equal(
    determineOfferContext({
      referralCode: "ABC123",
      intent: "referral_earlybird",
      now: new Date("2026-07-08T00:00:01+01:00"),
    }).offer_id,
    OFFER_IDS.freePost,
  );
});

test("post-cutover start-free offer becomes the free questions plus 2h audio tier", () => {
  assert.equal(
    determineOfferContext({
      intent: "start_free",
      now: new Date("2026-07-08T00:00:01+01:00"),
    }).offer_id,
    OFFER_IDS.freePost,
  );
});

test("ref query params normalize into referral_code", () => {
  const params = new URLSearchParams("?ref=ABC123");
  assert.deepEqual(normalizeReferralCode(params), {
    referralCode: "ABC123",
    sourceParam: "ref",
  });
});

test("fresh visitor before consent captures source handoff without IDs, events, pixels, or ad click ids", () => {
  resetTrackingEnv();
  setReferralFlags(false);
  const browser = installBrowser("https://medexia-akt.com/?utm_source=reddit&utm_campaign=audio_first_post&gclid=G123&rdt_cid=R123");

  const snapshot = initMarketingAttribution();
  trackLandingEvent("landing_page_viewed");
  maybeLoadMarketingPixels();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(snapshot.mx_visitor_id, null);
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.visitorId), null);
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch)).source, "reddit");
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.offerContext), null);
  assert.equal(browser.sendBeaconCalls.length, 0);
  assert.equal(browser.fetchCalls.length, 0);
  assert.equal(browser.scripts.length, 0);
  assert.equal(appUrl.searchParams.has("mx_vid"), false);
  assert.equal(appUrl.searchParams.get("utm_source"), "reddit");
  assert.equal(appUrl.searchParams.get("first_touch_source"), "reddit");
  assert.equal(appUrl.searchParams.has("gclid"), false);
  assert.equal(appUrl.searchParams.has("rdt_cid"), false);
  assert.equal(appUrl.searchParams.has("mx_mc"), false);
  assert.equal(appUrl.searchParams.has("mx_ac"), false);
});

test("document.referrer becomes fallback source when no UTM is present", () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/", "https://www.google.co.uk/search?q=akt+navigator");

  const snapshot = initMarketingAttribution();
  const firstTouch = JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch));
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(snapshot.first_touch.source, "google");
  assert.equal(snapshot.first_touch.medium, "organic");
  assert.equal(firstTouch.source, "google");
  assert.equal(firstTouch.medium, "organic");
  assert.equal(appUrl.searchParams.get("utm_source"), "google");
  assert.equal(appUrl.searchParams.get("utm_medium"), "organic");
  assert.equal(appUrl.searchParams.get("first_touch_source"), "google");
});

test("UTM tags win over document.referrer, first touch is retained, and canonical attribution is last-touch", () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/", "https://www.google.com/search?q=akt");

  initMarketingAttribution();
  window.location = new URL("https://medexia-akt.com/?utm_source=newsletter&utm_medium=email&utm_campaign=july");
  document.referrer = "https://www.google.com/search?q=akt";
  const snapshot = initMarketingAttribution();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch)).source, "google");
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.lastTouch)).source, "newsletter");
  assert.equal(snapshot.first_touch.source, "google");
  assert.equal(snapshot.last_touch.source, "newsletter");
  assert.equal(appUrl.searchParams.get("utm_source"), "newsletter");
  assert.equal(appUrl.searchParams.get("first_touch_source"), "google");
  assert.equal(appUrl.searchParams.get("last_touch_source"), "newsletter");
  assert.equal(attributionForEvent().source, "newsletter");
});

test("referrer classification covers AI, social, referral, and internal hosts", () => {
  const cases = [
    ["https://chatgpt.com/c/abc", "chatgpt", "ai"],
    ["https://perplexity.ai/search/akt", "perplexity", "ai"],
    ["https://gemini.google.com/app/abc", "gemini", "ai"],
    ["https://www.reddit.com/r/GPtraining/", "reddit", "social"],
    ["https://example.co.uk/path", "example.co.uk", "referral"],
  ];

  for (const [referrer, source, medium] of cases) {
    resetTrackingEnv();
    installBrowser("https://medexia-akt.com/", referrer);
    const snapshot = initMarketingAttribution();
    assert.equal(snapshot.first_touch.source, source);
    assert.equal(snapshot.first_touch.medium, medium);
  }

  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/", "https://app.medexia-akt.com/join/free");
  const snapshot = initMarketingAttribution();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));
  assert.equal(snapshot.first_touch, null);
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch), null);
  assert.equal(appUrl.searchParams.has("utm_source"), false);
});

test("reject all stores the decision and leaves analytics and pixels disabled", () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/?utm_source=reddit");

  const consent = rejectAllConsent("banner");
  initMarketingAttribution();
  trackLandingEvent("landing_page_viewed");
  maybeLoadMarketingPixels();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(consent.analytics, false);
  assert.equal(consent.marketing, false);
  assert.ok(browser.localStorage.getItem(CONSENT_STORAGE_KEY));
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.visitorId), null);
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch), null);
  assert.equal(browser.sendBeaconCalls.length, 0);
  assert.equal(browser.scripts.length, 0);
  assert.equal(appUrl.searchParams.get("mx_mc"), "0");
  assert.equal(appUrl.searchParams.get("mx_ac"), "0");
});

test("consent_updated without analytics consent sends only a minimal consent audit payload", async () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/?utm_source=reddit&gclid=G123", "https://example.com/post");

  trackLandingEvent("consent_updated", {
    mechanism: "banner",
    functional: false,
    analytics: false,
    marketing: false,
  });

  assert.equal(browser.sendBeaconCalls.length, 1);
  const payload = await parseBeaconPayload(browser.sendBeaconCalls[0]);
  assert.deepEqual(Object.keys(payload).sort(), [
    "choices",
    "consent_version",
    "event_name",
    "event_timestamp",
    "mechanism",
    "source",
  ].sort());
  assert.equal(payload.event_name, "consent_updated");
  assert.equal(payload.consent_version, "2026-06-23-v1");
  assert.deepEqual(payload.choices, {
    functional: false,
    analytics: false,
    marketing: false,
  });
  assert.equal(payload.mechanism, "banner");
  assert.equal(payload.event_id, undefined);
  assert.equal(payload.mx_visitor_id, undefined);
  assert.equal(payload.page_path, undefined);
  assert.equal(payload.user_agent, undefined);
  assert.equal(payload.utm_source, undefined);
  assert.equal(payload.referrer, undefined);
  assert.equal(payload.first_touch, undefined);
  assert.equal(payload.last_touch, undefined);
  assert.equal(payload.gclid, undefined);
});

test("analytics consent creates first-party attribution without loading pixels or forwarding ad click ids", () => {
  resetTrackingEnv();
  const browser = installBrowser(
    "https://medexia-akt.com/?utm_source=reddit&utm_medium=organic&utm_campaign=audio_first_post&gclid=G123",
    "https://example.com/post",
  );

  saveConsent({ functional: false, analytics: true, marketing: false }, "settings");
  const snapshot = initMarketingAttribution();
  trackLandingEvent("landing_page_viewed");
  maybeLoadMarketingPixels();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.ok(snapshot.mx_visitor_id);
  assert.ok(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.visitorId));
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch)).utm_source, "reddit");
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch)).source, "reddit");
  assert.equal(browser.sendBeaconCalls.length, 1);
  assert.equal(browser.scripts.length, 0);
  assert.equal(appUrl.searchParams.get("utm_source"), "reddit");
  assert.ok(appUrl.searchParams.get("mx_vid"));
  assert.equal(appUrl.searchParams.has("gclid"), false);
  assert.equal(appUrl.searchParams.get("mx_mc"), "0");
  assert.equal(appUrl.searchParams.get("mx_ac"), "1");
});

test("ad click IDs cannot leak through page_path, first_landing_page, or referrer without marketing consent", async () => {
  resetTrackingEnv();
  const nested = encodeURIComponent("https://example.com/next?gclid=NESTED_GCLID");
  const browser = installBrowser(
    `https://medexia-akt.com/?utm_source=google&utm_medium=cpc&gclid=TOP_GCLID&gbraid=TOP_GBRAID&rdt_cid=TOP_REDDIT&next=safe&next=${nested}`,
    "https://referrer.example/post?fbclid=REF_FBCLID&redirect=https%3A%2F%2Fexample.com%2F%3Fmsclkid%3DNESTED_MSCLKID",
  );

  saveConsent({ functional: false, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();
  trackLandingEvent("landing_page_viewed");

  const storedFirst = JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch));
  assert.equal(storedFirst.gclid, null);
  assert.equal(storedFirst.gbraid, null);
  assert.equal(storedFirst.rdt_cid, null);
  assert.doesNotMatch(fullyDecode(storedFirst.first_landing_page), /(?:gclid|gbraid|rdt_cid)=/i);
  assert.doesNotMatch(fullyDecode(storedFirst.referrer), /(?:fbclid|msclkid)=/i);

  // Simulate a value written by an older release so the handoff output
  // boundary is also protected, not only new captures.
  storedFirst.first_landing_page = "/?utm_source=google&gclid=LEGACY_GCLID";
  storedFirst.referrer = "https://referrer.example/post?fbclid=LEGACY_FBCLID";
  browser.localStorage.setItem(MARKETING_STORAGE_KEYS.firstTouch, JSON.stringify(storedFirst));

  const appUrl = buildAppUrl("/join/free", { intent: "start_free" });
  const decodedHandoff = fullyDecode(appUrl);
  assert.doesNotMatch(
    decodedHandoff,
    /(?:^|[?&#;])(?:gclid|gbraid|wbraid|fbclid|ttclid|msclkid|rdt_cid)=/i,
  );

  assert.equal(browser.sendBeaconCalls.length, 1);
  const payload = await parseBeaconPayload(browser.sendBeaconCalls[0]);
  assert.doesNotMatch(
    fullyDecode(payload.page_path),
    /(?:^|[?&#;])(?:gclid|gbraid|wbraid|fbclid|ttclid|msclkid|rdt_cid)=/i,
  );
  assert.equal(payload.is_test, false);
  assert.equal(payload.traffic_type, "external");
});

test("/free route creates custom GPT attribution without visible UTM parameters", () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/free");

  saveConsent({ functional: false, analytics: true, marketing: false }, "settings");
  const snapshot = initMarketingAttribution();

  assert.ok(snapshot.first_touch);
  assert.equal(snapshot.first_touch.utm_source, "custom_gpt");
  assert.equal(snapshot.first_touch.utm_medium, "gpt_footer");
  assert.equal(snapshot.first_touch.utm_campaign, "akt_explanation_builder");
  assert.equal(snapshot.first_touch.utm_content, "short_free_link");
  assert.equal(snapshot.first_touch.first_landing_page, "/free");
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch)).utm_source, "custom_gpt");
});

test("app handoff from /free carries custom GPT attribution when analytics consent allows", () => {
  resetTrackingEnv();
  installBrowser("https://medexia-akt.com/free");

  saveConsent({ functional: false, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(appUrl.origin, "https://app.medexia-akt.com");
  assert.equal(appUrl.pathname, "/join/free");
  assert.equal(appUrl.searchParams.get("utm_source"), "custom_gpt");
  assert.equal(appUrl.searchParams.get("utm_medium"), "gpt_footer");
  assert.equal(appUrl.searchParams.get("utm_campaign"), "akt_explanation_builder");
  assert.equal(appUrl.searchParams.get("utm_content"), "short_free_link");
  assert.equal(appUrl.searchParams.get("first_landing_page"), "/free");
  assert.equal(appUrl.searchParams.get("intent"), "start_free");
});

test("free AKT questions page exists with tracked free CTA and required SEO copy", () => {
  const route = fs.readFileSync("src/app/free-akt-questions/page.tsx", "utf8");
  const component = fs.readFileSync(
    "src/components/sections/FreeAktQuestionsLanding.tsx",
    "utf8",
  );
  const demo = fs.readFileSync(
    "src/components/sections/FreeQuestionsLiveDemo.tsx",
    "utf8",
  );
  const heroLoop = fs.readFileSync(
    "src/components/sections/FreeQuestionsHeroLoop.tsx",
    "utf8",
  );
  const adaptivePractice = fs.readFileSync(
    "src/components/sections/AdaptivePracticeSection.tsx",
    "utf8",
  );
  const animatedBullets = fs.readFileSync("src/components/AnimatedBulletList.tsx", "utf8");
  const globals = fs.readFileSync("src/app/globals.css", "utf8");
  const data = fs.readFileSync("src/data/free-akt-questions.ts", "utf8");
  const schema = fs.readFileSync("src/components/FreeAktQuestionsJsonLd.tsx", "utf8");
  const sitemap = fs.readFileSync("src/app/sitemap.ts", "utf8");
  const source = `${route}\n${component}\n${demo}\n${heroLoop}\n${adaptivePractice}\n${animatedBullets}\n${data}\n${schema}`;

  assert.match(route, /FreeAktQuestionsLanding sourceSurface="free_questions_landing"/);
  assert.match(component, /<TrackedAppLink[\s\S]*href="\/join\/free"[\s\S]*intent="start_free"/);
  assert.match(component, /className="hero-enter order-1[^"]*md:order-1/);
  assert.match(component, /className="hero-enter order-2[^"]*md:order-2/);
  assert.match(
    component,
    /<h1[\s\S]*Free AKT questions,[\s\S]*mocks and explanations\.[\s\S]*<\/h1>/,
  );
  assert.match(component, /free_akt_questions_start_free_clicked/);
  assert.match(component, /free_akt_questions_explanation_builder_clicked/);
  assert.match(component, /free_akt_questions_sample_viewed/);
  assert.match(component, /free_akt_questions_content_governance_clicked/);
  assert.match(component, /free_akt_questions_audio_upgrade_clicked/);
  assert.match(component, /href="\/content-governance"/);
  assert.match(component, /Read how AKT Navigator questions are built/);
  assert.match(component, /Read how AKT Navigator questions are drafted/);
  assert.match(component, /href="\/"[\s\S]*See the full AKT Navigator audio revision platform/);
  assert.match(component, /Want audio-first revision too\?/);
  assert.match(component, /destination: "home_audio_landing"/);
  assert.match(component, /!isCustomGptReturn \? <FreeQuestionsLiveDemo \/> : null/);
  assert.match(demo, /Sit five AKT-style questions inside the app\./);
  assert.match(demo, /DEMO_QUESTIONS = "\/demo\/questions"/);
  assert.match(demo, /free_akt_questions_demo_viewed/);
  assert.match(demo, /free_akt_questions_demo_opened/);
  assert.match(demo, /free_akt_questions_demo_fullscreen_clicked/);
  assert.match(demo, /Ready to practise for real\?/);
  assert.match(demo, /placement: "live_demo"/);
  assert.match(component, /<FreeQuestionsHeroLoop \/>/);
  assert.match(heroLoop, /free-akt-hero-full-loop\.webm/);
  assert.match(heroLoop, /free-akt-hero-full-loop\.mp4/);
  assert.match(heroLoop, /free-akt-hero-full-poster\.jpg/);
  assert.match(heroLoop, /AKT-style SBA, structured explanation, clue trap why wrong, and adaptive next session/);
  assert.equal(fs.existsSync("public/video/free-akt-hero-full-loop.webm"), true);
  assert.equal(fs.existsSync("public/video/free-akt-hero-full-loop.mp4"), true);
  assert.equal(fs.existsSync("public/video/free-akt-hero-full-poster.jpg"), true);
  assert.match(component, /<AdaptivePracticeSection sourceSurface=\{sourceSurface\} \/>/);
  assert.match(adaptivePractice, /Adaptive practice, not a random question shuffle\./);
  assert.match(adaptivePractice, /free_akt_questions_adaptive_practice_viewed/);
  assert.match(component, /AnimatedBulletList/);
  assert.match(component, /AnimatedStepList/);
  assert.match(component, /animated-step-marker/);
  assert.match(component, /animated-step-text/);
  assert.match(animatedBullets, /export function AnimatedStepList/);
  assert.match(animatedBullets, /IntersectionObserver/);
  assert.match(animatedBullets, /data-bullet-list-visible/);
  assert.match(globals, /animated-bullet-dot/);
  assert.match(globals, /animated-bullet-text/);
  assert.match(globals, /animated-step-marker/);
  assert.match(globals, /animated-step-text/);
  assert.match(globals, /prefers-reduced-motion: reduce/);

  assert.match(source, /Free AKT questions/);
  assert.match(source, /21,000\+ AKT-style questions/);
  assert.match(source, /MRCGP AKT practice questions/);
  assert.match(source, /AKT practice questions/);
  assert.match(source, /AKT revision questions/);
  assert.match(source, /free MRCGP AKT question bank/);
  assert.match(source, /No card required/);
  assert.match(source, /First 2 hours of audio free/);
  assert.match(source, /Full audio revision\s+is the optional paid upgrade/);
  assert.match(source, /AI-assisted/);
  assert.match(source, /multi-stage automated review/i);
  assert.match(component, /drafted as AKT-style SBAs/);
  assert.match(component, /checked from a UK primary-care perspective/);
  assert.match(component, /key clue, trap, wrong answers and AKT\s+learning point/);
  assert.doesNotMatch(component, /multiple automated review stages/);
  assert.match(source, /not affiliated with or endorsed by the RCGP/);
  assert.match(source, /adaptive practice/);
  assert.match(source, /not a random question shuffle/);
  assert.match(source, /AKT blueprint coverage/);
  assert.match(source, /weak areas/);
  assert.match(source, /recent mistakes/);
  assert.match(source, /unseen topics/);
  assert.match(source, /question\s+difficulty/);
  assert.match(source, /recency/);
  assert.match(source, /Readiness estimates are revision guidance, not a guarantee/);
  assert.match(component, /AKT Navigator has two main routes/);
  assert.match(component, /AKT Navigator homepage/);
  assert.match(component, /audio-first AKT revision platform/);
  assert.match(source, /Does AKT Navigator choose questions randomly\?/);
  assert.match(source, /Can AKT Navigator predict if I will pass\?/);
  assert.match(source, /Does it include AKT mock exams\?/);
  assert.match(source, /AKT mock exam-style practice/);
  assert.match(source, /Can I use it for AKT practice questions and revision questions\?/);
  assert.match(source, /How are AKT Navigator questions checked\?/);
  assert.match(source, /draft, validate, harden, explain, report and correct pipeline/);
  assert.match(source, /Read the content governance page/);
  assert.match(source, /A patient with COPD taking theophylline develops regular SVT/);
  assert.doesNotMatch(source, /doctor-reviewed/i);
  for (const jargon of [
    /Beta-Binomial/i,
    /Bayesian/i,
    /credible intervals/i,
    /pass probability/i,
    /Wilson/i,
    /logistic/i,
    /constraint satisfaction/i,
    /predicted exam score/i,
    /All 32 topics mastered/i,
  ]) {
    assert.doesNotMatch(source, jargon);
  }
  assert.doesNotMatch(data, /First 2h audio free after 8 July/);
  assert.doesNotMatch(component, /index < 4 \? "Free" : "Optional"/);
  assert.doesNotMatch(component, /Why is it free\?/);
  assert.equal((component.match(/>\s*Trust\s*</g) ?? []).length, 0);
  assert.match(component, /freeQuestionProcessSteps\.map/);
  assert.match(data, /Topic-structured generation/);
  assert.match(data, /Teaching-card explanation format/);
  assert.match(data, /Exam revision only/);
  assert.match(schema, /"@type": "BreadcrumbList"/);
  assert.match(schema, /"@type": "WebPage"/);
  assert.match(schema, /"@type": "SoftwareApplication"/);
  assert.match(schema, /"@type": "LearningResource"/);
  assert.match(schema, /"@type": "FAQPage"/);
  assert.match(sitemap, /https:\/\/medexia-akt\.com\/free-akt-questions/);
  assert.match(sitemap, /priority: 0\.9/);
});

test("content governance page explains pipeline, caveats, schema, sitemap and footer discovery", () => {
  const page = fs.readFileSync("src/app/content-governance/page.tsx", "utf8");
  const animatedBullets = fs.readFileSync("src/components/AnimatedBulletList.tsx", "utf8");
  const sitemap = fs.readFileSync("src/app/sitemap.ts", "utf8");
  const footer = fs.readFileSync("src/components/sections/MinimalFooter.tsx", "utf8");
  const source = `${page}\n${animatedBullets}\n${sitemap}\n${footer}`;

  assert.match(page, /Content governance \| AKT Navigator/);
  assert.match(page, /https:\/\/medexia-akt\.com\/content-governance/);
  assert.match(page, /AI-assisted does not mean raw AI output/);
  assert.match(page, /draft, validate, harden, explain/);
  assert.match(page, /report button/);
  assert.match(page, /NICE CKS/);
  assert.match(page, /BNF\/BNFC/);
  assert.match(page, /DVLA/);
  assert.match(page, /FSRH\/UKMEC/);
  assert.match(page, /UKHSA/);
  assert.match(page, /not\s+affiliated with or endorsed by the RCGP/);
  assert.match(page, /not\s+doctor-written/);
  assert.match(page, /not\s+individually clinician-reviewed/);
  assert.match(page, /supplementary exam-revision tool/);
  assert.match(page, /supplementary practice tool/);
  assert.match(page, /not clinical advice/);
  assert.match(page, /not a sole\s+source of truth/);
  assert.match(page, /Readiness estimates are revision guidance, not a guarantee/);
  assert.match(page, /Every question and explanation has a report button/);
  assert.match(page, /Reports are used to correct, rewrite, retire or re-run items/);
  assert.match(page, /public correction\/update log/);
  assert.match(page, /clearer handling of guideline-sensitive topics/);
  assert.match(page, /sample question examples before sign-up/);
  assert.match(page, /AnimatedBulletList/);
  assert.match(page, /AnimatedStepList/);
  assert.match(page, /animated-bullet-item/);
  assert.match(page, /animated-step-item/);
  assert.match(page, /animated-step-marker/);
  assert.match(animatedBullets, /prefers-reduced-motion/);
  assert.match(page, /legacy PHE resources where relevant/);
  assert.doesNotMatch(page, /In plain terms/);
  assert.doesNotMatch(page, /clearer public content governance/);
  assert.doesNotMatch(page, /sample\/free access route/);
  assert.doesNotMatch(page, /UKHSA\/PHE/);
  assert.match(page, /"@type": "BreadcrumbList"/);
  assert.match(page, /"@type": "WebPage"/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.doesNotMatch(page, /MedicalOrganization/);
  assert.doesNotMatch(page, /doctor-approved/i);
  assert.doesNotMatch(page, /clinically verified/i);
  assert.doesNotMatch(page, /official RCGP simulation/i);
  assert.match(source, /\/content-governance/);
  assert.match(sitemap, /https:\/\/medexia-akt\.com\/content-governance/);
  assert.match(footer, /Content governance/);
});

test("/free renders the shared free questions page in custom GPT return mode", () => {
  const freeRoute = fs.readFileSync("src/app/free/page.tsx", "utf8");
  const component = fs.readFileSync(
    "src/components/sections/FreeAktQuestionsLanding.tsx",
    "utf8",
  );

  assert.match(freeRoute, /FREE_AKT_QUESTIONS_CANONICAL/);
  assert.match(freeRoute, /FreeAktQuestionsLanding sourceSurface="custom_gpt_return"/);
  assert.match(component, /custom_gpt_return_landed/);
  assert.match(component, /custom_gpt_return_start_free_clicked/);
  assert.match(component, /free_akt_questions_page_viewed/);
  assert.match(component, /const isCustomGptReturn = sourceSurface === "custom_gpt_return"/);
  assert.match(component, /!isCustomGptReturn \? \(/);
  assert.match(component, /Open the Explanation Builder again/);
  assert.match(component, /!isCustomGptReturn \? <FreeQuestionsLiveDemo \/> : null/);
  assert.match(component, /!isCustomGptReturn \? \(\s*<AdaptivePracticeSection sourceSurface=\{sourceSurface\} \/>/);
});

test("new explanation builder event names pass through the generic event pipeline", async () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/akt-explanation-builder?utm_source=reddit");

  saveConsent({ functional: false, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();

  trackLandingEvent("explanation_builder_page_viewed", {
    page: "akt_explanation_builder",
    source: "landing_bridge",
  });
  trackLandingEvent("explanation_builder_example_viewed", {
    section: "before_after_example",
  });
  trackLandingEvent("explanation_builder_start_free_clicked", {
    placement: "hero",
  });
  trackLandingEvent("custom_gpt_return_landed", {
    page: "free",
    source: "custom_gpt",
  });
  await flushLandingEvent("explanation_builder_open_gpt_clicked", {
    destination: "chatgpt_custom_gpt",
    placement: "hero",
    href: "https://chatgpt.com/g/example",
  });
  await flushLandingEvent("custom_gpt_return_start_free_clicked", {
    placement: "bridge",
  });

  const beaconPayloads = await Promise.all(browser.sendBeaconCalls.map(parseBeaconPayload));
  const fetchPayloads = await Promise.all(browser.fetchCalls.map(parseFetchPayload));
  const eventNames = [...beaconPayloads, ...fetchPayloads].map((payload) => payload.event_name);

  assert.deepEqual(eventNames.sort(), [
    "custom_gpt_return_landed",
    "custom_gpt_return_start_free_clicked",
    "explanation_builder_example_viewed",
    "explanation_builder_open_gpt_clicked",
    "explanation_builder_page_viewed",
    "explanation_builder_start_free_clicked",
  ].sort());
  assert.equal(fetchPayloads.find((payload) => payload.event_name === "explanation_builder_open_gpt_clicked").properties.placement, "hero");
});

test("new free AKT questions event names pass through the generic event pipeline", async () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/free-akt-questions?utm_source=google");

  saveConsent({ functional: false, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();

  trackLandingEvent("free_akt_questions_page_viewed", {
    page: "free_akt_questions",
    source: "free_questions_landing",
  });
  trackLandingEvent("free_akt_questions_sample_viewed", {
    page: "free_akt_questions",
    section: "sample_question",
  });
  trackLandingEvent("free_akt_questions_demo_viewed", {
    page: "free_akt_questions",
    placement: "live_demo",
  });
  trackLandingEvent("free_akt_questions_demo_opened", {
    page: "free_akt_questions",
    placement: "mobile_launcher",
  });
  trackLandingEvent("free_akt_questions_demo_fullscreen_clicked", {
    page: "free_akt_questions",
    placement: "desktop_demo",
  });
  trackLandingEvent("free_akt_questions_adaptive_practice_viewed", {
    page: "free_akt_questions",
    section: "adaptive_practice",
  });
  trackLandingEvent("free_akt_questions_content_governance_clicked", {
    page: "free_akt_questions",
    placement: "transparent_process",
    source: "free_questions_landing",
  });
  trackLandingEvent("free_akt_questions_audio_upgrade_clicked", {
    page: "free_akt_questions",
    placement: "comparison",
    source: "free_questions_landing",
    destination: "home_audio_landing",
  });
  trackLandingEvent("free_akt_questions_explanation_builder_clicked", {
    page: "free_akt_questions",
    placement: "hero",
  });
  await flushLandingEvent("free_akt_questions_start_free_clicked", {
    page: "free_akt_questions",
    placement: "hero",
    source: "free_questions_landing",
    href: "https://app.medexia-akt.com/join/free",
    intent: "start_free",
  });

  const beaconPayloads = await Promise.all(browser.sendBeaconCalls.map(parseBeaconPayload));
  const fetchPayloads = await Promise.all(browser.fetchCalls.map(parseFetchPayload));
  const eventNames = [...beaconPayloads, ...fetchPayloads].map((payload) => payload.event_name);

  assert.deepEqual(eventNames.sort(), [
    "free_akt_questions_demo_fullscreen_clicked",
    "free_akt_questions_demo_opened",
    "free_akt_questions_demo_viewed",
    "free_akt_questions_adaptive_practice_viewed",
    "free_akt_questions_audio_upgrade_clicked",
    "free_akt_questions_content_governance_clicked",
    "free_akt_questions_explanation_builder_clicked",
    "free_akt_questions_page_viewed",
    "free_akt_questions_sample_viewed",
    "free_akt_questions_start_free_clicked",
  ].sort());
  assert.equal(fetchPayloads[0].properties.placement, "hero");
});

test("disabled pixel switch does not update an unrelated pre-existing Google tag", () => {
  resetTrackingEnv();
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = "AW-18343035898";
  const browser = installBrowser("https://medexia-akt.com/");
  const calls = [];
  window.gtag = (...args) => calls.push(args);

  acceptAllConsent("banner");
  maybeLoadMarketingPixels();

  assert.deepEqual(calls, []);
  assert.equal(browser.scripts.length, 0);
});

test("internal test tokens require a valid, unexpired server-verifiable signature", async () => {
  const token = makeInternalTestToken();
  const [version, expiresAt, signature] = token.split(".");
  const tamperedSignature =
    `${signature.slice(0, 10)}${signature[10] === "A" ? "B" : "A"}${signature.slice(11)}`;
  const tamperedToken = `${version}.${expiresAt}.${tamperedSignature}`;
  assert.equal(await verifyInternalTestToken(token, INTERNAL_TEST_PUBLIC_KEY), true);
  assert.equal(await verifyInternalTestToken(tamperedToken, INTERNAL_TEST_PUBLIC_KEY), false);
  assert.equal(
    await verifyInternalTestToken(makeInternalTestToken(-60), INTERNAL_TEST_PUBLIC_KEY),
    false,
  );
  assert.equal(
    await verifyInternalTestToken(token, "0".repeat(64)),
    false,
  );

  const middleware = fs.readFileSync("src/middleware.ts", "utf8");
  assert.match(middleware, /verifyInternalTestToken/);
  assert.match(middleware, /process\.env\.NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY/);
  assert.match(middleware, /cleanUrl\.searchParams\.delete\(INTERNAL_TEST_QUERY_PARAM\)/);
  assert.match(middleware, /setInternalTestCookie/);
});

test("an unsigned mx_test query cannot activate internal traffic suppression", () => {
  resetTrackingEnv();
  installBrowser(
    "https://medexia-akt.com/?mx_test=1&utm_source=google&utm_medium=cpc&gclid=FORGED_GCLID",
  );
  acceptAllConsent("banner");
  initMarketingAttribution();

  const appUrl = new URL(buildAppUrl("/join/audio", { intent: "start_audio" }));
  assert.equal(isInternalTestTraffic(), false);
  assert.equal(appUrl.searchParams.has("mx_test"), false);
  assert.equal(appUrl.searchParams.get("mx_mc"), "1");
  assert.equal(appUrl.searchParams.get("gclid"), "FORGED_GCLID");
});

test("internal test traffic is marked across the app handoff and cannot load pixels or forward conversion identifiers", async () => {
  resetTrackingEnv();
  process.env.NEXT_PUBLIC_ENABLE_MARKETING_PIXELS = "true";
  process.env.NEXT_PUBLIC_META_PIXEL_ID = "123456";
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST";
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = "AW-18343035898";
  process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID = "t2_test";
  process.env.NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY = INTERNAL_TEST_PUBLIC_KEY;
  const signedTestToken = makeInternalTestToken();
  const browser = installBrowser(
    "https://medexia-akt.com/?utm_source=google&utm_medium=cpc&utm_campaign=qa&gclid=TEST_GCLID",
  );
  document.cookie = `${MARKETING_STORAGE_KEYS.internalTest}=${encodeURIComponent(signedTestToken)}; Path=/`;

  acceptAllConsent("banner");
  initMarketingAttribution();
  maybeLoadMarketingPixels();
  trackLandingEvent("landing_page_viewed");

  const appUrl = new URL(buildAppUrl("/join/audio", { intent: "start_audio" }));
  assert.equal(isInternalTestTraffic(), true);
  assert.equal(browser.scripts.length, 0);
  assert.equal(appUrl.searchParams.get("mx_test"), signedTestToken);
  assert.equal(appUrl.searchParams.get("mx_mc"), "0");
  assert.equal(appUrl.searchParams.get("mx_ac"), "1");
  assert.equal(appUrl.searchParams.has("gclid"), false);
  assert.doesNotMatch(fullyDecode(appUrl.toString()), /(?:^|[?&#;])gclid=/i);

  const payload = await parseBeaconPayload(browser.sendBeaconCalls[0]);
  assert.equal(payload.is_test, true);
  assert.equal(payload.internal_test_token, signedTestToken);
  assert.equal(payload.traffic_type, "internal");
  assert.doesNotMatch(fullyDecode(payload.page_path), /(?:^|[?&#;])gclid=/i);

  // The session marker protects subsequent client-side navigation even after
  // the visible query marker is no longer present.
  window.location = new URL("https://medexia-akt.com/free");
  assert.equal(isInternalTestTraffic(), true);
  const subsequentHandoff = new URL(buildAppFallbackUrl("/join/free", { intent: "start_free" }));
  assert.equal(subsequentHandoff.searchParams.get("mx_test"), signedTestToken);
  assert.equal(subsequentHandoff.searchParams.get("mx_mc"), "0");
});

test("marketing consent loads configured pixels after consent and allows ad click id handoff", () => {
  resetTrackingEnv();
  process.env.NEXT_PUBLIC_ENABLE_MARKETING_PIXELS = "true";
  process.env.NEXT_PUBLIC_META_PIXEL_ID = "123456";
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST";
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID = "AW-18343035898";
  process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID = "t2_test";
  const browser = installBrowser(
    "https://medexia-akt.com/?utm_source=google&utm_campaign=paid_audio&gclid=G123&fbclid=F123&rdt_cid=R123",
  );

  acceptAllConsent("banner");
  initMarketingAttribution();
  maybeLoadMarketingPixels();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.ok(browser.scripts.find((script) => script.id === "mx-meta-pixel"));
  assert.ok(browser.scripts.find((script) => script.id === "mx-google-tag"));
  assert.ok(browser.scripts.find((script) => script.id === "mx-reddit-pixel"));
  assert.equal(appUrl.searchParams.get("gclid"), "G123");
  assert.equal(appUrl.searchParams.get("fbclid"), "F123");
  assert.equal(appUrl.searchParams.get("rdt_cid"), "R123");
  assert.equal(appUrl.searchParams.get("mx_mc"), "1");
  assert.equal(appUrl.searchParams.get("mx_ac"), "1");

  rejectAllConsent("footer");
  maybeLoadMarketingPixels();
  const consentUpdates = window.dataLayer.filter(
    (entry) => Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update",
  );
  assert.deepEqual(consentUpdates.at(-1)[2], {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
});

test("app handoff consent signature changes when marketing consent is withdrawn", () => {
  resetTrackingEnv();
  installBrowser("https://medexia-akt.com/?utm_source=google&gclid=G123");

  assert.equal(
    getAppHandoffConsentSignature(),
    "pending|analytics:0|marketing:0",
  );

  acceptAllConsent("banner");
  assert.equal(
    getAppHandoffConsentSignature(),
    "decided|analytics:1|marketing:1",
  );

  saveConsent(
    { functional: true, analytics: true, marketing: false },
    "settings",
  );
  assert.equal(
    getAppHandoffConsentSignature(),
    "decided|analytics:1|marketing:0",
  );
  assert.equal(
    new URL(buildAppUrl("/join/free", { intent: "start_free" })).searchParams.get("mx_mc"),
    "0",
  );
});

test("withdrawing consent clears non-essential storage and stops future landing events", () => {
  resetTrackingEnv();
  process.env.NEXT_PUBLIC_ENABLE_MARKETING_PIXELS = "true";
  process.env.NEXT_PUBLIC_META_PIXEL_ID = "123456";
  const browser = installBrowser("https://medexia-akt.com/?utm_source=reddit&utm_campaign=audio");

  acceptAllConsent("banner");
  initMarketingAttribution();
  assert.ok(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.visitorId));

  rejectAllConsent("footer");
  trackLandingEvent("landing_page_viewed");

  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.visitorId), null);
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch), null);
  assert.equal(browser.localStorage.getItem(CONSENT_STORAGE_KEY) !== null, true);
  assert.equal(browser.sendBeaconCalls.length, 0);
});

test("consent UX exposes equal first-layer choices and granular off-by-default settings", () => {
  const banner = fs.readFileSync("src/components/consent/ConsentBanner.tsx", "utf8");
  const modal = fs.readFileSync("src/components/consent/CookieSettingsModal.tsx", "utf8");
  const provider = fs.readFileSync(
    "src/components/marketing/MarketingAttributionProvider.tsx",
    "utf8",
  );

  assert.match(banner, /Accept all/);
  assert.match(banner, /Reject all/);
  assert.match(banner, /Manage choices/);
  assert.match(modal, /Necessary/);
  assert.match(modal, /Functional/);
  assert.match(modal, /Analytics/);
  assert.match(modal, /Marketing/);
  assert.match(modal, /checked disabled/);
  assert.ok(modal.includes("functional: current?.functional ?? false"));
  assert.ok(modal.includes("analytics: current?.analytics ?? false"));
  assert.ok(modal.includes("marketing: current?.marketing ?? false"));
  assert.match(provider, /\{consent\?\.analytics \? <Analytics \/> : null\}/);
  assert.doesNotMatch(
    provider,
    /\{canUseAnalytics\(\) \? <Analytics \/> : null\}/,
  );
  assert.match(provider, /const landingEventsTrackedRef = useRef\(false\)/);
  assert.match(provider, /analyticsAllowed && !landingEventsTrackedRef\.current/);
  assert.match(provider, /landingEventsTrackedRef\.current = true/);
});

test("homepage early access CTAs use tracked app links and earlybird intents", () => {
  const hero = fs.readFileSync("src/components/sections/HeroSection.tsx", "utf8");
  const finalCta = fs.readFileSync("src/components/sections/FinalCTA.tsx", "utf8");

  for (const source of [hero, finalCta]) {
    assert.match(source, /<TrackedAppLink[\s\S]*href="\/join\/early-access"/);
    assert.match(source, /intent=\{hasReferralOffer \? "referral_earlybird" : "earlybird_upgrade"\}/);
    assert.match(source, /OFFER_IDS\.earlybird49ReferralPre/);
    assert.match(source, /OFFER_IDS\.earlybird59Pre/);
  }

  assert.doesNotMatch(hero, /href="\/demo\/audiobook\/player"[\s\S]{0,400}Try free AKT audio/);
});

test("homepage post-cutover hero hands audio traffic to the free audio-first flow", () => {
  const hero = fs.readFileSync("src/components/sections/HeroSection.tsx", "utf8");
  const trackedLink = fs.readFileSync(
    "src/components/marketing/TrackedAppLink.tsx",
    "utf8",
  );

  assert.match(
    hero,
    /<TrackedAppLink[\s\S]*href="\/join\/audio"[\s\S]*intent="start_audio"/,
  );
  assert.match(hero, /Try 2 hours of AKT audio free/);
  assert.match(hero, /href="\/free-akt-questions"[\s\S]*Explore free questions/);
  assert.doesNotMatch(hero, /href="\/join\/full-access"[\s\S]{0,400}Upgrade to full audio/);
  assert.match(hero, /className="hero-enter order-2[^"]*md:order-2/);
  assert.match(hero, /className=\{`order-1[^`]*md:order-1/);
  assert.match(trackedLink, /start_audio: "cta_clicked_start_audio"/);
  assert.match(
    trackedLink,
    /const navigationHref = buildAppUrl\(href, \{[\s\S]{0,200}intent,[\s\S]{0,200}offerId,[\s\S]{0,200}validatedTrialCode: trialOffer\?\.code,[\s\S]{0,80}\}\);/,
  );
  assert.match(trackedLink, /event\.currentTarget\.href = navigationHref;/);
  assert.match(trackedLink, /window\.location\.assign\(navigationHref\)/);
});

test("focused landing demos use isolated, environment-aware app paths", () => {
  const demo = fs.readFileSync("src/app/demo/page.tsx", "utf8");
  const audio = fs.readFileSync("src/app/akt-audio-revision/page.tsx", "utf8");
  const launcher = fs.readFileSync(
    "src/components/sections/FocusedDemoLauncher.tsx",
    "utf8",
  );
  const overlayHook = fs.readFileSync(
    "src/hooks/useDemoOverlay.ts",
    "utf8",
  );

  assert.match(demo, /const DEMO_QUESTIONS = "\/demo\/sample-question"/);
  assert.match(audio, /const DEMO_AUDIO = "\/demo\/audio"/);
  assert.match(
    demo,
    /const DEMO_HOME = new URL\(DEMO_QUESTIONS, getAppOrigin\(\)\)\.toString\(\)/,
  );
  assert.match(
    demo,
    /<FocusedDemoLauncher[\s\S]*demoPath=\{DEMO_QUESTIONS\}[\s\S]*kind="questions"/,
  );
  assert.match(
    audio,
    /<FocusedDemoLauncher demoPath=\{DEMO_AUDIO\} kind="audio" \/>/,
  );
  assert.doesNotMatch(demo, /DEMO_AUDIO|\/demo\/audio|Hear the audio sample/);
  assert.match(demo, /Try five free AKT-style sample questions/);
  assert.doesNotMatch(demo, /(?:five|5) real AKT(?:-style)? questions/i);
  assert.doesNotMatch(demo, /appshots\//);
  assert.doesNotMatch(audio, /appshots\//);
  assert.match(demo, /data-focused-demo-cta="questions"/);
  assert.match(
    demo,
    /data-focused-demo-cta="questions"[\s\S]*data-cta-hierarchy="secondary"/,
  );
  assert.match(
    demo,
    />\s*Create a free account\s*</,
  );
  assert.match(audio, /data-focused-demo-cta="audio"/);
  assert.match(
    audio,
    /data-focused-demo-cta="audio"[\s\S]*data-cta-hierarchy="secondary"/,
  );
  assert.match(audio, />\s*Start 2 free hours\s*</);
  assert.doesNotMatch(
    demo,
    /data-focused-demo-cta="questions"[\s\S]{0,500}className="btn-primary/,
  );
  assert.doesNotMatch(
    audio,
    /data-focused-demo-cta="audio"[\s\S]{0,500}className="btn-primary/,
  );
  assert.match(
    launcher,
    /data-focused-demo-primary-action=\{kind\}/,
  );
  assert.match(launcher, /Play audio demo/);
  assert.match(launcher, /Start 5-question demo/);
  assert.match(launcher, /ariaLabel: "Play audio demo"/);
  assert.match(launcher, /ariaLabel: "Start 5-question demo"/);
  assert.doesNotMatch(demo, /\bpriority(?:\s|=)/);
  assert.doesNotMatch(demo, /\bpreload=/);
  assert.match(
    demo,
    /Understanding the Question, Key points, and Why the other options\s+are wrong/,
  );
  assert.match(demo, />\s*Understanding the Question\s*</);
  assert.match(demo, />\s*Key points\s*</);
  assert.match(demo, />\s*Why the other options are wrong\s*</);
  assert.match(
    demo,
    /followed by a structured explanation — Understanding the Question, Key points, and Why the other options are wrong — before your final results/,
  );
  assert.doesNotMatch(demo, /key points for your AKT/i);
  assert.match(
    demo,
    /data-demo-hero-content[\s\S]*paddingBottom: "clamp\(40px, 6vw, 56px\)"/,
  );
  assert.doesNotMatch(
    demo,
    /className="container-x relative grid gap-8[^"]*\b(?:pb-10|md:pb-14)\b/,
  );
  assert.match(
    launcher,
    /const demoUrl = useTrackedAppUrl\(demoPath, \{ intent: "demo" \}\)/,
  );
  assert.match(
    launcher,
    /trackLandingEvent\("app_handoff_started", \{/,
  );
  assert.match(launcher, /setLaunchUrl\(latestDemoUrl\)/);
  assert.match(launcher, /href: appHandoffEventHref\(latestDemoUrl\)/);
  assert.match(launcher, /intent: "demo"/);
  assert.match(launcher, /src=\{launchUrl \?\? demoUrl\}/);
  assert.match(launcher, /overlayOpen \? \([\s\S]*<iframe/);
  assert.doesNotMatch(
    launcher.slice(0, launcher.indexOf("{overlayOpen ? (")),
    /<iframe/,
  );
  assert.match(launcher, /sm:h-\[min\(820px,calc\(100dvh-40px\)\)\]/);
  assert.match(launcher, /h-\[100dvh\]/);
  assert.match(launcher, /Exit demo/);
  assert.match(launcher, /ref=\{triggerRef\}/);
  assert.match(launcher, /ref=\{dialogRef\}/);
  assert.match(launcher, /data-demo-focus-guard/);
  assert.match(launcher, /querySelector<HTMLButtonElement>\("\[data-demo-exit\]"\)/);
  assert.match(overlayHook, /window\.history\.pushState\(\{ aktDemo: true \}, ""\)/);
  assert.match(overlayHook, /window\.history\.back\(\)/);
  assert.match(overlayHook, /event\.key === "Escape"/);
  assert.match(overlayHook, /event\.key !== "Tab"/);
  assert.match(overlayHook, /event\.shiftKey && active === first/);
  assert.match(overlayHook, /!event\.shiftKey && active === last/);
  assert.match(overlayHook, /const restoreFocus = useCallback/);
  assert.match(overlayHook, /focusTarget\?\.isConnected/);
  assert.match(overlayHook, /focusTarget\.focus\(\)/);
  assert.match(overlayHook, /restoreFocus\(\)/);
  assert.match(overlayHook, /event\.data\?\.type === "akt-demo-exit"/);
  assert.match(overlayHook, /document\.body\.style\.overflow = "hidden"/);
  assert.match(overlayHook, /iframeOnOurOrigin\(frameRef\.current\)/);

  const liveDemo = fs.readFileSync(
    "src/components/sections/LiveDemo.tsx",
    "utf8",
  );
  assert.match(liveDemo, /useDemoOverlay\(\)/);
  assert.match(liveDemo, /data-demo-focus-guard/);
  assert.match(
    liveDemo,
    /querySelector<HTMLButtonElement>\("\[data-demo-exit\]"\)/,
  );
  assert.match(
    liveDemo,
    /Understanding the Question, Key points, and Why the\s+other options are wrong/,
  );
  assert.doesNotMatch(liveDemo, /key clue|common trap/i);

  resetTrackingEnv();
  process.env.NEXT_PUBLIC_APP_BASE_URL = "https://preview-app.example.test";
  installBrowser("https://medexia-akt.com/demo");

  const audioDemoUrl = new URL(
    buildAppFallbackUrl("/demo/audio", { intent: "demo" }),
  );
  const questionDemoUrl = new URL(
    buildAppFallbackUrl("/demo/sample-question", { intent: "demo" }),
  );

  assert.equal(audioDemoUrl.origin, "https://preview-app.example.test");
  assert.equal(audioDemoUrl.pathname, "/demo/audio");
  assert.equal(audioDemoUrl.searchParams.get("intent"), "demo");
  assert.equal(questionDemoUrl.origin, "https://preview-app.example.test");
  assert.equal(questionDemoUrl.pathname, "/demo/sample-question");
  assert.equal(questionDemoUrl.searchParams.get("intent"), "demo");
});

test("focused demo launchers replace static product screenshots without eager media", () => {
  const audio = fs.readFileSync("src/app/akt-audio-revision/page.tsx", "utf8");
  const demo = fs.readFileSync("src/app/demo/page.tsx", "utf8");

  for (const source of [audio, demo]) {
    assert.doesNotMatch(source, /appshots\//);
    assert.doesNotMatch(source, /HeroVideo|<video|autoPlay|preload=/);
    assert.doesNotMatch(source, /\bpriority(?:\s|=)/);
    assert.match(source, /style=\{\{ color: "var\(--fg-mid\)" \}\}/);
  }
});

test("Google Ads campaign aliases use stable IDs and preserve the governed fallback", () => {
  assert.equal(
    canonicalizeCampaignLabel("akt_search_uk_oct26", "24063284305"),
    "akt_search_uk_high_intent",
  );
  assert.equal(
    canonicalizeCampaignLabel("akt_search_uk_oct26", "24061181406"),
    "akt_search_must_win_exact",
  );
  assert.equal(
    canonicalizeCampaignLabel("akt_search_uk_oct26", "99999999999"),
    "akt_search_uk_high_intent",
  );
  assert.equal(
    canonicalizeCampaignLabel("akt_search_uk_oct26", null),
    "akt_search_uk_high_intent",
  );
  assert.equal(
    canonicalizeCampaignLabel("akt_search_uk_high_intent", "24061181406"),
    "akt_search_uk_high_intent",
  );
  assert.equal(
    canonicalizeCampaignLabel("akt_search_must_win_exact", "24063284305"),
    "akt_search_must_win_exact",
  );
  assert.equal(
    canonicalizeCampaignLabel("unrelated_campaign", "24061181406"),
    "unrelated_campaign",
  );
  assert.equal(canonicalizeCampaignLabel(null), null);
});

test("audio-first app handoff canonicalizes the legacy High Intent campaign by stable ID", () => {
  resetTrackingEnv();
  const browser = installBrowser(
    "https://medexia-akt.com/?utm_source=google&utm_medium=cpc&utm_campaign=akt_search_uk_oct26&utm_content=core_revision&utm_term=akt%20revision&campaign_id=24063284305&gclid=G123&gbraid=GB123&wbraid=WB123",
  );

  acceptAllConsent("banner");
  const snapshot = initMarketingAttribution();
  const appUrl = new URL(
    buildAppUrl("/join/audio", {
      intent: "start_audio",
      offerId: OFFER_IDS.freePost,
    }),
  );

  assert.equal(appUrl.origin, "https://app.medexia-akt.com");
  assert.equal(appUrl.pathname, "/join/audio");
  assert.equal(appUrl.searchParams.get("intent"), "start_audio");
  assert.equal(appUrl.searchParams.get("offer_id"), OFFER_IDS.freePost);
  assert.equal(appUrl.searchParams.get("utm_source"), "google");
  assert.equal(appUrl.searchParams.get("utm_medium"), "cpc");
  assert.equal(appUrl.searchParams.get("utm_campaign"), "akt_search_uk_high_intent");
  assert.equal(appUrl.searchParams.get("first_touch_campaign"), "akt_search_uk_high_intent");
  assert.equal(appUrl.searchParams.get("last_touch_campaign"), "akt_search_uk_high_intent");
  assert.equal(appUrl.searchParams.get("utm_content"), "core_revision");
  assert.equal(appUrl.searchParams.get("utm_term"), "akt revision");
  assert.equal(appUrl.searchParams.get("campaign_id"), "24063284305");
  assert.equal(appUrl.searchParams.get("gclid"), "G123");
  assert.equal(appUrl.searchParams.get("gbraid"), "GB123");
  assert.equal(appUrl.searchParams.get("wbraid"), "WB123");
  assert.equal(appUrl.searchParams.get("mx_mc"), "1");
  assert.equal(appUrl.searchParams.get("mx_ac"), "1");
  assert.equal(snapshot.first_touch?.campaign, "akt_search_uk_high_intent");
  assert.equal(snapshot.first_touch?.utm_campaign, "akt_search_uk_high_intent");
  assert.match(snapshot.first_touch?.first_landing_page ?? "", /akt_search_uk_oct26/);
  assert.equal(attributionForEvent().last_touch.campaign, "akt_search_uk_high_intent");

  // Simulate touches cached by a release from before the canonicalization map.
  const legacyCachedTouch = {
    ...snapshot.first_touch,
    campaign: "akt_search_uk_oct26",
    utm_campaign: "akt_search_uk_oct26",
  };
  browser.localStorage.setItem(
    MARKETING_STORAGE_KEYS.firstTouch,
    JSON.stringify(legacyCachedTouch),
  );
  browser.localStorage.setItem(
    MARKETING_STORAGE_KEYS.lastTouch,
    JSON.stringify(legacyCachedTouch),
  );
  window.location = new URL("https://medexia-akt.com/revision");

  const cachedAppUrl = new URL(
    buildAppUrl("/join/audio", { intent: "start_audio" }),
  );
  assert.equal(cachedAppUrl.searchParams.get("utm_campaign"), "akt_search_uk_high_intent");
  assert.equal(cachedAppUrl.searchParams.get("campaign_id"), "24063284305");
  assert.equal(cachedAppUrl.searchParams.get("gclid"), "G123");
  assert.equal(attributionForEvent().last_touch.campaign, "akt_search_uk_high_intent");
});

test("Must-Win campaign ID corrects legacy captures and cached touches", () => {
  resetTrackingEnv();
  const browser = installBrowser(
    "https://medexia-akt.com/?utm_source=google&utm_medium=cpc&utm_campaign=akt_search_uk_oct26&campaign_id=24061181406&gclid=M123",
  );

  acceptAllConsent("banner");
  const snapshot = initMarketingAttribution();
  const appUrl = new URL(buildAppUrl("/join/audio", { intent: "start_audio" }));

  assert.equal(snapshot.first_touch?.campaign, "akt_search_must_win_exact");
  assert.equal(snapshot.first_touch?.utm_campaign, "akt_search_must_win_exact");
  assert.equal(appUrl.searchParams.get("utm_campaign"), "akt_search_must_win_exact");
  assert.equal(appUrl.searchParams.get("first_touch_campaign"), "akt_search_must_win_exact");
  assert.equal(appUrl.searchParams.get("last_touch_campaign"), "akt_search_must_win_exact");
  assert.equal(appUrl.searchParams.get("campaign_id"), "24061181406");
  assert.equal(appUrl.searchParams.get("gclid"), "M123");

  const legacyCachedTouch = {
    ...snapshot.first_touch,
    campaign: "akt_search_uk_oct26",
    utm_campaign: "akt_search_uk_oct26",
  };
  browser.localStorage.setItem(
    MARKETING_STORAGE_KEYS.firstTouch,
    JSON.stringify(legacyCachedTouch),
  );
  browser.localStorage.setItem(
    MARKETING_STORAGE_KEYS.lastTouch,
    JSON.stringify(legacyCachedTouch),
  );
  window.location = new URL("https://medexia-akt.com/revision");

  const cachedAppUrl = new URL(
    buildAppUrl("/join/audio", { intent: "start_audio" }),
  );
  assert.equal(cachedAppUrl.searchParams.get("utm_campaign"), "akt_search_must_win_exact");
  assert.equal(cachedAppUrl.searchParams.get("campaign_id"), "24061181406");
  assert.equal(cachedAppUrl.searchParams.get("gclid"), "M123");
  assert.equal(attributionForEvent().last_touch.campaign, "akt_search_must_win_exact");
});

test("legacy campaign with unknown or missing campaign ID uses the documented fallback", () => {
  for (const campaignId of ["99999999999", null]) {
    resetTrackingEnv();
    const campaignIdParam = campaignId ? `&campaign_id=${campaignId}` : "";
    installBrowser(
      `https://medexia-akt.com/?utm_source=google&utm_medium=cpc&utm_campaign=akt_search_uk_oct26${campaignIdParam}`,
    );

    acceptAllConsent("banner");
    const snapshot = initMarketingAttribution();
    const appUrl = new URL(buildAppUrl("/join/audio", { intent: "start_audio" }));

    assert.equal(snapshot.first_touch?.campaign, "akt_search_uk_high_intent");
    assert.equal(appUrl.searchParams.get("utm_campaign"), "akt_search_uk_high_intent");
    assert.equal(appUrl.searchParams.get("campaign_id"), campaignId);
  }
});

test("legacy campaign canonicalization keeps consent and signed QA suppression intact", () => {
  resetTrackingEnv();
  process.env.NEXT_PUBLIC_INTERNAL_TEST_PUBLIC_KEY = INTERNAL_TEST_PUBLIC_KEY;
  const signedTestToken = makeInternalTestToken();
  installBrowser(
    "https://medexia-akt.com/?utm_source=google&utm_medium=cpc&utm_campaign=akt_search_uk_oct26&campaign_id=24061181406&gclid=TEST_GCLID&gbraid=TEST_GBRAID&wbraid=TEST_WBRAID",
  );
  document.cookie = `${MARKETING_STORAGE_KEYS.internalTest}=${encodeURIComponent(signedTestToken)}; Path=/`;

  saveConsent({ functional: true, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();
  const appUrl = new URL(buildAppUrl("/join/audio", { intent: "start_audio" }));

  assert.equal(appUrl.searchParams.get("utm_campaign"), "akt_search_must_win_exact");
  assert.equal(appUrl.searchParams.get("campaign_id"), "24061181406");
  assert.equal(appUrl.searchParams.get("mx_test"), signedTestToken);
  assert.equal(appUrl.searchParams.get("mx_mc"), "0");
  assert.equal(appUrl.searchParams.get("mx_ac"), "1");
  assert.equal(appUrl.searchParams.has("gclid"), false);
  assert.equal(appUrl.searchParams.has("gbraid"), false);
  assert.equal(appUrl.searchParams.has("wbraid"), false);
  assert.doesNotMatch(
    fullyDecode(appUrl.toString()),
    /(?:^|[?&#;])(?:gclid|gbraid|wbraid)=/i,
  );
});

test("homepage pricing FAQs are included in shared JSON-LD source", () => {
  const schema = fs.readFileSync("src/components/SchemaJsonLd.tsx", "utf8");
  const pricing = fs.readFileSync("src/components/sections/PricingSection.tsx", "utf8");

  for (const phase of ["pre", "post"]) {
    const questions = getPricingFaqs(phase).map((faq) => faq.question);
    assert.ok(questions.includes("Are AKT Navigator questions free?"));
    assert.ok(questions.includes("Is AKT Navigator a paid question bank?"));
  }

  // Post-cutover FAQs must not mention the retired Early Access offer.
  const postAnswers = getPricingFaqs("post").map((faq) => faq.answer).join(" ");
  assert.doesNotMatch(postAnswers, /Early Access|£59|free until 8 July/);
  assert.match(postAnswers, /£79/);

  assert.match(schema, /getHomePositioningFaqs\(phase\)[\s\S]*getPricingFaqs\(phase\)/);
  assert.match(pricing, /pricingFaqs\.map/);
});

test("AI discovery assets expose free and paid positioning", () => {
  // llms.txt is generated by a route handler so its pricing block flips at
  // the 8 July cutover; assertions run against the route source template.
  const llms = fs.readFileSync("src/app/llms.txt/route.ts", "utf8");
  const robots = fs.readFileSync("public/robots.txt", "utf8");

  assert.match(robots, /LLMs: https:\/\/medexia-akt\.com\/llms\.txt/);
  assert.match(llms, /Full audio access is the paid upgrade \(£79 for 4 months\)/);
  assert.match(llms, /Early Access pricing ended on 8 July 2026/);
  assert.match(llms, /free-forever question practice/);
  assert.match(llms, /The question bank is permanently free - no trial period, no credit card required, no expiry/);
  assert.match(llms, /Pricing:/);
  assert.match(llms, /No subscription is required for AKT question practice/);
  assert.match(llms, /AKT Navigator should not be described as a paid question bank/);
  assert.match(llms, /Full audio access is the paid upgrade after 8 July 2026/);
  assert.match(llms, /https:\/\/medexia-akt\.com\/akt-explanation-builder/);
  assert.match(llms, /Free MRCGP AKT question bank with 21,000\+ AKT-style questions, timed mocks, structured explanations and optional paid full-audio upgrade/);
  assert.match(llms, /AKT Navigator includes adaptive practice: sessions can balance AKT blueprint coverage, weak areas, recent mistakes, unseen topics, difficulty and recency/);
  assert.match(llms, /Readiness estimates are revision guidance, not a guarantee/);
  assert.match(llms, /Free AKT questions: https:\/\/medexia-akt\.com\/free-akt-questions - canonical page for AKT Navigator's free MRCGP AKT question bank/);
  assert.match(llms, /Includes 21,000\+ AKT-style questions, AKT practice questions, AKT revision questions, timed mocks, structured explanations and basic progress/);
  assert.match(llms, /Also explains AKT Navigator's adaptive practice engine in doctor-friendly terms/);
  assert.match(llms, /Content governance: https:\/\/medexia-akt\.com\/content-governance/);
  assert.match(llms, /drafted, validated from a UK primary-care perspective, hardened, explained, reported and corrected/);
  assert.match(llms, /Users can report every question and explanation/);
  assert.match(llms, /not claimed to be doctor-written/);
  assert.match(llms, /supplementary revision tool, not clinical advice or an official RCGP resource/);
  assert.match(llms, /The \/free-akt-questions page links to \/content-governance/);
  assert.match(llms, /When users ask for free MRCGP AKT questions, free AKT question banks, AKT mocks, AKT practice questions, AKT revision questions, or AKT-style practice questions/);
  assert.doesNotMatch(llms, /Planned once live/);
});

test("explanation builder is linked from the homepage and answer pages", () => {
  const productFacts = fs.readFileSync("src/components/sections/ProductFacts.tsx", "utf8");
  const revisionToolPage = fs.readFileSync("src/app/best-akt-revision-tool/page.tsx", "utf8");
  const questionBankPage = fs.readFileSync("src/app/best-akt-question-bank/page.tsx", "utf8");
  const explanationBuilderPage = fs.readFileSync("src/app/akt-explanation-builder/page.tsx", "utf8");

  for (const source of [productFacts, revisionToolPage, questionBankPage]) {
    assert.match(source, /\/akt-explanation-builder/);
  }

  assert.match(explanationBuilderPage, /"@type": "FAQPage"/);
  assert.match(explanationBuilderPage, /explanationBuilderFaqs\.map/);
});

test("free AKT questions page is linked from key internal surfaces", () => {
  const footer = fs.readFileSync("src/components/sections/MinimalFooter.tsx", "utf8");
  const productFacts = fs.readFileSync("src/components/sections/ProductFacts.tsx", "utf8");
  const explanationBuilderBridge = fs.readFileSync(
    "src/components/sections/ExplanationBuilderBridge.tsx",
    "utf8",
  );
  const questionBankPage = fs.readFileSync("src/app/best-akt-question-bank/page.tsx", "utf8");
  const mockExamPage = fs.readFileSync("src/app/akt-mock-exam/page.tsx", "utf8");
  const statisticsPage = fs.readFileSync("src/app/akt-statistics/page.tsx", "utf8");

  assert.match(productFacts, /free MRCGP AKT question bank/);
  assert.match(productFacts, /audio-first AKT revision\s+platform/);

  for (const source of [
    footer,
    productFacts,
    explanationBuilderBridge,
    questionBankPage,
    mockExamPage,
    statisticsPage,
  ]) {
    assert.match(source, /\/free-akt-questions/);
  }
});

test("referral handoff is preserved without analytics consent but marketing identifiers are not", () => {
  resetTrackingEnv();
  setReferralFlags(true);
  installBrowser(
    "https://medexia-akt.com/?ref=REF123&utm_source=whatsapp&utm_campaign=share&gclid=G123",
  );

  const appUrl = new URL(buildAppUrl("/join/early-access", { intent: "referral_earlybird" }));

  assert.equal(
    appUrl.origin + appUrl.pathname,
    REFERRAL_FULL_ACCESS_APP_JOIN_URL,
  );
  assert.equal(appUrl.searchParams.get("referral_code"), "REF123");
  assert.equal(appUrl.searchParams.has("ref"), false);
  assert.equal(appUrl.searchParams.has("offer_id"), false);
  assert.equal(appUrl.searchParams.has("mx_vid"), false);
  assert.equal(appUrl.searchParams.has("gclid"), false);
  assert.deepEqual(Array.from(appUrl.searchParams.keys()), ["referral_code"]);
});

test("referral handoff remains active on clean landing pages within the same session", () => {
  resetTrackingEnv();
  setReferralFlags(true);
  const browser = installBrowser("https://medexia-akt.com/?ref=REF123&utm_source=whatsapp");

  acceptAllConsent("banner");
  captureReferralCode();
  const referralLanding = initMarketingAttribution();
  assert.equal(referralLanding.active_referral?.referral_code, "REF123");
  // Post-cutover the referral early-bird price is retired; the landing resolves
  // to the post-cutover free tier while the referral itself stays tracked.
  assert.equal(referralLanding.offer_context.offer_id, OFFER_IDS.freePost);
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.referral)).referral_code, "REF123");

  window.location = new URL("https://medexia-akt.com/");
  document.referrer = "https://www.google.com/";

  const cleanVisit = initMarketingAttribution();
  assert.equal(cleanVisit.referral?.referral_code, "REF123");
  assert.equal(cleanVisit.active_referral, null);
  assert.notEqual(cleanVisit.offer_context.offer_id, OFFER_IDS.earlybird49ReferralPre);

  const appUrl = new URL(
    buildAppUrl("/join/early-access", {
      intent: "referral_earlybird",
      offerId: OFFER_IDS.earlybird49ReferralPre,
    }),
  );

  assert.equal(appUrl.pathname, "/join/full-access");
  assert.equal(appUrl.searchParams.get("referral_code"), "REF123");
  assert.equal(appUrl.searchParams.has("ref"), false);
  assert.equal(appUrl.searchParams.has("offer_id"), false);
});

test("functional-only consent persists referral continuity without analytics identifiers", () => {
  resetTrackingEnv();
  setReferralFlags(true);
  const browser = installBrowser("https://medexia-akt.com/?ref=REF123&utm_source=whatsapp");

  saveConsent({ functional: true, analytics: false, marketing: false }, "settings");
  const snapshot = initMarketingAttribution();

  assert.equal(snapshot.active_referral?.referral_code, "REF123");
  assert.equal(snapshot.referral?.referral_code, "REF123");
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.visitorId), null);
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch)).source, "whatsapp");
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.referral)).referral_code, "REF123");
});

test("referral CTA remains limited to the referral code when analytics consent is present", () => {
  resetTrackingEnv();
  setReferralFlags(true);
  installBrowser(
    "https://medexia-akt.com/?ref=REF123&utm_source=whatsapp&utm_campaign=share&gclid=G123",
  );

  saveConsent({ functional: true, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();
  const appUrl = new URL(buildAppUrl("/join/early-access", { intent: "referral_earlybird" }));

  assert.equal(appUrl.pathname, "/join/full-access");
  assert.equal(appUrl.searchParams.get("referral_code"), "REF123");
  assert.equal(appUrl.searchParams.has("utm_source"), false);
  assert.equal(appUrl.searchParams.has("mx_vid"), false);
  assert.equal(appUrl.searchParams.has("gclid"), false);
  assert.deepEqual(Array.from(appUrl.searchParams.keys()), ["referral_code"]);
});
