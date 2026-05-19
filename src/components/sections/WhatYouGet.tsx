"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SharePrompt } from "./SharePrompt";

const FEATURES = [
  {
    text: "Deep explanations that teach like a senior GP",
    accent: "rgba(96,165,250,.7)",
  },
  {
    text: "90+ hours of audio revision across all 32 AKT topics with full access",
    accent: "rgba(236,72,153,.7)",
  },
  {
    text: "Adaptive algorithm that finds and targets your weak spots",
    accent: "rgba(167,139,250,.7)",
  },
  {
    text: "Generate mock exams (40, 80, or 160 questions)",
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
    text: "21,000+ syllabus-mapped questions included free",
    accent: "rgba(232,236,255,.35)",
  },
];

export function WhatYouGet() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Visual break: gradient shift to distinguish from FAQ above */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 400px at 50% 30%, rgba(109,106,232,.06), transparent 70%), radial-gradient(400px 300px at 60% 70%, rgba(155,107,255,.04), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="container-x mb-12">
        <div
          className="mx-auto max-w-[200px] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,.25), transparent)" }}
        />
      </div>
      <div
        ref={ref}
        className={`container-x relative reveal-group ${visible ? "is-visible" : ""}`}
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
            Free Practice now. Early Access £59.
          </h2>
          <p
            className="r-up mt-3 text-[15px] md:text-[17px]"
            style={{
              color: "var(--fg-mid)",
              "--i": 1,
            } as React.CSSProperties}
          >
            The whole AKT in 90 hours. Questions stay free.
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
            Start free &rarr;
          </a>
        </div>

        <SharePrompt />
      </div>
    </section>
  );
}
