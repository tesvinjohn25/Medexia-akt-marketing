"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const ACTIVE_ATTRIBUTE = "data-nebula-active";
const TARGET_SELECTOR = "[data-nebula-target]";

type Point = {
  x: number;
  y: number;
};

type Waypoint = Point & {
  focusY: number;
  id: string;
  target: HTMLElement;
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

const interpolate = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

const smoothstep = (progress: number) => progress * progress * (3 - 2 * progress);

function getVisibleElement<T extends HTMLElement>(
  root: HTMLElement,
  selector: string,
) {
  return Array.from(root.querySelectorAll<T>(selector)).find((element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 1 && rect.height > 1;
  });
}

function getAnchorElement(target: HTMLElement) {
  if (!target.classList.contains("nebula-target--section")) return target;
  return (
    getVisibleElement<HTMLElement>(target, ".nebula-fill") ??
    getVisibleElement<HTMLElement>(target, ".card") ??
    target
  );
}

function getImpactElement(target: HTMLElement) {
  return (
    getVisibleElement<HTMLElement>(target, ".nebula-node") ??
    getVisibleElement<HTMLElement>(target, ".nebula-fill") ??
    getAnchorElement(target)
  );
}

function getWaypoint(target: HTMLElement): Waypoint {
  const anchor = getAnchorElement(target);
  const anchorRect = anchor.getBoundingClientRect();
  const impactElement = getImpactElement(target);
  const impactRect = impactElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const isCompactViewport = viewportWidth < 768;
  const isHeroProofTarget = target.dataset.nebulaTarget === "hero-proof";
  const hasNodeImpact = impactElement.classList.contains("nebula-node");
  const maxLandingX = isCompactViewport ? viewportWidth - 38 : viewportWidth - 76;

  if (isCompactViewport && isHeroProofTarget) {
    return {
      focusY: viewportHeight * 0.42,
      id: target.dataset.nebulaTarget ?? "unknown",
      target,
      x: clamp(viewportWidth - 54, 72, maxLandingX),
      y: clamp(viewportHeight * 0.24, 86, viewportHeight - 86),
    };
  }

  const x = clamp(
    hasNodeImpact
      ? impactRect.left - 68
      : anchorRect.left + Math.min(anchorRect.width * 0.12, 72),
    72,
    maxLandingX,
  );
  const y = clamp(
    hasNodeImpact
      ? impactRect.top + impactRect.height / 2
      : anchorRect.top + Math.min(anchorRect.height * 0.42, 92),
    86,
    viewportHeight - 86,
  );

  return {
    focusY:
      anchorRect.top +
      scrollY +
      Math.min(anchorRect.height * 0.42, viewportHeight * 0.52),
    id: target.dataset.nebulaTarget ?? "unknown",
    target,
    x,
    y,
  };
}

function getScrollLinkedPoint(waypoints: Waypoint[]): Waypoint {
  const focusY = window.scrollY + window.innerHeight * 0.42;

  if (focusY <= waypoints[0].focusY) return waypoints[0];
  const last = waypoints[waypoints.length - 1];
  if (focusY >= last.focusY) return last;

  for (let index = 0; index < waypoints.length - 1; index += 1) {
    const start = waypoints[index];
    const end = waypoints[index + 1];
    if (focusY < start.focusY || focusY > end.focusY) continue;

    const distance = Math.max(end.focusY - start.focusY, 1);
    const progress = smoothstep(clamp((focusY - start.focusY) / distance, 0, 1));

    return {
      focusY,
      id: progress < 0.5 ? start.id : end.id,
      target: progress < 0.5 ? start.target : end.target,
      x: interpolate(start.x, end.x, progress),
      y: interpolate(start.y, end.y, progress),
    };
  }

  return last;
}

function buildTrailPath(point: Point, angle: number) {
  const viewportWidth = window.innerWidth;
  const isCompactViewport = viewportWidth < 768;
  const length = isCompactViewport ? 168 : 260;
  const curve = isCompactViewport ? 22 : 36;
  const radians = (angle * Math.PI) / 180;
  const forwardX = Math.cos(radians);
  const forwardY = Math.sin(radians);
  const normalX = -forwardY;
  const normalY = forwardX;
  const startX = point.x - forwardX * length;
  const startY = point.y - forwardY * length;
  const controlOneX = startX + forwardX * length * 0.36 + normalX * curve;
  const controlOneY = startY + forwardY * length * 0.36 + normalY * curve;
  const controlTwoX = point.x - forwardX * length * 0.32 - normalX * curve * 0.42;
  const controlTwoY = point.y - forwardY * length * 0.32 - normalY * curve * 0.42;

  return `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${controlOneX.toFixed(1)} ${controlOneY.toFixed(1)}, ${controlTwoX.toFixed(1)} ${controlTwoY.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
}

export function NebulaFlow() {
  const flowRef = useRef<HTMLDivElement>(null);
  const trajectoryRef = useRef<SVGSVGElement>(null);
  const hazePathRef = useRef<SVGPathElement>(null);
  const corePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const flow = flowRef.current;
    const trajectory = trajectoryRef.current;
    const hazePath = hazePathRef.current;
    const corePath = corePathRef.current;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(TARGET_SELECTOR),
    );

    if (!flow || !trajectory || !hazePath || !corePath || targets.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      flow.dataset.ready = "false";
      return;
    }

    let animationFrame = 0;
    let initialized = false;
    let currentActiveTarget = "";
    let currentX = 0;
    let currentY = 0;
    let currentAngle = -28;

    const clearActiveTargets = () => {
      targets.forEach((target) => target.removeAttribute(ACTIVE_ATTRIBUTE));
    };

    const setActiveTarget = (waypoint: Waypoint) => {
      if (waypoint.id === currentActiveTarget) return;
      currentActiveTarget = waypoint.id;
      clearActiveTargets();
      waypoint.target.setAttribute(ACTIVE_ATTRIBUTE, "true");
      flow.dataset.activeTarget = waypoint.id;
    };

    const applyMotion = (point: Point, angle: number) => {
      flow.style.setProperty("--comet-x", `${point.x.toFixed(1)}px`);
      flow.style.setProperty("--comet-y", `${point.y.toFixed(1)}px`);
      flow.style.setProperty("--comet-angle", `${angle.toFixed(2)}deg`);
      trajectory.setAttribute(
        "viewBox",
        `0 0 ${window.innerWidth} ${window.innerHeight}`,
      );

      const pathD = buildTrailPath(point, angle);
      hazePath.setAttribute("d", pathD);
      corePath.setAttribute("d", pathD);
      flow.dataset.ready = "true";
    };

    const tick = () => {
      animationFrame = 0;

      const waypoints = targets
        .map(getWaypoint)
        .sort((left, right) => left.focusY - right.focusY);
      const desired = getScrollLinkedPoint(waypoints);

      if (!initialized) {
        currentX = desired.x;
        currentY = desired.y;
        initialized = true;
      }

      const deltaX = desired.x - currentX;
      const deltaY = desired.y - currentY;
      const distance = Math.hypot(deltaX, deltaY);
      const easing = distance > 180 ? 0.24 : 0.18;

      currentX += deltaX * easing;
      currentY += deltaY * easing;

      if (distance > 0.35) {
        currentAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      }

      setActiveTarget(desired);
      applyMotion({ x: currentX, y: currentY }, currentAngle);

      if (distance > 0.6) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const scheduleTick = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("nebula-flow-mounted");
    scheduleTick();

    window.addEventListener("scroll", scheduleTick, { passive: true });
    window.addEventListener("resize", scheduleTick);
    window.addEventListener("orientationchange", scheduleTick);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleTick);
      window.removeEventListener("resize", scheduleTick);
      window.removeEventListener("orientationchange", scheduleTick);
      clearActiveTargets();
      document.documentElement.classList.remove("nebula-flow-mounted");
    };
  }, []);

  return (
    <div
      ref={flowRef}
      className="nebula-flow"
      aria-hidden="true"
      data-active-target="hero-proof"
      data-ready="false"
      style={
        {
          "--comet-angle": "-28deg",
          "--comet-x": "0px",
          "--comet-y": "0px",
        } as CSSProperties
      }
    >
      <svg
        ref={trajectoryRef}
        className="nebula-flow__trajectory"
        viewBox="0 0 1280 720"
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
          ref={hazePathRef}
          className="nebula-flow__path nebula-flow__path--haze"
          d=""
        />
        <path
          ref={corePathRef}
          className="nebula-flow__path nebula-flow__path--core"
          d=""
        />
      </svg>

      <div className="nebula-comet">
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

      <div className="nebula-impact">
        <span />
      </div>
    </div>
  );
}
