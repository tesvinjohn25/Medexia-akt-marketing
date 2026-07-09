import {
  canUseAnalytics,
  canUseFunctional,
  canUseMarketing,
  hasConsentDecision,
} from "../consent/consent";
import { OFFER_CUTOVER_UK } from "../offer-phase";

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
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
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
  rdt_cid: string | null;
  ref: string | null;
  referral_code: string | null;
}

export interface AppMarketingTouch {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
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
  mx_visitor_id: string | null;
  mx_session_id: string | null;
  first_touch: MarketingTouch | null;
  last_touch: MarketingTouch | null;
  active_referral: ReferralSnapshot | null;
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
  "rdt_cid",
  "ref",
  "referral",
  "referral_code",
  "r",
] as const;

const REFERRAL_PARAM_KEYS = ["ref", "referral", "referral_code", "r"] as const;
const AD_CLICK_PARAM_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "ttclid", "msclkid", "rdt_cid"] as const;
const UTM_PARAM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;
const CUSTOM_GPT_RETURN_ATTRIBUTION = {
  utm_source: "custom_gpt",
  utm_medium: "gpt_footer",
  utm_campaign: "akt_explanation_builder",
  utm_content: "short_free_link",
} as const;

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

function hasUtmParam(params: URLSearchParams): boolean {
  return UTM_PARAM_KEYS.some((key) => Boolean(getParam(params, key)));
}

function cleanHostname(hostname: string): string {
  return hostname
    .toLowerCase()
    .replace(/\.+$/, "")
    .replace(/^www\./, "")
    .replace(/[^a-z0-9.-]/g, "")
    .slice(0, 128);
}

function isInternalHostname(hostname: string): boolean {
  const host = cleanHostname(hostname);
  return host === "medexia-akt.com" || host.endsWith(".medexia-akt.com");
}

function classifiedReferrerTouch(referrer: string | null): AppMarketingTouch | null {
  if (!referrer) return null;

  let host = "";
  try {
    host = cleanHostname(new URL(referrer).hostname);
  } catch {
    return null;
  }

  if (!host || isInternalHostname(host)) return null;

  const touch = (
    source: string,
    medium: string,
  ): AppMarketingTouch => ({
    source,
    medium,
    campaign: null,
    content: null,
    term: null,
  });

  // Specific AI hosts are checked before generic search hosts such as google.
  if (host === "copilot.microsoft.com" || host.startsWith("copilot.")) return touch("copilot", "ai");
  if (host === "chatgpt.com" || host === "chat.openai.com" || host === "openai.com" || host.endsWith(".openai.com")) return touch("chatgpt", "ai");
  if (host === "perplexity.ai" || host.endsWith(".perplexity.ai")) return touch("perplexity", "ai");
  if (host === "gemini.google.com") return touch("gemini", "ai");
  if (host === "claude.ai" || host.endsWith(".claude.ai")) return touch("claude", "ai");

  if (host === "google.com" || host.startsWith("google.") || host.includes(".google.")) return touch("google", "organic");
  if (host === "bing.com" || host.endsWith(".bing.com")) return touch("bing", "organic");
  if (host === "duckduckgo.com" || host.endsWith(".duckduckgo.com")) return touch("duckduckgo", "organic");
  if (host === "yahoo.com" || host.startsWith("yahoo.") || host.includes(".yahoo.")) return touch("yahoo", "organic");
  if (host === "ecosia.org" || host.endsWith(".ecosia.org")) return touch("ecosia", "organic");
  if (host === "yandex.com" || host.startsWith("yandex.") || host.includes(".yandex.")) return touch("yandex", "organic");
  if (host === "baidu.com" || host.endsWith(".baidu.com")) return touch("baidu", "organic");
  if (host === "brave.com" || host.endsWith(".brave.com")) return touch("brave", "organic");
  if (host === "startpage.com" || host.endsWith(".startpage.com")) return touch("startpage", "organic");
  if (host === "qwant.com" || host.endsWith(".qwant.com")) return touch("qwant", "organic");

  if (host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.com" || host.endsWith(".fb.com")) return touch("facebook", "social");
  if (host === "instagram.com" || host.endsWith(".instagram.com")) return touch("instagram", "social");
  if (host === "twitter.com" || host.endsWith(".twitter.com") || host === "x.com" || host.endsWith(".x.com") || host === "t.co") return touch("twitter", "social");
  if (host === "linkedin.com" || host.endsWith(".linkedin.com") || host === "lnkd.in") return touch("linkedin", "social");
  if (host === "reddit.com" || host.endsWith(".reddit.com")) return touch("reddit", "social");
  if (host === "youtube.com" || host.endsWith(".youtube.com") || host === "youtu.be") return touch("youtube", "social");
  if (host === "t.me" || host.endsWith(".t.me")) return touch("telegram", "social");
  if (host === "tiktok.com" || host.endsWith(".tiktok.com")) return touch("tiktok", "social");
  if (host === "pinterest.com" || host.endsWith(".pinterest.com")) return touch("pinterest", "social");

  return touch(host, "referral");
}

function compactTouchFromUtm(params: URLSearchParams): AppMarketingTouch | null {
  if (!hasUtmParam(params)) return null;
  return {
    source: getParam(params, "utm_source", 128),
    medium: getParam(params, "utm_medium", 128),
    campaign: getParam(params, "utm_campaign", 160),
    content: getParam(params, "utm_content", 160),
    term: getParam(params, "utm_term", 160),
  };
}

function compactTouchFromRouteAttribution(
  attribution: typeof CUSTOM_GPT_RETURN_ATTRIBUTION | null,
): AppMarketingTouch | null {
  if (!attribution) return null;
  return {
    source: attribution.utm_source,
    medium: attribution.utm_medium,
    campaign: attribution.utm_campaign,
    content: attribution.utm_content,
    term: null,
  };
}

function toAppMarketingTouch(touch: MarketingTouch | null | undefined): AppMarketingTouch | null {
  if (!touch) return null;
  const compact = {
    source: touch.source ?? touch.utm_source ?? null,
    medium: touch.medium ?? touch.utm_medium ?? null,
    campaign: touch.campaign ?? touch.utm_campaign ?? null,
    content: touch.content ?? touch.utm_content ?? null,
    term: touch.term ?? touch.utm_term ?? null,
  };
  return Object.values(compact).some(Boolean) ? compact : null;
}

export function compactAttributionTouch(touch: MarketingTouch | null | undefined): AppMarketingTouch | null {
  return toAppMarketingTouch(touch);
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
    if (cleanHostname(ref.hostname) === cleanHostname(window.location.hostname)) return null;
    if (isInternalHostname(ref.hostname)) return null;
    return document.referrer.slice(0, 1024);
  } catch {
    return document.referrer.slice(0, 1024);
  }
}

