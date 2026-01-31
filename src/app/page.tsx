"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroFrames } from "@/components/HeroFrames";
import { HeroNarration } from "@/components/HeroNarration";
import { PhoneScreenDemo } from "@/components/PhoneScreenDemo";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

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

// Smooth section transition component
function SectionTransition({ direction = "down" }: { direction?: "down" | "up" }) {
  return (
    <div
      className="pointer-events-none relative h-32 md:h-48"
      style={{
        background:
          direction === "down"
            ? "linear-gradient(180deg, transparent, var(--bg-ink))"
            : "linear-gradient(180deg, var(--bg-ink), transparent)",
      }}
    />
  );
}

export default function Home() {
  const [p, setP] = React.useState(0);
  const [t, setT] = React.useState<{ x: number; y: number; s: number } | null>(null);

  // Parallax for post-hero sections
  const { scrollY } = useScroll();
  const heroEndY = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <main className="overflow-x-hidden">
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

          {/* Desktop overlay (left aligned, copy updated per brief) */}
          <div className="hidden md:block">
            <div className="container-x relative flex h-full items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
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

                {/* NEW HERO COPY - PER BRIEF */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-[11px] font-semibold tracking-[0.20em] uppercase"
                  style={{ color: "var(--brand-violet-light)" }}
                >
                  Built for the 10-minute gap
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-3 text-[56px] leading-[1.05]"
                  style={{
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.04em",
                    textShadow: "0 18px 60px rgba(0,0,0,.65)",
                  }}
                >
                  Stop Revising Blindly.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-4 text-[16px] leading-[1.65]"
                  style={{ color: "rgba(232,236,255,.78)" }}
                >
                  High-yield clinical vignettes, predictive scoring, and deep-dive explanations.
                  See why 5 questions here is worth 50 elsewhere.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-7 flex flex-wrap gap-3"
                >
                  <a className="btn-primary" href={DEMO_URL}>
                    Start now
                  </a>
                  <a className="btn-secondary" href={DEMO_URL}>
                    Try the 5‑question demo
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="mt-5 flex items-center gap-2 text-sm"
                  style={{ color: "rgba(232,236,255,.55)" }}
                >
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ↓
                  </motion.span>
                  <span>Scroll to take a test drive. No signup.</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Phone screen demo — scroll-scrubbed frames */}
          <PhoneScreenDemo progress={p} transform={t} />

          {/* Mobile narration + CTA */}
          <div className="md:hidden">
            <HeroNarration progress={p} demoUrl={DEMO_URL} />
          </div>
        </HeroFrames>

        {/* Bottom seam blend for hero-to-content transition */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(180deg, transparent, var(--bg-ink))",
          }}
        />
      </section>

      {/* FEATURES SECTION */}
      <FeaturesSection />

      {/* HOW IT WORKS SECTION */}
      <HowItWorksSection />

      {/* SOCIAL PROOF SECTION */}
      <SocialProofSection />

      {/* FINAL CTA SECTION */}
      <CTASection demoUrl={DEMO_URL} />

      {/* FOOTER */}
      <Footer loginUrl={LOGIN_URL} />
    </main>
  );
}
