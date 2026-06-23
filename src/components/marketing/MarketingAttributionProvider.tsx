"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initMarketingAttribution,
  getMarketingSnapshot,
  type MarketingSnapshot,
} from "@/lib/marketing/attribution";
import { maybeLoadMarketingPixels } from "@/lib/marketing/pixels";
import { trackLandingEvent } from "@/lib/marketing/events";

const MarketingContext = createContext<MarketingSnapshot | null>(null);
let didInit = false;

export function MarketingAttributionProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<MarketingSnapshot | null>(null);

  useEffect(() => {
    const next = didInit ? getMarketingSnapshot() : initMarketingAttribution();
    didInit = true;
    setSnapshot(next);

    trackLandingEvent("landing_page_viewed");
    trackLandingEvent("landing_offer_viewed", {
      offer_id: next.offer_context.offer_id,
      phase: next.offer_context.phase,
    });
    if (next.referral?.referral_code) {
      trackLandingEvent("referral_landing_viewed", {
        referral_code: next.referral.referral_code,
      });
    }
    maybeLoadMarketingPixels();
  }, []);

  const value = useMemo(() => snapshot, [snapshot]);

  return <MarketingContext.Provider value={value}>{children}</MarketingContext.Provider>;
}

export function useMarketingAttribution(): MarketingSnapshot | null {
  return useContext(MarketingContext);
}

