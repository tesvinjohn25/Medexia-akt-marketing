"use client";

import Link from "next/link";
import { aktTopics } from "@/data/akt-topics";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CATEGORIES = ["Clinical", "Professional", "Life Stages"] as const;

const CATEGORY_META: Record<string, { label: string; count: number }> = {
  Clinical: { label: "Clinical", count: aktTopics.filter((t) => t.category === "Clinical").length },
  Professional: { label: "Professional", count: aktTopics.filter((t) => t.category === "Professional").length },
  "Life Stages": { label: "Life Stages", count: aktTopics.filter((t) => t.category === "Life Stages").length },
};

export function TopicGrid() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="section-padding">
      <div
        ref={ref}
        className={`container-x reveal-group ${visible ? "is-visible" : ""}`}
      >
        <p
          className="r-up text-center text-[11px] md:text-[12px] font-semibold tracking-[0.12em] uppercase"
          style={{ color: "var(--fg-muted)", "--i": 0 } as React.CSSProperties}
        >
          Full RCGP Curriculum
        </p>
        <h2
          className="r-blur mt-3 text-center text-[24px] md:text-[32px] font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            "--i": 1,
          } as React.CSSProperties}
        >
          32 AKT topics. Audio + questions for every one.
        </h2>

        <div className="mt-10 space-y-8">
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat}
              className="r-up"
              style={{ "--i": ci + 2 } as React.CSSProperties}
            >
              <div className="flex items-center gap-2 mb-3">
                <h3
                  className="text-[13px] font-semibold tracking-[0.06em] uppercase"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {CATEGORY_META[cat].label}
                </h3>
                <span
                  className="text-[11px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    color: "var(--fg-muted)",
                  }}
                >
                  {CATEGORY_META[cat].count}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {aktTopics
                  .filter((t) => t.category === cat)
                  .map((topic) => (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="inline-block rounded-lg px-3 py-1.5 text-[13px] transition-colors hover:bg-white/[.08]"
                      style={{
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.07)",
                        color: "var(--fg-mid)",
                      }}
                    >
                      {topic.name}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
