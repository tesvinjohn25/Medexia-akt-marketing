"use client";

import React from "react";
import Image from "next/image";
import { HeroFrames } from "@/components/HeroFrames";
import { HeroNarration } from "@/components/HeroNarration";
import { PhoneScreenDemo } from "@/components/PhoneScreenDemo";

const DEMO_URL = "https://medexia-akt.com/demo";

// Text overlay configuration - frame ranges and content
const TEXT_OVERLAYS = [
  {
    startFrame: 1,
    endFrame: 180,
    headline: "Stop Guessing. Start Passing.",
    subtext:
      "You don't have time for vague feedback. See your exact probability of passing and visualise your curriculum coverage in real-time.",
  },
  {
    startFrame: 181,
    endFrame: 360,
    headline: "The '10-Minute Gap' Revision.",
    subtext:
      "Designed for the car park or between consults. High-yield clinical vignettes that fit into the tightest schedule.",
  },
  {
    startFrame: 361,
    endFrame: 560,
    headline: "The Examiner's Playbook.",
    subtext:
      "Don't just know the answer. Understand the clinical clues, the red herrings, and exactly why the other options were wrong.",
  },
  {
    startFrame: 561,
    endFrame: 720,
    headline: "Your On-Demand Clinical Supervisor.",
    subtext:
      "Stuck? Ask 'Why?' Challenge the guidelines or clarify a concept. Your AI Supervisor bridges the gap between the textbook and real practice.",
  },
  {
    startFrame: 721,
    endFrame: 827,
    headline: "Active Recall, Automated.",
    subtext:
      "Every mistake becomes a lesson. We auto-generate high-yield Learning Points for you to review minutes before the exam.",
  },
];

// Frame thresholds for dot navigation (midpoint of each section)
const DOT_FRAME_TARGETS = [90, 270, 460, 640, 774];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 overflow-hidden rounded-2xl border"
        style={{
          borderColor: "rgba(255,255,255,.10)",
          boxShadow: "0 18px 45px rgba(0,0,0,.45)",
        }}
      >
        <Image src="/logo.jpg" alt="Medexia" width={80} height={80} />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold" style={{ letterSpacing: "-0.01em" }}>
          Medexia
        </div>
        <div className="text-xs faint">AKT Navigator</div>
      </div>
    </div>
  );
}

// Calculate text overlay opacity based on frame
function getOverlayOpacity(overlay: (typeof TEXT_OVERLAYS)[0], currentFrame: number): number {
  const fadeFrames = 30;

  if (currentFrame < overlay.startFrame || currentFrame > overlay.endFrame) return 0;

  const fadeInEnd = overlay.startFrame + fadeFrames;
  if (currentFrame < fadeInEnd) {
    return (currentFrame - overlay.startFrame) / fadeFrames;
  }

  const fadeOutStart = overlay.endFrame - fadeFrames;
  if (currentFrame > fadeOutStart) {
    return (overlay.endFrame - currentFrame) / fadeFrames;
  }

  return 1;
}

// Get active section index from frame
function getActiveSectionFromFrame(frame: number): number {
  for (let i = 0; i < TEXT_OVERLAYS.length; i++) {
    if (frame >= TEXT_OVERLAYS[i].startFrame && frame <= TEXT_OVERLAYS[i].endFrame) {
      return i;
    }
  }
  return -1;
}

