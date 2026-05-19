"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const SIGNUP_URL = "https://app.medexia-akt.com";
const ACCESS_URL = "https://app.medexia-akt.com/buy";

const PLANS = [
  {
    title: "Free Practice",
    price: "£0",
    priceDetail: "",
    subtitle: "For question practice and starting your revision.",
    features: [
      "21,000+ AKT questions",
      "Deep structured explanations",
      "Mock exams and basic practice",
      "2 hours of audiobook listening",
    ],
    cta: "Start free",
    href: SIGNUP_URL,
    highlighted: false,
    tone: "green",
  },
  {
    title: "Early Access",
    price: "£59",
    priceDetail: "for 4 months",
    subtitle: "4 months full audio access from 8 July.",
    features: [
      "Full 90+ hour AKT audiobook library",
      "Access starts from 8 July 2026",
      "Save £20 before standard pricing begins",
      "Future premium audio upgrades included",
    ],
    cta: "Lock in early access",
    href: ACCESS_URL,
    highlighted: true,
    tone: "violet",
  },
  {
    title: "Full Audio Access",
    price: "£79",
    priceDetail: "for 4 months",
    subtitle: "4 months full audiobook access.",
    features: [
      "Full 90+ hour AKT audiobook library",
      "Built for commutes, walks, childcare and low-energy revision",
      "4 months access",
      "Questions remain free",
    ],
    cta: "Get full audio access",
    href: ACCESS_URL,
    highlighted: false,
    tone: "blue",
  },
] as const;

function accentFor(tone: (typeof PLANS)[number]["tone"]) {
  if (tone === "green") return "rgba(52,211,153,.88)";
  if (tone === "blue") return "rgba(96,165,250,.9)";
  return "rgba(167,139,250,.95)";
}

export function PricingSection() {
  const { ref, visible } = useScrollReveal(0.18);

  return (
    <section
      id="pricing"
      className="section-padding relative scroll-mt-[92px] overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-8 h-[460px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side at 50% 20%, rgba(155,107,255,.16), transparent 72%)",
          filter: "blur(22px)",
        }}
      />

      <div
        ref={ref}
        className={`container-x relative reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-[780px] text-center">
          <div
            className="r-blur text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
          >
            Clear access. No paid question bank.
          </div>
          <h2
            id="pricing-heading"
            className="r-up mt-3 text-[30px] md:text-[46px] leading-[1.06]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.04em",
              "--i": 1,
            } as React.CSSProperties}
          >
            Questions stay free. Full AKT audio access starts from £59.
          </h2>
          <p
            className="r-up mx-auto mt-4 max-w-[650px] text-[15px] md:text-[17px] leading-[1.65]"
            style={{ color: "rgba(232,236,255,.68)", "--i": 2 } as React.CSSProperties}
          >
            Practise with 21,000+ AKT questions for free. Upgrade when you want
            the full 90+ hour audiobook library built for commutes, walks,
            childcare and low-energy revision days.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)_minmax(0,1fr)] lg:items-stretch">
          {PLANS.map((plan, i) => {
            const accent = accentFor(plan.tone);
            return (
              <article
                key={plan.title}
                className={`r-up card-shimmer relative flex min-h-full flex-col overflow-hidden rounded-[20px] p-5 md:p-6 ${
                  plan.highlighted ? "lg:-mt-3 lg:pb-7" : ""
                }`}
                style={{
                  background: plan.highlighted
                    ? "linear-gradient(160deg, rgba(27,23,43,.96), rgba(17,19,26,.84) 48%, rgba(12,14,22,.88))"
                    : "linear-gradient(180deg, rgba(17,19,26,.90), rgba(17,19,26,.64))",
                  border: plan.highlighted
                    ? "1px solid rgba(167,139,250,.46)"
                    : "1px solid rgba(255,255,255,.08)",
                  boxShadow: plan.highlighted
                    ? "0 36px 110px rgba(109,106,232,.26), inset 0 1px 0 rgba(255,255,255,.08)"
                    : "0 24px 80px rgba(0,0,0,.30)",
                  "--i": 3 + i,
                } as React.CSSProperties}
              >
                {plan.highlighted && (
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    aria-hidden
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(197,170,255,.85), transparent)",
                    }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className="text-[18px] md:text-[20px] font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {plan.title}
                    </h3>
                    <p
                      className="mt-2 text-[13px] md:text-[14px] leading-[1.55]"
                      style={{ color: "rgba(232,236,255,.58)" }}
                    >
                      {plan.subtitle}
                    </p>
                  </div>
                  <div
                    className="mt-1 h-2.5 w-2.5 rounded-full"
                    aria-hidden
                    style={{
                      background: accent,
                      boxShadow: `0 0 20px ${accent}`,
                    }}
                  />
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <div
                    className="tabular-nums text-[46px] md:text-[56px] leading-none font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.045em",
                    }}
                  >
                    {plan.price}
                  </div>
                  {plan.priceDetail && (
                    <div
                      className="pb-1.5 text-[12px] md:text-[13px] font-semibold"
                      style={{ color: "rgba(232,236,255,.46)" }}
                    >
                      {plan.priceDetail}
                    </div>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: accent }}
                        aria-hidden
                      />
                      <span
                        className="text-[13px] md:text-[14px] leading-[1.55]"
                        style={{ color: "rgba(232,236,255,.76)" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <a
                    className={
                      plan.highlighted
                        ? "btn-primary block text-center text-[14px]"
                        : "block rounded-[14px] px-4 py-3 text-center text-[14px] font-semibold transition-colors hover:bg-white/[.08]"
                    }
                    href={plan.href}
                    style={
                      plan.highlighted
                        ? undefined
                        : {
                            color: "var(--fg-high)",
                            background: "rgba(255,255,255,.045)",
                            border: "1px solid rgba(255,255,255,.10)",
                          }
                    }
                  >
                    {plan.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p
          className="r-up mx-auto mt-6 max-w-[720px] text-center text-[13px] md:text-[14px] leading-[1.6]"
          style={{ color: "rgba(232,236,255,.55)", "--i": 6 } as React.CSSProperties}
        >
          Available before 8 July 2026. Standard price after 8 July: £79.
          Questions remain free.
        </p>
      </div>
    </section>
  );
}
