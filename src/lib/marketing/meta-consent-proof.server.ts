import crypto from "node:crypto";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  type ConsentRecord,
} from "../consent/consent";

const META_CONSENT_AUDIENCE = "meta-capi-marketing-consent";
const REDDIT_CONSENT_AUDIENCE = "reddit-capi-marketing-consent";
const META_CONSENT_ISSUER = "medexia-app";
const META_CONSENT_TTL_SECONDS = 24 * 60 * 60;
export const META_CAPI_SESSION_COOKIE = "mx_meta_capi_session";
export const META_CAPI_SEED_COOKIE = "mx_meta_capi_seed";
export const META_CAPI_REVOCATION_COOKIE = "mx_meta_capi_revoked";
export const META_CAPI_REVOCATION_ACK_COOKIE = "mx_meta_capi_revocation_ack";
export const META_CAPI_REGRANT_COOKIE = "mx_meta_capi_regrant";
export const META_CAPI_SESSION_MAX_AGE_SECONDS = META_CONSENT_TTL_SECONDS;
export const META_CAPI_REVOCATION_MAX_AGE_SECONDS = 60 * 60 * 24 * 183;
const META_CAPI_SESSION_PATTERN = /^[A-Za-z0-9_-]{43}$/;

function encodeBase64Url(value: string | Buffer): string {
  return Buffer.from(value).toString("base64url");
}

function hashFbclid(fbclid: string): string {
  return crypto.createHash("sha256").update(fbclid.trim()).digest("hex");
}

function hashRedditClickId(rdtCid: string): string {
  return crypto.createHash("sha256").update(rdtCid.trim()).digest("hex");
}

function hashSession(sessionValue: string): string {
  return crypto.createHash("sha256").update(sessionValue).digest("hex");
}

function parseCookie(cookieHeader: string | null, key: string): string | null {
  if (!cookieHeader) return null;
  const prefix = `${key}=`;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  if (!match) return null;
  try {
    return decodeURIComponent(match.slice(prefix.length));
  } catch {
    return null;
  }
}

export function readMetaCapiSession(cookieHeader: string | null): string | null {
  const value = parseCookie(cookieHeader, META_CAPI_SESSION_COOKIE);
  return value && META_CAPI_SESSION_PATTERN.test(value) ? value : null;
}

export function readMetaCapiSeed(cookieHeader: string | null): string | null {
  const value = parseCookie(cookieHeader, META_CAPI_SEED_COOKIE);
  return value && META_CAPI_SESSION_PATTERN.test(value) ? value : null;
}

const META_CAPI_REVOCATION_EPOCH_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
const META_CAPI_REVOCATION_ACK_PATTERN = /^([A-Za-z0-9_-]{1,64})\.([a-f0-9]{64})$/;

export function readMetaCapiRevocationEpoch(cookieHeader: string | null): string | null {
  const value = parseCookie(cookieHeader, META_CAPI_REVOCATION_COOKIE);
  return value && META_CAPI_REVOCATION_EPOCH_PATTERN.test(value) ? value : null;
}

export function hasActiveMetaCapiRevocation(cookieHeader: string | null): boolean {
  const epoch = readMetaCapiRevocationEpoch(cookieHeader);
  if (!epoch) return false;
  const acknowledgement = parseCookie(
    cookieHeader,
    scopedRevocationCookieName(META_CAPI_REVOCATION_ACK_COOKIE, epoch),
  );
  const match = acknowledgement?.match(META_CAPI_REVOCATION_ACK_PATTERN);
  return !match || match[1] !== epoch;
}

export function createMetaCapiRevocationAcknowledgement(
  epoch: string,
  sessionValue: string,
): string | null {
  if (
    !META_CAPI_REVOCATION_EPOCH_PATTERN.test(epoch) ||
    !META_CAPI_SESSION_PATTERN.test(sessionValue)
  ) return null;
  return `${epoch}.${hashSession(sessionValue)}`;
}

export function hasServerAcknowledgedRegrant(
  cookieHeader: string | null,
  epoch: string,
): boolean {
  return parseCookie(
    cookieHeader,
    scopedRevocationCookieName(META_CAPI_REGRANT_COOKIE, epoch),
  ) === epoch;
}

