"use client";

import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

// NEW: 5 sections synced to the EDL-based video
function stepFromProgress(p: number) {
  if (p < 0.20) return 0;      // Section 1: Dashboard
  if (p < 0.35) return 1;      // Section 2: The Question
  if (p < 0.60) return 2;      // Section 3: The Moat
  if (p < 0.85) return 3;      // Section 4: AI Tutor
  return 4;                     // Section 5: History
}

// Copy for each section per the brief
const SECTIONS = [
  {
    tagline: "Built for the 10-minute gap",
    headline: "Stop Revising Blindly.",
    subtext: "High-yield clinical vignettes, predictive scoring, and deep-dive explanations. See why 5 questions here is worth 50 elsewhere.",
  },
  {
    tagline: "The 10-Minute Gap",
    headline: 'The "10-Minute Gap" Revision.',
    subtext: "Designed for the car park or between consults. High-yield clinical vignettes that fit into the tightest schedule.",
  },
  {
    tagline: "Deep Explanations",
    headline: "The Examiner's Playbook.",
    subtext: "Don't just know the answer. Understand the clinical clues, the red herrings, and exactly why the other options were wrong.",
  },
  {
    tagline: "AI Powered",
    headline: "Your On-Demand Clinical Supervisor.",
    subtext: 'Stuck? Ask "Why?" Challenge the guidelines or clarify a concept. Your AI Supervisor bridges the gap between the textbook and real practice.',
  },
  {
    tagline: "Retention",
    headline: "Active Recall, Automated.",
    subtext: "Every mistake becomes a lesson. We auto-generate high-yield Learning Points for you to review minutes before the exam.",
  },
];

export function HeroNarration({
  progress,
  demoUrl,
}: {
  progress: number;
  demoUrl: string;
}) {
  const step = stepFromProgress(progress);

  // Soft crossfade window around step boundaries for polish.
  // Section boundaries: 0.20, 0.35, 0.60, 0.85
  const fadeWindow = 0.04;
  
  const getOpacity = (idx: number) => {
    const centers = [0.10, 0.275, 0.475, 0.725, 0.925];
    const center = centers[idx];
    const dist = Math.abs(progress - center);
    const maxDist = 0.15 + fadeWindow;
    return clamp(1 - dist / maxDist, 0, 1);
  };

  // Keep brand visible a bit longer; fade out smoothly once the user is engaged.
  const brandFade = clamp(1 - Math.max(0, progress - 0.12) / 0.38, 0, 1);

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
          className="absolute inset-x-0 bottom-0 h-[52vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(6,7,12,.95), rgba(6,7,12,.70) 35%, rgba(6,7,12,0) 100%)",
          }}
          aria-hidden
        />

        <div
          className="container-x relative"
          style={{
            // Editorial style: lift the narration away from the browser chrome.
            // We keep a generous bottom buffer to avoid iOS/Chrome toolbars.
            paddingTop: "42vh",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 96px)",
          }}
        >
          <div className="max-w-[560px]">
            {/* Dynamic narration based on progress */}
            <div className="relative">
              {SECTIONS.map((section, idx) => {
                const opacity = getOpacity(idx);
                if (opacity < 0.01) return null;
                
                return (
                  <div
                    key={idx}
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      opacity,
                      transform: opacity > 0.5 ? "translateY(0px)" : "translateY(10px)",
                    }}
                  >
                    <div 
                      className="text-[10px] font-semibold tracking-[0.20em] uppercase"
                      style={{ color: "var(--brand-violet-light)" }}
                    >
                      {section.tagline}
                    </div>
                    <div
                      className="mt-2 text-[28px] leading-[1.08]"
                      style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.035em",
                        textShadow: "0 22px 70px rgba(0,0,0,.7)",
                      }}
                    >
                      {section.headline}
                    </div>
                    <div className="mt-3 text-[15px] leading-[1.55]" style={{ color: "rgba(232,236,255,.78)" }}>
                      {section.subtext}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-28 flex items-center gap-3" style={{ color: "rgba(232,236,255,.55)" }}>
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
              <div className="text-[11px] tracking-[0.16em] uppercase">
                {step === 0 ? "Scroll to explore" : step === 4 ? "Almost there" : "Keep scrolling"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
