"use client";

import { useEffect, useState } from "react";

const APRIL_DATE = new Date("2026-04-27T12:00:00Z");

export function AprilBanner() {
  const [mounted, setMounted] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calc = () => {
      const diff = APRIL_DATE.getTime() - Date.now();
      return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };
    setDaysLeft(calc());
    setMounted(true);

    const interval = setInterval(() => setDaysLeft(calc()), 60_000);
    return () => clearInterval(interval);
  }, []);

  // Hide after April sitting
  if (mounted && new Date() > APRIL_DATE) return null;

  return (
    <div className="container-x" style={{ paddingTop: "clamp(24px, 4vw, 40px)" }}>
      <div
        role="alert"
        className="rounded-xl px-4 py-3 md:px-6 md:py-4 flex items-center gap-3"
        style={{
          background: "rgba(251,191,36,.06)",
          border: "1px solid rgba(251,191,36,.18)",
        }}
      >
        <span className="text-xl flex-shrink-0" aria-hidden>
          &#9200;
        </span>
        <div
          className="flex-1 text-[13px] md:text-[14px] leading-[1.55]"
          style={{ color: "var(--fg-high)" }}
        >
          <strong style={{ color: "rgba(251,191,36,.9)" }}>
            Sitting the April AKT?
          </strong>{" "}
          {mounted ? daysLeft : "--"} days left. Start a free mock exam and see
          where you stand.{" "}
          <a
            href="https://app.medexia-akt.com"
            className="font-semibold underline underline-offset-2"
            style={{ color: "rgba(251,191,36,.9)" }}
          >
            Start a mock &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
