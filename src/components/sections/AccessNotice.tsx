"use client";

import { useEffect, useState } from "react";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import { canShowReferralEarlybirdOffer } from "@/lib/marketing/attribution";

const AUDIO_ACCESS_STANDARD_START = new Date("2026-07-08T00:00:00+01:00");

export function AccessNotice() {
  const [standardPricingStarted, setStandardPricingStarted] = useState(false);
  const marketing = useMarketingAttribution();
  const referralCode = marketing?.referral?.referral_code ?? null;
  const hasReferralOffer = canShowReferralEarlybirdOffer(referralCode);

  useEffect(() => {
    setStandardPricingStarted(Date.now() >= AUDIO_ACCESS_STANDARD_START.getTime());
  }, []);

  return (
    <div
      className="container-x"
      style={{ paddingTop: "clamp(24px, 4vw, 40px)" }}
    >
      <div
        className="rounded-[18px] px-4 py-4 md:px-6 md:py-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(17,19,26,.92), rgba(17,19,26,.68))",
          border: "1px solid rgba(255,255,255,.10)",
          boxShadow: "0 22px 70px rgba(0,0,0,.28)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div
              className="text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{ color: "rgba(52,211,153,.86)" }}
            >
              {standardPricingStarted
                ? "Questions, mocks and explanations stay free"
                : hasReferralOffer
                  ? "Referral Early Access before 8 July"
                  : "Practice stays free; full audio free until 8 July"}
            </div>
            <p
              className="mt-1 text-[14px] md:text-[15px] leading-[1.55]"
              style={{ color: "rgba(232,236,255,.76)" }}
            >
              {standardPricingStarted
                ? "Free Practice includes syllabus-mapped questions, timed mocks, structured explanations and a starter audio allowance. Full audio and premium revision tools are £79 for 4 months."
                : hasReferralOffer
                  ? "You came through a referral link. The whole product is free until 8 July; if the audio helps, this referral can lock Early Access at £49 instead of £59 before 8 July."
                  : "The whole product is free until 8 July. After that, questions, timed mocks and structured explanations remain free; full audio access is £59 Early Access before 8 July, then £79 for 4 months."}
            </p>
          </div>
          <a
            href="#pricing"
            className="inline-flex shrink-0 items-center justify-center rounded-[14px] px-4 py-3 text-[13px] font-semibold transition-colors hover:bg-white/[.08]"
            style={{
              color: "var(--fg-high)",
              background: "rgba(255,255,255,.045)",
              border: "1px solid rgba(255,255,255,.10)",
            }}
          >
            View pricing
          </a>
        </div>
      </div>
    </div>
  );
}
