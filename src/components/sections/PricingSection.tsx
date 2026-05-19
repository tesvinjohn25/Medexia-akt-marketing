"use client";

const FREE_JOIN_URL = "https://app.medexia-akt.com/join/free";
const EARLY_ACCESS_JOIN_URL = "https://app.medexia-akt.com/join/early-access";
const FULL_ACCESS_JOIN_URL = "https://app.medexia-akt.com/join/full-access";

const PLANS = [
  {
    title: "Free Practice",
    eyebrow: "From 8 July free plan",
    price: "£0",
    priceDetail: "",
    subtitle: "This is what stays free after full free access ends.",
    lead: "Not a limit today. Everything is free until 8 July.",
    includedHeading: "From 8 July this stays free",
    features: [
      "Full MRCGP AKT syllabus coverage",
      "Syllabus-mapped AKT questions",
      "Deep structured explanations",
      "Mock exams and basic practice",
      "2 hours of audiobook listening across any audiobook",
    ],
    noteHeading: "Today",
    note: "Until 8 July, you still get the full product free, not just this card.",
    cta: "Start free",
    href: FREE_JOIN_URL,
    highlighted: false,
    tone: "green",
    variant: "baseline",
  },
  {
    title: "Early Access",
    eyebrow: "Reserve before 8 July",
    price: "£59",
    priceDetail: "4 months from 8 July",
    comparePrice: "£79 standard price",
    subtitle: "This is the paid bundle that starts on 8 July 2026.",
    lead: "Pay £59 now to lock in full access from 8 July to 8 November 2026.",
    includedHeading: "From 8 July this includes",
    features: [
      "Full 90+ hour AKT audiobook library",
      "Interactive statistics course",
      "2+ hours of statistics explainer videos",
      "Dermatology Navigator image pocket guide",
      "Paid access period starts on 8 July 2026",
      "Future premium audio upgrades included during your access period",
      "Save £20 before standard pricing begins",
    ],
    noteHeading: "Today’s access",
    note: "Full access remains free until 8 July. Early Access locks in the lower paid period after that.",
    cta: "Lock in early access",
    href: EARLY_ACCESS_JOIN_URL,
    highlighted: true,
    tone: "violet",
    variant: "primary",
  },
  {
    title: "Full Audio Access",
    eyebrow: "Locked until 8 July",
    price: "£79",
    priceDetail: "for 4 months",
    subtitle: "This comes into effect from 8 July 2026.",
    lead: "Standard full audio access is not available to buy before 8 July.",
    includedHeading: "From 8 July this includes",
    features: [
      "Full 90+ hour AKT audiobook library",
      "Interactive statistics course",
      "2+ hours of statistics explainer videos",
      "Dermatology Navigator image pocket guide",
      "Built for commutes, walks, childcare and low-energy revision",
      "4 months access",
      "Future premium audio upgrades included during your access period",
    ],
    noteHeading: "Still free",
    note: "Questions remain free, with 2 hours of audiobook listening included.",
    cta: "Available from 8 July",
    href: FULL_ACCESS_JOIN_URL,
    highlighted: false,
    tone: "blue",
    variant: "standard",
    locked: true,
  },
] as const;

const SEO_FAQS = [
  {
    question: "Are AKT Navigator questions free?",
    answer:
      "Yes. Free Practice includes syllabus-mapped AKT questions covering the full MRCGP AKT syllabus, deep structured explanations, mock exams, basic practice and 2 hours of audiobook listening.",
  },
  {
    question: "When does paid audio access start?",
    answer:
      "Full AKT Navigator access remains free until 8 July 2026. Early Access paid audio starts on 8 July 2026 and runs for 4 months.",
  },
  {
    question: "What is paid in AKT Navigator?",
    answer:
      "From 8 July 2026, full access to the 90+ hour AKT audiobook library, interactive statistics course, 2+ hours of statistics explainer videos and Dermatology Navigator image pocket guide are part of the paid access bundle. Early Access is £59 before 8 July, then Full Audio Access is £79 for 4 months.",
  },
  {
    question: "Is AKT Navigator a paid question bank?",
    answer:
      "No. AKT Navigator offers free AKT question practice with an optional paid full-audio upgrade.",
  },
] as const;

const ACCESS_TIMELINE = [
  {
    title: "Now until 8 July 2026",
    accent: "rgba(52,211,153,.9)",
    text: "Everything is free right now: questions, mocks, explanations, the full audiobook library, statistics course, statistics explainer videos and Dermatology Navigator.",
  },
  {
    title: "These cards apply from 8 July 2026",
    accent: "rgba(167,139,250,.95)",
    text: "From 8 July, questions stay free with 2 hours of audio. Full audio and premium revision tools become paid.",
  },
] as const;

