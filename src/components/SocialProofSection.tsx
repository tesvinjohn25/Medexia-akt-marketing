"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const stats = [
  { value: 94, suffix: "%", label: "Pass rate" },
  { value: 2800, suffix: "+", label: "Questions" },
  { value: 15, suffix: "k+", label: "Trainees" },
  { value: 4.9, suffix: "", label: "App rating", isDecimal: true },
];

const testimonials = [
  {
    quote:
      "The explanations are incredible. It's like having a registrar walk you through every case.",
    author: "Dr. Sarah M.",
    role: "ST3, Yorkshire",
    avatar: "SM",
  },
  {
    quote:
      "I passed on my first attempt using just this app during my commute. The 10-minute sessions actually work.",
    author: "Dr. James K.",
    role: "GP, London",
    avatar: "JK",
  },
  {
    quote:
      "The predictive scoring told me exactly what topics to focus on. Saved me weeks of unfocused revision.",
    author: "Dr. Priya R.",
    role: "ST2, Manchester",
    avatar: "PR",
  },
];

function AnimatedNumber({
  value,
  suffix,
  isDecimal,
}: {
  value: number;
  suffix: string;
  isDecimal?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      if (isDecimal) {
        setDisplayValue(Math.round(eased * value * 10) / 10);
      } else {
        setDisplayValue(Math.floor(eased * value));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, isDecimal]);

  return (
    <span ref={ref}>
      {isDecimal ? displayValue.toFixed(1) : displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="text-center"
    >
      <div
        className="text-[48px] font-bold md:text-[56px]"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
          background: "var(--brand-grad)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        <AnimatedNumber
          value={stat.value}
          suffix={stat.suffix}
          isDecimal={stat.isDecimal}
        />
      </div>
      <div
        className="mt-1 text-sm font-medium"
        style={{ color: "var(--fg-mid)" }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative"
    >
      <div
        className="h-full rounded-2xl border p-6 md:p-7"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,19,26,.75), rgba(17,19,26,.55))",
          borderColor: "rgba(255,255,255,.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Quote icon */}
        <svg
          className="mb-4 h-8 w-8"
          viewBox="0 0 32 32"
          fill="none"
          style={{ color: "var(--brand-iris)", opacity: 0.4 }}
        >
          <path
            d="M10.5 17.5H6.5C6.5 13.5 8.5 10.5 12.5 9.5L13 11C11 11.5 9.5 13 9.5 15.5H12.5C13.5 15.5 14.5 16.5 14.5 17.5V22.5C14.5 23.5 13.5 24.5 12.5 24.5H10.5C9.5 24.5 8.5 23.5 8.5 22.5V17.5H10.5ZM23.5 17.5H19.5C19.5 13.5 21.5 10.5 25.5 9.5L26 11C24 11.5 22.5 13 22.5 15.5H25.5C26.5 15.5 27.5 16.5 27.5 17.5V22.5C27.5 23.5 26.5 24.5 25.5 24.5H23.5C22.5 24.5 21.5 23.5 21.5 22.5V17.5H23.5Z"
            fill="currentColor"
          />
        </svg>

        <p
          className="text-[16px] leading-relaxed md:text-[17px]"
          style={{ color: "var(--fg-high)" }}
        >
          "{testimonial.quote}"
        </p>

        <div className="mt-6 flex items-center gap-3">
          {/* Avatar */}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
            style={{
              background: "var(--brand-grad)",
              color: "white",
            }}
          >
            {testimonial.avatar}
          </div>
          <div>
            <div className="font-semibold" style={{ fontSize: "15px" }}>
              {testimonial.author}
            </div>
            <div
              className="text-sm"
              style={{ color: "var(--fg-muted)" }}
            >
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SocialProofSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background elements */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(17,19,26,.5) 20%, rgba(17,19,26,.5) 80%, transparent)",
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
        {/* Stats row */}
        <div className="mb-20 grid grid-cols-2 gap-8 md:mb-24 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Testimonials header */}
        <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <div
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.20em]"
            style={{ color: "var(--brand-violet-light)" }}
          >
            Trusted by Trainees
          </div>
          <h2
            className="text-[32px] leading-tight md:text-[40px]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Join thousands who passed
            <br />
            <span style={{ color: "var(--fg-mid)" }}>with confidence.</span>
          </h2>
        </ScrollReveal>

        {/* Testimonials grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>

        {/* Trust badges */}
        <ScrollReveal delay={0.3} className="mt-14 text-center md:mt-16">
          <div
            className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm"
            style={{ color: "var(--fg-muted)" }}
          >
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              RCGP aligned
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              Evidence-based
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Made by GPs, for GPs
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
