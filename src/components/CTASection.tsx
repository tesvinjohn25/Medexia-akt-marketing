"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CTASectionProps {
  demoUrl: string;
}

export function CTASection({ demoUrl }: CTASectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32">
      {/* Animated background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          y,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(109,106,232,.15), transparent 60%)",
        }}
      />

      {/* Top divider */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.08) 30%, rgba(255,255,255,.08) 70%, transparent)",
        }}
      />

      <div className="container-x relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.98 }
          }
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(109,106,232,.12), rgba(17,19,26,.9))",
            border: "1px solid rgba(109,106,232,.25)",
            boxShadow:
              "0 40px 100px rgba(109,106,232,.15), inset 0 1px 0 rgba(255,255,255,.08)",
          }}
        >
          {/* Inner glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse, rgba(109,106,232,.3), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative px-6 py-12 text-center md:px-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.20em]"
              style={{ color: "var(--brand-violet-light)" }}
            >
              Start Today
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[32px] leading-tight md:text-[44px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
              }}
            >
              Ready to pass the AKT?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed md:text-[17px]"
              style={{ color: "var(--fg-mid)" }}
            >
              Try 5 questions free. No signup, no credit card. See why 5 questions here is worth 50 elsewhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href={demoUrl}
                className="btn-primary group relative overflow-hidden px-8 py-4 text-base"
              >
                <span className="relative z-10">Start free demo</span>
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent)",
                  }}
                  animate={{ translateX: ["−100%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </a>
              <a
                href={demoUrl}
                className="btn-secondary px-6 py-4 text-base"
              >
                View pricing
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-sm"
              style={{ color: "var(--fg-muted)" }}
            >
              Join 15,000+ trainees who trust Medexia
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
