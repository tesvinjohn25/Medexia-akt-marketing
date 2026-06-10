"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapClient";
import { SAMPLE_QUESTION } from "@/data/sample-question";

/**
 * Chapter 02 — Answer. A real AKT question answers itself as you
 * scroll: the vignette lands, the five options deal in, the four wrong
 * answers strike out one by one, the right one locks in green, and the
 * structured explanation slides up. Scroll-driven product storytelling
 * with the actual product content (the same question that powers /demo).
 *
 * The section pins for ~2.6 screens; reduced motion (or no JS) renders
 * the finished state — question answered, explanation visible.
 */

const Q = SAMPLE_QUESTION;
const WRONG_IDS = Q.options.filter((o) => o.id !== Q.correctId).map((o) => o.id);

export function ChapterAnswer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      // On small screens the full scene is taller than the pinned
      // viewport: drift the column up across the answer phase so the
      // explanation ends on screen.
      const overflowShift = () => {
        const col = root.querySelector<HTMLElement>("[data-q='col']");
        if (!col) return 0;
        return -Math.max(0, col.offsetHeight + 140 - window.innerHeight);
      };

      tl.fromTo(
        "[data-q='stem']",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.4 }
      )
        .fromTo(
          "[data-q='prompt']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          ">-0.3"
        )
        .fromTo(
          "[data-opt]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.28 },
          ">-0.1"
        )
        .addLabel("answering", "+=0.5");

      tl.to(
        "[data-q='col']",
        { y: overflowShift, ease: "power1.inOut", duration: 5.6 },
        "answering"
      );

      // Strike the wrong answers, one by one.
      WRONG_IDS.forEach((id, i) => {
        const at = `answering+=${i * 0.7}`;
        tl.to(
          `[data-opt='${id}']`,
          { opacity: 0.3, duration: 0.45 },
          at
        ).to(
          `[data-opt='${id}'] .aw-opt-strike`,
          { scaleX: 1, duration: 0.45 },
          at
        );
      });

      // The right answer locks in.
      tl.to(
        `[data-opt='${Q.correctId}']`,
        {
          borderColor: "rgba(52,211,153,.65)",
          boxShadow: "0 0 44px rgba(52,211,153,.18)",
          scale: 1.02,
          duration: 0.7,
          ease: "back.out(2)",
        },
        `answering+=${WRONG_IDS.length * 0.7 + 0.3}`
      ).to(
        `[data-opt='${Q.correctId}'] .aw-opt-check`,
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)" },
        "<+0.15"
      );

      // The explanation arrives — the actual product moment.
      tl.fromTo(
        "[data-q='expl']",
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.4 },
        ">+0.4"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-track="02 · The question engine"
      aria-label="A real AKT question with its structured explanation"
    >
      <div className="aw-pin container-x relative">
        <div className="aw-mark mx-auto w-full max-w-[1020px]">
          <span className="aw-mark-no">02</span>
          <span className="aw-mark-rule" />
          <span className="aw-mark-title">Answer</span>
        </div>

        <div data-q="col" className="mx-auto mt-6 w-full max-w-[1020px] md:mt-10">
          <h2
            className="text-center text-[30px] leading-[1.05] md:text-[46px]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.04em",
            }}
          >
            Watch a question teach.
          </h2>

          <div className="mt-6 grid gap-5 md:mt-10 md:grid-cols-2 md:gap-8">
            {/* The vignette */}
            <div data-q="stem">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-md px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    background: "rgba(155,107,255,.1)",
                    border: "1px solid rgba(155,107,255,.25)",
                    color: "var(--brand-violet-light)",
                  }}
                >
                  {Q.topic}
                </span>
                <span
                  className="rounded-md px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    background: "rgba(52,211,153,.08)",
                    border: "1px solid rgba(52,211,153,.2)",
                    color: "rgba(52,211,153,.85)",
                  }}
                >
                  {Q.guidelineTag}
                </span>
              </div>
              <p
                className="mt-3 text-[13px] leading-[1.65] md:text-[15px]"
                style={{ color: "rgba(232,236,255,.72)" }}
              >
                {Q.stem}
              </p>
              <p
                data-q="prompt"
                className="mt-3 text-[14px] font-semibold leading-[1.5] md:text-[16px]"
                style={{ color: "var(--fg-high)" }}
              >
                {Q.prompt}
              </p>
            </div>

            {/* The options */}
            <div className="space-y-2.5">
              {Q.options.map((opt) => (
                <div key={opt.id} data-opt={opt.id} className="aw-opt">
                  <span className="aw-opt-id">{opt.id}</span>
                  <span
                    className="text-[13px] leading-[1.5] md:text-[14px]"
                    style={{ color: "rgba(232,236,255,.82)" }}
                  >
                    {opt.text}
                  </span>
                  {opt.id === Q.correctId && (
                    <span className="aw-opt-check" aria-hidden>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0b0d13"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                  {opt.id !== Q.correctId && (
                    <span className="aw-opt-strike" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* The explanation — why this is different */}
          <div
            data-q="expl"
            className="mt-6 rounded-2xl p-5 md:mt-8 md:p-6"
            style={{
              background: "rgba(255,255,255,.025)",
              border: "1px solid rgba(255,255,255,.09)",
            }}
          >
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Understanding the question",
                    "Key points for your AKT",
                    "Why the others are wrong",
                  ].map((part, i) => (
                    <span
                      key={part}
                      className="rounded-full px-2.5 py-[4px] text-[10px] font-bold uppercase tracking-[0.1em]"
                      style={{
                        background: "rgba(155,107,255,.08)",
                        border: "1px solid rgba(155,107,255,.2)",
                        color: "var(--brand-violet-light)",
                      }}
                    >
                      {i + 1}. {part}
                    </span>
                  ))}
                </div>
                <p
                  className="mt-3 text-[13px] leading-[1.65] md:text-[14px]"
                  style={{ color: "rgba(232,236,255,.62)" }}
                >
                  {Q.understanding.split(". ").slice(0, 2).join(". ")}.
                  Every answer gets this three-part breakdown &mdash; aligned
                  to NICE, CKS and the BNF, whether you got it right or not.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <a
                  href="https://app.medexia-akt.com/demo/questions"
                  className="btn-primary whitespace-nowrap text-[14px]"
                >
                  Sit five real questions &rarr;
                </a>
                <a
                  href="/demo"
                  className="text-[12px] font-semibold transition-colors hover:text-white"
                  style={{ color: "rgba(197,170,255,.85)" }}
                >
                  Read this full explanation &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
