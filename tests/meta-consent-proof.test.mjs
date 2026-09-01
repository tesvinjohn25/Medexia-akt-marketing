import assert from "node:assert/strict";
import crypto from "node:crypto";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

async function importBundled(entryPoint, platform, format = "esm") {
  const extension = format === "cjs" ? "cjs" : "mjs";
  const outfile = path.join(
    os.tmpdir(),
    `medexia-meta-proof-${platform}-${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`,
  );
  await build({
    entryPoints: [path.resolve(entryPoint)],
    outfile,
    bundle: true,
    format,
    platform,
    logLevel: "silent",
  });
  return import(`${pathToFileURL(outfile).href}?v=${Date.now()}`);
}

const serverProof = await importBundled(
  "src/lib/marketing/meta-consent-proof.server.ts",
  "node",
);
const clientProof = await importBundled(
  "src/lib/marketing/meta-consent-proof.ts",
  "browser",
);
const proofRoute = await importBundled(
  "src/app/api/marketing/meta-consent-proof/route.ts",
  "node",
  "cjs",
);

function decodeJwtPart(part) {
  return JSON.parse(Buffer.from(part, "base64url").toString("utf8"));
}

const META_SESSION = "S".repeat(43);

function consentRecord(marketing) {
  return {
    version: "2026-06-23-v1",
    necessary: true,
    functional: false,
    analytics: true,
    marketing,
    decidedAt: "2026-08-11T00:00:00.000Z",
    updatedAt: "2026-08-11T00:00:00.000Z",
    source: "settings",
    policyVersion: "2026-06-23-v1",
  };
}

function installBrowserConsent(marketing) {
  const localValues = new Map();
  const sessionValues = new Map();
  const cookies = new Map();
  const storage = (values) => ({
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  });
  globalThis.window = {
    location: new URL("https://medexia-akt.com/"),
    localStorage: storage(localValues),
    sessionStorage: storage(sessionValues),
    setTimeout,
    clearTimeout,
  };
  globalThis.document = {};
  Object.defineProperty(globalThis.document, "cookie", {
    configurable: true,
    get: () => Array.from(cookies.entries()).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("; "),
    set: (value) => {
      const [pair] = String(value).split(";");
      const [key, raw = ""] = pair.split("=");
      cookies.set(key.trim(), decodeURIComponent(raw));
    },
  });
  let consentGeneration = 0;
  const writeConsent = (enabled) => {
    const record = consentRecord(enabled);
    record.updatedAt = new Date(
      Date.parse(record.updatedAt) + consentGeneration,
    ).toISOString();
    consentGeneration += 1;
    const raw = JSON.stringify(record);
    localValues.set("mx_consent_v1", raw);
    cookies.set("mx_consent_v1", raw);
  };
  writeConsent(marketing);
  return {
    writeConsent,
    writeCookie: (key, value) => cookies.set(key, value),
  };
}

test("server proof matches the app JWT contract and is click-bound", () => {
  const secret = "s".repeat(48);
  const proof = serverProof.createMetaMarketingConsentProof(" FB-CLICK-1 ", META_SESSION, {
    secret,
    nowSeconds: 1_700_000_000,
  });
  assert.ok(proof);
  const [headerPart, payloadPart, signature] = proof.split(".");
  assert.deepEqual(decodeJwtPart(headerPart), { alg: "HS256", typ: "JWT" });
  assert.deepEqual(decodeJwtPart(payloadPart), {
    purpose: "meta-capi-marketing-consent",
    fbclid_hash: crypto.createHash("sha256").update("FB-CLICK-1").digest("hex"),
    session_hash: crypto.createHash("sha256").update(META_SESSION).digest("hex"),
    aud: "meta-capi-marketing-consent",
    iss: "medexia-app",
    iat: 1_700_000_000,
    exp: 1_700_086_400,
  });
  assert.equal(
    signature,
    crypto.createHmac("sha256", secret).update(`${headerPart}.${payloadPart}`).digest("base64url"),
  );
});

