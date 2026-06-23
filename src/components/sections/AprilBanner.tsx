"use client";

import { useEffect, useState } from "react";
import { APRIL_SITTING } from "@/data/exam-dates";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";

const APRIL_DATE = APRIL_SITTING.date;

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
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="flex-shrink-0 h-2 w-2 rounded-full"
          style={{ background: "var(--brand-iris)", boxShadow: "0 0 8px rgba(109,106,232,.5)" }}
          aria-hidden
        />
        <div
          className="flex-1 text-[13px] md:text-[14px] leading-[1.55]"
          style={{ color: "var(--fg-mid)" }}
        >
          <strong style={{ color: "var(--fg-high)" }}>
            April sitting
          </strong>
          {" "}&mdash;{" "}
          <span className="tabular-nums font-semibold" style={{ color: "var(--brand-iris)" }}>
            {mounted ? daysLeft : "--"} days
          </span>{" "}
          remaining.{" "}
          <TrackedAppLink
            href="/"
            intent="app_open"
            className="font-semibold transition-colors hover:text-white"
            style={{ color: "var(--brand-violet-light)", textDecoration: "none" }}
          >
            Start a mock &rarr;
          </TrackedAppLink>
        </div>
      </div>
    </div>
  );
}