function hasMeaningfulTouch(params: URLSearchParams, referrer: string | null, includeAdClickIds: boolean): boolean {
  if (compactTouchFromUtm(params)) return true;
  if (customGptReturnAttribution(params)) return true;
  if (classifiedReferrerTouch(referrer)) return true;
  return TOUCH_PARAM_KEYS.some((key) => {
    if ((UTM_PARAM_KEYS as readonly string[]).includes(key)) return false;
    if (!includeAdClickIds && (AD_CLICK_PARAM_KEYS as readonly string[]).includes(key)) return false;
    return Boolean(getParam(params, key));
  });
}

function hasVisibleTouchParam(params: URLSearchParams): boolean {
  return TOUCH_PARAM_KEYS.some((key) => Boolean(getParam(params, key)));
}

function customGptReturnAttribution(params: URLSearchParams):
  | typeof CUSTOM_GPT_RETURN_ATTRIBUTION
  | null {
  if (!isBrowser()) return null;
  if (window.location.pathname.replace(/\/+$/, "") !== "/free") return null;
  if (hasVisibleTouchParam(params)) return null;
  return CUSTOM_GPT_RETURN_ATTRIBUTION;
}

function readCurrentReferralSnapshot(): ReferralSnapshot | null {
  if (!isBrowser()) return null;
  const params = new URLSearchParams(window.location.search);
  const { referralCode, sourceParam } = normalizeReferralCode(params);
  if (!referralCode || !sourceParam) return null;
  return {
    referral_code: referralCode,
    captured_at: new Date().toISOString(),
    source_param: sourceParam,
  };
}

function readAllowedReferralSnapshot(current = readCurrentReferralSnapshot()): ReferralSnapshot | null {
  if (current) return current;
  if (canUseFunctional() || canUseAnalytics() || canUseMarketing() || !hasConsentDecision()) {
    return readJson<ReferralSnapshot>(MARKETING_STORAGE_KEYS.referral);
  }
  return null;
}

