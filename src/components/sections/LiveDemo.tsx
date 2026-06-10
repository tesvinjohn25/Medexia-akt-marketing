"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * The live product demo, embedded in the landing page.
 *
 * Desktop: the real app's no-login demo runs inside a phone-frame
 * mockup, with a toggle between the audio demo (the USP, default) and
 * the 5-question demo. The iframe mounts only once the section has
 * scrolled into view so the app bundle never loads for visitors who
 * don't reach it.
 *
 * Mobile: an immersive in-page demo mode. Tapping the preview opens a
 * full-viewport overlay (still on the landing page) containing the
 * demo, with a toggle and an Exit button that returns the visitor to
 * exactly where they were. The browser back button also exits the
 * overlay rather than leaving the site.
 *
 * EMBED is the kill switch: if the app ever blocks framing, flip it to
 * false and both layouts fall back to launch links.
 */
const EMBED = true;

const DEMO_HOME = "https://app.medexia-akt.com/demo";
const DEMO_URLS = {
  audio: "https://app.medexia-akt.com/demo/audiobook/player",
  questions: "https://app.medexia-akt.com/demo/questions",
} as const;

type DemoMode = keyof typeof DEMO_URLS;

function ModeToggle({
  mode,
  onChange,
  className = "",
}: {
  mode: DemoMode;
  onChange: (m: DemoMode) => void;
  className?: string;
}) {
  const tabs: { id: DemoMode; label: string }[] = [
    { id: "audio", label: "Audio demo" },
    { id: "questions", label: "Questions" },
  ];
  return (
    <div
      role="tablist"
      aria-label="Choose a demo"
      className={`inline-flex rounded-full p-1 ${className}`}
      style={{
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.10)",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={mode === t.id}
          onClick={() => onChange(t.id)}
          className="rounded-full px-4 py-[7px] text-[12px] font-semibold transition-colors"
          style={
            mode === t.id
              ? {
                  background:
                    "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))",
                  color: "#fff",
                }
              : { color: "rgba(232,236,255,.6)" }
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function LiveDemo() {
  const { ref, visible } = useScrollReveal();
  const [mode, setMode] = useState<DemoMode>("audio");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const overlayPushed = useRef(false);

  // Mobile overlay: lock the page behind it and make the browser back
  // button exit the demo instead of leaving the site.
  const closeOverlay = useCallback(() => {
    if (overlayPushed.current) {
      overlayPushed.current = false;
      window.history.back();
    } else {
      setOverlayOpen(false);
    }
  }, []);

  const openOverlay = useCallback(() => {
    window.history.pushState({ aktDemo: true }, "");
    overlayPushed.current = true;
    setOverlayOpen(true);
  }, []);

  useEffect(() => {
    if (!overlayOpen) return;

    const onPop = () => {
      overlayPushed.current = false;
      setOverlayOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [overlayOpen, closeOverlay]);

  const claims =
    "Single-best-answer format like the real exam, aligned to NICE, CKS and the BNF, and regularly reviewed and updated.";

  return (
    <section
      id="try-the-app"
      className="section-padding relative scroll-mt-[92px] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-10 h-[420px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side at 50% 30%, rgba(236,72,153,.10), transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <div
        ref={ref}
        className={`container-x relative reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-[720px] text-center">
          <div
            className="r-blur text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(52,211,153,.85)", "--i": 0 } as React.CSSProperties}
          >
            Try it now &middot; No signup
          </div>
          <h2
            className="r-up mt-3 text-[28px] md:text-[40px] leading-[1.08]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.035em",
              "--i": 1,
            } as React.CSSProperties}
          >
            Hear it. Then sit five real questions.
          </h2>
          <p
            className="r-up mx-auto mt-3 max-w-[560px] text-[14px] md:text-[16px] leading-[1.65]"
            style={{ color: "rgba(232,236,255,.62)", "--i": 2 } as React.CSSProperties}
          >
            This is the live app, not a mock-up. {claims}
          </p>
        </div>

        {/* ── Desktop: the demo runs right here, in a phone frame ── */}
        <div
          className="r-up mt-9 hidden lg:flex items-start justify-center gap-12"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <div className="flex flex-col items-center gap-4">
            <ModeToggle mode={mode} onChange={setMode} />
            <div
              className="overflow-hidden rounded-[44px] p-[10px]"
              style={{
                background: "#06070b",
                border: "1px solid rgba(255,255,255,.14)",
                boxShadow:
                  "0 50px 140px rgba(0,0,0,.55), 0 0 60px rgba(155,107,255,.12)",
              }}
            >
              {EMBED && visible ? (
                <iframe
                  key={mode}
                  src={DEMO_URLS[mode]}
                  title={
                    mode === "audio"
                      ? "AKT Navigator audio demo"
                      : "AKT Navigator question demo"
                  }
                  loading="lazy"
                  allow="autoplay"
                  className="block rounded-[34px]"
                  style={{
                    width: 360,
                    height: 700,
                    border: 0,
                    background: "#0b0d13",
                  }}
                />
              ) : (
                <a
                  href={DEMO_URLS[mode]}
                  className="flex items-center justify-center rounded-[34px] text-[14px] font-semibold"
                  style={{
                    width: 360,
                    height: 700,
                    background: "#0b0d13",
                    color: "rgba(232,236,255,.7)",
                  }}
                >
                  Open the {mode === "audio" ? "audio" : "question"} demo &rarr;
                </a>
              )}
            </div>
          </div>

          <div className="max-w-[330px] pt-16">
            <ul className="space-y-5">
              <li>
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "rgba(236,72,153,.85)" }}
                >
                  Audio demo
                </div>
                <p
                  className="mt-1.5 text-[14px] leading-[1.6]"
                  style={{ color: "rgba(232,236,255,.68)" }}
                >
                  A real narrated sample from the 90+ hour library &mdash; the
                  exact voice and depth you&rsquo;d revise with on a commute.
                </p>
              </li>
              <li>
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "rgba(167,139,250,.85)" }}
                >
                  Question demo
                </div>
                <p
                  className="mt-1.5 text-[14px] leading-[1.6]"
                  style={{ color: "rgba(232,236,255,.68)" }}
                >
                  Five real AKT-style questions. Answer each one, then see the
                  structured explanation &mdash; understanding the question,
                  key points for your AKT, and why the other options are
                  wrong &mdash; before your results.
                </p>
              </li>
            </ul>
            <a
              href={DEMO_HOME}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-block text-[13px] font-semibold transition-colors hover:text-white"
              style={{ color: "rgba(197,170,255,.9)" }}
            >
              Open full screen &rarr;
            </a>
          </div>
        </div>

        {/* ── Mobile: immersive in-page demo mode ── */}
        <div
          className="r-up mt-8 lg:hidden"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => {
              if (EMBED) openOverlay();
              else window.location.href = DEMO_HOME;
            }}
            className="relative mx-auto block w-[min(78vw,300px)] overflow-hidden rounded-[34px] text-left"
            style={{
              border: "1px solid rgba(255,255,255,.14)",
              boxShadow:
                "0 30px 90px rgba(0,0,0,.5), 0 0 44px rgba(155,107,255,.14)",
            }}
            aria-label="Open the live demo"
          >
            <Image
              src="/appshots/02-audio-1206x2622.png"
              alt="Preview of the AKT Navigator audio library"
              width={1206}
              height={2622}
              sizes="78vw"
              className="block h-auto w-full"
            />
            <span
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,7,11,.30), rgba(6,7,11,.72))",
              }}
            >
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-iris), var(--brand-violet))",
                  boxShadow: "0 12px 40px rgba(109,106,232,.55)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  aria-hidden
                  style={{ marginLeft: 3 }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-[15px] font-semibold text-white">
                Try the live demo
              </span>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "rgba(232,236,255,.72)" }}
              >
                Audio + 5 real questions
              </span>
            </span>
          </button>
          {!EMBED && (
            <div className="mt-4 flex justify-center gap-3">
              <a href={DEMO_URLS.audio} className="btn-primary text-[13px]">
                Audio demo
              </a>
              <a
                href={DEMO_URLS.questions}
                className="rounded-[14px] px-4 py-3 text-[13px] font-semibold"
                style={{
                  color: "var(--fg-high)",
                  background: "rgba(255,255,255,.045)",
                  border: "1px solid rgba(255,255,255,.10)",
                }}
              >
                Question demo
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Full-viewport demo overlay (mobile). Lives on the landing page —
          exiting drops the visitor back exactly where they were. */}
      {overlayOpen && (
        <div
          className="demo-overlay fixed inset-0 z-[100] flex flex-col lg:hidden"
          style={{ background: "#06070b", overscrollBehavior: "contain" }}
          role="dialog"
          aria-modal="true"
          aria-label="AKT Navigator live demo"
        >
          <div
            className="flex items-center justify-between gap-3 px-3"
            style={{
              paddingTop: "max(env(safe-area-inset-top), 10px)",
              paddingBottom: 10,
              borderBottom: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <ModeToggle mode={mode} onChange={setMode} />
            <button
              type="button"
              onClick={closeOverlay}
              className="flex items-center gap-1.5 rounded-full px-4 py-[8px] text-[13px] font-semibold"
              style={{
                color: "rgba(232,236,255,.9)",
                background: "rgba(255,255,255,.07)",
                border: "1px solid rgba(255,255,255,.14)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              Exit demo
            </button>
          </div>
          <iframe
            key={mode}
            src={DEMO_URLS[mode]}
            title={
              mode === "audio"
                ? "AKT Navigator audio demo"
                : "AKT Navigator question demo"
            }
            allow="autoplay"
            className="block w-full flex-1"
            style={{ border: 0, background: "#0b0d13" }}
          />
        </div>
      )}
    </section>
  );
}
