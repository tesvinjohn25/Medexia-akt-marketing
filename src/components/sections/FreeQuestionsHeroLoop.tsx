"use client";

import { useEffect, useRef } from "react";
import { freePracticeIncludes } from "@/data/free-akt-questions";

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
    <div className="relative mx-auto w-full max-w-[390px] md:max-w-[430px]">
      <div
        className="pointer-events-none absolute -inset-8 rounded-full"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side, rgba(109,106,232,.22), rgba(52,211,153,.08) 46%, transparent 78%)",
          filter: "blur(30px)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-[34px] p-[9px]"
        style={{
          background:
            "linear-gradient(145deg, rgba(4,5,10,.98), rgba(15,17,27,.94))",
          border: "1px solid rgba(255,255,255,.13)",
          boxShadow:
            "0 45px 120px rgba(0,0,0,.55), 0 0 80px rgba(109,106,232,.16)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-12 top-0 h-16"
          aria-hidden
          style={{
            background:
              "radial-gradient(closest-side, rgba(167,139,250,.24), transparent 72%)",
            filter: "blur(18px)",
          }}
        />

        <div className="relative aspect-[390/520] overflow-hidden rounded-[26px] bg-[#07080d] sm:aspect-[390/620] md:aspect-[390/700]">
          <video
            ref={ref}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/video/free-akt-questions-loop-poster.jpg"
            aria-label="AKT Navigator free question demo showing answer selection and a structured explanation"
            className="absolute inset-0 h-full w-full object-cover object-top"
          >
            <source
              src="/video/free-akt-questions-loop.webm"
              type="video/webm"
            />
            <source src="/video/free-akt-questions-loop.mp4" type="video/mp4" />
          </video>

          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, rgba(7,8,13,.38), transparent 22%, transparent 72%, rgba(7,8,13,.56))",
            }}
          />

          <div className="pointer-events-none absolute left-3 right-3 top-3 flex items-center justify-between gap-2">
            <span
              className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{
                color: "rgba(52,211,153,.9)",
                background: "rgba(7,10,14,.70)",
                borderColor: "rgba(52,211,153,.20)",
                backdropFilter: "blur(14px)",
              }}
            >
              Free practice
            </span>
            <span
              className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{
                color: "rgba(197,170,255,.88)",
                background: "rgba(7,10,14,.66)",
                borderColor: "rgba(167,139,250,.20)",
                backdropFilter: "blur(14px)",
              }}
            >
              SBA to explanation
            </span>
          </div>
        </div>
      </div>

      <div
        className="relative mt-3 rounded-[18px] border p-3"
        style={{
          background:
            "linear-gradient(145deg, rgba(17,19,26,.82), rgba(17,19,26,.58))",
          borderColor: "rgba(167,139,250,.14)",
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-[0.20em]"
          style={{ color: "rgba(197,170,255,.82)" }}
        >
          Free practice includes
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {freePracticeIncludes.map((item, index) => (
            <li
              key={item}
              className={
                index === 0
                  ? "flex items-center gap-2 text-[12px] font-semibold leading-[1.35] sm:col-span-2"
                  : "flex items-center gap-2 text-[12px] font-semibold leading-[1.35]"
              }
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background:
                    index === freePracticeIncludes.length - 1
                      ? "rgba(96,165,250,.82)"
                      : "rgba(52,211,153,.84)",
                  boxShadow:
                    index === freePracticeIncludes.length - 1
                      ? "0 0 14px rgba(96,165,250,.42)"
                      : "0 0 14px rgba(52,211,153,.42)",
                }}
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p
        className="relative mt-3 text-[12px] leading-[1.6]"
        style={{ color: "rgba(232,236,255,.52)" }}
      >
        21,000+ questions gives breadth; the value is in how each answer is
        explained.
      </p>
    </div>
  );
}
