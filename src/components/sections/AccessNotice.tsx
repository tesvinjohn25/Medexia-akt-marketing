"use client";

import { useEffect, useState } from "react";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";

const AUDIO_ACCESS_STANDARD_START = new Date("2026-07-08T00:00:00+01:00");

export function AccessNotice() {
  const [standardPricingStarted, setStandardPricingStarted] = useState(false);
  const marketing = useMarketingAttribution();
  const referralCode = marketing?.referral?.referral_code ?? null;

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
                ? "Questions and 2h audio remain free"
                : referralCode
                  ? "Referral Early Access before 8 July"
                  : "Everything free until 8 July 2026"}
            </div>
            <p
              className="mt-1 text-[14px] md:text-[15px] leading-[1.55]"
              style={{ color: "rgba(232,236,255,.76)" }}
            >
              {standardPricingStarted
                ? "Free Practice includes syllabus-mapped questions and 2 hours of audio. Full audio and premium revision tools are £79 for 4 months."
                : referralCode
                  ? "You came through a referral link. Everything is free until 8 July; if the audio helps, this referral can lock Early Access at £49 instead of £59 before 8 July."
                  : "Everything is free until 8 July. Try AKT Navigator now. If the audio helps, lock in 4 months from 8 July for £59 before it becomes £79."}
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
