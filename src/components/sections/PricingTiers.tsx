"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const DEMO_URL = "https://medexia-akt.com/demo";

const ALL_FEATURES = [
  "60hrs audiobook revision bank",
  "Adaptive autopilot engine",
  "Structured examiner explanations",
  "Full RCGP curriculum coverage",
  "On-the-go passive learning",
  "10-question focused sessions",
  "Real-time progress tracking",
  "20,000+ AKT questions",
];

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(167,139,250,.8)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 mt-0.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function PricingTiers() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="mb-10 text-center">
          <div
            className="r-blur text-[13px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
          >
            Founding cohort
          </div>
          <h2
            className="r-up mt-3 text-[36px] md:text-[44px] leading-[1.08]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.04em",
              "--i": 1,
            } as React.CSSProperties}
          >
            One plan. Everything included.
          </h2>
        </div>

        {/* Single founding cohort card */}
        <div className="mx-auto max-w-[480px]">
          <div
            className="r-scale tier-recommended relative rounded-[18px] p-[1px]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <div
              className="rounded-[18px] p-6 md:p-8 h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,19,26,.95), rgba(17,19,26,.82))",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="text-[13px] font-semibold uppercase tracking-wider"
                    style={{ color: "rgba(167,139,250,.85)" }}
                  >
                    April Founding Cohort
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span
                      className="text-[48px] font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      £35
                    </span>
                    <span
                      className="text-[14px]"
                      style={{ color: "rgba(232,236,255,.5)" }}
                    >
                      / 4 months
                    </span>
                  </div>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    background: "rgba(109,106,232,.15)",
                    color: "rgba(167,139,250,.9)",
                    border: "1px solid rgba(109,106,232,.25)",
                  }}
                >
                  Full access
                </span>
              </div>

              <ul className="mt-7 space-y-3">
                {ALL_FEATURES.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px]"
                    style={{ color: "rgba(232,236,255,.78)" }}
                  >
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                className="btn-primary mt-8 block w-full text-center"
                href={DEMO_URL}
              >
                Start free trial
              </a>
              <p
                className="mt-2 text-center text-[12px]"
                style={{ color: "rgba(232,236,255,.42)" }}
              >
                2-day free trial — full access to everything
              </p>
            </div>
          </div>

          {/* Scarcity note below card */}
          <p
            className="r-up mt-5 text-center text-[13px]"
            style={{ color: "rgba(232,236,255,.42)", "--i": 3 } as React.CSSProperties}
          >
            Founding cohort pricing for the April sitting. Standard pricing from October.
          </p>
        </div>
      </div>
    </section>
  );
}