function readCurrentTouch(referralCode: string | null, includeAdClickIds: boolean): MarketingTouch | null {
  if (!isBrowser()) return null;
  const params = new URLSearchParams(window.location.search);
  const referrer = externalReferrer();
  const routeAttribution = customGptReturnAttribution(params);
  if (!routeAttribution && !hasMeaningfulTouch(params, referrer, includeAdClickIds)) return null;

  const explicitOffer = getParam(params, "offer_id", 128);
  const resolvedTouch =
    compactTouchFromUtm(params) ??
    compactTouchFromRouteAttribution(routeAttribution) ??
    classifiedReferrerTouch(referrer) ??
    {
      source: null,
      medium: null,
      campaign: null,
      content: null,
      term: null,
    };

  return {
    source: resolvedTouch.source,
    medium: resolvedTouch.medium,
    campaign: resolvedTouch.campaign,
    content: resolvedTouch.content,
    term: resolvedTouch.term,
    utm_source: resolvedTouch.source,
    utm_medium: resolvedTouch.medium,
    utm_campaign: resolvedTouch.campaign,
    utm_content: resolvedTouch.content,
    utm_term: resolvedTouch.term,
    referrer,
    first_landing_page: pagePath(),
    touch_timestamp: new Date().toISOString(),
    device_type: deviceType(),
    campaign_id: getParam(params, "campaign_id", 128),
    offer_id: explicitOffer,
    gclid: includeAdClickIds ? getParam(params, "gclid", 256) : null,
    gbraid: includeAdClickIds ? getParam(params, "gbraid", 256) : null,
    wbraid: includeAdClickIds ? getParam(params, "wbraid", 256) : null,
    fbclid: includeAdClickIds ? getParam(params, "fbclid", 256) : null,
    ttclid: includeAdClickIds ? getParam(params, "ttclid", 256) : null,
    msclkid: includeAdClickIds ? getParam(params, "msclkid", 256) : null,
    rdt_cid: includeAdClickIds ? getParam(params, "rdt_cid", 256) : null,
    ref: getParam(params, "ref", 96),
    referral_code: referralCode,
  };
}

export function isPreOfferCutover(now: Date = new Date()): boolean {
  return now.getTime() < OFFER_CUTOVER_UK.getTime();
}

function publicFlag(name: string, defaultEnabled: boolean): boolean {
  const value = process.env[name];
  if (value === undefined || value === "") return defaultEnabled;
  return value === "true";
}

export function publicReferralSprintEnabled(): boolean {
  return publicFlag("NEXT_PUBLIC_REFERRAL_SPRINT_ENABLED", true);
}

export function publicReferralFriendDiscountEnabled(): boolean {
  return publicFlag("NEXT_PUBLIC_REFERRAL_FRIEND_DISCOUNT_ENABLED", true);
}

