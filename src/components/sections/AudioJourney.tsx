"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Scroll to listen" — the audio USP made physical.
 *
 * The section pins for ~1.5 viewport heights while scroll position plays
 * the library: a waveform fills behind a glowing playhead, an hour
 * counter runs 0 → 90, and topic chapters light up as the playhead
 * passes them. Scroll progress is written as a single CSS custom
 * property (--p) inside requestAnimationFrame; the waveform fill is a
 * clip-path so the per-frame work never touches layout. No images, no
 * audio download — the whole scene is brand tokens.
 *
 * prefers-reduced-motion gets a static, partly-played waveform with no
 * pinned scrolling.
 */

const CHAPTERS = [
  "Cardiology",
  "Respiratory",
  "Statistics",
  "Dermatology",
  "Neurology",
  "Prescribing",
  "Paediatrics",
  "Ethics",
] as const;

const BARS = 72;
const TOTAL_HOURS = 90;

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
  const frame = useRef(0);
  const [activeChapter, setActiveChapter] = useState(-1);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStaticMode(true);
      setActiveChapter(4);
      track.style.setProperty("--p", "0.62");
      if (hoursRef.current) {
        hoursRef.current.textContent = String(Math.round(0.62 * TOTAL_HOURS));
      }
      return;
    }

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const total = track.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / total));
        track.style.setProperty("--p", p.toFixed(4));
        if (hoursRef.current) {
          hoursRef.current.textContent = String(Math.round(p * TOTAL_HOURS));
        }
        const idx = p <= 0.005 ? -1 : Math.min(
          CHAPTERS.length - 1,
          Math.floor(p * CHAPTERS.length)
        );
        setActiveChapter((prev) => (prev === idx ? prev : idx));
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
      aria-label="90 hours of AKT audio, visualised as a scrolling waveform"
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
              Scroll to listen.
            </h2>
            <p
              className="mx-auto mt-3 max-w-[480px] text-[14px] md:text-[16px] leading-[1.6]"
              style={{ color: "rgba(232,236,255,.62)" }}
            >
              This bar is the whole RCGP curriculum, narrated. Your commute,
              your school run, your gym session — all of it counts.
            </p>

            {/* Hour counter — driven directly from scroll, no re-render */}
            <div className="mt-7 md:mt-9 flex items-baseline justify-center gap-2">
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
                className="text-[13px] md:text-[15px] font-semibold"
                style={{ color: "rgba(232,236,255,.5)" }}
              >
                of 90+ hours
              </span>
            </div>

            {/* Waveform — base bars + violet played layer clipped by --p */}
            <div className="aj-wave mt-6 md:mt-8" aria-hidden>
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

            {/* Chapter chips light up as the playhead passes them */}
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {CHAPTERS.map((name, i) => {
                const state =
                  i === activeChapter
                    ? "active"
                    : i < activeChapter
                      ? "done"
                      : "upcoming";
                return (
                  <span
                    key={name}
                    className="rounded-full px-3 py-[6px] text-[11px] md:text-[12px] font-semibold"
                    style={{
                      transition:
                        "all .45s var(--ease-spring)",
                      transform: state === "active" ? "scale(1.08)" : "scale(1)",
                      background:
                        state === "active"
                          ? "linear-gradient(135deg, rgba(109,106,232,.9), rgba(155,107,255,.9))"
                          : state === "done"
                            ? "rgba(155,107,255,.12)"
                            : "rgba(255,255,255,.04)",
                      border:
                        state === "active"
                          ? "1px solid rgba(197,170,255,.7)"
                          : state === "done"
                            ? "1px solid rgba(155,107,255,.3)"
                            : "1px solid rgba(255,255,255,.08)",
                      color:
                        state === "active"
                          ? "#fff"
                          : state === "done"
                            ? "rgba(197,170,255,.85)"
                            : "rgba(232,236,255,.4)",
                      boxShadow:
                        state === "active"
                          ? "0 8px 28px rgba(155,107,255,.45)"
                          : "none",
                    }}
                  >
                    {name}
                  </span>
                );
              })}
            </div>

            {/* Scroll hint — fades out as soon as playback starts */}
            {!staticMode && (
              <div
                className="mt-7 text-[12px] font-semibold tracking-[0.14em] uppercase"
                style={{
                  color: "rgba(232,236,255,.45)",
                  opacity: "calc(1 - var(--p, 0) * 7)",
                }}
              >
                Keep scrolling to play &darr;
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
