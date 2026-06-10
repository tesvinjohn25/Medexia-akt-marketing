"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Swipe-native gallery of current app screenshots (public/appshots/01–06).
 *
 * Mobile is the primary experience: the rail is a CSS scroll-snap
 * carousel with native momentum, the same gesture feel as the App Store.
 * Scroll-linked focus scaling lives in .shot-card CSS. Desktop gets
 * arrow buttons as the enhancement. The dot indicators grow into pills
 * for the active screen and are tappable.
 */
const SHOTS = [
  {
    src: "/appshots/02-audio-1206x2622.png",
    label: "Audio",
    alt: "AKT Navigator audiobook library — 90+ hours covering the whole RCGP curriculum, with must-listen topics before your exam",
  },
  {
    src: "/appshots/03-algorithm-1206x2622.png",
    label: "Algorithm",
    alt: "Pass Optimiser session screen — calibration, remediation, consolidation and maintenance built around your weak spots",
  },
  {
    src: "/appshots/04-mocks-1206x2622.png",
    label: "Mocks",
    alt: "Mocks screen — 40, 80 or 160-question mock exams with a baseline mock to calibrate the algorithm",
  },
  {
    src: "/appshots/05-examiner-1206x2622.png",
    label: "Explanations",
    alt: "Examiner-level explanation — why the right answer is right, why the wrong options are wrong, and a check-your-understanding prompt",
  },
  {
    src: "/appshots/06-ready-1206x2622.png",
    label: "Readiness",
    alt: "Exam readiness — your predicted score, updated daily, with 90+ hours of audio, 20,000+ questions and 32 topics",
  },
  {
    src: "/appshots/01-hero-1206x2622.png",
    label: "Overview",
    alt: "AKT Navigator home — the AKT tool that fits your life, with your session ready to start",
  },
] as const;

export function AppShowcase() {
  const { ref, visible } = useScrollReveal();
  const railRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduceMotion = useRef(false);
  const [active, setActive] = useState(0);

  /* Coverflow + active dot, computed from real scroll position so it
     works on every browser (CSS scroll-driven animations don't, on
     most phones). Runs inside rAF; writes only transform/opacity. */
  const update = () => {
    const rail = railRef.current;
    if (!rail) return;
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(rail.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const center = el.offsetLeft + el.offsetWidth / 2;
      const dist = center - mid;
      if (Math.abs(dist) < bestDist) {
        bestDist = Math.abs(dist);
        best = i;
      }
      if (!reduceMotion.current) {
        // d: signed distance to centre in card-widths (~ -2..2)
        const d = dist / el.offsetWidth;
        const a = Math.min(Math.abs(d), 1.6);
        const scale = 1 - a * 0.055;
        const rot = Math.max(-10, Math.min(10, -d * 11));
        el.style.transform = `scale(${scale.toFixed(3)}) rotateY(${rot.toFixed(1)}deg)`;
        el.style.opacity = String(1 - a * 0.3);
      }
    });
    setActive(best);
  };

  const onScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    update();
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToIndex = (i: number) => {
    const rail = railRef.current;
    const el = rail?.children[i] as HTMLElement | undefined;
    if (!rail || !el) return;
    rail.scrollTo({
      left: el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  const arrowStyle: React.CSSProperties = {
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.12)",
    color: "rgba(245,247,255,.85)",
    backdropFilter: "blur(10px)",
  };

  return (
    <section className="section-padding overflow-hidden">
      <div
        ref={ref}
        className={`reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div
                className="r-blur text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
              >
                Inside the app
              </div>
              <h2
                className="r-up mt-3 text-[26px] md:text-[36px] leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.03em",
                  "--i": 1,
                } as React.CSSProperties}
              >
                This is the actual product.
              </h2>
              <p
                className="r-up mt-3 max-w-[520px] text-[14px] md:text-[16px] leading-[1.6]"
                style={{ color: "rgba(232,236,255,.62)", "--i": 2 } as React.CSSProperties}
              >
                Swipe through the app as it is today — audio, the algorithm,
                mocks and your readiness score.
              </p>
            </div>

            {/* Desktop arrows — touch users just swipe */}
            <div
              className="r-up hidden md:flex items-center gap-2 pb-1"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() => scrollToIndex(Math.max(0, active - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
                style={arrowStyle}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() => scrollToIndex(Math.min(SHOTS.length - 1, active + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
                style={arrowStyle}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className="r-up mt-7"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <div
            ref={railRef}
            onScroll={onScroll}
            className="shotrail"
            role="region"
            aria-label="Screenshots of the AKT Navigator app"
          >
            {SHOTS.map((shot) => (
              <figure key={shot.src} className="shot-card m-0">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1206}
                  height={2622}
                  sizes="(max-width: 768px) 66vw, 300px"
                  className="block h-auto w-full"
                />
              </figure>
            ))}
          </div>

          {/* Dot indicators — active dot stretches into a pill */}
          <div className="mt-4 flex justify-center gap-2">
            {SHOTS.map((shot, i) => (
              <button
                key={shot.src}
                type="button"
                aria-label={`Go to ${shot.label} screenshot`}
                aria-current={active === i}
                onClick={() => scrollToIndex(i)}
                className="h-[6px] rounded-full"
                style={{
                  width: active === i ? 22 : 6,
                  background:
                    active === i
                      ? "var(--brand-violet)"
                      : "rgba(255,255,255,.18)",
                  transition:
                    "width .45s var(--ease-spring), background .3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
