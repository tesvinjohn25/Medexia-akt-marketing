"use client";

import React from "react";

export function HeroOverlay({
  demoUrl,
}: {
  demoUrl: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    // Mobile: keep the phone screen unobstructed. Use a top "capsule" overlay instead of a bottom card.
    <div className="pointer-events-none absolute inset-0 z-20">
      <div
        className="container-x relative pt-[calc(env(safe-area-inset-top)+12px)]"
        style={{
          // prevent any layout shift from iOS toolbars
          minHeight: 0,
        }}
      >
        <div
          className="pointer-events-auto rounded-[999px] border"
          style={{
            background: open ? "rgba(6,7,12,.70)" : "rgba(6,7,12,.44)",
            borderColor: "rgba(255,255,255,.10)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 22px 70px rgba(0,0,0,.55)",
            overflow: "hidden",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-4 px-4 py-3"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-expanded={open}
          >
            <div className="min-w-0 text-left">
              <div className="faint text-[10px] tracking-[0.20em] uppercase">
                Guided revision for UK GP trainees
              </div>
              <div
                className="mt-1 truncate text-[16px] leading-[1.15]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                  textShadow: "0 18px 60px rgba(0,0,0,.65)",
                }}
              >
                Medexia covers what matters.
              </div>
            </div>

            <a
              href={demoUrl}
              className="btn-primary"
              style={{ padding: "10px 12px", borderRadius: 999 }}
              onClick={(e) => e.stopPropagation()}
            >
              Demo
            </a>

            <div
              className="grid place-items-center rounded-full border"
              style={{
                width: 34,
                height: 34,
                borderColor: "rgba(255,255,255,.14)",
                background: "rgba(255,255,255,.04)",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 240ms ease",
                flex: "0 0 auto",
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

          {/* Collapsible body (kept small; never covers the phone screen) */}
          <div
            className="px-4"
            style={{
              maxHeight: open ? 220 : 0,
              opacity: open ? 1 : 0,
              transition: "max-height 320ms ease, opacity 200ms ease",
              overflow: "hidden",
            }}
          >
            <div className="pb-4">
              <p className="text-[13px] leading-[1.45]" style={{ color: "rgba(232,236,255,.74)" }}>
                Scroll scrubbing is coming next: your app screen recording will play frame‑perfect as the user scrolls.
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[12px]" style={{ color: "rgba(232,236,255,.55)" }}>
                  No signup • under 90 seconds
                </div>
                <div className="flex items-center gap-2" style={{ color: "rgba(232,236,255,.55)" }}>
                  <div
                    className="h-[28px] w-[18px] rounded-full border"
                    style={{ borderColor: "rgba(255,255,255,.18)", position: "relative" }}
                    aria-hidden
                  >
                    <div
                      className="h-[5px] w-[5px] rounded-full"
                      style={{
                        background: "rgba(255,255,255,.65)",
                        position: "absolute",
                        left: "50%",
                        top: 6,
                        transform: "translateX(-50%)",
                        animation: "heroDot 1.6s ease-in-out infinite",
                      }}
                    />
                  </div>
                  <div className="text-[10px] tracking-[0.18em] uppercase">Scroll</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop overlay is handled in page.tsx; this component is for mobile-first. */}
      </div>
    </div>
  );
}
