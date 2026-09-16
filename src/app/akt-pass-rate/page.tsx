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
  title: "MRCGP AKT Pass Rate and Pass Mark",
  description:
    "July 2026 MRCGP AKT pass rate: 73.17% of 1,308 candidates passed; pass mark 112/160. Compare recent sittings using official RCGP feedback reports.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-pass-rate",
  },
  openGraph: {
    title: "MRCGP AKT Pass Rate and Pass Mark",
    description:
      "July 2026 AKT: 73.17% overall pass rate, 112/160 pass mark and 1,308 candidates. Official RCGP figures with recent sitting comparisons.",
    type: "article",
    url: "https://medexia-akt.com/akt-pass-rate",
  },
};

const reports = [
  latestAktReport,
  {
    sitting: "April 2026",
    exam: "AKT 59",
    candidates: "1,440",
    passMark: "107 / 160",
    overallPassRate: "80.22%",
    firstTimePassRate: "88.68%",
    source:
      "https://www.rcgp.org.uk/getmedia/efd08d10-8c08-4a6a-a0d5-9a528256f4c8/April-2026-AKT-feedback-report.pdf",
  },
  {
    sitting: "January 2026",
    exam: "AKT 58",
    candidates: "1,222",
    passMark: "108 / 160",
    overallPassRate: "76.52%",
    firstTimePassRate: "88.39%",
    source:
      "https://www.rcgp.org.uk/getmedia/124946b0-3c0d-4337-8c1d-406c53a51cf2/January-2026-AKT-feedback-report.pdf",
  },
  {
    sitting: "October 2025",
    exam: "AKT 57",
    candidates: "1,583",
    passMark: "109 / 160",
    overallPassRate: "70.63%",
    firstTimePassRate: "88.84%",
    source:
      "https://www.rcgp.org.uk/getmedia/0736ec09-1f0f-4a7f-ab26-722e8da4d5a1/October-2025-AKT-feedback-report.pdf",
  },
];

const sourceLinks = [
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/further-help-support",
    label: "RCGP: AKT feedback reports",
  },
  ...reports.map((report) => ({
    href: report.source,
    label: `RCGP: ${report.sitting} AKT feedback report`,
  })),
];

const faqs = [
  {
    question: "What is the MRCGP AKT pass rate?",
    answer: latestAktPassRateSummary,
  },
  {
    question: "What score do you need to pass the AKT?",
    answer:
      "There is no fixed score that guarantees a pass. The pass mark is set for each sitting. The July 2026 pass mark was 112 out of 160 (70%), compared with 107 out of 160 in April and 108 out of 160 in January 2026.",
  },
  {
    question: "Is 75% enough to pass the AKT?",
    answer:
      "75% exceeded the July 2026 pass mark of 70%, but future pass marks vary. A question-bank or mock percentage cannot guarantee an exam result: difficulty and candidate groups differ.",
  },
];

