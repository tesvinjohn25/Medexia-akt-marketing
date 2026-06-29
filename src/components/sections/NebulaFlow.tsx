"use client";

import { useEffect, useState, type CSSProperties } from "react";

const ACTIVE_ATTRIBUTE = "data-nebula-active";
const TARGET_SELECTOR = "[data-nebula-target]";

type CometState = {
  activeTarget: string;
  angle: number;
  flightKey: number;
  pathD: string;
  ready: boolean;
  travelX: number;
  travelY: number;
  viewBox: string;
  x: number;
  y: number;
};

const INITIAL_COMET_STATE: CometState = {
  activeTarget: "hero-proof",
  angle: 138,
  flightKey: 0,
  pathD: "",
  ready: false,
  travelX: 180,
  travelY: -220,
  viewBox: "0 0 1280 720",
  x: 0,
  y: 0,
};

const sparkPositions = [
  { drift: -18, x: 18, y: 34 },
  { drift: 12, x: 32, y: 22 },
  { drift: -6, x: 46, y: 42 },
  { drift: 20, x: 58, y: 30 },
  { drift: -22, x: 70, y: 48 },
  { drift: 8, x: 82, y: 24 },
  { drift: -12, x: 92, y: 38 },
] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function getAnchorElement(target: HTMLElement) {
  if (!target.classList.contains("nebula-target--section")) return target;
  return (
    target.querySelector<HTMLElement>(".nebula-fill") ??
    target.querySelector<HTMLElement>(".card") ??
    target
  );
}

function getImpactElement(target: HTMLElement) {
  return (
    target.querySelector<HTMLElement>(".nebula-node") ??
    target.querySelector<HTMLElement>(".nebula-fill") ??
    getAnchorElement(target)
  );
}

