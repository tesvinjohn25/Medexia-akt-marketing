"use client";

import React from "react";

// Screen rect in SOURCE hero frame pixels (the underlying 1080x1920 frame image).
const SCREEN = {
  left: 222,
  top: 332,
  width: 660,
  height: 1200,
  radius: 36,
};

// Demo frames configuration
const DEMO_FRAME_COUNT = 827;

export type FrameTransform = {
  x: number;
  y: number;
  s: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function PhoneScreenDemo({
  progress,
  demoProgress,
  transform,
  onFrameChange,
}: {
  progress: number;
  demoProgress: number;
  transform: FrameTransform | null;
  onFrameChange?: (frame: number) => void;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const framesRef = React.useRef<HTMLImageElement[]>([]);
  const loadedRef = React.useRef<Set<number>>(new Set());
  const currentFrameRef = React.useRef<number>(0);
  const rafRef = React.useRef<number>(0);

  // Fade in at the end of hero motion
  const t0 = 0.965;
  const fade = Math.min(1, Math.max(0, (progress - t0) / (1 - t0)));

  // Calculate target frame from demo progress
  const targetFrame = Math.floor(demoProgress * (DEMO_FRAME_COUNT - 1));

  // Initialize frames array once
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (framesRef.current.length > 0) return;

    const frames: HTMLImageElement[] = [];
    for (let i = 0; i < DEMO_FRAME_COUNT; i++) {
      const img = new window.Image();
      frames.push(img);
    }
    framesRef.current = frames;
  }, []);

  // Preload frames around current position (both directions for reverse scroll)
  const preloadWindow = React.useCallback((centerIdx: number) => {
    const frames = framesRef.current;
    if (frames.length === 0) return;

    // Preload ±15 frames for smooth reverse scrolling
    const start = clamp(centerIdx - 15, 0, DEMO_FRAME_COUNT - 1);
    const end = clamp(centerIdx + 15, 0, DEMO_FRAME_COUNT - 1);

    for (let i = start; i <= end; i++) {
      if (!loadedRef.current.has(i)) {
        const id = String(i + 1).padStart(4, "0");
        frames[i]!.src = `/demo/frames/frame_${id}.jpg`;
        loadedRef.current.add(i);
      }
    }
  }, []);

  // Draw frame to canvas
  const drawFrame = React.useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames = framesRef.current;
    const img = frames[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = Math.floor(rect.width * dpr);
    const h = Math.floor(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fill entire canvas with the frame (aspect-fill / cover)
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const s = Math.max(w / iw, h / ih);
    const rw = iw * s;
    const rh = ih * s;
    const x = (w - rw) / 2;
    const y = (h - rh) / 2;

    ctx.drawImage(img, x, y, rw, rh);
  }, []);

  // Animation loop for smooth frame updates (works both forward and backward)
  React.useEffect(() => {
    if (fade < 0.01) return;

    const animate = () => {
      const current = currentFrameRef.current;
      const target = targetFrame;

      // Smoothly interpolate toward target frame (works both directions)
      let next = current;
      if (current !== target) {
        const diff = target - current;
        // Faster interpolation for responsive reverse scrolling
        const step = Math.sign(diff) * Math.max(1, Math.abs(diff) * 0.4);
        next = Math.round(current + step);
        next = clamp(next, 0, DEMO_FRAME_COUNT - 1);
      }

      currentFrameRef.current = next;
      preloadWindow(next);
      drawFrame(next);

      // Report current frame to parent for text overlay sync
      onFrameChange?.(next);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [fade, targetFrame, preloadWindow, drawFrame, onFrameChange]);

  // Initial preload when component becomes visible
  React.useEffect(() => {
    if (fade > 0.01) {
      preloadWindow(0);
    }
  }, [fade, preloadWindow]);

  if (!transform) return null;

  const left = transform.x + SCREEN.left * transform.s;
  const top = transform.y + SCREEN.top * transform.s;
  const width = SCREEN.width * transform.s;
  const height = SCREEN.height * transform.s;
  const r = SCREEN.radius * transform.s;

  return (
    <div
      className="pointer-events-none absolute z-[5]"
      style={{ left, top, width, height, opacity: fade }}
      aria-hidden
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: r, background: "rgba(0,0,0,.25)" }}
      >
        <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />

        {/* Glass / lighting treatment */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(140deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 62%, rgba(0,0,0,.18) 100%)",
            mixBlendMode: "screen",
            opacity: 0.22,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,.35) 70%, rgba(0,0,0,.55) 100%)",
            opacity: 0.35,
          }}
        />
      </div>
    </div>
  );
}

// Export frame count and helper
export const DEMO_FRAME_COUNT_EXPORT = DEMO_FRAME_COUNT;

export function getDemoFrameFromProgress(demoProgress: number): number {
  return Math.floor(demoProgress * (DEMO_FRAME_COUNT - 1));
}
