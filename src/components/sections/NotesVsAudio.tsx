"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function NotesVsAudio() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-[960px]">
          <h2
            className="r-blur text-center text-[24px] md:text-[40px] lg:text-[44px] font-semibold leading-[1.08]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
              "--i": 0,
            } as React.CSSProperties}
          >
            Notes belong in the last century.
          </h2>
          <p
            className="r-up mt-4 text-center text-[15px] md:text-[17px] leading-[1.6] max-w-[560px] mx-auto"
            style={{
              color: "rgba(232,236,255,.65)",
              "--i": 1,
            } as React.CSSProperties}
          >
            You have patients, a partner, a commute, a life. A 400-page
            notebook doesn&rsquo;t fit into any of that. Audiobooks do.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {/* LEFT: Notes */}
            <div
              className="r-left rounded-[18px] p-6 md:p-8 flex flex-col"
              style={{
                background: "rgba(18,20,26,.6)",
                border: "1px solid rgba(255,255,255,.05)",
                "--i": 2,
              } as React.CSSProperties}
            >
              <div
                className="text-[10px] tracking-[0.24em] uppercase font-semibold mb-3"
                style={{ color: "rgba(232,236,255,.35)" }}
              >
                The old way
              </div>
              <h3
                className="text-[22px] md:text-[32px] font-semibold mb-4 md:mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                  color: "rgba(232,236,255,.55)",
                }}
              >
                Notes.
              </h3>

              {/* Notebook illustration */}
              <div className="flex-1 flex items-center justify-center py-2 md:py-4">
                <svg
                  className="w-[150px] md:w-[200px] h-auto"
                  viewBox="0 0 240 180"
                  fill="none"
                  aria-hidden
                  style={{ opacity: 0.4 }}
                >
                  <rect
                    x="28"
                    y="24"
                    width="184"
                    height="138"
                    rx="4"
                    fill="rgba(255,255,255,0.03)"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1"
                  />
                  <line x1="52" y1="54" x2="190" y2="54" stroke="rgba(255,255,255,0.18)" />
                  <line x1="52" y1="72" x2="176" y2="72" stroke="rgba(255,255,255,0.18)" />
                  <line x1="52" y1="90" x2="188" y2="90" stroke="rgba(255,255,255,0.18)" />
                  <line x1="52" y1="108" x2="160" y2="108" stroke="rgba(255,255,255,0.18)" />
                  <line x1="52" y1="126" x2="180" y2="126" stroke="rgba(255,255,255,0.18)" />
                  <line x1="52" y1="144" x2="150" y2="144" stroke="rgba(255,255,255,0.18)" />
                  <circle cx="28" cy="48" r="3" fill="rgba(255,255,255,0.12)" />
                  <circle cx="28" cy="72" r="3" fill="rgba(255,255,255,0.12)" />
                  <circle cx="28" cy="96" r="3" fill="rgba(255,255,255,0.12)" />
                  <circle cx="28" cy="120" r="3" fill="rgba(255,255,255,0.12)" />
                  <circle cx="28" cy="144" r="3" fill="rgba(255,255,255,0.12)" />
                </svg>
              </div>

              <ul
                className="mt-4 space-y-2 text-[13px] md:text-[14px] leading-[1.5]"
                style={{ color: "rgba(232,236,255,.45)" }}
              >
                <li>400 pages you haven&rsquo;t got time to read.</li>
                <li>Chained to a desk you can&rsquo;t get to.</li>
                <li>Out of date the moment they&rsquo;re printed.</li>
              </ul>
            </div>

            {/* RIGHT: Audiobooks */}
            <div
              className="r-right rounded-[18px] p-6 md:p-8 relative overflow-hidden flex flex-col"
              style={{
                background:
                  "linear-gradient(135deg, rgba(236,72,153,.10) 0%, rgba(17,19,26,.88) 40%, rgba(17,19,26,.88) 60%, rgba(167,139,250,.08) 100%)",
                border: "1px solid rgba(236,72,153,.22)",
                "--i": 3,
              } as React.CSSProperties}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(236,72,153,.14) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <div
                className="text-[10px] tracking-[0.24em] uppercase font-semibold mb-3 relative"
                style={{ color: "rgba(236,72,153,.9)" }}
              >
                The new way
              </div>
              <h3
                className="text-[26px] md:text-[32px] font-semibold mb-6 relative"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                Audiobooks.
              </h3>

              {/* Phone screenshot */}
              <div className="flex-1 flex items-center justify-center py-2 md:py-4 relative">
                <div
                  className="overflow-hidden rounded-[20px] w-[130px] md:w-[170px]"
                  style={{
                    boxShadow:
                      "0 18px 60px rgba(236,72,153,.38), 0 0 80px rgba(236,72,153,.14)",
                  }}
                >
                  <Image
                    src="/appshots/03-audio-1206x2622.png"
                    alt="AKT Navigator audiobook player"
                    width={603}
                    height={1311}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <ul
                className="mt-4 space-y-2 text-[13px] md:text-[14px] leading-[1.55] relative"
                style={{ color: "rgba(232,236,255,.82)" }}
              >
                <li>90+ hours in your ear, always.</li>
                <li>Revise while you drive, walk, and live.</li>
                <li>The full RCGP curriculum, covered.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
