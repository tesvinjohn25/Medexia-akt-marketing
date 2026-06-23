"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExamCountdown } from "./ExamCountdown";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import { OFFER_IDS, canShowReferralEarlybirdOffer } from "@/lib/marketing/attribution";

export function FinalCTA() {
  const { ref, visible } = useScrollReveal();
  const marketing = useMarketingAttribution();
  const referralCode = marketing?.referral?.referral_code ?? null;
  const isPreCutover = marketing?.offer_context.phase !== "post_2026_07_08";
  const hasReferralOffer = canShowReferralEarlybirdOffer(referralCode);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle mesh background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 400px at 50% 50%, rgba(109,106,232,.06), transparent 70%), radial-gradient(500px 350px at 60% 60%, rgba(155,107,255,.05), transparent 65%)",
        }}
        aria-hidden
      />

      <div
        ref={ref}
        className={`container-x relative text-center reveal-group ${visible ? "is-visible" : ""}`}
      >
        {/* Countdown */}
        <div
          className="r-up mx-auto max-w-[340px]"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <ExamCountdown variant="compact" />
        </div>

        <h2
          className="r-blur mt-6 text-[32px] md:text-[48px] leading-[1.08]"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.04em",
            "--i": 1,
          } as React.CSSProperties}
        >
          Every day counts.
        </h2>

        <p
          className="r-up mx-auto mt-4 max-w-[480px] text-[15px] md:text-[17px] leading-[1.6]"
          style={{ color: "rgba(232,236,255,.68)", "--i": 2 } as React.CSSProperties}
        >
          {isPreCutover
            ? hasReferralOffer
              ? "Everything is free until 8 July. Your referral link unlocks Early Access for £49 instead of £59 before 8 July."
              : "Everything is free until 8 July. If the audio helps, lock in 4 months from 8 July for £59 before it becomes £79."
            : "Questions are free. Your first 2 hours of AKT audio are free. Full 4-month audio access is £79."}
        </p>

        <div
          className="r-scale mt-8 flex flex-wrap justify-center gap-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <TrackedAppLink
            className="btn-primary inline-block"
            href="/join/free"
            intent="start_free"
            offerId={isPreCutover ? OFFER_IDS.freePre : OFFER_IDS.freePost}
          >
            Start free &rarr;
          </TrackedAppLink>
          {isPreCutover && (
            <TrackedAppLink
              className="inline-flex items-center justify-center rounded-[14px] px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-white/[.08]"
              href="/join/early-access"
              intent={hasReferralOffer ? "referral_earlybird" : "earlybird_upgrade"}
              offerId={
                hasReferralOffer
                  ? OFFER_IDS.earlybird49ReferralPre
                  : OFFER_IDS.earlybird59Pre
              }
              style={{
                color: "var(--fg-high)",
                background: "rgba(255,255,255,.045)",
                border: "1px solid rgba(255,255,255,.10)",
              }}
            >
              Lock in {hasReferralOffer ? "£49" : "£59"} Early Access
            </TrackedAppLink>
          )}
        </div>
      </div>
    </section>
  );
}
