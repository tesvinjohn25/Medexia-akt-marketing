"use client";

import React from "react";

const DEMO_URL = "https://app.medexia-akt.com/demo";

const CHAPTERS = [
  {
    time: 0,
    label: "Dashboard",
    headline: "Stop Guessing. Start Passing.",
    subtext:
      "You don\u2019t have time for vague feedback. See your exact probability of passing and visualise your curriculum coverage in real-time.",
    endTime: 12,
  },
  {
    time: 12,
    label: "Sessions",
    headline: "The \u201810-Minute Gap\u2019 Revision.",
    subtext:
      "Designed for the car park or between consults. High-yield clinical vignettes that fit into the tightest schedule.",
    endTime: 24,
  },
  {
    time: 24,
    label: "Explanations",
    headline: "The Examiner\u2019s Playbook.",
    subtext:
      "Don\u2019t just know the answer. Understand the clinical clues, the red herrings, and exactly why the other options were wrong.",
    endTime: 38,
  },
  {
    time: 38,
    label: "AI Supervisor",
    headline: "Your On-Demand Clinical Supervisor.",
    subtext:
      "Stuck? Ask \u2018Why?\u2019 Challenge the guidelines or clarify a concept. Your AI Supervisor bridges the gap between the textbook and real practice.",
    endTime: 51,
  },
  {
    time: 51,
    label: "Recall",
    headline: "Never Forget a Mistake Twice.",
    subtext:
      "Every wrong answer auto-generates a Learning Point \u2014 your personal cheat sheet for the night before the exam.",
    endTime: 58,
  },
];

const FADE_DURATION = 0.8;

function getActiveChapter(currentTime: number) {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (currentTime >= CHAPTERS[i]!.time) return i;
  }
  return 0;
}

function getOverlayOpacity(
  chapter: (typeof CHAPTERS)[0],
  currentTime: number
): number {
  if (currentTime < chapter.time || currentTime > chapter.endTime) return 0;
  const fadeInEnd = chapter.time + FADE_DURATION;
  if (currentTime < fadeInEnd) {
    return Math.max(0.01, (currentTime - chapter.time) / FADE_DURATION);
  }
  const fadeOutStart = chapter.endTime - FADE_DURATION;
  if (currentTime > fadeOutStart) {
    return (chapter.endTime - currentTime) / FADE_DURATION;
  }
  return 1;
}

