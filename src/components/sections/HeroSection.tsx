"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExamCountdown } from "./ExamCountdown";
import { HeroVideo } from "./HeroVideo";

export function HeroSection() {
  // The keynote cascade is visibility-triggered, not load-triggered:
  // on mobile the headline sits below the video (below the fold), so a
  // load-time animation would finish before anyone saw it.
  const { ref, visible } = useScrollReveal(0.1);

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
          {/* Video — ABOVE text on mobile (first thing users see), right on desktop.
              Books dissolving into headphones = notes → audio transformation.
              Wrapped in HeroVideo (client) for loop-reliability handlers. */}
          <div
            className="hero-enter order-1 md:order-2 md:flex-1 flex justify-center mb-6 md:mb-0"
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

          {/* Text — BELOW video on mobile, left on desktop */}
          <div
            ref={ref}
            className={`order-2 md:order-1 md:flex-1 max-w-[580px] reveal-group ${
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
                  Free until 8 July 2026
                </span>
              </span>
            </div>

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

            {/* Two-paragraph subhead — audio + algorithm */}
            <p
              className="r-up mt-4 text-[15px] md:text-[17px] leading-[1.55] max-w-[480px]"
              style={{ color: "rgba(232,236,255,.78)", "--i": 6.5 } as React.CSSProperties}
            >
              Audio-first revision covering the full MRCGP AKT syllabus. Use
              everything free until 8 July 2026: audio, questions, statistics,
              stats videos and Dermatology Navigator.
            </p>
            <p
              className="r-up mt-3 text-[15px] md:text-[17px] leading-[1.55] max-w-[480px]"
              style={{ color: "rgba(232,236,255,.6)", "--i": 7 } as React.CSSProperties}
            >
              After that, questions stay free with 2 hours of audio. Lock in
              Early Access for £59 before your paid audio period starts on 8
              July.
            </p>

            {/* Countdown */}
            <div
              className="r-up mt-5 max-w-[340px]"
              style={{ "--i": 7.8 } as React.CSSProperties}
            >
              <ExamCountdown variant="hero" />
            </div>

            {/* CTA */}
            <div
              className="r-scale mt-6"
              style={{ "--i": 8.4 } as React.CSSProperties}
            >
              <a
                data-hero-cta
                className="btn-primary inline-block text-[16px]"
                href="https://app.medexia-akt.com"
              >
                Start free &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
