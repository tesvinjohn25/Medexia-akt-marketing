"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const SLIDES = [
  { src: "/appshots/01_Predicted_akt.jpg", alt: "Predicted AKT score and progress tracking" },
  { src: "/appshots/02_Built_for_busy_gps.jpg", alt: "Quick revision sessions for busy GP trainees" },
  { src: "/appshots/03_50hr_audio.jpg", alt: "50+ hours of audio revision" },
  { src: "/appshots/04_Generate_mocks.jpg", alt: "Generate mock exams at 40, 80, or 160 questions" },
  { src: "/appshots/05_Deep_explaination2.jpg", alt: "Deep explanations that teach clinical reasoning" },
  { src: "/appshots/06_Deep_explaination.jpg", alt: "Detailed answer breakdowns" },
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
                  width={390}
                  height={844}
                  className="w-full h-auto"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="rounded-full transition-all duration-200"
            style={{
              width: 8,
              height: 8,
              minWidth: 44,
              minHeight: 44,
              padding: 18,
              backgroundClip: "content-box",
              background: i === selectedIndex
                ? "var(--brand-violet)"
                : "rgba(255,255,255,.2)",
            }}
            aria-label={`Go to screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
