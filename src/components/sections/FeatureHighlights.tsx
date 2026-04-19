"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

function HeadphonesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(236,72,153,.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      <path d="M10 21h4" />
      <path d="M9 9h6" />
      <path d="M12 6v6" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function MockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(52,211,153,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ClipboardCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(244,114,82,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(251,191,36,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1.27c.34-.6.99-1 1.73-1a2 2 0 1 1 0 4c-.74 0-1.39-.4-1.73-1H21a7 7 0 0 1-7 7v1.27c.6.34 1 .99 1 1.73a2 2 0 1 1-4 0c0-.74.4-1.39 1-1.73V23a7 7 0 0 1-7-7H3.73c-.34.6-.99 1-1.73 1a2 2 0 1 1 0-4c.74 0 1.39.4 1.73 1H5a7 7 0 0 1 7-7V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
    </svg>
  );
}

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
          style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
        >
          Everything you need
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* HERO CARD: Audiobook — spans full width */}
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
                background: "radial-gradient(circle, rgba(236,72,153,.10) 0%, transparent 70%)",
              }}
              aria-hidden
            />
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 grid place-items-center h-12 w-12 rounded-2xl"
                style={{ background: "rgba(236,72,153,.10)" }}
              >
                <HeadphonesIcon />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3
                    className="text-[22px] md:text-[26px] leading-[1.15] font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    50+ hours of audio revision.
                  </h3>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-[2px] text-[9px] tracking-[0.14em] uppercase font-bold"
                    style={{
                      background: "rgba(236,72,153,.12)",
                      border: "1px solid rgba(236,72,153,.25)",
                      color: "rgba(236,72,153,.85)",
                    }}
                  >
                    Included
                  </span>
                </div>
                <p
                  className="mt-2 text-[15px] md:text-[16px] leading-[1.65] max-w-[580px]"
                  style={{ color: "rgba(232,236,255,.72)" }}
                >
                  Revise on your commute, at the gym, between patients. The full AKT
                  curriculum in audio &mdash; no other tool offers this at scale.
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
            </div>
          </div>

          {/* Adaptive Engine */}
          <div
            className="r-left card-shimmer rounded-[18px] p-6 md:p-7"
            style={{
              background: "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
              border: "1px solid rgba(255,255,255,.08)",
              borderLeftColor: "rgba(167,139,250,.35)",
              borderLeftWidth: 3,
              "--i": 2,
            } as React.CSSProperties}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 grid place-items-center h-10 w-10 rounded-xl"
                style={{ background: "rgba(167,139,250,.08)" }}
              >
                <BrainIcon />
              </div>
              <h3
                className="text-[20px] leading-[1.2] font-semibold pt-1"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Adapts to your weak spots.
              </h3>
            </div>
            <p
              className="text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              The adaptive algorithm identifies what you don&apos;t know and targets it.
              No more wasting time on topics you&apos;ve mastered.
            </p>
          </div>

          {/* Explanations */}
          <div
            className="r-right card-shimmer rounded-[18px] p-6 md:p-7"
            style={{
              background: "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
              border: "1px solid rgba(255,255,255,.08)",
              borderLeftColor: "rgba(96,165,250,.35)",
              borderLeftWidth: 3,
              "--i": 3,
            } as React.CSSProperties}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 grid place-items-center h-10 w-10 rounded-xl"
                style={{ background: "rgba(96,165,250,.08)" }}
              >
                <BookIcon />
              </div>
              <h3
                className="text-[20px] leading-[1.2] font-semibold pt-1"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Explanations that actually teach.
              </h3>
            </div>
            <p
              className="text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              Not textbook extracts. Every answer explained like a senior GP
              breaking it down for you step-by-step.
            </p>
          </div>

          {/* Realistic mock exams */}
          <div
            className="r-left card-shimmer rounded-[18px] p-6 md:p-7"
            style={{
              background: "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
              border: "1px solid rgba(255,255,255,.08)",
              borderLeftColor: "rgba(52,211,153,.35)",
              borderLeftWidth: 3,
              "--i": 4,
            } as React.CSSProperties}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 grid place-items-center h-10 w-10 rounded-xl"
                style={{ background: "rgba(52,211,153,.08)" }}
              >
                <MockIcon />
              </div>
              <h3
                className="text-[20px] leading-[1.2] font-semibold pt-1"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Realistic mock exams.
              </h3>
            </div>
            <p
              className="text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              Generate mocks at 40, 80, or 160 questions. Balanced or weighted to
              your weak areas. Full debrief analysis after.
            </p>
          </div>

          {/* AI Supervisor */}
          <div
            className="r-right card-shimmer rounded-[18px] p-6 md:p-7"
            style={{
              background: "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
              border: "1px solid rgba(255,255,255,.08)",
              borderLeftColor: "rgba(251,191,36,.35)",
              borderLeftWidth: 3,
              "--i": 5,
            } as React.CSSProperties}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 grid place-items-center h-10 w-10 rounded-xl"
                style={{ background: "rgba(251,191,36,.08)" }}
              >
                <AIIcon />
              </div>
              <h3
                className="text-[20px] leading-[1.2] font-semibold pt-1"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                AI Supervisor.
              </h3>
            </div>
            <p
              className="text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              Stuck on a concept? Ask a follow-up question at any point.
              On-demand clinical reasoning help.
            </p>
          </div>

          {/* Mock Generator — spans full width */}
          <div
            className="r-scale relative overflow-hidden rounded-[18px] p-6 md:p-8 md:col-span-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(244,114,82,.08) 0%, rgba(17,19,26,.88) 40%, rgba(17,19,26,.88) 60%, rgba(251,191,36,.06) 100%)",
              border: "1px solid rgba(244,114,82,.18)",
              "--i": 6,
            } as React.CSSProperties}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(244,114,82,.10) 0%, transparent 70%)",
              }}
              aria-hidden
            />
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 grid place-items-center h-12 w-12 rounded-2xl"
                style={{ background: "rgba(244,114,82,.10)" }}
              >
                <ClipboardCheckIcon />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3
                    className="text-[22px] md:text-[26px] leading-[1.15] font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Unlimited mock exams.
                  </h3>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-[2px] text-[9px] tracking-[0.14em] uppercase font-bold"
                    style={{
                      background: "rgba(244,114,82,.12)",
                      border: "1px solid rgba(244,114,82,.25)",
                      color: "rgba(244,114,82,.85)",
                    }}
                  >
                    New
                  </span>
                </div>
                <p
                  className="mt-2 text-[15px] md:text-[16px] leading-[1.65] max-w-[580px]"
                  style={{ color: "rgba(232,236,255,.72)" }}
                >
                  Create timed mock tests from our vast question bank — choose 40, 80, or 160 questions
                  depending on the time you have. Every mock comes with detailed analytics so you can
                  debrief and dig into your performance beyond what you got right and wrong.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
