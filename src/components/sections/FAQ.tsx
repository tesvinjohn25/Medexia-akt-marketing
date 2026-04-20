"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FAQS } from "@/data/faq";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <polyline points="6 8 10 12 14 8" />
    </svg>
  );
}

export function FAQ({
  showHeader = true,
}: { showHeader?: boolean } = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        {showHeader && (
          <>
            <p
              className="r-up text-center text-[11px] md:text-[12px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: "var(--fg-muted)", "--i": 0 } as React.CSSProperties}
            >
              Common Questions
            </p>
            <h2
              className="r-blur mt-3 text-center text-[24px] md:text-[32px] font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
                "--i": 1,
              } as React.CSSProperties}
            >
              Everything you need to know about the AKT
            </h2>
          </>
        )}

        <div className={`mx-auto ${showHeader ? "mt-10" : ""} max-w-[720px] space-y-2`}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="r-up rounded-xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.07)",
                  "--i": i + 2,
                } as React.CSSProperties}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[.03]"
                >
                  <span
                    className="text-[14px] md:text-[15px] font-semibold leading-snug"
                    style={{ color: "var(--fg-high)" }}
                  >
                    {faq.q}
                  </span>
                  <span style={{ color: "var(--fg-muted)" }}>
                    <ChevronIcon open={isOpen} />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-200"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-5 pb-4 text-[13px] md:text-[14px] leading-[1.7]"
                      style={{ color: "var(--fg-mid)" }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
