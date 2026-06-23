export const MARKETING_STORAGE_KEYS = {
  visitorId: "mx_visitor_id",
  sessionId: "mx_session_id",
  firstTouch: "mx_first_touch",
  lastTouch: "mx_last_touch",
  referral: "mx_referral",
  offerContext: "mx_offer_context",
} as const;

export const OFFER_IDS = {
  freePre: "free_unlimited_pre_2026_07_08",
  earlybird59Pre: "earlybird_59_pre_2026_07_08",
  earlybird49ReferralPre: "earlybird_49_referral_pre_2026_07_08",
  freePost: "free_questions_2h_audio_post_2026_07_08",
  standard79Post: "standard_79_post_2026_07_08",
} as const;

export type OfferId = (typeof OFFER_IDS)[keyof typeof OFFER_IDS];

export type CtaIntent =
  | "start_free"
  | "earlybird_upgrade"
  | "referral_earlybird"
  | "demo"
  | "login"
  | "checkout"
  | "app_open";

export interface MarketingTouch {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  first_landing_page: string;
  touch_timestamp: string;
  device_type: string;
  campaign_id: string | null;
  offer_id: OfferId | string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  ttclid: string | null;
  msclkid: string | null;
  ref: string | null;
  referral_code: string | null;
}

export interface ReferralSnapshot {
  referral_code: string;
  captured_at: string;
  source_param: string;
}

export interface OfferContext {
  offer_id: OfferId;
  phase: "pre_2026_07_08" | "post_2026_07_08";
  referral_code: string | null;
  reason:
    | "start_free"
    | "earlybird"
    | "referral"
    | "post_free"
    | "post_paid"
    | "explicit";
}

export interface MarketingSnapshot {
  mx_visitor_id: string;
  mx_session_id: string;
  first_touch: MarketingTouch | null;
  last_touch: MarketingTouch | null;
  referral: ReferralSnapshot | null;
  offer_context: OfferContext;
}

const TOUCH_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "campaign_id",
  "offer_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
  "ref",
  "referral",
  "referral_code",
  "r",
] as const;

const REFERRAL_PARAM_KEYS = ["ref", "referral", "referral_code", "r"] as const;
const OFFER_CUTOVER_UK = new Date("2026-07-08T00:00:00+01:00");
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function safeRandomId(prefix: string): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    // fall through
  }
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function safeLocalGet(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalSet(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Attribution must never block the page.
  }
}

function safeSessionGet(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionSet(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Session attribution gracefully degrades when storage is unavailable.
  }
}

function cookieSecureFlag(): string {
  if (!isBrowser()) return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}

function safeCookieSet(key: string, value: string, maxAgeSeconds = COOKIE_MAX_AGE_SECONDS): void {
  if (!isBrowser()) return;
  try {
    document.cookie = `${key}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${cookieSecureFlag()}`;
  } catch {
    // Ignore cookie failures.
  }
}

