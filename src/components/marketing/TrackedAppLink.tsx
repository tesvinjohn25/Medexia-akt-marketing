"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";
import {
  appHandoffEventHref,
  buildAppHydrationUrl,
  buildAppUrl,
  getAppHandoffConsentSignature,
} from "@/lib/marketing/url";
import { flushLandingEvent, trackLandingEvent } from "@/lib/marketing/events";
import {
  addMetaMarketingConsentProof,
  reusePrefetchedMetaMarketingConsentProof,
} from "@/lib/marketing/meta-consent-proof";
import {
  OFFER_IDS,
  type CtaIntent,
  type OfferId,
} from "@/lib/marketing/attribution";
import { useMarketingAttribution } from "./MarketingAttributionProvider";
import { useValidatedTrialOffer } from "./TrialOfferBanner";
import { useHeldReferralCode } from "./ReferralOfferBanner";

const CTA_EVENT_BY_INTENT: Record<CtaIntent, string> = {
  start_free: "cta_clicked_start_free",
  start_audio: "cta_clicked_start_audio",
  earlybird_upgrade: "cta_clicked_earlybird",
  referral_earlybird: "cta_clicked_referral_earlybird",
  demo: "app_handoff_started",
  login: "cta_clicked_login",
  checkout: "cta_clicked_earlybird",
  app_open: "app_handoff_started",
};

function hasMarketingConsentProofs(url: string): boolean {
  try {
    const params = new URL(url).searchParams;
    const metaReady = !params.get("fbclid") || Boolean(params.get("mx_meta_capi_proof"));
    const redditReady = !params.get("rdt_cid") || Boolean(params.get("mx_reddit_capi_proof"));
    return metaReady && redditReady;
  } catch {
    return false;
  }
}

function needsMarketingConsentProof(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.searchParams.get("mx_mc") === "1" &&
      (Boolean(parsed.searchParams.get("fbclid")) ||
        Boolean(parsed.searchParams.get("rdt_cid"))) &&
      !hasMarketingConsentProofs(url)
    );
  } catch {
    return false;
  }
}

export function useTrackedAppUrl(
  href: string,
  options: {
    intent?: CtaIntent;
    offerId?: OfferId;
  } = {},
): string {
  const snapshot = useMarketingAttribution();
  const trialOffer = useValidatedTrialOffer();
  const heldReferralCode = useHeldReferralCode();
  const consentSignature = getAppHandoffConsentSignature();
  const signature = useMemo(
    () =>
      [
        consentSignature,
        snapshot?.mx_visitor_id,
        snapshot?.mx_session_id,
        snapshot?.active_referral?.referral_code,
        snapshot?.first_touch?.source,
        snapshot?.first_touch?.medium,
        snapshot?.first_touch?.campaign,
        snapshot?.first_touch?.content,
        snapshot?.first_touch?.term,
        snapshot?.last_touch?.source,
        snapshot?.last_touch?.medium,
        snapshot?.last_touch?.campaign,
        snapshot?.last_touch?.content,
        snapshot?.last_touch?.term,
        snapshot?.offer_context.offer_id,
        trialOffer?.code,
        heldReferralCode,
        options.intent,
        options.offerId,
      ].join("|"),
    [
      consentSignature,
      snapshot,
      trialOffer?.code,
      heldReferralCode,
      options.intent,
      options.offerId,
    ],
  );
  const [trackedHref, setTrackedHref] = useState(() =>
    buildAppHydrationUrl(href, { intent: options.intent, offerId: options.offerId }),
  );

  useEffect(() => {
    let active = true;
    const baseHref = buildAppUrl(href, {
      intent: options.intent,
      offerId: options.offerId,
      validatedTrialCode: trialOffer?.code,
    });
    setTrackedHref(baseHref);
    void addMetaMarketingConsentProof(baseHref).then((proofHref) => {
      if (active) setTrackedHref(proofHref);
    });
    return () => {
      active = false;
    };
  }, [href, signature, trialOffer?.code, options.intent, options.offerId]);

  return trackedHref;
}

