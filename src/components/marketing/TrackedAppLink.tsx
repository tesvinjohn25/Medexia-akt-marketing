"use client";

import {
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";
import { buildAppUrl } from "@/lib/marketing/url";
import { trackLandingEvent } from "@/lib/marketing/events";
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
        snapshot?.referral?.referral_code,
        snapshot?.offer_context.offer_id,
        options.intent,
        options.offerId,
      ].join("|"),
    [snapshot, options.intent, options.offerId],
  );
  const [trackedHref, setTrackedHref] = useState(() =>
    buildAppUrl(href, { intent: options.intent, offerId: options.offerId }),
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

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const ctaEventName = CTA_EVENT_BY_INTENT[intent];
    if (ctaEventName !== "app_handoff_started") {
      trackLandingEvent(ctaEventName, {
        href: trackedHref,
        intent,
        offer_id: offerId ?? null,
      });
    }
    trackLandingEvent("app_handoff_started", {
      href: trackedHref,
      intent,
      offer_id: offerId ?? (intent === "referral_earlybird" ? OFFER_IDS.earlybird49ReferralPre : null),
    });
    onClick?.(event);
  };

  return (
    <a href={trackedHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
