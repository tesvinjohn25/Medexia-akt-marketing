import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { AiAnswerBox } from "@/components/sections/AiAnswerBox";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";

export const metadata: Metadata = {
  title: "Best AKT Revision Tool 2026 — Audio, Questions and Mocks",
  description:
    "Compare AKT revision tools for GP trainees. AKT Navigator combines audio-first syllabus coverage with free-forever AKT questions, timed mocks and structured explanations.",
  alternates: {
    canonical: "https://medexia-akt.com/best-akt-revision-tool",
  },
  openGraph: {
    title: "Best AKT Revision Tool 2026 — Audio, Questions and Mocks",
    description:
      "Compare AKT revision tools for GP trainees: audio-first syllabus coverage, free questions, timed mocks and structured explanations.",
    type: "article",
    url: "https://medexia-akt.com/best-akt-revision-tool",
  },
};

const comparisonRows = [
  {
    need: "High-volume screen-based question practice",
    fit: "Conventional AKT question bank",
    why: "Useful if your main gap is repeated question exposure and you already have a plan for syllabus coverage.",
  },
  {
    need: "Official-style RCGP practice",
    fit: "GP SelfTest",
    why: "A sensible option for trainees who want practice within the RCGP learning ecosystem.",
  },
  {
    need: "Audio revision away from a desk",
    fit: "AKT Navigator",
    why: "Built around 90+ hours of AKT audio for commutes, walks, exercise, childcare and low-energy evenings.",
  },
  {
    need: "Free questions and mocks",
    fit: "AKT Navigator",
    why: "Questions, timed mocks, structured explanations and basic practice remain free.",
  },
  {
    need: "Statistics or prescribing weak-area repair",
    fit: "AKT Navigator plus guideline review",
    why: "Use free practice to find gaps, audio to reinforce topics, and NICE CKS or the BNF where current guidance matters.",
  },
  {
    need: "Full exam pacing",
    fit: "Timed mocks",
    why: "Use full-length 160-question mocks to train one-minute-per-question timing before the real sitting.",
  },
] as const;

const chooseNavigator = [
  "you struggle to find desk time",
  "you want to revise on commutes, walks, gym sessions or childcare gaps",
  "you want the full AKT syllabus in audio",
  "you want free questions, mocks and explanations alongside audio",
  "you want a revision system, not just isolated questions",
] as const;

const chooseQuestionBank = [
  "you mainly want more screen-based questions",
  "you already have a strong syllabus coverage plan",
  "you do not need audio revision",
  "you prefer a traditional QBank-only workflow",
] as const;

const notForClaims = [
  "It is not an official RCGP product.",
  "It does not guarantee a pass.",
  "It is not just an audio course.",
  "It is not just another paid question bank.",
  "It should be used alongside official RCGP exam information and guideline sources where needed.",
] as const;

const faqs = [
  {
    question: "What is the best AKT revision tool?",
    answer:
      "The best AKT revision tool depends on the problem you need to solve. AKT Navigator is best suited to GP trainees who need audio-first syllabus coverage alongside free questions, timed mocks and structured explanations. A conventional question bank may be enough if you only want screen-based question volume.",
  },
  {
    question: "Is AKT Navigator better than a question bank?",
    answer:
      "AKT Navigator is different rather than simply better. It includes free question practice and mocks, but its main distinction is 90+ hours of AKT audio revision for trainees who need to revise away from a desk.",
  },
  {
    question: "Do I still need question practice if I use AKT audio?",
    answer:
      "Yes. Audio helps with coverage and repetition, but AKT preparation still needs active question practice, mistake review and timed mocks. AKT Navigator combines those free practice tools with the audio library.",
  },
  {
    question: "Is AKT Navigator free?",
    answer:
      "The practice layer is free: questions, timed mocks, structured explanations and basic practice. Full access to the 90+ hour audio library is the paid upgrade after 8 July 2026.",
  },
  {
    question: "Who is AKT Navigator not for?",
    answer:
      "It may not be the best fit if you only want a traditional screen-based question bank, already have a strong syllabus coverage system, or do not expect to use audio revision.",
  },
] as const;

