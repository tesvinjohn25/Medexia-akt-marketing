"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExamCountdown } from "./ExamCountdown";
import { HeroVideo } from "./HeroVideo";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import {
  OFFER_IDS,
  canShowReferralEarlybirdOffer,
  isPreOfferCutover,
} from "@/lib/marketing/attribution";

export function HeroSection() {
  // The keynote cascade is visibility-triggered, not load-triggered:
  // on mobile the headline sits below the video (below the fold), so a
  // load-time animation would finish before anyone saw it.
  const { ref, visible } = useScrollReveal(0.1);
  const marketing = useMarketingAttribution();
  const referralCode = marketing?.active_referral?.referral_code ?? null;
  const isPreCutover = marketing
    ? marketing.offer_context.phase !== "post_2026_07_08"
    : isPreOfferCutover();
  const hasReferralOffer = canShowReferralEarlybirdOffer(referralCode);

  return (
    <section className="relative overflow-hidden">
      {/* Black backdrop that lets the video's own cosmic-dark pixels blend
          straight into the section. Fades to transparent at the bottom so
          the page's global cosmic body-bg bleeds into the next sections. */}
      <div
        className="pointer-events-none absolute inset-0 z-[0]"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, #000 0%, #000 58%, rgba(7,5,14,0.85) 82%, transparent 100%)",
        }}
      />
      {/* Subtle film-grain noise for texture — no purple clouds in the hero */}
      <div className="hero-noise" />

      <div
        className="relative z-[1] container-x pb-12 md:pb-16"
        style={{
          paddingTop:
            "calc(env(safe-area-inset-top, 0px) + clamp(48px, 5vw, 72px))",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Video follows the CTA on mobile so the first action stays above
              the fold; it remains on the right on desktop. Books dissolving
              into headphones = notes → audio transformation. */}
          <div
            className="hero-enter order-2 mt-7 flex justify-center md:order-2 md:mt-0 md:flex-1"
            style={{ "--he": 0 } as React.CSSProperties}
          >
            <div className="parallax-drift relative w-full max-w-[520px] md:max-w-[560px] lg:max-w-[620px]">
              {/* Soft aura bleeds into the black backdrop */}
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(236,72,153,.18) 0%, rgba(167,139,250,.10) 45%, transparent 80%)",
                  filter: "blur(34px)",
                  transform: "scale(1.2)",
                }}
              />
              <HeroVideo />
            </div>
          </div>

          {/* Text and the free audio CTA lead on mobile and desktop. */}
          <div
            ref={ref}
            className={`order-1 max-w-[580px] reveal-group md:order-1 md:flex-1 ${
              visible ? "is-visible" : ""
            }`}
          >
            {/* Badges */}
            <div
              className="r-up flex items-center gap-2 flex-wrap"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              <div
                className="inline-flex items-center rounded-md px-2 py-[3px]"
                style={{
                  background: "rgba(96,165,250,.08)",
                  border: "1px solid rgba(96,165,250,.18)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-bold"
                  style={{ color: "rgba(96,165,250,.9)" }}
                >
                  MRCGP AKT
                </span>
              </div>
              <span
                className="text-[10px] tracking-[0.06em] font-medium"
                style={{ color: "rgba(232,236,255,.35)" }}
              >
                &middot;
              </span>
              <span
                className="inline-flex items-center rounded-md px-2 py-[3px]"
                style={{
                  background: "rgba(52,211,153,.08)",
                  border: "1px solid rgba(52,211,153,.18)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.14em] uppercase font-bold"
                  style={{ color: "rgba(52,211,153,.85)" }}
                >
                  Questions &amp; mocks free forever
                </span>
              </span>
              <span
                className="inline-flex items-center rounded-md px-2 py-[3px]"
                style={{
                  background: "rgba(167,139,250,.08)",
                  border: "1px solid rgba(167,139,250,.18)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.14em] uppercase font-bold"
                  style={{ color: "rgba(197,170,255,.9)" }}
                >
                  {isPreCutover
                    ? "Full audio free until 8 July"
                    : "First 2 hours of audio free"}
                </span>
              </span>
            </div>

            {hasReferralOffer && (
              <div
                className="r-up mt-4 max-w-[520px] rounded-xl px-4 py-3 text-[13px] md:text-[14px] font-semibold"
                style={{
                  "--i": 0.6,
                  background: "rgba(52,211,153,.10)",
                  border: "1px solid rgba(52,211,153,.26)",
                  color: "rgba(232,236,255,.88)",
                } as React.CSSProperties}
              >
                You&rsquo;ve been invited: Early Access is &pound;49 instead of
                &pound;59 before 8 July through this referral link.
              </div>
            )}

            {/* Keynote cascade: line one lands word by word, then the
                audio line arrives whole with the light-sweep. */}
            <h1
              className="mt-4 text-[34px] md:text-[48px] lg:text-[56px] leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              {["The", "whole", "AKT."].map((word, i) => (
                <span
                  key={word}
                  className="r-blur inline-block"
                  style={{
                    color: "rgba(232,236,255,.62)",
                    "--i": 1 + i * 1.3,
                  } as React.CSSProperties}
                >
                  {word}
                  {i < 2 ? " " : ""}
                </span>
              ))}
              <br />
              <span
                className="r-blur inline-block"
                style={{ "--i": 5.2 } as React.CSSProperties}
              >
                <span className="text-shine">In 90 hours of audio.</span>
              </span>
            </h1>

            {/* Short, outcome-first subhead keeps the free audio CTA above the
                mobile fold while preserving the key trust terms. */}
            <p
              className="r-up mt-4 text-[15px] md:text-[17px] leading-[1.55] max-w-[480px]"
              style={{ color: "rgba(232,236,255,.78)", "--i": 6.5 } as React.CSSProperties}
            >
              {isPreCutover
                ? "Turn commutes, walks and tired evenings into AKT revision. The whole product is free to try until 8 July."
                : "Turn commutes, walks and tired evenings into AKT revision. Try 2 hours of audio free, with no card. Questions and mocks stay free."}
            </p>

            {/* CTA */}
            <div
              className="r-scale mt-5 flex flex-wrap gap-3"
              style={{ "--i": 7.4 } as React.CSSProperties}
            >
              <TrackedAppLink
                data-hero-cta
                className="btn-primary inline-block text-[16px]"
                href="/join/audio"
                intent="start_audio"
                offerId={
                  isPreCutover
                    ? OFFER_IDS.freePre
                    : OFFER_IDS.freePost
                }
              >
                Try 2 hours of AKT audio free &rarr;
              </TrackedAppLink>
              {isPreCutover ? (
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
              ) : (
                <a
                  className="inline-flex items-center justify-center rounded-[14px] px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-white/[.08]"
                  href="/free-akt-questions"
                  style={{
                    color: "var(--fg-high)",
                    background: "rgba(255,255,255,.045)",
                    border: "1px solid rgba(255,255,255,.10)",
                  }}
                >
                  Explore free questions
                </a>
              )}
            </div>

            {/* Exam timing supports the decision but should not displace the
                primary experience CTA below the fold on small screens. */}
            <div
              className="r-up mt-5 max-w-[340px]"
              style={{ "--i": 7.8 } as React.CSSProperties}
            >
              <ExamCountdown variant="hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
