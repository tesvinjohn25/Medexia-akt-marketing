"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const DEMO_URL = "https://app.medexia-akt.com/demo";

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

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function PricingTiers() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow for urgency feel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 500px at 50% 20%, rgba(109,106,232,.10), transparent 70%), radial-gradient(500px 400px at 30% 80%, rgba(236,72,153,.06), transparent 60%)",
        }}
        aria-hidden
      />

      <div
        ref={ref}
        className={`container-x relative reveal-group ${visible ? "is-visible" : ""}`}
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
            className="r-scale relative rounded-[20px] p-[2px]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-[20px] pricing-border-glow"
              aria-hidden
            />

            <div
              className="relative rounded-[19px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,19,26,.97), rgba(17,19,26,.88))",
              }}
            >
              {/* Urgency banner at top */}
              <div
                className="relative px-6 py-3 text-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(109,106,232,.18), rgba(155,107,255,.22), rgba(236,72,153,.15))",
                  borderBottom: "1px solid rgba(167,139,250,.15)",
                }}
              >
                {/* Shimmer sweep */}
                <div className="pricing-shimmer" aria-hidden />

                <div className="flex items-center justify-center gap-2">
                  <span style={{ color: "rgba(251,191,36,.85)" }}>
                    <ClockIcon />
                  </span>
                  <span
                    className="text-[11px] tracking-[0.18em] uppercase font-bold"
                    style={{ color: "rgba(251,191,36,.9)" }}
                  >
                    Early access — limited time pricing
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="text-[13px] font-semibold uppercase tracking-wider"
                      style={{ color: "rgba(167,139,250,.85)" }}
                    >
                      April &amp; July Founding Cohort
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
                  className="btn-primary mt-8 block w-full text-center pricing-cta-glow"
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
          </div>

          {/* Urgency scarcity note */}
          <div
            className="r-up mt-6 text-center"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: "rgba(251,191,36,.06)",
                border: "1px solid rgba(251,191,36,.15)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full pricing-dot-pulse"
                style={{ background: "rgba(251,191,36,.8)" }}
              />
              <span
                className="text-[12px] font-medium"
                style={{ color: "rgba(251,191,36,.75)" }}
              >
                Founding price for the April &amp; July sittings only. Standard pricing from October.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
