"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsapClient";
import { Magnetic } from "@/components/fx/Magnetic";
import { JULY_SITTING } from "@/data/exam-dates";

const OscilloscopeWave = dynamic(
  () => import("@/components/three/OscilloscopeWave"),
  { ssr: false }
);

/**
 * The opening screen of "the page is the audiobook".
 *
 * Pure type, full viewport: THE WHOLE AKT in solid caps, IN 90 HOURS /
 * OF AUDIO in outline caps — and the live oscilloscope trace runs
 * straight through the outlined letters, glowing inside the strokes.
 * Characters rise out of masked lines on a GSAP timeline; a circular
 * play button and "Scroll to play" cue hand the user the metaphor.
 *
 * Reduced motion: everything is server-rendered visible; the timeline
 * and canvas simply never run.
 */

/** Char spans grouped into unbreakable words so lines wrap cleanly. */
function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="aw-word">
          {wi > 0 && <span className="aw-ch">&nbsp;</span>}
          {word.split("").map((ch, i) => (
            <span key={i} className="aw-ch">
              {ch}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export function AwardHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [julyDays, setJulyDays] = useState<number | null>(null);

  useEffect(() => {
    const diff = JULY_SITTING.date.getTime() - Date.now();
    setJulyDays(Math.max(0, Math.ceil(diff / 86400000)));
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".aw-ch",
        { yPercent: 115, rotate: 6 },
        { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.022 },
        0.15
      )
        .fromTo(
          "[data-aw='badges']",
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.5
        )
        .fromTo(
          "[data-aw='sub']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          1.0
        )
        .fromTo(
          "[data-aw='ctas']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          1.15
        )
        .fromTo(
          "[data-aw='cue']",
          { opacity: 0 },
          { opacity: 1, duration: 0.9, ease: "power2.out" },
          1.5
        );

      // The headline recedes slightly as the track begins.
      gsap.to("[data-aw='stage']", {
        yPercent: -10,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-track="Press play"
      className="relative overflow-hidden"
    >
      <div className="hero-noise" />

      <div
        data-aw="stage"
        className="container-x relative z-[1] flex min-h-[100svh] flex-col items-center justify-center pb-20 text-center"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 84px)",
        }}
      >
        {/* Badges */}
        <div
          data-aw="badges"
          className="mb-7 flex flex-wrap items-center justify-center gap-2 md:mb-9"
        >
          <span
            className="inline-flex items-center rounded-md px-2.5 py-[4px] text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{
              background: "rgba(96,165,250,.08)",
              border: "1px solid rgba(96,165,250,.18)",
              color: "rgba(96,165,250,.9)",
            }}
          >
            MRCGP AKT
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-[4px] text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{
              background: "rgba(52,211,153,.08)",
              border: "1px solid rgba(52,211,153,.18)",
              color: "rgba(52,211,153,.85)",
            }}
          >
            Free until 8 July 2026
          </span>
          {julyDays !== null && (
            <span
              className="inline-flex items-center rounded-md px-2.5 py-[4px] text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{
                background: "rgba(155,107,255,.08)",
                border: "1px solid rgba(155,107,255,.22)",
                color: "var(--brand-violet-light)",
              }}
            >
              July sitting &middot; {julyDays} days
            </span>
          )}
        </div>

        {/* The headline — the wave threads through the outline lines */}
        <div className="relative w-full">
          <div
            className="absolute inset-x-[-8vw] top-[30%] bottom-[-12%]"
            aria-hidden
          >
            <OscilloscopeWave />
          </div>

          <h1
            className="relative font-bold uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 11vw, 148px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="aw-hero-line aw-solid">
              <Chars text="The whole AKT." />
            </span>
            <span className="aw-hero-line aw-stroke-v">
              <Chars text="In 90 hours" />
            </span>
            <span className="aw-hero-line aw-stroke-p">
              <Chars text="of audio." />
            </span>
          </h1>
        </div>

        {/* Sub */}
        <p
          data-aw="sub"
          className="mx-auto mt-7 max-w-[540px] text-[15px] leading-[1.65] md:mt-9 md:text-[17px]"
          style={{ color: "rgba(232,236,255,.66)" }}
        >
          Audio-first revision for the MRCGP AKT. Free syllabus-mapped
          questions and mock exams with AI debriefs &mdash; and the whole
          syllabus, narrated, for your commute.
        </p>

        {/* CTAs */}
        <div
          data-aw="ctas"
          className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:gap-7"
        >
          <Magnetic>
            <a
              href="#try-the-app"
              className="aw-play"
              aria-label="Play the live demo"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
                style={{ marginLeft: 3 }}
              >
                <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.4-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
              </svg>
            </a>
          </Magnetic>
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <a
              data-hero-cta
              className="btn-primary inline-block text-[15px]"
              href="https://app.medexia-akt.com"
            >
              Start free &rarr;
            </a>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "rgba(232,236,255,.42)" }}
            >
              No card &middot; No signup for the demo
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div data-aw="cue" className="aw-cue z-[1] hidden md:flex">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.26em]"
          style={{ color: "rgba(232,236,255,.45)" }}
        >
          Scroll to play
        </span>
        <span className="aw-cue-line" aria-hidden />
      </div>
    </section>
  );
}
