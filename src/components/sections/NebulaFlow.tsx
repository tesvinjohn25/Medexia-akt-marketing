"use client";

import { useEffect, useState } from "react";

const ACTIVE_ATTRIBUTE = "data-nebula-active";
const TARGET_SELECTOR = "[data-nebula-target]";

export function NebulaFlow() {
  const [activeTarget, setActiveTarget] = useState("hero-proof");

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(TARGET_SELECTOR),
    );

    if (targets.length === 0) return;

    let currentTarget = "";

    const clearActiveTargets = () => {
      targets.forEach((target) => target.removeAttribute(ACTIVE_ATTRIBUTE));
    };

    const setActive = (target: HTMLElement | null) => {
      if (!target) return;

      const nextTarget = target.dataset.nebulaTarget ?? "";
      if (nextTarget === currentTarget) return;

      currentTarget = nextTarget;
      clearActiveTargets();
      target.setAttribute(ACTIVE_ATTRIBUTE, "true");
      setActiveTarget(nextTarget);
    };

    document.documentElement.classList.add("nebula-flow-mounted");
    setActive(targets[0]);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      prefersReducedMotion ||
      typeof window.IntersectionObserver === "undefined"
    ) {
      return () => {
        clearActiveTargets();
        document.documentElement.classList.remove("nebula-flow-mounted");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleTarget = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
          ?.target;

        if (visibleTarget instanceof HTMLElement) {
          setActive(visibleTarget);
        }
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0.16, 0.28, 0.42, 0.58],
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      clearActiveTargets();
      document.documentElement.classList.remove("nebula-flow-mounted");
    };
  }, []);

  return (
    <div
      className="nebula-flow"
      aria-hidden="true"
      data-active-target={activeTarget}
    >
      <div className="nebula-flow__wake" />
      <div className="nebula-flow__filament" />
      <div className="nebula-flow__dust" />
    </div>
  );
}
