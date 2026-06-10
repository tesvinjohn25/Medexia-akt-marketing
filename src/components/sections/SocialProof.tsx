import {
  ANNA_AUDIO_QUOTE,
  formatTestimonialAttribution,
  getPublicTestimonials,
  type Testimonial,
} from "@/lib/testimonials";
import { RevealGroup } from "@/components/RevealGroup";
import { Stars } from "@/components/Stars";
import { LiveStatsRibbon } from "./LiveStatsRibbon";
import { ReviewRail } from "./ReviewRail";

const SERIF = 'Georgia, "Times New Roman", Times, serif';

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
    byQuote(filtered, "Medexia was a resource") ??
    byQuote(filtered, "passed comfortably") ??
    byQuote(filtered, "Audiobooks have really been helpful") ??
    filtered[0];
  const supporting = uniqueTestimonials([
    byQuote(filtered, "busy mum"),
    byQuote(filtered, "stats videos"),
    byQuote(filtered, "commute and at the gym"),
    byQuote(filtered, "audio is superb"),
    byQuote(filtered, "common exam mistakes"),
    byQuote(filtered, "Time saving"),
  ])
    .filter((t) => t.id !== hero?.id)
    .slice(0, 3);
  const visibleIds = new Set([hero?.id, ...supporting.map((t) => t.id)]);
  const more = filtered.filter((t) => !visibleIds.has(t.id));

  return (
    <section className="section-padding">
      <div className="container-x">
        <RevealGroup className="text-center mb-9 md:mb-12">
          <div
            className="r-up text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
          >
            Why trainees use it
          </div>
          <h2
            className="r-up mt-3 text-[24px] md:text-[32px] font-semibold leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
              "--i": 1,
            } as React.CSSProperties}
          >
            Proof that audio revision sticks.
          </h2>
          <p
            className="r-up mx-auto mt-3 max-w-[620px] text-[14px] md:text-[16px] leading-[1.65]"
            style={{ color: "rgba(232,236,255,.62)", "--i": 2 } as React.CSSProperties}
          >
            The strongest reviews show trainees carrying AKT Navigator into
            commutes, busy family life, mocks and the exam itself.
          </p>
        </RevealGroup>

        {hero && (
          <RevealGroup>
            <figure className="relative mx-auto mb-10 max-w-[820px] text-center md:mb-14">
              <div
                className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-[280px]"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(155,107,255,.20), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Ghosted quotation mark anchors the quote visually */}
              <div
                className="pointer-events-none absolute -top-12 left-1/2 -z-10 select-none leading-none"
                aria-hidden
                style={{
                  transform: "translateX(-50%)",
                  fontFamily: SERIF,
                  fontSize: "min(46vw, 220px)",
                  color: "rgba(155,107,255,.12)",
                }}
              >
                &ldquo;
              </div>

              <div
                className="r-up flex justify-center"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                <Stars size={17} glow twinkle />
              </div>
              <div
                className="r-up mt-4 mb-5 text-[11px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "rgba(52,211,153,.78)", "--i": 1 } as React.CSSProperties}
              >
                Featured April AKT review
              </div>
              <blockquote
                className="r-blur italic text-[21px] md:text-[30px] leading-[1.35]"
                style={{
                  fontFamily: SERIF,
                  color: "var(--fg-high)",
                  letterSpacing: "-0.005em",
                  "--i": 2,
                } as React.CSSProperties}
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
                className="r-up mt-6 flex justify-center"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                <span
                  className="inline-flex items-center gap-2.5 rounded-full py-[7px] pl-[7px] pr-4"
                  style={{
                    background: "rgba(255,255,255,.045)",
                    border: "1px solid rgba(155,107,255,.25)",
                  }}
                >
                  <span
                    aria-hidden
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))",
                      boxShadow: "0 0 0 2px rgba(155,107,255,.3)",
                    }}
                  >
                    {formatTestimonialAttribution(hero).trim().charAt(0).toUpperCase()}
                  </span>
                  <span
                    className="text-[11px] tracking-[0.18em] uppercase font-semibold"
                    style={{ color: "rgba(197,170,255,.9)" }}
                  >
                    {formatTestimonialAttribution(hero)}
                  </span>
                </span>
              </figcaption>
            </figure>
          </RevealGroup>
        )}

        {supporting.length > 0 && (
          <ReviewRail
            items={supporting.map((t) => ({
              id: t.id,
              quote: t.quote,
              attribution: formatTestimonialAttribution(t),
            }))}
          />
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
                    {formatTestimonialAttribution(t)}
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
