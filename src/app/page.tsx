"use client";

import React from "react";
import Image from "next/image";
import { HeroFrames } from "@/components/HeroFrames";
import { HeroNarration } from "@/components/HeroNarration";
import { PhoneScreenDemo } from "@/components/PhoneScreenDemo";

const DEMO_URL = "https://medexia-akt.com/demo";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 overflow-hidden rounded-2xl border"
        style={{
          borderColor: "rgba(255,255,255,.10)",
          boxShadow: "0 18px 45px rgba(0,0,0,.45)",
        }}
      >
        <Image src="/logo.jpg" alt="Medexia" width={80} height={80} />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold" style={{ letterSpacing: "-0.01em" }}>
          Medexia
        </div>
        <div className="text-xs faint">AKT Navigator</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [heroProgress, setHeroProgress] = React.useState(0);
  const [demoProgress, setDemoProgress] = React.useState(0);
  const [transform, setTransform] = React.useState<{ x: number; y: number; s: number } | null>(null);
  const [lastTransform, setLastTransform] = React.useState<{ x: number; y: number; s: number } | null>(null);
  const demoSectionRef = React.useRef<HTMLDivElement | null>(null);

  // Store the transform when hero reaches completion (progress 0.965+)
  React.useEffect(() => {
    if (heroProgress >= 0.965 && transform) {
      setLastTransform(transform);
    }
  }, [heroProgress, transform]);

  // Use lastTransform when in demo section for stable positioning
  const effectiveTransform = heroProgress >= 0.965 && lastTransform ? lastTransform : transform;

  // Track demo section scroll progress
  React.useEffect(() => {
    const demoSection = demoSectionRef.current;
    if (!demoSection) return;

    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;

        const rect = demoSection.getBoundingClientRect();
        const vh = window.innerHeight;

        // Demo progress starts when demo section enters viewport
        // and completes when we've scrolled through it
        const demoHeight = demoSection.offsetHeight;
        const scrollIntoDemo = -rect.top; // How far we've scrolled into the demo section
        const totalScrollRange = demoHeight - vh;

        if (scrollIntoDemo <= 0) {
          setDemoProgress(0);
        } else {
          const p = clamp(scrollIntoDemo / Math.max(1, totalScrollRange), 0, 1);
          setDemoProgress(p);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main>
      {/* HERO (locked scrolly) */}
      <section className="relative">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <HeroFrames onProgress={setHeroProgress} onTransform={setTransform}>
          {/* Subtle global scrim (keep the phone visible) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 700px at 16% 70%, rgba(5,6,10,.62), rgba(5,6,10,0) 58%)",
            }}
          />

          {/* Desktop overlay (left aligned, copy updated) */}
          <div className="hidden md:block">
            <div className="container-x relative flex h-full items-center">
              <div
                className="pointer-events-auto max-w-[58ch] rounded-[28px] border px-7 py-7"
                style={{
                  background: "rgba(6,7,12,.55)",
                  borderColor: "rgba(255,255,255,.10)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 30px 90px rgba(0,0,0,.55)",
                  opacity: clamp(1 - Math.max(0, heroProgress - 0.85) / 0.12, 0, 1),
                  transform:
                    heroProgress < 0.85
                      ? "translateY(0px)"
                      : `translateY(${(heroProgress - 0.85) * 60}px)`,
                  transition: "opacity 150ms ease",
                }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <Logo />
                  <a className="btn-secondary text-sm" href={DEMO_URL} style={{ padding: "10px 12px" }}>
                    Start now
                  </a>
                </div>

                <div
                  className="text-[11px] tracking-[0.22em] uppercase font-semibold"
                  style={{ color: "rgba(167,139,250,.85)" }}
                >
                  Built for the 10-minute gap
                </div>
                <h1
                  className="mt-3 text-[52px] leading-[1.03]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.04em",
                    textShadow: "0 18px 60px rgba(0,0,0,.65)",
                  }}
                >
                  Stop Revising
                  <br />
                  <span style={{ color: "var(--brand-violet-light)" }}>Blindly.</span>
                </h1>
                <p className="mt-4 text-[16px] leading-[1.65]" style={{ color: "rgba(232,236,255,.78)" }}>
                  High-yield clinical vignettes, predictive scoring, and deep-dive explanations.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a className="btn-primary" href={DEMO_URL}>
                    Start now
                  </a>
                  <a className="btn-secondary" href={DEMO_URL}>
                    Try the 5‑question demo
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-2" style={{ color: "rgba(232,236,255,.55)" }}>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span className="text-[13px]">Scroll to take a test drive. No signup.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile narration + CTA */}
          <div className="md:hidden">
            <HeroNarration progress={heroProgress} demoUrl={DEMO_URL} />
          </div>
        </HeroFrames>
      </section>

      {/* DEMO SCROLL SECTION - provides scroll runway for frame scrubbing */}
      <section
        ref={demoSectionRef}
        className="relative"
        style={{
          height: "500vh",
          background: "rgba(6,7,12,1)",
        }}
      >
        {/* Sticky container to keep phone screen demo in place during scroll */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background continuity */}
          <div className="hero-mesh" />
          <div className="hero-grid" />
          <div className="hero-noise" />

          {/* Subtle vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 700px at 50% 50%, rgba(5,6,10,.40), rgba(5,6,10,0) 58%)",
            }}
          />

          {/* Phone screen demo with frame scrubbing */}
          <PhoneScreenDemo
            progress={heroProgress >= 0.965 ? 1 : heroProgress}
            demoProgress={demoProgress}
            transform={effectiveTransform}
          />

          {/* Progress indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
            style={{
              opacity: demoProgress > 0.01 && demoProgress < 0.99 ? 0.6 : 0,
              transition: "opacity 300ms ease",
            }}
          >
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{
                width: 120,
                background: "rgba(255,255,255,.15)",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${demoProgress * 100}%`,
                  background: "rgba(167,139,250,.7)",
                  transition: "width 100ms ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* End CTA section */}
      <section
        className="relative py-24"
        style={{
          background: "rgba(6,7,12,1)",
        }}
      >
        <div className="hero-mesh" style={{ opacity: 0.5 }} />
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-[36px] md:text-[48px] leading-[1.08]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.04em",
              }}
            >
              Ready to feel the difference?
            </h2>
            <p
              className="mt-4 text-[17px] leading-[1.6]"
              style={{ color: "rgba(232,236,255,.72)" }}
            >
              Join thousands of GP trainees who've already upgraded their AKT prep.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a className="btn-primary text-lg px-8 py-4" href={DEMO_URL}>
                Start now — it's free
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
