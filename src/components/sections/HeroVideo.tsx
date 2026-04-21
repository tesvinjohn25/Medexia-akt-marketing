"use client";

import { useEffect, useRef } from "react";

/**
 * Hero video — bulletproof loop.
 *
 * HTMLMediaElement's `loop` attribute silently fails often enough that we
 * defend in depth:
 *
 *   1. preload="auto"              — ensures the full file is loaded before
 *                                    the first loop-point, no tail stall.
 *   2. canplay listener            — start playback as soon as enough data
 *                                    exists (earlier than mount-time play()).
 *   3. ended listener              — explicit restart if loop attr fails.
 *   4. visibilitychange listener   — resume when tab regains focus.
 *   5. IntersectionObserver        — resume when the element scrolls back
 *                                    into view (Safari/iOS pause off-screen
 *                                    video to save battery; no event fires
 *                                    on scroll-back, we have to poll).
 *   6. 2.5s safety interval        — last resort; if the element is paused
 *                                    for any other reason we'll notice
 *                                    within ~2.5 seconds and call play().
 *
 * All six converge on a single `resume()` function that only calls play()
 * when the element is actually paused (and not mid-seek).
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const resume = () => {
      if (v.paused && !v.seeking) {
        v.play().catch(() => {
          /* autoplay blocked; poster remains until next attempt */
        });
      }
    };

    resume();

    const onCanPlay = () => resume();
    const onEnded = () => resume();
    const onVisibility = () => {
      if (!document.hidden) resume();
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) resume();
      },
      { threshold: 0.1 },
    );
    io.observe(v);

    const interval = window.setInterval(resume, 2500);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      window.clearInterval(interval);
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