export function AppDemoSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  // Play/pause video based on viewport visibility
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  // Track video time
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handler = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", handler);
    return () => video.removeEventListener("timeupdate", handler);
  }, []);

  const seekTo = React.useCallback((time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    video.play().catch(() => {});
  }, []);

  const activeIdx = getActiveChapter(currentTime);
  const ctaOpacity =
    currentTime > 58 ? Math.min(1, (currentTime - 58) / FADE_DURATION) : 0;

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 600px at 70% 30%, rgba(109,106,232,.07), transparent 65%), radial-gradient(600px 500px at 30% 70%, rgba(155,107,255,.05), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container-x relative">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div
            className="text-[13px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)" }}
          >
            Take a test drive
          </div>
          <h2
            className="mt-3 text-[32px] md:text-[44px] leading-[1.08]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.04em",
            }}
          >
            See it in action.
          </h2>
        </div>

        {/* Two-column layout: text left, phone right (reversed on mobile) */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Text overlays — left column on desktop */}
          <div className="order-2 md:order-1 flex-1 min-h-[200px] md:min-h-[320px] relative">
            {/* Chapter text */}
            {CHAPTERS.map((chapter, idx) => {
              const opacity = getOverlayOpacity(chapter, currentTime);
              if (opacity < 0.01) return null;

              return (
                <div
                  key={idx}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity,
                    transform: `translateY(${(1 - Math.min(opacity * 2, 1)) * 12}px)`,
                  }}
                >
                  <div
                    className="text-[24px] md:text-[32px] leading-[1.12]"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {chapter.headline}
                  </div>
                  <div
                    className="mt-3 text-[14px] md:text-[16px] leading-[1.6] max-w-[460px]"
                    style={{ color: "rgba(232,236,255,.72)" }}
                  >
                    {chapter.subtext}
                  </div>
                </div>
              );
            })}

            {/* CTA at end of video */}
            {ctaOpacity > 0.01 && (
              <div
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  opacity: ctaOpacity,
                  transform: `translateY(${(1 - Math.min(ctaOpacity * 2, 1)) * 12}px)`,
                }}
              >
                <div
                  className="text-[24px] md:text-[32px] leading-[1.12]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Ready to start passing?
                </div>
                <div
                  className="mt-3 text-[14px] md:text-[16px] leading-[1.6]"
                  style={{ color: "rgba(232,236,255,.72)" }}
                >
                  5 free questions. No signup. No card.
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a className="btn-primary" href={DEMO_URL}>
                    Start now
                  </a>
                  <a className="btn-secondary" href={DEMO_URL}>
                    Try the demo
                  </a>
                </div>
              </div>
            )}

            {/* Chapter navigation — horizontal pills below text */}
            <div className="absolute bottom-0 left-0 right-0 md:relative md:mt-8">
              <div className="flex items-center gap-1.5">
                {CHAPTERS.map((ch, idx) => {
                  const isActive = idx === activeIdx;
                  const isPast = idx < activeIdx;

                  return (
                    <button
                      key={idx}
                      onClick={() => seekTo(ch.time)}
                      className="flex items-center gap-1.5 rounded-full px-2 py-1 transition-all duration-300"
                      style={{
                        background: isActive
                          ? "rgba(167,139,250,.12)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(167,139,250,.2)"
                          : "1px solid transparent",
                        WebkitTapHighlightColor: "transparent",
                      }}
                      aria-label={`Jump to: ${ch.label}`}
                    >
                      <div
                        className="rounded-full flex-shrink-0 transition-all duration-300"
                        style={{
                          width: isActive ? 7 : 4,
                          height: isActive ? 7 : 4,
                          background: isActive
                            ? "#A78BFA"
                            : isPast
                            ? "rgba(167,139,250,.4)"
                            : "rgba(255,255,255,.18)",
                          boxShadow: isActive
                            ? "0 0 8px rgba(167,139,250,.45)"
                            : "none",
                        }}
                      />
                      {isActive && (
                        <span
                          className="text-[10px] tracking-[0.1em] uppercase font-medium"
                          style={{ color: "rgba(167,139,250,.8)" }}
                        >
                          {ch.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Phone mockup — right column on desktop, first on mobile */}
          <div className="order-1 md:order-2 flex-shrink-0">
            <div
              className="relative mx-auto"
              style={{
                width: "min(280px, 65vw)",
                aspectRatio: "9 / 19.5",
              }}
            >
              {/* Phone bezel */}
              <div
                className="absolute inset-0 rounded-[36px]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(40,42,55,.9), rgba(22,24,32,.95))",
                  boxShadow:
                    "0 40px 100px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06), inset 0 1px 0 rgba(255,255,255,.08)",
                }}
              />

              {/* Screen area */}
              <div
                className="absolute overflow-hidden"
                style={{
                  top: "2.5%",
                  left: "4%",
                  right: "4%",
                  bottom: "2.5%",
                  borderRadius: 28,
                  background: "#000",
                }}
              >
                <video
                  ref={videoRef}
                  src="/demo/app-demo-web.mp4"
                  poster="/demo/app-demo-poster.jpg"
                  muted
                  playsInline
                  loop
                  preload="auto"
                  className="h-full w-full object-cover"
                  style={{ display: "block" }}
                />

                {/* Glass / lighting overlays */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(140deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 65%, rgba(0,0,0,.12) 100%)",
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* Notch */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: "2.8%",
                  width: "28%",
                  height: "2.8%",
                  borderRadius: 999,
                  background: "rgba(0,0,0,.9)",
                }}
              />

              {/* Ambient glow behind phone */}
              <div
                className="pointer-events-none absolute -inset-[30%] -z-10"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(109,106,232,.12), transparent 70%)",
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
