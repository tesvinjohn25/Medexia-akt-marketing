"use client";

import React from "react";
import { HeroFrames } from "@/components/HeroFrames";
import { HeroNarration } from "@/components/HeroNarration";
import { PhoneVideoDemo } from "@/components/PhoneVideoDemo";
import { VideoTextOverlays } from "@/components/VideoTextOverlays";
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
  const [transform, setTransform] = React.useState<{ x: number; y: number; s: number } | null>(null);
  const [videoPhase, setVideoPhase] = React.useState(false);
  const [videoTime, setVideoTime] = React.useState(0);

  // Seek function provided by PhoneVideoDemo
  const seekRef = React.useRef<(time: number) => void>(() => {});

  // Hero narration fades out as hero animation completes
  const heroNarrationOpacity = clamp(1 - Math.max(0, heroProgress - 0.85) / 0.12, 0, 1);

  const handleTimeUpdate = React.useCallback((currentTime: number, _duration: number) => {
    setVideoTime(currentTime);
  }, []);

  const handleSeekReady = React.useCallback((fn: (time: number) => void) => {
    seekRef.current = fn;
  }, []);

  const handleSeekTo = React.useCallback((time: number) => {
    seekRef.current(time);
  }, []);

  return (
    <main>
      {/* HERO + VIDEO (230vh total: 180vh animation + 50vh video phase) */}
      <section className="relative">
        <div className="hero-mesh" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <HeroFrames
          onProgress={setHeroProgress}
          onVideoPhase={setVideoPhase}
          onTransform={setTransform}
        >
          {/* Subtle global scrim */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 700px at 16% 70%, rgba(5,6,10,.62), rgba(5,6,10,0) 58%)",
            }}
          />

          {/* Video playing inside phone bezel */}
          <PhoneVideoDemo
            transform={transform}
            visible={videoPhase}
            onTimeUpdate={handleTimeUpdate}
            onSeekReady={handleSeekReady}
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

          {/* Video text overlays + chapter dots — appear during video phase */}
          {videoPhase && (
            <VideoTextOverlays
              currentTime={videoTime}
              onSeekTo={handleSeekTo}
            />
          )}

          {/* Scroll indicator lives in HeroNarration */}
        </HeroFrames>
      </section>

      {/* LANDING PAGE SECTIONS */}
      <PriceAnchor />
      <FeatureHighlights />
      <PricingTiers />
      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
