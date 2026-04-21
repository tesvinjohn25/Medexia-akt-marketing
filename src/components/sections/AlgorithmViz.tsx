"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live visualisation of the adaptive algorithm inside the Algorithm pillar
 * card. 32 dots map 1:1 to the 32 RCGP AKT curriculum topics.
 *
 * The animation loops continuously while in the viewport, paused otherwise.
 * Each cycle plays out the algorithm's story in four phases:
 *
 *   scanning   — flicker across all 32 dots ("Testing across 32 AKT topics…")
 *   identified — 6 weak-spot dots settle red ("6 weak spots found")
 *   drilling   — each red dot is drilled to violet one-by-one, with the
 *                specific topic name written beside the phase label
 *                ("Drilling Cardiology…", "Drilling Statistics…", etc.)
 *   success    — all 32 dots violet, label turns green
 *                ("All 32 topics mastered.")
 *
 * Real topic names turn the dots from decoration into evidence.
 */

type Phase = "idle" | "scanning" | "identified" | "drilling" | "success";
type Focus = { idx: number; topic: string } | null;

const TOTAL = 32;

const WEAK_SPOTS: ReadonlyArray<{ idx: number; topic: string }> = [
  { idx: 2, topic: "Cardiology" },
  { idx: 6, topic: "Statistics" },
  { idx: 11, topic: "Dermatology" },
  { idx: 17, topic: "Neurology" },
  { idx: 24, topic: "Prescribing" },
  { idx: 29, topic: "Ethics" },
];

export function AlgorithmViz() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [drilled, setDrilled] = useState<number[]>([]);
  const [focus, setFocus] = useState<Focus>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDrilled(WEAK_SPOTS.map((w) => w.idx));
      setPhase("success");
      return;
    }

    let mounted = true;
    let isVisible = false;
    const waitFor = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));
    const waitForVisible = async () => {
      while (mounted && !isVisible) {
        await waitFor(250);
      }
    };

    const run = async () => {
      while (mounted) {
        await waitForVisible();
        if (!mounted) break;

        // Reset
        setDrilled([]);
        setFocus(null);
        setPhase("scanning");
        await waitFor(1200);

        setPhase("identified");
        await waitFor(1000);

        setPhase("drilling");
        for (const w of WEAK_SPOTS) {
          if (!mounted) break;
          setFocus(w);
          await waitFor(650);
          setDrilled((prev) => [...prev, w.idx]);
          await waitFor(120);
        }
        if (!mounted) break;
        setFocus(null);
        await waitFor(250);

        setPhase("success");
        await waitFor(3500);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    void run();

    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  const label = (() => {
    if (phase === "scanning") return "Testing across 32 AKT topics\u2026";
    if (phase === "identified") return `${WEAK_SPOTS.length} weak spots found`;
    if (phase === "drilling" && focus) return `Drilling ${focus.topic}\u2026`;
    if (phase === "drilling") return "Closing the gaps\u2026";
    if (phase === "success") return "All 32 topics mastered.";
    return "Testing across 32 AKT topics\u2026";
  })();

  const labelColor =
    phase === "success"
      ? "rgba(52,211,153,.95)"
      : phase === "identified"
        ? "rgba(239,68,68,.9)"
        : "rgba(167,139,250,.85)";

  return (
    <div ref={ref} className="mt-6 text-center">
      <div
        className="text-[11px] md:text-[12px] tracking-[0.14em] uppercase font-semibold transition-colors duration-300"
        style={{ color: labelColor, minHeight: "1.4em" }}
        aria-live="polite"
      >
        {label}
      </div>

      <div
        role="img"
        aria-label="Visualisation of the algorithm testing 32 AKT topics, finding weak spots and drilling them to pass level."
        className="mt-4 mx-auto grid grid-cols-8 gap-[8px] max-w-[260px]"
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const weak = WEAK_SPOTS.find((w) => w.idx === i);
          const isWeak = !!weak;
          const isDrilled = drilled.includes(i);
          const isFocused = focus?.idx === i;
          const state: "idle" | "flicker" | "weak" | "drilling" | "drilled" | "success" =
            phase === "idle"
              ? "idle"
              : phase === "scanning"
                ? "flicker"
                : phase === "identified"
                  ? isWeak
                    ? "weak"
                    : "idle"
                  : phase === "drilling"
                    ? isFocused
                      ? "drilling"
                      : isDrilled
                        ? "drilled"
                        : isWeak
                          ? "weak"
                          : "idle"
                    : "success";
          return (
            <span
              key={i}
              className={`av-dot av-dot--${state}`}
              style={{ "--i": i } as React.CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
}
