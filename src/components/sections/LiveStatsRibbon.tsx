"use client";

import { useEffect, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function formatNumber(n: number): string {
  if (n >= 1000) return n.toLocaleString("en-GB");
  return String(n);
}

export function LiveStatsRibbon() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal(0.2);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    fetch("https://app.medexia-akt.com/api/public/stats", {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          data &&
          typeof data.userCount === "number" &&
          data.userCount >= 0
        ) {
          setUserCount(Math.min(Math.floor(data.userCount), 99999));
        }
      })
      .catch(() => {})
      .finally(() => clearTimeout(timeout));

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  const showLive = userCount !== null && userCount >= 20;

  // Only count-up the live user figure — it's genuinely dynamic so the
  // animation makes sense. The static stats (hours, questions, topics) are
  // fixed marketing claims: animating them through false values (72, 16800,
  // 24) would undermine trust, so they're displayed directly.
  const liveStart = userCount ? Math.max(1, Math.floor(userCount * 0.82)) : 0;
  const liveAnim = useCountUp(userCount ?? 0, 1200, visible && showLive, liveStart);

  const stats: {
    value: string;
    suffix?: string;
    label: string;
    accent: string;
    gradient?: boolean;
  }[] = [
    ...(showLive
      ? [
          {
            value: formatNumber(liveAnim),
            label: "trainees revising now",
            accent: "rgba(155,107,255,.9)",
            gradient: true,
          },
        ]
      : []),
    {
      value: "90",
      suffix: "+",
      label: "hours of audio",
      accent: "rgba(236,72,153,.9)",
    },
    {
      value: "1,000s",
      label: "of syllabus-mapped questions",
      accent: "rgba(52,211,153,.9)",
    },
    {
      value: "32",
      label: "AKT topics",
      accent: "rgba(96,165,250,.9)",
    },
  ];

  const cols = showLive ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3";

  return (
    <div
      ref={ref}
      className="mt-10 md:mt-14 mx-auto max-w-[860px]"
    >
      <div className={`grid ${cols} gap-x-4 gap-y-8 md:gap-x-8 justify-items-center`}>
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div
              className="tabular-nums font-bold text-[34px] md:text-[52px] leading-none"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
                color: s.gradient ? "transparent" : s.accent,
                backgroundImage: s.gradient
                  ? "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))"
                  : undefined,
                WebkitBackgroundClip: s.gradient ? "text" : undefined,
                backgroundClip: s.gradient ? "text" : undefined,
              }}
            >
              {s.value}
              {s.suffix && (
                <span className="text-[26px] md:text-[40px]" style={{ opacity: 0.85 }}>
                  {s.suffix}
                </span>
              )}
            </div>
            <div
              className="mt-2 text-[11px] md:text-[12px] tracking-[0.12em] uppercase font-semibold"
              style={{ color: "rgba(232,236,255,.55)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <p
        className="mt-8 md:mt-10 text-center text-[13px] md:text-[14px] font-medium"
        style={{ color: "rgba(52,211,153,.9)" }}
      >
        Free until 8 July. Then questions stay free — full audio from £59.
      </p>
    </div>
  );
}
