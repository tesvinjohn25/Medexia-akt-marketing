"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AudioEqualizer } from "@/components/AudioEqualizer";

/**
 * The live product demo, embedded in the landing page.
 *
 * The demo always opens at the app's own /demo chooser so the visitor
 * decides between audio and questions inside the real product.
 *
 * Desktop: the demo runs inside a phone-frame mockup; the iframe mounts
 * only once the section has scrolled into view.
 *
 * Mobile: an animated launcher card opens a full-viewport overlay that
 * never leaves the landing page — Exit button and the browser back
 * button both return the visitor to where they were.
 *
 * Exit handling: the demo's own back button can navigate the iframe to
 * the marketing site. The moment the iframe lands on our origin it
 * becomes same-origin and readable, so onLoad we detect it and close
 * the overlay (mobile) or restart the demo (desktop). The overlay also
 * listens for an `akt-demo-exit` postMessage so the app can close it
 * directly when embedded.
 *
 * EMBED is the kill switch: if the app ever blocks framing, flip it to
 * false and both layouts fall back to launch links.
 */
const EMBED = true;

const DEMO_HOME = "https://app.medexia-akt.com/demo";
const APP_ORIGIN = "https://app.medexia-akt.com";

/** True when a cross-origin iframe has navigated back onto our own
 * origin (e.g. the demo's back button pointing at the marketing site). */
function iframeOnOurOrigin(frame: HTMLIFrameElement | null): boolean {
  try {
    const host = frame?.contentWindow?.location.hostname;
    return !!host && host === window.location.hostname;
  } catch {
    return false; // still cross-origin: still inside the demo
  }
}

export function LiveDemo() {
  const { ref, visible } = useScrollReveal();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [deskFrameKey, setDeskFrameKey] = useState(0);
  const deskFrameRef = useRef<HTMLIFrameElement>(null);
  const overlayFrameRef = useRef<HTMLIFrameElement>(null);
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
    // Let the app close the overlay itself when embedded.
    const onMessage = (e: MessageEvent) => {
      if (e.origin === APP_ORIGIN && e.data?.type === "akt-demo-exit") {
        closeOverlay();
      }
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    window.addEventListener("message", onMessage);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
      document.body.style.overflow = prevOverflow;
    };
  }, [overlayOpen, closeOverlay]);

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
            This is the live app, not a mock-up. Single-best-answer format like
            the real exam, aligned to NICE, CKS and the BNF, and regularly
            reviewed and updated.
          </p>
        </div>

        {/* ── Desktop: the demo runs right here, in a phone frame ── */}
        <div
          className="r-up mt-9 hidden lg:flex items-start justify-center gap-12"
          style={{ "--i": 3 } as React.CSSProperties}
        >
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
                key={deskFrameKey}
                ref={deskFrameRef}
                src={DEMO_HOME}
                title="AKT Navigator live demo"
                loading="lazy"
                allow="autoplay"
                onLoad={() => {
                  // Demo's back button navigated to the marketing site
                  // inside the frame — restart the demo instead.
                  if (iframeOnOurOrigin(deskFrameRef.current)) {
                    setDeskFrameKey((k) => k + 1);
                  }
                }}
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
                href={DEMO_HOME}
                className="flex items-center justify-center rounded-[34px] text-[14px] font-semibold"
                style={{
                  width: 360,
                  height: 700,
                  background: "#0b0d13",
                  color: "rgba(232,236,255,.7)",
                }}
              >
                Open the demo &rarr;
              </a>
            )}
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

        {/* ── Mobile: animated demo launcher ── */}
        <div
          className="r-up mt-8 lg:hidden"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          {EMBED ? (
            <button
              type="button"
              onClick={openOverlay}
              className="card-shimmer relative mx-auto flex w-full max-w-[340px] flex-col items-center gap-4 overflow-hidden rounded-[26px] px-6 py-9 text-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(28,23,45,.96), rgba(17,19,28,.9) 50%, rgba(12,14,22,.92))",
                border: "1px solid rgba(167,139,250,.4)",
                boxShadow:
                  "0 30px 90px rgba(109,106,232,.28), 0 0 44px rgba(155,107,255,.12)",
              }}
              aria-label="Start the live app demo"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-20 left-1/2 h-48 w-72 -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(155,107,255,.22), transparent 70%)",
                  filter: "blur(14px)",
                }}
              />
              <span className="demo-ring rounded-[20px]" aria-hidden>
                <Image
                  src="/app-icon.png"
                  alt=""
                  width={64}
                  height={64}
                  className="block rounded-[20px]"
                />
              </span>
              <span
                className="text-[20px] font-semibold leading-[1.2]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                }}
              >
                Step inside the app
              </span>
              <AudioEqualizer bars={5} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: "rgba(232,236,255,.6)" }}
              >
                Audio + 5 real questions &middot; 2 minutes
              </span>
              <span className="btn-primary mt-1 px-7 text-[14px]">
                Start the demo &rarr;
              </span>
            </button>
          ) : (
            <div className="flex justify-center">
              <a href={DEMO_HOME} className="btn-primary text-[14px]">
                Start the demo &rarr;
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
            className="flex items-center justify-between gap-3 px-4"
            style={{
              paddingTop: "max(env(safe-area-inset-top), 10px)",
              paddingBottom: 10,
              borderBottom: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <span className="flex items-center gap-2.5">
              <Image
                src="/app-icon.png"
                alt=""
                width={22}
                height={22}
                className="rounded-md"
              />
              <span
                className="text-[12px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "rgba(232,236,255,.75)" }}
              >
                Live demo
              </span>
            </span>
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
            ref={overlayFrameRef}
            src={DEMO_HOME}
            title="AKT Navigator live demo"
            allow="autoplay"
            onLoad={() => {
              // The demo's back button navigated the frame to the
              // marketing site — that means "I'm done": close the
              // overlay instead of showing the site inside itself.
              if (iframeOnOurOrigin(overlayFrameRef.current)) {
                closeOverlay();
              }
            }}
            className="block w-full flex-1"
            style={{ border: 0, background: "#0b0d13" }}
          />
        </div>
      )}
    </section>
  );
}
