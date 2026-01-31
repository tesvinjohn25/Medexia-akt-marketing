"use client";

import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

// Screen rect in SOURCE hero frame pixels (the underlying 1080x1920 frame image).
const SCREEN = {
  left: 222,
  top: 332,
  width: 660,
  height: 1200,
  radius: 36,
};

export type FrameTransform = {
  x: number;
  y: number;
  s: number;
};

// NEW EDL-BASED OVERLAYS - synced to edited video triggers
// Total frames: 825 at 15fps = 55 seconds
// Frame ranges calculated based on EDL timing:
// Step 1: 00:00-00:06 = 0-90 frames (90 frames, 6s)
// Step 3: 00:08-00:18 @ 400% = 90-128 frames (38 frames, 2.5s)
// Step 4: 00:18-00:20 = 128-158 frames (30 frames, 2s)
// Step 5: 00:20-00:42 = 158-488 frames (330 frames, 22s) - THE MOAT
// Step 7: 00:48-01:03 = 488-713 frames (225 frames, 15s)
// Step 9: 01:05-01:09 @ 300% = 713-733 frames (20 frames, ~1.33s)
// Step 10: 01:09-01:12 @ 200% = 733-755 frames (22 frames, 1.5s)

const OVERLAYS = [
  {
    // Section 1: The Dashboard - Trigger: Video Start (00:00)
    startFrame: 0,
    endFrame: 90,
    title: "Stop Guessing. Start Passing.",
    subtitle: "You don't have time for vague feedback. See your exact probability of passing and visualise your curriculum coverage in real-time.",
  },
  {
    // Section 2: The Question - Trigger: Step 3 (00:08-00:18, question appears)
    startFrame: 90,
    endFrame: 158,
    title: 'The "10-Minute Gap" Revision.',
    subtitle: "Designed for the car park or between consults. High-yield clinical vignettes that fit into the tightest schedule.",
  },
  {
    // Section 3: The "Moat" - Trigger: Step 5 (00:20-00:42, explanation scroll)
    startFrame: 158,
    endFrame: 488,
    title: "The Examiner's Playbook.",
    subtitle: "Don't just know the answer. Understand the clinical clues, the red herrings, and exactly why the other options were wrong.",
  },
  {
    // Section 4: The AI Tutor - Trigger: Step 7 (00:48-01:03, tutor response)
    startFrame: 488,
    endFrame: 713,
    title: "Your On-Demand Clinical Supervisor.",
    subtitle: 'Stuck? Ask "Why?" Challenge the guidelines or clarify a concept. Your AI Supervisor bridges the gap between the textbook and real practice.',
  },
  {
    // Section 5: History & Retention - Trigger: Step 9/10 (01:05-01:12, History/Learning Point)
    startFrame: 713,
    endFrame: 825,
    title: "Active Recall, Automated.",
    subtitle: "Every mistake becomes a lesson. We auto-generate high-yield Learning Points for you to review minutes before the exam.",
  },
];

