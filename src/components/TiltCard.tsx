"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer-tracked 3D tilt with a travelling glare highlight.
 *
 * The card rotates a few degrees toward the cursor while hovered and
 * springs back to flat on leave (settle curve lives in .tilt-card CSS).
 * Writes only CSS custom properties inside requestAnimationFrame, so the
 * work stays on the compositor. Touch devices get press-down feedback
 * instead of tilt; inert under prefers-reduced-motion.
 */
export function TiltCard({
  children,
  className = "",
  style,
  maxTilt = 4,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Touch devices: no hover, so the card responds to the press
    // itself — gives slightly under the finger, springs back on lift.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const press = () => el.classList.add("is-pressed");
      const release = () => el.classList.remove("is-pressed");
      el.addEventListener("pointerdown", press);
      el.addEventListener("pointerup", release);
      el.addEventListener("pointercancel", release);
      el.addEventListener("pointerleave", release);
      return () => {
        el.removeEventListener("pointerdown", press);
        el.removeEventListener("pointerup", release);
        el.removeEventListener("pointercancel", release);
        el.removeEventListener("pointerleave", release);
      };
    }

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty(
          "--ry",
          `${((px - 0.5) * 2 * maxTilt).toFixed(2)}deg`
        );
        el.style.setProperty(
          "--rx",
          `${((0.5 - py) * 2 * maxTilt).toFixed(2)}deg`
        );
        el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        el.classList.add("is-tilting");
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame.current);
      el.classList.remove("is-tilting");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame.current);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={`tilt-card ${className}`} style={style}>
      {children}
      <span className="tilt-glare" aria-hidden />
    </div>
  );
}
