"use client";

import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function stepFromProgress(p: number) {
  if (p < 0.34) return 0;
  if (p < 0.68) return 1;
  return 2;
}

export function HeroNarration({
  progress,
  demoUrl,
}: {
  progress: number;
  demoUrl: string;
}) {
  const step = stepFromProgress(progress);

  // Soft crossfade window around step boundaries for polish.
  const w = 0.08;
  const a0 = clamp(1 - progress / (0.34 - w), 0, 1);
  const a1 = clamp(1 - Math.abs(progress - 0.51) / (0.17 + w), 0, 1);
  const a2 = clamp((progress - (0.68 - w)) / (1 - (0.68 - w)), 0, 1);

  return (
    <>
      {/* Top-right CTA (no pill) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-30"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)" }}
      >
        <div className="container-x flex items-center justify-end">
          <a
            href={demoUrl}
            className="pointer-events-auto rounded-full border px-4 py-[10px] text-sm font-semibold"
            style={{
              borderColor: "rgba(255,255,255,.16)",
              background: "rgba(6,7,12,.36)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 18px 55px rgba(0,0,0,.45)",
            }}
          >
            Start now
          </a>
        </div>
      </div>

      {/* Bottom narration track (keeps phone screen unobstructed) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div
          className="absolute inset-x-0 bottom-0 h-[48vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(6,7,12,.92), rgba(6,7,12,.55) 40%, rgba(6,7,12,0) 100%)",
          }}
          aria-hidden
        />

        <div
          className="container-x relative pb-[calc(env(safe-area-inset-bottom)+18px)]"
          style={{
            // Keep this low so it sits below the phone screen region.
            paddingTop: "52vh",
          }}
        >
          <div className="max-w-[560px]">
            <div className="faint text-[11px] tracking-[0.20em] uppercase">
              For time‑poor UK GP trainees
            </div>

            <div className="relative mt-2">
              <div
                className="transition-all duration-300"
                style={{
                  opacity: a0,
                  transform: a0 > 0.01 ? "translateY(0px)" : "translateY(6px)",
                }}
              >
                <div
                  className="text-[30px] leading-[1.06]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.04em",
                    textShadow: "0 22px 70px rgba(0,0,0,.7)",
                  }}
                >
                  Feel the difference
                  <br />
                  in 5 questions.
                </div>
                <div className="mt-2 text-[15px] leading-[1.55]" style={{ color: "rgba(232,236,255,.78)" }}>
                  No signup. Scroll to scrub the demo.
                </div>
              </div>

              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  opacity: a1,
                  transform: a1 > 0.01 ? "translateY(0px)" : "translateY(6px)",
                }}
              >
                <div
                  className="text-[28px] leading-[1.10]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.035em",
                    textShadow: "0 22px 70px rgba(0,0,0,.7)",
                  }}
                >
                  Short, brutal
                  <br />
                  AKT SBA sessions.
                </div>
                <div className="mt-2 text-[15px] leading-[1.55]" style={{ color: "rgba(232,236,255,.78)" }}>
                  Built for nights, commutes, and stolen minutes.
                </div>
              </div>

              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  opacity: a2,
                  transform: a2 > 0.01 ? "translateY(0px)" : "translateY(6px)",
                }}
              >
                <div
                  className="text-[28px] leading-[1.10]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.035em",
                    textShadow: "0 22px 70px rgba(0,0,0,.7)",
                  }}
                >
                  Explanations
                  <br />
                  that actually stick.
                </div>
                <div className="mt-2 text-[15px] leading-[1.55]" style={{ color: "rgba(232,236,255,.78)" }}>
                  Why correct is correct — and why every distractor is wrong.
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3" style={{ color: "rgba(232,236,255,.55)" }}>
              <div
                className="h-[34px] w-[22px] rounded-full border"
                style={{ borderColor: "rgba(255,255,255,.18)", position: "relative" }}
                aria-hidden
              >
                <div
                  className="h-[6px] w-[6px] rounded-full"
                  style={{
                    background: "rgba(255,255,255,.65)",
                    position: "absolute",
                    left: "50%",
                    top: 7,
                    transform: "translateX(-50%)",
                    animation: "heroDot 1.6s ease-in-out infinite",
                  }}
                />
              </div>
              <div className="text-[11px] tracking-[0.16em] uppercase">
                {step === 0 ? "Scroll" : step === 1 ? "Keep scrolling" : "Almost there"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