test("server Reddit proof matches the app JWT contract and is click-bound", () => {
  const secret = "r".repeat(48);
  const clickId = "RDT.AbC_-:~%2F";
  const proof = serverProof.createRedditMarketingConsentProof(
    clickId,
    META_SESSION,
    { secret, nowSeconds: 1_700_000_000 },
  );
  assert.ok(proof);
  const [headerPart, payloadPart, signature] = proof.split(".");
  assert.deepEqual(decodeJwtPart(headerPart), { alg: "HS256", typ: "JWT" });
  assert.deepEqual(decodeJwtPart(payloadPart), {
    purpose: "reddit-capi-marketing-consent",
    rdt_cid_hash: crypto.createHash("sha256").update(clickId).digest("hex"),
    session_hash: crypto.createHash("sha256").update(META_SESSION).digest("hex"),
    aud: "reddit-capi-marketing-consent",
    iss: "medexia-app",
    iat: 1_700_000_000,
    exp: 1_700_086_400,
  });
  assert.equal(
    signature,
    crypto.createHmac("sha256", secret).update(`${headerPart}.${payloadPart}`).digest("base64url"),
  );
});

test("server proof and consent validation fail closed", () => {
  assert.equal(serverProof.createMetaMarketingConsentProof("FB", META_SESSION, { secret: "short" }), null);
  assert.equal(serverProof.createMetaMarketingConsentProof("", META_SESSION, { secret: "s".repeat(48) }), null);
  assert.equal(serverProof.createMetaMarketingConsentProof("FB", "predictable", { secret: "s".repeat(48) }), null);
  assert.equal(serverProof.createRedditMarketingConsentProof("RDT", META_SESSION, { secret: "short" }), null);
  assert.equal(serverProof.createRedditMarketingConsentProof("", META_SESSION, { secret: "r".repeat(48) }), null);
  assert.equal(serverProof.createRedditMarketingConsentProof("RDT", "predictable", { secret: "r".repeat(48) }), null);
  assert.equal(serverProof.readMetaCapiSession(`mx_meta_capi_session=${META_SESSION}`), META_SESSION);
  assert.equal(serverProof.readMetaCapiSession("mx_meta_capi_session=too-short"), null);
  assert.equal(serverProof.hasActiveMetaCapiRevocation("mx_meta_capi_revoked=epoch-new"), true);
  const acknowledgement = serverProof.createMetaCapiRevocationAcknowledgement(
    "epoch-new",
    META_SESSION,
  );
  assert.match(acknowledgement, /^epoch-new\.[a-f0-9]{64}$/);
  const acknowledgementName = serverProof.scopedRevocationCookieName(
    "mx_meta_capi_revocation_ack",
    "epoch-new",
  );
  assert.equal(serverProof.hasActiveMetaCapiRevocation(
    `mx_meta_capi_revoked=epoch-new; ${acknowledgementName}=${acknowledgement}`,
  ), false);
  assert.equal(serverProof.hasCurrentMarketingConsent(null), false);
  const denied = encodeURIComponent(JSON.stringify(consentRecord(false)));
  assert.equal(serverProof.hasCurrentMarketingConsent(`mx_consent_v1=${denied}`), false);
  const granted = encodeURIComponent(JSON.stringify(consentRecord(true)));
  assert.equal(serverProof.hasCurrentMarketingConsent(`other=1; mx_consent_v1=${granted}`), true);
});

