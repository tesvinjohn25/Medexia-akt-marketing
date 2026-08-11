export const CONSENT_STORAGE_KEY = "mx_consent_v1";
export const CONSENT_CHANGED_EVENT = "mx-consent-changed";
export const CONSENT_SETTINGS_EVENT = "mx-consent-settings";

export type ConsentSource = "banner" | "settings" | "footer";

export interface ConsentRecord {
  version: string;
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
  updatedAt: string;
  source: ConsentSource;
  policyVersion: string;
}

export interface ConsentChoices {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CONSENT_VERSION =
  process.env.NEXT_PUBLIC_CONSENT_VERSION || "2026-06-23-v1";

const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 183;
const META_CAPI_REVOCATION_COOKIE = "mx_meta_capi_revoked";
const META_CAPI_CLIENT_REGRANT_COOKIE = "mx_meta_capi_client_regrant";
const META_CAPI_PROOF_ENDPOINT = "/api/marketing/meta-consent-proof";
const META_CAPI_REGRANT_TIMEOUT_MS = 1_500;
let metaCapiRegrantPromise: Promise<boolean> | null = null;
const NON_ESSENTIAL_STORAGE_KEYS = [
  "mx_visitor_id",
  "mx_session_id",
  "mx_first_touch",
  "mx_last_touch",
  "mx_referral",
  "mx_offer_context",
  "mx_marketing_consent",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
] as const;
const MARKETING_STORAGE_KEYS = [
  "mx_marketing_consent",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
] as const;
const MARKETING_TOUCH_STORAGE_KEYS = ["mx_first_touch", "mx_last_touch"] as const;
const AD_CLICK_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
  "rdt_cid",
] as const;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function cookieSecureFlag(): string {
  if (!isBrowser()) return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}

function setCookie(key: string, value: string, maxAgeSeconds = CONSENT_MAX_AGE_SECONDS): void {
  if (!isBrowser()) return;
  try {
    document.cookie = `${key}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${cookieSecureFlag()}`;
  } catch {
    // Consent storage must not break page rendering.
  }
}

function getCookie(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    const prefix = `${key}=`;
    const match = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix));
    return match ? decodeURIComponent(match.slice(prefix.length)) : null;
  } catch {
    return null;
  }
}

function removeCookie(key: string): void {
  if (!isBrowser()) return;
  try {
    document.cookie = `${key}=; Path=/; Max-Age=0; SameSite=Lax${cookieSecureFlag()}`;
  } catch {
    // Ignore cleanup failures.
  }
}

function getLocal(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setLocal(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures.
  }
}

function removeLocal(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore cleanup failures.
  }
}

function removeSession(key: string): void {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Ignore cleanup failures.
  }
}

function dispatchConsentChanged(record: ConsentRecord | null): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: record }));
}

export function consentBannerEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CONSENT_BANNER_ENABLED !== "false";
}

