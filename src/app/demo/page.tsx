import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { SAMPLE_QUESTION } from "@/data/sample-question";

const DEMO_HOME = "https://app.medexia-akt.com/demo";
const DEMO_AUDIO = "https://app.medexia-akt.com/demo/audiobook";
const DEMO_QUESTIONS = "https://app.medexia-akt.com/demo/questions";

export const metadata: Metadata = {
  title: "Try AKT Navigator Free — Audio Sample + 5 Real AKT Questions",
  description:
    "Try AKT Navigator free: hear a real MRCGP AKT audio sample and answer five AKT-style questions with structured explanations. No signup.",
  alternates: {
    canonical: "https://medexia-akt.com/demo",
  },
  openGraph: {
    title: "Try AKT Navigator Free — Audio + 5 Real AKT Questions",
    description:
      "No account needed: hear a real audio sample and sit five real AKT-style questions with structured, examiner-style explanations.",
    type: "website",
    url: "https://medexia-akt.com/demo",
  },
};

const SERIF = 'Georgia, "Times New Roman", Times, serif';

export default function DemoPage() {
  const q = SAMPLE_QUESTION;
  const correct = q.options.find((o) => o.id === q.correctId)!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "AKT Navigator Demo",
        url: DEMO_HOME,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        description:
          "Free, no-signup demo of AKT Navigator: a narrated sample from the 90+ hour MRCGP AKT audio library and a five-question demo with structured explanations and results.",
        provider: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
      },
      {
        // Education Q&A markup for the worked example below — content
        // parity with the visible text on this page.
        "@type": "Quiz",
        about: { "@type": "Thing", name: "MRCGP AKT revision" },
        educationalAlignment: [
          {
            "@type": "AlignmentObject",
            alignmentType: "educationalSubject",
            targetName: q.topic,
          },
        ],
        hasPart: [
          {
            "@type": "Question",
            eduQuestionType: "Multiple choice",
            learningResourceType: "Practice problem",
            name: q.prompt,
            text: `${q.stem} ${q.prompt}`,
            comment: { "@type": "Comment", text: q.understanding },
            encodingFormat: "text/html",
            suggestedAnswer: q.options
              .filter((o) => o.id !== q.correctId)
              .map((o) => ({
                "@type": "Answer",
                position: o.id,
                text: o.text,
                comment: { "@type": "Comment", text: o.whyWrong },
                encodingFormat: "text/html",
              })),
            acceptedAnswer: {
              "@type": "Answer",
              position: correct.id,
              text: correct.text,
              comment: { "@type": "Comment", text: q.understanding },
              answerExplanation: { "@type": "Comment", text: q.understanding },
              encodingFormat: "text/html",
            },
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Do I need an account to try the AKT Navigator demo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The demo is completely free and requires no signup. You can listen to a real audio sample and sit five real AKT-style questions with full explanations.",
            },
          },
          {
            "@type": "Question",
            name: "What is in the AKT Navigator demo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Two things: a narrated sample from the 90+ hour MRCGP AKT audio library, and a five-question demo where each answer is followed by a structured explanation — understanding the question, key points for your AKT, and why the other options are wrong — ending with your results.",
            },
          },
          {
            "@type": "Question",
            name: "Is the AKT Navigator demo free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the demo is free with no signup. The full product is also free until 8 July 2026; after that questions stay free and full audio access starts from £59.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://medexia-akt.com/" },
          { name: "Demo", url: "https://medexia-akt.com/demo" },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[720px]">
          <div
            className="text-[11px] tracking-[0.22em] uppercase font-semibold"
            style={{ color: "rgba(52,211,153,.85)" }}
          >
            Free demo &middot; No signup
          </div>
          <h1
            className="mt-3 text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Try AKT Navigator before you sign up for anything.
          </h1>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The demo is the real app, not a video. Listen to a narrated sample
            from the 90+ hour MRCGP AKT audio library, then sit five real
            AKT-style questions and see exactly how every answer is explained.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={DEMO_AUDIO} className="btn-primary text-[14px]">
              Listen to the audio demo &rarr;
            </a>
            <a
              href={DEMO_QUESTIONS}
              className="rounded-[14px] px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-white/[.08]"
              style={{
                color: "var(--fg-high)",
                background: "rgba(255,255,255,.045)",
                border: "1px solid rgba(255,255,255,.10)",
              }}
            >
              Sit 5 real questions &rarr;
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container-x max-w-[720px]">
          <h2
            className="text-[24px] md:text-[30px] leading-[1.15]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
            }}
          >
            What&rsquo;s in the demo
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div
              className="rounded-[16px] p-5"
              style={{
                background: "rgba(236,72,153,.05)",
                border: "1px solid rgba(236,72,153,.16)",
              }}
            >
              <div
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "rgba(236,72,153,.85)" }}
              >
                The audio demo
              </div>
              <p
                className="mt-2 text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.74)" }}
              >
                A real chapter from the audiobook library, played in the same
                player you&rsquo;d use to revise on a commute, at the gym or on
                the school run. The full library covers all 32 RCGP AKT
                curriculum topics in 90+ hours.
              </p>
            </div>
            <div
              className="rounded-[16px] p-5"
              style={{
                background: "rgba(167,139,250,.05)",
                border: "1px solid rgba(167,139,250,.16)",
              }}
            >
              <div
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "rgba(167,139,250,.85)" }}
              >
                The question demo
              </div>
              <p
                className="mt-2 text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(232,236,255,.74)" }}
              >
                Five real AKT-style questions in the exam&rsquo;s
                single-best-answer format. After each answer you get the full
                structured explanation, and your results at the end. Questions
                are aligned to NICE, CKS and the BNF and regularly reviewed and
                updated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Worked example — the quality showcase, fully server-rendered so
          search engines and AI tools can read exactly how questions and
          explanations are built. */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container-x max-w-[720px]">
          <h2
            className="text-[24px] md:text-[30px] leading-[1.15]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
            }}
          >
            See the standard: a worked example
          </h2>
          <p
            className="mt-3 text-[15px] md:text-[16px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            This is how every question in AKT Navigator teaches you — whether
            you got it right or not.
          </p>

          <article
            className="mt-6 rounded-[20px] p-5 md:p-7"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,19,26,.88), rgba(17,19,26,.66))",
              border: "1px solid rgba(255,255,255,.10)",
            }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-md px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{
                  color: "rgba(167,139,250,.9)",
                  background: "rgba(167,139,250,.08)",
                  border: "1px solid rgba(167,139,250,.2)",
                }}
              >
                {q.topic}
              </span>
              <span
                className="rounded-md px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{
                  color: "rgba(52,211,153,.85)",
                  background: "rgba(52,211,153,.07)",
                  border: "1px solid rgba(52,211,153,.18)",
                }}
              >
                {q.guidelineTag}
              </span>
            </div>

            <p
              className="mt-4 text-[15px] md:text-[16px] leading-[1.7]"
              style={{ color: "rgba(232,236,255,.88)" }}
            >
              {q.stem}
            </p>
            <p
              className="mt-3 text-[15px] md:text-[16px] font-semibold leading-[1.6]"
              style={{ color: "var(--fg-high)" }}
            >
              {q.prompt}
            </p>

            <ol className="mt-5 space-y-2">
              {q.options.map((o) => {
                const isCorrect = o.id === q.correctId;
                return (
                  <li
                    key={o.id}
                    className="flex items-start gap-3 rounded-[12px] px-4 py-3"
                    style={{
                      background: isCorrect
                        ? "rgba(52,211,153,.08)"
                        : "rgba(255,255,255,.025)",
                      border: isCorrect
                        ? "1px solid rgba(52,211,153,.35)"
                        : "1px solid rgba(255,255,255,.07)",
                    }}
                  >
                    <span
                      className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
                      style={{
                        color: isCorrect ? "#06241a" : "rgba(232,236,255,.7)",
                        background: isCorrect
                          ? "rgba(52,211,153,.9)"
                          : "rgba(255,255,255,.07)",
                      }}
                    >
                      {o.id}
                    </span>
                    <span
                      className="text-[14px] md:text-[15px] leading-[1.55]"
                      style={{
                        color: isCorrect
                          ? "var(--fg-high)"
                          : "rgba(232,236,255,.75)",
                      }}
                    >
                      {o.text}
                      {isCorrect && (
                        <span
                          className="ml-2 text-[11px] font-bold uppercase tracking-[0.14em]"
                          style={{ color: "rgba(52,211,153,.9)" }}
                        >
                          Correct
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div
              className="mt-6 border-t pt-5"
              style={{ borderColor: "rgba(255,255,255,.08)" }}
            >
              <h3
                className="text-[13px] font-bold uppercase tracking-[0.16em]"
                style={{ color: "rgba(167,139,250,.9)" }}
              >
                Understanding the question
              </h3>
              <p
                className="mt-2 text-[14px] md:text-[15px] leading-[1.7]"
                style={{ color: "rgba(232,236,255,.78)" }}
              >
                {q.understanding}
              </p>
            </div>

            <div
              className="mt-5 border-t pt-5"
              style={{ borderColor: "rgba(255,255,255,.08)" }}
            >
              <h3
                className="text-[13px] font-bold uppercase tracking-[0.16em]"
                style={{ color: "rgba(167,139,250,.9)" }}
              >
                Key points for your AKT
              </h3>
              <ul className="mt-2 space-y-2">
                {q.keyPoints.map((kp) => (
                  <li
                    key={kp}
                    className="flex gap-2.5 text-[14px] md:text-[15px] leading-[1.65]"
                    style={{ color: "rgba(232,236,255,.78)" }}
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full"
                      style={{ background: "rgba(167,139,250,.7)" }}
                    />
                    {kp}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="mt-5 border-t pt-5"
              style={{ borderColor: "rgba(255,255,255,.08)" }}
            >
              <h3
                className="text-[13px] font-bold uppercase tracking-[0.16em]"
                style={{ color: "rgba(167,139,250,.9)" }}
              >
                Why the other options are wrong
              </h3>
              <ul className="mt-2 space-y-3">
                {q.options
                  .filter((o) => o.whyWrong)
                  .map((o) => (
                    <li
                      key={o.id}
                      className="text-[14px] md:text-[15px] leading-[1.65]"
                      style={{ color: "rgba(232,236,255,.78)" }}
                    >
                      <strong style={{ color: "var(--fg-high)" }}>
                        {o.id} &mdash; {o.text}:
                      </strong>{" "}
                      {o.whyWrong}
                    </li>
                  ))}
              </ul>
            </div>

            <p
              className="mt-6 text-[12px] italic"
              style={{ fontFamily: SERIF, color: "rgba(232,236,255,.45)" }}
            >
              {q.disclaimer}
            </p>
          </article>

          <p
            className="mt-6 text-[15px] md:text-[16px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Every question follows the AKT&rsquo;s single-best-answer format
            &mdash; a clinical vignette stem with plausible distractors &mdash;
            and every answer is broken down like the example above. Content is
            aligned to NICE, CKS and the BNF and regularly reviewed and updated
            as guidance changes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={DEMO_QUESTIONS} className="btn-primary text-[14px]">
              Try 5 questions like this &rarr;
            </a>
            <a
              href={DEMO_AUDIO}
              className="rounded-[14px] px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-white/[.08]"
              style={{
                color: "var(--fg-high)",
                background: "rgba(255,255,255,.045)",
                border: "1px solid rgba(255,255,255,.10)",
              }}
            >
              Or start with the audio &rarr;
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