test("proof route enforces same-origin, current consent, JSON input, and configuration", async () => {
  const previousSecret = process.env.META_CAPI_CONSENT_SECRET;
  const previousRedditSecret = process.env.REDDIT_CAPI_CONSENT_SECRET;
  process.env.META_CAPI_CONSENT_SECRET = "r".repeat(48);
  process.env.REDDIT_CAPI_CONSENT_SECRET = "q".repeat(48);
  const seed = "Z".repeat(43);
  const currentConsentCookie = `mx_consent_v1=${encodeURIComponent(JSON.stringify(consentRecord(true)))}`;
  const currentCookie = `${currentConsentCookie}; mx_meta_capi_seed=${seed}`;
  const epoch = "1700000000000_epoch-one";
  const regrantCookieName = serverProof.scopedRevocationCookieName(
    "mx_meta_capi_regrant",
    epoch,
  );
  const acknowledgementCookieName = serverProof.scopedRevocationCookieName(
    "mx_meta_capi_revocation_ack",
    epoch,
  );
  const request = ({
    origin = "https://medexia-akt.com",
    cookie = currentCookie,
    contentType = "application/json",
    body = JSON.stringify({ fbclid: "FB-ROUTE-1" }),
  } = {}) => new Request("https://medexia-akt.com/api/marketing/meta-consent-proof", {
    method: "POST",
    headers: {
      origin,
      "sec-fetch-site": "same-origin",
      "content-type": contentType,
      cookie,
    },
    body,
  });

  try {
    const initialization = await proofRoute.POST(request({ cookie: currentConsentCookie }));
    assert.equal(initialization.status, 409);
    assert.match(initialization.headers.get("set-cookie") || "", /mx_meta_capi_seed=[A-Za-z0-9_-]{43}/);
    const accepted = await proofRoute.POST(request());
    assert.equal(accepted.status, 200);
    assert.equal(accepted.headers.get("cache-control"), "private, no-store, max-age=0");
    const acceptedProof = (await accepted.json()).proof;
    assert.equal(typeof acceptedProof, "string");
    const acceptedPayload = decodeJwtPart(acceptedProof.split(".")[1]);
    const setCookie = accepted.headers.get("set-cookie") || "";
    assert.match(setCookie, /mx_meta_capi_session(?:_[a-f0-9]{16})?=[A-Za-z0-9_-]{43}/);
    assert.match(setCookie, /HttpOnly/i);
    assert.match(setCookie, /Secure/i);
    assert.match(setCookie, /SameSite=Lax/i);
    assert.match(setCookie, /Domain=medexia-akt\.com/i);

    const redditAccepted = await proofRoute.POST(request({
      body: JSON.stringify({ rdt_cid: "RDT-ROUTE-1" }),
    }));
    assert.equal(redditAccepted.status, 200);
    const redditBody = await redditAccepted.json();
    assert.equal("proof" in redditBody, false);
    assert.equal(typeof redditBody.redditProof, "string");
    assert.deepEqual(decodeJwtPart(redditBody.redditProof.split(".")[1]), {
      purpose: "reddit-capi-marketing-consent",
      rdt_cid_hash: crypto.createHash("sha256").update("RDT-ROUTE-1").digest("hex"),
      session_hash: decodeJwtPart(redditBody.redditProof.split(".")[1]).session_hash,
      aud: "reddit-capi-marketing-consent",
      iss: "medexia-app",
      iat: decodeJwtPart(redditBody.redditProof.split(".")[1]).iat,
      exp: decodeJwtPart(redditBody.redditProof.split(".")[1]).exp,
    });

    const combinedAccepted = await proofRoute.POST(request({
      body: JSON.stringify({
        fbclid: "FB-COMBINED-1",
        rdt_cid: "RDT-COMBINED-1",
      }),
    }));
    assert.equal(combinedAccepted.status, 200);
    const combinedBody = await combinedAccepted.json();
    assert.equal(typeof combinedBody.proof, "string");
    assert.equal(typeof combinedBody.redditProof, "string");

    const metaWithInvalidReddit = await proofRoute.POST(request({
      body: JSON.stringify({ fbclid: "FB-STILL-VALID", rdt_cid: "undefined" }),
    }));
    assert.equal(metaWithInvalidReddit.status, 200);
    const metaWithInvalidRedditBody = await metaWithInvalidReddit.json();
    assert.equal(typeof metaWithInvalidRedditBody.proof, "string");
    assert.equal("redditProof" in metaWithInvalidRedditBody, false);

    const stableSession = "T".repeat(43);
    const reused = await proofRoute.POST(request({
      cookie: `${currentCookie}; mx_meta_capi_session=${stableSession}`,
    }));
    const reusedPayload = decodeJwtPart((await reused.json()).proof.split(".")[1]);
    assert.equal(
      reusedPayload.session_hash,
      acceptedPayload.session_hash,
    );

    const regrantedConsent = consentRecord(true);
    regrantedConsent.updatedAt = "2026-08-11T01:00:00.000Z";
    const regrantCookie = `mx_consent_v1=${encodeURIComponent(JSON.stringify(regrantedConsent))}; mx_meta_capi_seed=${seed}; mx_meta_capi_session=${stableSession}; mx_meta_capi_revoked=${epoch}`;
    const regrantResponse = await proofRoute.PUT(new Request(
      "https://medexia-akt.com/api/marketing/meta-consent-proof",
      {
        method: "PUT",
        headers: {
          origin: "https://medexia-akt.com",
          "sec-fetch-site": "same-origin",
          cookie: regrantCookie,
        },
      },
    ));
    assert.equal(regrantResponse.status, 200);
    assert.match(
      regrantResponse.headers.get("set-cookie") || "",
      new RegExp(`${regrantCookieName}=${epoch}`, "i"),
    );
    assert.match(
      regrantResponse.headers.get("set-cookie") || "",
      /Max-Age=15811200/i,
    );
    const reconsented = await proofRoute.POST(request({
      cookie: `${regrantCookie}; ${regrantCookieName}=${epoch}`,
    }));
    const reconsentProof = (await reconsented.json()).proof;
    const reconsentPayload = decodeJwtPart(reconsentProof.split(".")[1]);
    assert.notEqual(
      reconsentPayload.session_hash,
      acceptedPayload.session_hash,
    );
    const reconsentCookies = reconsented.headers.get("set-cookie") || "";
    assert.match(
      reconsentCookies,
      new RegExp(`${acknowledgementCookieName}=${epoch}\\.[a-f0-9]{64}`, "i"),
    );
    assert.match(reconsentCookies, /Max-Age=15811200/i);
    assert.match(reconsentCookies, /mx_meta_capi_session_[a-f0-9]{16}=/i);

    const firstAcknowledgement = reconsentCookies.match(
      new RegExp(`${acknowledgementCookieName}=([^;,\\s]+)`, "i"),
    )?.[1];
    assert.ok(firstAcknowledgement);
    const rotatedConsent = consentRecord(true);
    rotatedConsent.updatedAt = "2026-08-11T02:00:00.000Z";
    const rotatedCookie = `mx_consent_v1=${encodeURIComponent(JSON.stringify(rotatedConsent))}; mx_meta_capi_seed=${seed}; mx_meta_capi_revoked=${epoch}; ${acknowledgementCookieName}=${firstAcknowledgement}; ${regrantCookieName}=${epoch}`;
    const rotatedResponse = await proofRoute.POST(request({ cookie: rotatedCookie }));
    assert.equal(rotatedResponse.status, 200);
    const rotatedPayload = decodeJwtPart((await rotatedResponse.json()).proof.split(".")[1]);
    assert.equal(rotatedPayload.session_hash, reconsentPayload.session_hash);
    assert.match(
      rotatedResponse.headers.get("set-cookie") || "",
      new RegExp(`${acknowledgementCookieName}=${epoch}\\.${rotatedPayload.session_hash}`, "i"),
    );

    const staleLandingConsent = consentRecord(true);
    staleLandingConsent.updatedAt = "2099-08-11T01:00:00.000Z";
    const staleAppWithdrawal = await proofRoute.POST(request({
      cookie: `mx_consent_v1=${encodeURIComponent(JSON.stringify(staleLandingConsent))}; mx_meta_capi_revoked=1900000000000_app-withdrawal`,
    }));
    assert.equal(staleAppWithdrawal.status, 403);
    assert.deepEqual(await staleAppWithdrawal.json(), { error: "marketing_regrant_required" });

    assert.equal((await proofRoute.POST(request({ origin: "https://evil.example" }))).status, 403);
    const stale = consentRecord(true);
    stale.policyVersion = "stale-policy";
    assert.equal((await proofRoute.POST(request({
      cookie: `mx_consent_v1=${encodeURIComponent(JSON.stringify(stale))}`,
    }))).status, 403);
    assert.equal((await proofRoute.POST(request({ contentType: "text/plain" }))).status, 415);
    assert.equal((await proofRoute.POST(request({ body: "{" }))).status, 400);
    assert.equal((await proofRoute.POST(request({ body: JSON.stringify({ fbclid: "x".repeat(257) }) }))).status, 400);
    assert.equal((await proofRoute.POST(request({ body: JSON.stringify({ rdt_cid: "x".repeat(257) }) }))).status, 400);
    for (const invalidRdtCid of [
      "",
      "undefined",
      "null",
      "(null)",
      "rdt_cid",
      "has space",
      "replacement\uFFFD",
      "%ZZ",
    ]) {
      assert.equal(
        (await proofRoute.POST(request({
          body: JSON.stringify({ rdt_cid: invalidRdtCid }),
        }))).status,
        400,
        invalidRdtCid,
      );
      assert.equal(
        serverProof.createRedditMarketingConsentProof(
          invalidRdtCid,
          META_SESSION,
          { secret: "r".repeat(48) },
        ),
        null,
        invalidRdtCid,
      );
    }

    delete process.env.REDDIT_CAPI_CONSENT_SECRET;
    assert.equal((await proofRoute.POST(request({
      body: JSON.stringify({ rdt_cid: "RDT-NO-CONFIG" }),
    }))).status, 503);
    const metaOnlyFallback = await proofRoute.POST(request({
      body: JSON.stringify({
        fbclid: "FB-CONFIGURED",
        rdt_cid: "RDT-NO-CONFIG",
      }),
    }));
    assert.equal(metaOnlyFallback.status, 200);
    const metaOnlyBody = await metaOnlyFallback.json();
    assert.equal(typeof metaOnlyBody.proof, "string");
    assert.equal("redditProof" in metaOnlyBody, false);
    process.env.REDDIT_CAPI_CONSENT_SECRET = "q".repeat(48);

    delete process.env.META_CAPI_CONSENT_SECRET;
    assert.equal((await proofRoute.POST(request())).status, 503);
  } finally {
    if (previousSecret === undefined) delete process.env.META_CAPI_CONSENT_SECRET;
    else process.env.META_CAPI_CONSENT_SECRET = previousSecret;
    if (previousRedditSecret === undefined) delete process.env.REDDIT_CAPI_CONSENT_SECRET;
    else process.env.REDDIT_CAPI_CONSENT_SECRET = previousRedditSecret;
  }
});

