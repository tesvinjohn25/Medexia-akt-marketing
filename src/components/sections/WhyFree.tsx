"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function WhyFree() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div
          className="r-up mx-auto max-w-[640px] rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--bg-surface)",
            borderLeft: "3px solid var(--brand-iris)",
            "--i": 0,
          } as React.CSSProperties}
        >
          <h2
            className="text-[22px] md:text-[26px] font-semibold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            Why is this free?
          </h2>

          <div
            className="space-y-3 text-[15px] md:text-[16px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            <p>
              <strong style={{ color: "var(--fg-high)" }}>
                We think this is a game-changer.
              </strong>{" "}
              AKT Navigator gives you the most optimal way to study for
              your AKT &mdash; adaptive sessions, deep explanations, and 50+
              hours of audio revision all in one place.
            </p>
            <p>
              We want you to experience it for yourself. Use AKT Navigator
              completely free for the April and July sittings. No trial, no
              credit card &mdash; just start revising.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
