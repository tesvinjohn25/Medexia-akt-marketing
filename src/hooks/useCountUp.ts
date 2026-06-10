"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from `startAt` → target over `duration` ms when `trigger` is true.
 * Only runs once per mount — toggling trigger back to false after firing does
 * not reset it. Use together with useScrollReveal to drive scroll-triggered
 * counter animations.
 *
 * The resting state is always `target`: server HTML, crawlers, reduced-motion
 * users, and anyone whose reveal never fires must see the true number, never
 * the animation's start value.
 */
export function useCountUp(
  target: number,
  duration: number,
  trigger: boolean,
  startAt = 0,
) {
  const [count, setCount] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (!started.current) setCount(target);
  }, [target]);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

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