test("client adds proof only for a consented fbclid handoff", async () => {
  installBrowserConsent(true);
  const signedProof = serverProof.createMetaMarketingConsentProof("FB-CLIENT-1", META_SESSION, {
    secret: "c".repeat(48),
  });
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls += 1;
    assert.equal(url, "/api/marketing/meta-consent-proof");
    assert.equal(JSON.parse(options.body).fbclid, "FB-CLIENT-1");
    return { ok: true, json: async () => ({ proof: signedProof }) };
  };
  const result = new URL(
    await clientProof.addMetaMarketingConsentProof(
      "https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=FB-CLIENT-1",
    ),
  );
  assert.equal(result.searchParams.get("fbclid"), "FB-CLIENT-1");
  assert.equal(result.searchParams.get("mx_meta_capi_proof"), signedProof);
  assert.equal(calls, 1);
});

test("client adds a Reddit proof for a consented rdt_cid handoff", async () => {
  installBrowserConsent(true);
  const signedProof = serverProof.createRedditMarketingConsentProof(
    "RDT-CLIENT-1",
    META_SESSION,
    { secret: "d".repeat(48) },
  );
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls += 1;
    assert.equal(url, "/api/marketing/meta-consent-proof");
    assert.deepEqual(JSON.parse(options.body), { rdt_cid: "RDT-CLIENT-1" });
    return { ok: true, json: async () => ({ redditProof: signedProof }) };
  };
  const result = new URL(
    await clientProof.addMetaMarketingConsentProof(
      "https://app.medexia-akt.com/join/audio?mx_mc=1&rdt_cid=RDT-CLIENT-1",
    ),
  );
  assert.equal(result.searchParams.get("rdt_cid"), "RDT-CLIENT-1");
  assert.equal(result.searchParams.get("mx_reddit_capi_proof"), signedProof);
  assert.equal(result.searchParams.has("mx_meta_capi_proof"), false);
  assert.equal(calls, 1);
});

