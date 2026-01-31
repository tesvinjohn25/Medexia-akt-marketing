"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Pick a topic",
    description:
      "Choose from 20+ clinical domains. Focus on weak areas or go random — you're always learning something high-yield.",
    visual: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10">
        <div className="absolute inset-4 flex flex-col gap-2">
          {["Cardiovascular", "Respiratory", "Dermatology", "MSK"].map(
            (topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background:
                    i === 0
                      ? "var(--brand-grad)"
                      : "rgba(255,255,255,.05)",
                  border:
                    i === 0 ? "none" : "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    background:
                      i === 0
                        ? "white"
                        : "rgba(255,255,255,.3)",
                  }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: i === 0 ? "white" : "var(--fg-mid)" }}
                >
                  {topic}
                </span>
              </motion.div>
            )
          )}
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Answer vignettes",
    description:
      "Clinical scenarios just like the real exam. Work through them at your pace — on the bus, between patients, wherever.",
    visual: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <div className="absolute inset-4 flex flex-col">
          <div className="mb-3 text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
            Question 3 of 10
          </div>
          <div className="mb-4 text-sm leading-relaxed" style={{ color: "var(--fg-high)" }}>
            A 45-year-old man presents with crushing chest pain radiating to his left arm...
          </div>
          <div className="mt-auto flex flex-col gap-2">
            {["A. ECG", "B. Troponin", "C. Aspirin 300mg", "D. Call 999"].map(
              (opt, i) => (
                <motion.div
                  key={opt}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="rounded-lg px-3 py-2 text-sm"
                  style={{
                    background:
                      i === 3
                        ? "rgba(109,106,232,.25)"
                        : "rgba(255,255,255,.05)",
                    border:
                      i === 3
                        ? "1px solid var(--brand-iris)"
                        : "1px solid rgba(255,255,255,.08)",
                    color: i === 3 ? "var(--brand-violet-light)" : "var(--fg-mid)",
                  }}
                >
                  {opt}
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Learn the 'why'",
    description:
      "Every answer unlocks a deep-dive explanation. Understand examiner thinking, not just the right answer.",
    visual: (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
        <div className="absolute inset-4 flex flex-col">
          <div
            className="mb-2 flex items-center gap-2 text-xs font-semibold"
            style={{ color: "#4ade80" }}
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Correct!
          </div>
          <div
            className="text-sm font-medium"
            style={{ color: "var(--fg-high)" }}
          >
            Examiner's Insight
          </div>
          <div
            className="mt-2 text-xs leading-relaxed"
            style={{ color: "var(--fg-mid)" }}
          >
            STEMI requires immediate action. The key discriminator is recognizing that while investigations are important, definitive
            management...
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 h-1 origin-left rounded-full"
            style={{ background: "var(--brand-grad)" }}
          />
          <div
            className="mt-2 text-xs"
            style={{ color: "var(--fg-muted)" }}
          >
            Your mastery: 78%
          </div>
        </div>
      </div>
    ),
  },
];

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative grid items-center gap-8 md:grid-cols-2 md:gap-12"
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }
        }
        transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
        className={`${index % 2 === 1 ? "md:order-2" : ""}`}
      >
        <div
          className="mb-3 text-[13px] font-bold tracking-wide"
          style={{
            background: "var(--brand-grad)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {step.number}
        </div>
        <h3
          className="mb-3 text-[28px] font-semibold leading-tight md:text-[32px]"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.02em",
          }}
        >
          {step.title}
        </h3>
        <p
          className="text-[16px] leading-relaxed"
          style={{ color: "var(--fg-mid)" }}
        >
          {step.description}
        </p>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: index % 2 === 0 ? 40 : -40 }
        }
        transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
        className={`aspect-[4/3] ${index % 2 === 1 ? "md:order-1" : ""}`}
      >
        {step.visual}
      </motion.div>

      {/* Connector line */}
      {!isLast && (
        <div
          className="absolute bottom-0 left-1/2 hidden h-24 w-px -translate-x-1/2 translate-y-full md:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(109,106,232,.4), transparent)",
          }}
        />
      )}
    </motion.div>
  );
}

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32">
      {/* Background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity,
          background:
            "radial-gradient(ellipse 100% 60% at 50% 50%, rgba(109,106,232,.06), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.08) 30%, rgba(255,255,255,.08) 70%, transparent)",
        }}
      />

      <div className="container-x relative">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.20em]"
            style={{ color: "var(--brand-violet-light)" }}
          >
            How It Works
          </div>
          <h2
            className="text-[36px] leading-tight md:text-[44px]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Learn smarter in
            <br />
            <span style={{ color: "var(--fg-mid)" }}>three simple steps.</span>
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-20 md:gap-28">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
