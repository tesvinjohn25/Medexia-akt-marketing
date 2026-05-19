"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExamCountdown } from "./ExamCountdown";

export function FinalCTA() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle mesh background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 400px at 50% 50%, rgba(109,106,232,.06), transparent 70%), radial-gradient(500px 350px at 60% 60%, rgba(155,107,255,.05), transparent 65%)",
        }}
        aria-hidden
      />

      <div
        ref={ref}
        className={`container-x relative text-center reveal-group ${visible ? "is-visible" : ""}`}
      >
        {/* Countdown */}
        <div
          className="r-up mx-auto max-w-[340px]"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <ExamCountdown variant="compact" />
        </div>

        <h2
          className="r-blur mt-6 text-[32px] md:text-[48px] leading-[1.08]"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.04em",
            "--i": 1,
          } as React.CSSProperties}
        >
          Every day counts.
        </h2>

        <p
          className="r-up mx-auto mt-4 max-w-[480px] text-[15px] md:text-[17px] leading-[1.6]"
          style={{ color: "rgba(232,236,255,.68)", "--i": 2 } as React.CSSProperties}
        >
          Everything is free until 8 July. After that, questions and 2 hours
          of audio stay free, and paid access starts from £59 Early Access.
        </p>

        <div
          className="r-scale mt-8"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <a className="btn-primary inline-block" href="https://app.medexia-akt.com">
            Start free &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