function accentFor(tone: (typeof PLANS)[number]["tone"]) {
  if (tone === "green") return "rgba(52,211,153,.88)";
  if (tone === "blue") return "rgba(96,165,250,.9)";
  return "rgba(167,139,250,.95)";
}

function cardChrome(plan: (typeof PLANS)[number]) {
  if ("locked" in plan && plan.locked) {
    return {
      background:
        "linear-gradient(180deg, rgba(21,23,30,.62), rgba(13,15,20,.46))",
      border: "1px solid rgba(232,236,255,.09)",
      boxShadow: "0 18px 60px rgba(0,0,0,.20)",
      opacity: 0.58,
    };
  }

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
        className="container-x relative reveal-group is-visible"
      >
        <div className="mx-auto max-w-[780px] text-center">
          <div
            className="r-blur text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
          >
            Everything free today. Plans start 8 July.
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
            Use everything free until 8 July. These plans show what happens after.
          </h2>
          <p
            className="r-up mx-auto mt-4 max-w-[650px] text-[15px] md:text-[17px] leading-[1.65]"
            style={{ color: "rgba(232,236,255,.68)", "--i": 2 } as React.CSSProperties}
          >
            Until 8 July 2026, every part of AKT Navigator is free. From 8 July,
            questions remain free with 2 hours of audiobook listening included;
            full audio and premium revision tools become paid.
          </p>
        </div>

        <div
          className="r-up mx-auto mt-8 grid max-w-[900px] gap-3 md:grid-cols-2"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          {ACCESS_TIMELINE.map((item) => (
            <div
              key={item.title}
              className="rounded-[16px] p-5 md:p-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,19,26,.76), rgba(17,19,26,.52))",
                border: `1px solid ${item.accent.replace(".9", ".22").replace(".95", ".22")}`,
              }}
            >
              <div
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: item.accent }}
              >
                {item.title}
              </div>
              <p
                className="mt-2 text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.74)" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[minmax(0,.86fr)_minmax(0,1.18fr)_minmax(0,.96fr)] lg:items-stretch">
          {PLANS.map((plan, i) => {
            const locked = "locked" in plan ? Boolean(plan.locked) : false;
            const accent = locked ? "rgba(170,176,195,.7)" : accentFor(plan.tone);
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
                  "--i": 4 + i,
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

                {locked && (
                  <div
                    className="pointer-events-none absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full"
                    aria-hidden
                    style={{
                      background: "rgba(232,236,255,.06)",
                      border: "1px solid rgba(232,236,255,.12)",
                      color: "rgba(232,236,255,.7)",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <rect x="4" y="10" width="16" height="10" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                  </div>
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
                  {locked ? (
                    <div
                      aria-disabled="true"
                      className="flex cursor-not-allowed items-center justify-center gap-2 rounded-[14px] px-4 py-3 text-center text-[14px] font-semibold"
                      style={{
                        color: "rgba(232,236,255,.54)",
                        background: "rgba(255,255,255,.028)",
                        border: "1px solid rgba(255,255,255,.08)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <rect x="4" y="10" width="16" height="10" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                      {plan.cta}
                    </div>
                  ) : (
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
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p
          className="r-up mx-auto mt-6 max-w-[720px] text-center text-[13px] md:text-[14px] leading-[1.6]"
          style={{ color: "rgba(232,236,255,.58)", "--i": 7 } as React.CSSProperties}
        >
          Nothing is restricted before 8 July. Buying Early Access simply locks
          in the lower price for the paid access period that starts on 8 July
          2026, not today.
        </p>

        <div
          className="r-up mx-auto mt-8 grid max-w-[940px] gap-3 md:grid-cols-2"
          style={{ "--i": 8 } as React.CSSProperties}
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
              2 hours included free
            </div>
            <p
              className="mt-2 text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.74)" }}
            >
              After 8 July, Free Practice still includes a generous 2-hour
              audiobook budget across any audiobook, so you can try the audio
              properly before upgrading.
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
              Why the sample matters
            </div>
            <p
              className="mt-2 text-[14px] md:text-[15px] leading-[1.65] italic"
              style={{ color: "rgba(232,236,255,.74)" }}
            >
              &ldquo;Helpful to listen on my way to work and get quick
              learning.&rdquo;
            </p>
            <div
              className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "rgba(167,139,250,.68)" }}
            >
              ST2 · Peninsula
            </div>
          </div>
        </div>

        <div
          className="r-up mx-auto mt-10 max-w-[860px]"
          style={{ "--i": 9 } as React.CSSProperties}
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
