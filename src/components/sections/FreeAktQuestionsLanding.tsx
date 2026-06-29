"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import { FreeQuestionsLiveDemo } from "@/components/sections/FreeQuestionsLiveDemo";
import { canUseAnalytics } from "@/lib/consent/consent";
import { initMarketingAttribution } from "@/lib/marketing/attribution";
import { trackLandingEvent } from "@/lib/marketing/events";
import {
  FREE_PRACTICE_ANSWER,
  alwaysFreeFeatures,
  bestForItems,
  conventionalBankItems,
  explanationDifferenceItems,
  freeAktQuestionsFaqs,
  freeQuestionProcessSteps,
  freeQuestionTrustStripItems,
  freePracticeFacts,
  freePracticeIncludes,
  optionalPaidAudioFeatures,
  sampleFreeAktQuestion,
} from "@/data/free-akt-questions";

type SourceSurface = "free_questions_landing" | "custom_gpt_return";
type StartPlacement = "hero" | "sample" | "comparison" | "final";
type BuilderPlacement = "hero" | "explanation_quality" | "builder_section";

function useFreeQuestionsPageTracking(sourceSurface: SourceSurface) {
  const marketing = useMarketingAttribution();
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current || !canUseAnalytics()) return;

    initMarketingAttribution();

    if (sourceSurface === "custom_gpt_return") {
      trackLandingEvent("custom_gpt_return_landed", {
        page: "free",
        source: "custom_gpt",
        medium: "gpt_footer",
        campaign: "akt_explanation_builder",
        content: "short_free_link",
      });
    }

    trackLandingEvent("free_akt_questions_page_viewed", {
      page: "free_akt_questions",
      source: sourceSurface,
    });

    trackedRef.current = true;
  }, [marketing?.mx_session_id, marketing?.offer_context.offer_id, sourceSurface]);
}

function useSampleViewed(ref: RefObject<HTMLElement>, sourceSurface: SourceSurface) {
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
    trackLandingEvent("free_akt_questions_sample_viewed", {
      page: "free_akt_questions",
      source: sourceSurface,
      section: "sample_question",
    });
    trackedRef.current = true;
  }, [viewed, marketing?.mx_session_id, marketing?.offer_context.offer_id, sourceSurface]);
}

function Badge({
  children,
  tone = "violet",
}: {
  children: ReactNode;
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
  center = false,
}: {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]"}>
      {eyebrow ? (
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "rgba(167,139,250,.85)" }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="mt-2 text-[26px] leading-[1.12] md:text-[36px]"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </h2>
      {body ? (
        <div
          className="mt-3 text-[15px] leading-[1.7] md:text-[16px]"
          style={{ color: "rgba(232,236,255,.68)" }}
        >
          {body}
        </div>
      ) : null}
    </div>
  );
}

function GlassCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
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

function Dot({ tone = "violet" }: { tone?: "violet" | "green" | "blue" }) {
  const color = {
    violet: "rgba(197,170,255,.92)",
    green: "rgba(52,211,153,.92)",
    blue: "rgba(96,165,250,.92)",
  }[tone];

  return (
    <span
      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
      style={{
        background: color,
        boxShadow: `0 0 14px ${color}`,
      }}
      aria-hidden
    />
  );
}

function StartFreeLink({
  sourceSurface,
  placement,
  className,
  children = "Start free AKT questions",
}: {
  sourceSurface: SourceSurface;
  placement: StartPlacement;
  className?: string;
  children?: ReactNode;
}) {
  const extraTrackingEvents = [
    ...(sourceSurface === "custom_gpt_return"
      ? [
          {
            eventName: "custom_gpt_return_start_free_clicked",
            properties: {
              page: "free",
              placement,
              source: "custom_gpt",
              medium: "gpt_footer",
              campaign: "akt_explanation_builder",
            },
          },
        ]
      : []),
    {
      eventName: "free_akt_questions_start_free_clicked",
      properties: {
        page: "free_akt_questions",
        placement,
        source: sourceSurface,
      },
    },
  ];

  return (
    <TrackedAppLink
      href="/join/free"
      intent="start_free"
      className={className}
      extraTrackingEvents={extraTrackingEvents}
    >
      {children}
    </TrackedAppLink>
  );
}

