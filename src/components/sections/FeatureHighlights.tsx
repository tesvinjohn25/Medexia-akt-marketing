"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TiltCard } from "@/components/TiltCard";
import { AudioEqualizer } from "@/components/AudioEqualizer";
import { AlgorithmViz } from "./AlgorithmViz";

export function FeatureHighlights() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="r-blur mx-auto mb-10 max-w-[760px] text-center">
          <div
            className="text-[13px] tracking-[0.22em] uppercase font-semibold"
            style={{
              color: "rgba(167,139,250,.85)",
              "--i": 0,
            } as React.CSSProperties}
          >
            From overwhelmed to in control
          </div>
          <h2
            className="mt-3 text-[28px] md:text-[42px] leading-[1.08]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.035em",
            }}
          >
            Stop guessing what to revise next.
          </h2>
          <p
            className="mx-auto mt-3 max-w-[620px] text-[15px] md:text-[16px] leading-[1.65]"
            style={{ color: "rgba(232,236,255,.68)" }}
          >
            AKT Navigator gives you a repeatable loop for real GP trainee life:
            listen, practise, review, repeat.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* HERO CARD: Audio for tired days */}
          <div
            className="r-scale md:col-span-2"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <TiltCard
              maxTilt={2.5}
              className="card-shimmer relative h-full overflow-hidden rounded-[18px] p-6 md:p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(236,72,153,.08) 0%, rgba(17,19,26,.88) 40%, rgba(17,19,26,.88) 60%, rgba(167,139,250,.06) 100%)",
                border: "1px solid rgba(236,72,153,.18)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(236,72,153,.10) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <div className="flex items-center gap-3">
                <div
                  className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
                  style={{ color: "rgba(236,72,153,.9)" }}
                >
                  Tired days &middot; Audio
                </div>
                <AudioEqualizer />
              </div>
              <h3
                className="mt-2 text-[24px] md:text-[30px] leading-[1.12] font-semibold max-w-[640px]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                Keep revision moving when reading is not happening.
              </h3>
              <p
                className="mt-3 text-[15px] md:text-[16px] leading-[1.65] max-w-[620px]"
                style={{ color: "rgba(232,236,255,.72)" }}
              >
                Turn commutes, walks, gym sessions, cooking, childcare gaps and
                low-energy evenings after clinic into useful AKT progress.
                The full library covers 90+ hours across the AKT syllabus.
              </p>
              <blockquote
                className="mt-5 italic text-[13px] md:text-[14px] leading-[1.6] max-w-[560px]"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  color: "rgba(232,236,255,.78)",
                  borderLeft: "2px solid var(--brand-violet)",
                  paddingLeft: 12,
                }}
              >
                &ldquo;Audiobooks have been the bulk of my revision. Really useful.&rdquo;
                <footer
                  className="mt-1 not-italic text-[10px] tracking-[0.18em] uppercase font-semibold"
                  style={{ color: "rgba(167,139,250,.75)" }}
                >
                  &mdash; Anna, ST2
                </footer>
              </blockquote>
            </TiltCard>
          </div>

          {/* Algorithm */}
          <div className="r-left" style={{ "--i": 2 } as React.CSSProperties}>
            <TiltCard
              className="card-shimmer relative h-full overflow-hidden rounded-[18px] p-6 md:p-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
                border: "1px solid rgba(255,255,255,.08)",
                borderLeftColor: "rgba(167,139,250,.5)",
                borderLeftWidth: 3,
              }}
            >
              <div
                className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "rgba(167,139,250,.85)" }}
              >
                Weak areas
              </div>
              <h3
                className="mt-2 text-[20px] md:text-[22px] leading-[1.18] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                Know what to revise next.
              </h3>
              <p
                className="mt-3 text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.68)" }}
              >
                Use questions and mocks to expose weak areas instead of cycling
                randomly through topics. Your revision becomes a sequence, not
                a guess.
              </p>

              <AlgorithmViz />
            </TiltCard>
          </div>

          {/* Scary topics */}
          <div className="r-right" style={{ "--i": 3 } as React.CSSProperties}>
            <TiltCard
              className="card-shimmer relative h-full overflow-hidden rounded-[18px] p-6 md:p-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
                border: "1px solid rgba(255,255,255,.08)",
                borderLeftColor: "rgba(52,211,153,.5)",
                borderLeftWidth: 3,
              }}
            >
              <div
                className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "rgba(52,211,153,.85)" }}
              >
                Weak-area repair
              </div>
              <h3
                className="mt-2 text-[20px] md:text-[22px] leading-[1.18] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                Turn scary topics into repair work.
              </h3>
              <p
                className="mt-3 text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.68)" }}
              >
                Revisit statistics, prescribing and high-yield AKT traps with
                structured explanations and audio reinforcement, so weak areas
                become specific jobs rather than background uncertainty.
              </p>
            </TiltCard>
          </div>

          {/* Mocks */}
          <div className="r-left" style={{ "--i": 4 } as React.CSSProperties}>
            <TiltCard
              className="card-shimmer relative h-full overflow-hidden rounded-[18px] p-6 md:p-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
                border: "1px solid rgba(255,255,255,.08)",
                borderLeftColor: "rgba(96,165,250,.5)",
                borderLeftWidth: 3,
              }}
            >
              <div
                className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "rgba(96,165,250,.86)" }}
              >
                Exam pace
              </div>
              <h3
                className="mt-2 text-[20px] md:text-[22px] leading-[1.18] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                Build the one-minute rhythm.
              </h3>
              <p
                className="mt-3 text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.68)" }}
              >
                Use 40, 80 or 160-question timed mocks to practise pace before
                exam day, then review mistakes while the decision is still
                fresh.
              </p>
            </TiltCard>
          </div>

          {/* Prepared loop */}
          <div className="r-right" style={{ "--i": 5 } as React.CSSProperties}>
            <TiltCard
              className="card-shimmer relative h-full overflow-hidden rounded-[18px] p-6 md:p-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
                border: "1px solid rgba(255,255,255,.08)",
                borderLeftColor: "rgba(236,72,153,.5)",
                borderLeftWidth: 3,
              }}
            >
              <div
                className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold"
                style={{ color: "rgba(236,72,153,.88)" }}
              >
                Confidence loop
              </div>
              <h3
                className="mt-2 text-[20px] md:text-[22px] leading-[1.18] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                Feel more prepared without needing perfect days.
              </h3>
              <p
                className="mt-3 text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.68)" }}
              >
                Replace &ldquo;I don&rsquo;t know if I&rsquo;m doing
                enough&rdquo; with a simple loop you can repeat: listen,
                practise, review, repeat.
              </p>
            </TiltCard>
          </div>
        </div>

        <p
          className="r-up mt-7 text-center text-[13px] md:text-[14px] font-semibold"
          style={{ color: "rgba(232,236,255,.55)", "--i": 4 } as React.CSSProperties}
        >
          Don&rsquo;t take our word for it &mdash;{" "}
          <a
            href="#try-the-app"
            className="transition-colors hover:text-white"
            style={{ color: "rgba(197,170,255,.9)" }}
          >
            try it yourself below
          </a>
          .
        </p>
      </div>
    </section>
  );
}
