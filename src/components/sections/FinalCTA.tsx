"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const DEMO_URL = "https://app.medexia-akt.com/demo";

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
        <h2
          className="r-blur text-[32px] md:text-[48px] leading-[1.08]"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.04em",
            "--i": 0,
          } as React.CSSProperties}
        >
          You&apos;re closer to passing
          <br />
          than you think.
        </h2>

        <p
          className="r-up mx-auto mt-5 max-w-[480px] text-[15px] md:text-[17px] leading-[1.6]"
          style={{ color: "rgba(232,236,255,.68)", "--i": 2 } as React.CSSProperties}
        >
          Start with 5 free questions. No signup. No card.
        </p>

        <div
          className="r-scale mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <a className="btn-primary" href={DEMO_URL}>
            Start now
          </a>
          <a className="btn-secondary" href={DEMO_URL}>
            Try the 5-question demo
          </a>
        </div>
      </div>
    </section>
  );
}
