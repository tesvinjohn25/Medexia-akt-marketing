"use client";

import { useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATIC_STATS = [
  { value: 90, suffix: "+", label: "hours of audio", accent: "var(--brand-iris)" },
  { value: 32, suffix: "", label: "AKT topics", accent: "var(--brand-violet)" },
  { value: 21000, suffix: "+", label: "questions", accent: "rgba(52,211,153,.85)" },
];

function formatNumber(n: number): string {
  if (n >= 1000) return n.toLocaleString("en-GB");
  return String(n);
}

export function LiveCounter() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    fetch("https://app.medexia-akt.com/api/public/stats", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        if (
          typeof data?.userCount === "number" &&
          data.userCount >= 0
        ) {
          setUserCount(Math.min(Math.floor(data.userCount), 99999));
        }
      })
      .catch(() => {
        // Silent fallback to static stats
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  const showLive = userCount !== null && userCount >= 20;

  const liveAnimated = useCountUp(userCount ?? 0, 1200, visible && showLive);
  const audioAnimated = useCountUp(90, 1000, visible);
  const topicsAnimated = useCountUp(32, 800, visible);
  const questionsAnimated = useCountUp(21000, 1400, visible);

  const animatedValues = [audioAnimated, topicsAnimated, questionsAnimated];

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div
          className="mx-auto max-w-[860px] rounded-2xl px-6 py-8 md:px-12 md:py-10"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            className={`grid gap-8 md:gap-10 justify-items-center ${
              showLive ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"
            }`}
          >
            {showLive && (
              <div
                className="r-scale text-center"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <div
                  className="text-[40px] md:text-[52px] font-bold tabular-nums"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {formatNumber(liveAnimated)}
                </div>
                <div
                  className="text-[12px] md:text-[13px] tracking-[0.08em] uppercase font-semibold mt-2"
                  style={{ color: "var(--fg-muted)" }}
                >
                  trainees revising now
                </div>
              </div>
            )}
            {STATIC_STATS.map((stat, i) => (
              <div
                key={i}
                className="r-up text-center"
                style={{ "--i": (showLive ? 1 : 0) + i } as React.CSSProperties}
              >
                <div
                  className="text-[36px] md:text-[48px] font-bold tabular-nums"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                    color: stat.accent,
                  }}
                >
                  {formatNumber(animatedValues[i])}{stat.suffix}
                </div>
                <div
                  className="text-[12px] md:text-[13px] tracking-[0.08em] uppercase font-semibold mt-2"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
