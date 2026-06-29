"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { TrackedExternalLink } from "@/components/marketing/TrackedExternalLink";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import { explanationBuilderFaqs } from "@/data/explanation-builder";
import { canUseAnalytics } from "@/lib/consent/consent";
import { initMarketingAttribution } from "@/lib/marketing/attribution";
import { trackLandingEvent } from "@/lib/marketing/events";

const CUSTOM_GPT_URL =
  "https://chatgpt.com/g/g-6a3f00f0f1f48191843a97a1051d23ab-akt-navigator-explainer-builder";

const PAGE_VIEW_PROPERTIES = {
  page: "akt_explanation_builder",
  source: "landing_bridge",
};

const VALUE_ITEMS = [
  "Key question clues",
  "What examiners are testing",
  "Near-miss trap",
  "Why the other options are wrong",
  "Explain-it-back prompt",
];

const EXPLANATION_PREVIEW = [
  "Decisive clue: theophylline is a methylxanthine",
  "Examiner trap: confusing interaction with contraindication",
  "Near-miss: lower-dose adenosine applies to dipyridamole, not theophylline",
  "Takeaway: theophylline antagonises adenosine, so adenosine may be less effective",
  "Check understanding: explain it back in your own words",
];

const HOW_IT_WORKS = [
  "Paste your AKT-style question",
  "Get a structured teaching explanation",
  "Explain it back and get short feedback",
];

function useTrackedPageView() {
  const marketing = useMarketingAttribution();
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current || !canUseAnalytics()) return;
    initMarketingAttribution();
    trackLandingEvent("explanation_builder_page_viewed", PAGE_VIEW_PROPERTIES);
    trackedRef.current = true;
  }, [marketing?.mx_session_id, marketing?.offer_context.offer_id]);
}

function useExampleViewed(ref: RefObject<HTMLElement>) {
  const marketing = useMarketingAttribution();
  const [viewed, setViewed] = useState(false);
  const trackedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setViewed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        setViewed(true);
        obs.unobserve(entry.target);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!viewed || trackedRef.current || !canUseAnalytics()) return;
    initMarketingAttribution();
    trackLandingEvent("explanation_builder_example_viewed", {
      page: "akt_explanation_builder",
      section: "before_after_example",
    });
    trackedRef.current = true;
  }, [viewed, marketing?.mx_session_id, marketing?.offer_context.offer_id]);
}

