"use client";

import React from "react";

export function HeroOverlay({
  demoUrl,
}: {
  demoUrl: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      {/* Bottom gradient so copy stays readable without blanketing the whole hero */}
      <div
        className="absolute inset-x-0 bottom-0 h-[52vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(6,7,12,.92), rgba(6,7,12,.55) 38%, rgba(6,7,12,0) 100%)",
        }}
        aria-hidden
      />

      <div className="container-x relative pb-[calc(env(safe-area-inset-bottom)+18px)]">
        <div
          className="pointer-events-auto rounded-[26px] border"
          style={{
            background: open ? "rgba(6,7,12,.68)" : "rgba(6,7,12,.46)",
            borderColor: "rgba(255,255,255,.10)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 26px 80px rgba(0,0,0,.6)",
            overflow: "hidden",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-expanded={open}
          >
            <div className="text-left">
              <div className="faint text-[11px] tracking-[0.18em] uppercase">
                Guided revision for UK GP trainees
              </div>

              {/* Collapsed: keep it short so the phone stays visible */}
              {!open ? (
                <div
                  className="mt-2 text-[18px] leading-[1.15]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.03em",
                    textShadow: "0 18px 60px rgba(0,0,0,.65)",
                  }}
                >
                  Medexia covers what matters.
                </div>
              ) : (
                <div
                  className="mt-2 text-[30px] leading-[1.02]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.04em",
                    textShadow: "0 18px 60px rgba(0,0,0,.65)",
                  }}
                >
                  The AKT covers everything.
                  <br />
                  <span style={{ color: "var(--brand-violet-light)" }}>
                    Medexia covers what matters.
                  </span>
                </div>
              )}
            </div>

            <div
              className="ml-4 grid place-items-center rounded-full border"
              style={{
                width: 38,
                height: 38,
                borderColor: "rgba(255,255,255,.14)",
                background: "rgba(255,255,255,.04)",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 240ms ease",
              }}
              aria-hidden
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="rgba(255,255,255,.8)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          {/* Collapsible body */}
          <div
            className="px-5"
            style={{
              maxHeight: open ? 420 : 0,
              opacity: open ? 1 : 0,
              transition: "max-height 360ms ease, opacity 220ms ease",
              overflow: "hidden",
            }}
          >
            <p
              className="pb-4 text-[15px] leading-[1.55]"
              style={{
                color: "rgba(232,236,255,.80)",
                textShadow: "0 14px 40px rgba(0,0,0,.6)",
              }}
            >
              Scroll to move the phone into place. Next: a scroll‑scrubbed walkthrough of the app.
            </p>
          </div>

          {/* Actions: collapsed = single CTA; expanded = both */}
          <div className="px-5 pb-5">
            <div className="grid gap-3">
              <a className="btn-primary w-full" href={demoUrl}>
                Just revise
              </a>
              {open ? (
                <a className="btn-secondary w-full" href={demoUrl}>
                  Try the 5‑question demo
                </a>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-[13px]" style={{ color: "rgba(232,236,255,.62)" }}>
                No signup. Under 90 seconds.
              </div>
              <div className="flex items-center gap-3" style={{ color: "rgba(232,236,255,.55)" }}>
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
                <div className="text-[11px] tracking-[0.16em] uppercase">Scroll</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop overlay is handled in page.tsx; this component is for mobile-first. */}
      </div>
    </div>
  );
}