interface TrackedAppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  intent: CtaIntent;
  offerId?: OfferId;
  extraTrackingEvents?: {
    eventName: string;
    properties?: Record<string, unknown>;
  }[];
}

export function TrackedAppLink({
  href,
  intent,
  offerId,
  extraTrackingEvents = [],
  onClick,
  children,
  ...props
}: TrackedAppLinkProps) {
  const trackedHref = useTrackedAppUrl(href, { intent, offerId });
  const trialOffer = useValidatedTrialOffer();
  const navigatingRef = useRef(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Rebuild synchronously from the latest consent and attribution state.
    // This closes the short post-hydration window before useEffect has replaced
    // the SSR-safe fallback href, including for modified/new-tab clicks.
    const navigationHref = buildAppUrl(href, {
      intent,
      offerId,
      validatedTrialCode: trialOffer?.code,
    });
    const eventHref = appHandoffEventHref(navigationHref);
    const immediateHref = reusePrefetchedMetaMarketingConsentProof(
      navigationHref,
      trackedHref,
    );
    event.currentTarget.href = immediateHref;
    const proofHref = hasMarketingConsentProofs(immediateHref)
      ? Promise.resolve(immediateHref)
      : addMetaMarketingConsentProof(navigationHref);

    const ctaEventName = CTA_EVENT_BY_INTENT[intent];
    const ctaProperties = {
      href: eventHref,
      intent,
      offer_id: offerId ?? null,
    };
    const handoffProperties = {
      href: eventHref,
      intent,
      offer_id: offerId ?? (intent === "referral_earlybird" ? OFFER_IDS.earlybird49ReferralPre : null),
    };
    const extraEvents = extraTrackingEvents.map((trackingEvent) => ({
      eventName: trackingEvent.eventName,
      properties: {
        ...trackingEvent.properties,
        ...ctaProperties,
      },
    }));

    const shouldFlushBeforeNavigation =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      (!props.target || props.target === "_self");

    if (!shouldFlushBeforeNavigation) {
      extraEvents.forEach((trackingEvent) => {
        trackLandingEvent(trackingEvent.eventName, trackingEvent.properties);
      });
      if (ctaEventName !== "app_handoff_started") {
        trackLandingEvent(ctaEventName, ctaProperties);
      }
      trackLandingEvent("app_handoff_started", handoffProperties);

      // Modified and target=_blank clicks cannot be delayed with preventDefault
      // unless a browsing context is opened synchronously. Hold that context
      // only when the consent proof is still pending, then navigate it once the
      // bounded proof request has resolved.
      if (needsMarketingConsentProof(immediateHref)) {
        const pendingWindow = window.open("about:blank", "_blank");
        if (pendingWindow) {
          event.preventDefault();
          try {
            pendingWindow.opener = null;
          } catch {
            // Some browsers expose opener as read-only; navigation still proceeds.
          }
          void proofHref.then((resolvedHref) => {
            pendingWindow.location.replace(
              reusePrefetchedMetaMarketingConsentProof(navigationHref, resolvedHref),
            );
          });
        }
      }
      return;
    }

    event.preventDefault();
    if (navigatingRef.current) return;
    navigatingRef.current = true;

    const flushes = [
      ...extraEvents.map((trackingEvent) =>
        flushLandingEvent(trackingEvent.eventName, trackingEvent.properties),
      ),
      ctaEventName !== "app_handoff_started"
        ? flushLandingEvent(ctaEventName, ctaProperties)
        : Promise.resolve(false),
      flushLandingEvent("app_handoff_started", handoffProperties),
    ];

    const flushTimeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 900);
    });

    const flushReady = Promise.race([
      Promise.allSettled(flushes).then(() => undefined),
      flushTimeout,
    ]);
    const ready = Promise.all([flushReady, proofHref]).then(
      ([, resolvedHref]) => resolvedHref,
    );
    void ready.then((resolvedHref) => {
      window.location.assign(
        reusePrefetchedMetaMarketingConsentProof(navigationHref, resolvedHref),
      );
    });
  };

  return (
    <a href={trackedHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