test("invalid Reddit ids are omitted from client proof requests", async () => {
  installBrowserConsent(true);
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return { ok: true, json: async () => ({ redditProof: "unexpected" }) };
  };

  for (const raw of [
    "",
    "undefined",
    "null",
    "(null)",
    "rdt_cid",
    "has space",
    "replacement\uFFFD",
    "%ZZ",
    "x".repeat(257),
  ]) {
    const result = new URL(
      await clientProof.addMetaMarketingConsentProof(
        `https://app.medexia-akt.com/join/audio?mx_mc=1&rdt_cid=${encodeURIComponent(raw)}`,
      ),
    );
    assert.equal(result.searchParams.has("rdt_cid"), false, raw);
    assert.equal(result.searchParams.has("mx_reddit_capi_proof"), false, raw);
  }
  assert.equal(calls, 0);
});

test("client retries once after the server-random seed handshake", async () => {
  installBrowserConsent(true);
  const signedProof = serverProof.createMetaMarketingConsentProof("FB-SEED", META_SESSION, {
    secret: "h".repeat(48),
  });
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    if (calls === 1) return { ok: false, status: 409 };
    return { ok: true, status: 200, json: async () => ({ proof: signedProof }) };
  };
  const result = new URL(await clientProof.addMetaMarketingConsentProof(
    "https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=FB-SEED",
  ));
  assert.equal(result.searchParams.get("mx_meta_capi_proof"), signedProof);
  assert.equal(calls, 2);
});