function Badge({
  children,
  tone = "violet",
}: {
  children: React.ReactNode;
  tone?: "blue" | "green" | "violet";
}) {
  const styles = {
    blue: {
      background: "rgba(96,165,250,.08)",
      borderColor: "rgba(96,165,250,.18)",
      color: "rgba(96,165,250,.9)",
    },
    green: {
      background: "rgba(52,211,153,.08)",
      borderColor: "rgba(52,211,153,.18)",
      color: "rgba(52,211,153,.85)",
    },
    violet: {
      background: "rgba(167,139,250,.08)",
      borderColor: "rgba(167,139,250,.18)",
      color: "rgba(197,170,255,.9)",
    },
  }[tone];

  return (
    <span
      className="inline-flex items-center rounded-md border px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.14em]"
      style={styles}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-[700px]">
      {eyebrow ? (
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "rgba(167,139,250,.85)" }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h2
        className="mt-2 text-[26px] leading-[1.12] md:text-[34px]"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </h2>
      {body ? (
        <p
          className="mt-3 text-[15px] leading-[1.7] md:text-[16px]"
          style={{ color: "rgba(232,236,255,.68)" }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function GptCta({
  placement,
  className,
  children = "Open in ChatGPT",
}: {
  placement: "hero" | "example" | "final";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <TrackedExternalLink
      href={CUSTOM_GPT_URL}
      eventName="explanation_builder_open_gpt_clicked"
      eventProperties={{
        destination: "chatgpt_custom_gpt",
        placement,
      }}
      flushTimeoutMs={400}
      className={className}
    >
      {children}
    </TrackedExternalLink>
  );
}

function StartFreeLink({
  placement,
  className,
  children = "Or start free AKT questions",
}: {
  placement: "hero" | "final";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <TrackedAppLink
      href="/join/free"
      intent="start_free"
      className={className}
      extraTrackingEvents={[
        {
          eventName: "explanation_builder_start_free_clicked",
          properties: {
            page: "akt_explanation_builder",
            placement,
            source: "landing_bridge",
          },
        },
      ]}
    >
      {children}
    </TrackedAppLink>
  );
}

function GlassCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`card card-shimmer relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function ExplanationBuilderBridge() {
  const exampleRef = useRef<HTMLElement>(null);
  useTrackedPageView();
  useExampleViewed(exampleRef);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-noise" />
        <div
          className="pointer-events-none absolute inset-0 z-[0]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, #000 0%, rgba(7,5,14,.96) 52%, transparent 100%)",
          }}
        />

        <div
          className="container-x relative z-[1] grid gap-7 pb-12 md:grid-cols-[1.05fr_.95fr] md:items-center md:gap-12 md:pb-16"
          style={{
            paddingTop:
              "calc(env(safe-area-inset-top, 0px) + clamp(100px, 12vw, 132px))",
          }}
        >
          <div className="hero-enter max-w-[620px]" style={{ "--he": 0 } as CSSProperties}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">MRCGP AKT</Badge>
              <Badge tone="green">Free tool</Badge>
              <Badge>By AKT Navigator</Badge>
            </div>

            <h1
              className="mt-5 text-[38px] leading-[1.02] md:text-[54px] lg:text-[62px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.045em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              Free AKT
              <br />
              <span className="text-shine">Explanation Builder</span>
            </h1>

            <p
              className="mt-5 max-w-[540px] text-[16px] leading-[1.65] md:text-[18px]"
              style={{ color: "rgba(232,236,255,.76)" }}
            >
              Paste an AKT-style SBA and get a proper teaching explanation: key
              clues, examiner trap, near-miss answer, why-wrong breakdown and
              AKT takeaway.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <GptCta placement="hero" className="btn-primary inline-block text-[15px]">
                Open in ChatGPT
              </GptCta>
              <StartFreeLink placement="hero" className="btn-secondary inline-flex items-center text-[15px]">
                Or start free AKT questions
              </StartFreeLink>
            </div>

            <p
              className="mt-4 max-w-[520px] text-[13px] leading-[1.6]"
              style={{ color: "rgba(232,236,255,.48)" }}
            >
              Requires a ChatGPT account. AKT Navigator free practice does not
              require a card. Prefer the full landing page?{" "}
              <a
                href="/free-akt-questions"
                className="font-semibold transition-colors hover:text-white"
                style={{ color: "rgba(197,170,255,.84)" }}
              >
                See free AKT questions
              </a>
              .
            </p>
          </div>

          <GlassCard
            className="hero-enter p-4 md:p-5"
            style={{
              "--he": 1,
              background:
                "linear-gradient(145deg, rgba(17,19,26,.9), rgba(17,19,26,.62) 58%, rgba(109,106,232,.10))",
              border: "1px solid rgba(167,139,250,.16)",
            } as CSSProperties}
          >
            <div className="rounded-[14px] border border-white/[.08] bg-black/[.20] p-4">
              <div
                className="text-[10px] font-bold uppercase tracking-[0.20em]"
                style={{ color: "rgba(197,170,255,.86)" }}
              >
                What you get back
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["Decisive clue", "Theophylline changes how adenosine behaves."],
                  ["Examiner trap", "Do not confuse antagonism with contraindication."],
                  ["Near-miss", "Lower dose is the dipyridamole interaction."],
                ].map(([label, body]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[.07] bg-white/[.035] p-3"
                  >
                    <div
                      className="text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: "rgba(52,211,153,.82)" }}
                    >
                      {label}
                    </div>
                    <p
                      className="mt-1 text-[13px] leading-[1.55]"
                      style={{ color: "rgba(232,236,255,.72)" }}
                    >
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-x">
          <GlassCard className="p-5 md:p-7">
            <div className="grid gap-6 md:grid-cols-[.85fr_1.15fr] md:items-center">
              <SectionHeader
                eyebrow="What it gives you"
                title="A teaching card, not just an answer."
                body="The tool does not just tell you the answer. It turns the question into an AKT Navigator-style teaching card so you understand the trap and can explain the learning point back."
              />
              <div className="grid gap-2 sm:grid-cols-2">
                {VALUE_ITEMS.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/[.07] bg-white/[.035] px-4 py-3"
                  >
                    <div
                      className="text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: "rgba(167,139,250,.82)" }}
                    >
                      0{index + 1}
                    </div>
                    <div className="mt-1 text-[14px] font-semibold">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section ref={exampleRef} className="section-padding pt-0">
        <div className="container-x">
          <SectionHeader
            eyebrow="Before and after"
            title="From a thin answer to the actual trap."
            body="A small preview of the style. The full explanation stays inside the builder."
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <GlassCard className="p-5 md:p-6">
              <div
                className="text-[11px] font-bold uppercase tracking-[0.20em]"
                style={{ color: "rgba(96,165,250,.88)" }}
              >
                Before: typical SBA
              </div>
              <p
                className="mt-4 text-[15px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.82)" }}
              >
                A patient with COPD taking theophylline develops regular SVT.
                Vagal manoeuvres fail. Which statement about adenosine is true?
              </p>
              <ol
                className="mt-4 space-y-2 text-[14px] leading-[1.55]"
                style={{ color: "rgba(232,236,255,.64)" }}
              >
                <li>A. Theophylline potentiates adenosine&mdash;lower dose</li>
                <li>B. Theophylline antagonises adenosine&mdash;higher dose may be required</li>
                <li>C. Adenosine is contraindicated with theophylline</li>
                <li>D. Use IV digoxin instead</li>
                <li>E. Go straight to DC cardioversion</li>
              </ol>
            </GlassCard>

            <GlassCard
              className="p-5 md:p-6"
              style={{
                background:
                  "linear-gradient(145deg, rgba(17,19,26,.9), rgba(17,19,26,.66) 58%, rgba(52,211,153,.08))",
                border: "1px solid rgba(52,211,153,.16)",
              }}
            >
              <div
                className="text-[11px] font-bold uppercase tracking-[0.20em]"
                style={{ color: "rgba(52,211,153,.86)" }}
              >
                After: AKT Navigator-style explanation
              </div>
              <ul className="mt-4 space-y-3">
                {EXPLANATION_PREVIEW.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-[1.6]">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background: "rgba(52,211,153,.95)",
                        boxShadow: "0 0 14px rgba(52,211,153,.45)",
                      }}
                    />
                    <span style={{ color: "rgba(232,236,255,.72)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <GptCta placement="example" className="btn-primary inline-block text-[14px]">
                  Open this builder
                </GptCta>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="How it works" title="Three moves. One learning point." />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, index) => (
              <div
                key={step}
                className="rounded-[16px] border border-white/[.08] bg-white/[.035] p-4 md:p-5"
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.20em]"
                  style={{ color: "rgba(197,170,255,.86)" }}
                >
                  Step {index + 1}
                </div>
                <h3
                  className="mt-2 text-[17px] font-semibold leading-[1.25] md:text-[18px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassCard
            className="p-6 text-center md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(109,106,232,.10), rgba(17,19,26,.88) 42%, rgba(236,72,153,.07))",
              border: "1px solid rgba(167,139,250,.18)",
            }}
          >
            <h2
              className="mx-auto max-w-[680px] text-[28px] leading-[1.12] md:text-[40px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
              }}
            >
              Want questions already explained like this?
            </h2>
            <p
              className="mx-auto mt-4 max-w-[620px] text-[15px] leading-[1.7] md:text-[16px]"
              style={{ color: "rgba(232,236,255,.70)" }}
            >
              AKT Navigator has free AKT questions, mocks and structured
              explanations &mdash; plus audio revision for commutes, walks and
              tired evenings. No card required.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <StartFreeLink placement="final" className="btn-primary inline-block text-[15px]">
                Start free AKT practice
              </StartFreeLink>
              <GptCta placement="final" className="btn-secondary inline-flex text-[15px]">
                Open in ChatGPT
              </GptCta>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x max-w-[820px]">
          <SectionHeader eyebrow="FAQ" title="A few practical details." />
          <div className="mt-5 grid gap-3">
            {explanationBuilderFaqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[16px] border border-white/[.08] bg-white/[.035] p-5"
              >
                <h3
                  className="text-[17px] font-semibold leading-[1.25]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {faq.question}
                </h3>
                <p
                  className="mt-2 text-[14px] leading-[1.7]"
                  style={{ color: "rgba(232,236,255,.66)" }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
