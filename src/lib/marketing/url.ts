import {
  compactAttributionTouch,
  determineOfferContext,
  getInternalTestToken,
  initMarketingAttribution,
  INTERNAL_TEST_QUERY_PARAM,
  OFFER_IDS,
  sanitizeMarketingUrl,
  type CtaIntent,
  type OfferId,
} from "./attribution";
import {
  canUseAnalytics,
  canUseMarketing,
  hasConsentDecision,
} from "../consent/consent";
import { buildPromoAppPassThroughUrl } from "./promo-pass-through";
import {
  buildReferralAppUrl,
  captureReferralCode,
} from "./referral-pass-through";
import { buildTrialAppUrl } from "./trial-pass-through";
import {
  normalizeRedditClickId,
  redditClickIdFromSearchParams,
} from "./reddit-click-id";

const DEFAULT_APP_BASE_URL = "https://app.medexia-akt.com";
const MARKETING_SITE_ORIGIN = "https://medexia-akt.com";

function appBaseUrl(options: { avoidCurrentOrigin?: boolean } = {}): string {
  const configured = process.env.NEXT_PUBLIC_APP_BASE_URL || DEFAULT_APP_BASE_URL;
  try {
    const configuredUrl = new URL(configured);
    const defaultOrigin = new URL(DEFAULT_APP_BASE_URL).origin;
    const currentOrigin =
      options.avoidCurrentOrigin && typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : null;

    if (
      configuredUrl.origin === MARKETING_SITE_ORIGIN ||
      (
      currentOrigin &&
      configuredUrl.origin === currentOrigin &&
        configuredUrl.origin !== defaultOrigin
      )
    ) {
      return DEFAULT_APP_BASE_URL;
    }

    return configuredUrl.toString();
  } catch {
    return DEFAULT_APP_BASE_URL;
  }
}

function nullable(value: string | null | undefined): string | null {
  if (!value || !value.trim()) return null;
  return value.trim();
}

function setIfPresent(params: URLSearchParams, key: string, value: string | null | undefined): void {
  const next = nullable(value);
  if (next) params.set(key, next);
}

function currentPageRedditClickId(): string | null {
  if (typeof window === "undefined") return null;
  return redditClickIdFromSearchParams(new URLSearchParams(window.location.search));
}

const SPECIAL_HANDOFF_AD_CLICK_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
  "rdt_cid",
] as const;

type CompactTouch = ReturnType<typeof compactAttributionTouch>;

function appendTouchHandoffParams(
  params: URLSearchParams,
  firstTouch: CompactTouch,
  lastTouch: CompactTouch,
): void {
  const handoffTouch = lastTouch ?? firstTouch;
  setIfPresent(params, "utm_source", handoffTouch?.source);
  setIfPresent(params, "utm_medium", handoffTouch?.medium);
  setIfPresent(params, "utm_campaign", handoffTouch?.campaign);
  setIfPresent(params, "utm_content", handoffTouch?.content);
  setIfPresent(params, "utm_term", handoffTouch?.term);

  setIfPresent(params, "first_touch_source", firstTouch?.source);
  setIfPresent(params, "first_touch_medium", firstTouch?.medium);
  setIfPresent(params, "first_touch_campaign", firstTouch?.campaign);
  setIfPresent(params, "first_touch_content", firstTouch?.content);
  setIfPresent(params, "first_touch_term", firstTouch?.term);
  setIfPresent(params, "last_touch_source", lastTouch?.source);
  setIfPresent(params, "last_touch_medium", lastTouch?.medium);
  setIfPresent(params, "last_touch_campaign", lastTouch?.campaign);
  setIfPresent(params, "last_touch_content", lastTouch?.content);
  setIfPresent(params, "last_touch_term", lastTouch?.term);
}

function appendAdClickIds(
  params: URLSearchParams,
  first: ReturnType<typeof initMarketingAttribution>["first_touch"],
  last: ReturnType<typeof initMarketingAttribution>["last_touch"],
): void {
  setIfPresent(params, "gclid", last?.gclid ?? first?.gclid);
  setIfPresent(params, "gbraid", last?.gbraid ?? first?.gbraid);
  setIfPresent(params, "wbraid", last?.wbraid ?? first?.wbraid);
  setIfPresent(params, "fbclid", last?.fbclid ?? first?.fbclid);
  setIfPresent(params, "ttclid", last?.ttclid ?? first?.ttclid);
  setIfPresent(params, "msclkid", last?.msclkid ?? first?.msclkid);
  setIfPresent(
    params,
    "rdt_cid",
    currentPageRedditClickId() ??
      normalizeRedditClickId(last?.rdt_cid) ??
      normalizeRedditClickId(first?.rdt_cid),
  );
}

