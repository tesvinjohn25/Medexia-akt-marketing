import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FocusedDemoLauncher } from "@/components/sections/FocusedDemoLauncher";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { SAMPLE_QUESTION } from "@/data/sample-question";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { getOfferPhase, phased } from "@/lib/offer-phase";
import { getAppOrigin } from "@/lib/marketing/url";

const DEMO_QUESTIONS = "/demo/sample-question";
const DEMO_HOME = new URL(DEMO_QUESTIONS, getAppOrigin()).toString();

export const metadata: Metadata = {
  title: "Free MRCGP AKT Sample Questions Demo",
  description:
    "Try five free MRCGP AKT-style sample questions with structured explanations in the focused AKT Navigator question demo. No signup.",
  alternates: {
    canonical: "https://medexia-akt.com/demo",
  },
  openGraph: {
    title: "Free MRCGP AKT Sample Questions Demo",
    description:
      "No account needed: answer five AKT-style sample questions with structured explanations in the focused AKT Navigator question flow.",
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
          "Free, no-signup five-question demo of AKT Navigator with structured explanations and results.",
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
              text: "No. The question demo is completely free and requires no signup. You can answer five AKT-style sample questions with full explanations.",
            },
          },
          {
            "@type": "Question",
            name: "What is in the AKT Navigator demo?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Five AKT-style sample questions. Each answer is followed by a structured explanation — Understanding the Question, Key points, and Why the other options are wrong — before your final results.",
            },
          },
          {
            "@type": "Question",
            name: "Is the AKT Navigator demo free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: phased(
                getOfferPhase(),
                "Yes, the demo is free with no signup. The full product is also free until 8 July 2026; after that questions stay free, £59 Early Access applies before 8 July, and standard full audio access is £79.",
                "Yes, the demo is free with no signup. Questions, timed mocks and structured explanations are free forever, your first 2 hours of AKT audio are free, and full audio access is £79 for 4 months.",
              ),
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

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, #000 0%, rgba(7,5,14,.96) 64%, transparent 100%)",
          }}
        />
        <div className="hero-noise" />
        <div
          data-demo-hero-content
          className="container-x relative grid gap-8 md:grid-cols-[1.02fr_.98fr] md:items-center md:gap-12"
          style={{
            paddingTop:
              "calc(env(safe-area-inset-top, 0px) + clamp(88px, 10vw, 120px))",
            paddingBottom: "clamp(40px, 6vw, 56px)",
          }}
        >
          <div className="max-w-[620px]">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(52,211,153,.86)" }}
            >
              Free MRCGP AKT demo · No signup
            </p>
            <h1
              className="mt-4 text-[38px] leading-[1.02] md:text-[54px] lg:text-[62px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.045em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              Try five free AKT-style sample questions.
            </h1>
            <p
              className="mt-5 max-w-[560px] text-[16px] leading-[1.6] md:text-[18px]"
              style={{ color: "rgba(232,236,255,.76)" }}
            >
              Answer in the real AKT Navigator practice flow, then work through
              Understanding the Question, Key points, and Why the other options
              are wrong.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[430px]">
            <FocusedDemoLauncher
              demoPath={DEMO_QUESTIONS}
              kind="questions"
            />
            <div
              className="mx-auto mt-4 flex max-w-[390px] flex-col items-center gap-2.5 text-center"
              data-focused-demo-cta="questions"
              data-cta-hierarchy="secondary"
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "rgba(232,236,255,.66)" }}
              >
                Ready to keep practising?
              </p>
              <TrackedAppLink
                href="/join/free"
                intent="start_free"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[.035] px-6 text-[14px] font-semibold text-white/75 transition duration-200 hover:border-white/25 hover:bg-white/[.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
              >
                Create a free account
              </TrackedAppLink>
              <p
                className="max-w-[340px] text-[12px] leading-[1.55]"
                style={{ color: "var(--fg-mid)", opacity: 0.65 }}
              >
                The demo needs no account or card. Questions, explanations and
                timed mocks stay free after signup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Worked example — the quality showcase, fully server-rendered so
          search and answer engines can read exactly how questions and
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
                Understanding the Question
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
                Key points
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
            and every answer is broken down like the example above. The
            question bank is AI-assisted and is not individually
            clinician-reviewed item by item. For clinical decisions, use
            current NICE CKS, BNF/BNFC and official guidance.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedAppLink
              href="/join/free"
              intent="start_free"
              className="btn-primary text-[14px]"
            >
              Create your free account &mdash; questions stay free
            </TrackedAppLink>
          </div>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
