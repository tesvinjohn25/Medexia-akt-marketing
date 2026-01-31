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
            {/* Wordmark kept subtle; never obstructs the phone */}
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

            {/* Start now — match app's neon border style (compact) */}
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

      {/* Bottom narration track (keeps phone screen unobstructed) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div
          className="absolute inset-x-0 bottom-0 h-[48vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(6,7,12,.92), rgba(6,7,12,.55) 40%, rgba(6,7,12,0) 100%)",
          }}
          aria-hidden
        />

        <div
          className="container-x relative"
          style={{
            // Editorial style: lift the narration away from the browser chrome.
            // We keep a generous bottom buffer to avoid iOS/Chrome toolbars.
            paddingTop: "44vh",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 96px)",
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
            <div
              className="text-[11px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: "rgba(167,139,250,.85)" }}
            >
              Built for the 10-minute gap
            </div>

            <div
              className="mt-3 text-[32px] leading-[1.06]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              Stop Revising Blindly.
            </div>

            <div className="mt-3 text-[15px] leading-[1.55]" style={{ color: "rgba(232,236,255,.78)" }}>
              High-yield clinical vignettes, predictive scoring, and deep-dive explanations.
            </div>

            <div className="mt-5 flex items-center gap-3" style={{ color: "rgba(232,236,255,.55)" }}>
              <div
                className="h-[34px] w-[22px] rounded-full border"
                style={{ borderColor: "rgba(255,255,255,.18)", position: "relative" }}
                aria-hidden
              >
                <div
                  className="h-[6px] w-[6px] rounded-full"
                  style={{
                    background: "rgba(255,255,255,.65)",
                    position: "absolute",
                    left: "50%",
                    top: 7,
                    transform: "translateX(-50%)",
                    animation: "heroDot 1.6s ease-in-out infinite",
                  }}
                />
              </div>
              <div className="text-[12px] tracking-[0.12em]">
                Scroll to take a test drive. No signup.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
