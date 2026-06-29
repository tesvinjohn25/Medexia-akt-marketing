"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import {
  OFFER_IDS,
  canShowReferralEarlybirdOffer,
  type CtaIntent,
  type OfferId,
} from "@/lib/marketing/attribution";
import { pricingFaqs } from "@/data/product-positioning";

type Plan = {
  title: string;
  eyebrow: string;
  price: string;
  priceDetail: string;
  comparePrice?: string;
  includedHeading: string;
  features: string[];
  note: string;
  cta: string;
  href?: string;
  intent?: CtaIntent;
  offerId?: OfferId;
  highlighted: boolean;
  tone: "green" | "violet" | "blue";
  variant: "baseline" | "primary" | "standard";
  locked?: boolean;
};

const PRE_CUTOVER_PLANS: Plan[] = [
  {
    title: "Free Practice",
    eyebrow: "Free — now and after 8 July",
    price: "£0",
    priceDetail: "",
    includedHeading: "Always free",
    features: [
      "Thousands of syllabus-mapped AKT questions",
      "Deep structured explanations",
      "Mock exams and basic practice",
      "2 hours of audiobook listening",
    ],
    note: "Until 8 July you get the whole product free — not just this list.",
    cta: "Start free",
    href: "/join/free",
    intent: "start_free",
    offerId: OFFER_IDS.freePre,
    highlighted: false,
    tone: "green",
    variant: "baseline",
  },
  {
    title: "Early Access",
    eyebrow: "Buy before 8 July",
    price: "£59",
    priceDetail: "4 months from 8 July",
    comparePrice: "£79",
    includedHeading: "Everything free, plus",
    features: [
      "Full 90+ hour audiobook library — all 32 topics",
      "Interactive statistics course + explainer videos",
      "Dermatology Navigator image pocket guide",
      "Access runs 8 July – 8 November 2026",
      "Future premium audio upgrades included",
    ],
    note: "Nothing is restricted today — £59 locks in the paid period at £20 off.",
    cta: "Lock in early access",
    href: "/join/early-access",
    intent: "earlybird_upgrade",
    offerId: OFFER_IDS.earlybird59Pre,
    highlighted: true,
    tone: "violet",
    variant: "primary",
  },
  {
    title: "Full Audio Access",
    eyebrow: "From 8 July",
    price: "£79",
    priceDetail: "for 4 months",
    includedHeading: "Everything free, plus",
    features: [
      "Full 90+ hour audiobook library — all 32 topics",
      "Interactive statistics course + explainer videos",
      "Dermatology Navigator image pocket guide",
      "4 months of access",
    ],
    note: "The standard price once Early Access ends. Not on sale before 8 July.",
    cta: "Price anchor",
    highlighted: false,
    tone: "blue",
    variant: "standard",
    locked: true,
  },
] as Plan[];

const POST_CUTOVER_PLANS: Plan[] = [
  {
    title: "Free Practice",
    eyebrow: "Free",
    price: "£0",
    priceDetail: "",
    includedHeading: "Included",
    features: [
      "Thousands of syllabus-mapped AKT questions",
      "Deep structured explanations",
      "Mock exams and basic practice",
      "2 hours of audiobook listening",
    ],
    note: "Questions remain free. The audio allowance lets you test whether hands-free revision fits your day.",
    cta: "Start free",
    href: "/join/free",
    intent: "start_free",
    offerId: OFFER_IDS.freePost,
    highlighted: false,
    tone: "green",
    variant: "baseline",
  },
  {
    title: "Full Audio Access",
    eyebrow: "4-month audio upgrade",
    price: "£79",
    priceDetail: "for 4 months",
    includedHeading: "Everything free, plus",
    features: [
      "Full 90+ hour audiobook library — all 32 topics",
      "Interactive statistics course + explainer videos",
      "Dermatology Navigator image pocket guide",
      "4 months of access",
    ],
    note: "Upgrade when the free 2-hour allowance proves the audio is useful.",
    cta: "Upgrade to full audio",
    href: "/join/full-access",
    intent: "checkout",
    offerId: OFFER_IDS.standard79Post,
    highlighted: true,
    tone: "blue",
    variant: "primary",
  },
] as Plan[];

function referralPlans(): Plan[] {
  return PRE_CUTOVER_PLANS.map((plan) => {
    if (plan.title !== "Early Access") return plan;
    return {
      ...plan,
      eyebrow: "Referral Early Access",
      price: "£49",
      comparePrice: "£59",
      note: "This referral link gives £10 off Early Access before 8 July. The £49 price is not shown without a valid referral link.",
      cta: "Lock in £49 Early Access",
      intent: "referral_earlybird",
      offerId: OFFER_IDS.earlybird49ReferralPre,
    };
  });
}

function accentFor(tone: Plan["tone"]) {
  if (tone === "green") return "rgba(52,211,153,.88)";
  if (tone === "blue") return "rgba(96,165,250,.9)";
  return "rgba(167,139,250,.95)";
}

