"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const SIGNUP_URL = "https://app.medexia-akt.com";
const ACCESS_URL = "https://app.medexia-akt.com/buy";

const PLANS = [
  {
    title: "Free Practice",
    eyebrow: "Free baseline",
    price: "£0",
    priceDetail: "",
    subtitle: "Everything you need to practise with questions.",
    lead: "Questions stay free.",
    includedHeading: "Included free",
    features: [
      "21,000+ AKT questions",
      "Deep structured explanations",
      "Mock exams and basic practice",
      "2 hours audiobook listening",
    ],
    noteHeading: "Not included",
    note: "Full 90+ hour audiobook library requires paid audio access.",
    cta: "Start free",
    href: SIGNUP_URL,
    highlighted: false,
    tone: "green",
    variant: "baseline",
  },
  {
    title: "Early Access",
    eyebrow: "Best current audio price",
    price: "£59",
    priceDetail: "for 4 months",
    comparePrice: "£79 from 8 July",
    subtitle: "4 months full audio access from 8 July.",
    lead: "Adds the full 90+ hour AKT audiobook library.",
    includedHeading: "Paid audio adds",
    features: [
      "Full 90+ hour AKT audiobook library",
      "Access starts from 8 July 2026",
      "Future premium audio upgrades included during your access period",
      "Save £20 before standard pricing begins",
    ],
    noteHeading: "Still free",
    note: "Question practice and deep structured explanations remain free.",
    cta: "Lock in early access",
    href: ACCESS_URL,
    highlighted: true,
    tone: "violet",
    variant: "primary",
  },
  {
    title: "Full Audio Access",
    eyebrow: "Standard audio access",
    price: "£79",
    priceDetail: "for 4 months",
    subtitle: "The standard paid audio tier from 8 July.",
    lead: "Full audiobook access after early pricing ends.",
    includedHeading: "Paid audio includes",
    features: [
      "Full 90+ hour AKT audiobook library",
      "Built for commutes, walks, childcare and low-energy revision",
      "4 months access",
      "Future premium audio upgrades included during your access period",
    ],
    noteHeading: "Still free",
    note: "Questions remain free. This is not a paid question bank.",
    cta: "Get full audio access",
    href: ACCESS_URL,
    highlighted: false,
    tone: "blue",
    variant: "standard",
  },
] as const;

const SEO_FAQS = [
  {
    question: "Are AKT Navigator questions free?",
    answer:
      "Yes. Free Practice includes 21,000+ AKT questions, deep structured explanations, mock exams and basic practice.",
  },
  {
    question: "What is paid in AKT Navigator?",
    answer:
      "Full access to the 90+ hour AKT audiobook library is the paid audio tier. Early Access is £59 before 8 July 2026, then Full Audio Access is £79 for 4 months.",
  },
  {
    question: "Is AKT Navigator a paid question bank?",
    answer:
      "No. AKT Navigator offers free AKT question practice with an optional paid full-audio upgrade.",
  },
] as const;

function accentFor(tone: (typeof PLANS)[number]["tone"]) {
  if (tone === "green") return "rgba(52,211,153,.88)";
  if (tone === "blue") return "rgba(96,165,250,.9)";
  return "rgba(167,139,250,.95)";
}

