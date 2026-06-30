"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealState = "idle" | "pending" | "visible";

export function AnimatedBulletList({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [revealState, setRevealState] = useState<RevealState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setRevealState("visible");
      return;
    }

    const rect = el.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < viewportHeight * 0.88 && rect.bottom > 0) {
      setRevealState("visible");
      return;
    }

    setRevealState("pending");

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        setRevealState("visible");
        obs.unobserve(entry.target);
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.22 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={ref}
      className={`animated-bullet-list ${className}`}
      data-bullet-list-visible={
        revealState === "visible"
          ? "true"
          : revealState === "pending"
            ? "false"
            : "idle"
      }
    >
      {children}
    </ul>
  );
}
