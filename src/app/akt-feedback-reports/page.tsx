import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FeedbackPracticeCTA } from "@/components/sections/FeedbackPracticeCTA";
import {
  AKT_FEEDBACK_REVIEWED_AT,
  AKT_FEEDBACK_REVIEWED_LABEL,
  latestAktReport,
  latestAktPassRateSummary,
} from "@/data/akt-feedback";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Feedback Reports and Weak Areas",
  description:
    "July 2026 MRCGP AKT feedback: 73.17% pass rate, 112/160 pass mark, four difficulty areas and recurring revision themes from the official RCGP report.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-feedback-reports",
  },
  openGraph: {
    title: "MRCGP AKT Feedback Reports and Weak Areas",
    description:
      "July 2026 RCGP AKT feedback: cranial nerves, paediatric joints, skin rashes and respiratory conditions, with practical revision priorities.",
    type: "article",
    url: "https://medexia-akt.com/akt-feedback-reports",
  },
};

const reports = [
  { ...latestAktReport, passRate: latestAktReport.overallPassRate },
  {
    sitting: "April 2026",
    exam: "AKT 59",
    passRate: "80.22%",
    passMark: "107 / 160",
    weakAreas: [
      "Monitoring for common medications",
      "Prescribing errors",
      "Data protection around recorded consultations",
      "Safeguarding children and confidentiality",
      "Minor illnesses",
    ],
    source:
      "https://www.rcgp.org.uk/getmedia/efd08d10-8c08-4a6a-a0d5-9a528256f4c8/April-2026-AKT-feedback-report.pdf",
  },
  {
    sitting: "January 2026",
    exam: "AKT 58",
    passRate: "76.52%",
    passMark: "108 / 160",
    weakAreas: [
      "Palliative care symptom management",
      "Common ophthalmology diagnoses",
      "Practice chart interpretation",
      "Neurological symptoms",
      "Biochemical disturbance interpretation",
    ],
    source:
      "https://www.rcgp.org.uk/getmedia/124946b0-3c0d-4337-8c1d-406c53a51cf2/January-2026-AKT-feedback-report.pdf",
  },
  {
    sitting: "October 2025",
    exam: "AKT 57",
    passRate: "70.63%",
    passMark: "109 / 160",
    weakAreas: [
      "Side-effects of long-term medication",
      "Confidentiality guidance",
      "Paediatric cancer, acute illness and safeguarding",
      "Important neurological presentations",
    ],
    source:
      "https://www.rcgp.org.uk/getmedia/0736ec09-1f0f-4a7f-ab26-722e8da4d5a1/October-2025-AKT-feedback-report.pdf",
  },
];

const recurringThemes = [
  {
    title: "AKT neurology",
    detail: "Highlighted in three of the last four sittings: symptoms, diagnosis and cranial nerves.",
    href: "/akt-neurology",
  },
  {
    title: "AKT children and young people",
    detail: "Highlighted in three of the last four sittings: acute illness, safeguarding and joint problems.",
    href: "/akt-children-young-people",
  },
  {
    title: "AKT prescribing and medication safety",
    detail: "Highlighted in two of the last four sittings: long-term medication side effects and prescribing errors.",
    href: "/akt-prescribing-and-medication-safety",
  },
  {
    title: "AKT confidentiality and data protection",
    detail: "Highlighted in two of the last four sittings: data protection and confidentiality guidance.",
    href: "/akt-confidentiality-safeguarding-data-protection",
  },
];

const julyRevisionTopics = [
  { title: "Cranial-nerve presentations", href: "/akt-neurology" },
  { title: "Joint disorders in children", href: "/akt-children-young-people" },
  { title: "Skin-rash diagnosis", href: "/akt-dermatology" },
  { title: "Common respiratory conditions", href: "/akt-respiratory" },
];

const faqs = [
  {
    question: "What did the latest AKT feedback report say?",
    answer:
      "The July 2026 RCGP AKT report highlighted cranial-nerve presentations, joint disorders in children, skin-rash diagnosis and common respiratory conditions. These are curriculum themes, not recalled examination questions.",
  },
  {
    question: "Which AKT topics keep coming up in feedback reports?",
    answer:
      "The July report summarises AKTs 57–60: neurology and child health appeared in three of four sittings; prescribing safety and confidentiality/data protection appeared in two of four.",
  },
  {
    question: "Should I revise only the topics in the feedback reports?",
    answer:
      "No. The feedback reports show useful weak-area patterns, but the AKT still tests the full RCGP curriculum. Use the reports to weight your revision, not to narrow it too far.",
  },
];