function enrichSpecialAppHandoff(value: string): string {
  const url = new URL(value);
  const snapshot = initMarketingAttribution();
  const first = snapshot.first_touch;
  const last = snapshot.last_touch;
  const firstTouch = compactAttributionTouch(first);
  const lastTouch = compactAttributionTouch(last);
  const internalTestToken = getInternalTestToken();
  const includeAdClickIds = canUseMarketing() && !internalTestToken;

  for (const key of SPECIAL_HANDOFF_AD_CLICK_PARAMS) url.searchParams.delete(key);
  appendTouchHandoffParams(url.searchParams, firstTouch, lastTouch);
  if (internalTestToken) {
    url.searchParams.set(INTERNAL_TEST_QUERY_PARAM, internalTestToken);
    url.searchParams.set("mx_mc", "0");
  } else if (hasConsentDecision()) {
    url.searchParams.set("mx_mc", includeAdClickIds ? "1" : "0");
    url.searchParams.set("mx_ac", canUseAnalytics() ? "1" : "0");
  }

  if (includeAdClickIds) {
    appendAdClickIds(url.searchParams, first, last);
  }

  return url.toString();
}

export function getAppOrigin(): string {
  try {
    return new URL(appBaseUrl({ avoidCurrentOrigin: true })).origin;
  } catch {
    return DEFAULT_APP_BASE_URL;
  }
}

export function getAppHandoffConsentSignature(): string {
  return [
    hasConsentDecision() ? "decided" : "pending",
    canUseAnalytics() ? "analytics:1" : "analytics:0",
    canUseMarketing() ? "marketing:1" : "marketing:0",
  ].join("|");
}

/**
 * Event properties only need the handoff destination, not its attribution
 * query string. Keeping query parameters here would duplicate first/last-touch
 * data and could persist short-lived QA tokens or platform click identifiers.
 */
export function appHandoffEventHref(value: string): string {
  try {
    const url = new URL(value, appBaseUrl({ avoidCurrentOrigin: true }));
    return `${url.origin}${url.pathname}`.slice(0, 1024);
  } catch {
    return "";
  }
}

/**
 * Produce the same initial href during SSR and browser hydration. Campaign
 * pass-through is applied by buildAppUrl immediately after hydration; keeping
 * this first value deterministic ensures React updates the rendered anchor.
 */
export function buildAppHydrationUrl(
  pathOrExistingUrl: string,
  options: {
    intent?: CtaIntent;
    offerId?: OfferId;
  } = {},
): string {
  const base = appBaseUrl();
  const url = /^https?:\/\//i.test(pathOrExistingUrl)
    ? new URL(pathOrExistingUrl)
    : new URL(pathOrExistingUrl.startsWith("/") ? pathOrExistingUrl : `/${pathOrExistingUrl}`, base);

  setIfPresent(url.searchParams, "intent", options.intent);
  setIfPresent(url.searchParams, "offer_id", options.offerId);
  return url.toString();
}

export function buildAppFallbackUrl(
  pathOrExistingUrl: string,
  options: {
    intent?: CtaIntent;
    offerId?: OfferId;
    validatedTrialCode?: string | null;
  } = {},
): string {
  const trialUrl = buildTrialAppUrl(options.validatedTrialCode);
  if (trialUrl && options.intent !== "login" && options.intent !== "demo" && options.intent !== "app_open") {
    return enrichSpecialAppHandoff(trialUrl);
  }

  // Institutional promo queries are deliberately opaque and remain on the
  // marketing-site destination. They are not a direct landing-to-app handoff.
  const promoUrl = buildPromoAppPassThroughUrl();
  if (promoUrl) return promoUrl;

  const referralUrl = buildReferralAppUrl(
    captureReferralCode(),
    pathOrExistingUrl,
    options.intent,
  );
  if (referralUrl) return enrichSpecialAppHandoff(referralUrl);

  const base = appBaseUrl();
  const url = /^https?:\/\//i.test(pathOrExistingUrl)
    ? new URL(pathOrExistingUrl)
    : new URL(pathOrExistingUrl.startsWith("/") ? pathOrExistingUrl : `/${pathOrExistingUrl}`, base);

  setIfPresent(url.searchParams, "intent", options.intent);
  setIfPresent(url.searchParams, "offer_id", options.offerId);
  const internalTestToken = getInternalTestToken();
  if (internalTestToken) {
    url.searchParams.set(INTERNAL_TEST_QUERY_PARAM, internalTestToken);
    url.searchParams.set("mx_mc", "0");
  }

  return url.toString();
}

