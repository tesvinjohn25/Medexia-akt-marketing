"use client";

import { useEffect, useState } from "react";

const STATIC_STATS = [
  { value: "50+", label: "hours of audio" },
  { value: "32", label: "AKT topics" },
  { value: "3", label: "mock sizes" },
];

export function LiveCounter() {
  const [userCount, setUserCount] = useState<number | null>(null);

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

  // Show live counter if >= 20, otherwise static stats
  const showLive = userCount !== null && userCount >= 20;

  return (
    <section className="section-padding" style={{ paddingTop: 0 }}>
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {showLive && (
            <div className="text-center">
              <div
                className="text-[32px] font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--brand-iris)",
                }}
              >
                {userCount}
              </div>
              <div
                className="text-[12px] font-medium"
                style={{ color: "var(--fg-muted)" }}
              >
                trainees revising
              </div>
            </div>
          )}
          {STATIC_STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-[28px] font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg-high)",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[12px] font-medium"
                style={{ color: "var(--fg-muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
