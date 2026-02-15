"use client";

import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function HeroNarration({
  progress,
  demoUrl,
}: {
  progress: number;
  demoUrl: string;
}) {
  // Keep brand visible a bit longer; fade out smoothly once the user is engaged.
  const brandFade = clamp(1 - Math.max(0, progress - 0.12) / 0.38, 0, 1);

  // Hero text fades out as we approach the demo section
  const heroTextFade = clamp(1 - Math.max(0, progress - 0.85) / 0.12, 0, 1);

  return (
    <>
      {/* Top bar: wordmark (fades out) + CTA */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-30"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <div className="container-x flex items-center justify-between">
          <div
            className="pointer-events-none"
            style={{
              opacity: brandFade,
              transform: brandFade > 0.01 ? "translateY(0px)" : "translateY(-6px)",
              transition: "opacity 260ms ease, transform 260ms ease",
              filter: "drop-shadow(0 18px 45px rgba(0,0,0,.45))",
            }}
            aria-hidden
          >
            <div
              style={{
                display: "inline-block",
                padding: 6,
                borderRadius: 14,
                background: "radial-gradient(60px 40px at 50% 40%, rgba(6,7,12,.48), rgba(6,7,12,0))",
                backdropFilter: "blur(10px)",
              }}
            >
              <img
                src="/brand/wordmark.jpg"
                alt="Medexia"
                style={{ height: 32, width: "auto", opacity: 0.90 }}
              />
            </div>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <a
              href={"https://app.medexia-akt.com"}
              className="rounded-full border px-3 py-[10px] text-sm font-semibold"
              style={{
                borderColor: "rgba(255,255,255,.14)",
                background: "rgba(6,7,12,.28)",
                backdropFilter: "blur(14px)",
                color: "rgba(245,247,255,.86)",
              }}
            >
              Log in
            </a>

            <a
              href={demoUrl}
              className="relative rounded-2xl transition-all duration-300 overflow-visible hover:scale-[1.01] active:scale-[0.99]"
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span
                className="absolute inset-0 rounded-2xl p-[2px]"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #a78bfa 30%, #ec4899 70%, #f472b6 100%)",
                }}
                aria-hidden
              >
                <span className="block h-full w-full rounded-[14px]" style={{ background: "rgba(2,6,23,.92)" }} />
              </span>
              <span className="relative z-10 flex items-center justify-center gap-2 py-[10px] px-[14px]">
                <span className="text-sm font-semibold text-white">Start now</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom narration track - MOVED UP to avoid Chrome nav bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div
          className="absolute inset-x-0 bottom-0 h-[55vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(6,7,12,.95), rgba(6,7,12,.55) 45%, rgba(6,7,12,0) 100%)",
          }}
          aria-hidden
        />

        <div
          className="container-x relative"
          style={{
            // Moved UP significantly to avoid Chrome bottom nav
            paddingTop: "35vh",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 140px)",
          }}
        >
          <div
            className="max-w-[560px]"
            style={{
              opacity: heroTextFade,
              transform: heroTextFade > 0.01 ? "translateY(0px)" : "translateY(8px)",
              transition: "opacity 200ms ease, transform 200ms ease",
            }}
          >
            {/* Single badge line: exam + cohort */}
            <div className="flex items-center gap-2 flex-wrap">
              <div
                className="inline-flex items-center rounded-md px-2 py-[3px]"
                style={{
                  background: "rgba(96,165,250,.08)",
                  border: "1px solid rgba(96,165,250,.18)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-bold"
                  style={{ color: "rgba(96,165,250,.9)" }}
                >
                  MRCGP AKT
                </span>
              </div>
              <span
                className="text-[10px] tracking-[0.06em] font-medium"
                style={{ color: "rgba(232,236,255,.35)" }}
              >
                &middot;
              </span>
              <span
                className="text-[10px] tracking-[0.12em] uppercase font-semibold"
                style={{ color: "rgba(167,139,250,.7)" }}
              >
                April &amp; July Founding Cohort
              </span>
            </div>

            <div
              className="mt-3 text-[28px] leading-[1.08]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              Know Exactly What to Revise Next.
            </div>

            <div className="mt-2.5 text-[15px] leading-[1.5]" style={{ color: "rgba(232,236,255,.7)" }}>
              AKT revision that adapts to your weak spots. Built for busy trainees.
            </div>

            <div className="mt-4 flex items-center gap-2.5" style={{ color: "rgba(232,236,255,.45)" }}>
              <div
                className="h-8 w-5 rounded-full border-[1.5px] flex items-start justify-center pt-1"
                style={{ borderColor: "rgba(255,255,255,.18)" }}
                aria-hidden
              >
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,.55)",
                    animation: "heroDot 1.6s ease-in-out infinite",
                  }}
                />
              </div>
              <div className="text-[11px] tracking-[0.1em]">
                Scroll to explore
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
