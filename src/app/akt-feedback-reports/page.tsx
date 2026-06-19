import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Feedback Reports and Weak Areas",
  description:
    "Latest MRCGP AKT feedback report summary: April 2026 weak areas, recurring RCGP themes, pass rates, and what GP trainees should revise next.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-feedback-reports",
  },
  openGraph: {
    title: "MRCGP AKT Feedback Reports and Weak Areas",
    description:
      "Recent RCGP AKT feedback reports summarised into the weak areas GP trainees should prioritise.",
    type: "article",
    url: "https://medexia-akt.com/akt-feedback-reports",
  },
};

const reports = [
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
    title: "Neurology",
    detail:
      "Recognition of symptoms, diagnosis, gait disturbance and important neurological presentations appear repeatedly in recent RCGP feedback.",
  },
  {
    title: "AKT prescribing and medication safety",
    detail:
      "Recent reports repeatedly mention side effects, drug monitoring, common medication monitoring and prescribing errors.",
    href: "/akt-prescribing-and-medication-safety",
  },
  {
    title: "Evidence and statistics",
    detail:
      "Practice chart interpretation and common study design terminology recur across recent reports.",
  },
  {
    title: "AKT confidentiality and data protection",
    detail:
      "Data protection, recorded consultations, access to records and confidentiality guidance are recurring professional topics.",
    href: "/akt-confidentiality-safeguarding-data-protection",
  },
  {
    title: "AKT safeguarding and children",
    detail:
      "Acute illness, safeguarding, confidentiality, paediatric cancer and other child-health presentations recur in recent feedback.",
    href: "/akt-confidentiality-safeguarding-data-protection",
  },
];

const faqs = [
  {
    question: "What did the latest AKT feedback report say?",
    answer:
      "The April 2026 RCGP AKT feedback report highlighted difficulty with monitoring common medications, prescribing errors, data protection around recorded consultations, safeguarding children and confidentiality, and minor illnesses.",
  },
  {
    question: "Which AKT topics keep coming up in feedback reports?",
    answer:
      "Across recent reports, recurring themes include neurology, prescribing and medication safety, evidence in practice and chart interpretation, leadership and confidentiality, and children and safeguarding.",
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
        dateModified: "2026-06-19",
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
            spot recurring exam weaknesses. The latest report is April 2026, and
            the clearest repeated themes are neurology, prescribing, statistics
            and evidence, confidentiality, and children&apos;s safeguarding.
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
              In the April 2026 AKT feedback report, candidates struggled with
              common medication monitoring, prescribing errors, data protection
              around recorded consultations, safeguarding confidentiality, and
              minor illnesses. Across the past year, neurology is the strongest
              repeated signal.
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
              Recurring AKT weak areas
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
                    {"href" in theme ? (
                      <a
                        href={theme.href}
                        className="transition-colors"
                        style={{ color: "var(--brand-violet-light)" }}
                      >
                        {theme.title}
                      </a>
                    ) : (
                      theme.title
                    )}
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
                  text: "Neurology, prescribing, confidentiality and statistics are easier to improve when you practise them repeatedly in small sessions.",
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
            feedback reports. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