export function getStoredConsent(): ConsentRecord | null {
  const raw = getLocal(CONSENT_STORAGE_KEY) ?? getCookie(CONSENT_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (
      parsed.version !== CONSENT_VERSION ||
      parsed.policyVersion !== CONSENT_VERSION ||
      parsed.necessary !== true
    ) return null;
    return {
      ...parsed,
      necessary: true,
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

export function hasConsentDecision(): boolean {
  return Boolean(getStoredConsent());
}

export function canUseFunctional(): boolean {
  return Boolean(getStoredConsent()?.functional);
}

export function canUseAnalytics(): boolean {
  return Boolean(getStoredConsent()?.analytics);
}

export function canUseMarketing(): boolean {
  if (!getStoredConsent()?.marketing) return false;
  const revocationEpoch = getCookie(META_CAPI_REVOCATION_COOKIE);
  return !revocationEpoch || getCookie(META_CAPI_CLIENT_REGRANT_COOKIE) === revocationEpoch;
}

// Proof requests use the exact locally stored consent record plus the current
// denial epoch as a generation key. This prevents an in-flight request from a
// previous withdraw/regrant cycle being reused after the user's choice changes.
export function getMetaCapiConsentGeneration(): string {
  const rawConsent = getLocal(CONSENT_STORAGE_KEY) ?? getCookie(CONSENT_STORAGE_KEY) ?? "";
  const revocationEpoch = getCookie(META_CAPI_REVOCATION_COOKIE) ?? "";
  return `${rawConsent}\n${revocationEpoch}`;
}

export function makeConsentRecord(
  choices: ConsentChoices,
  source: ConsentSource,
  previous: ConsentRecord | null = getStoredConsent(),
): ConsentRecord {
  const now = new Date().toISOString();
  return {
    version: CONSENT_VERSION,
    necessary: true,
    functional: Boolean(choices.functional),
    analytics: Boolean(choices.analytics),
    marketing: Boolean(choices.marketing),
    decidedAt: previous?.decidedAt || now,
    updatedAt: now,
    source,
    policyVersion: CONSENT_VERSION,
  };
}

export function clearNonEssentialMarketingStorage(): void {
  for (const key of NON_ESSENTIAL_STORAGE_KEYS) {
    removeLocal(key);
    removeSession(key);
    removeCookie(key);
  }
}

function clearMarketingClickStorage(): void {
  for (const key of MARKETING_STORAGE_KEYS) {
    removeLocal(key);
    removeSession(key);
    removeCookie(key);
  }
  for (const key of MARKETING_TOUCH_STORAGE_KEYS) {
    const raw = getLocal(key) ?? getCookie(key);
    if (!raw) continue;
    try {
      const touch = JSON.parse(raw) as Record<string, unknown>;
      for (const clickKey of AD_CLICK_KEYS) delete touch[clickKey];
      for (const urlKey of ["referrer", "first_landing_page"] as const) {
        if (typeof touch[urlKey] !== "string") continue;
        const original = touch[urlKey] as string;
        try {
          const absolute = /^[a-z][a-z\d+.-]*:\/\//i.test(original) || original.startsWith("//");
          const parsed = new URL(original, "https://medexia-akt.com");
          for (const param of Array.from(parsed.searchParams.keys())) {
            const nestedValues = parsed.searchParams.getAll(param);
            const containsNestedClickId = nestedValues.some((value) => {
              let candidate = value;
              for (let depth = 0; depth < 3; depth += 1) {
                if (/(?:^|[?&#;])(gclid|gbraid|wbraid|fbclid|ttclid|msclkid|rdt_cid)=/i.test(candidate)) {
                  return true;
                }
                try {
                  const decoded = decodeURIComponent(candidate);
                  if (decoded === candidate) break;
                  candidate = decoded;
                } catch {
                  break;
                }
              }
              return false;
            });
            if (
              (AD_CLICK_KEYS as readonly string[]).includes(param.toLowerCase()) ||
              containsNestedClickId
            ) {
              parsed.searchParams.delete(param);
            }
          }
          parsed.hash = "";
          touch[urlKey] = absolute
            ? parsed.toString().slice(0, 1024)
            : `${parsed.pathname}${parsed.search}`.slice(0, 1024);
        } catch {
          touch[urlKey] = original.replace(
            /([?&#;])(gclid|gbraid|wbraid|fbclid|ttclid|msclkid|rdt_cid)=[^&#;]*/gi,
            "$1",
          ).slice(0, 1024);
        }
      }
      const sanitized = JSON.stringify(touch);
      setLocal(key, sanitized);
      setCookie(key, sanitized);
    } catch {
      removeLocal(key);
      removeSession(key);
      removeCookie(key);
    }
  }
}

function writeMetaCapiRevocationEpoch(): void {
  if (!isBrowser()) return;
  try {
    const hostname = window.location.hostname.toLowerCase();
    const sharedDomain =
      hostname === "medexia-akt.com" || hostname.endsWith(".medexia-akt.com")
        ? "; Domain=medexia-akt.com"
        : "";
    const sameSite = sharedDomain ? "; SameSite=None; Secure" : `; SameSite=Lax${cookieSecureFlag()}`;
    const nonce = typeof globalThis.crypto?.randomUUID === "function"
      ? globalThis.crypto.randomUUID().replace(/-/g, "")
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
    const epoch = `${Date.now()}_${nonce}`;
    // This client-writable marker can only deny measurement. Granting still
    // requires the server-signed proof plus the HttpOnly session binding.
    document.cookie = `${META_CAPI_REVOCATION_COOKIE}=${epoch}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}${sharedDomain}${sameSite}`;
  } catch {
    // Storage failure leaves the client-side consent gate denied.
  }
}

function requestMetaCapiRegrant(): void {
  const revocationEpoch = isBrowser()
    ? getCookie(META_CAPI_REVOCATION_COOKIE)
    : null;
  if (!isBrowser() || !revocationEpoch) {
    metaCapiRegrantPromise = null;
    return;
  }
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(
    () => controller.abort(),
    META_CAPI_REGRANT_TIMEOUT_MS,
  );
  metaCapiRegrantPromise = fetch(META_CAPI_PROOF_ENDPOINT, {
    method: "PUT",
    credentials: "same-origin",
    keepalive: true,
    signal: controller.signal,
  })
    .then((response) => {
      if (
        !response.ok ||
        getCookie(META_CAPI_REVOCATION_COOKIE) !== revocationEpoch
      ) return false;
      const hostname = window.location.hostname.toLowerCase();
      const sharedDomain =
        hostname === "medexia-akt.com" || hostname.endsWith(".medexia-akt.com")
          ? "; Domain=medexia-akt.com"
          : "";
      const sameSite = sharedDomain
        ? "; SameSite=None; Secure"
        : `; SameSite=Lax${cookieSecureFlag()}`;
      document.cookie = `${META_CAPI_CLIENT_REGRANT_COOKIE}=${encodeURIComponent(revocationEpoch)}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}${sharedDomain}${sameSite}`;
      // The first event fired by saveConsent remains fail-closed while the
      // server regrant is pending. Notify consumers again only after the exact
      // withdrawal epoch has been re-authorized.
      dispatchConsentChanged(getStoredConsent());
      return true;
    })
    .catch(() => false)
    .finally(() => globalThis.clearTimeout(timeout));
}

export async function awaitMetaCapiRegrant(): Promise<boolean> {
  return metaCapiRegrantPromise ? metaCapiRegrantPromise : true;
}

export function saveConsent(choices: ConsentChoices, source: ConsentSource): ConsentRecord {
  const previous = getStoredConsent();
  const next = makeConsentRecord(choices, source, previous);
  const raw = JSON.stringify(next);
  setLocal(CONSENT_STORAGE_KEY, raw);
  setCookie(CONSENT_STORAGE_KEY, raw);

  if (!next.marketing) {
    metaCapiRegrantPromise = null;
    clearMarketingClickStorage();
    writeMetaCapiRevocationEpoch();
  } else {
    requestMetaCapiRegrant();
  }

  if (!next.functional && !next.analytics && !next.marketing) {
    removeLocal("mx_referral");
    removeCookie("mx_referral");
  }
  if (!next.analytics && !next.marketing) {
    clearNonEssentialMarketingStorage();
    setLocal(CONSENT_STORAGE_KEY, raw);
    setCookie(CONSENT_STORAGE_KEY, raw);
  }

  dispatchConsentChanged(next);
  return next;
}

export function acceptAllConsent(source: ConsentSource): ConsentRecord {
  return saveConsent({ functional: true, analytics: true, marketing: true }, source);
}

export function rejectAllConsent(source: ConsentSource): ConsentRecord {
  return saveConsent({ functional: false, analytics: false, marketing: false }, source);
}

export function openCookieSettings(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT));
}
