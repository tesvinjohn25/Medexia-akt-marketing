"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 → target over `duration` ms when `trigger` is true.
 * Only runs once per mount — toggling trigger back to false after firing does
 * not reset it. Use together with useScrollReveal to drive scroll-triggered
 * counter animations.
 */
export function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);

  return count;
}