function cardChrome(plan: (typeof PLANS)[number]) {
  if (plan.variant === "primary") {
    return {
      background:
        "linear-gradient(160deg, rgba(28,23,45,.98), rgba(17,19,28,.9) 46%, rgba(12,14,22,.9))",
      border: "1px solid rgba(167,139,250,.5)",
      boxShadow:
        "0 42px 120px rgba(109,106,232,.28), inset 0 1px 0 rgba(255,255,255,.1)",
      opacity: 1,
    };
  }

  if (plan.variant === "baseline") {
    return {
      background:
        "linear-gradient(180deg, rgba(16,25,24,.78), rgba(14,17,23,.64))",
      border: "1px solid rgba(52,211,153,.18)",
      boxShadow: "0 22px 72px rgba(0,0,0,.24)",
      opacity: 0.96,
    };
  }

  return {
    background:
      "linear-gradient(180deg, rgba(15,18,27,.82), rgba(12,14,20,.62))",
    border: "1px solid rgba(96,165,250,.16)",
    boxShadow: "0 22px 72px rgba(0,0,0,.24)",
    opacity: 0.9,
  };
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

        <div className="mt-9 grid gap-4 lg:grid-cols-[minmax(0,.86fr)_minmax(0,1.18fr)_minmax(0,.96fr)] lg:items-stretch">
          {PLANS.map((plan, i) => {
            const accent = accentFor(plan.tone);
            const chrome = cardChrome(plan);
            return (
              <article
                key={plan.title}
                className={`r-up card-shimmer relative flex min-h-full flex-col overflow-hidden rounded-[20px] p-5 md:p-6 ${
                  plan.highlighted ? "lg:-mt-4 lg:pb-7" : "lg:mt-6"
                }`}
                style={{
                  background: chrome.background,
                  border: chrome.border,
                  boxShadow: chrome.boxShadow,
                  opacity: chrome.opacity,
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
                    <div
                      className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{
                        color: accent,
                      }}
                    >
                      {plan.eyebrow}
                    </div>
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
                    <p
                      className="mt-4 text-[15px] md:text-[17px] font-semibold leading-[1.45]"
                      style={{ color: accent }}
                    >
                      {plan.lead}
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
                    className={`tabular-nums leading-none font-bold ${
                      plan.highlighted
                        ? "text-[56px] md:text-[68px]"
                        : "text-[44px] md:text-[54px]"
                    }`}
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

                {"comparePrice" in plan && (
                  <div
                    className="mt-2 text-[13px] md:text-[14px] font-semibold"
                    style={{ color: "rgba(232,236,255,.5)" }}
                  >
                    <span
                      className="line-through"
                      style={{ color: "rgba(232,236,255,.34)" }}
                    >
                      {plan.comparePrice}
                    </span>{" "}
                    <span style={{ color: accent }}>Save £20 now</span>
                  </div>
                )}

                <div
                  className="mt-6 border-t pt-5"
                  style={{ borderColor: "rgba(255,255,255,.08)" }}
                >
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: "rgba(232,236,255,.45)" }}
                  >
                    {plan.includedHeading}
                  </div>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span
                          className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: accent }}
                          aria-hidden
                        />
                        <span
                          className="text-[13px] md:text-[14px] leading-[1.5]"
                          style={{ color: "rgba(232,236,255,.78)" }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="mt-5 border-t pt-4"
                  style={{ borderColor: "rgba(255,255,255,.07)" }}
                >
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: accent }}
                  >
                    {plan.noteHeading}
                  </div>
                  <p
                    className="mt-2 text-[13px] md:text-[14px] leading-[1.55]"
                    style={{ color: "rgba(232,236,255,.62)" }}
                  >
                    {plan.note}
                  </p>
                </div>

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

        <div
          className="r-up mx-auto mt-8 grid max-w-[940px] gap-3 md:grid-cols-2"
          style={{ "--i": 7 } as React.CSSProperties}
        >
          <div
            className="rounded-[16px] p-5 md:p-6"
            style={{
              background: "rgba(52,211,153,.055)",
              border: "1px solid rgba(52,211,153,.16)",
            }}
          >
            <div
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "rgba(52,211,153,.88)" }}
            >
              Always free
            </div>
            <p
              className="mt-2 text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.74)" }}
            >
              21,000+ questions, deep structured explanations, mock exams,
              basic practice and 2 hours audiobook listening.
            </p>
          </div>

          <div
            className="rounded-[16px] p-5 md:p-6"
            style={{
              background: "rgba(167,139,250,.06)",
              border: "1px solid rgba(167,139,250,.18)",
            }}
          >
            <div
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "rgba(167,139,250,.9)" }}
            >
              Paid audio
            </div>
            <p
              className="mt-2 text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.74)" }}
            >
              Adds the full 90+ hour AKT audiobook library, 4 months access and
              future premium audio upgrades during your access period.
            </p>
          </div>
        </div>

        <div
          className="r-up mx-auto mt-10 max-w-[860px]"
          style={{ "--i": 8 } as React.CSSProperties}
        >
          <h3
            className="text-center text-[22px] md:text-[28px] leading-[1.15] font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
            }}
          >
            AKT Navigator pricing FAQ
          </h3>
          <div className="mt-5 grid gap-3">
            {SEO_FAQS.map((item) => (
              <section
                key={item.question}
                className="rounded-[16px] p-4 md:p-5"
                style={{
                  background: "rgba(17,19,26,.72)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <h4
                  className="text-[15px] md:text-[16px] font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.question}
                </h4>
                <p
                  className="mt-2 text-[13px] md:text-[14px] leading-[1.65]"
                  style={{ color: "rgba(232,236,255,.66)" }}
                >
                  {item.answer}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
