"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "High-Yield Vignettes",
    description:
      "Every question mirrors real AKT clinical scenarios. No filler, no fluff — just the conditions and presentations that actually appear.",
    gradient: "from-violet-500/20 to-indigo-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Predictive Scoring",
    description:
      "Our algorithm tracks your weak spots and predicts your exam readiness. Know exactly where to focus before test day.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Examiner's Playbook",
    description:
      "Deep-dive explanations that reveal what examiners look for. Understand the 'why' behind every answer choice.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "AI Supervisor",
    description:
      "Get instant, intelligent feedback on your clinical reasoning. Like having a consultant in your pocket 24/7.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Active Recall",
    description:
      "Spaced repetition built-in. Questions resurface at optimal intervals so you remember what you've learned.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
        <path
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "10-Minute Gap Ready",
    description:
      "Designed for busy trainees. Squeeze in meaningful revision during coffee breaks, commutes, or clinic downtime.",
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative"
    >
      <div
        className="relative h-full rounded-2xl border p-6 transition-all duration-300 hover:border-white/15"
        style={{
          background: "rgba(17,19,26,.65)",
          borderColor: "rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Gradient glow on hover */}
        <div
          className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          style={{ zIndex: -1, filter: "blur(20px)" }}
        />

        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: "rgba(109,106,232,.15)",
            color: "var(--brand-violet-light)",
          }}
        >
          {feature.icon}
        </div>

        <h3
          className="mb-2 text-lg font-semibold"
          style={{ letterSpacing: "-0.01em" }}
        >
          {feature.title}
        </h3>

        <p
          className="text-[15px] leading-relaxed"
          style={{ color: "var(--fg-mid)" }}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(109,106,232,.08), transparent 50%)",
        }}
      />

      <div className="container-x relative">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.20em]"
            style={{ color: "var(--brand-violet-light)" }}
          >
            Why AKT Navigator
          </div>
          <h2
            className="text-[36px] leading-tight md:text-[44px]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Everything you need to pass.
            <br />
            <span style={{ color: "var(--fg-mid)" }}>Nothing you don't.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
