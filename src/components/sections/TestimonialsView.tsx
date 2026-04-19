"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Testimonial } from "@/lib/testimonials";

const SERIF = 'Georgia, "Times New Roman", Times, serif';

function attribution(t: Testimonial) {
  return [t.name, t.trainingStage, t.deanery].filter(Boolean).join(" · ");
}

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
        <div className="text-center mb-10">
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
            Trainees, not marketing copy.
          </h2>
          <p
            className="r-up mt-2 text-[15px] md:text-[16px]"
            style={{ color: "var(--fg-mid)", "--i": 2 } as React.CSSProperties}
          >
            First reviews from our April 2026 cohort.
          </p>
        </div>

        <figure
          className="r-up relative mx-auto max-w-[820px] overflow-hidden rounded-[20px] px-6 py-8 md:px-12 md:py-12"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,19,26,.78), rgba(17,19,26,.55))",
            border: "1px solid rgba(255,255,255,.06)",
            borderLeftWidth: 4,
            borderLeftColor: "var(--brand-violet)",
            "--i": 3,
          } as React.CSSProperties}
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(620px 320px at 28% 50%, rgba(155,107,255,.16), transparent 70%)",
            }}
          />
          <blockquote
            className="relative italic text-[22px] md:text-[30px] leading-[1.4]"
            style={{ fontFamily: SERIF, color: "var(--fg-high)" }}
          >
            <span aria-hidden style={{ color: "rgba(155,107,255,.55)" }}>&ldquo;</span>
            {hero.quote}
            <span aria-hidden style={{ color: "rgba(155,107,255,.55)" }}>&rdquo;</span>
          </blockquote>
          <figcaption
            className="relative mt-6 text-[11px] tracking-[0.20em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)" }}
          >
            {attribution(hero)}
          </figcaption>
        </figure>

        {supporting.length > 0 && (
          <div className="mx-auto mt-4 grid max-w-[820px] gap-4 md:grid-cols-2">
            {supporting.map((t, i) => (
              <figure
                key={t.id}
                className="r-up rounded-[16px] p-5 md:p-6"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,19,26,.7), rgba(17,19,26,.5))",
                  border: "1px solid rgba(255,255,255,.06)",
                  "--i": 4 + i,
                } as React.CSSProperties}
              >
                <blockquote
                  className="italic text-[15px] md:text-[16px] leading-[1.6]"
                  style={{ fontFamily: SERIF, color: "rgba(232,236,255,.85)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption
                  className="mt-4 text-[10px] tracking-[0.18em] uppercase font-semibold"
                  style={{ color: "rgba(167,139,250,.75)" }}
                >
                  {attribution(t)}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
