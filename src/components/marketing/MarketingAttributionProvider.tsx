"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Analytics } from "@vercel/analytics/next";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import {
  canUseAnalytics,
  CONSENT_CHANGED_EVENT,
  getStoredConsent,
  type ConsentRecord,
} from "@/lib/consent/consent";
import {
  initMarketingAttribution,
  getMarketingSnapshot,
  type MarketingSnapshot,
} from "@/lib/marketing/attribution";
import { maybeLoadMarketingPixels } from "@/lib/marketing/pixels";
import { trackLandingEvent } from "@/lib/marketing/events";

const MarketingContext = createContext<MarketingSnapshot | null>(null);

export function MarketingAttributionProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<MarketingSnapshot | null>(null);
  const [consent, setConsent] = useState<ConsentRecord | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    setSnapshot(getMarketingSnapshot());

    const onConsentChanged = () => {
      setConsent(getStoredConsent());
    };

    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
  }, []);

  useEffect(() => {
    const analyticsAllowed = canUseAnalytics();
    const next = initMarketingAttribution();
    setSnapshot(next);

    if (analyticsAllowed) {
      trackLandingEvent("landing_page_viewed");
      trackLandingEvent("landing_offer_viewed", {
        offer_id: next.offer_context.offer_id,
        phase: next.offer_context.phase,
      });
      if (next.active_referral?.referral_code) {
        trackLandingEvent("referral_landing_viewed", {
          referral_code: next.active_referral.referral_code,
        });
      }
    }

    // Always call on a consent change. The loader itself still refuses to add
    // scripts before marketing consent, while an already-loaded Google tag can
    // receive a later denied update when consent is withdrawn.
    maybeLoadMarketingPixels();
  }, [consent?.updatedAt]);

  const value = useMemo(() => snapshot, [snapshot]);

  return (
    <MarketingContext.Provider value={value}>
      {children}
      <ConsentBanner />
      {canUseAnalytics() ? <Analytics /> : null}
    </MarketingContext.Provider>
  );
}

export function useMarketingAttribution(): MarketingSnapshot | null {
  return useContext(MarketingContext);
}
