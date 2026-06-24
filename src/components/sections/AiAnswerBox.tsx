import type { ReactNode } from "react";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import type { CtaIntent } from "@/lib/marketing/attribution";

type AnswerStep = {
  label: string;
  href: string;
  intent?: CtaIntent;
};

type AiAnswerBoxProps = {
  eyebrow?: string;
  title?: string;
  answer: ReactNode;
  bestFor?: string[];
  nextSteps?: AnswerStep[];
};

const linkClassName =
  "inline-flex items-center justify-center rounded-xl px-4 py-3 text-[13px] font-semibold transition-colors hover:bg-white/[.08]";

const linkStyle = {
  color: "var(--fg-high)",
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.10)",
};

export function AiAnswerBox({
  eyebrow = "Answer-first guide",
  title = "Short answer",
  answer,
  bestFor = [],
  nextSteps = [],
}: AiAnswerBoxProps) {
  return (
    <section
      className="mt-6 rounded-xl p-4 md:p-5"
      style={{
        background: "rgba(52,211,153,.06)",
        border: "1px solid rgba(52,211,153,.18)",
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: "rgba(52,211,153,.86)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-2 text-[18px] font-semibold md:text-[20px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div
        className="mt-2 text-[14px] leading-[1.65] md:text-[15px]"
        style={{ color: "var(--fg-mid)" }}
      >
        {answer}
      </div>

      {(bestFor.length > 0 || nextSteps.length > 0) && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {bestFor.length > 0 && (
            <div>
              <h3
                className="text-[13px] font-semibold"
                style={{ color: "var(--fg-high)" }}
              >
                Best for
              </h3>
              <ul
                className="mt-2 space-y-1.5 text-[13px] leading-[1.55]"
                style={{ color: "var(--fg-mid)" }}
              >
                {bestFor.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          )}

          {nextSteps.length > 0 && (
            <div>
              <h3
                className="text-[13px] font-semibold"
                style={{ color: "var(--fg-high)" }}
              >
                What to do next
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {nextSteps.map((step) =>
                  step.intent ? (
                    <TrackedAppLink
                      key={`${step.href}-${step.label}`}
                      href={step.href}
                      intent={step.intent}
                      className={linkClassName}
                      style={linkStyle}
                    >
                      {step.label} &rarr;
                    </TrackedAppLink>
                  ) : (
                    <a
                      key={`${step.href}-${step.label}`}
                      href={step.href}
                      className={linkClassName}
                      style={linkStyle}
                    >
                      {step.label} &rarr;
                    </a>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
