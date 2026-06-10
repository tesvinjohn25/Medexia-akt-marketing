"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapClient";

/** Hairline reading-progress bar pinned above the nav. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left"
      style={{
        transform: "scaleX(0)",
        background:
          "linear-gradient(90deg, var(--brand-iris), var(--brand-violet) 55%, rgba(236,72,153,.95))",
      }}
    />
  );
}