test("client treats an app-side revocation as denied until the exact epoch is regranted", async () => {
  const consent = installBrowserConsent(true);
  consent.writeCookie("mx_meta_capi_revoked", "epoch-from-app");
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return { ok: true, json: async () => ({ proof: "must-not-be-used" }) };
  };
  const denied = new URL(await clientProof.addMetaMarketingConsentProof(
    "https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=FB-STALE-APP",
  ));
  assert.equal(denied.searchParams.get("mx_mc"), "0");
  assert.equal(denied.searchParams.has("fbclid"), false);
  assert.equal(denied.searchParams.has("mx_meta_capi_proof"), false);
  assert.equal(calls, 0);
});

test("client leaves same-origin opaque promo pass-through URLs byte-for-byte unchanged", async () => {
  installBrowserConsent(false);
  const promo = "https://medexia-akt.com/join/full-access?promo_code=A%2fb%20C&fbclid=OPAQUE";
  assert.equal(await clientProof.addMetaMarketingConsentProof(promo), promo);
  assert.equal(
    clientProof.reusePrefetchedMetaMarketingConsentProof(promo, promo),
    promo,
  );
});

test("client strips click ids and proof when consent is absent or withdrawn mid-flight", async () => {
  installBrowserConsent(false);
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return { ok: true, json: async () => ({ proof: "should-not-be-used" }) };
  };
  const denied = new URL(
    await clientProof.addMetaMarketingConsentProof(
      "https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=FB-DENIED&gclid=G-DENIED&rdt_cid=RDT-DENIED&mx_reddit_capi_proof=stale",
    ),
  );
  assert.equal(denied.searchParams.get("mx_mc"), "0");
  assert.equal(denied.searchParams.has("fbclid"), false);
  assert.equal(denied.searchParams.has("gclid"), false);
  assert.equal(denied.searchParams.has("rdt_cid"), false);
  assert.equal(denied.searchParams.has("mx_meta_capi_proof"), false);
  assert.equal(denied.searchParams.has("mx_reddit_capi_proof"), false);
  assert.equal(calls, 0);

  const consent = installBrowserConsent(true);
  let release;
  let markRequestStarted;
  const requestStarted = new Promise((resolve) => {
    markRequestStarted = resolve;
  });
  globalThis.fetch = () => new Promise((resolve) => {
    release = () => resolve({ ok: true, json: async () => ({ proof: "late-proof" }) });
    markRequestStarted();
  });
  const pending = clientProof.addMetaMarketingConsentProof(
    `https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=FB-RACE&rdt_cid=RDT-RACE&mx_reddit_capi_proof=stale&referrer=${encodeURIComponent("https://example.test/?next=" + encodeURIComponent("https://nested.test/?fbclid=FB-NESTED"))}&first_landing_page=${encodeURIComponent("/?gclid=G-NESTED&utm_source=meta")}`,
  );
  await requestStarted;
  consent.writeConsent(false);
  release();
  const withdrawn = new URL(await pending);
  assert.equal(withdrawn.searchParams.get("mx_mc"), "0");
  assert.equal(withdrawn.searchParams.has("fbclid"), false);
  assert.equal(withdrawn.searchParams.has("rdt_cid"), false);
  assert.equal(withdrawn.searchParams.has("mx_meta_capi_proof"), false);
  assert.equal(withdrawn.searchParams.has("mx_reddit_capi_proof"), false);
  assert.doesNotMatch(withdrawn.searchParams.get("referrer") || "", /fbclid|FB-NESTED/i);
  assert.doesNotMatch(withdrawn.searchParams.get("first_landing_page") || "", /gclid|G-NESTED/i);
});

