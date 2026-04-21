"use client";

import { useEffect, useRef } from "react";

/**
 * Hero video wrapper — keeps the mp4/webm tags in a client boundary so we
 * can wire up loop-reliability handlers. Three known video-loop failure
 * modes we defend against:
 *   1. preload="metadata" leaves the back half of the file unloaded, so
 *      the loop can stall when reaching the end.
 *   2. Safari/Chrome pause background tabs; the video doesn't always
 *      resume on refocus.
 *   3. Some devices silently fail the HTMLMediaElement `loop` attribute.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const play = () => {
      v.play().catch(() => {
        /* autoplay blocked — poster remains. */
      });
    };

    play();

    const onVisibility = () => {
      if (!document.hidden && v.paused && !v.ended) play();
    };
    const onEnded = () => play(); // defensive: redundant with loop attr

    document.addEventListener("visibilitychange", onVisibility);
    v.addEventListener("ended", onEnded);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/video/notes-to-audio-poster.jpg"
      aria-label="Textbooks dissolving into headphones — the shift from notes to audio revision"
      className="relative block w-full h-auto"
      style={{
        maskImage:
          "radial-gradient(ellipse 85% 80% at center, black 55%, transparent 92%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 85% 80% at center, black 55%, transparent 92%)",
      }}
    >
      <source src="/video/notes-to-audio.webm" type="video/webm" />
      <source src="/video/notes-to-audio.mp4" type="video/mp4" />
    </video>
  );
}