function cardChrome(plan: Plan) {
  if ("locked" in plan && plan.locked) {
    return {
      background:
        "linear-gradient(180deg, rgba(21,23,30,.62), rgba(13,15,20,.46))",
      border: "1px solid rgba(232,236,255,.09)",
      boxShadow: "0 18px 60px rgba(0,0,0,.20)",
      opacity: 0.68,
    };
  }

  if (plan.variant === "primary") {
    return {
      background:
        "linear-gradient(160deg, rgba(28,23,45,.98), rgba(17,19,28,.9) 46%, rgba(12,14,22,.9))",
      border: "1px solid rgba(167,139,250,.6)",
      boxShadow:
        "0 42px 120px rgba(109,106,232,.38), 0 0 44px rgba(155,107,255,.18), inset 0 1px 0 rgba(255,255,255,.1)",
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
  const { ref, visible } = useScrollReveal(0.05);
  const marketing = useMarketingAttribution();
  const referralCode = marketing?.active_referral?.referral_code ?? null;
  const isPreCutover = marketing?.offer_context.phase !== "post_2026_07_08";
  const hasReferralOffer = canShowReferralEarlybirdOffer(referralCode);
  const plans = isPreCutover
    ? hasReferralOffer
      ? referralPlans()
      : PRE_CUTOVER_PLANS
    : POST_CUTOVER_PLANS;

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
            Pricing
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
            {isPreCutover ? "Practice stays free." : "Questions stay free."}
          </h2>
          <p
            className="r-up mx-auto mt-4 max-w-[650px] text-[15px] md:text-[17px] leading-[1.65]"
            style={{ color: "rgba(232,236,255,.68)", "--i": 2 } as React.CSSProperties}
          >
            {isPreCutover
              ? hasReferralOffer
                ? "The whole product is free until 8 July. Through this referral link, Early Access is £49 instead of £59 before 8 July; questions, mocks and explanations stay free after that, with standard full audio at £79."
                : "The whole product is free until 8 July. £59 Early Access is available before 8 July; questions, mocks and explanations stay free after that, with standard full audio at £79."
              : "Questions are free. Your first 2 hours of AKT audio are free. Upgrade to full 4-month audio access for £79."}
          </p>
        </div>

        <div className={`mt-9 grid gap-4 ${plans.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,.86fr)_minmax(0,1.18fr)_minmax(0,.96fr)]"} lg:items-stretch`}>
          {plans.map((plan, i) => {
            const locked = "locked" in plan ? Boolean(plan.locked) : false;
            const accent = locked ? "rgba(170,176,195,.7)" : accentFor(plan.tone);
            const chrome = cardChrome(plan);
            return (
              <article
                key={plan.title}
                className={`r-up card-shimmer relative flex min-h-full flex-col overflow-hidden rounded-[20px] p-5 md:p-6 ${
                  plan.highlighted
                    ? "max-lg:order-first lg:-mt-4 lg:pb-7"
                    : "lg:mt-6"
                }`}
                style={{
                  background: chrome.background,
                  border: chrome.border,
                  boxShadow: chrome.boxShadow,
                  opacity: chrome.opacity,
                  "--i": 4 + i,
                } as React.CSSProperties}
              >
                {/* Colour-coded accent strip: green = free, violet = early
                    access, blue = standard. Reads the tier at a glance. */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                  aria-hidden
                  style={{
                    background: `linear-gradient(90deg, transparent 4%, ${accent}, transparent 96%)`,
                    opacity: locked ? 0.4 : 0.9,
                  }}
                />

                {plan.highlighted && (
                  <div className="mb-4 flex justify-center">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-[6px] text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))",
                        boxShadow: "0 8px 26px rgba(155,107,255,.45)",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M12 2l2.9 6.26 6.6.7-4.9 4.5 1.35 6.54L12 16.9 6.05 20l1.35-6.54-4.9-4.5 6.6-.7z" />
                      </svg>
                      {isPreCutover
                        ? hasReferralOffer
                          ? "Referral price · £10 off"
                          : "Most popular · Save £20"
                        : "Most popular"}
                    </span>
                  </div>
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
                      ...(plan.highlighted
                        ? {
                            backgroundImage:
                              "linear-gradient(135deg, var(--brand-violet-light), var(--brand-violet) 60%, var(--brand-iris))",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                          }
                        : null),
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
                    standard price from 8 July
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
                      <li key={feature} className="flex gap-2.5">
                        <svg
                          className="mt-[3px] shrink-0"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={accent}
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
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
                  <p
                    className="text-[13px] md:text-[14px] leading-[1.55]"
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
                  ) : plan.href && plan.intent ? (
                    <TrackedAppLink
                      className={
                        plan.highlighted
                          ? "btn-primary block text-center text-[14px]"
                          : "block rounded-[14px] px-4 py-3 text-center text-[14px] font-semibold transition-colors hover:bg-white/[.08]"
                      }
                      href={plan.href}
                      intent={plan.intent}
                      offerId={plan.offerId}
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
                    </TrackedAppLink>
                  ) : (
                    <div
                      className="flex items-center justify-center rounded-[14px] px-4 py-3 text-center text-[14px] font-semibold"
                      style={{
                        color: "rgba(232,236,255,.54)",
                        background: "rgba(255,255,255,.028)",
                        border: "1px solid rgba(255,255,255,.08)",
                      }}
                    >
                      {plan.cta}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div
          className="r-up mx-auto mt-10 max-w-[860px]"
          style={{ "--i": 7 } as React.CSSProperties}
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
            {pricingFaqs.map((item) => (
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