function safeCookieGet(key: string): string | null {
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

function readJson<T>(key: string): T | null {
  const raw = safeLocalGet(key) ?? safeCookieGet(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function persistJson(key: string, value: unknown): void {
  const raw = JSON.stringify(value);
  safeLocalSet(key, raw);
  safeCookieSet(key, raw);
}

function getParam(params: URLSearchParams, key: string, max = 256): string | null {
  const value = params.get(key);
  if (!value || !value.trim()) return null;
  return value.trim().slice(0, max);
}

export function normalizeReferralCode(params: URLSearchParams): {
  referralCode: string | null;
  sourceParam: string | null;
} {
  for (const key of REFERRAL_PARAM_KEYS) {
    const value = getParam(params, key, 96);
    if (value) {
      return {
        referralCode: value.replace(/\s+/g, "").slice(0, 96),
        sourceParam: key,
      };
    }
  }
  return { referralCode: null, sourceParam: null };
}

function deviceType(): string {
  if (!isBrowser()) return "unknown";
  const ua = navigator.userAgent || "";
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobile|iphone|android/i.test(ua)) return "mobile";
  return "desktop";
}

function pagePath(): string {
  if (!isBrowser()) return "/";
  return `${window.location.pathname}${window.location.search}`.slice(0, 1024);
}

function externalReferrer(): string | null {
  if (!isBrowser() || !document.referrer) return null;
  try {
    const ref = new URL(document.referrer);
    if (ref.hostname === window.location.hostname) return null;
    return document.referrer.slice(0, 1024);
  } catch {
    return document.referrer.slice(0, 1024);
  }
}

function hasMeaningfulTouch(params: URLSearchParams, referrer: string | null): boolean {
  if (referrer) return true;
  return TOUCH_PARAM_KEYS.some((key) => Boolean(getParam(params, key)));
}

function readCurrentTouch(referralCode: string | null): MarketingTouch | null {
  if (!isBrowser()) return null;
  const params = new URLSearchParams(window.location.search);
  const referrer = externalReferrer();
  if (!hasMeaningfulTouch(params, referrer)) return null;

  const explicitOffer = getParam(params, "offer_id", 128);

  return {
    utm_source: getParam(params, "utm_source", 128),
    utm_medium: getParam(params, "utm_medium", 128),
    utm_campaign: getParam(params, "utm_campaign", 160),
    utm_content: getParam(params, "utm_content", 160),
    utm_term: getParam(params, "utm_term", 160),
    referrer,
    first_landing_page: pagePath(),
    touch_timestamp: new Date().toISOString(),
    device_type: deviceType(),
    campaign_id: getParam(params, "campaign_id", 128),
    offer_id: explicitOffer,
    gclid: getParam(params, "gclid", 256),
    gbraid: getParam(params, "gbraid", 256),
    wbraid: getParam(params, "wbraid", 256),
    fbclid: getParam(params, "fbclid", 256),
    ttclid: getParam(params, "ttclid", 256),
    msclkid: getParam(params, "msclkid", 256),
    ref: getParam(params, "ref", 96),
    referral_code: referralCode,
  };
}

export function isPreOfferCutover(now: Date = new Date()): boolean {
  return now.getTime() < OFFER_CUTOVER_UK.getTime();
}

function isOfferId(value: string | null | undefined): value is OfferId {
  return Boolean(value && Object.values(OFFER_IDS).includes(value as OfferId));
}

export function determineOfferContext(options: {
  referralCode?: string | null;
  explicitOfferId?: string | null;
  intent?: CtaIntent;
  now?: Date;
} = {}): OfferContext {
  const now = options.now ?? new Date();
  const preCutover = isPreOfferCutover(now);
  const referralCode = options.referralCode || null;
  const explicitOfferId = isOfferId(options.explicitOfferId) ? options.explicitOfferId : null;

  if (
    explicitOfferId &&
    explicitOfferId !== OFFER_IDS.earlybird49ReferralPre &&
    (preCutover || !explicitOfferId.endsWith("_pre_2026_07_08"))
  ) {
    return {
      offer_id: explicitOfferId,
      phase: preCutover ? "pre_2026_07_08" : "post_2026_07_08",
      referral_code: referralCode,
      reason: "explicit",
    };
  }

  if (preCutover && referralCode && options.intent === "referral_earlybird") {
    return {
      offer_id: OFFER_IDS.earlybird49ReferralPre,
      phase: "pre_2026_07_08",
      referral_code: referralCode,
      reason: "referral",
    };
  }

  if (preCutover && referralCode && !options.intent) {
    return {
      offer_id: OFFER_IDS.earlybird49ReferralPre,
      phase: "pre_2026_07_08",
      referral_code: referralCode,
      reason: "referral",
    };
  }

  if (preCutover && options.intent === "earlybird_upgrade") {
    return {
      offer_id: OFFER_IDS.earlybird59Pre,
      phase: "pre_2026_07_08",
      referral_code: referralCode,
      reason: "earlybird",
    };
  }

  if (!preCutover && (options.intent === "checkout" || options.intent === "earlybird_upgrade")) {
    return {
      offer_id: OFFER_IDS.standard79Post,
      phase: "post_2026_07_08",
      referral_code: referralCode,
      reason: "post_paid",
    };
  }

  if (!preCutover) {
    return {
      offer_id: options.intent === "checkout" ? OFFER_IDS.standard79Post : OFFER_IDS.freePost,
      phase: "post_2026_07_08",
      referral_code: referralCode,
      reason: options.intent === "checkout" ? "post_paid" : "post_free",
    };
  }

  return {
    offer_id: OFFER_IDS.freePre,
    phase: "pre_2026_07_08",
    referral_code: referralCode,
    reason: "start_free",
  };
}

function ensureVisitorId(): string {
  const existing = safeLocalGet(MARKETING_STORAGE_KEYS.visitorId) ?? safeCookieGet(MARKETING_STORAGE_KEYS.visitorId);
  if (existing) {
    safeLocalSet(MARKETING_STORAGE_KEYS.visitorId, existing);
    safeCookieSet(MARKETING_STORAGE_KEYS.visitorId, existing);
    return existing;
  }
  const id = safeRandomId("mxv");
  safeLocalSet(MARKETING_STORAGE_KEYS.visitorId, id);
  safeCookieSet(MARKETING_STORAGE_KEYS.visitorId, id);
  return id;
}

function ensureSessionId(): string {
  const existing = safeSessionGet(MARKETING_STORAGE_KEYS.sessionId) ?? safeCookieGet(MARKETING_STORAGE_KEYS.sessionId);
  if (existing) {
    safeSessionSet(MARKETING_STORAGE_KEYS.sessionId, existing);
    safeCookieSet(MARKETING_STORAGE_KEYS.sessionId, existing, 60 * 60 * 12);
    return existing;
  }
  const id = safeRandomId("mxs");
  safeSessionSet(MARKETING_STORAGE_KEYS.sessionId, id);
  safeCookieSet(MARKETING_STORAGE_KEYS.sessionId, id, 60 * 60 * 12);
  return id;
}

export function getMarketingSnapshot(): MarketingSnapshot {
  const visitorId = ensureVisitorId();
  const sessionId = ensureSessionId();
  const firstTouch = readJson<MarketingTouch>(MARKETING_STORAGE_KEYS.firstTouch);
  const lastTouch = readJson<MarketingTouch>(MARKETING_STORAGE_KEYS.lastTouch);
  const referral = readJson<ReferralSnapshot>(MARKETING_STORAGE_KEYS.referral);
  const offerContext =
    readJson<OfferContext>(MARKETING_STORAGE_KEYS.offerContext) ??
    determineOfferContext({ referralCode: referral?.referral_code ?? null });

  return {
    mx_visitor_id: visitorId,
    mx_session_id: sessionId,
    first_touch: firstTouch,
    last_touch: lastTouch,
    referral,
    offer_context: offerContext,
  };
}

export function initMarketingAttribution(): MarketingSnapshot {
  ensureVisitorId();
  ensureSessionId();

  if (!isBrowser()) return getMarketingSnapshot();

  const params = new URLSearchParams(window.location.search);
  const { referralCode, sourceParam } = normalizeReferralCode(params);
  const existingReferral = readJson<ReferralSnapshot>(MARKETING_STORAGE_KEYS.referral);
  const activeReferralCode = referralCode ?? existingReferral?.referral_code ?? null;

  if (referralCode && sourceParam) {
    persistJson(MARKETING_STORAGE_KEYS.referral, {
      referral_code: referralCode,
      captured_at: new Date().toISOString(),
      source_param: sourceParam,
    } satisfies ReferralSnapshot);
  }

  const touch = readCurrentTouch(activeReferralCode);
  const firstTouch = readJson<MarketingTouch>(MARKETING_STORAGE_KEYS.firstTouch);
  if (touch) {
    if (!firstTouch) {
      persistJson(MARKETING_STORAGE_KEYS.firstTouch, touch);
    }
    persistJson(MARKETING_STORAGE_KEYS.lastTouch, touch);
  }

  const offerContext = determineOfferContext({
    referralCode: activeReferralCode,
    explicitOfferId: getParam(params, "offer_id", 128),
  });
  persistJson(MARKETING_STORAGE_KEYS.offerContext, offerContext);

  return getMarketingSnapshot();
}

export function attributionForEvent(): Record<string, unknown> {
  const snapshot = getMarketingSnapshot();
  return {
    mx_visitor_id: snapshot.mx_visitor_id,
    mx_session_id: snapshot.mx_session_id,
    first_touch: snapshot.first_touch,
    last_touch: snapshot.last_touch,
    referral_code: snapshot.referral?.referral_code ?? null,
    offer_id: snapshot.offer_context.offer_id,
  };
}

