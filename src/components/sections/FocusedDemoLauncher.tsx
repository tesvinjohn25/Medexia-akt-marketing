"use client";

import { useState } from "react";
import Image from "next/image";
import { AudioEqualizer } from "@/components/AudioEqualizer";
import { useTrackedAppUrl } from "@/components/marketing/TrackedAppLink";
import { useDemoOverlay } from "@/hooks/useDemoOverlay";
import { trackLandingEvent } from "@/lib/marketing/events";
import {
  appHandoffEventHref,
  buildAppUrl,
} from "@/lib/marketing/url";

type FocusedDemoLauncherProps = {
  demoPath: "/demo/audio" | "/demo/sample-question";
  kind: "audio" | "questions";
};

const content = {
  audio: {
    ariaLabel: "Play audio demo",
    dialogLabel: "AKT Navigator audio demo",
    kicker: "A real chapter · no signup",
    title: "Hear how AKT audio revision feels.",
    detail: "Opens directly in the focused audio player.",
    action: "Play audio demo",
  },
  questions: {
    ariaLabel: "Start 5-question demo",
    dialogLabel: "AKT Navigator five-question demo",
    kicker: "5 AKT-style questions · no signup",
    title: "Answer the first question now.",
    detail: "Opens directly in the focused question flow.",
    action: "Start 5-question demo",
  },
} as const;

export function FocusedDemoLauncher({
  demoPath,
  kind,
}: FocusedDemoLauncherProps) {
  const demoUrl = useTrackedAppUrl(demoPath, { intent: "demo" });
  const [launchUrl, setLaunchUrl] = useState<string | null>(null);
  const {
    closeOverlay,
    dialogRef,
    frameRef,
    handleFrameLoad,
    openOverlay,
    overlayOpen,
    triggerRef,
  } = useDemoOverlay();
  const copy = content[kind];
  const isAudio = kind === "audio";
  const handleOpen = () => {
    const latestDemoUrl = buildAppUrl(demoPath, { intent: "demo" });
    setLaunchUrl(latestDemoUrl);
    trackLandingEvent("app_handoff_started", {
      href: appHandoffEventHref(latestDemoUrl),
      intent: "demo",
      offer_id: null,
    });
    openOverlay();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="card-shimmer group relative mx-auto flex w-full max-w-[390px] flex-col items-center overflow-hidden rounded-[28px] px-6 py-8 text-center transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 md:px-8 md:py-10"
        style={{
          background: isAudio
            ? "linear-gradient(155deg, rgba(41,19,48,.98), rgba(20,18,31,.96) 48%, rgba(11,13,21,.98))"
            : "linear-gradient(155deg, rgba(13,38,34,.98), rgba(18,22,31,.96) 48%, rgba(11,13,21,.98))",
          border: `1px solid ${
            isAudio ? "rgba(236,72,153,.38)" : "rgba(52,211,153,.34)"
          }`,
          boxShadow: isAudio
            ? "0 34px 100px rgba(135,49,122,.26), 0 0 55px rgba(155,107,255,.13)"
            : "0 34px 100px rgba(24,116,91,.22), 0 0 55px rgba(109,106,232,.12)",
        }}
        aria-label={copy.ariaLabel}
        data-focused-demo-launcher={kind}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-80 -translate-x-1/2"
          style={{
            background: `radial-gradient(closest-side, ${
              isAudio ? "rgba(236,72,153,.24)" : "rgba(52,211,153,.20)"
            }, transparent 72%)`,
            filter: "blur(16px)",
          }}
        />

        <span className="demo-ring relative rounded-[20px]" aria-hidden>
          <Image
            src="/app-icon.png"
            alt=""
            width={68}
            height={68}
            className="block rounded-[20px]"
          />
        </span>

        <span
          className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.17em]"
          style={{
            color: isAudio
              ? "rgba(251,182,226,.85)"
              : "rgba(167,243,208,.82)",
          }}
        >
          {copy.kicker}
        </span>
        <span
          className="relative mt-2 text-[23px] font-semibold leading-[1.15] md:text-[25px]"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.025em",
          }}
        >
          {copy.title}
        </span>

        {isAudio ? (
          <AudioEqualizer bars={7} className="relative mt-5" />
        ) : (
          <span
            className="relative mt-5 flex items-center gap-2"
            aria-hidden
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="h-1.5 rounded-full"
                style={{
                  width: index === 0 ? 24 : 8,
                  background:
                    index === 0
                      ? "rgba(52,211,153,.95)"
                      : "rgba(232,236,255,.22)",
                }}
              />
            ))}
          </span>
        )}

        <span
          className="relative mt-5 text-[12px] leading-[1.5]"
          style={{ color: "rgba(232,236,255,.62)" }}
        >
          {copy.detail}
        </span>
        <span
          className="btn-primary relative mt-5 min-h-12 px-9 text-[16px]"
          data-focused-demo-primary-action={kind}
        >
          {copy.action} &rarr;
        </span>
      </button>

      {overlayOpen ? (
        <div
          className="demo-overlay fixed inset-0 z-[100] flex items-stretch justify-center bg-black/90 sm:items-center sm:p-5"
          style={{ overscrollBehavior: "contain" }}
          role="dialog"
          aria-modal="true"
          aria-label={copy.dialogLabel}
          data-focused-demo-overlay={kind}
        >
          <button
            type="button"
            className="absolute inset-0 hidden cursor-default sm:block"
            onClick={closeOverlay}
            aria-label="Close demo"
            tabIndex={-1}
          />
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative z-[1] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#06070b] sm:h-[min(820px,calc(100dvh-40px))] sm:w-[min(410px,calc(100vw-40px))] sm:rounded-[36px]"
            style={{
              border: "1px solid rgba(255,255,255,.14)",
              boxShadow:
                "0 55px 160px rgba(0,0,0,.72), 0 0 80px rgba(109,106,232,.16)",
            }}
          >
            <div
              className="flex items-center justify-between gap-3 px-4"
              style={{
                paddingTop: "max(env(safe-area-inset-top), 10px)",
                paddingBottom: 10,
                borderBottom: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Image
                  src="/app-icon.png"
                  alt=""
                  width={24}
                  height={24}
                  className="shrink-0 rounded-md"
                />
                <span
                  className="truncate text-[11px] font-bold uppercase tracking-[0.13em]"
                  style={{ color: "rgba(232,236,255,.72)" }}
                >
                  {isAudio ? "Audio demo" : "5-question demo"}
                </span>
              </span>
              <button
                type="button"
                onClick={closeOverlay}
                data-demo-exit
                className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold"
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
            <iframe
              ref={frameRef}
              src={launchUrl ?? demoUrl}
              title={copy.dialogLabel}
              allow={isAudio ? "autoplay" : undefined}
              onLoad={handleFrameLoad}
              className="block w-full flex-1"
              style={{ border: 0, background: "#0b0d13" }}
            />
            <span
              tabIndex={0}
              aria-hidden="true"
              data-demo-focus-guard
              className="sr-only"
              onFocus={() => {
                dialogRef.current
                  ?.querySelector<HTMLButtonElement>("[data-demo-exit]")
                  ?.focus();
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