test("client does not reuse an in-flight proof across consent generations", async () => {
  const consent = installBrowserConsent(true);
  const proof = serverProof.createMetaMarketingConsentProof("FB-EPOCH", META_SESSION, {
    secret: "e".repeat(48),
  });
  let releaseFirst;
  let markFirstStarted;
  const firstStarted = new Promise((resolve) => {
    markFirstStarted = resolve;
  });
  let calls = 0;
  globalThis.fetch = () => {
    calls += 1;
    if (calls === 1) {
      return new Promise((resolve) => {
        releaseFirst = () => resolve({ ok: true, json: async () => ({ proof }) });
        markFirstStarted();
      });
    }
    return Promise.resolve({ ok: true, json: async () => ({ proof }) });
  };

  const url = "https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=FB-EPOCH";
  const beforeWithdrawal = clientProof.addMetaMarketingConsentProof(url);
  await firstStarted;
  consent.writeConsent(false);
  consent.writeConsent(true);
  const afterRegrant = clientProof.addMetaMarketingConsentProof(url);
  releaseFirst();

  const [oldResult, newResult] = await Promise.all([beforeWithdrawal, afterRegrant]);
  assert.equal(new URL(oldResult).searchParams.has("mx_meta_capi_proof"), false);
  assert.equal(new URL(newResult).searchParams.get("mx_meta_capi_proof"), proof);
  assert.equal(calls, 2);
});

test("client rejects a stale policy consent record without requesting a proof", async () => {
  installBrowserConsent(true);
  const stale = consentRecord(true);
  stale.policyVersion = "stale-policy";
  const raw = JSON.stringify(stale);
  window.localStorage.setItem("mx_consent_v1", raw);
  document.cookie = `mx_consent_v1=${encodeURIComponent(raw)}; Path=/`;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return { ok: true, json: async () => ({ proof: "must-not-be-used" }) };
  };

  const result = new URL(await clientProof.addMetaMarketingConsentProof(
    "https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=FB-STALE&gclid=G-STALE",
  ));
  assert.equal(result.searchParams.get("mx_mc"), "0");
  assert.equal(result.searchParams.has("fbclid"), false);
  assert.equal(result.searchParams.has("gclid"), false);
  assert.equal(result.searchParams.has("mx_meta_capi_proof"), false);
  assert.equal(calls, 0);
});

