"use client";

import React from "react";
import { HeroFrames } from "@/components/HeroFrames";
import { HeroNarration } from "@/components/HeroNarration";
import { AppDemoSection } from "@/components/sections/AppDemoSection";
import { PriceAnchor } from "@/components/sections/PriceAnchor";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

const DEMO_URL = "https://app.medexia-akt.com/demo";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Home() {
  const [heroProgress, setHeroProgress] = React.useState(0);

  // Hero narration fades out as hero animation completes
  const heroNarrationOpacity = clamp(1 - Math.max(0, heroProgress - 0.85) / 0.12, 0, 1);

  const showScrollIndicator = heroProgress < 0.1;

  return (
    <main>
      <style jsx global>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(16px); opacity: 0.3; }
        }
      `}</style>

      {/* HERO (180vh scroll animation) */}
      <section className="relative">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <HeroFrames onProgress={setHeroProgress}>
          {/* Subtle global scrim */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 700px at 16% 70%, rgba(5,6,10,.62), rgba(5,6,10,0) 58%)",
            }}
          />

          {/* Hero narration — fades out as hero animation finishes */}
          <div
            style={{
              opacity: heroNarrationOpacity,
              pointerEvents: heroNarrationOpacity < 0.1 ? "none" : "auto",
            }}
          >
            <HeroNarration progress={heroProgress} demoUrl={DEMO_URL} />
          </div>

          {/* Scroll indicator — visible at start */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            style={{
              opacity: showScrollIndicator ? 1 : 0,
              transition: "opacity 400ms ease",
            }}
          >
            <span
              className="text-[11px] tracking-[0.18em] uppercase font-medium"
              style={{ color: "rgba(255,255,255,.55)" }}
            >
              Scroll to explore
            </span>
            <div
              className="h-12 w-7 rounded-full border-2 flex items-start justify-center pt-2"
              style={{ borderColor: "rgba(255,255,255,.25)" }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  background: "rgba(255,255,255,.7)",
                  animation: "scrollBounce 1.8s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </HeroFrames>
      </section>

      {/* APP DEMO */}
      <AppDemoSection />

      {/* LANDING PAGE SECTIONS */}
      <PriceAnchor />
      <FeatureHighlights />
      <PricingTiers />
      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
