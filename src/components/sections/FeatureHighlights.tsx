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

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(52,211,153,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(251,191,36,.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
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
            className="r-scale relative overflow-hidden rounded-[18px] p-6 md:p-8 md:col-span-2"
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
                    60 hours of audio revision.
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
                  Our killer feature. A full audiobook revision bank covering the entire curriculum.
                  Revise on your commute, in the gym, or eyes closed before bed. Learning that fits
                  around your life, not the other way around.
                </p>
              </div>
            </div>
          </div>

          {/* Adaptive Engine */}
          <div
            className="r-left rounded-[18px] p-6 md:p-7"
            style={{
              background: "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.64))",
              borderLeft: "3px solid rgba(167,139,250,.35)",
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
                It knows what you don&apos;t.
              </h3>
            </div>
            <p
              className="text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              Our adaptive autopilot engine targets your weakest areas first.
              Every session is calibrated to close your knowledge gaps.
            </p>
          </div>

          {/* Explanations */}
          <div
            className="r-right rounded-[18px] p-6 md:p-7"
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
              Structured, examiner-level explanations that walk through clinical
              reasoning step-by-step. Understand the &lsquo;why&rsquo;, not just the &lsquo;what&rsquo;.
            </p>
          </div>

          {/* 10-minute sessions */}
          <div
            className="r-left rounded-[18px] p-6 md:p-7"
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
                <ClockIcon />
              </div>
              <h3
                className="text-[20px] leading-[1.2] font-semibold pt-1"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Built for busy GP trainees.
              </h3>
            </div>
            <p
              className="text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              10-minute high-yield sessions designed for between consults,
              on the commute, or whenever you have a spare moment.
            </p>
          </div>

          {/* Curriculum coverage */}
          <div
            className="r-right rounded-[18px] p-6 md:p-7"
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
                <MapIcon />
              </div>
              <h3
                className="text-[20px] leading-[1.2] font-semibold pt-1"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Complete curriculum coverage.
              </h3>
            </div>
            <p
              className="text-[14px] md:text-[15px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.68)" }}
            >
              All RCGP domains mapped and tracked — clinical, statistics &amp; EBM,
              and prescribing. See exactly where you stand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
