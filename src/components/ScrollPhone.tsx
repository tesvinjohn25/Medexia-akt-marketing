"use client";

import React from "react";
import Image from "next/image";

type Step = {
  key: string;
  title: string;
  body: string;
  imageSrc: string;
};

const STEPS: Step[] = [
  {
    key: "q",
    title: "Pick an option",
    body: "Brutal, plausible distractors. You’ll feel the trap — and then learn the rule.",
    imageSrc: "/appshots/question.jpg",
  },
  {
    key: "wrong",
    title: "Get it wrong (on purpose)",
    body: "The moment you commit, Medexia shows the correct answer — then earns your trust.",
    imageSrc: "/appshots/explain-shell.jpg",
  },
  {
    key: "explain",
    title: "Explanation that actually teaches",
    body: "Why it’s right. Why each distractor is wrong. What examiners are really testing.",
    imageSrc: "/appshots/explain-expanded.jpg",
  },
];

export function ScrollPhone() {
  const [active, setActive] = React.useState(STEPS[0]!.key);

  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-scroll-step]"));

    const io = new IntersectionObserver(
      (entries) => {
        // choose the most visible intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const key = (visible.target as HTMLElement).dataset.scrollStep;
        if (key) setActive(key);
      },
      { threshold: [0.25, 0.45, 0.65] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = STEPS.find((s) => s.key === active) || STEPS[0]!;

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="sticky top-6 card p-4 md:p-5">
          <div className="text-sm font-semibold">Live product feel</div>
          <div className="muted mt-1 text-sm">Scroll — the screen updates like a guided story.</div>

          <div className="mt-4 overflow-hidden rounded-[28px] border" style={{ borderColor: "rgba(255,255,255,.10)" }}>
            <Image
              src={step.imageSrc}
              alt={step.title}
              width={900}
              height={1600}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority={false}
            />
          </div>

          <div className="mt-4">
            <div className="text-base font-semibold" style={{ letterSpacing: "-0.02em" }}>
              {step.title}
            </div>
            <div className="muted mt-1 text-sm leading-[1.65]">{step.body}</div>
          </div>
        </div>
      </div>

      <div className="md:col-span-7">
        <div className="grid gap-4">
          {STEPS.map((s, idx) => (
            <div
              key={s.key}
              data-scroll-step={s.key}
              className="card p-5 md:p-6"
              style={{
                outline: active === s.key ? "1px solid rgba(155,107,255,.55)" : "1px solid transparent",
              }}
            >
              <div className="faint text-xs tracking-[0.14em]">CHAPTER {idx + 1}</div>
              <div className="mt-2 text-xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                {s.title}
              </div>
              <p className="muted mt-2 text-sm leading-[1.8]">{s.body}</p>
              <div className="mt-6 faint text-xs">
                Keep scrolling →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
