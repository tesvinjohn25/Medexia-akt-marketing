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

function quoteIncludes(t: Testimonial, text: string) {
  return t.quote.toLowerCase().includes(text.toLowerCase());
}

function byQuote(testimonials: Testimonial[], text: string) {
  return testimonials.find((t) => quoteIncludes(t, text));
}

function uniqueTestimonials(testimonials: Array<Testimonial | undefined>) {
  const seen = new Set<string>();
  return testimonials.filter((t): t is Testimonial => {
    if (!t || seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
}

export async function SocialProof() {
  const all = await getPublicTestimonials();
  const annaIds = new Set(
    all.filter((t) => t.quote.trim() === ANNA_AUDIO_QUOTE).map((t) => t.id),
  );
  const filtered = all.filter(
    (t) => !annaIds.has(t.id) && t.quote.trim() !== "Audio-first revision",
  );
  const hero =
    byQuote(filtered, "passed comfortably") ??
    byQuote(filtered, "Audiobooks have really been helpful") ??
    filtered[0];
  const supporting = uniqueTestimonials([
    byQuote(filtered, "common exam mistakes"),
    byQuote(filtered, "commute and at the gym"),
    byQuote(filtered, "basic concepts"),
    byQuote(filtered, "audio is superb"),
    byQuote(filtered, "driving"),
    byQuote(filtered, "Time saving"),
  ])
    .filter((t) => t.id !== hero?.id)
    .slice(0, 3);
  const visibleIds = new Set([hero?.id, ...supporting.map((t) => t.id)]);
  const more = filtered.filter((t) => !visibleIds.has(t.id));

  return (
    <section className="section-padding">
      <div className="container-x">
        <div className="text-center mb-9 md:mb-12">
          <div
            className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)" }}
          >
            Why trainees use it
          </div>
          <h2
            className="mt-3 text-[24px] md:text-[32px] font-semibold leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Proof that audio revision fits real life.
          </h2>
          <p
            className="mx-auto mt-3 max-w-[620px] text-[14px] md:text-[16px] leading-[1.65]"
            style={{ color: "rgba(232,236,255,.62)" }}
          >
            The strongest reviews are not abstract praise. They show trainees
            using AKT Navigator while commuting, walking, driving and revising
            in short pockets of time.
          </p>
        </div>

        {hero && (
          <figure className="mx-auto max-w-[820px] text-center relative mb-10 md:mb-14">
            <div
              className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[260px]"
              aria-hidden
              style={{
                background:
                  "radial-gradient(closest-side, rgba(155,107,255,.14), transparent 70%)",
                filter: "blur(18px)",
              }}
            />
            <blockquote
              className="italic text-[21px] md:text-[30px] leading-[1.35]"
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

        {supporting.length > 0 && (
          <div className="mx-auto max-w-[1120px] grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {supporting.map((t) => (
              <figure
                key={t.id}
                className="rounded-[16px] p-5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,19,26,.76), rgba(17,19,26,.54))",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <blockquote
                  className="italic text-[14px] md:text-[15px] leading-[1.6]"
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

        {more.length > 0 && (
          <details
            className="mx-auto mt-6 max-w-[1120px] rounded-[16px] p-5"
            style={{
              background: "rgba(17,19,26,.46)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <summary
              className="cursor-pointer list-none text-center text-[13px] font-semibold"
              style={{ color: "rgba(232,236,255,.78)" }}
            >
              Read more trainee reviews
            </summary>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {more.map((t) => (
                <figure
                  key={t.id}
                  className="border-t pt-4"
                  style={{ borderColor: "rgba(255,255,255,.08)" }}
                >
                  <blockquote
                    className="italic text-[13px] md:text-[14px] leading-[1.6]"
                    style={{
                      fontFamily: SERIF,
                      color: "rgba(232,236,255,.76)",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption
                    className="mt-3 text-[10px] tracking-[0.18em] uppercase font-semibold"
                    style={{ color: "rgba(167,139,250,.68)" }}
                  >
                    {attribution(t)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </details>
        )}

        <LiveStatsRibbon />
      </div>
    </section>
  );
}
