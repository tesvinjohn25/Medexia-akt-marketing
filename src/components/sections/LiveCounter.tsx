"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATIC_STATS = [
  { value: "50+", label: "hours of audio", accent: "var(--brand-iris)" },
  { value: "32", label: "AKT topics", accent: "var(--brand-violet)" },
  { value: "20,000+", label: "questions", accent: "rgba(52,211,153,.85)" },
];

export function LiveCounter() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    fetch("https://app.medexia-akt.com/api/public/stats", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          typeof data?.userCount === "number" &&
          data.userCount >= 0
        ) {
          setUserCount(data.userCount);
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

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div
          className="mx-auto max-w-[680px] rounded-2xl px-6 py-8 md:px-10 md:py-10"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {showLive && (
              <div
                className="r-scale text-center"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <div
                  className="text-[36px] md:text-[42px] font-bold tabular-nums"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {userCount}
                </div>
                <div
                  className="text-[12px] tracking-[0.08em] uppercase font-semibold mt-1"
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
                  className="text-[28px] md:text-[32px] font-bold tabular-nums"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                    color: stat.accent,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[12px] tracking-[0.08em] uppercase font-semibold mt-1"
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
