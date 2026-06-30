"use client";

import { useEffect, useRef } from "react";

export function FreeQuestionsHeroLoop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      video.pause();
      return;
    }

    const resume = () => {
      if (video.paused && !video.seeking) {
        video.play().catch(() => {
          /* Autoplay blocked; the poster remains visible. */
        });
      }
    };

    resume();

    const onCanPlay = () => resume();
    const onEnded = () => resume();
    const onVisibility = () => {
      if (!document.hidden) resume();
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) resume();
        else video.pause();
      },
      { threshold: 0.12 },
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[430px] md:max-w-[520px]">
      <div
        className="pointer-events-none absolute -inset-10 rounded-full"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side, rgba(109,106,232,.26), rgba(167,139,250,.13) 44%, rgba(52,211,153,.07) 62%, transparent 80%)",
          filter: "blur(34px)",
        }}
      />
      <div
        className="pointer-events-none absolute -inset-x-8 bottom-[-12%] h-28 rounded-full md:h-36"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side, rgba(3,5,12,.95), rgba(5,4,12,.58) 58%, transparent 82%)",
          filter: "blur(18px)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-[26px] md:rounded-[34px]"
        style={{
          background:
            "linear-gradient(145deg, rgba(5,3,13,.96), rgba(11,7,22,.88) 54%, rgba(3,4,10,.96))",
          border: "1px solid rgba(167,139,250,.16)",
          boxShadow:
            "0 35px 120px rgba(0,0,0,.62), 0 0 110px rgba(109,106,232,.20)",
        }}
      >
        <div
          className="pointer-events-none absolute -inset-px z-[2]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(1,1,4,.22), transparent 18%, transparent 72%, rgba(1,1,4,.30)), radial-gradient(circle at 50% 50%, transparent 42%, rgba(3,2,10,.28) 76%, rgba(3,2,10,.72) 100%)",
            boxShadow: "inset 0 0 42px rgba(4,3,12,.78)",
          }}
        />

        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/free-akt-hero-readable-poster.jpg?v=3"
          aria-label="Animated AKT Navigator hero showing AKT-style SBA, structured explanation, clue trap why wrong, and adaptive next session"
          className="block aspect-square h-auto w-full object-cover"
        >
          <source
            src="/video/free-akt-hero-readable-loop.webm?v=3"
            type="video/webm"
          />
          <source
            src="/video/free-akt-hero-readable-loop.mp4?v=3"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}
