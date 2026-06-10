"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapClient";
import { aktTopics } from "@/data/akt-topics";
import { AudioEqualizer } from "@/components/AudioEqualizer";

/**
 * Chapter 01 — Listen. The section pins for ~1.8 screens while scroll
 * scrubs the library: the hour counter runs 0 → 90, the waveform fills
 * behind a playhead (reusing the aj-wave clip-path machinery, so
 * per-frame work never touches layout) and all 32 RCGP topic names tick
 * past as the current track.
 *
 * Reduced motion: no pin, no scrub — a static, partly-played scene.
 */

const TOPICS = aktTopics.map((t) => t.name);
const BARS = 72;

function barHeights(): number[] {
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: BARS }, (_, i) => {
    const swell =
      Math.abs(Math.sin(i * 0.35)) * 0.45 +
      Math.abs(Math.sin(i * 0.13 + 1.7)) * 0.2;
    return Math.min(1, 0.18 + swell + rand() * 0.3);
  });
}
const HEIGHTS = barHeights();

export function ChapterListen() {
  const rootRef = useRef<HTMLElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const [topicIdx, setTopicIdx] = useState(11);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      waveRef.current?.style.setProperty("--p", "0.4");
      if (hoursRef.current) hoursRef.current.textContent = "36";
      return;
    }

    const ctx = gsap.context(() => {
      const state = { p: 0 };
      gsap.to(state, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: true,
        },
        onUpdate: () => {
          waveRef.current?.style.setProperty("--p", state.p.toFixed(4));
          if (hoursRef.current) {
            hoursRef.current.textContent = String(Math.round(state.p * 90));
          }
          setTopicIdx((prev) => {
            const idx = Math.min(
              TOPICS.length - 1,
              Math.floor(state.p * TOPICS.length)
            );
            return prev === idx ? prev : idx;
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-track="01 · The library"
      aria-label="The audio library: all 32 RCGP topic areas, 90+ hours"
    >
      <div className="aw-pin container-x relative">
        <div className="aw-mark mx-auto w-full max-w-[760px]">
          <span className="aw-mark-no">01</span>
          <span className="aw-mark-rule" />
          <span className="aw-mark-title">Listen</span>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[760px] text-center md:mt-12">
          <h2
            className="text-[30px] leading-[1.05] md:text-[46px]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.04em",
            }}
          >
            Press play on the syllabus.
          </h2>

          {/* Hour counter, scrubbed by scroll */}
          <div className="mt-6 flex items-baseline justify-center gap-2 md:mt-9">
            <span
              className="tabular-nums font-bold leading-none text-[64px] md:text-[96px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.05em",
                backgroundImage:
                  "linear-gradient(135deg, var(--brand-violet-light), var(--brand-iris) 55%, rgba(236,72,153,.95))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              <span ref={hoursRef}>0</span>h
            </span>
            <span
              className="text-[13px] font-semibold md:text-[15px]"
              style={{ color: "rgba(232,236,255,.5)" }}
            >
              of 90+ hours, fully narrated
            </span>
          </div>

          {/* Waveform fill + playhead */}
          <div ref={waveRef} className="aj-wave mt-6 md:mt-8" aria-hidden>
            <div className="aj-bars">
              {HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="aj-bar"
                  style={{ height: `${h * 100}%` }}
                />
              ))}
            </div>
            <div className="aj-bars aj-bars--played">
              {HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="aj-bar"
                  style={{ height: `${h * 100}%` }}
                />
              ))}
            </div>
            <div className="aj-head" />
          </div>

          {/* Current track */}
          <div className="mt-7 md:mt-9">
            <div
              className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] md:text-[11px]"
              style={{ color: "rgba(167,139,250,.8)" }}
            >
              <AudioEqualizer bars={4} />
              Topic {topicIdx + 1} / {TOPICS.length}
            </div>
            <div
              className="mt-2 text-[20px] font-semibold md:text-[26px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              {TOPICS[topicIdx]}
            </div>
          </div>

          <p
            className="mt-6 text-[12px] font-semibold md:text-[13px]"
            style={{ color: "rgba(232,236,255,.5)" }}
          >
            All 32 RCGP topic areas. Commute, gym, school run.{" "}
            <a
              href="https://app.medexia-akt.com/demo/audiobook"
              className="transition-colors hover:text-white"
              style={{ color: "rgba(236,72,153,.85)" }}
            >
              Listen to the real demo &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