export default function AktPassRatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Pass Rate and Pass Mark",
        description:
          "Recent official RCGP AKT pass rates and pass marks for GP trainees preparing for the MRCGP Applied Knowledge Test.",
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
            name: "MRCGP AKT Pass Rate",
            url: "https://medexia-akt.com/akt-pass-rate",
          },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[760px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            MRCGP AKT pass rate and pass mark
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The latest official RCGP report covers {latestAktReport.date}.
            The overall pass rate was {latestAktReport.overallPassRate}, compared
            with 80.22% in April 2026 and 76.52% in January 2026.
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
              {latestAktPassRateSummary} UKG means UK graduate; the first-time
              figure is a subgroup rate, not the rate for all first attempts.
              The pass mark (70% of available marks) and the pass rate (the
              proportion of candidates who passed) describe different things.
            </p>
          </div>

          <p className="mt-6 text-[15px] leading-[1.65]" style={{ color: "var(--fg-mid)" }}>
            For a practical next step, explore the{" "}
            <a href="/akt-feedback-reports" className="font-medium" style={{ color: "var(--brand-violet-light)" }}>
              four revision themes in July&apos;s feedback report
            </a>.
          </p>

          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Recent official AKT pass rates
            </h2>
            <div className="mt-4 grid gap-3 md:hidden">
              {reports.map((report) => (
                <article
                  key={report.sitting}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className="text-[16px] font-semibold"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {report.sitting}
                      </h3>
                      <p
                        className="mt-1 text-[12px]"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {report.exam} · {report.candidates} candidates
                      </p>
                    </div>
                    <a
                      href={report.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[13px] font-medium transition-colors"
                      style={{ color: "var(--brand-violet-light)" }}
                    >
                      RCGP PDF
                    </a>
                  </div>

                  <dl className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      ["Pass mark", report.passMark],
                      ["All passed", report.overallPassRate],
                      ["UKG first", report.firstTimePassRate],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt
                          className="text-[10px] uppercase"
                          style={{
                            color: "var(--fg-muted)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {label}
                        </dt>
                        <dd
                          className="mt-1 text-[14px] font-semibold"
                          style={{ color: "var(--fg-high)" }}
                        >
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>

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
                    {[
                      "Sitting",
                      "Candidates",
                      "Pass mark",
                      "All candidates",
                      "UKG first-time",
                      "Source",
                    ].map((h) => (
                      <th
                        key={h}
                        className="p-3 text-left font-semibold whitespace-nowrap"
                        style={{ color: "var(--fg-high)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ color: "var(--fg-mid)" }}>
                  {reports.map((report) => (
                    <tr
                      key={report.sitting}
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <td className="p-3 whitespace-nowrap">
                        <strong style={{ color: "var(--fg-high)" }}>
                          {report.sitting}
                        </strong>
                        <br />
                        <span style={{ color: "var(--fg-muted)" }}>
                          {report.exam}
                        </span>
                      </td>
                      <td className="p-3">{report.candidates}</td>
                      <td className="p-3 whitespace-nowrap">
                        {report.passMark}
                      </td>
                      <td className="p-3">{report.overallPassRate}</td>
                      <td className="p-3">{report.firstTimePassRate}</td>
                      <td className="p-3">
                        <a
                          href={report.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium transition-colors"
                          style={{ color: "var(--brand-violet-light)" }}
                        >
                          RCGP PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Why the AKT pass mark changes
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The AKT does not have a single fixed pass mark. The pass mark is
              set for each sitting, so a raw score that passed one paper may not
              be exactly the same threshold on another. Since October 2025, the
              UK MRCGP AKT has used a 160-question format over 2 hours and 40
              minutes.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              For revision planning, treat the recent pass marks as a
              reference rather than a guarantee. Mock scores depend on the
              question set, so use them to identify gaps and practise pacing. The{" "}
              <a
                href="/akt-exam-format"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT exam format guide
              </a>{" "}
              explains why the pass mark varies and how the current 160-question
              paper is weighted. If you are reviewing an unsuccessful sitting,
              use the{" "}
              <a
                href="/akt-results-and-retakes"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT results and retakes guide
              </a>{" "}
              to turn the score report into a next-attempt plan.
            </p>
          </div>

          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              How to use this in revision
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "Use full timed mocks",
                  text: "The current AKT format is 160 questions in 160 minutes. Practise the pacing, not just the knowledge.",
                },
                {
                  title: "Look beyond the overall score",
                  text: "A pass-level score can hide weak statistics, prescribing or organisation topics. Break down your result by topic.",
                },
                {
                  title: "Leave a margin",
                  text: "Because the pass mark varies, aim above recent pass marks rather than trying to scrape the line.",
                },
              ].map((item) => (
                <div
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
                    className="mt-1 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT pass rate FAQ
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
          </div>

          <section
            className="mt-10 rounded-xl p-4"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Official sources
            </h2>
            <p
              className="mt-3 text-[14px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              This page is independent of the RCGP. Pass rates, pass marks,
              candidate counts and first-time taker figures are checked against
              the public RCGP AKT feedback report list and the individual
              feedback report PDFs.
            </p>
            <div className="mt-4 grid gap-2">
              {sourceLinks.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl px-4 py-3 text-[13px] font-medium transition-colors hover:bg-white/[.05]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--fg-high)",
                  }}
                >
                  {source.label} &rarr;
                </a>
              ))}
            </div>
          </section>

          <div className="mt-10">
            <a
              className="btn-primary inline-block text-[16px]"
              href="/akt-mock-exam"
            >
              Try timed AKT mocks &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Figures sourced from RCGP AKT feedback reports. Last reviewed {AKT_FEEDBACK_REVIEWED_LABEL}.
          </p>
        </div>
      </section>

      <FeedbackPracticeCTA />
      <MinimalFooter />
    </main>
  );
}
