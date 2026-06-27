import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

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
  determineOfferContext,
  getMarketingSnapshot,
  initMarketingAttribution,
  normalizeReferralCode,
} = await importBundled("src/lib/marketing/attribution.ts");
const { buildAppFallbackUrl, buildAppUrl } = await importBundled("src/lib/marketing/url.ts");
const {
  CONSENT_STORAGE_KEY,
  acceptAllConsent,
  rejectAllConsent,
  saveConsent,
} = await importBundled("src/lib/consent/consent.ts");
const { flushLandingEvent, trackLandingEvent } = await importBundled("src/lib/marketing/events.ts");
const { maybeLoadMarketingPixels } = await importBundled("src/lib/marketing/pixels.ts");

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

function installBrowser(url, referrer = "") {
  const localStorage = storageMock();
  const sessionStorage = storageMock();
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
  process.env.NEXT_PUBLIC_CONSENT_BANNER_ENABLED = "true";
  process.env.NEXT_PUBLIC_CONSENT_VERSION = "2026-06-23-v1";
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

test("app url fallback targets the deployed Replit app domain", () => {
  resetTrackingEnv();
  delete process.env.NEXT_PUBLIC_APP_BASE_URL;
  installBrowser("https://landing.medexia-akt.com/");

  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(appUrl.origin, "https://app.medexia-akt.com");
  assert.equal(appUrl.pathname, "/join/free");
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
  assert.equal(payload.first_touch.utm_source, "reddit");
  assert.equal(payload.first_touch.utm_campaign, "audio_first_post");
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

test("fresh visitor with no consent creates no marketing storage, events, pixels, or attributed app params", () => {
  resetTrackingEnv();
  setReferralFlags(false);
  const browser = installBrowser("https://medexia-akt.com/?utm_source=reddit&utm_campaign=audio_first_post&gclid=G123");

  const snapshot = getMarketingSnapshot();
  trackLandingEvent("landing_page_viewed");
  maybeLoadMarketingPixels();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.equal(snapshot.mx_visitor_id, null);
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.visitorId), null);
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch), null);
  assert.equal(browser.sendBeaconCalls.length, 0);
  assert.equal(browser.fetchCalls.length, 0);
  assert.equal(browser.scripts.length, 0);
  assert.equal(appUrl.searchParams.has("mx_vid"), false);
  assert.equal(appUrl.searchParams.has("utm_source"), false);
  assert.equal(appUrl.searchParams.has("gclid"), false);
});

test("reject all stores the decision and leaves analytics and pixels disabled", () => {
  resetTrackingEnv();
  const browser = installBrowser("https://medexia-akt.com/?utm_source=reddit");

  const consent = rejectAllConsent("banner");
  initMarketingAttribution();
  trackLandingEvent("landing_page_viewed");
  maybeLoadMarketingPixels();

  assert.equal(consent.analytics, false);
  assert.equal(consent.marketing, false);
  assert.ok(browser.localStorage.getItem(CONSENT_STORAGE_KEY));
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.visitorId), null);
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch), null);
  assert.equal(browser.sendBeaconCalls.length, 0);
  assert.equal(browser.scripts.length, 0);
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
  assert.equal(browser.sendBeaconCalls.length, 1);
  assert.equal(browser.scripts.length, 0);
  assert.equal(appUrl.searchParams.get("utm_source"), "reddit");
  assert.ok(appUrl.searchParams.get("mx_vid"));
  assert.equal(appUrl.searchParams.has("gclid"), false);
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

test("marketing consent loads configured pixels after consent and allows ad click id handoff", () => {
  resetTrackingEnv();
  process.env.NEXT_PUBLIC_ENABLE_MARKETING_PIXELS = "true";
  process.env.NEXT_PUBLIC_META_PIXEL_ID = "123456";
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST";
  const browser = installBrowser(
    "https://medexia-akt.com/?utm_source=google&utm_campaign=paid_audio&gclid=G123&fbclid=F123",
  );

  acceptAllConsent("banner");
  initMarketingAttribution();
  maybeLoadMarketingPixels();
  const appUrl = new URL(buildAppUrl("/join/free", { intent: "start_free" }));

  assert.ok(browser.scripts.find((script) => script.id === "mx-meta-pixel"));
  assert.ok(browser.scripts.find((script) => script.id === "mx-google-tag"));
  assert.equal(appUrl.searchParams.get("gclid"), "G123");
  assert.equal(appUrl.searchParams.get("fbclid"), "F123");
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

test("referral handoff is preserved without analytics consent but marketing identifiers are not", () => {
  resetTrackingEnv();
  setReferralFlags(true);
  installBrowser(
    "https://medexia-akt.com/?ref=REF123&utm_source=whatsapp&utm_campaign=share&gclid=G123",
  );

  const appUrl = new URL(buildAppUrl("/join/early-access", { intent: "referral_earlybird" }));

  assert.equal(appUrl.searchParams.get("referral_code"), "REF123");
  assert.equal(appUrl.searchParams.get("ref"), "REF123");
  assert.equal(appUrl.searchParams.get("offer_id"), OFFER_IDS.earlybird49ReferralPre);
  assert.equal(appUrl.searchParams.has("utm_source"), false);
  assert.equal(appUrl.searchParams.has("mx_vid"), false);
  assert.equal(appUrl.searchParams.has("gclid"), false);
});

test("stored referral does not show or hand off the referral price on clean visits", () => {
  resetTrackingEnv();
  setReferralFlags(true);
  const browser = installBrowser("https://medexia-akt.com/?ref=REF123&utm_source=whatsapp");

  acceptAllConsent("banner");
  const referralLanding = initMarketingAttribution();
  assert.equal(referralLanding.active_referral?.referral_code, "REF123");
  assert.equal(referralLanding.offer_context.offer_id, OFFER_IDS.earlybird49ReferralPre);
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

  assert.equal(appUrl.searchParams.has("referral_code"), false);
  assert.equal(appUrl.searchParams.has("ref"), false);
  assert.equal(appUrl.searchParams.get("offer_id"), OFFER_IDS.earlybird59Pre);
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
  assert.equal(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.firstTouch), null);
  assert.equal(JSON.parse(browser.localStorage.getItem(MARKETING_STORAGE_KEYS.referral)).referral_code, "REF123");
});

test("referral with analytics consent appends source attribution but still excludes ad click ids without marketing consent", () => {
  resetTrackingEnv();
  setReferralFlags(true);
  installBrowser(
    "https://medexia-akt.com/?ref=REF123&utm_source=whatsapp&utm_campaign=share&gclid=G123",
  );

  saveConsent({ functional: true, analytics: true, marketing: false }, "settings");
  initMarketingAttribution();
  const appUrl = new URL(buildAppUrl("/join/early-access", { intent: "referral_earlybird" }));

  assert.equal(appUrl.searchParams.get("referral_code"), "REF123");
  assert.equal(appUrl.searchParams.get("utm_source"), "whatsapp");
  assert.ok(appUrl.searchParams.get("mx_vid"));
  assert.equal(appUrl.searchParams.has("gclid"), false);
});
