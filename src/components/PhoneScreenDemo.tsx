"use client";

import React from "react";

// Screen rect in SOURCE hero frame pixels (the underlying 1080x1920 frame image).
// These were estimated manually; we compute final CSS coords using the same cover-fit transform as the canvas.
const SCREEN = {
  // Calibrated by eye against the centered hero frame.
  left: 222,
  top: 332,
  width: 660,
  height: 1200,
  // slightly rounded corners (in source px)
  radius: 36,
};

// Demo frames configuration
const DEMO_FRAME_COUNT = 827;
const DEMO_FPS = 15;

// Text overlay configuration - frame ranges and content
const TEXT_OVERLAYS = [
  {
    startFrame: 1,
    endFrame: 90,
    headline: "Stop Guessing. Start Passing.",
    subtext:
      "You don't have time for vague feedback. See your exact probability of passing and visualise your curriculum coverage in real-time.",
  },
  {
    startFrame: 91,
    endFrame: 180,
    headline: "The '10-Minute Gap' Revision.",
    subtext:
      "Designed for the car park or between consults. High-yield clinical vignettes that fit into the tightest schedule.",
  },
  {
    startFrame: 181,
    endFrame: 630,
    headline: "The Examiner's Playbook.",
    subtext:
      "Don't just know the answer. Understand the clinical clues, the red herrings, and exactly why the other options were wrong.",
  },
  {
    startFrame: 631,
    endFrame: 780,
    headline: "Your On-Demand Clinical Supervisor.",
    subtext:
      "Stuck? Ask 'Why?' Challenge the guidelines or clarify a concept. Your AI Supervisor bridges the gap between the textbook and real practice.",
  },
  {
    startFrame: 781,
    endFrame: 827,
    headline: "Active Recall, Automated.",
    subtext:
      "Every mistake becomes a lesson. We auto-generate high-yield Learning Points for you to review minutes before the exam.",
  },
];

export type FrameTransform = {
  // CSS-space (not device pixels)
  x: number; // left offset where the source image begins (after cover fit)
  y: number; // top offset
  s: number; // scale factor applied to source pixels
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function PhoneScreenDemo({
  progress,
  demoProgress,
  transform,
}: {
  progress: number;
  demoProgress: number;
  transform: FrameTransform | null;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const framesRef = React.useRef<HTMLImageElement[]>([]);
  const loadedRef = React.useRef<Set<number>>(new Set());
  const currentFrameRef = React.useRef<number>(0);
  const rafRef = React.useRef<number>(0);

  // Fade in only at the very end of the hero motion.
  const t0 = 0.965;
  const fade = Math.min(1, Math.max(0, (progress - t0) / (1 - t0)));

  // Calculate current frame from demo progress
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

  // Preload frames around current position
  const preloadWindow = React.useCallback((centerIdx: number) => {
    const frames = framesRef.current;
    if (frames.length === 0) return;

    const start = clamp(centerIdx - 10, 0, DEMO_FRAME_COUNT - 1);
    const end = clamp(centerIdx + 10, 0, DEMO_FRAME_COUNT - 1);

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

  // Animation loop for smooth frame updates
  React.useEffect(() => {
    if (fade < 0.01) return;

    const animate = () => {
      const current = currentFrameRef.current;
      const target = targetFrame;

      // Smoothly interpolate toward target frame
      let next = current;
      if (current !== target) {
        const diff = target - current;
        const step = Math.sign(diff) * Math.max(1, Math.abs(diff) * 0.3);
        next = Math.round(current + step);
        next = clamp(next, 0, DEMO_FRAME_COUNT - 1);
      }

      currentFrameRef.current = next;
      preloadWindow(next);
      drawFrame(next);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [fade, targetFrame, preloadWindow, drawFrame]);

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

  // Calculate current text overlay
  const currentFrame = currentFrameRef.current || targetFrame;
  const activeOverlay = TEXT_OVERLAYS.find(
    (o) => currentFrame >= o.startFrame && currentFrame <= o.endFrame
  );

  // Calculate fade for text overlay
  const getOverlayOpacity = (overlay: (typeof TEXT_OVERLAYS)[0]) => {
    const frame = currentFrame;
    const fadeFrames = 15; // Fade over ~1 second at 15fps

    if (frame < overlay.startFrame || frame > overlay.endFrame) return 0;

    // Fade in at start
    const fadeInEnd = overlay.startFrame + fadeFrames;
    if (frame < fadeInEnd) {
      return (frame - overlay.startFrame) / fadeFrames;
    }

    // Fade out at end
    const fadeOutStart = overlay.endFrame - fadeFrames;
    if (frame > fadeOutStart) {
      return (overlay.endFrame - frame) / fadeFrames;
    }

    return 1;
  };

  return (
    <>
      {/* Phone screen canvas overlay */}
      <div
        className="pointer-events-none absolute z-[5]"
        style={{ left, top, width, height, opacity: fade }}
        aria-hidden
      >
        {/* Canvas mapped into phone screen */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ borderRadius: r, background: "rgba(0,0,0,.25)" }}
        >
          <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />

          {/* Glass / lighting treatment to match hero */}
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

      {/* Text overlays - positioned to the left of the phone on desktop, below on mobile */}
      {fade > 0.01 && (
        <div
          className="pointer-events-none absolute inset-0 z-[6]"
          style={{ opacity: fade }}
        >
          {TEXT_OVERLAYS.map((overlay, idx) => {
            const opacity = getOverlayOpacity(overlay);
            if (opacity < 0.01) return null;

            return (
              <div
                key={idx}
                className="absolute inset-0 flex items-center"
                style={{ opacity }}
              >
                {/* Desktop: left side */}
                <div className="container-x hidden md:block">
                  <div
                    className="max-w-[480px] rounded-[24px] border px-6 py-5"
                    style={{
                      background: "rgba(6,7,12,.65)",
                      borderColor: "rgba(255,255,255,.10)",
                      backdropFilter: "blur(16px)",
                      boxShadow: "0 24px 70px rgba(0,0,0,.55)",
                    }}
                  >
                    <h2
                      className="text-[32px] leading-[1.10]"
                      style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.035em",
                        textShadow: "0 18px 50px rgba(0,0,0,.65)",
                      }}
                    >
                      {overlay.headline}
                    </h2>
                    <p
                      className="mt-3 text-[15px] leading-[1.60]"
                      style={{ color: "rgba(232,236,255,.78)" }}
                    >
                      {overlay.subtext}
                    </p>
                  </div>
                </div>

                {/* Mobile: bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 md:hidden">
                  <div
                    className="absolute inset-x-0 bottom-0 h-[50vh]"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,7,12,.95), rgba(6,7,12,.60) 50%, rgba(6,7,12,0) 100%)",
                    }}
                  />
                  <div
                    className="container-x relative"
                    style={{
                      paddingTop: "40vh",
                      paddingBottom: "calc(env(safe-area-inset-bottom) + 80px)",
                    }}
                  >
                    <h2
                      className="text-[26px] leading-[1.10]"
                      style={{
                        fontFamily: "var(--font-display)",
                        letterSpacing: "-0.035em",
                        textShadow: "0 18px 50px rgba(0,0,0,.65)",
                      }}
                    >
                      {overlay.headline}
                    </h2>
                    <p
                      className="mt-2 text-[14px] leading-[1.55]"
                      style={{ color: "rgba(232,236,255,.78)" }}
                    >
                      {overlay.subtext}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