export default function AktFeedbackReportsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Feedback Reports and Weak Areas",
        description:
          "Recent official RCGP AKT feedback reports summarised into recurring weak areas and practical revision priorities.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-06-19",
        dateModified: AKT_FEEDBACK_REVIEWED_AT,
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
            name: "MRCGP AKT Feedback Reports",
            url: "https://medexia-akt.com/akt-feedback-reports",
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
            MRCGP AKT feedback reports: latest weak areas
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The official RCGP AKT feedback reports are one of the best ways to
            spot recurring exam weaknesses. The latest official report covers the
            {" "}{latestAktReport.date} sitting ({latestAktReport.exam}). Use its
            findings to choose a manageable starting point for revision.
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
              Latest official report: {latestAktReport.sitting} AKT
            </h2>
            <p
              className="mt-2 text-[14px] leading-[1.65]"
              style={{ color: "var(--fg-mid)" }}
            >
              {latestAktPassRateSummary} RCGP highlighted cranial-nerve
              presentations, joint disorders in children, skin-rash diagnosis
              and common respiratory conditions. These are broad curriculum
              themes, not recalled examination questions. Use them to weight
              revision while maintaining full syllabus coverage.
            </p>
          </div>

          <section className="mt-10">
            <h2 className="text-[24px] md:text-[28px] leading-[1.15]" style={{ fontFamily: "var(--font-display)" }}>
              Start with one of July&apos;s four themes
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: "var(--fg-mid)" }}>
              Choose a topic guide, try free practice and review the gaps you
              find. Add other curriculum areas as you go.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {julyRevisionTopics.map((topic) => (
                <a key={topic.href} href={topic.href} className="btn-secondary text-center">
                  {topic.title} &rarr;
                </a>
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
              Latest official AKT feedback reports
            </h2>

            <div className="mt-4 grid gap-3">
              {reports.map((report) => (
                <article
                  key={report.sitting}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3
                        className="text-[17px] font-semibold"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {report.sitting} {report.exam}
                      </h3>
                      <p
                        className="mt-1 text-[13px]"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Pass rate {report.passRate} · pass mark{" "}
                        {report.passMark}
                      </p>
                    </div>
                    <a
                      href={report.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-medium transition-colors"
                      style={{ color: "var(--brand-violet-light)" }}
                    >
                      RCGP PDF
                    </a>
                  </div>

                  <ul
                    className="mt-4 grid gap-2 text-[14px] leading-[1.55] sm:grid-cols-2"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {report.weakAreas.map((area) => (
                      <li key={area} className="flex gap-2">
                        <span style={{ color: "var(--brand-emerald)" }}>
                          -
                        </span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
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
              Recurring themes across AKTs 57–60
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {recurringThemes.map((theme) => (
                <article
                  key={theme.title}
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
                    <a
                      href={theme.href}
                      className="transition-colors"
                      style={{ color: "var(--brand-violet-light)" }}
                    >
                      {theme.title}
                    </a>
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {theme.detail}
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
              How to use the feedback reports
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "Use them to weight revision, not replace the syllabus",
                  text: "The reports identify patterns, but the AKT still tests the full RCGP curriculum. Keep broad coverage and add extra time for recurring weak areas.",
                },
                {
                  title: "Turn repeated themes into short daily blocks",
                  text: "Choose one topic, practise a short set of questions and revisit the gaps before moving on.",
                },
                {
                  title: "Practise under the 160-question timing",
                  text: "The current AKT format is 160 questions in 160 minutes. Weak topics become more dangerous when you also run out of time.",
                },
              ].map((item) => (
                <article
                  key={item.title}
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
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
            <p
              className="mt-4 text-[15px] leading-[1.65]"
              style={{ color: "var(--fg-mid)" }}
            >
              For full coverage, keep the{" "}
              <a
                href="/akt-syllabus"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT syllabus
              </a>{" "}
              open alongside feedback-report themes.
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
              AKT feedback report FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/further-help-support"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT feedback reports page
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
                href="https://bnf.nice.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                BNF
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary text-center text-[16px]" href="/topics">
              Review all AKT topics &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-mock-exam"
            >
              Try timed AKT mocks
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Figures and weak-area summaries are based on official RCGP AKT
            feedback reports. Last reviewed {AKT_FEEDBACK_REVIEWED_LABEL}.
          </p>
        </div>
      </section>

      <FeedbackPracticeCTA />
      <MinimalFooter />
    </main>
  );
}
