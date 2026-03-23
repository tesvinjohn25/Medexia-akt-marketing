"use client";

import { useEffect, useState } from "react";

// UTC noon to avoid BST hydration mismatch
const APRIL_DATE = new Date("2026-04-27T12:00:00Z");
const JULY_DATE = new Date("2026-07-07T12:00:00Z");

function getDaysUntil(target: Date): number {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function isAfter(target: Date): boolean {
  return new Date() > target;
}

export function ExamCountdown({
  variant = "hero",
}: {
  variant?: "hero" | "compact";
}) {
  const [mounted, setMounted] = useState(false);
  const [aprilDays, setAprilDays] = useState(0);
  const [julyDays, setJulyDays] = useState(0);

  useEffect(() => {
    setAprilDays(getDaysUntil(APRIL_DATE));
    setJulyDays(getDaysUntil(JULY_DATE));
    setMounted(true);

    const interval = setInterval(() => {
      setAprilDays(getDaysUntil(APRIL_DATE));
      setJulyDays(getDaysUntil(JULY_DATE));
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const aprilPast = isAfter(APRIL_DATE);
  const julyPast = isAfter(JULY_DATE);

  // Post-July: hide completely
  if (mounted && julyPast) return null;

  const isCompact = variant === "compact";

  return (
    <div
      className={`flex gap-3 ${isCompact ? "justify-center" : ""}`}
      aria-live="polite"
    >
      {/* April card */}
      <div
        className={`flex-1 rounded-xl border text-center ${isCompact ? "max-w-[160px] p-3" : "p-4"}`}
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="text-[10px] tracking-[0.14em] uppercase font-semibold mb-1"
          style={{ color: "var(--fg-muted)" }}
        >
          April sitting
        </div>
        {mounted && aprilPast ? (
          <div
            className="text-[13px] font-medium"
            style={{ color: "var(--fg-muted)" }}
          >
            Sitting complete
          </div>
        ) : (
          <>
            <div
              className="text-[11px] font-medium mb-0.5"
              style={{ color: "var(--fg-mid)" }}
            >
              Apr 27
            </div>
            <div
              className="text-[22px] font-bold tabular-nums"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fg-high)",
              }}
            >
              {mounted ? aprilDays : "--"}
            </div>
            <div
              className="text-[11px] font-medium"
              style={{ color: "var(--fg-muted)" }}
            >
              days
            </div>
          </>
        )}
      </div>

      {/* July card — visually bolder */}
      <div
        className={`flex-1 rounded-xl border-2 text-center ${isCompact ? "max-w-[160px] p-3" : "p-4"}`}
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--brand-iris)",
        }}
      >
        <div
          className="text-[10px] tracking-[0.14em] uppercase font-semibold mb-1"
          style={{ color: "var(--brand-iris)" }}
        >
          July sitting
        </div>
        <div
          className="text-[11px] font-medium mb-0.5"
          style={{ color: "var(--fg-mid)" }}
        >
          Jul 7
        </div>
        <div
          className="text-[22px] font-bold tabular-nums"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--fg-high)",
          }}
        >
          {mounted ? julyDays : "--"}
        </div>
        <div
          className="text-[11px] font-medium"
          style={{ color: "var(--brand-iris)" }}
        >
          days
        </div>
      </div>
    </div>
  );
}
