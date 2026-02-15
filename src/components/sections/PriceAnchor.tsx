"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const DEMO_URL = "https://medexia-akt.com/demo";

export function PriceAnchor() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 400px at 50% 30%, rgba(109,106,232,.08), transparent 70%)",
        }}
        aria-hidden
      />

      <div
        ref={ref}
        className={`container-x relative reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Price */}
          <div className="text-center md:text-right">
            <div
              className="r-up text-[13px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
            >
              You read that right.
            </div>

            <div
              className="r-blur price-display mt-4"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              £35
            </div>
          </div>

          {/* Right: Copy */}
          <div className="max-w-[520px] text-center md:text-left">
            <p
              className="r-right text-[20px] md:text-[24px] leading-[1.35] font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
                "--i": 2,
              } as React.CSSProperties}
            >
              60 hours of audio revision. An engine that knows your weak spots.
              Examiner-level explanations for every question. Four months. £35.
            </p>

            <p
              className="r-up mt-4 text-[15px] md:text-[16px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)", "--i": 3 } as React.CSSProperties}
            >
              Other platforms charge £100+ for a question bank. We&apos;re giving our
              founding cohort the full system — questions, audiobooks, adaptive
              engine, everything — for £35. This price won&apos;t last.
            </p>

            <p
              className="r-up mt-3 text-[13px] italic"
              style={{ color: "rgba(167,139,250,.6)", "--i": 4 } as React.CSSProperties}
            >
              Founding access for the April sitting. Standard pricing begins after.
            </p>

            <div
              className="r-scale mt-7 flex flex-wrap items-center gap-3 justify-center md:justify-start"
              style={{ "--i": 5 } as React.CSSProperties}
            >
              <a className="btn-primary" href={DEMO_URL}>
                Start your free trial
              </a>
            </div>

            <p
              className="r-up mt-3 text-[13px]"
              style={{ color: "rgba(232,236,255,.42)", "--i": 6 } as React.CSSProperties}
            >
              2-day free trial. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
