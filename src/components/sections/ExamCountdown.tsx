"use client";

import { useEffect, useState } from "react";
import { EXAM_SITTINGS, type ExamSitting } from "@/data/exam-dates";

function getDaysUntil(target: Date): number {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function isAfter(target: Date): boolean {
  return new Date() > target;
}

function getVisibleSittings(): ExamSitting[] {
  const future = EXAM_SITTINGS.filter((sitting) => !isAfter(sitting.date));
  return future.slice(0, 2);
}

export function ExamCountdown({
  variant = "hero",
}: {
  variant?: "hero" | "compact";
}) {
  const [mounted, setMounted] = useState(false);
  const [daysByLabel, setDaysByLabel] = useState<Record<string, number>>({});

  useEffect(() => {
    const updateDays = () => {
      setDaysByLabel(
        Object.fromEntries(
          getVisibleSittings().map((sitting) => [
            sitting.label,
            getDaysUntil(sitting.date),
          ]),
        ),
      );
    };

    updateDays();
    setMounted(true);

    const interval = setInterval(updateDays, 60_000);

    return () => clearInterval(interval);
  }, []);

  const visibleSittings = getVisibleSittings();

  if (mounted && visibleSittings.length === 0) return null;

  const isCompact = variant === "compact";

  return (
    <div
      className={`flex gap-3 ${isCompact ? "justify-center" : ""}`}
      aria-live="polite"
    >
      {visibleSittings.map((sitting, index) => {
        const isNext = index === 0;
        return (
          <div
            key={sitting.label}
            className={`flex-1 rounded-xl text-center ${isNext ? "border-2" : "border"} ${isCompact ? "max-w-[160px] p-3" : "p-4"}`}
            style={{
              background: "var(--bg-surface)",
              borderColor: isNext ? "var(--brand-iris)" : "var(--border)",
            }}
          >
            <div
              className="text-[10px] tracking-[0.14em] uppercase font-semibold mb-1"
              style={{ color: isNext ? "var(--brand-iris)" : "var(--fg-muted)" }}
            >
              {sitting.label.replace(" 2026", "")} sitting
            </div>
            <div
              className="text-[11px] font-medium mb-0.5"
              style={{ color: "var(--fg-mid)" }}
            >
              {sitting.shortLabel}
            </div>
            <div
              className="text-[22px] font-bold tabular-nums"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fg-high)",
              }}
            >
              {mounted ? daysByLabel[sitting.label] : "--"}
            </div>
            <div
              className="text-[11px] font-medium"
              style={{ color: isNext ? "var(--brand-iris)" : "var(--fg-muted)" }}
            >
              days
            </div>
          </div>
        );
      })}
    </div>
  );
}
