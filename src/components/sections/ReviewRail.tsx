"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Stars } from "@/components/Stars";

const SERIF = 'Georgia, "Times New Roman", Times, serif';

export type ReviewItem = {
  id: string;
  quote: string;
  attribution: string;
};

/**
 * Supporting reviews. On mobile this is a swipe-native snap rail (same
 * gesture language as the app gallery) so each review is a card you
 * flick through rather than a wall of grey boxes; on md+ it lays out
 * as a grid. Cards carry a gradient avatar initial and a star row so
 * they read as reviews at a glance.
 */
export function ReviewRail({ items }: { items: ReviewItem[] }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal-group ${visible ? "is-visible" : ""}`}
    >
      <div
        className="review-rail mx-auto max-w-[1120px] md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3"
        role="region"
        aria-label="Trainee reviews"
      >
        {items.map((t, i) => (
          <figure
            key={t.id}
            className="review-card r-up rounded-[18px] p-5"
            style={{
              background:
                "linear-gradient(170deg, rgba(124,107,255,.10), rgba(17,19,26,.78) 55%)",
              border: "1px solid rgba(155,107,255,.20)",
              boxShadow: "0 18px 50px rgba(0,0,0,.32)",
              "--i": i + 0.5,
            } as React.CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))",
                  boxShadow:
                    "0 0 0 2px rgba(155,107,255,.30), 0 6px 18px rgba(109,106,232,.35)",
                }}
              >
                {t.attribution.trim().charAt(0).toUpperCase() || "A"}
              </span>
              <Stars size={11} />
            </div>
            <blockquote
              className="mt-3 italic text-[14px] md:text-[15px] leading-[1.6]"
              style={{ fontFamily: SERIF, color: "rgba(232,236,255,.88)" }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption
              className="mt-4 text-[10px] tracking-[0.2em] uppercase font-semibold"
              style={{ color: "rgba(167,139,250,.8)" }}
            >
              {t.attribution}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
