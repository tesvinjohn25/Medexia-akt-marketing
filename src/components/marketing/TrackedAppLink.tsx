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
    setTrackedHref(buildAppUrl(href, {
      intent: options.intent,
      offerId: options.offerId,
      validatedTrialCode: trialOffer?.code,
    }));
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
    event.currentTarget.href = navigationHref;

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

    const timeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 700);
    });

    void Promise.race([Promise.allSettled(flushes), timeout]).finally(() => {
      window.location.assign(navigationHref);
    });
  };

  return (
    <a href={trackedHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
