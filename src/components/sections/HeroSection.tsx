"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsapClient";
import { Magnetic } from "@/components/fx/Magnetic";
import { ExamCountdown } from "./ExamCountdown";
import { HeroVideo } from "./HeroVideo";

// The Three.js field is code-split and client-only: it never blocks the
// hero text and ships nothing to the server bundle.
const HeroWaveField = dynamic(
  () => import("@/components/three/HeroWaveField"),
  { ssr: false }
);

/**
 * Keynote hero, GSAP edition. The copy and story are unchanged — the
 * headline cascade, paragraphs, countdown and CTA now run on a single
 * GSAP timeline (word-by-word blur lift with a touch of 3D rotation),
 * the text column parallaxes gently on scroll, and the whole hero sits
 * on top of the Three.js "audio sea".
 *
 * Initial hidden states live in CSS (.gx-hero [data-gx]) so there is no
 * flash before the timeline takes over; prefers-reduced-motion shows
 * everything immediately, both in CSS and in the JS path.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-gx], [data-gx-word]", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-gx='badges']",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.1
      )
        .fromTo(
          "[data-gx-word]",
          { opacity: 0, y: 34, rotateX: -55, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.13,
            ease: "power4.out",
          },
          0.25
        )
        .fromTo(
          "[data-gx='line2']",
          { opacity: 0, y: 30, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 },
          "-=0.45"
        )
        .fromTo(
          "[data-gx='p1']",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          "[data-gx='p2']",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          "[data-gx='countdown']",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          "[data-gx='cta']",
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.35"
        );

      // Gentle depth: text drifts up slightly slower than the scroll.
      gsap.to("[data-gx-col]", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="gx-hero relative overflow-hidden">
      {/* Black backdrop that lets the video's own cosmic-dark pixels blend
          straight into the section. Fades to transparent at the bottom so
          the page's global cosmic body-bg bleeds into the next sections. */}
      <div
        className="pointer-events-none absolute inset-0 z-[0]"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, #000 0%, #000 58%, rgba(7,5,14,0.85) 82%, transparent 100%)",
        }}
      />

      {/* The audio sea — Three.js particle waves under everything */}
      <HeroWaveField />

      {/* Subtle film-grain noise for texture */}
      <div className="hero-noise" />

      <div
        className="relative z-[1] container-x pb-12 md:pb-16"
        style={{
          paddingTop:
            "calc(env(safe-area-inset-top, 0px) + clamp(48px, 5vw, 72px))",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Video — ABOVE text on mobile (first thing users see), right on
              desktop. Books dissolving into headphones = notes → audio. */}
          <div
            className="hero-enter order-1 md:order-2 md:flex-1 flex justify-center mb-6 md:mb-0"
            style={{ "--he": 0 } as React.CSSProperties}
          >
            <div className="parallax-drift relative w-full max-w-[520px] md:max-w-[560px] lg:max-w-[620px]">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(236,72,153,.18) 0%, rgba(167,139,250,.10) 45%, transparent 80%)",
                  filter: "blur(34px)",
                  transform: "scale(1.2)",
                }}
              />
              <HeroVideo />
            </div>
          </div>

          {/* Text — BELOW video on mobile, left on desktop */}
          <div data-gx-col className="order-2 md:order-1 md:flex-1 max-w-[580px]">
            {/* Badges */}
            <div data-gx="badges" className="flex items-center gap-2 flex-wrap">
              <div
                className="inline-flex items-center rounded-md px-2 py-[3px]"
                style={{
                  background: "rgba(96,165,250,.08)",
                  border: "1px solid rgba(96,165,250,.18)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-bold"
                  style={{ color: "rgba(96,165,250,.9)" }}
                >
                  MRCGP AKT
                </span>
              </div>
              <span
                className="text-[10px] tracking-[0.06em] font-medium"
                style={{ color: "rgba(232,236,255,.35)" }}
              >
                &middot;
              </span>
              <span
                className="inline-flex items-center rounded-md px-2 py-[3px]"
                style={{
                  background: "rgba(52,211,153,.08)",
                  border: "1px solid rgba(52,211,153,.18)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.14em] uppercase font-bold"
                  style={{ color: "rgba(52,211,153,.85)" }}
                >
                  Free until 8 July 2026
                </span>
              </span>
            </div>

            {/* Keynote cascade: line one lands word by word with a 3D lift,
                then the audio line arrives whole with the light-sweep. */}
            <h1
              className="mt-4 text-[34px] md:text-[48px] lg:text-[56px] leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
                perspective: "900px",
              }}
            >
              {["The", "whole", "AKT."].map((word, i) => (
                <span
                  key={word}
                  data-gx-word
                  className="inline-block will-change-transform"
                  style={{ color: "rgba(232,236,255,.62)" }}
                >
                  {word}
                  {i < 2 ? " " : ""}
                </span>
              ))}
              <br />
              <span data-gx="line2" className="inline-block will-change-transform">
                <span className="text-shine">In 90 hours of audio.</span>
              </span>
            </h1>

            {/* Two-paragraph subhead — audio + algorithm */}
            <p
              data-gx="p1"
              className="mt-4 text-[15px] md:text-[17px] leading-[1.55] max-w-[480px]"
              style={{ color: "rgba(232,236,255,.78)" }}
            >
              Audio-first revision covering the full MRCGP AKT syllabus &mdash;
              audio, questions, statistics and Dermatology Navigator.
            </p>
            <p
              data-gx="p2"
              className="mt-3 text-[15px] md:text-[17px] leading-[1.55] max-w-[480px]"
              style={{ color: "rgba(232,236,255,.6)" }}
            >
              Free until 8 July. Then questions stay free &mdash; full audio
              from &pound;59.
            </p>

            {/* Countdown */}
            <div data-gx="countdown" className="mt-5 max-w-[340px]">
              <ExamCountdown variant="hero" />
            </div>

            {/* CTA — magnetic on desktop */}
            <div data-gx="cta" className="mt-6">
              <Magnetic>
                <a
                  data-hero-cta
                  className="btn-primary inline-block text-[16px]"
                  href="https://app.medexia-akt.com"
                >
                  Start free &rarr;
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
