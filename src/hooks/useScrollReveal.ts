"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll trigger. Fires once by default: content settles into
 * place and stays put, rather than animating out again when the section
 * leaves the viewport (which reads as flicker on fast scrolls).
 */
export function useScrollReveal(threshold = 0.12, once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, visible };
}
