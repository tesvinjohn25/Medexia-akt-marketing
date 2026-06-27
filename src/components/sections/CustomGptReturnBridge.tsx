"use client";

import { useEffect, useRef } from "react";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { useMarketingAttribution } from "@/components/marketing/MarketingAttributionProvider";
import { canUseAnalytics } from "@/lib/consent/consent";
import { initMarketingAttribution } from "@/lib/marketing/attribution";
import { trackLandingEvent } from "@/lib/marketing/events";

export function CustomGptReturnBridge() {
  const marketing = useMarketingAttribution();
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current || !canUseAnalytics()) return;
    initMarketingAttribution();
    trackLandingEvent("custom_gpt_return_landed", {
      page: "free",
      source: "custom_gpt",
      medium: "gpt_footer",
      campaign: "akt_explanation_builder",
      content: "short_free_link",
    });
    trackedRef.current = true;
  }, [marketing?.mx_session_id, marketing?.offer_context.offer_id]);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "calc(100svh - 1px)",
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 96px)",
      }}
    >
      <div className="hero-noise" />
      <div
        className="container-x flex items-center py-12"
        style={{ minHeight: "calc(100svh - 180px)" }}
      >
        <div className="mx-auto w-full max-w-[720px] text-center">
          <div
            className="mx-auto inline-flex rounded-md border px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{
              color: "rgba(197,170,255,.9)",
              background: "rgba(167,139,250,.08)",
              borderColor: "rgba(167,139,250,.18)",
            }}
          >
            AKT Navigator
          </div>

          <div
            className="card card-shimmer mt-5 p-6 md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(109,106,232,.10), rgba(17,19,26,.9) 44%, rgba(52,211,153,.07))",
              border: "1px solid rgba(167,139,250,.18)",
            }}
          >
            <h1
              className="text-[34px] leading-[1.05] md:text-[48px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
              }}
            >
              Start free AKT questions
            </h1>
            <p
              className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.7] md:text-[17px]"
              style={{ color: "rgba(232,236,255,.72)" }}
            >
              AKT Navigator has free AKT questions, mocks and structured
              explanations, plus audio revision for commutes, walks and tired
              evenings.
            </p>

            <div className="mt-7 flex flex-col items-center gap-4">
              <TrackedAppLink
                href="/join/free"
                intent="start_free"
                className="btn-primary inline-block text-[15px]"
                extraTrackingEvents={[
                  {
                    eventName: "custom_gpt_return_start_free_clicked",
                    properties: {
                      page: "free",
                      placement: "bridge",
                      source: "custom_gpt",
                      medium: "gpt_footer",
                      campaign: "akt_explanation_builder",
                    },
                  },
                ]}
              >
                Start free practice
              </TrackedAppLink>

              <a
                href="/"
                className="text-[14px] font-semibold transition-colors hover:text-white"
                style={{ color: "rgba(197,170,255,.84)" }}
              >
                Learn more about AKT Navigator
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
