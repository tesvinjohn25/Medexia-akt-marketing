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
            What stays free?
          </h2>

          <div
            className="space-y-3 text-[15px] md:text-[16px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            <p>
              <strong style={{ color: "var(--fg-high)" }}>
                We think this is a game-changer.
              </strong>{" "}
              AKT Navigator gives you focused question practice for your AKT
              &mdash; adaptive sessions, deep structured explanations, and a
              generous audio sample all in one place.
            </p>
            <p>
              Free Practice includes syllabus-mapped questions, deep
              explanations, mock exams and basic practice, plus 2 hours of
              audiobook listening. Full audio access starts from £59.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
