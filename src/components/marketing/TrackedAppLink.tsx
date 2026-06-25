"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";
import { buildAppFallbackUrl, buildAppUrl } from "@/lib/marketing/url";
import { flushLandingEvent, trackLandingEvent } from "@/lib/marketing/events";
import {
  OFFER_IDS,
  type CtaIntent,
  type OfferId,
} from "@/lib/marketing/attribution";
import { useMarketingAttribution } from "./MarketingAttributionProvider";

const CTA_EVENT_BY_INTENT: Record<CtaIntent, string> = {
  start_free: "cta_clicked_start_free",
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
  const signature = useMemo(
    () =>
      [
        snapshot?.mx_visitor_id,
        snapshot?.mx_session_id,
        snapshot?.active_referral?.referral_code,
        snapshot?.offer_context.offer_id,
        options.intent,
        options.offerId,
      ].join("|"),
    [snapshot, options.intent, options.offerId],
  );
  const [trackedHref, setTrackedHref] = useState(() =>
    buildAppFallbackUrl(href, { intent: options.intent, offerId: options.offerId }),
  );

  useEffect(() => {
    setTrackedHref(buildAppUrl(href, { intent: options.intent, offerId: options.offerId }));
  }, [href, signature, options.intent, options.offerId]);

  return trackedHref;
}

interface TrackedAppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  intent: CtaIntent;
  offerId?: OfferId;
}

export function TrackedAppLink({
  href,
  intent,
  offerId,
  onClick,
  children,
  ...props
}: TrackedAppLinkProps) {
  const trackedHref = useTrackedAppUrl(href, { intent, offerId });
  const navigatingRef = useRef(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const ctaEventName = CTA_EVENT_BY_INTENT[intent];
    const ctaProperties = {
      href: trackedHref,
      intent,
      offer_id: offerId ?? null,
    };
    const handoffProperties = {
      href: trackedHref,
      intent,
      offer_id: offerId ?? (intent === "referral_earlybird" ? OFFER_IDS.earlybird49ReferralPre : null),
    };

    const shouldFlushBeforeNavigation =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      (!props.target || props.target === "_self");

    if (!shouldFlushBeforeNavigation) {
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
      ctaEventName !== "app_handoff_started"
        ? flushLandingEvent(ctaEventName, ctaProperties)
        : Promise.resolve(false),
      flushLandingEvent("app_handoff_started", handoffProperties),
    ];

    const timeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 700);
    });

    void Promise.race([Promise.allSettled(flushes), timeout]).finally(() => {
      window.location.assign(trackedHref);
    });
  };

  return (
    <a href={trackedHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
