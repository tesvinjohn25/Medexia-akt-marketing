"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function FeatureHighlights() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div
          className="r-blur mb-10 text-center text-[13px] tracking-[0.22em] uppercase font-semibold"
          style={{
            color: "rgba(167,139,250,.85)",
            "--i": 0,
          } as React.CSSProperties}
        >
          Three things. Each built for time-poor trainees.
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* HERO CARD: Audiobooks — full width */}
          <div
            className="r-scale card-shimmer relative overflow-hidden rounded-[18px] p-6 md:p-8 md:col-span-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(236,72,153,.08) 0%, rgba(17,19,26,.88) 40%, rgba(17,19,26,.88) 60%, rgba(167,139,250,.06) 100%)",
              border: "1px solid rgba(236,72,153,.18)",
              "--i": 1,
            } as React.CSSProperties}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(236,72,153,.10) 0%, transparent 70%)",
              }}
              aria-hidden
            />
            <div
              className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: "rgba(236,72,153,.9)" }}
            >
              The USP &middot; Audiobooks
            </div>
            <h3
              className="mt-2 text-[24px] md:text-[30px] leading-[1.12] font-semibold max-w-[640px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              90+ hours. The whole RCGP curriculum.
            </h3>
            <p
              className="mt-3 text-[15px] md:text-[16px] leading-[1.65] max-w-[620px]"
              style={{ color: "rgba(232,236,255,.72)" }}
            >
              On the drive to work, at the gym, on the school run, between
              patients. Revise while you live your life. No other AKT tool
              has audiobooks at this scale.
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
          </div>

          {/* Algorithm */}
          <div
            className="r-left card-shimmer rounded-[18px] p-6 md:p-7"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
              border: "1px solid rgba(255,255,255,.08)",
              borderLeftColor: "rgba(167,139,250,.5)",
              borderLeftWidth: 3,
              "--i": 2,
            } as React.CSSProperties}
          >
            <div
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: "rgba(167,139,250,.85)" }}
            >
              The Algorithm
            </div>
            <h3
              className="mt-2 text-[20px] md:text-[22px] leading-[1.18] font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              The fastest path to pass level.
            </h3>
            <p
              className="mt-3 text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              It calibrates where you are first, then every session is rebuilt
              around your weak spots. The algorithm picks the 10 questions you
              need most right now. No planning &mdash; you press start, it
              handles the rest.
            </p>
          </div>

          {/* Mocks + AI debrief */}
          <div
            className="r-right card-shimmer rounded-[18px] p-6 md:p-7"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
              border: "1px solid rgba(255,255,255,.08)",
              borderLeftColor: "rgba(52,211,153,.5)",
              borderLeftWidth: 3,
              "--i": 3,
            } as React.CSSProperties}
          >
            <div
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-semibold"
              style={{ color: "rgba(52,211,153,.85)" }}
            >
              Mocks &amp; AI Debrief
            </div>
            <h3
              className="mt-2 text-[20px] md:text-[22px] leading-[1.18] font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              See where you&rsquo;re confidently wrong.
            </h3>
            <p
              className="mt-3 text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              40, 80 or 160 questions &mdash; pick your time. The debrief
              catches what you can&rsquo;t see yourself: timing drops, fatigue
              patterns, and the topics you only think you know.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
