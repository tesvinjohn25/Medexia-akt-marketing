"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { canUseAnalytics } from "@/lib/consent/consent";
import { initMarketingAttribution } from "@/lib/marketing/attribution";
import { trackLandingEvent } from "@/lib/marketing/events";
import { nextSessionRecipeItems } from "@/data/free-akt-questions";

type SourceSurface = "free_questions_landing" | "custom_gpt_return";

export function AdaptivePracticeSection({
  sourceSurface,
}: {
  sourceSurface: SourceSurface;
}) {
  const { ref, visible } = useScrollReveal(0.18);
  const marketing = useMarketingAttribution();
  const viewedRef = useRef(false);

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

  return (
    <section
      id="adaptive-practice"
      className="section-padding relative overflow-hidden pt-0"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-10 h-[420px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side at 38% 26%, rgba(109,106,232,.12), transparent 72%), radial-gradient(closest-side at 72% 58%, rgba(52,211,153,.08), transparent 70%)",
          filter: "blur(22px)",
        }}
      />

      <div
        ref={ref}
        className={`container-x relative reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div
          className="card card-shimmer r-up grid gap-6 p-5 md:p-6 lg:grid-cols-[.86fr_1.14fr] lg:items-center"
          style={{
            "--i": 0,
            background:
              "linear-gradient(145deg, rgba(17,19,26,.94), rgba(17,19,26,.72) 52%, rgba(52,211,153,.07))",
            border: "1px solid rgba(167,139,250,.16)",
            boxShadow:
              "0 42px 120px rgba(0,0,0,.34), 0 0 80px rgba(109,106,232,.08)",
          } as CSSProperties}
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(167,139,250,.86)" }}
            >
              Adaptive practice
            </p>
            <h2
              className="mt-3 text-[27px] leading-[1.1] md:text-[36px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
              }}
            >
              Adaptive practice, not a random question shuffle.
            </h2>
            <p
              className="mt-4 max-w-[620px] text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              AKT Navigator uses your practice history to balance AKT blueprint
              coverage, weak areas, recent mistakes, unseen topics and question
              difficulty - so each session has a reason behind it.
            </p>
            <p
              className="mt-3 max-w-[600px] text-[13px] font-semibold leading-[1.6]"
              style={{ color: "rgba(232,236,255,.78)" }}
            >
              21,000+ questions gives breadth; adaptive practice helps decide
              what to do next.
            </p>
            <p
              className="mt-4 max-w-[600px] text-[12px] leading-[1.6]"
              style={{ color: "rgba(232,236,255,.52)" }}
            >
              Readiness estimates are revision guidance, not a guarantee of
              exam performance. They become more useful as you answer more
              questions.
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-[18px] border border-white/[.08] bg-white/[.025] p-4 md:p-5"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-20"
              aria-hidden
              style={{
                background:
                  "radial-gradient(closest-side, rgba(52,211,153,.14), transparent 72%)",
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
                    className="text-[23px] leading-[1.12] md:text-[28px]"
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

              <div className="mt-5 overflow-hidden rounded-[14px] border border-white/[.07] bg-black/[.10]">
                {nextSessionRecipeItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="grid grid-cols-[10px_1fr] gap-3 border-b border-white/[.06] px-3 py-3 last:border-b-0"
                  >
                    <span
                      className="mt-[6px] h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          index === 0 || index === 3
                            ? "rgba(52,211,153,.85)"
                            : "rgba(197,170,255,.82)",
                        boxShadow:
                          index === 0 || index === 3
                            ? "0 0 14px rgba(52,211,153,.35)"
                            : "0 0 14px rgba(167,139,250,.30)",
                      }}
                      aria-hidden
                    />
                    <div>
                      <h4
                        className="text-[13px] font-semibold leading-[1.3]"
                        style={{
                          color:
                            index === 0 || index === 3
                              ? "rgba(52,211,153,.9)"
                              : "rgba(197,170,255,.86)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="mt-1 text-[12px] leading-[1.55]"
                        style={{ color: "rgba(232,236,255,.58)" }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 rounded-[14px] border px-4 py-3 text-[13px] font-semibold leading-[1.55]"
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
