"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const FEATURES = [
  {
    text: "Deep explanations that teach like a senior GP",
    accent: "rgba(96,165,250,.7)",
  },
  {
    text: "50+ hours of audio revision across all 32 AKT topics",
    accent: "rgba(236,72,153,.7)",
  },
  {
    text: "Adaptive algorithm that finds and targets your weak spots",
    accent: "rgba(167,139,250,.7)",
  },
  {
    text: "Generate unlimited mock exams (40, 80, or 160 questions)",
    accent: "rgba(52,211,153,.7)",
  },
  {
    text: "Detailed debrief analysis that goes beyond right and wrong",
    accent: "rgba(251,191,36,.7)",
  },
  {
    text: "AI Supervisor for on-demand clinical reasoning help",
    accent: "rgba(109,106,232,.7)",
  },
  {
    text: "Auto-generated Learning Points from wrong answers",
    accent: "rgba(155,107,255,.7)",
  },
  {
    text: "20,000+ questions covering the full RCGP AKT curriculum",
    accent: "rgba(232,236,255,.35)",
  },
];

export function WhatYouGet() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            className="r-blur text-[28px] md:text-[36px] font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
              "--i": 0,
            } as React.CSSProperties}
          >
            Everything. Free for April &amp; July.
          </h2>
          <p
            className="r-up mt-3 text-[15px] md:text-[17px]"
            style={{
              color: "var(--fg-mid)",
              "--i": 1,
            } as React.CSSProperties}
          >
            No trial. No credit card. No catch.
          </p>
        </div>

        <ul className="mx-auto mt-8 max-w-[580px] space-y-0">
          {FEATURES.map((f, i) => (
            <li
              key={i}
              className="r-up flex items-start gap-3 py-3"
              style={{
                borderBottom: "1px solid var(--divider)",
                "--i": i + 2,
              } as React.CSSProperties}
            >
              <span
                className="mt-1 flex-shrink-0 text-[15px] font-bold"
                style={{ color: f.accent }}
              >
                &#10003;
              </span>
              <span
                className="text-[14px] md:text-[15px] leading-[1.6]"
                style={{ color: "var(--fg-mid)" }}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        <div
          className="r-scale mt-8 text-center"
          style={{ "--i": FEATURES.length + 2 } as React.CSSProperties}
        >
          <a className="btn-primary inline-block" href="https://app.medexia-akt.com">
            Start revising free &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
