"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { TrackedAppLink, useTrackedAppUrl } from "@/components/marketing/TrackedAppLink";
import { canUseAnalytics } from "@/lib/consent/consent";
import { initMarketingAttribution } from "@/lib/marketing/attribution";
import { trackLandingEvent } from "@/lib/marketing/events";
import { getAppOrigin } from "@/lib/marketing/url";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const EMBED = true;
const DEMO_QUESTIONS = "/demo/questions";
const APP_ORIGIN = getAppOrigin();

const desktopNotes = [
  {
    title: "Free question flow",
    body: "Answer AKT-style SBAs in the same practice environment you use after signup.",
  },
  {
    title: "Structured explanations",
    body: "See the key clue, examiner trap, near-miss answer and why the other options are wrong.",
  },
  {
    title: "No card required",
    body: "Start free practice without paying. Full audio is optional.",
  },
] as const;

function iframeOnOurOrigin(frame: HTMLIFrameElement | null): boolean {
  try {
    const host = frame?.contentWindow?.location.hostname;
    return !!host && host === window.location.hostname;
  } catch {
    return false;
  }
}

function canFrameAppDemoOnHost(hostname: string): boolean {
  return hostname === "medexia-akt.com" || hostname === "www.medexia-akt.com";
}

function trackDemoEvent(eventName: string, properties: Record<string, unknown>) {
  if (!canUseAnalytics()) return;
  initMarketingAttribution();
  trackLandingEvent(eventName, properties);
}

