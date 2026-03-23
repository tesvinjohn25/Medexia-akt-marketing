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
                Honest answer:
              </strong>{" "}
              We&apos;ve built what we believe is the best AKT revision tool
              available, but we have zero reviews and zero reputation.
            </p>
            <p>
              So instead of asking you to trust us with your money, we&apos;re
              asking you to trust us with your time. Use AKT Navigator for free
              for the April and July sittings. If it helps you, leave us a
              review. That&apos;s the deal.
            </p>
            <p style={{ color: "var(--fg-muted)", fontSize: "14px" }}>
              After July, pricing will depend on what our users tell us. Right
              now, just focus on revising.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
