"use client";

import React from "react";
import Image from "next/image";
import { HeroFrames } from "@/components/HeroFrames";
import { HeroNarration } from "@/components/HeroNarration";
import { PhoneScreenDemo } from "@/components/PhoneScreenDemo";

const DEMO_URL = "https://medexia-akt.com/demo";
const LOGIN_URL = "https://app.medexia-akt.com";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 overflow-hidden rounded-2xl border"
        style={{
          borderColor: "rgba(255,255,255,.10)",
          boxShadow: "0 18px 45px rgba(0,0,0,.45)",
        }}
      >
        <Image src="/logo.jpg" alt="Medexia" width={80} height={80} />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold" style={{ letterSpacing: "-0.01em" }}>
          Medexia
        </div>
        <div className="text-xs faint">AKT Navigator</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [p, setP] = React.useState(0);
  const [t, setT] = React.useState<{ x: number; y: number; s: number } | null>(null);

  return (
    <main>
      {/* HERO (locked scrolly) */}
      <section className="relative">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <HeroFrames onProgress={setP} onTransform={setT}>
          {/* Subtle global scrim (keep the phone visible) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 700px at 16% 70%, rgba(5,6,10,.62), rgba(5,6,10,0) 58%)",
            }}
          />

          {/* Desktop overlay (left aligned, copy updated) */}
          <div className="hidden md:block">
            <div className="container-x relative flex h-full items-center">
              <div
                className="pointer-events-auto max-w-[58ch] rounded-[28px] border px-7 py-7"
                style={{
                  background: "rgba(6,7,12,.55)",
                  borderColor: "rgba(255,255,255,.10)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 30px 90px rgba(0,0,0,.55)",
                }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <Logo />
                  <a className="btn-secondary text-sm" href={DEMO_URL} style={{ padding: "10px 12px" }}>
                    Start now
                  </a>
                </div>

                <div className="faint text-xs tracking-[0.16em] uppercase">
                  For busy UK GP trainees
                </div>
                <h1
                  className="mt-3 text-[60px] leading-[1.03]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.04em",
                    textShadow: "0 18px 60px rgba(0,0,0,.65)",
                  }}
                >
                  Feel the difference
                  <br />
                  <span style={{ color: "var(--brand-violet-light)" }}>in 5 questions.</span>
                </h1>
                <p className="mt-4 text-[16px] leading-[1.65]" style={{ color: "rgba(232,236,255,.78)" }}>
                  No signup. Short, brutal AKT SBA sessions — with explanations that actually stick.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a className="btn-primary" href={DEMO_URL}>
                    Start now
                  </a>
                  <a className="btn-secondary" href={DEMO_URL}>
                    Try the 5‑question demo
                  </a>
                </div>

                <div className="mt-5 text-sm" style={{ color: "rgba(232,236,255,.62)" }}>
                  Scroll to scrub the motion.
                </div>
              </div>
            </div>
          </div>

          {/* Phone screen demo video (prototype). Later this becomes scroll-scrubbed frames. */}
          <PhoneScreenDemo progress={p} demoUrl="/demo/video/app-demo.mp4" transform={t} />

          {/* Mobile narration + CTA */}
          <div className="md:hidden">
            <HeroNarration progress={p} demoUrl={DEMO_URL} />
          </div>
        </HeroFrames>
      </section>

      {/* (Next section will be the scroll‑scrubbed app walkthrough.) */}
    </main>
  );
}
