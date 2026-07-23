import {
  compactAttributionTouch,
  determineOfferContext,
  initMarketingAttribution,
  OFFER_IDS,
  type CtaIntent,
  type OfferId,
} from "./attribution";
import {
  canUseAnalytics,
  canUseMarketing,
  hasConsentDecision,
} from "../consent/consent";

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

export function getAppOrigin(): string {
  try {
    return new URL(appBaseUrl({ avoidCurrentOrigin: true })).origin;
  } catch {
    return DEFAULT_APP_BASE_URL;
  }
}

export function buildAppFallbackUrl(
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

export function buildAppUrl(
  pathOrExistingUrl: string,
  options: {
    intent?: CtaIntent;
    offerId?: OfferId;
  } = {},
): string {
  const base = appBaseUrl({ avoidCurrentOrigin: true });
  const url = /^https?:\/\//i.test(pathOrExistingUrl)
    ? new URL(pathOrExistingUrl)
    : new URL(pathOrExistingUrl.startsWith("/") ? pathOrExistingUrl : `/${pathOrExistingUrl}`, base);

  const snapshot = initMarketingAttribution();
  const first = snapshot.first_touch;
  const last = snapshot.last_touch;
  const firstTouch = compactAttributionTouch(first);
  const lastTouch = compactAttributionTouch(last);
  const handoffTouch = firstTouch ?? lastTouch;
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
  if (hasConsentDecision()) {
    url.searchParams.set("mx_mc", canUseMarketing() ? "1" : "0");
    url.searchParams.set("mx_ac", canUseAnalytics() ? "1" : "0");
  }

  setIfPresent(url.searchParams, "utm_source", handoffTouch?.source);
  setIfPresent(url.searchParams, "utm_medium", handoffTouch?.medium);
  setIfPresent(url.searchParams, "utm_campaign", handoffTouch?.campaign);
  setIfPresent(url.searchParams, "utm_content", handoffTouch?.content);
  setIfPresent(url.searchParams, "utm_term", handoffTouch?.term);

  setIfPresent(url.searchParams, "first_touch_source", firstTouch?.source);
  setIfPresent(url.searchParams, "first_touch_medium", firstTouch?.medium);
  setIfPresent(url.searchParams, "first_touch_campaign", firstTouch?.campaign);
  setIfPresent(url.searchParams, "first_touch_content", firstTouch?.content);
  setIfPresent(url.searchParams, "first_touch_term", firstTouch?.term);
  setIfPresent(url.searchParams, "last_touch_source", lastTouch?.source);
  setIfPresent(url.searchParams, "last_touch_medium", lastTouch?.medium);
  setIfPresent(url.searchParams, "last_touch_campaign", lastTouch?.campaign);
  setIfPresent(url.searchParams, "last_touch_content", lastTouch?.content);
  setIfPresent(url.searchParams, "last_touch_term", lastTouch?.term);

  setIfPresent(url.searchParams, "referrer", first?.referrer ?? last?.referrer);
  setIfPresent(url.searchParams, "first_landing_page", first?.first_landing_page ?? last?.first_landing_page);
  setIfPresent(url.searchParams, "campaign_id", last?.campaign_id ?? first?.campaign_id);

  if (canUseAnalytics()) {
    setIfPresent(url.searchParams, "mx_vid", snapshot.mx_visitor_id);
    setIfPresent(url.searchParams, "mx_sid", snapshot.mx_session_id);
    setIfPresent(url.searchParams, "offer_id", offer.offer_id);
  } else if (referralCode && offer.offer_id === OFFER_IDS.earlybird49ReferralPre) {
    setIfPresent(url.searchParams, "offer_id", offer.offer_id);
  }

  if (canUseMarketing()) {
    setIfPresent(url.searchParams, "gclid", last?.gclid ?? first?.gclid);
    setIfPresent(url.searchParams, "gbraid", last?.gbraid ?? first?.gbraid);
    setIfPresent(url.searchParams, "wbraid", last?.wbraid ?? first?.wbraid);
    setIfPresent(url.searchParams, "fbclid", last?.fbclid ?? first?.fbclid);
    setIfPresent(url.searchParams, "ttclid", last?.ttclid ?? first?.ttclid);
    setIfPresent(url.searchParams, "msclkid", last?.msclkid ?? first?.msclkid);
    setIfPresent(url.searchParams, "rdt_cid", last?.rdt_cid ?? first?.rdt_cid);
  }

  setIfPresent(url.searchParams, "intent", options.intent);

  if (referralCode) {
    url.searchParams.set("referral_code", referralCode);
    url.searchParams.set("ref", referralCode);
  }

  return url.toString();
}
