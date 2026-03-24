"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ExamCountdown } from "./ExamCountdown";

const SLIDES = [
  { src: "/appshots/01-hero-1206x2622.png", alt: "Your predicted AKT score, updated daily" },
  { src: "/appshots/02-sessions-1206x2622.png", alt: "Smart sessions that target your weakest areas" },
  { src: "/appshots/03-audio-1206x2622.png", alt: "50+ hours of audio revision across all topics" },
  { src: "/appshots/04-mocks-1206x2622.png", alt: "Generate hundreds of mock exams" },
  { src: "/appshots/05-explanations-1206x2622.png", alt: "Deep explanations written like an examiner taught you" },
  { src: "/appshots/06-everything-1206x2622.png", alt: "Everything you need to pass the AKT" },
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="relative overflow-hidden">
      {/* Cosmic nebula background */}
      <div className="hero-nebula" aria-hidden />
      <div className="hero-stars" aria-hidden />
      <div className="hero-noise" />

      {/* Carousel area — constrained height, fades at bottom */}
      <div
        className="relative z-[1] pt-16 md:pt-20"
        style={{ maxHeight: "65vh", overflow: "hidden" }}
      >
        <div
          role="region"
          aria-label="App screenshots"
          aria-roledescription="carousel"
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {SLIDES.map((slide, i) => (
                <div
                  key={i}
                  className="flex-[0_0_60%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] min-w-0 px-1.5 md:px-2"
                  style={{
                    opacity: i === selectedIndex ? 1 : 0.4,
                    transform: i === selectedIndex ? "scale(1)" : "scale(0.88)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                >
                  <div
                    className="overflow-hidden rounded-2xl md:rounded-3xl"
                    style={{
                      boxShadow:
                        i === selectedIndex
                          ? "0 16px 60px rgba(109,106,232,.35), 0 0 100px rgba(109,106,232,.1)"
                          : "0 4px 20px rgba(0,0,0,.3)",
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={603}
                      height={1311}
                      className="w-full h-auto"
                      priority={i === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade on the carousel */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to top, rgba(11,13,18,1) 0%, rgba(11,13,18,.7) 50%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Dots — between carousel and text */}
      <div className="relative z-[2] flex justify-center gap-1.5 -mt-6 mb-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === selectedIndex ? 20 : 6,
              height: 6,
              background:
                i === selectedIndex
                  ? "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))"
                  : "rgba(255,255,255,.15)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label={`Go to screenshot ${i + 1}`}
          />
        ))}
      </div>

      {/* Text content */}
      <div
        className="relative z-[2] container-x"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 48px)",
        }}
      >
        <div className="max-w-[600px]">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
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
                Free for April &amp; July
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mt-4 text-[32px] md:text-[48px] leading-[1.06]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.04em",
              textShadow: "0 22px 70px rgba(0,0,0,.7)",
            }}
          >
            Like a senior GP
            <br />
            sat next to you.
          </h1>

          {/* Subtext */}
          <p
            className="mt-3 text-[15px] md:text-[18px] leading-[1.55] max-w-[480px]"
            style={{ color: "rgba(232,236,255,.72)" }}
          >
            AKT revision that adapts to your weak spots. Deep explanations that
            teach &mdash; not just tell you the answer. 50+ hours of audio you
            can take anywhere.
          </p>

          {/* Countdown */}
          <div className="mt-5 max-w-[340px]">
            <ExamCountdown variant="hero" />
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a
              data-hero-cta
              className="btn-primary inline-block text-[16px]"
              href="https://app.medexia-akt.com"
            >
              Start revising free &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
