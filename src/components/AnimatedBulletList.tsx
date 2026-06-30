"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealState = "idle" | "pending" | "visible";
type RevealTag = "ul" | "ol" | "div";

function useRevealState() {
  const ref = useRef<HTMLElement | null>(null);
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

  return { ref, revealState };
}

function AnimatedRevealContainer({
  as = "ul",
  children,
  className = "",
}: {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
}) {
  const { ref, revealState } = useRevealState();
  const bindRef = (node: HTMLElement | null) => {
    ref.current = node;
  };
  const dataVisible =
    revealState === "visible"
      ? "true"
      : revealState === "pending"
        ? "false"
        : "idle";

  if (as === "ol") {
    return (
      <ol
        ref={bindRef}
        className={className}
        data-bullet-list-visible={dataVisible}
      >
        {children}
      </ol>
    );
  }

  if (as === "div") {
    return (
      <div
        ref={bindRef}
        className={className}
        data-bullet-list-visible={dataVisible}
      >
        {children}
      </div>
    );
  }

  return (
    <ul
      ref={bindRef}
      className={className}
      data-bullet-list-visible={dataVisible}
    >
      {children}
    </ul>
  );
}

export function AnimatedBulletList({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatedRevealContainer
      as="ul"
      className={`animated-bullet-list ${className}`}
    >
      {children}
    </AnimatedRevealContainer>
  );
}

export function AnimatedStepList({
  as = "div",
  children,
  className = "",
}: {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatedRevealContainer
      as={as}
      className={`animated-step-list ${className}`}
    >
      {children}
    </AnimatedRevealContainer>
  );
}
