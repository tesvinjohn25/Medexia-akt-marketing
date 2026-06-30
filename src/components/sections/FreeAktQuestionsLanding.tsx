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
import {
  AnimatedBulletList,
  AnimatedStepList,
} from "@/components/AnimatedBulletList";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import { AdaptivePracticeSection } from "@/components/sections/AdaptivePracticeSection";
import { FreeQuestionsHeroLoop } from "@/components/sections/FreeQuestionsHeroLoop";
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
  optionalPaidAudioFeatures,
  sampleFreeAktQuestion,
} from "@/data/free-akt-questions";

type SourceSurface = "free_questions_landing" | "custom_gpt_return";
type StartPlacement = "hero" | "sample" | "comparison" | "final";
type BuilderPlacement = "hero" | "explanation_quality" | "builder_section";
type ContentGovernancePlacement = "transparent_process" | "facts";
type AudioUpgradePlacement = "comparison";

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
      className="animated-bullet-dot mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
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

function ContentGovernanceLink({
  sourceSurface,
  placement,
  className,
  style,
  children = "Read how AKT Navigator questions are built",
}: {
  sourceSurface: SourceSurface;
  placement: ContentGovernancePlacement;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || !canUseAnalytics()) return;
    initMarketingAttribution();
    trackLandingEvent("free_akt_questions_content_governance_clicked", {
      page: "free_akt_questions",
      source: sourceSurface,
      placement,
    });
  };

  return (
    <a
      href="/content-governance"
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

function AudioPlatformLink({
  sourceSurface,
  placement,
  className,
  style,
  children = "See the full AKT Navigator audio revision platform",
}: {
  sourceSurface: SourceSurface;
  placement: AudioUpgradePlacement;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || !canUseAnalytics()) return;
    initMarketingAttribution();
    trackLandingEvent("free_akt_questions_audio_upgrade_clicked", {
      page: "free_akt_questions",
      source: sourceSurface,
      placement,
      destination: "home_audio_landing",
    });
  };

  return (
    <a href="/" onClick={onClick} className={className} style={style}>
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
    <AnimatedBulletList className="grid gap-3">
      {items.map((item, index) => (
        <li
          key={item}
          className="animated-bullet-item flex gap-3 text-[14px] leading-[1.55]"
          style={
            {
              "--bullet-delay": `${Math.min(index * 70, 420)}ms`,
            } as CSSProperties
          }
        >
          <Dot tone={tone} />
          <span
            className="animated-bullet-text"
            style={{ color: "rgba(232,236,255,.72)" }}
          >
            {item}
          </span>
        </li>
      ))}
    </AnimatedBulletList>
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
          className="container-x relative z-[1] grid gap-7 pb-8 md:grid-cols-[1.05fr_.95fr] md:items-center md:gap-12 md:pb-10"
          style={{
            paddingTop:
              "calc(env(safe-area-inset-top, 0px) + clamp(86px, 10vw, 112px))",
          }}
        >
          <div
            className="hero-enter order-2 max-w-[640px] md:order-1"
            style={{ "--he": 1 } as CSSProperties}
          >
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

          <div
            className="hero-enter order-1 -mx-1 md:order-2 md:mx-0"
            style={{ "--he": 0 } as CSSProperties}
          >
            <FreeQuestionsHeroLoop />
          </div>
        </div>
      </section>

      <section className="pb-7 md:pb-8">
        <div className="container-x">
          <GlassCard
            className="p-3.5 md:p-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(52,211,153,.075), rgba(17,19,26,.86) 46%, rgba(109,106,232,.07))",
              border: "1px solid rgba(52,211,153,.18)",
            }}
          >
            <div className="grid gap-2 md:grid-cols-[120px_1fr] md:items-center">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "rgba(52,211,153,.86)" }}
                >
                  In short
                </p>
              </div>
              <p
                className="text-[13px] leading-[1.6] md:text-[14px]"
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
                The question bank is the free entry point. Full audio revision
                is separate and optional.
              </p>
            }
          />

          <GlassCard
            className="mt-6 p-5 md:p-6"
            style={{
              background:
                "linear-gradient(145deg, rgba(17,19,26,.9), rgba(17,19,26,.70) 58%, rgba(52,211,153,.06))",
              border: "1px solid rgba(52,211,153,.15)",
            }}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3
                  className="text-[19px] leading-[1.2]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Always free
                </h3>
                <div className="mt-4">
                  <FeatureList items={alwaysFreeFeatures} tone="green" />
                </div>
              </div>

              <div className="border-t border-white/[.08] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <h3
                  className="text-[19px] leading-[1.2]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Optional paid upgrade
                </h3>
                <div className="mt-4">
                  <FeatureList items={optionalPaidAudioFeatures} tone="violet" />
                </div>
                {!isCustomGptReturn ? (
                  <div
                    className="mt-5 rounded-xl border px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,.025)",
                      borderColor: "rgba(167,139,250,.12)",
                    }}
                  >
                    <p
                      className="text-[13px] font-semibold leading-[1.45]"
                      style={{ color: "rgba(232,236,255,.78)" }}
                    >
                      Want audio-first revision too?
                    </p>
                    <AudioPlatformLink
                      sourceSurface={sourceSurface}
                      placement="comparison"
                      className="mt-1.5 inline-flex text-[13px] font-semibold leading-[1.5] transition-colors hover:text-white"
                      style={{ color: "rgba(197,170,255,.9)" }}
                    >
                      See the full AKT Navigator audio revision platform →
                    </AudioPlatformLink>
                  </div>
                ) : null}
              </div>
            </div>

            <div
              className="mt-6 rounded-xl border px-4 py-3 text-[13px] leading-[1.6]"
              style={{
                color: "rgba(232,236,255,.62)",
                background: "rgba(255,255,255,.025)",
                borderColor: "rgba(255,255,255,.07)",
              }}
            >
              You can use the question bank without paying. We keep the
              practice layer free because the paid product is full audio
              revision. Start questions and mocks without another upfront
              subscription, then upgrade only if audio genuinely helps.
            </div>

            <p
              className="mt-4 text-[13px] leading-[1.6]"
              style={{ color: "rgba(232,236,255,.54)" }}
            >
              AKT Navigator has two main routes: this page is the canonical
              free MRCGP AKT question bank, while the{" "}
              <a
                href="/"
                className="font-semibold transition-colors hover:text-white"
                style={{ color: "rgba(197,170,255,.88)" }}
              >
                AKT Navigator homepage
              </a>{" "}
              explains the broader audio-first AKT revision platform.
            </p>
          </GlassCard>
        </div>
      </section>

      {!isCustomGptReturn ? <FreeQuestionsLiveDemo /> : null}

      <section ref={sampleRef} className="section-padding pt-0">
        <div className="container-x">
          <div className="grid gap-7 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <SectionHeader
                eyebrow="Explanation quality"
                title="Not just the answer - the clue, the trap and why the other options fail."
                body={
                  <p>
                    This is the difference between a thin answer key and an
                    explanation that helps you avoid the same trap next time.
                  </p>
                }
              />

              <AnimatedStepList className="mt-6 overflow-hidden rounded-[16px] border border-white/[.08]">
                {explanationDifferenceItems.map((item, index) => (
                  <div
                    key={item}
                    className="animated-step-item grid grid-cols-[30px_1fr] gap-3 border-b border-white/[.06] bg-white/[.025] px-4 py-3 last:border-b-0"
                    style={
                      {
                        "--bullet-delay": `${Math.min(index * 70, 420)}ms`,
                      } as CSSProperties
                    }
                  >
                    <span
                      className="animated-step-marker mt-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full text-[10px] font-bold"
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
                      className="animated-step-text text-[14px] font-semibold leading-[1.35]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item}
                    </h3>
                  </div>
                ))}
              </AnimatedStepList>

              <div className="mt-6 flex flex-wrap gap-3">
                <StartFreeLink
                  sourceSurface={sourceSurface}
                  placement="sample"
                  className="btn-primary inline-block text-[14px]"
                />
                {isCustomGptReturn ? (
                  <ExplanationBuilderLink
                    sourceSurface={sourceSurface}
                    placement="builder_section"
                    className="inline-flex items-center text-[13px] font-semibold text-white/55 transition hover:text-white/80"
                  >
                    Open the Explanation Builder again
                  </ExplanationBuilderLink>
                ) : (
                  <ExplanationBuilderLink
                    sourceSurface={sourceSurface}
                    placement="explanation_quality"
                    className="btn-secondary inline-flex items-center text-[14px]"
                  />
                )}
              </div>
            </div>

            <GlassCard
              className="p-5 md:p-6"
              style={{
                background:
                  "linear-gradient(145deg, rgba(17,19,26,.9), rgba(17,19,26,.68) 56%, rgba(52,211,153,.07))",
                border: "1px solid rgba(52,211,153,.16)",
              }}
            >
              <div className="grid gap-5 xl:grid-cols-[.92fr_1.08fr]">
                <div>
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
                </div>

                <div>
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
                    Inside AKT Navigator, questions are already explained in
                    this style.
                  </p>

                  {[
                    ["Correct answer", sampleFreeAktQuestion.correctAnswer],
                    ["Key clue", sampleFreeAktQuestion.keyClue],
                    ["Examiner trap", sampleFreeAktQuestion.examinerTrap],
                    [
                      "Why the near-miss is wrong",
                      sampleFreeAktQuestion.nearMiss,
                    ],
                    ["AKT takeaway", sampleFreeAktQuestion.takeaway],
                  ].map(([label, body]) => (
                    <div
                      key={label}
                      className="mt-4 border-t border-white/[.07] pt-4"
                    >
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
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {!isCustomGptReturn ? (
        <AdaptivePracticeSection sourceSurface={sourceSurface} />
      ) : null}

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassCard
            className="p-5 md:p-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(17,19,26,.92), rgba(17,19,26,.72) 48%, rgba(52,211,153,.055))",
              border: "1px solid rgba(52,211,153,.14)",
            }}
          >
            <div className="grid gap-7 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "rgba(167,139,250,.85)" }}
                >
                  Transparent process
                </p>
                <h2
                  className="mt-2 text-[26px] leading-[1.12] md:text-[34px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  How the free question bank is built
                </h2>
                <p
                  className="mt-4 text-[14px] leading-[1.7] md:text-[15px]"
                  style={{ color: "rgba(232,236,255,.68)" }}
                >
                  AKT Navigator uses an AI-assisted question and explanation
                  pipeline. Questions are drafted as AKT-style SBAs, the marked
                  answer is checked from a UK primary-care perspective, stems
                  are hardened to test reasoning, and explanations are
                  structured around the key clue, trap, wrong answers and AKT
                  learning point.
                </p>
                <p
                  className="mt-3 text-[13px] leading-[1.65]"
                  style={{ color: "rgba(232,236,255,.54)" }}
                >
                  The question bank is for AKT exam revision only. AKT Navigator
                  is independent and is not affiliated with or endorsed by the
                  RCGP. If something looks wrong, users can flag it for review.
                </p>

                <div
                  className="mt-5 rounded-xl border px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,.025)",
                    borderColor: "rgba(255,255,255,.08)",
                  }}
                >
                  <h3
                    className="text-[15px] leading-[1.25]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Want the detail?
                  </h3>
                  <p
                    className="mt-1.5 text-[13px] leading-[1.6]"
                    style={{ color: "rgba(232,236,255,.60)" }}
                  >
                    Read how AKT Navigator questions are drafted,
                    answer-checked, hardened, explained, reported and
                    corrected.
                  </p>
                  <ContentGovernanceLink
                    sourceSurface={sourceSurface}
                    placement="transparent_process"
                    className="mt-3 inline-flex text-[13px] font-semibold transition-colors hover:text-white"
                    style={{ color: "rgba(197,170,255,.9)" } as CSSProperties}
                  >
                    Read how AKT Navigator questions are built →
                  </ContentGovernanceLink>
                </div>
              </div>

              <AnimatedStepList
                as="ol"
                className="overflow-hidden rounded-[16px] border border-white/[.07]"
              >
                {freeQuestionProcessSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="animated-step-item grid grid-cols-[42px_1fr] gap-3 border-b border-white/[.06] bg-white/[.025] p-4 last:border-b-0"
                    style={
                      {
                        "--bullet-delay": `${Math.min(index * 70, 420)}ms`,
                      } as CSSProperties
                    }
                  >
                    <span
                      className="animated-step-marker text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{
                        color:
                          index === 0
                            ? "rgba(52,211,153,.86)"
                            : "rgba(197,170,255,.82)",
                      }}
                      aria-hidden
                    >
                      0{index + 1}
                    </span>
                    <div className="animated-step-text">
                      <h3
                        className="text-[15px] font-semibold leading-[1.25]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="mt-1.5 text-[13px] leading-[1.55]"
                        style={{ color: "rgba(232,236,255,.62)" }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </AnimatedStepList>
            </div>

            <p
              className="mt-5 border-t border-white/[.07] pt-4 text-[12px] font-semibold leading-[1.6]"
              style={{ color: "rgba(232,236,255,.66)" }}
            >
              {freeQuestionTrustStripItems.join(" · ")}
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassCard
            className="p-5 md:p-6"
            style={{
              background:
                "linear-gradient(145deg, rgba(17,19,26,.92), rgba(17,19,26,.72) 54%, rgba(109,106,232,.06))",
              border: "1px solid rgba(167,139,250,.14)",
            }}
          >
            <div className="grid gap-7 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "rgba(167,139,250,.85)" }}
                >
                  Fit
                </p>
                <h2
                  className="mt-2 text-[25px] leading-[1.12] md:text-[32px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Who this is best for
                </h2>
                <p
                  className="mt-3 text-[14px] leading-[1.65]"
                  style={{ color: "rgba(232,236,255,.62)" }}
                >
                  Use it as a free practice layer alongside whichever revision
                  system gives you enough breadth, checking and confidence.
                </p>

                <div className="mt-5 grid gap-5">
                  <div>
                    <h3
                      className="text-[17px] leading-[1.2]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Use AKT Navigator free practice if
                    </h3>
                    <div className="mt-4">
                      <FeatureList items={bestForItems} tone="green" />
                    </div>
                  </div>

                  <details className="group border-t border-white/[.08] pt-4">
                    <summary
                      className="cursor-pointer text-[15px] font-semibold leading-[1.35] transition-colors hover:text-white focus:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-violet-300/40 [&::-webkit-details-marker]:hidden"
                      style={{
                        color: "rgba(232,236,255,.78)",
                        fontFamily: "var(--font-display)",
                        listStyle: "none",
                      }}
                    >
                      You may also want a conventional paid bank if
                    </summary>
                    <div className="mt-4">
                      <FeatureList items={conventionalBankItems} tone="blue" />
                    </div>
                  </details>
                </div>
              </div>

              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "rgba(167,139,250,.85)" }}
                >
                  Facts
                </p>
                <h2
                  className="mt-2 text-[25px] leading-[1.12] md:text-[32px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  At a glance
                </h2>
                <p
                  className="mt-3 text-[14px] leading-[1.65]"
                  style={{ color: "rgba(232,236,255,.62)" }}
                >
                  A compact summary for GP trainees comparing free AKT question
                  banks, mocks and explanation quality.
                </p>

                <dl
                  className="mt-5 grid gap-0 overflow-hidden rounded-[16px] border border-white/[.08]"
                >
                  {freePracticeFacts.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid gap-2 border-b border-white/[.06] bg-white/[.025] px-4 py-3 last:border-b-0 md:grid-cols-[142px_1fr]"
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
                        {label === "Content governance" ? (
                          <>
                            {value}{" "}
                            <ContentGovernanceLink
                              sourceSurface={sourceSurface}
                              placement="facts"
                              className="font-semibold transition-colors hover:text-white"
                              style={
                                { color: "rgba(197,170,255,.9)" } as CSSProperties
                              }
                            >
                              Read how questions are built.
                            </ContentGovernanceLink>
                          </>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionHeader
            eyebrow="FAQ"
            title="Free AKT questions FAQ"
            body={
              <p>
                The detail is here for trainees comparing resources. Open the
                questions that matter to you.
              </p>
            }
            center
          />

          <GlassCard className="mt-6 p-0">
            <div className="overflow-hidden rounded-[16px]">
              {freeAktQuestionsFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border-b border-white/[.06] bg-white/[.02] last:border-b-0"
                >
                  <summary
                    className="grid cursor-pointer grid-cols-[1fr_24px] items-center gap-4 px-5 py-4 text-[16px] font-semibold leading-[1.3] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/40 [&::-webkit-details-marker]:hidden"
                    style={{
                      color: "rgba(232,236,255,.82)",
                      fontFamily: "var(--font-display)",
                      listStyle: "none",
                    }}
                  >
                    {faq.question}
                    <span
                      className="text-right text-[18px] leading-none text-white/45 transition group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="px-5 pb-5 pt-0 text-[14px] leading-[1.7]"
                    style={{ color: "rgba(232,236,255,.66)" }}
                  >
                    {faq.answer}
                  </p>
                </details>
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