export function buildAppUrl(
  pathOrExistingUrl: string,
  options: {
    intent?: CtaIntent;
    offerId?: OfferId;
    validatedTrialCode?: string | null;
  } = {},
): string {
  const trialUrl = buildTrialAppUrl(options.validatedTrialCode);
  if (trialUrl && options.intent !== "login" && options.intent !== "demo" && options.intent !== "app_open") {
    return enrichSpecialAppHandoff(trialUrl);
  }

  // Institutional promo queries are deliberately opaque and remain on the
  // marketing-site destination. They are not a direct landing-to-app handoff.
  const promoUrl = buildPromoAppPassThroughUrl();
  if (promoUrl) return promoUrl;

  const referralUrl = buildReferralAppUrl(
    captureReferralCode(),
    pathOrExistingUrl,
    options.intent,
  );
  if (referralUrl) return enrichSpecialAppHandoff(referralUrl);

  const base = appBaseUrl({ avoidCurrentOrigin: true });
  const url = /^https?:\/\//i.test(pathOrExistingUrl)
    ? new URL(pathOrExistingUrl)
    : new URL(pathOrExistingUrl.startsWith("/") ? pathOrExistingUrl : `/${pathOrExistingUrl}`, base);

  const snapshot = initMarketingAttribution();
  const first = snapshot.first_touch;
  const last = snapshot.last_touch;
  const firstTouch = compactAttributionTouch(first);
  const lastTouch = compactAttributionTouch(last);
  const internalTestToken = getInternalTestToken();
  const internalTestTraffic = Boolean(internalTestToken);
  const includeAdClickIds = canUseMarketing() && !internalTestTraffic;
  const referralCode = snapshot.active_referral?.referral_code ?? null;
  const requestedOfferId =
    options.offerId === OFFER_IDS.earlybird49ReferralPre && !referralCode
      ? undefined
      : options.offerId;
  const offer = requestedOfferId
    ? { ...snapshot.offer_context, offer_id: requestedOfferId }
    : determineOfferContext({
        referralCode,
        intent: options.intent,
        explicitOfferId:
          snapshot.offer_context.reason === "explicit"
            ? snapshot.offer_context.offer_id
            : null,
      });

  // The app lives on a separate origin and deliberately does not infer
  // consent from the presence of UTM parameters. Carry the explicit landing
  // decision on every CTA handoff so the app can either initialise Google Ads
  // measurement or actively clear a previously granted state. Before a user
  // decides, neither marker is sent and the app remains measurement-off.
  if (internalTestToken) {
    url.searchParams.set(INTERNAL_TEST_QUERY_PARAM, internalTestToken);
    url.searchParams.set("mx_mc", "0");
  }
  if (hasConsentDecision()) {
    url.searchParams.set("mx_mc", includeAdClickIds ? "1" : "0");
    url.searchParams.set("mx_ac", canUseAnalytics() ? "1" : "0");
  }

  appendTouchHandoffParams(url.searchParams, firstTouch, lastTouch);

  setIfPresent(
    url.searchParams,
    "referrer",
    sanitizeMarketingUrl(first?.referrer ?? last?.referrer, includeAdClickIds),
  );
  setIfPresent(
    url.searchParams,
    "first_landing_page",
    sanitizeMarketingUrl(first?.first_landing_page ?? last?.first_landing_page, includeAdClickIds),
  );
  setIfPresent(url.searchParams, "campaign_id", last?.campaign_id ?? first?.campaign_id);

  if (canUseAnalytics()) {
    setIfPresent(url.searchParams, "mx_vid", snapshot.mx_visitor_id);
    setIfPresent(url.searchParams, "mx_sid", snapshot.mx_session_id);
    setIfPresent(url.searchParams, "offer_id", offer.offer_id);
  } else if (referralCode && offer.offer_id === OFFER_IDS.earlybird49ReferralPre) {
    setIfPresent(url.searchParams, "offer_id", offer.offer_id);
  }

  if (includeAdClickIds) {
    appendAdClickIds(url.searchParams, first, last);
  }

  setIfPresent(url.searchParams, "intent", options.intent);

  return url.toString();
}
