"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  {
    title: "Start a session",
    description: "The app picks your weakest topic and serves targeted questions.",
    image: "/appshots/01_Predicted_akt.jpg",
  },
  {
    title: "Learn as you answer",
    description: "Every question comes with a deep explanation — like a senior GP breaking it down.",
    image: "/appshots/05_Deep_explaination2.jpg",
  },
  {
    title: "See your gaps",
    description: "After each session, see exactly where you're strong and where to focus next.",
    image: "/appshots/04_Generate_mocks.jpg",
  },
];

export function HowItWorks() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <div
          className="r-blur mb-10 text-center text-[13px] tracking-[0.22em] uppercase font-semibold"
          style={{ color: "rgba(167,139,250,.85)", "--i": 0 } as React.CSSProperties}
        >
          How it works
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="r-up text-center"
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              <div
                className="mx-auto mb-4 overflow-hidden rounded-2xl"
                style={{
                  maxWidth: 220,
                  boxShadow: "0 8px 30px rgba(109,106,232,.15)",
                }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  width={220}
                  height={476}
                  className="w-full h-auto"
                />
              </div>
              <h3
                className="text-[17px] font-semibold mb-1"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-[14px] leading-[1.6] max-w-[260px] mx-auto"
                style={{ color: "var(--fg-mid)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
