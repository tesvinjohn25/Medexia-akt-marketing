"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero video wrapper — keeps the mp4/webm tags in a client boundary so we
 * can wire up loop-reliability handlers + timeline-synced captions.
 *
 * Three known video-loop failure modes we defend against:
 *   1. preload="metadata" leaves the back half of the file unloaded, so
 *      the loop can stall when reaching the end.
 *   2. Safari/Chrome pause background tabs; the video doesn't always
 *      resume on refocus.
 *   3. Some devices silently fail the HTMLMediaElement `loop` attribute.
 *
 * Captions: three single-word beats narrate the three-phase transformation
 * inside the video (books stacked → open book → headphones). They cross-fade
 * in sync with video.currentTime.
 */

type Caption = { start: number; end: number; text: string };

const CAPTIONS: readonly Caption[] = [
  { start: 0.0, end: 2.0, text: "Notes." },
  { start: 2.0, end: 4.0, text: "\u2026dissolve." },
  { start: 4.0, end: 6.1, text: "Audiobooks." },
];

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);

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
    const onTime = () => setT(v.currentTime);

    document.addEventListener("visibilitychange", onVisibility);
    v.addEventListener("ended", onEnded);
    v.addEventListener("timeupdate", onTime);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  return (
    <div className="relative">
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

      {/* Narrative captions — cross-fade in sync with video beats */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {CAPTIONS.map((c, i) => {
          const visible = t >= c.start && t < c.end;
          return (
            <span
              key={i}
              className="absolute left-1/2 bottom-[6%] md:bottom-[8%] text-[15px] md:text-[19px] italic tracking-[-0.01em]"
              style={{
                transform: "translateX(-50%)",
                fontFamily: 'Georgia, "Times New Roman", Times, serif',
                color: "rgba(255,255,255,.82)",
                opacity: visible ? 1 : 0,
                transition: "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                textShadow:
                  "0 2px 12px rgba(0,0,0,.8), 0 0 24px rgba(0,0,0,.4)",
              }}
            >
              {c.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
