import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { EXAM_FORMAT } from "@/data/exam-dates";

export const metadata: Metadata = {
  title: "MRCGP AKT Exam Format, Sections and Marking",
  description:
    "MRCGP AKT exam format: 160 questions, 2 hours 40 minutes, section weighting, no negative marking, ST2/ST3 eligibility and pass-mark rules.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-exam-format",
  },
  openGraph: {
    title: "MRCGP AKT Exam Format, Sections and Marking",
    description:
      "Current AKT format for GP trainees: 160 single-best-answer questions, one minute per question, section weighting, eligibility and marking.",
    type: "article",
    url: "https://medexia-akt.com/akt-exam-format",
  },
};

const facts = [
  {
    label: "Questions",
    value: `${EXAM_FORMAT.questions}`,
    detail:
      "Single-best-answer style questions, updated from the previous 200-question format in October 2025.",
  },
  {
    label: "Duration",
    value: EXAM_FORMAT.durationLabel,
    detail:
      "One minute per question. Pacing matters because the exam rewards efficient clinical problem-solving.",
  },
  {
    label: "Clinical",
    value: "80%",
    detail:
      "The largest section, focused on UK general practice clinical knowledge and problem-solving.",
  },
  {
    label: "Evidence + admin",
    value: "20%",
    detail:
      "10% evidence-based practice and 10% primary care organisation and management.",
  },
];

const sections = [
  {
    title: "Clinical knowledge",
    weight: "80%",
    text: "Most AKT questions test applied clinical knowledge in UK general practice. The RCGP curriculum topic guides are the best map of the areas you need to cover.",
  },
  {
    title: "Evidence-based practice",
    weight: "10%",
    text: "This includes evidence interpretation, critical appraisal, diagnostic-test statistics, risk, confidence intervals, study design and graph interpretation.",
  },
  {
    title: "Organisation and management",
    weight: "10%",
    text: "This includes administrative, ethical, regulatory and statutory frameworks, plus common professional and primary care systems questions.",
  },
];

const faqs = [
  {
    question: "How many questions are in the MRCGP AKT?",
    answer:
      "From October 2025, the RCGP AKT has 160 single-best-answer style questions answered in 2 hours 40 minutes. Before October 2025, the exam used 200 questions in 3 hours 10 minutes.",
  },
  {
    question: "How much time do you get per AKT question?",
    answer:
      "The current format gives one minute per question: 160 questions in 160 minutes. Timed practice is important because candidates need to move on when uncertain.",
  },
  {
    question: "Is there negative marking in the AKT?",
    answer:
      "No. The RCGP standard-setting FAQ says there is no negative marking in the AKT, so candidates should answer every question.",
  },
  {
    question: "What is the AKT pass mark?",
    answer:
      "There is no fixed pass mark. The pass mark varies by sitting because the RCGP adjusts it to reflect measured difficulty using standard-setting and equating methods.",
  },
];

export default function AktExamFormatPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Exam Format, Sections and Marking",
        description:
          "Current RCGP AKT exam format, section weighting, timing, eligibility and pass-mark rules for GP trainees.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-06-20",
        dateModified: "2026-06-20",
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
            name: "MRCGP AKT Exam Format",
            url: "https://medexia-akt.com/akt-exam-format",
          },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[820px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            MRCGP AKT exam format, sections and marking
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The Applied Knowledge Test is the computer-based MRCGP knowledge
            exam for GP trainees. The current format is shorter than the old
            200-question exam, but the pacing is tighter: one question per
            minute across clinical, evidence and organisation topics.
          </p>

          <div
            className="mt-6 rounded-xl p-4"
            style={{
              background: "rgba(52,211,153,.06)",
              border: "1px solid rgba(52,211,153,.18)",
            }}
          >
            <h2
              className="text-[18px] font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quick answer
            </h2>
            <p
              className="mt-2 text-[14px] leading-[1.65]"
              style={{ color: "var(--fg-mid)" }}
            >
              From October 2025, the MRCGP AKT has{" "}
              <strong>{EXAM_FORMAT.questions} single-best-answer questions</strong>{" "}
              in <strong>{EXAM_FORMAT.durationLabel}</strong>. The exam is 80%
              clinical knowledge, 10% evidence-based practice and 10% primary
              care organisation and management. There is no negative marking,
              and the pass mark varies by sitting.
            </p>
          </div>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Current AKT format at a glance
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <article
                  key={fact.label}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-[11px] uppercase"
                    style={{
                      color: "var(--fg-muted)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {fact.label}
                  </p>
                  <h3
                    className="mt-2 text-[28px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {fact.value}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {fact.detail}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              What the AKT tests
            </h2>
            <div className="mt-4 grid gap-3">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className="text-[16px] font-semibold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {section.title}
                    </h3>
                    <span
                      className="text-[18px] font-semibold"
                      style={{ color: "var(--brand-iris)" }}
                    >
                      {section.weight}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {section.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Marking and pass mark
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              There is no negative marking in the AKT, so leaving questions
              blank is not a good strategy. The pass mark is not fixed in
              advance. RCGP standard-setting guidance explains that the pass
              mark varies by sitting because it reflects the measured difficulty
              of the paper.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Recent official feedback reports show pass marks of 107/160 in
              April 2026, 108/160 in January 2026 and 109/160 in October 2025.
              For planning, use timed mocks to build a margin above recent pass
              marks rather than aiming for a borderline score.
            </p>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Eligibility, attempts and sitting
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The RCGP says trainees can take the AKT during or after ST2. A
              maximum of four attempts applies to trainees already in training
              on 1 August 2023. A maximum of six attempts applies to trainees
              entering GP specialty training for the first time on or after 2
              August 2023.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The exam is computer-based and sat at Pearson VUE test centres.
              RCGP runs it four times a year in January, April, July and
              October. Check the current{" "}
              <a
                href="/akt-exam-dates"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT exam dates
              </a>{" "}
              before choosing a sitting, use the{" "}
              <a
                href="/akt-exam-day"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT exam-day guide
              </a>{" "}
              for Pearson VUE logistics, and use the{" "}
              <a
                href="/akt-syllabus"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT syllabus guide
              </a>{" "}
              to map what the exam can test.
            </p>
          </section>

          <section className="mt-10">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT format FAQ
            </h2>
            <div className="mt-4 grid gap-3">
              {faqs.map((faq) => (
                <article
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
                </article>
              ))}
            </div>
          </section>

          <section
            className="mt-10 rounded-xl p-4"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-[18px] font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Official sources
            </h2>
            <div
              className="mt-3 grid gap-2 text-[14px]"
              style={{ color: "var(--fg-mid)" }}
            >
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP introducing the AKT
              </a>
              <a
                href="https://www.rcgp.org.uk/getmedia/d22734f1-a57c-4486-a0bd-e319b1172a89/2025-AKT-standard-setting-maintenance-faqs.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT standard setting FAQ
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/clinical-topic-guides"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP curriculum topic guides
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/further-help-support"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT feedback reports
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/mrcgp-exam-applications"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP exam applications
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary text-center text-[16px]" href="/akt-mock-exam">
              Practise timed mocks &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/akt-revision-plan">
              Build a revision plan
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Exam-format details should be checked against the RCGP before
            booking. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