// Dot Navigation Component
function DotNavigation({
  currentFrame,
  demoProgress,
  isVisible,
  onDotClick,
}: {
  currentFrame: number;
  demoProgress: number;
  isVisible: boolean;
  onDotClick: (frameTarget: number) => void;
}) {
  const activeSection = getActiveSectionFromFrame(currentFrame);

  return (
    <div
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
      style={{
        opacity: isVisible ? 0.8 : 0,
        transition: "opacity 300ms ease",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {TEXT_OVERLAYS.map((overlay, idx) => {
        const isActive = idx === activeSection;
        const isPast = currentFrame > overlay.endFrame;

        return (
          <button
            key={idx}
            onClick={() => onDotClick(DOT_FRAME_TARGETS[idx])}
            className="group relative flex items-center justify-end"
            aria-label={`Jump to: ${overlay.headline}`}
          >
            {/* Tooltip on hover */}
            <span
              className="absolute right-6 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: "rgba(6,7,12,.85)",
                border: "1px solid rgba(255,255,255,.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              {overlay.headline}
            </span>

            {/* Dot */}
            <div
              className="h-3 w-3 rounded-full transition-all duration-200"
              style={{
                background: isActive
                  ? "rgba(167,139,250,.9)"
                  : isPast
                  ? "rgba(167,139,250,.4)"
                  : "rgba(255,255,255,.25)",
                transform: isActive ? "scale(1.3)" : "scale(1)",
                boxShadow: isActive ? "0 0 12px rgba(167,139,250,.5)" : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

// Scroll indicator component
function ScrollIndicator({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 400ms ease",
      }}
    >
      <span
        className="text-[11px] tracking-[0.18em] uppercase font-medium"
        style={{ color: "rgba(255,255,255,.55)" }}
      >
        Scroll to explore
      </span>
      <div
        className="h-12 w-7 rounded-full border-2 flex items-start justify-center pt-2"
        style={{ borderColor: "rgba(255,255,255,.25)" }}
      >
        <div
          className="h-2 w-2 rounded-full"
          style={{
            background: "rgba(255,255,255,.7)",
            animation: "scrollBounce 1.8s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [heroProgress, setHeroProgress] = React.useState(0);
  const [demoProgress, setDemoProgress] = React.useState(0);
  const [transform, setTransform] = React.useState<{ x: number; y: number; s: number } | null>(null);
  const [currentFrame, setCurrentFrame] = React.useState(0);

  // Hero card fades out as hero animation completes
  const heroCardOpacity = clamp(1 - Math.max(0, heroProgress - 0.85) / 0.12, 0, 1);
  const heroCardTransform = heroProgress < 0.85 ? 0 : (heroProgress - 0.85) * 60;

  // Demo content visibility - stays visible once hero completes, even when scrolling back
  const showDemo = heroProgress >= 0.965;
  const demoFadeIn = clamp((heroProgress - 0.965) / (1 - 0.965), 0, 1);

  // Scroll indicator visible only at the start
  const showScrollIndicator = heroProgress < 0.1;

  // Dot navigation visible during demo
  const showDotNav = demoProgress > 0.01 || heroProgress >= 0.99;

  // Handle dot click - scroll to target frame
  const handleDotClick = React.useCallback((targetFrame: number) => {
    // Calculate scroll position for target frame
    // Hero scroll: 270vh, Demo scroll: 1000vh
    // demoProgress = targetFrame / 826
    const targetDemoProgress = targetFrame / 826;
    const vh = window.innerHeight;
    const heroScrollPx = (270 / 100) * vh - vh; // 170vh in pixels
    const demoScrollPx = (1000 / 100) * vh - vh; // 900vh in pixels
    const targetScroll = heroScrollPx + targetDemoProgress * demoScrollPx;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  return (
    <main>
      {/* Scroll bounce animation */}
      <style jsx global>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(16px); opacity: 0.3; }
        }
      `}</style>

      <section className="relative">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <HeroFrames
          onProgress={setHeroProgress}
          onDemoProgress={setDemoProgress}
          onTransform={setTransform}
        >
          {/* Subtle global scrim */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 700px at 16% 70%, rgba(5,6,10,.62), rgba(5,6,10,0) 58%)",
            }}
          />

          {/* Phone screen demo */}
          <PhoneScreenDemo
            progress={heroProgress}
            demoProgress={demoProgress}
            transform={transform}
            onFrameChange={setCurrentFrame}
          />

          {/* Desktop: Left card area */}
          <div className="hidden md:block">
            <div className="container-x relative flex h-full items-center">
              {/* Hero card */}
              <div
                className="pointer-events-auto max-w-[58ch] rounded-[28px] border px-7 py-7"
                style={{
                  background: "rgba(6,7,12,.55)",
                  borderColor: "rgba(255,255,255,.10)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 30px 90px rgba(0,0,0,.55)",
                  opacity: heroCardOpacity,
                  transform: `translateY(${heroCardTransform}px)`,
                  transition: "opacity 150ms ease",
                }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <Logo />
                  <a className="btn-secondary text-sm" href={DEMO_URL} style={{ padding: "10px 12px" }}>
                    Start now
                  </a>
                </div>

                <div
                  className="text-[11px] tracking-[0.22em] uppercase font-semibold"
                  style={{ color: "rgba(167,139,250,.85)" }}
                >
                  Built for busy GP-Trainees
                </div>
                <h1
                  className="mt-3 text-[52px] leading-[1.03]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.04em",
                    textShadow: "0 18px 60px rgba(0,0,0,.65)",
                  }}
                >
                  Know Exactly What
                  <br />
                  <span style={{ color: "var(--brand-violet-light)" }}>to Revise Next.</span>
                </h1>
                <p className="mt-4 text-[16px] leading-[1.65]" style={{ color: "rgba(232,236,255,.78)" }}>
                  Smart question targeting based on your actual weak spots.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a className="btn-primary" href={DEMO_URL}>
                    Start now
                  </a>
                  <a className="btn-secondary" href={DEMO_URL}>
                    Try the 5‑question demo
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-2" style={{ color: "rgba(232,236,255,.55)" }}>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span className="text-[13px]">Scroll to take a test drive. No signup.</span>
                </div>
              </div>

              {/* Demo text overlays - same styling as hero card */}
              {showDemo &&
                TEXT_OVERLAYS.map((overlay, idx) => {
                  const opacity = getOverlayOpacity(overlay, currentFrame) * demoFadeIn;
                  if (opacity < 0.01) return null;

                  return (
                    <div
                      key={idx}
                      className="pointer-events-none absolute max-w-[58ch] rounded-[28px] border px-7 py-7"
                      style={{
                        background: "rgba(6,7,12,.55)",
                        borderColor: "rgba(255,255,255,.10)",
                        backdropFilter: "blur(14px)",
                        boxShadow: "0 30px 90px rgba(0,0,0,.55)",
                        opacity,
                        transform: opacity > 0.01 ? "translateY(0px)" : "translateY(8px)",
                        transition: "transform 200ms ease",
                      }}
                    >
                      <h2
                        className="text-[52px] leading-[1.03]"
                        style={{
                          fontFamily: "var(--font-display)",
                          letterSpacing: "-0.04em",
                          textShadow: "0 18px 60px rgba(0,0,0,.65)",
                        }}
                      >
                        {overlay.headline}
                      </h2>
                      <p
                        className="mt-4 text-[16px] leading-[1.65]"
                        style={{ color: "rgba(232,236,255,.78)" }}
                      >
                        {overlay.subtext}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Mobile: Bottom narration area - MOVED UP to avoid Chrome nav */}
          <div className="md:hidden">
            {/* Hero narration */}
            <div style={{ opacity: heroCardOpacity }}>
              <HeroNarration progress={heroProgress} demoUrl={DEMO_URL} />
            </div>

            {/* Demo text overlays for mobile - positioned HIGHER */}
            {showDemo && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
                <div
                  className="absolute inset-x-0 bottom-0 h-[55vh]"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,7,12,.98), rgba(6,7,12,.70) 50%, rgba(6,7,12,0) 100%)",
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
                  {TEXT_OVERLAYS.map((overlay, idx) => {
                    const opacity = getOverlayOpacity(overlay, currentFrame);
                    if (opacity < 0.01) return null;

                    return (
                      <div
                        key={idx}
                        className="absolute inset-x-0 max-w-[560px]"
                        style={{
                          opacity,
                          transform: opacity > 0.01 ? "translateY(0px)" : "translateY(6px)",
                          transition: "transform 200ms ease",
                        }}
                      >
                        <div
                          className="text-[28px] leading-[1.08]"
                          style={{
                            fontFamily: "var(--font-display)",
                            letterSpacing: "-0.04em",
                            textShadow: "0 22px 70px rgba(0,0,0,.7)",
                          }}
                        >
                          {overlay.headline}
                        </div>
                        <div
                          className="mt-3 text-[15px] leading-[1.55]"
                          style={{ color: "rgba(232,236,255,.78)" }}
                        >
                          {overlay.subtext}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Scroll indicator - visible at start */}
          <ScrollIndicator isVisible={showScrollIndicator} />

          {/* Dot navigation - visible during demo */}
          <DotNavigation
            currentFrame={currentFrame}
            demoProgress={demoProgress}
            isVisible={showDotNav}
            onDotClick={handleDotClick}
          />

          {/* Progress bar at bottom */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
            style={{
              opacity: demoProgress > 0.01 && demoProgress < 0.99 ? 0.4 : 0,
              transition: "opacity 300ms ease",
            }}
          >
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{
                width: 80,
                background: "rgba(255,255,255,.12)",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${demoProgress * 100}%`,
                  background: "rgba(167,139,250,.6)",
                  transition: "width 80ms ease-out",
                }}
              />
            </div>
          </div>
        </HeroFrames>
      </section>
    </main>
  );
}