function ExplanationBuilderLink({
  sourceSurface,
  placement,
  className,
  children = "Try the Explanation Builder",
}: {
  sourceSurface: SourceSurface;
  placement: BuilderPlacement;
  className?: string;
  children?: ReactNode;
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented) return;
    trackLandingEvent("free_akt_questions_explanation_builder_clicked", {
      page: "free_akt_questions",
      placement,
      source: sourceSurface,
    });
  };

  return (
    <a href="/akt-explanation-builder" onClick={onClick} className={className}>
      {children}
    </a>
  );
}

function FeatureList({
  items,
  tone = "violet",
}: {
  items: readonly string[];
  tone?: "violet" | "green" | "blue";
}) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[14px] leading-[1.55]">
          <Dot tone={tone} />
          <span style={{ color: "rgba(232,236,255,.72)" }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FreeAktQuestionsLanding({
  sourceSurface = "free_questions_landing",
}: {
  sourceSurface?: SourceSurface;
}) {
  const sampleRef = useRef<HTMLElement>(null);
  const isCustomGptReturn = sourceSurface === "custom_gpt_return";

  useFreeQuestionsPageTracking(sourceSurface);
  useSampleViewed(sampleRef, sourceSurface);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-noise" />
        <div
          className="pointer-events-none absolute inset-0 z-[0]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, #000 0%, rgba(7,5,14,.96) 56%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-[-18%] top-[14%] z-[0] h-[420px] w-[420px] rounded-full"
          aria-hidden
          style={{
            background:
              "radial-gradient(closest-side, rgba(109,106,232,.20), rgba(155,107,255,.08) 58%, transparent 78%)",
            filter: "blur(24px)",
          }}
        />
        <div
          className="pointer-events-none absolute right-[-16%] top-[8%] z-[0] h-[520px] w-[520px] rounded-full"
          aria-hidden
          style={{
            background:
              "radial-gradient(closest-side, rgba(52,211,153,.10), rgba(167,139,250,.08) 48%, transparent 76%)",
            filter: "blur(34px)",
          }}
        />

        <div
          className="container-x relative z-[1] grid gap-8 pb-8 md:grid-cols-[1.05fr_.95fr] md:items-center md:gap-12 md:pb-10"
          style={{
            paddingTop:
              "calc(env(safe-area-inset-top, 0px) + clamp(86px, 10vw, 112px))",
          }}
        >
          <div className="hero-enter max-w-[640px]" style={{ "--he": 0 } as CSSProperties}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">MRCGP AKT</Badge>
              <Badge tone="green">Free question bank</Badge>
              <Badge>No card required</Badge>
            </div>

            <h1
              className="mt-5 text-[38px] leading-[1.02] md:text-[56px] lg:text-[64px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.045em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              Free AKT questions,{" "}
              <br />
              <span className="text-shine">mocks and explanations.</span>
            </h1>

            <p
              className="mt-5 max-w-[560px] text-[16px] leading-[1.65] md:text-[18px]"
              style={{ color: "rgba(232,236,255,.76)" }}
            >
              Practise MRCGP AKT-style SBAs with structured teaching
              explanations, timed mocks and basic progress tracking. No card
              required.
            </p>

            <p
              className="mt-3 max-w-[540px] text-[13px] leading-[1.6] md:text-[14px]"
              style={{ color: "rgba(232,236,255,.54)" }}
            >
              Questions, mocks and explanations stay free. Full audio revision
              is the optional paid upgrade.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <StartFreeLink
                sourceSurface={sourceSurface}
                placement="hero"
                className="btn-primary inline-block text-[15px]"
              />
              {!isCustomGptReturn ? (
                <ExplanationBuilderLink
                  sourceSurface={sourceSurface}
                  placement="hero"
                  className="btn-secondary inline-flex items-center text-[15px]"
                />
              ) : null}
            </div>
          </div>

          <GlassCard
            className="hero-enter p-4 md:p-5"
            style={{
              "--he": 1,
              background:
                "linear-gradient(145deg, rgba(17,19,26,.92), rgba(17,19,26,.66) 56%, rgba(109,106,232,.10))",
              border: "1px solid rgba(167,139,250,.16)",
            } as CSSProperties}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.20em]"
              style={{ color: "rgba(197,170,255,.86)" }}
            >
              Free Practice includes
            </div>

            <div className="mt-4 grid gap-3">
              {freePracticeIncludes.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/[.07] bg-white/[.035] px-4 py-3"
                >
                  <span className="text-[14px] font-semibold leading-[1.35]">
                    {item}
                  </span>
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{
                      color:
                        index === freePracticeIncludes.length - 1
                          ? "rgba(96,165,250,.82)"
                          : "rgba(52,211,153,.84)",
                    }}
                  >
                    {index === freePracticeIncludes.length - 1
                      ? "Included"
                      : "Free"}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-5 rounded-xl border px-4 py-3 text-[13px] leading-[1.55]"
              style={{
                color: "rgba(232,236,255,.68)",
                background: "rgba(52,211,153,.055)",
                borderColor: "rgba(52,211,153,.16)",
              }}
            >
              Built for quick question blocks, timed mocks and explanation
              review before you decide whether full audio revision helps.
            </div>

            <p
              className="mt-3 text-[12px] leading-[1.6]"
              style={{ color: "rgba(232,236,255,.52)" }}
            >
              21,000+ questions gives breadth; the value is in how each answer
              is explained.
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassCard
            className="p-5 md:p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(52,211,153,.075), rgba(17,19,26,.86) 46%, rgba(109,106,232,.07))",
              border: "1px solid rgba(52,211,153,.18)",
            }}
          >
            <div className="grid gap-5 md:grid-cols-[.82fr_1.18fr] md:items-center">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "rgba(52,211,153,.86)" }}
                >
                  Quick answer
                </p>
                <h2
                  className="mt-2 text-[24px] leading-[1.12] md:text-[32px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  What is AKT Navigator free practice?
                </h2>
              </div>
              <p
                className="text-[15px] leading-[1.75] md:text-[16px]"
                style={{ color: "rgba(232,236,255,.72)" }}
              >
                {FREE_PRACTICE_ANSWER}
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionHeader
            title="What stays free vs optional paid audio"
            body={
              <p>
                Questions, mocks and explanations stay free. Audio is separate,
                so the main action here is practice.
              </p>
            }
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <GlassCard
              className="p-5 md:p-6"
              style={{
                background:
                  "linear-gradient(145deg, rgba(17,19,26,.9), rgba(17,19,26,.66) 58%, rgba(52,211,153,.08))",
                border: "1px solid rgba(52,211,153,.16)",
              }}
            >
              <h3
                className="text-[20px] leading-[1.2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Always free
              </h3>
              <div className="mt-5">
                <FeatureList items={alwaysFreeFeatures} tone="green" />
              </div>
            </GlassCard>

            <GlassCard className="p-5 md:p-6">
              <h3
                className="text-[20px] leading-[1.2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Optional paid upgrade
              </h3>
              <div className="mt-5">
                <FeatureList items={optionalPaidAudioFeatures} tone="violet" />
              </div>
            </GlassCard>
          </div>

          <p
            className="mt-5 max-w-[760px] text-[14px] leading-[1.7]"
            style={{ color: "rgba(232,236,255,.58)" }}
          >
            You can use the question bank without paying. Full audio is there
            if audio revision helps you.
          </p>

          <GlassCard
            className="mt-5 p-5 md:p-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(109,106,232,.08), rgba(17,19,26,.84) 52%, rgba(52,211,153,.055))",
              border: "1px solid rgba(167,139,250,.14)",
            }}
          >
            <h3
              className="text-[20px] leading-[1.2]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why is it free?
            </h3>
            <p
              className="mt-3 max-w-[820px] text-[14px] leading-[1.7] md:text-[15px]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              We keep the practice layer free because the paid product is full
              audio revision. That lets trainees start questions and mocks
              without another upfront subscription, then upgrade only if audio
              genuinely helps their revision.
            </p>
          </GlassCard>
        </div>
      </section>

      {!isCustomGptReturn ? <FreeQuestionsLiveDemo /> : null}

      <section className="section-padding pt-0">
        <div className="container-x">
          <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="Explanation quality"
                title="Not just the answer - the clue, the trap and why the other options fail."
                body={
                  <p>
                    AKT Navigator explanations are designed to teach the
                    reasoning behind the answer, not just mark it right or
                    wrong.
                  </p>
                }
              />
              {!isCustomGptReturn ? (
                <div className="mt-6">
                  <ExplanationBuilderLink
                    sourceSurface={sourceSurface}
                    placement="explanation_quality"
                    className="btn-primary inline-block text-[14px]"
                  />
                </div>
              ) : null}
            </div>

            <GlassCard
              className="p-4 md:p-5"
              style={{
                background:
                  "linear-gradient(145deg, rgba(17,19,26,.88), rgba(17,19,26,.66) 58%, rgba(109,106,232,.07))",
                border: "1px solid rgba(167,139,250,.14)",
              }}
            >
              <div className="grid gap-0 overflow-hidden rounded-[14px] border border-white/[.07] sm:grid-cols-2">
                {explanationDifferenceItems.map((item, index) => (
                  <div
                    key={item}
                    className="grid grid-cols-[34px_1fr] gap-3 border-b border-white/[.06] bg-white/[.025] p-4 sm:even:border-l sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <span
                      className="flex h-[24px] w-[24px] items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        color:
                          index % 2 === 0
                            ? "rgba(52,211,153,.88)"
                            : "rgba(197,170,255,.84)",
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.08)",
                      }}
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <h3
                      className="text-[15px] font-semibold leading-[1.35]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item}
                    </h3>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section ref={sampleRef} className="section-padding pt-0">
        <div className="container-x">
          <SectionHeader
            eyebrow="Sample question"
            title="See the explanation style before you sign up."
            body={
              <>
                <p>
                  This is the difference between a thin answer key and an
                  explanation that helps you avoid the same trap next time.
                </p>
                <p className="mt-3">
                  A compact preview of the reasoning-first explanation format
                  used inside free AKT question practice.
                </p>
              </>
            }
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-[.94fr_1.06fr]">
            <GlassCard className="p-5 md:p-6">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.20em]"
                style={{ color: "rgba(96,165,250,.88)" }}
              >
                AKT-style SBA
              </p>
              <p
                className="mt-4 text-[15px] leading-[1.7]"
                style={{ color: "rgba(232,236,255,.84)" }}
              >
                {sampleFreeAktQuestion.question}
              </p>
              <ol
                className="mt-5 space-y-2 text-[14px] leading-[1.55]"
                style={{ color: "rgba(232,236,255,.64)" }}
              >
                {sampleFreeAktQuestion.options.map((option) => (
                  <li key={option}>{option}</li>
                ))}
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
              <p
                className="text-[11px] font-bold uppercase tracking-[0.20em]"
                style={{ color: "rgba(52,211,153,.86)" }}
              >
                Explanation preview
              </p>
              <p
                className="mt-3 text-[13px] leading-[1.6]"
                style={{ color: "rgba(232,236,255,.64)" }}
              >
                Inside AKT Navigator, questions are already explained in this
                style.
              </p>

              {[
                ["Correct answer", sampleFreeAktQuestion.correctAnswer],
                ["Key clue", sampleFreeAktQuestion.keyClue],
                ["Examiner trap", sampleFreeAktQuestion.examinerTrap],
                ["Why the near-miss is wrong", sampleFreeAktQuestion.nearMiss],
                ["AKT takeaway", sampleFreeAktQuestion.takeaway],
              ].map(([label, body]) => (
                <div key={label} className="mt-4 border-t border-white/[.07] pt-4">
                  <h3
                    className="text-[12px] font-bold uppercase tracking-[0.16em]"
                    style={{
                      color:
                        label === "Correct answer"
                          ? "rgba(52,211,153,.86)"
                          : "rgba(197,170,255,.84)",
                    }}
                  >
                    {label}
                  </h3>
                  <p
                    className="mt-1 text-[14px] leading-[1.65]"
                    style={{ color: "rgba(232,236,255,.72)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}

              <div className="mt-6">
                <StartFreeLink
                  sourceSurface={sourceSurface}
                  placement="sample"
                  className="btn-primary inline-block text-[14px]"
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassCard
            className="p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(109,106,232,.10), rgba(17,19,26,.88) 44%, rgba(52,211,153,.07))",
              border: "1px solid rgba(167,139,250,.18)",
            }}
          >
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2
                  className="text-[27px] leading-[1.12] md:text-[38px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.035em",
                  }}
                >
                  {isCustomGptReturn
                    ? "Ready to keep practising inside AKT Navigator?"
                    : "Want to test the explanation style on your own question?"}
                </h2>
                <p
                  className="mt-4 max-w-[720px] text-[15px] leading-[1.7] md:text-[16px]"
                  style={{ color: "rgba(232,236,255,.70)" }}
                >
                  {isCustomGptReturn
                    ? "You have already seen the explanation style in the Custom GPT. The next step is free AKT question practice with mocks, structured explanations and progress tracking."
                    : "Paste any AKT-style SBA into the free AKT Explanation Builder and get a teaching-card breakdown: key clues, examiner trap, near-miss answer, why-wrong explanations and a check-your-understanding prompt."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                {isCustomGptReturn ? (
                  <>
                    <StartFreeLink
                      sourceSurface={sourceSurface}
                      placement="comparison"
                      className="btn-primary inline-flex justify-center text-[14px]"
                    />
                    <ExplanationBuilderLink
                      sourceSurface={sourceSurface}
                      placement="builder_section"
                      className="inline-flex justify-center text-[13px] font-semibold text-white/55 transition hover:text-white/80"
                    >
                      Open the Explanation Builder again
                    </ExplanationBuilderLink>
                  </>
                ) : (
                  <>
                    <ExplanationBuilderLink
                      sourceSurface={sourceSurface}
                      placement="builder_section"
                      className="btn-primary inline-flex justify-center text-[14px]"
                    />
                    <StartFreeLink
                      sourceSurface={sourceSurface}
                      placement="comparison"
                      className="btn-secondary inline-flex justify-center text-[14px]"
                    >
                      Or start free AKT questions
                    </StartFreeLink>
                  </>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionHeader
            eyebrow="Transparent process"
            title="How the free question bank is built"
            body={
              <p>
                AKT Navigator uses an AI-assisted question and explanation
                pipeline. Questions are structured around AKT-relevant topics,
                checked through multiple automated review stages, and written
                to teach the reasoning behind the answer - not just mark it
                right or wrong.
              </p>
            }
          />

          <GlassCard
            className="mt-6 p-5 md:p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(17,19,26,.92), rgba(17,19,26,.72) 48%, rgba(52,211,153,.055))",
              border: "1px solid rgba(52,211,153,.14)",
            }}
          >
            <div className="grid gap-0 overflow-hidden rounded-[16px] border border-white/[.07] lg:grid-cols-4">
              {freeQuestionProcessSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="border-b border-white/[.06] bg-white/[.025] p-4 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{
                      color:
                        index === 0
                          ? "rgba(52,211,153,.86)"
                          : "rgba(197,170,255,.82)",
                    }}
                  >
                    Step {index + 1}
                  </p>
                  <h3
                    className="mt-2 text-[16px] font-semibold leading-[1.25]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-[13px] leading-[1.65]"
                    style={{ color: "rgba(232,236,255,.64)" }}
                  >
                    {step.body}
                  </p>
                </article>
              ))}
            </div>

            <p
              className="mt-5 text-[12px] font-semibold leading-[1.6]"
              style={{ color: "rgba(232,236,255,.66)" }}
            >
              {freeQuestionTrustStripItems.join(" · ")}
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionHeader
            eyebrow="Fit"
            title="Who is this best for?"
            body={
              <p>
                Use it as a free practice layer alongside whichever revision
                system gives you enough breadth, checking and confidence.
              </p>
            }
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <GlassCard
              className="p-5 md:p-6"
              style={{
                background:
                  "linear-gradient(145deg, rgba(17,19,26,.9), rgba(17,19,26,.66) 58%, rgba(52,211,153,.08))",
                border: "1px solid rgba(52,211,153,.16)",
              }}
            >
              <h3
                className="text-[20px] leading-[1.2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Use AKT Navigator free practice if
              </h3>
              <div className="mt-5">
                <FeatureList items={bestForItems} tone="green" />
              </div>
            </GlassCard>

            <GlassCard className="p-5 md:p-6">
              <h3
                className="text-[20px] leading-[1.2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                You may also want a conventional paid bank if
              </h3>
              <div className="mt-5">
                <FeatureList items={conventionalBankItems} tone="blue" />
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassCard className="p-5 md:p-7">
            <SectionHeader
              eyebrow="Facts"
              title="AKT Navigator free practice at a glance"
              body={
                <p>
                  A compact summary for GP trainees comparing free AKT question
                  banks, mocks and explanation quality.
                </p>
              }
            />

            <dl className="mt-6 grid gap-0 overflow-hidden rounded-[16px] border border-white/[.08] md:grid-cols-2">
              {freePracticeFacts.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 border-b border-white/[.06] bg-white/[.025] p-4 last:border-b-0 md:grid-cols-[150px_1fr] md:even:border-l md:last:border-b md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <dt
                    className="text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: "rgba(167,139,250,.82)" }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="text-[14px] leading-[1.55]"
                    style={{ color: "rgba(232,236,255,.74)" }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="FAQ" title="Free AKT questions FAQ" center />

          <GlassCard className="mt-6 p-0">
            <div className="grid gap-0 overflow-hidden rounded-[16px] md:grid-cols-2">
              {freeAktQuestionsFaqs.map((faq) => (
                <article
                  key={faq.question}
                  className="border-b border-white/[.06] bg-white/[.02] p-5 last:border-b-0 md:even:border-l md:[&:nth-last-child(-n+2)]:border-b-0"
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
                </article>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassCard
            className="p-6 text-center md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(109,106,232,.10), rgba(17,19,26,.88) 42%, rgba(236,72,153,.06))",
              border: "1px solid rgba(167,139,250,.18)",
            }}
          >
            <h2
              className="mx-auto max-w-[720px] text-[28px] leading-[1.12] md:text-[42px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
              }}
            >
              Start with free AKT questions. Upgrade only if audio helps.
            </h2>
            <p
              className="mx-auto mt-4 max-w-[640px] text-[15px] leading-[1.7] md:text-[16px]"
              style={{ color: "rgba(232,236,255,.70)" }}
            >
              Practise for free with AKT-style questions, timed mocks and
              structured explanations. No card required.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <StartFreeLink
                sourceSurface={sourceSurface}
                placement="final"
                className="btn-primary inline-block text-[15px]"
              />
              {!isCustomGptReturn ? (
                <ExplanationBuilderLink
                  sourceSurface={sourceSurface}
                  placement="builder_section"
                  className="btn-secondary inline-flex text-[15px]"
                />
              ) : null}
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
