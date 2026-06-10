"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

/**
 * The persistent audio-player chrome that sells the metaphor: the page
 * is a 90-hour track and scrolling is playback.
 *
 * - The elapsed counter maps overall scroll progress onto 0 → 90:00:00.
 * - "Now playing" reads the data-track attribute of whichever section
 *   is on screen.
 * - The hairline on top is the seek bar.
 *
 * It slides in once the visitor leaves the hero and replaces the old
 * sticky mobile CTA on this page. DOM writes (time, progress) go
 * straight to refs — no re-renders during scroll.
 */

const TOTAL_SECONDS = 90 * 3600;

function fmt(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(h)}:${p(m)}:${p(sec)}`;
}

export function PlayerBar() {
  const [shown, setShown] = useState(false);
  const [track, setTrack] = useState("Press play");
  const timeRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Seek position + elapsed time from total page progress.
    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
          if (timeRef.current) {
            timeRef.current.textContent = fmt(self.progress * TOTAL_SECONDS);
          }
        },
      })
    );

    // Slide in after the hero.
    triggers.push(
      ScrollTrigger.create({
        start: () => window.innerHeight * 0.7,
        end: "max",
        onToggle: (self) => setShown(self.isActive),
      })
    );

    // Now playing — whichever data-track section crosses the centre.
    gsap.utils.toArray<HTMLElement>("[data-track]").forEach((el) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive && el.dataset.track) setTrack(el.dataset.track);
          },
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div
      className={`aw-player ${shown ? "is-in" : ""}`}
      role="complementary"
      aria-label="Page playback"
    >
      <div ref={progressRef} className="aw-player-progress" aria-hidden />
      <div className="container-x flex items-center gap-3 py-2.5 md:gap-5">
        {/* Mini play → demo */}
        <a
          href="#try-the-app"
          aria-label="Jump to the live demo"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full transition-transform hover:scale-105"
          style={{
            background: "var(--brand-grad)",
            boxShadow: "0 8px 26px rgba(109,106,232,.4)",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="#fff"
            aria-hidden
            style={{ marginLeft: 2 }}
          >
            <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.4-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
          </svg>
        </a>

        {/* Now playing */}
        <div className="min-w-0 flex-1">
          <div
            className="text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "rgba(232,236,255,.4)" }}
          >
            Now playing
          </div>
          <div
            className="truncate text-[13px] font-semibold"
            style={{ color: "var(--fg-high)" }}
            aria-live="polite"
          >
            {track}
          </div>
        </div>

        {/* Elapsed / total */}
        <div
          className="hidden flex-none text-[12px] font-semibold tabular-nums sm:block"
          style={{ color: "rgba(232,236,255,.55)" }}
        >
          <span ref={timeRef}>00:00:00</span>
          <span style={{ color: "rgba(232,236,255,.3)" }}> / 90:00:00</span>
        </div>

        <a
          className="btn-primary flex-none px-4 py-[9px] text-[13px]"
          href="https://app.medexia-akt.com"
        >
          Start free
        </a>
      </div>
    </div>
  );
}
