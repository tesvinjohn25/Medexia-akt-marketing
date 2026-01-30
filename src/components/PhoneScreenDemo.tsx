"use client";

import React from "react";

// Screen rect in SOURCE hero frame pixels (the underlying 1080x1920 frame image).
// These were estimated manually; we compute final CSS coords using the same cover-fit transform as the canvas.
const SCREEN = {
  left: 210,
  top: 330,
  width: 660,
  height: 1200,
  // slightly rounded corners (in source px)
  radius: 36,
};

export type FrameTransform = {
  // CSS-space (not device pixels)
  x: number; // left offset where the source image begins (after cover fit)
  y: number; // top offset
  s: number; // scale factor applied to source pixels
};

export function PhoneScreenDemo({
  progress,
  demoUrl,
  transform,
}: {
  progress: number;
  demoUrl: string;
  transform: FrameTransform | null;
}) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Fade in only at the very end of the hero motion.
  const t0 = 0.965;
  const fade = Math.min(1, Math.max(0, (progress - t0) / (1 - t0)));

  // Smoother handoff: hold first frame briefly before playing.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // reset whenever we come back near the end
    if (progress < t0) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {}
      return;
    }

    // only start once
    let cancelled = false;
    const start = async () => {
      try {
        v.currentTime = 0;
      } catch {}
      await new Promise((r) => setTimeout(r, 220));
      if (cancelled) return;
      try {
        await v.play();
      } catch {
        // autoplay may be blocked; user scroll usually counts as interaction, so next play attempt succeeds.
      }
    };

    start();
    return () => {
      cancelled = true;
    };
  }, [progress]);

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
      {/* Video mapped into phone screen */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: r, background: "rgba(0,0,0,.25)" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full"
          src={demoUrl}
          playsInline
          muted
          // loop for prototype realism; later we will scroll-scrub and remove loop.
          loop
          preload="auto"
          style={{ objectFit: "cover" }}
        />

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
  );
}