export function canShowReferralEarlybirdOffer(
  referralCode: string | null | undefined,
  now: Date = new Date(),
): boolean {
  return Boolean(
    referralCode &&
      isPreOfferCutover(now) &&
      publicReferralSprintEnabled() &&
      publicReferralFriendDiscountEnabled(),
  );
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
  const referralOfferVisible = canShowReferralEarlybirdOffer(referralCode, now);

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

  if (explicitOfferId === OFFER_IDS.earlybird49ReferralPre && referralOfferVisible) {
    return {
      offer_id: OFFER_IDS.earlybird49ReferralPre,
      phase: "pre_2026_07_08",
      referral_code: referralCode,
      reason: "referral",
    };
  }

  if (preCutover && referralOfferVisible && options.intent === "referral_earlybird") {
    return {
      offer_id: OFFER_IDS.earlybird49ReferralPre,
      phase: "pre_2026_07_08",
      referral_code: referralCode,
      reason: "referral",
    };
  }

  if (preCutover && referralOfferVisible && !options.intent) {
    return {
      offer_id: OFFER_IDS.earlybird49ReferralPre,
      phase: "pre_2026_07_08",
      referral_code: referralCode,
      reason: "referral",
    };
  }

  if (preCutover && (options.intent === "earlybird_upgrade" || options.intent === "referral_earlybird")) {
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

function touchStorageAllowed(): boolean {
  return !hasConsentDecision() || canUseFunctional() || canUseAnalytics() || canUseMarketing();
}

function analyticsStorageAllowed(): boolean {
  return canUseAnalytics() || canUseMarketing();
}

export function getMarketingSnapshot(): MarketingSnapshot {
  const persistentAttributionAllowed = analyticsStorageAllowed();
  const sourceAttributionAllowed = touchStorageAllowed();
  const activeReferral = readCurrentReferralSnapshot();
  const visitorId = persistentAttributionAllowed
    ? safeLocalGet(MARKETING_STORAGE_KEYS.visitorId) ?? safeCookieGet(MARKETING_STORAGE_KEYS.visitorId)
    : null;
  const sessionId = persistentAttributionAllowed
    ? safeSessionGet(MARKETING_STORAGE_KEYS.sessionId) ?? safeCookieGet(MARKETING_STORAGE_KEYS.sessionId)
    : null;
  const firstTouch = sourceAttributionAllowed
    ? readJson<MarketingTouch>(MARKETING_STORAGE_KEYS.firstTouch)
    : null;
  const lastTouch = sourceAttributionAllowed
    ? readJson<MarketingTouch>(MARKETING_STORAGE_KEYS.lastTouch)
    : null;
  const referral = readAllowedReferralSnapshot(activeReferral);
  const offerContext = determineOfferContext({
    referralCode: activeReferral?.referral_code ?? null,
  });

  return {
    mx_visitor_id: visitorId,
    mx_session_id: sessionId,
    first_touch: firstTouch,
    last_touch: lastTouch,
    active_referral: activeReferral,
    referral,
    offer_context: offerContext,
  };
}

export function initMarketingAttribution(): MarketingSnapshot {
  const functionalAllowed = canUseFunctional();
  const analyticsAllowed = canUseAnalytics();
  const marketingAllowed = canUseMarketing();
  const persistentAttributionAllowed = analyticsAllowed || marketingAllowed;
  const sourceAttributionAllowed = touchStorageAllowed();

  if (!persistentAttributionAllowed && !sourceAttributionAllowed) {
    if (functionalAllowed && isBrowser()) {
      const params = new URLSearchParams(window.location.search);
      const { referralCode, sourceParam } = normalizeReferralCode(params);
      if (referralCode && sourceParam) {
        persistJson(MARKETING_STORAGE_KEYS.referral, {
          referral_code: referralCode,
          captured_at: new Date().toISOString(),
          source_param: sourceParam,
        } satisfies ReferralSnapshot);
      }
    }
    return getMarketingSnapshot();
  }

  if (persistentAttributionAllowed) {
    ensureVisitorId();
    ensureSessionId();
  }

  if (!isBrowser()) return getMarketingSnapshot();

  const params = new URLSearchParams(window.location.search);
  const { referralCode, sourceParam } = normalizeReferralCode(params);
  const existingReferral = readJson<ReferralSnapshot>(MARKETING_STORAGE_KEYS.referral);

  if (referralCode && sourceParam && (functionalAllowed || persistentAttributionAllowed || sourceAttributionAllowed)) {
    persistJson(MARKETING_STORAGE_KEYS.referral, {
      referral_code: referralCode,
      captured_at: new Date().toISOString(),
      source_param: sourceParam,
    } satisfies ReferralSnapshot);
  }

  const storedReferralCode = referralCode ?? existingReferral?.referral_code ?? null;
  const touch = readCurrentTouch(referralCode ?? null, marketingAllowed);
  const firstTouch = readJson<MarketingTouch>(MARKETING_STORAGE_KEYS.firstTouch);
  if (touch && sourceAttributionAllowed) {
    if (!firstTouch) {
      persistJson(MARKETING_STORAGE_KEYS.firstTouch, touch);
    }
    persistJson(MARKETING_STORAGE_KEYS.lastTouch, touch);
  }

  const offerContext = determineOfferContext({
    referralCode: referralCode ?? null,
    explicitOfferId: getParam(params, "offer_id", 128),
  });
  if (persistentAttributionAllowed) {
    persistJson(MARKETING_STORAGE_KEYS.offerContext, {
      ...offerContext,
      referral_code: referralCode ? offerContext.referral_code : storedReferralCode,
    });
  }

  return getMarketingSnapshot();
}

export function attributionForEvent(): Record<string, unknown> {
  const snapshot = getMarketingSnapshot();
  const firstTouch = toAppMarketingTouch(snapshot.first_touch);
  const lastTouch = toAppMarketingTouch(snapshot.last_touch);
  const source = firstTouch?.source ?? lastTouch?.source ?? null;
  return {
    mx_visitor_id: snapshot.mx_visitor_id,
    mx_session_id: snapshot.mx_session_id,
    source,
    first_touch: firstTouch,
    last_touch: lastTouch,
    referral_code: snapshot.referral?.referral_code ?? null,
    offer_id: snapshot.offer_context.offer_id,
  };
}
