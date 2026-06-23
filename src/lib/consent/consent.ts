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
    if (parsed.version !== CONSENT_VERSION) return null;
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
  return Boolean(getStoredConsent()?.marketing);
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

export function saveConsent(choices: ConsentChoices, source: ConsentSource): ConsentRecord {
  const previous = getStoredConsent();
  const next = makeConsentRecord(choices, source, previous);
  const raw = JSON.stringify(next);
  setLocal(CONSENT_STORAGE_KEY, raw);
  setCookie(CONSENT_STORAGE_KEY, raw);

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
