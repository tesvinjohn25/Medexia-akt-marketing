"use client";

import { ExamCountdown } from "./ExamCountdown";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Cosmic nebula background */}
      <div className="hero-nebula" aria-hidden />
      <div className="hero-stars" aria-hidden />
      <div className="hero-noise" />

      {/* Bottom gradient for readability */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(11,13,18,.95), rgba(11,13,18,.55) 45%, rgba(11,13,18,0) 100%)",
        }}
        aria-hidden
      />

      <div
        className="container-x relative z-10 w-full"
        style={{
          paddingTop: "max(30vh, 200px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 60px)",
        }}
      >
        <div className="max-w-[600px]">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
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
                Free for April &amp; July
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mt-4 text-[32px] md:text-[48px] leading-[1.06]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.04em",
              textShadow: "0 22px 70px rgba(0,0,0,.7)",
            }}
          >
            Like a senior GP
            <br />
            sat next to you.
          </h1>

          {/* Subtext */}
          <p
            className="mt-3 text-[15px] md:text-[18px] leading-[1.55] max-w-[480px]"
            style={{ color: "rgba(232,236,255,.72)" }}
          >
            AKT revision that adapts to your weak spots. Deep explanations that
            teach &mdash; not just tell you the answer. 50+ hours of audio you
            can take anywhere.
          </p>

          {/* Countdown */}
          <div className="mt-5 max-w-[340px]">
            <ExamCountdown variant="hero" />
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a
              data-hero-cta
              className="btn-primary inline-block text-[16px]"
              href="https://app.medexia-akt.com"
            >
              Start revising free &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