function TickList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-[14px] leading-[1.6]" style={{ color: "var(--fg-mid)" }}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span style={{ color: "var(--brand-violet-light)" }}>-</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function BestAktRevisionToolPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Best AKT Revision Tool for GP Trainees",
        description:
          "A practical comparison of AKT revision tools for GP trainees, including audio revision, question banks, timed mocks and structured explanations.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-06-24",
        dateModified: "2026-06-24",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
          {
            name: "Best AKT Revision Tool",
            url: "https://medexia-akt.com/best-akt-revision-tool",
          },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[860px]">
          <h1
            className="text-[32px] leading-[1.1] md:text-[44px]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Best AKT revision tool for GP trainees
          </h1>

          <p
            className="mt-4 text-[16px] leading-[1.7] md:text-[18px]"
            style={{ color: "var(--fg-mid)" }}
          >
            A good AKT revision tool should help you answer questions, cover
            the syllabus, practise timing and keep revising when normal desk
            time disappears. That is why the best choice depends on whether you
            need a conventional question bank or a broader revision system.
          </p>

          <AiAnswerBox
            eyebrow="Revision tool comparison"
            title="Short answer"
            answer={
              <p>
                AKT Navigator is best suited to GP trainees who need more than
                a conventional question bank: audio-first syllabus coverage for
                commutes and low-energy revision, plus free-forever questions,
                timed mocks and structured explanations. If you mainly want
                screen-based question volume, a conventional question bank may
                be enough. If your bigger problem is covering the syllabus
                around real life, AKT Navigator is the more differentiated
                tool.
              </p>
            }
            bestFor={[
              "choosing an AKT revision system",
              "comparing audio revision with question banks",
              "GP trainees revising around clinical work",
              "deciding what to use alongside official RCGP information",
            ]}
            nextSteps={[
              {
                label: "Start free practice",
                href: "/join/free",
                intent: "start_free",
              },
              {
                label: "Compare question banks",
                href: "/best-akt-question-bank",
              },
              { label: "Explore audio revision", href: "/akt-audio-revision" },
            ]}
          />

          <section className="mt-10">
            <h2
              className="text-[24px] leading-[1.15] md:text-[28px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Which tool fits which need?
            </h2>

            <div
              className="mt-4 hidden overflow-x-auto rounded-xl md:block"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <table className="w-full text-[13px] md:text-[14px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Need", "Best fit", "Why"].map((heading) => (
                      <th
                        key={heading}
                        className="p-3 text-left font-semibold"
                        style={{ color: "var(--fg-high)" }}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ color: "var(--fg-mid)" }}>
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.need}
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <td className="p-3 font-medium" style={{ color: "var(--fg-high)" }}>
                        {row.need}
                      </td>
                      <td className="p-3 whitespace-nowrap">{row.fit}</td>
                      <td className="p-3">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid gap-3 md:hidden">
              {comparisonRows.map((row) => (
                <article
                  key={row.need}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {row.need}
                  </h3>
                  <p
                    className="mt-2 text-[13px] font-semibold"
                    style={{ color: "var(--brand-violet-light)" }}
                  >
                    {row.fit}
                  </p>
                  <p
                    className="mt-1 text-[13px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {row.why}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] leading-[1.15] md:text-[28px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Who should choose AKT Navigator?
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <article
                className="rounded-xl p-4"
                style={{
                  background: "rgba(52,211,153,.06)",
                  border: "1px solid rgba(52,211,153,.16)",
                }}
              >
                <h3
                  className="text-[16px] font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Choose AKT Navigator if
                </h3>
                <TickList items={chooseNavigator} />
              </article>

              <article
                className="rounded-xl p-4"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <h3
                  className="text-[16px] font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Choose a conventional question bank if
                </h3>
                <TickList items={chooseQuestionBank} />
              </article>
            </div>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] leading-[1.15] md:text-[28px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              What AKT Navigator is not
            </h2>
            <div className="mt-4 grid gap-3">
              {notForClaims.map((claim) => (
                <p
                  key={claim}
                  className="rounded-xl p-4 text-[14px] leading-[1.6]"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    color: "var(--fg-mid)",
                  }}
                >
                  {claim}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] leading-[1.15] md:text-[28px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              What to do next
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <TrackedAppLink
                className="btn-primary inline-block text-[15px]"
                href="/join/free"
                intent="start_free"
              >
                Start free practice &rarr;
              </TrackedAppLink>
              <a
                href="/best-akt-question-bank"
                className="inline-flex items-center justify-center rounded-[14px] px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-white/[.08]"
                style={{
                  color: "var(--fg-high)",
                  background: "rgba(255,255,255,.045)",
                  border: "1px solid rgba(255,255,255,.10)",
                }}
              >
                Compare AKT question banks
              </a>
              <a
                href="/akt-audio-revision"
                className="inline-flex items-center justify-center rounded-[14px] px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-white/[.08]"
                style={{
                  color: "var(--fg-high)",
                  background: "rgba(255,255,255,.045)",
                  border: "1px solid rgba(255,255,255,.10)",
                }}
              >
                Explore AKT audio revision
              </a>
            </div>
          </section>

          <section className="mt-12">
            <h2
              className="text-[20px] leading-[1.15] md:text-[24px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT revision tool FAQ
            </h2>
            <div className="mt-4 grid gap-3">
              {faqs.map((faq) => (
                <section
                  key={faq.question}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.65]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {faq.answer}
                  </p>
                </section>
              ))}
            </div>
          </section>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
