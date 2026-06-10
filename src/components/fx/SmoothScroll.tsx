"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

/**
 * Inertial smooth scrolling, desktop only.
 *
 * Touch devices keep fully native scrolling (Lenis is never created), and
 * prefers-reduced-motion opts out entirely. Lenis drives the *native*
 * scroll position, so position: sticky, scroll listeners (AudioJourney)
 * and anchor links keep working; ScrollTrigger is kept in sync via the
 * shared GSAP ticker.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
