"use client";

import React from "react";

// Screen rect in SOURCE hero frame pixels
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

export function PhoneVideoDemo({
  transform,
  visible,
  onTimeUpdate,
  onSeekReady,
}: {
  transform: FrameTransform | null;
  visible: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onSeekReady?: (seekFn: (time: number) => void) => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Play/pause based on visibility
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (visible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [visible]);

  // Report time updates — re-run when visible changes so listener attaches after video plays
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !onTimeUpdate) return;

    const handler = () => {
      onTimeUpdate(video.currentTime, video.duration || 0);
    };

    video.addEventListener("timeupdate", handler);
    return () => video.removeEventListener("timeupdate", handler);
  }, [onTimeUpdate, visible]);

  // Expose seek function to parent
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !onSeekReady) return;

    onSeekReady((time: number) => {
      video.currentTime = time;
      video.play().catch(() => {});
    });
  }, [onSeekReady]);

  // Always render — never return null. Position offscreen when transform is unavailable.
  const has = transform !== null;
  const left = has ? transform.x + SCREEN.left * transform.s : -9999;
  const top = has ? transform.y + SCREEN.top * transform.s : -9999;
  const width = has ? SCREEN.width * transform.s : 1;
  const height = has ? SCREEN.height * transform.s : 1;
  const r = has ? SCREEN.radius * transform.s : 0;

  return (
    <div
      className="pointer-events-none absolute z-[5]"
      style={{
        left,
        top,
        width,
        height,
        opacity: visible && has ? 1 : 0,
        transition: "opacity 400ms ease",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: r, background: "rgba(0,0,0,.25)" }}
      >
        <video
          ref={videoRef}
          src="/demo/app-demo-web.mp4"
          poster="/demo/app-demo-poster.jpg"
          muted
          playsInline
          loop
          preload="auto"
          className="h-full w-full object-cover"
          style={{ display: "block" }}
        />

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
