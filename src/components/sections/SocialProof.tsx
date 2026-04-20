import { ANNA_AUDIO_QUOTE, getPublicTestimonials } from "@/lib/testimonials";
import { LiveStatsRibbon } from "./LiveStatsRibbon";

const SERIF = 'Georgia, "Times New Roman", Times, serif';

export async function SocialProof() {
  const all = await getPublicTestimonials();
  const annaIds = new Set(
    all.filter((t) => t.quote.trim() === ANNA_AUDIO_QUOTE).map((t) => t.id),
  );
  const filtered = all.filter((t) => !annaIds.has(t.id));
  const hero = filtered[0];

  return (
    <section className="section-padding">
      <div className="container-x">
        {hero && (
          <figure className="mx-auto max-w-[720px] text-center relative">
            <div
              className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[240px]"
              aria-hidden
              style={{
                background:
                  "radial-gradient(closest-side, rgba(155,107,255,.14), transparent 70%)",
                filter: "blur(16px)",
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
              {[hero.name, hero.trainingStage, hero.deanery]
                .filter(Boolean)
                .join(" · ")}
            </figcaption>
          </figure>
        )}

        <LiveStatsRibbon />
      </div>
    </section>
  );
}
