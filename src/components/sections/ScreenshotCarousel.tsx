"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const SLIDES = [
  { src: "/appshots/01-hero-1206x2622.png", alt: "Your predicted AKT score, updated daily" },
  { src: "/appshots/02-sessions-1206x2622.png", alt: "Smart sessions that target your weakest areas" },
  { src: "/appshots/03-audio-1206x2622.png", alt: "50+ hours of audio revision across all topics" },
  { src: "/appshots/04-mocks-1206x2622.png", alt: "Generate hundreds of mock exams" },
  { src: "/appshots/05-explanations-1206x2622.png", alt: "Deep explanations written like an examiner taught you" },
  { src: "/appshots/06-everything-1206x2622.png", alt: "Everything you need to pass the AKT" },
];

export function ScreenshotCarousel() {
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
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <div
      className="relative"
      role="region"
      aria-label="App screenshots"
      aria-roledescription="carousel"
    >
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden rounded-3xl">
        <div className="flex">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="flex-[0_0_85%] md:flex-[0_0_100%] min-w-0 px-2"
            >
              <div
                className="overflow-hidden rounded-3xl"
                style={{
                  boxShadow: "0 8px 40px rgba(109,106,232,.2)",
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

      {/* Dot navigation */}
      <div className="flex justify-center gap-1.5 mt-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === selectedIndex ? 20 : 6,
              height: 6,
              background: i === selectedIndex
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
    </div>
  );
}
