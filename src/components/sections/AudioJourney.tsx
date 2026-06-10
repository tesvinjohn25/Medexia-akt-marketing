"use client";

import { useEffect, useRef, useState } from "react";
import { aktTopics } from "@/data/akt-topics";
import { AudioEqualizer } from "@/components/AudioEqualizer";

/**
 * "Scroll to listen" — the audio library, made tangible.
 *
 * The section pins briefly while scroll position plays the library:
 * a waveform fills behind a glowing playhead, an hour counter runs
 * 0 → 90, and a Now Playing window streams all 32 RCGP topic titles
 * past the user (sourced from data/akt-topics so it always matches
 * the product). Scroll progress is written as a CSS custom property
 * (--p) plus one transform inside requestAnimationFrame; the waveform
 * fill is a clip-path so per-frame work never touches layout.
 *
 * prefers-reduced-motion gets a static, partly-played scene with no
 * pinned scrolling.
 */

const TOPICS = aktTopics.map((t) => t.name);
const BARS = 72;
const TOTAL_HOURS = 90;
const ROW_H = 48;

/* Deterministic heights so the server and client render the same wave. */
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

export function AudioJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const apply = (p: number) => {
      track.style.setProperty("--p", p.toFixed(4));
      if (hoursRef.current) {
        hoursRef.current.textContent = String(Math.round(p * TOTAL_HOURS));
      }
      // Stream the playlist: continuous position keeps motion silky,
      // the active row is whichever sits in the centre band.
      const c = p * (TOPICS.length - 1);
      if (listRef.current) {
        listRef.current.style.transform = `translateY(${ROW_H - c * ROW_H}px)`;
      }
      const idx = Math.min(TOPICS.length - 1, Math.max(0, Math.round(c)));
      setActiveTopic((prev) => (prev === idx ? prev : idx));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStaticMode(true);
      apply(0.4);
      return;
    }

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const total = track.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(
          1,
          Math.max(0, -track.getBoundingClientRect().top / total)
        );
        apply(p);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className={staticMode ? "" : "aj-track"}
      aria-label="The full audio library: all 32 RCGP topic areas, 90+ hours, visualised as a scrolling waveform"
    >
      <div className="aj-sticky">
        <div className="container-x w-full">
          <div className="mx-auto max-w-[760px] text-center">
            <div
              className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: "rgba(236,72,153,.9)" }}
            >
              The USP &middot; Audio
            </div>
            <h2
              className="mt-3 text-[30px] md:text-[44px] leading-[1.06]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
              }}
            >
              Scroll through the library.
            </h2>

            {/* Hour counter — driven directly from scroll, no re-render */}
            <div className="mt-5 md:mt-7 flex items-baseline justify-center gap-2">
              <span
                className="tabular-nums font-bold leading-none text-[56px] md:text-[84px]"
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
                className="text-[13px] md:text-[15px] font-semibold"
                style={{ color: "rgba(232,236,255,.5)" }}
              >
                of 90+ hours
              </span>
            </div>

            {/* Waveform — base bars + violet played layer clipped by --p */}
            <div className="aj-wave mt-5 md:mt-7" aria-hidden>
              <div className="aj-bars">
                {HEIGHTS.map((h, i) => (
                  <span key={i} className="aj-bar" style={{ height: `${h * 100}%` }} />
                ))}
              </div>
              <div className="aj-bars aj-bars--played">
                {HEIGHTS.map((h, i) => (
                  <span key={i} className="aj-bar" style={{ height: `${h * 100}%` }} />
                ))}
              </div>
              <div className="aj-head" />
            </div>

            {/* Now playing — all 32 topics stream past as you scroll */}
            <div className="mt-6 md:mt-8">
              <div
                className="flex items-center justify-center gap-2 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold"
                style={{ color: "rgba(167,139,250,.8)" }}
              >
                <AudioEqualizer bars={4} />
                Now playing &middot; {activeTopic + 1} / {TOPICS.length}
              </div>
              <div className="aj-window mt-2" aria-hidden>
                <div ref={listRef} className="aj-list">
                  {TOPICS.map((name, i) => (
                    <div
                      key={name}
                      className="aj-row"
                      style={{
                        color:
                          i === activeTopic
                            ? "var(--fg-high)"
                            : "rgba(232,236,255,.28)",
                        transform:
                          i === activeTopic ? "scale(1.04)" : "scale(.96)",
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p
              className="mt-4 text-[12px] md:text-[13px] font-semibold"
              style={{ color: "rgba(232,236,255,.5)" }}
            >
              All 32 RCGP topic areas, fully narrated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