export function FreeQuestionsLiveDemo() {
  const { ref, visible } = useScrollReveal();
  const demoUrl = useTrackedAppUrl(DEMO_QUESTIONS, { intent: "demo" });
  const [appFrameAllowed, setAppFrameAllowed] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [deskFrameKey, setDeskFrameKey] = useState(0);
  const [deskFrameLoaded, setDeskFrameLoaded] = useState(false);
  const [overlayFrameLoaded, setOverlayFrameLoaded] = useState(false);
  const deskFrameRef = useRef<HTMLIFrameElement>(null);
  const overlayFrameRef = useRef<HTMLIFrameElement>(null);
  const overlayPushed = useRef(false);
  const viewedRef = useRef(false);
  const shouldEmbedApp = EMBED && appFrameAllowed;

  useEffect(() => {
    setAppFrameAllowed(canFrameAppDemoOnHost(window.location.hostname));
  }, []);

  useEffect(() => {
    if (!visible || viewedRef.current) return;
    trackDemoEvent("free_akt_questions_demo_viewed", {
      page: "free_akt_questions",
      placement: "live_demo",
      demo_path: DEMO_QUESTIONS,
    });
    viewedRef.current = true;
  }, [visible]);

  const closeOverlay = useCallback(() => {
    if (overlayPushed.current) {
      overlayPushed.current = false;
      window.history.back();
    } else {
      setOverlayOpen(false);
    }
  }, []);

  const openOverlay = useCallback(() => {
    trackDemoEvent("free_akt_questions_demo_opened", {
      page: "free_akt_questions",
      placement: "mobile_launcher",
      demo_path: DEMO_QUESTIONS,
    });
    window.history.pushState({ aktFreeQuestionsDemo: true }, "");
    overlayPushed.current = true;
    setOverlayFrameLoaded(false);
    setOverlayOpen(true);
  }, []);

  useEffect(() => {
    if (!overlayOpen) return;

    const onPop = () => {
      overlayPushed.current = false;
      setOverlayOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOverlay();
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin === APP_ORIGIN && event.data?.type === "akt-demo-exit") {
        closeOverlay();
      }
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    window.addEventListener("message", onMessage);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
      document.body.style.overflow = previousOverflow;
    };
  }, [overlayOpen, closeOverlay]);

  return (
    <section
      id="free-question-demo"
      className="section-padding relative overflow-hidden pt-0"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-6 h-[420px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(closest-side at 52% 28%, rgba(52,211,153,.10), transparent 72%)",
          filter: "blur(24px)",
        }}
      />

      <div
        ref={ref}
        className={`container-x relative reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div className="grid gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
          <div className="max-w-[620px]">
            <div
              className="r-blur text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(52,211,153,.85)", "--i": 0 } as CSSProperties}
            >
              Try free practice
            </div>
            <h2
              className="r-up mt-3 text-[28px] leading-[1.1] md:text-[40px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
                "--i": 1,
              } as CSSProperties}
            >
              Sit five AKT-style questions inside the app.
            </h2>
            <p
              className="r-up mt-4 max-w-[580px] text-[15px] leading-[1.7] md:text-[16px]"
              style={{ color: "rgba(232,236,255,.66)", "--i": 2 } as CSSProperties}
            >
              This is the real AKT Navigator question flow: answer the SBA, see
              the structured explanation, then review the clue, trap and why
              the other options fail.
            </p>

            <div
              className="r-up mt-6 hidden gap-5 lg:grid"
              style={{ "--i": 3 } as CSSProperties}
            >
              {desktopNotes.map((note, index) => (
                <div
                  key={note.title}
                  className="grid grid-cols-[34px_1fr] gap-3 border-t border-white/[.08] pt-4"
                >
                  <span
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[11px] font-bold"
                    style={{
                      color:
                        index === 0
                          ? "rgba(52,211,153,.9)"
                          : "rgba(197,170,255,.88)",
                      background: "rgba(255,255,255,.045)",
                      border: "1px solid rgba(255,255,255,.08)",
                    }}
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3
                      className="text-[14px] font-semibold leading-[1.25]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {note.title}
                    </h3>
                    <p
                      className="mt-1 text-[13px] leading-[1.65]"
                      style={{ color: "rgba(232,236,255,.62)" }}
                    >
                      {note.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <TrackedAppLink
              href={DEMO_QUESTIONS}
              intent="demo"
              target="_blank"
              rel="noopener"
              className="r-up mt-6 hidden text-[13px] font-semibold transition-colors hover:text-white lg:inline-block"
              style={{ color: "rgba(197,170,255,.9)", "--i": 4 } as CSSProperties}
              extraTrackingEvents={[
                {
                  eventName: "free_akt_questions_demo_fullscreen_clicked",
                  properties: {
                    page: "free_akt_questions",
                    placement: "desktop_demo",
                    demo_path: DEMO_QUESTIONS,
                  },
                },
              ]}
            >
              Open full screen &rarr;
            </TrackedAppLink>
          </div>

          <div
            className="r-up hidden justify-center lg:flex"
            style={{ "--i": 4 } as CSSProperties}
          >
            <div
              className="relative overflow-hidden rounded-[44px] p-[10px]"
              style={{
                background: "#06070b",
                border: "1px solid rgba(255,255,255,.14)",
                boxShadow:
                  "0 50px 140px rgba(0,0,0,.58), 0 0 70px rgba(52,211,153,.10)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-10 top-0 h-16"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(52,211,153,.20), transparent 72%)",
                  filter: "blur(18px)",
                }}
              />
              {shouldEmbedApp && visible ? (
                <div className="relative rounded-[34px]" style={{ width: 360, height: 700 }}>
                  <iframe
                    key={deskFrameKey}
                    ref={deskFrameRef}
                    src={demoUrl}
                    title="AKT Navigator free question demo"
                    loading="lazy"
                    onLoad={() => {
                      if (iframeOnOurOrigin(deskFrameRef.current)) {
                        setDeskFrameLoaded(false);
                        setDeskFrameKey((key) => key + 1);
                      } else {
                        setDeskFrameLoaded(true);
                      }
                    }}
                    className="relative block rounded-[34px]"
                    style={{
                      width: 360,
                      height: 700,
                      border: 0,
                      background: "#0b0d13",
                      opacity: deskFrameLoaded ? 1 : 0,
                      transition: "opacity .2s ease",
                    }}
                  />
                  {!deskFrameLoaded ? (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center rounded-[34px] px-8 text-center"
                      style={{
                        background:
                          "linear-gradient(160deg, rgba(11,13,19,.98), rgba(19,24,31,.96))",
                      }}
                    >
                      <Image
                        src="/app-icon.png"
                        alt=""
                        width={54}
                        height={54}
                        className="rounded-[18px]"
                      />
                      <p
                        className="mt-5 text-[18px] font-semibold leading-[1.2]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Free question demo
                      </p>
                      <p
                        className="mt-2 text-[13px] leading-[1.6]"
                        style={{ color: "rgba(232,236,255,.62)" }}
                      >
                        If the embedded demo does not appear here, open the
                        same question flow full screen.
                      </p>
                      <TrackedAppLink
                        href={DEMO_QUESTIONS}
                        intent="demo"
                        target="_blank"
                        rel="noopener"
                        className="btn-primary mt-5 text-[13px]"
                        extraTrackingEvents={[
                          {
                            eventName: "free_akt_questions_demo_fullscreen_clicked",
                            properties: {
                              page: "free_akt_questions",
                              placement: "desktop_frame_fallback",
                              demo_path: DEMO_QUESTIONS,
                            },
                          },
                        ]}
                      >
                        Open full screen &rarr;
                      </TrackedAppLink>
                    </div>
                  ) : null}
                </div>
              ) : (
                <TrackedAppLink
                  href={DEMO_QUESTIONS}
                  intent="demo"
                  className="relative flex items-center justify-center rounded-[34px] text-[14px] font-semibold"
                  style={{
                    width: 360,
                    height: 700,
                    background: "#0b0d13",
                    color: "rgba(232,236,255,.7)",
                  }}
                  target="_blank"
                  rel="noopener"
                  extraTrackingEvents={[
                    {
                      eventName: "free_akt_questions_demo_fullscreen_clicked",
                      properties: {
                        page: "free_akt_questions",
                        placement: "desktop_frame_fallback",
                        demo_path: DEMO_QUESTIONS,
                      },
                    },
                  ]}
                >
                  <span className="flex flex-col items-center px-8 text-center">
                    <Image
                      src="/app-icon.png"
                      alt=""
                      width={54}
                      height={54}
                      className="rounded-[18px]"
                    />
                    <span
                      className="mt-5 text-[18px] font-semibold leading-[1.2]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Free question demo
                    </span>
                    <span
                      className="mt-2 text-[13px] leading-[1.6]"
                      style={{ color: "rgba(232,236,255,.62)" }}
                    >
                      Open the same question flow full screen.
                    </span>
                    <span className="btn-primary mt-5 text-[13px]">
                      Open full screen &rarr;
                    </span>
                  </span>
                </TrackedAppLink>
              )}
            </div>
          </div>

          <div
            className="r-up lg:hidden"
            style={{ "--i": 3 } as CSSProperties}
          >
            {EMBED ? (
              <button
                type="button"
                onClick={openOverlay}
                className="card-shimmer relative mx-auto flex w-full max-w-[340px] flex-col items-center gap-4 overflow-hidden rounded-[26px] px-6 py-9 text-center"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(17,30,28,.96), rgba(17,19,28,.92) 50%, rgba(12,14,22,.94))",
                  border: "1px solid rgba(52,211,153,.28)",
                  boxShadow:
                    "0 30px 90px rgba(52,211,153,.16), 0 0 44px rgba(155,107,255,.10)",
                }}
                aria-label="Start the free AKT question demo"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-20 left-1/2 h-48 w-72 -translate-x-1/2"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(52,211,153,.20), transparent 70%)",
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
                  Step inside free practice
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "rgba(232,236,255,.6)" }}
                >
                  5 AKT-style questions &middot; 2 minutes
                </span>
                <span className="btn-primary mt-1 px-7 text-[14px]">
                  Start the demo &rarr;
                </span>
              </button>
            ) : (
              <div className="flex justify-center">
                <TrackedAppLink
                  href={DEMO_QUESTIONS}
                  intent="demo"
                  className="btn-primary text-[14px]"
                  extraTrackingEvents={[
                    {
                      eventName: "free_akt_questions_demo_opened",
                      properties: {
                        page: "free_akt_questions",
                        placement: "mobile_fallback",
                        demo_path: DEMO_QUESTIONS,
                      },
                    },
                  ]}
                >
                  Start the demo &rarr;
                </TrackedAppLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {overlayOpen && (
        <div
          className="demo-overlay fixed inset-0 z-[100] flex flex-col lg:hidden"
          style={{ background: "#06070b", overscrollBehavior: "contain" }}
          role="dialog"
          aria-modal="true"
          aria-label="AKT Navigator free question demo"
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
                Free question demo
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
              <span aria-hidden>&times;</span>
              Exit demo
            </button>
          </div>
          {shouldEmbedApp ? (
            <iframe
              ref={overlayFrameRef}
              src={demoUrl}
              title="AKT Navigator free question demo"
              onLoad={() => {
                if (iframeOnOurOrigin(overlayFrameRef.current)) {
                  closeOverlay();
                } else {
                  setOverlayFrameLoaded(true);
                }
              }}
              className="block w-full flex-1"
              style={{
                border: 0,
                background: "#0b0d13",
                opacity: overlayFrameLoaded ? 1 : 0,
                transition: "opacity .2s ease",
              }}
            />
          ) : null}
          {!shouldEmbedApp || !overlayFrameLoaded ? (
            <div
              className="absolute inset-x-0 bottom-0 top-[54px] flex flex-col items-center justify-center px-8 text-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(6,7,11,.98), rgba(17,24,28,.96))",
              }}
            >
              <Image
                src="/app-icon.png"
                alt=""
                width={58}
                height={58}
                className="rounded-[18px]"
              />
              <p
                className="mt-5 text-[20px] font-semibold leading-[1.2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Free question demo
              </p>
              <p
                className="mt-2 max-w-[260px] text-[13px] leading-[1.6]"
                style={{ color: "rgba(232,236,255,.62)" }}
              >
                If the embedded demo does not appear here, launch the same
                question flow in a new tab.
              </p>
              <TrackedAppLink
                href={DEMO_QUESTIONS}
                intent="demo"
                target="_blank"
                rel="noopener"
                className="btn-primary mt-5 text-[13px]"
                extraTrackingEvents={[
                  {
                    eventName: "free_akt_questions_demo_fullscreen_clicked",
                    properties: {
                      page: "free_akt_questions",
                      placement: "mobile_overlay_fallback",
                      demo_path: DEMO_QUESTIONS,
                    },
                  },
                ]}
              >
                Open full screen &rarr;
              </TrackedAppLink>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
