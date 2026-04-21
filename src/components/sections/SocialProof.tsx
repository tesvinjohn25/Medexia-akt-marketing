import {
  ANNA_AUDIO_QUOTE,
  getPublicTestimonials,
  type Testimonial,
} from "@/lib/testimonials";
import { LiveStatsRibbon } from "./LiveStatsRibbon";

const SERIF = 'Georgia, "Times New Roman", Times, serif';

function attribution(t: Testimonial) {
  return [t.name, t.trainingStage, t.deanery].filter(Boolean).join(" · ");
}

export async function SocialProof() {
  const all = await getPublicTestimonials();
  const annaIds = new Set(
    all.filter((t) => t.quote.trim() === ANNA_AUDIO_QUOTE).map((t) => t.id),
  );
  const filtered = all.filter((t) => !annaIds.has(t.id));
  const hero = filtered[0];
  // Show up to 5 supporting quotes in a grid — cap so the section doesn't
  // sprawl when the testimonial bank grows.
  const supporting = filtered.slice(1, 6);

  return (
    <section className="section-padding">
      <div className="container-x">
        <div className="text-center mb-10 md:mb-14">
          <div
            className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)" }}
          >
            Their words, not ours
          </div>
          <h2
            className="mt-3 text-[24px] md:text-[32px] font-semibold leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Reviews from GP trainees across the UK.
          </h2>
        </div>

        {/* Hero testimonial */}
        {hero && (
          <figure className="mx-auto max-w-[760px] text-center relative mb-14 md:mb-20">
            <div
              className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[280px]"
              aria-hidden
              style={{
                background:
                  "radial-gradient(closest-side, rgba(155,107,255,.14), transparent 70%)",
                filter: "blur(18px)",
              }}
            />
            <blockquote
              className="italic text-[22px] md:text-[30px] leading-[1.35]"
              style={{
                fontFamily: SERIF,
                color: "var(--fg-high)",
                letterSpacing: "-0.005em",
              }}
            >
              <span aria-hidden style={{ color: "rgba(155,107,255,.6)" }}>
                &ldquo;
              </span>
              {hero.quote}
              <span aria-hidden style={{ color: "rgba(155,107,255,.6)" }}>
                &rdquo;
              </span>
            </blockquote>
            <figcaption
              className="mt-5 text-[11px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: "rgba(167,139,250,.85)" }}
            >
              {attribution(hero)}
            </figcaption>
          </figure>
        )}

        {/* Supporting quote grid */}
        {supporting.length > 0 && (
          <div className="mx-auto max-w-[1120px] grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {supporting.map((t) => (
              <figure
                key={t.id}
                className="pl-5"
                style={{ borderLeft: "2px solid rgba(155,107,250,.4)" }}
              >
                <blockquote
                  className="italic text-[15px] md:text-[16px] leading-[1.55]"
                  style={{
                    fontFamily: SERIF,
                    color: "rgba(232,236,255,.85)",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption
                  className="mt-4 text-[10px] tracking-[0.2em] uppercase font-semibold"
                  style={{ color: "rgba(167,139,250,.75)" }}
                >
                  {attribution(t)}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <LiveStatsRibbon />
      </div>
    </section>
  );
}
