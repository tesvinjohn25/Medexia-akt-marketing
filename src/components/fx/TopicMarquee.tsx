"use client";

import { useEffect, useRef } from "react";
import { aktTopics } from "@/data/akt-topics";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

/**
 * Velocity-reactive topic marquee — the 32 RCGP topic names stream past
 * in two counter-scrolling rows that skew with your scroll speed. The
 * loops pause while the section is offscreen; reduced motion gets two
 * static rows.
 */

const NAMES = aktTopics.map((t) => t.name);
const ROW_A = NAMES.filter((_, i) => i % 2 === 0);
const ROW_B = NAMES.filter((_, i) => i % 2 === 1);

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <div className="tm-row">
      <div className="tm-track" data-tm-track>
        {[0, 1].map((seg) => (
          <div key={seg} className="tm-seg" aria-hidden={seg === 1}>
            {items.map((name) => (
              <span
                key={name}
                className={outline ? "tm-item tm-item--outline" : "tm-item"}
              >
                {name}
                <span className="tm-dot" aria-hidden>
                  &middot;
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TopicMarquee() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tracks = gsap.utils.toArray<HTMLElement>("[data-tm-track]");
      if (tracks.length < 2) return;

      const loops = [
        gsap.to(tracks[0], {
          xPercent: -50,
          duration: 46,
          ease: "none",
          repeat: -1,
          paused: true,
        }),
        gsap.fromTo(
          tracks[1],
          { xPercent: -50 },
          { xPercent: 0, duration: 52, ease: "none", repeat: -1, paused: true }
        ),
      ];

      // Run only while on screen.
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) =>
          loops.forEach((l) => (self.isActive ? l.play() : l.pause())),
      });

      // Scroll velocity → skew + tempo, decaying back to rest.
      const proxy = { skew: 0 };
      const setSkew = gsap.quickSetter(tracks, "skewX", "deg");
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-9, 9, self.getVelocity() / -260);
          if (Math.abs(v) > Math.abs(proxy.skew)) {
            proxy.skew = v;
            loops.forEach((l) =>
              l.timeScale(gsap.utils.clamp(1, 3.4, 1 + Math.abs(v) / 3.2))
            );
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => setSkew(proxy.skew),
              onComplete: () => loops.forEach((l) => l.timeScale(1)),
            });
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="tm relative py-10 md:py-14"
      aria-label="Covers all 32 RCGP AKT topic areas"
    >
      <p className="sr-only">
        AKT Navigator covers all 32 RCGP AKT topic areas with audio and
        questions.
      </p>
      <div aria-hidden className="space-y-3 md:space-y-4">
        <Row items={ROW_A} />
        <Row items={ROW_B} outline />
      </div>
    </section>
  );
}
