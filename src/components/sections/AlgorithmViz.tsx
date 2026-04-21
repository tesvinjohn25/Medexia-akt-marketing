"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live visualisation of the adaptive algorithm inside the Algorithm pillar
 * card. Thirty-two dots map 1:1 to the 32 RCGP AKT curriculum topics.
 *
 * Four phases, triggered once when scrolled into view:
 *   calibrating — dots flicker through colours (0 → 1.1s)
 *   identified  — weak-spot dots settle red with a pulse (1.1 → 2.0s)
 *   drilling    — weak-spot dots progressively flip to violet (2.0 → 4.0s)
 *   success     — all 32 dots land on brand violet and stay (4.0s+)
 *
 * Informational motion — shows the algorithm working, not decorative.
 */

type Phase = "idle" | "calibrating" | "identified" | "drilling" | "success";

const TOTAL = 32;
// Deterministic "weak spot" indices across the 8×4 grid. Chosen to look
// scattered rather than clustered.
const WEAK: readonly number[] = [2, 6, 11, 17, 24, 29];

const LABEL: Record<Phase, string> = {
  idle: "Calibrating across 32 topics",
  calibrating: "Calibrating across 32 topics",
  identified: `${WEAK.length} weak spots identified`,
  drilling: "Closing the gaps",
  success: "On track to pass",
};

export function AlgorithmViz() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [drilled, setDrilled] = useState<number[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;

    const run = async () => {
      setPhase("calibrating");
      await wait(1100);
      setPhase("identified");
      await wait(900);
      setPhase("drilling");
      for (let i = 0; i < WEAK.length; i++) {
        await wait(320);
        setDrilled((prev) => [...prev, WEAK[i]]);
      }
      await wait(500);
      setPhase("success");
    };

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Skip the animation entirely — go straight to success state.
      setDrilled([...WEAK]);
      setPhase("success");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          void run();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-5">
      <div
        className="text-[10px] tracking-[0.18em] uppercase font-semibold transition-colors"
        style={{
          color:
            phase === "success"
              ? "rgba(52,211,153,.9)"
              : phase === "identified"
                ? "rgba(239,68,68,.85)"
                : "rgba(167,139,250,.75)",
        }}
        aria-live="polite"
      >
        {LABEL[phase]}
      </div>

      <div
        role="img"
        aria-label="Visualization of the algorithm calibrating across 32 AKT curriculum topics, identifying weak spots and closing the gaps"
        className="mt-3 grid grid-cols-8 gap-[8px] max-w-[260px]"
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const isWeak = WEAK.includes(i);
          const isDrilled = drilled.includes(i);
          const state =
            phase === "idle"
              ? "idle"
              : phase === "calibrating"
                ? "flicker"
                : phase === "identified"
                  ? isWeak
                    ? "weak"
                    : "idle"
                  : phase === "drilling"
                    ? isDrilled
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

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
