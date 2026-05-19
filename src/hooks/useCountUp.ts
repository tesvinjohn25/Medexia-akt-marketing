"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from `startAt` → target over `duration` ms when `trigger` is true.
 * Only runs once per mount — toggling trigger back to false after firing does
 * not reset it. Use together with useScrollReveal to drive scroll-triggered
 * counter animations.
 */
export function useCountUp(
  target: number,
  duration: number,
  trigger: boolean,
  startAt = 0,
) {
  const [count, setCount] = useState(startAt);
  const started = useRef(false);

  useEffect(() => {
    if (!started.current) setCount(startAt);
  }, [startAt]);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(startAt + eased * (target - startAt)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger, startAt]);

  return count;
}
