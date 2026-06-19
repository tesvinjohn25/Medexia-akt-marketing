import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Statistics and Evidence Revision",
  description:
    "MRCGP AKT statistics revision: evidence-based practice topics, key formulas, data interpretation, NNT, sensitivity, specificity and chart reading.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-statistics",
  },
  openGraph: {
    title: "MRCGP AKT Statistics and Evidence Revision",
    description:
      "A practical guide to the AKT statistics and evidence-based practice section, with formulas, weak areas and revision priorities.",
    type: "article",
    url: "https://medexia-akt.com/akt-statistics",
  },
};

const formulae = [
  {
    name: "Absolute risk",
    formula: "events / total people",
    note: "Use this before comparing treatment and control groups.",
  },
  {
    name: "Absolute risk reduction",
    formula: "control event rate - treatment event rate",
    note: "The difference in absolute risk between two groups.",
  },
  {
    name: "Relative risk",
    formula: "risk in treatment group / risk in control group",
    note: "Tells you how risk changes proportionally, not the absolute benefit.",
  },
  {
    name: "NNT",
    formula: "1 / absolute risk reduction",
    note: "Lower NNT means fewer patients need treatment for one to benefit.",
  },
  {
    name: "NNH",
    formula: "1 / absolute risk increase",
    note: "Higher NNH means harm is less frequent.",
  },
  {
    name: "Sensitivity",
    formula: "true positives / all with disease",
    note: "Useful for ruling out when a sensitive test is negative.",
  },
  {
    name: "Specificity",
    formula: "true negatives / all without disease",
    note: "Useful for ruling in when a specific test is positive.",
  },
  {
    name: "PPV",
    formula: "true positives / all positive tests",
    note: "Depends heavily on prevalence.",
  },
];

const topics = [
  "Sensitivity, specificity, PPV and NPV",
  "Absolute risk, relative risk, ARR, ARI, NNT and NNH",
  "Confidence intervals and statistical significance",
  "Forest plots, bar charts and prescribing dashboards",
  "Study designs and common research terminology",
  "Practice-level data, prescribing rates and referral data",
];

const faqs = [
  {
    question: "How much of the AKT is statistics?",
    answer:
      "The RCGP describes the AKT as 80% clinical knowledge, 10% evidence-based practice and critical appraisal, and 10% primary care organisation and management. The statistics and data interpretation material sits mainly in that evidence-based practice section.",
  },
  {
    question: "What statistics formulas do I need for the AKT?",
    answer:
      "You should be comfortable with absolute risk, relative risk, absolute risk reduction, absolute risk increase, NNT, NNH, sensitivity, specificity, PPV and NPV. You also need to interpret charts, confidence intervals, forest plots and practice-level data.",
  },
  {
    question: "Is AKT statistics only calculations?",
    answer:
      "No. The RCGP data interpretation material includes graph reading, prescribing data, confidence intervals, PPV, absolute and relative risk, forest plots, patient risk communication, NNT and NNH. Recent feedback reports also highlight practice chart interpretation and study design terminology.",
  },
];

export default function AktStatisticsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Statistics and Evidence Revision",
        description:
          "A practical guide to the statistics, evidence-based practice and data interpretation topics tested in the MRCGP AKT.",
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
            name: "MRCGP AKT Statistics",
            url: "https://medexia-akt.com/akt-statistics",
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
            MRCGP AKT statistics and evidence revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Statistics is not just a formula section. In the AKT, evidence-based
            practice includes data interpretation, charts, prescribing data,
            confidence intervals, risk communication, study design terminology
            and the calculations trainees often avoid.
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
              The AKT is 10% evidence-based practice and critical appraisal.
              Prioritise sensitivity, specificity, PPV, NPV, absolute risk,
              relative risk, NNT, NNH, confidence intervals, forest plots,
              practice charts and common study design terms.
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
              What to revise for AKT statistics
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {topics.map((topic) => (
                <div
                  key={topic}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-[14px] font-medium leading-[1.5]"
                    style={{ color: "var(--fg-high)" }}
                  >
                    {topic}
                  </p>
                </div>
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
              Key formulas
            </h2>
            <div className="mt-4 grid gap-3">
              {formulae.map((item) => (
                <article
                  key={item.name}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3
                      className="text-[16px] font-semibold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="font-mono text-[13px]"
                      style={{ color: "var(--brand-emerald)" }}
                    >
                      {item.formula}
                    </p>
                  </div>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.note}
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
              How to revise statistics without wasting time
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              If you want the compact version, use the{" "}
              <a
                href="/akt-statistics-formulas"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT statistics formulas guide
              </a>{" "}
              for NNT, NNH, sensitivity, specificity, PPV and NPV.
            </p>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "Start with interpretation, then formulas",
                  text: "The RCGP data interpretation examples are built around real GP problems: prescribing, referral data, risk communication and patient decisions. Do not only memorise equations.",
                },
                {
                  title: "Practise the table first",
                  text: "For diagnostic test questions, write true positive, false positive, false negative and true negative in the same order every time before calculating sensitivity, specificity, PPV or NPV.",
                },
                {
                  title: "Use audio for repeated exposure",
                  text: "Statistics is easier when the language becomes familiar. AKT Navigator includes a statistics course and over 2 hours of statistics explainer videos in paid access.",
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
          </section>

          <section className="mt-10">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT statistics FAQ
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
                RCGP AKT exam structure
              </a>
              <a
                href="https://www.rcgp.org.uk/getmedia/e2ba263c-385f-4e3c-9fc4-7bd13beeca40/Evidence-and-data-interpretation-in-the-AKT-Nov-2019-%281%29.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP data interpretation in the AKT
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
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary text-center text-[16px]" href="/demo">
              Try the free demo &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-audio-revision"
            >
              Explore AKT audio revision
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Source links are provided for exam structure and RCGP data
            interpretation examples. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