export function PhoneScreenDemo({
  progress,
  transform,
}: {
  progress: number;
  transform: FrameTransform | null;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const frameCount = 825; // Orlistat Case: Edited video frames at 15fps (55s)

  // Preload frames using Image objects
  const frames = React.useMemo(() => {
    const ImgCtor = (typeof window !== "undefined" ? window.Image : null) as any;
    const arr: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img: HTMLImageElement = ImgCtor ? new ImgCtor() : ({} as any);
      const id = String(i).padStart(4, "0");
      (img as any).src = `/demo/frames/frame_${id}.jpg`;
      arr.push(img);
    }
    return arr;
  }, []);

  // Warm window for smooth scrubbing
  const warmWindow = React.useCallback(
    (idx: number) => {
      const start = clamp(idx - 8, 0, frameCount - 1);
      const end = clamp(idx + 16, 0, frameCount - 1);
      for (let i = start; i <= end; i++) {
        void frames[i]!.src;
      }
    },
    [frames]
  );

  // Draw frame to canvas
  const draw = React.useCallback(
    (idx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = frames[idx];
      if (!img || !img.complete) return;

      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
    },
    [frames]
  );

  // Initial draw
  React.useEffect(() => {
    const first = frames[0];
    if (!first) return;
    const onLoad = () => draw(0);
    if (first.complete) onLoad();
    else first.addEventListener("load", onLoad, { once: true });
    return () => first.removeEventListener("load", onLoad);
  }, [frames, draw]);

  // Scroll-scrub effect with eased progression
  React.useEffect(() => {
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const idx = clamp(Math.floor(eased * (frameCount - 1)), 0, frameCount - 1);
    warmWindow(idx);
    draw(idx);
  }, [progress, draw, warmWindow]);

  // Calculate current frame index from progress
  const currentFrame = React.useMemo(() => {
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    return clamp(Math.floor(eased * (frameCount - 1)), 0, frameCount - 1);
  }, [progress]);

  // Get active overlay based on current frame
  const activeOverlay = React.useMemo(() => {
    return OVERLAYS.find(
      (o) => currentFrame >= o.startFrame && currentFrame <= o.endFrame
    );
  }, [currentFrame]);

  // Calculate overlay opacity with fade transitions (20 frame fade window)
  const getOverlayOpacity = (overlay: typeof OVERLAYS[0]) => {
    const fadeWindow = 20; // frames for fade in/out
    
    if (currentFrame < overlay.startFrame - fadeWindow || currentFrame > overlay.endFrame + fadeWindow) {
      return 0;
    }
    
    // Fade in
    if (currentFrame < overlay.startFrame) {
      return (currentFrame - (overlay.startFrame - fadeWindow)) / fadeWindow;
    }
    // Fade out
    if (currentFrame > overlay.endFrame) {
      return 1 - (currentFrame - overlay.endFrame) / fadeWindow;
    }
    // Fully visible
    return 1;
  };

  if (!transform) return null;

  const left = transform.x + SCREEN.left * transform.s;
  const top = transform.y + SCREEN.top * transform.s;
  const width = SCREEN.width * transform.s;
  const height = SCREEN.height * transform.s;
  const r = SCREEN.radius * transform.s;

  return (
    <>
      {/* Phone screen with scroll-scrubbed demo frames */}
      <div
        className="absolute z-[5] overflow-hidden"
        style={{ 
          left, 
          top, 
          width, 
          height, 
          borderRadius: r,
          background: "rgba(0,0,0,.25)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ objectFit: "cover" }}
        />

        {/* Glass / lighting treatment to match hero */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(140deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 62%, rgba(0,0,0,.18) 100%)",
            mixBlendMode: "screen",
            opacity: 0.22,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,.35) 70%, rgba(0,0,0,.55) 100%)",
            opacity: 0.35,
          }}
        />
      </div>

      {/* Text overlays positioned near the phone (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {OVERLAYS.map((overlay, idx) => {
          const opacity = getOverlayOpacity(overlay);
          if (opacity < 0.01) return null;

          // Position overlays to the right of the phone screen
          const overlayLeft = left + width + 40;
          const overlayTop = top + height * 0.25;

          return (
            <div
              key={idx}
              className="absolute max-w-[320px] transition-all"
              style={{
                left: overlayLeft,
                top: overlayTop,
                opacity,
                transform: opacity > 0.5 ? "translateY(0)" : "translateY(12px)",
                transitionDuration: "150ms",
              }}
            >
              <div
                className="rounded-2xl border px-6 py-5"
                style={{
                  background: "rgba(6,7,12,.78)",
                  borderColor: "rgba(255,255,255,.10)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 24px 80px rgba(0,0,0,.55)",
                }}
              >
                <div
                  className="text-[15px] font-semibold leading-tight"
                  style={{ 
                    color: "var(--brand-violet-light)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {overlay.title}
                </div>
                <div
                  className="mt-2 text-[14px] leading-[1.55]"
                  style={{ color: "rgba(232,236,255,.78)" }}
                >
                  {overlay.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
