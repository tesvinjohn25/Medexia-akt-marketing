"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  formatTestimonialAttribution,
  type Testimonial,
} from "@/lib/testimonials";

const SERIF = 'Georgia, "Times New Roman", Times, serif';

export function TestimonialsView({
  hero,
  supporting,
}: {
  hero: Testimonial;
  supporting: Testimonial[];
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="text-center mb-12 md:mb-16">
          <div
            className="r-blur text-[13px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
          >
            Early reviews
          </div>
          <h2
            className="r-up mt-3 text-[28px] md:text-[36px] font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
              "--i": 1,
            } as React.CSSProperties}
          >
            Their words, not ours.
          </h2>
          <p
            className="r-up mt-2 text-[15px] md:text-[16px]"
            style={{ color: "var(--fg-mid)", "--i": 2 } as React.CSSProperties}
          >
            First reviews from our April 2026 cohort.
          </p>
        </div>

        <figure
          className="r-up relative mx-auto max-w-[760px] pl-6 md:pl-10"
          style={{
            borderLeft: "3px solid var(--brand-violet)",
            "--i": 3,
          } as React.CSSProperties}
        >
          <div
            className="pointer-events-none absolute -left-32 -top-24 -z-10 h-[420px] w-[640px]"
            aria-hidden
            style={{
              background:
                "radial-gradient(closest-side, rgba(155,107,255,.18), transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <blockquote
            className="italic text-[26px] md:text-[38px] leading-[1.32]"
            style={{
              fontFamily: SERIF,
              color: "var(--fg-high)",
              letterSpacing: "-0.005em",
            }}
          >
            <span aria-hidden style={{ color: "rgba(155,107,255,.6)" }}>&ldquo;</span>
            {hero.quote}
            <span aria-hidden style={{ color: "rgba(155,107,255,.6)" }}>&rdquo;</span>
          </blockquote>
          <figcaption
            className="mt-6 text-[11px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)" }}
          >
            {formatTestimonialAttribution(hero)}
          </figcaption>
        </figure>

        {supporting.length > 0 && (
          <div className="mx-auto mt-14 md:mt-20 grid max-w-[820px] gap-10 md:gap-12 md:grid-cols-2">
            {supporting.map((t, i) => (
              <figure
                key={t.id}
                className="r-up pl-5"
                style={{
                  borderLeft: "2px solid rgba(155,107,255,.45)",
                  "--i": 4 + i,
                } as React.CSSProperties}
              >
                <blockquote
                  className="italic text-[16px] md:text-[18px] leading-[1.55]"
                  style={{ fontFamily: SERIF, color: "rgba(232,236,255,.85)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption
                  className="mt-4 text-[10px] tracking-[0.20em] uppercase font-semibold"
                  style={{ color: "rgba(167,139,250,.75)" }}
                >
                  {formatTestimonialAttribution(t)}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