test("modified clicks reuse only a same-destination prefetched proof", () => {
  const consent = installBrowserConsent(true);
  const base = "https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=FB-PREFETCH";
  const prefetchedProof = serverProof.createMetaMarketingConsentProof("FB-PREFETCH", META_SESSION, {
    secret: "p".repeat(48),
  });
  const reused = new URL(
    clientProof.reusePrefetchedMetaMarketingConsentProof(
      base,
      `${base}&mx_meta_capi_proof=${encodeURIComponent(prefetchedProof)}`,
    ),
  );
  assert.equal(reused.searchParams.get("mx_meta_capi_proof"), prefetchedProof);

  const wrongClick = new URL(
    clientProof.reusePrefetchedMetaMarketingConsentProof(
      base,
      "https://app.medexia-akt.com/join/free?mx_mc=1&fbclid=OTHER&mx_meta_capi_proof=wrong",
    ),
  );
  assert.equal(wrongClick.searchParams.has("mx_meta_capi_proof"), false);

  const expiredProof = serverProof.createMetaMarketingConsentProof("FB-PREFETCH", META_SESSION, {
    secret: "p".repeat(48),
    nowSeconds: Math.floor(Date.now() / 1000) - (25 * 60 * 60),
  });
  const expired = new URL(
    clientProof.reusePrefetchedMetaMarketingConsentProof(
      base,
      `${base}&mx_meta_capi_proof=${encodeURIComponent(expiredProof)}`,
    ),
  );
  assert.equal(expired.searchParams.has("mx_meta_capi_proof"), false);

  consent.writeConsent(false);
  const withdrawn = new URL(
    clientProof.reusePrefetchedMetaMarketingConsentProof(
      base,
      `${base}&mx_meta_capi_proof=${encodeURIComponent(prefetchedProof)}`,
    ),
  );
  assert.equal(withdrawn.searchParams.get("mx_mc"), "0");
  assert.equal(withdrawn.searchParams.has("fbclid"), false);
  assert.equal(withdrawn.searchParams.has("mx_meta_capi_proof"), false);
});

test("modified Reddit clicks reuse only an exact same-destination prefetched proof", () => {
  installBrowserConsent(true);
  const base = "https://app.medexia-akt.com/join/audio?mx_mc=1&rdt_cid=RDT-PREFETCH";
  const prefetchedProof = serverProof.createRedditMarketingConsentProof(
    "RDT-PREFETCH",
    META_SESSION,
    { secret: "u".repeat(48) },
  );
  const reused = new URL(
    clientProof.reusePrefetchedMetaMarketingConsentProof(
      base,
      `${base}&mx_reddit_capi_proof=${encodeURIComponent(prefetchedProof)}`,
    ),
  );
  assert.equal(reused.searchParams.get("mx_reddit_capi_proof"), prefetchedProof);

  const wrongClick = new URL(
    clientProof.reusePrefetchedMetaMarketingConsentProof(
      base,
      "https://app.medexia-akt.com/join/audio?mx_mc=1&rdt_cid=OTHER&mx_reddit_capi_proof=wrong",
    ),
  );
  assert.equal(wrongClick.searchParams.has("mx_reddit_capi_proof"), false);

  const wrongDestination = new URL(
    clientProof.reusePrefetchedMetaMarketingConsentProof(
      base,
      `https://app.medexia-akt.com/join/free?mx_mc=1&rdt_cid=RDT-PREFETCH&mx_reddit_capi_proof=${encodeURIComponent(prefetchedProof)}`,
    ),
  );
  assert.equal(wrongDestination.searchParams.has("mx_reddit_capi_proof"), false);
});
