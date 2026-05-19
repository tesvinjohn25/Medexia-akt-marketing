"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const SIGNUP_URL = "https://app.medexia-akt.com";
const ACCESS_URL = "https://app.medexia-akt.com/buy";

const PLANS = [
  {
    title: "Free Practice",
    accessLabel: "Free tier",
    price: "£0",
    priceDetail: "",
    subtitle: "For question practice and starting your revision.",
    summary: "Question practice stays free.",
    features: [
      { text: "21,000+ AKT questions", status: "Free" },
      { text: "Deep structured explanations", status: "Free" },
      { text: "Mock exams and basic practice", status: "Free" },
      { text: "2 hours of audiobook listening", status: "Free audio sample" },
      { text: "Full 90+ hour audiobook library", status: "Paid upgrade", muted: true },
    ],
    cta: "Start free",
    href: SIGNUP_URL,
    highlighted: false,
    tone: "green",
  },
  {
    title: "Early Access",
    accessLabel: "Paid audio",
    price: "£59",
    priceDetail: "for 4 months",
    subtitle: "4 months full audio access from 8 July.",
    summary: "Best price for October sitters.",
    features: [
      { text: "21,000+ AKT questions", status: "Still free" },
      { text: "Deep structured explanations", status: "Still free" },
      { text: "Full 90+ hour AKT audiobook library", status: "Included" },
      { text: "Access starts from 8 July 2026", status: "Included" },
      { text: "Future premium audio upgrades included", status: "Included" },
      { text: "Save £20 before standard pricing begins", status: "Early access" },
    ],
    cta: "Lock in early access",
    href: ACCESS_URL,
    highlighted: true,
    tone: "violet",
  },
  {
    title: "Full Audio Access",
    accessLabel: "Paid audio",
    price: "£79",
    priceDetail: "for 4 months",
    subtitle: "4 months full audiobook access.",
    summary: "Standard full audio access from 8 July.",
    features: [
      { text: "21,000+ AKT questions", status: "Still free" },
      { text: "Deep structured explanations", status: "Still free" },
      { text: "Full 90+ hour AKT audiobook library", status: "Included" },
      { text: "Built for commutes, walks, childcare and low-energy revision", status: "Included" },
      { text: "4 months access", status: "Included" },
      { text: "Questions remain free", status: "Always" },
    ],
    cta: "Get full audio access",
    href: ACCESS_URL,
    highlighted: false,
    tone: "blue",
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
                    <div
                      className="mb-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{
                        color: accent,
                        background: plan.highlighted
                          ? "rgba(167,139,250,.10)"
                          : "rgba(255,255,255,.045)",
                        border: `1px solid ${plan.highlighted ? "rgba(167,139,250,.22)" : "rgba(255,255,255,.08)"}`,
                      }}
                    >
                      {plan.accessLabel}
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
                      className="mt-2 text-[12px] md:text-[13px] font-semibold leading-[1.5]"
                      style={{ color: accent }}
                    >
                      {plan.summary}
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
                  {plan.features.map((feature) => {
                    const isMuted = "muted" in feature && feature.muted;
                    return (
                      <li key={feature.text} className="flex gap-3">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            background: isMuted
                              ? "rgba(232,236,255,.22)"
                              : accent,
                          }}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className="block text-[13px] md:text-[14px] leading-[1.45]"
                            style={{
                              color: isMuted
                                ? "rgba(232,236,255,.42)"
                                : "rgba(232,236,255,.78)",
                            }}
                          >
                            {feature.text}
                          </span>
                          <span
                            className="mt-1 inline-flex rounded-full px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.12em]"
                            style={{
                              color: isMuted
                                ? "rgba(232,236,255,.42)"
                                : accent,
                              background: isMuted
                                ? "rgba(255,255,255,.035)"
                                : "rgba(255,255,255,.045)",
                              border: isMuted
                                ? "1px solid rgba(255,255,255,.06)"
                                : "1px solid rgba(255,255,255,.08)",
                            }}
                          >
                            {feature.status}
                          </span>
                        </span>
                      </li>
                    );
                  })}
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

        <div
          className="r-up mx-auto mt-8 grid max-w-[940px] gap-3 md:grid-cols-2"
          style={{ "--i": 7 } as React.CSSProperties}
        >
          <div
            className="rounded-[18px] p-5 md:p-6"
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
              21,000+ AKT questions, deep structured explanations, mock exams
              and basic practice remain free.
            </p>
          </div>

          <div
            className="rounded-[18px] p-5 md:p-6"
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
              Full access to the 90+ hour AKT audiobook library starts from £59
              Early Access, then £79 from 8 July 2026.
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
