"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { canUseAnalytics } from "@/lib/consent/consent";
import { initMarketingAttribution } from "@/lib/marketing/attribution";
import { trackLandingEvent } from "@/lib/marketing/events";
import {
  adaptivePracticeItems,
  nextSessionRecipeItems,
} from "@/data/free-akt-questions";

type SourceSurface = "free_questions_landing" | "custom_gpt_return";

function trackAdaptivePracticeEvent(
  eventName: string,
  properties: Record<string, unknown>,
) {
  if (!canUseAnalytics()) return;
  initMarketingAttribution();
  trackLandingEvent(eventName, properties);
}

export function AdaptivePracticeSection({
  sourceSurface,
}: {
  sourceSurface: SourceSurface;
}) {
  const { ref, visible } = useScrollReveal(0.18);
  const marketing = useMarketingAttribution();
  const viewedRef = useRef(false);
  const isCustomGptReturn = sourceSurface === "custom_gpt_return";

  useEffect(() => {
    if (!visible || viewedRef.current || !canUseAnalytics()) return;
    initMarketingAttribution();
    trackLandingEvent("free_akt_questions_adaptive_practice_viewed", {
      page: "free_akt_questions",
      section: "adaptive_practice",
      source: sourceSurface,
    });
    viewedRef.current = true;
  }, [visible, marketing?.mx_session_id, marketing?.offer_context.offer_id, sourceSurface]);

  const handleBuilderClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented) return;
    trackAdaptivePracticeEvent("free_akt_questions_explanation_builder_clicked", {
      page: "free_akt_questions",
      placement: "adaptive_practice",
      source: sourceSurface,
    });
  };

  return (
    <section
      id="adaptive-practice"
      className="section-padding relative overflow-hidden pt-0"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-10 h-[500px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side at 36% 24%, rgba(109,106,232,.14), transparent 72%), radial-gradient(closest-side at 68% 54%, rgba(52,211,153,.08), transparent 70%)",
          filter: "blur(22px)",
        }}
      />

      <div
        ref={ref}
        className={`container-x relative reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="grid gap-8 lg:grid-cols-[.98fr_1.02fr] lg:items-center">
          <div className="max-w-[650px]">
            <p
              className="r-blur text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(167,139,250,.86)", "--i": 0 } as CSSProperties}
            >
              Adaptive practice
            </p>
            <h2
              className="r-up mt-3 text-[28px] leading-[1.1] md:text-[40px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
                "--i": 1,
              } as CSSProperties}
            >
              Adaptive practice, not a random question shuffle.
            </h2>
            <p
              className="r-up mt-4 max-w-[600px] text-[15px] leading-[1.7] md:text-[16px]"
              style={{ color: "rgba(232,236,255,.68)", "--i": 2 } as CSSProperties}
            >
              AKT Navigator does not simply serve the next random question. It
              uses your practice history to balance AKT blueprint coverage,
              weak areas, recent mistakes, unseen topics and question
              difficulty - so each session has a reason behind it.
            </p>
            <p
              className="r-up mt-3 max-w-[580px] text-[14px] font-semibold leading-[1.65]"
              style={{ color: "rgba(232,236,255,.78)", "--i": 3 } as CSSProperties}
            >
              21,000+ questions gives you breadth; adaptive practice helps
              decide what to do next.
            </p>

            <div
              className="r-up mt-6 grid gap-0 overflow-hidden rounded-[16px] border border-white/[.08]"
              style={{ "--i": 4 } as CSSProperties}
            >
              {adaptivePracticeItems.map((item, index) => (
                <div
                  key={item.title}
                  className="grid gap-2 border-b border-white/[.06] bg-white/[.025] p-4 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-4"
                >
                  <h3
                    className="text-[14px] font-semibold leading-[1.3]"
                    style={{
                      color:
                        index % 2 === 0
                          ? "rgba(52,211,153,.88)"
                          : "rgba(197,170,255,.88)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[13px] leading-[1.6]"
                    style={{ color: "rgba(232,236,255,.64)" }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="r-up mt-4 max-w-[600px] text-[12px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.52)", "--i": 5 } as CSSProperties}
            >
              Readiness estimates are revision guidance, not a guarantee. They
              become more useful as you answer more questions.
            </p>

            <div
              className="r-up mt-6 flex flex-wrap items-center gap-4"
              style={{ "--i": 6 } as CSSProperties}
            >
              <TrackedAppLink
                href="/join/free"
                intent="start_free"
                className="btn-primary inline-block text-[14px]"
                extraTrackingEvents={[
                  {
                    eventName: "free_akt_questions_start_free_clicked",
                    properties: {
                      page: "free_akt_questions",
                      placement: "adaptive_practice",
                      source: sourceSurface,
                    },
                  },
                ]}
              >
                Start free AKT questions
              </TrackedAppLink>
              {!isCustomGptReturn ? (
                <a
                  href="/akt-explanation-builder"
                  onClick={handleBuilderClick}
                  className="text-[13px] font-semibold transition-colors hover:text-white"
                  style={{ color: "rgba(197,170,255,.88)" }}
                >
                  Try the Explanation Builder
                </a>
              ) : null}
            </div>
          </div>

          <div
            className="r-up card card-shimmer relative overflow-hidden p-5 md:p-6"
            style={{
              "--i": 3,
              background:
                "linear-gradient(145deg, rgba(17,19,26,.94), rgba(17,19,26,.70) 54%, rgba(52,211,153,.075))",
              border: "1px solid rgba(167,139,250,.16)",
              boxShadow:
                "0 42px 120px rgba(0,0,0,.36), 0 0 80px rgba(109,106,232,.10)",
            } as CSSProperties}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-24"
              aria-hidden
              style={{
                background:
                  "radial-gradient(closest-side, rgba(52,211,153,.15), transparent 72%)",
                filter: "blur(18px)",
              }}
            />

            <div className="relative">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.20em]"
                style={{ color: "rgba(52,211,153,.86)" }}
              >
                Next session recipe
              </p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3
                    className="text-[24px] leading-[1.12] md:text-[30px]"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Your next 15-question session
                  </h3>
                  <p
                    className="mt-2 text-[13px] leading-[1.6]"
                    style={{ color: "rgba(232,236,255,.62)" }}
                  >
                    Built from coverage, weak spots and recency.
                  </p>
                </div>
                <span
                  className="rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    color: "rgba(197,170,255,.86)",
                    background: "rgba(109,106,232,.09)",
                    borderColor: "rgba(167,139,250,.18)",
                  }}
                >
                  Adaptive
                </span>
              </div>

              <div
                className="mt-5 flex h-2 overflow-hidden rounded-full bg-white/[.06]"
                aria-hidden
              >
                <span className="basis-[24%] bg-emerald-300/80" />
                <span className="basis-[20%] bg-violet-300/80" />
                <span className="basis-[18%] bg-blue-300/75" />
                <span className="basis-[22%] bg-emerald-200/70" />
                <span className="basis-[16%] bg-violet-200/70" />
              </div>

              <div className="mt-5 grid gap-0 overflow-hidden rounded-[16px] border border-white/[.07]">
                {nextSessionRecipeItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="grid grid-cols-[34px_1fr] gap-3 border-b border-white/[.06] bg-white/[.025] p-4 last:border-b-0"
                  >
                    <span
                      className="mt-0.5 flex h-[24px] w-[24px] items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        color:
                          index === 0 || index === 3
                            ? "rgba(52,211,153,.9)"
                            : "rgba(197,170,255,.86)",
                        background: "rgba(255,255,255,.045)",
                        border: "1px solid rgba(255,255,255,.08)",
                      }}
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h4
                        className="text-[14px] font-semibold leading-[1.3]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="mt-1 text-[13px] leading-[1.6]"
                        style={{ color: "rgba(232,236,255,.62)" }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 rounded-[14px] border px-4 py-3 text-[13px] font-semibold leading-[1.55]"
                style={{
                  color: "rgba(232,236,255,.72)",
                  background: "rgba(52,211,153,.055)",
                  borderColor: "rgba(52,211,153,.16)",
                }}
              >
                Not random. Not fixed order. Built to move revision forward.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