export function deriveMetaCapiSession(cookieHeader: string | null): string | null {
  const consentCookie = parseCookie(cookieHeader, CONSENT_STORAGE_KEY);
  const seed = readMetaCapiSeed(cookieHeader);
  const signingSecret = getMetaConsentSecret();
  if (!consentCookie || !seed || !signingSecret) return null;
  let stableConsentGeneration = "";
  try {
    const consent = JSON.parse(consentCookie) as Partial<ConsentRecord>;
    if (
      typeof consent.decidedAt !== "string" ||
      consent.decidedAt.length > 64 ||
      consent.version !== CONSENT_VERSION
    ) return null;
    const revocationEpoch = readMetaCapiRevocationEpoch(cookieHeader);
    // A withdrawal creates a fresh stable generation. Subsequent settings
    // saves under that exact epoch must not rotate the HttpOnly session, which
    // prevents out-of-order proof responses from replacing a newer binding.
    stableConsentGeneration = revocationEpoch
      ? `revocation:${revocationEpoch}`
      : `decision:${consent.version}:${consent.decidedAt}`;
  } catch {
    return null;
  }
  return crypto
    .createHmac("sha256", signingSecret)
    .update(`meta-capi-browser-session:v3:${seed}:${stableConsentGeneration}`)
    .digest("base64url");
}

export function metaCapiSessionCookieName(cookieHeader: string | null): string {
  const epoch = readMetaCapiRevocationEpoch(cookieHeader);
  if (!epoch) return META_CAPI_SESSION_COOKIE;
  return scopedRevocationCookieName(META_CAPI_SESSION_COOKIE, epoch);
}

export function scopedRevocationCookieName(base: string, epoch: string): string {
  const suffix = crypto.createHash("sha256").update(epoch).digest("hex").slice(0, 16);
  return `${base}_${suffix}`;
}

export function hasCurrentMarketingConsent(cookieHeader: string | null): boolean {
  const raw = parseCookie(cookieHeader, CONSENT_STORAGE_KEY);
  if (!raw) return false;
  try {
    const consent = JSON.parse(raw) as Partial<ConsentRecord>;
    return (
      consent.version === CONSENT_VERSION &&
      consent.policyVersion === CONSENT_VERSION &&
      consent.necessary === true &&
      consent.marketing === true
    );
  } catch {
    return false;
  }
}

export function getMetaConsentSecret(): string | null {
  const value = (process.env.META_CAPI_CONSENT_SECRET || "").trim();
  return value.length >= 32 ? value : null;
}

export function getRedditConsentSecret(): string | null {
  const value = (process.env.REDDIT_CAPI_CONSENT_SECRET || "").trim();
  return value.length >= 32 ? value : null;
}

export function createMetaMarketingConsentProof(
  fbclid: string,
  sessionValue: string,
  options: { nowSeconds?: number; secret?: string | null } = {},
): string | null {
  const clickId = fbclid.trim();
  const secret = options.secret ?? getMetaConsentSecret();
  if (
    !secret ||
    secret.length < 32 ||
    !clickId ||
    clickId.length > 256 ||
    !META_CAPI_SESSION_PATTERN.test(sessionValue)
  ) return null;

  const now = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = encodeBase64Url(
    JSON.stringify({
      purpose: META_CONSENT_AUDIENCE,
      fbclid_hash: hashFbclid(clickId),
      session_hash: hashSession(sessionValue),
      aud: META_CONSENT_AUDIENCE,
      iss: META_CONSENT_ISSUER,
      iat: now,
      exp: now + META_CONSENT_TTL_SECONDS,
    }),
  );
  const unsigned = `${header}.${payload}`;
  const signature = crypto.createHmac("sha256", secret).update(unsigned).digest("base64url");
  return `${unsigned}.${signature}`;
}

export function createRedditMarketingConsentProof(
  rdtCid: string,
  sessionValue: string,
  options: { nowSeconds?: number; secret?: string | null } = {},
): string | null {
  const clickId = rdtCid.trim();
  const secret = options.secret ?? getRedditConsentSecret();
  if (
    !secret ||
    secret.length < 32 ||
    !clickId ||
    clickId.length > 256 ||
    !META_CAPI_SESSION_PATTERN.test(sessionValue)
  ) return null;

  const now = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = encodeBase64Url(
    JSON.stringify({
      purpose: REDDIT_CONSENT_AUDIENCE,
      rdt_cid_hash: hashRedditClickId(clickId),
      session_hash: hashSession(sessionValue),
      aud: REDDIT_CONSENT_AUDIENCE,
      iss: META_CONSENT_ISSUER,
      iat: now,
      exp: now + META_CONSENT_TTL_SECONDS,
    }),
  );
  const unsigned = `${header}.${payload}`;
  const signature = crypto.createHmac("sha256", secret).update(unsigned).digest("base64url");
  return `${unsigned}.${signature}`;
}
