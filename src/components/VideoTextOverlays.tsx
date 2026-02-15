"use client";

import React from "react";

const DEMO_URL = "https://medexia-akt.com/demo";

const CHAPTERS = [
  {
    time: 0,
    label: "Dashboard",
    headline: "Stop Guessing. Start Passing.",
    subtext:
      "You don't have time for vague feedback. See your exact probability of passing and visualise your curriculum coverage in real-time.",
    endTime: 12,
  },
  {
    time: 12,
    label: "Sessions",
    headline: "The '10-Minute Gap' Revision.",
    subtext:
      "Designed for the car park or between consults. High-yield clinical vignettes that fit into the tightest schedule.",
    endTime: 24,
  },
  {
    time: 24,
    label: "Explanations",
    headline: "The Examiner's Playbook.",
    subtext:
      "Don't just know the answer. Understand the clinical clues, the red herrings, and exactly why the other options were wrong.",
    endTime: 38,
  },
  {
    time: 38,
    label: "AI Supervisor",
    headline: "Your On-Demand Clinical Supervisor.",
    subtext:
      "Stuck? Ask 'Why?' Challenge the guidelines or clarify a concept. Your AI Supervisor bridges the gap between the textbook and real practice.",
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

function getOverlayOpacity(chapter: (typeof CHAPTERS)[0], currentTime: number): number {
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

/* ── Compact Vertical Chapter Navigation ─────────────────────────────── */

function ChapterNav({
  currentTime,
  onSeekTo,
}: {
  currentTime: number;
  onSeekTo: (time: number) => void;
}) {
  const activeIdx = CHAPTERS.reduce(
    (active, ch, idx) => (currentTime >= ch.time ? idx : active),
    0
  );

  return (
    <div className="pointer-events-auto">
      <div
        style={{
          background: "rgba(11,13,18,.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,.06)",
          borderRadius: 20,
          padding: "10px 7px",
        }}
      >
        <div className="flex flex-col items-center gap-1.5">
          {CHAPTERS.map((ch, idx) => {
            const isActive = idx === activeIdx;
            const isPast = idx < activeIdx;

            return (
              <button
                key={idx}
                onClick={() => onSeekTo(ch.time)}
                className="relative grid place-items-center"
                style={{
                  width: 22,
                  height: 22,
                  WebkitTapHighlightColor: "transparent",
                }}
                aria-label={`Jump to: ${ch.label}`}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: isActive ? 8 : 4,
                    height: isActive ? 8 : 4,
                    background: isActive
                      ? "#A78BFA"
                      : isPast
                      ? "rgba(167,139,250,.45)"
                      : "rgba(255,255,255,.18)",
                    boxShadow: isActive
                      ? "0 0 10px rgba(167,139,250,.5)"
                      : "none",
                    transition: "all 300ms ease",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Active chapter label — fixed width to prevent pill resize */}
      <div className="text-center mt-1.5" style={{ width: 36 }}>
        <span
          className="text-[8px] tracking-[0.16em] uppercase font-medium block truncate"
          style={{ color: "rgba(167,139,250,.55)" }}
        >
          {CHAPTERS[activeIdx]?.label}
        </span>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────── */

export function VideoTextOverlays({
  currentTime,
  onSeekTo,
}: {
  currentTime: number;
  onSeekTo: (time: number) => void;
}) {
  const ctaOpacity =
    currentTime > 58 ? Math.min(1, (currentTime - 58) / FADE_DURATION) : 0;

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* Background gradient at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(6,7,12,.95), rgba(6,7,12,.55) 45%, rgba(6,7,12,0) 100%)",
        }}
        aria-hidden
      />

      {/* Vertical chapter navigation — right center of screen */}
      <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2">
        <ChapterNav currentTime={currentTime} onSeekTo={onSeekTo} />
      </div>

      {/* Text overlay area — bottom */}
      <div
        className="container-x absolute inset-x-0 bottom-0 mx-auto"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)",
        }}
      >
        {/* Text overlays */}
        {CHAPTERS.map((chapter, idx) => {
          const opacity = getOverlayOpacity(chapter, currentTime);
          if (opacity < 0.01) return null;

          return (
            <div
              key={idx}
              className="absolute inset-x-5 bottom-0 max-w-[560px]"
              style={{
                opacity,
                transform: `translateY(${(1 - Math.min(opacity * 2, 1)) * -10}px)`,
                paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)",
              }}
            >
              <div
                className="text-[28px] md:text-[36px] leading-[1.08]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.04em",
                  textShadow: "0 22px 70px rgba(0,0,0,.7)",
                }}
              >
                {chapter.headline}
              </div>
              <div
                className="mt-3 text-[15px] md:text-[17px] leading-[1.55]"
                style={{ color: "rgba(232,236,255,.78)" }}
              >
                {chapter.subtext}
              </div>
            </div>
          );
        })}

        {/* CTA at end of video */}
        {ctaOpacity > 0.01 && (
          <div
            className="absolute inset-x-5 bottom-0 max-w-[560px] pointer-events-auto"
            style={{
              opacity: ctaOpacity,
              transform: `translateY(${(1 - Math.min(ctaOpacity * 2, 1)) * -10}px)`,
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 100px)",
            }}
          >
            <div
              className="text-[28px] md:text-[36px] leading-[1.08]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              Ready to start passing?
            </div>
            <div
              className="mt-3 text-[15px] md:text-[17px] leading-[1.55]"
              style={{ color: "rgba(232,236,255,.78)" }}
            >
              5 free questions. No signup. No card.
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="btn-primary" href={DEMO_URL}>
                Start now
              </a>
              <a className="btn-secondary" href={DEMO_URL}>
                Try the 5-question demo
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