export function NebulaFlow() {
  const [comet, setComet] = useState<CometState>(INITIAL_COMET_STATE);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(TARGET_SELECTOR),
    );

    if (targets.length === 0) return;

    let currentTarget = "";
    let currentElement: HTMLElement | null = null;
    let frame = 0;

    const clearActiveTargets = () => {
      targets.forEach((target) => {
        target.removeAttribute(ACTIVE_ATTRIBUTE);
        target.style.removeProperty("--nebula-impact-x");
        target.style.removeProperty("--nebula-impact-y");
      });
    };

    const measureTarget = (target: HTMLElement, restartFlight: boolean) => {
      const anchor = getAnchorElement(target);
      const anchorRect = anchor.getBoundingClientRect();
      const impactElement = getImpactElement(target);
      const impactRect = impactElement.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const hasNodeImpact = impactElement.classList.contains("nebula-node");

      const landingX = clamp(
        hasNodeImpact
          ? impactRect.left - 68
          : anchorRect.left + Math.min(anchorRect.width * 0.12, 72),
        72,
        viewportWidth - 76,
      );
      const landingY = clamp(
        hasNodeImpact
          ? impactRect.top + impactRect.height / 2
          : anchorRect.top + Math.min(anchorRect.height * 0.42, 92),
        86,
        viewportHeight - 86,
      );
      const startX = clamp(landingX - 220, 36, viewportWidth - 160);
      const startY = clamp(landingY - 300, 26, viewportHeight - 180);
      const controlOneX = clamp(startX + 46, 28, viewportWidth - 28);
      const controlOneY = clamp(startY + 150, 28, viewportHeight - 28);
      const controlTwoX = clamp(landingX - 136, 28, viewportWidth - 28);
      const controlTwoY = clamp(landingY - 118, 28, viewportHeight - 28);
      const radians = Math.atan2(landingY - startY, landingX - startX);
      const impactX = clamp(landingX - targetRect.left, 0, targetRect.width);
      const impactY = clamp(landingY - targetRect.top, 0, targetRect.height);

      target.style.setProperty("--nebula-impact-x", `${impactX}px`);
      target.style.setProperty("--nebula-impact-y", `${impactY}px`);

      setComet((previous) => ({
        activeTarget: target.dataset.nebulaTarget ?? "unknown",
        angle: (radians * 180) / Math.PI,
        flightKey: restartFlight ? previous.flightKey + 1 : previous.flightKey,
        pathD: `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${controlOneX.toFixed(1)} ${controlOneY.toFixed(1)}, ${controlTwoX.toFixed(1)} ${controlTwoY.toFixed(1)}, ${landingX.toFixed(1)} ${landingY.toFixed(1)}`,
        ready: true,
        travelX: startX - landingX,
        travelY: startY - landingY,
        viewBox: `0 0 ${viewportWidth} ${viewportHeight}`,
        x: landingX,
        y: landingY,
      }));
    };

    const setActive = (target: HTMLElement | null) => {
      if (!target) return;

      const nextTarget = target.dataset.nebulaTarget ?? "";
      if (nextTarget === currentTarget) return;

      currentTarget = nextTarget;
      currentElement = target;
      clearActiveTargets();
      target.setAttribute(ACTIVE_ATTRIBUTE, "true");
      measureTarget(target, true);
    };

    document.documentElement.classList.add("nebula-flow-mounted");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      prefersReducedMotion ||
      typeof window.IntersectionObserver === "undefined"
    ) {
      setActive(targets[0]);
      setComet((previous) => ({ ...previous, ready: false }));
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
    setActive(targets[0]);

    const scheduleMeasure = () => {
      if (frame || !currentElement) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (currentElement) measureTarget(currentElement, false);
      });
    };

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("scroll", scheduleMeasure, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure);
      clearActiveTargets();
      document.documentElement.classList.remove("nebula-flow-mounted");
    };
  }, []);

  const flowStyle = {
    "--comet-angle": `${comet.angle}deg`,
    "--comet-travel-x": `${comet.travelX}px`,
    "--comet-travel-y": `${comet.travelY}px`,
    "--comet-x": `${comet.x}px`,
    "--comet-y": `${comet.y}px`,
  } as CSSProperties;

  return (
    <div
      className="nebula-flow"
      aria-hidden="true"
      data-active-target={comet.activeTarget}
      data-ready={comet.ready ? "true" : "false"}
      style={flowStyle}
    >
      <svg
        className="nebula-flow__trajectory"
        viewBox={comet.viewBox}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="nebulaTrajectoryGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="30%" stopColor="rgba(197,170,255,.22)" />
            <stop offset="58%" stopColor="rgba(155,107,255,.70)" />
            <stop offset="82%" stopColor="rgba(236,72,153,.38)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.88)" />
          </linearGradient>
          <filter id="nebulaTrajectoryGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          key={`trajectory-haze-${comet.flightKey}`}
          className="nebula-flow__path nebula-flow__path--haze"
          d={comet.pathD}
          pathLength={1}
        />
        <path
          key={`trajectory-core-${comet.flightKey}`}
          className="nebula-flow__path nebula-flow__path--core"
          d={comet.pathD}
          pathLength={1}
        />
      </svg>

      <div className="nebula-comet" key={`comet-${comet.flightKey}`}>
        <span className="nebula-comet__aura" />
        <span className="nebula-comet__tail nebula-comet__tail--wide" />
        <span className="nebula-comet__tail nebula-comet__tail--core" />
        {sparkPositions.map((spark, index) => (
          <span
            key={index}
            className="nebula-comet__spark"
            style={
              {
                "--spark": index,
                "--spark-drift": `${spark.drift}px`,
                "--spark-x": `${spark.x}px`,
                "--spark-y": `${spark.y}px`,
              } as CSSProperties
            }
          />
        ))}
        <svg
          className="nebula-comet__ship"
          viewBox="0 0 120 82"
          role="presentation"
        >
          <defs>
            <linearGradient id="nebulaCometSkin" x1="8" x2="112" y1="12" y2="72">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".34" stopColor="#efe7ff" />
              <stop offset=".64" stopColor="#9b6bff" />
              <stop offset="1" stopColor="#6d6ae8" />
            </linearGradient>
            <linearGradient id="nebulaCometWing" x1="36" x2="94" y1="14" y2="76">
              <stop offset="0" stopColor="rgba(255,255,255,.75)" />
              <stop offset=".52" stopColor="rgba(197,170,255,.7)" />
              <stop offset="1" stopColor="rgba(109,106,232,.92)" />
            </linearGradient>
          </defs>
          <path
            d="M8 42L112 8 73 74 56 50 35 63 46 47 8 42Z"
            fill="url(#nebulaCometSkin)"
          />
          <path
            d="M46 47L112 8 56 50 35 63 46 47Z"
            fill="url(#nebulaCometWing)"
            opacity=".82"
          />
          <path
            d="M56 50L73 74 64 47 112 8 56 50Z"
            fill="rgba(66,54,190,.68)"
          />
          <path
            d="M8 42L112 8 46 47Z"
            fill="rgba(255,255,255,.48)"
          />
        </svg>
      </div>

      <div className="nebula-impact" key={`impact-${comet.flightKey}`}>
        <span />
      </div>
    </div>
  );
}
