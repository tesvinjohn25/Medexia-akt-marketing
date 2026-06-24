import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { AiAnswerBox } from "@/components/sections/AiAnswerBox";

export const metadata: Metadata = {
  title: "AKT Statistics Formulas: NNT, Sensitivity and PPV",
  description:
    "AKT statistics formulas for MRCGP: sensitivity, specificity, PPV, NPV, absolute risk, relative risk, ARR, ARI, NNT and NNH.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-statistics-formulas",
  },
  openGraph: {
    title: "AKT Statistics Formulas: NNT, Sensitivity and PPV",
    description:
      "A focused AKT formula guide for evidence-based practice questions: diagnostic-test tables, risk reduction, NNT, NNH and interpretation.",
    type: "article",
    url: "https://medexia-akt.com/akt-statistics-formulas",
  },
};

const diagnosticFormulas = [
  {
    name: "Sensitivity",
    formula: "true positives / (true positives + false negatives)",
    meaning: "Of everyone with the disease, how many did the test detect?",
  },
  {
    name: "Specificity",
    formula: "true negatives / (true negatives + false positives)",
    meaning: "Of everyone without the disease, how many did the test correctly exclude?",
  },
  {
    name: "PPV",
    formula: "true positives / (true positives + false positives)",
    meaning: "Of everyone with a positive test, how many truly have the disease?",
  },
  {
    name: "NPV",
    formula: "true negatives / (true negatives + false negatives)",
    meaning: "Of everyone with a negative test, how many truly do not have the disease?",
  },
];

const riskFormulas = [
  {
    name: "Absolute risk",
    formula: "events / total people in group",
    meaning: "The actual event rate in one group.",
  },
  {
    name: "Absolute risk reduction",
    formula: "control event rate - treatment event rate",
    meaning: "The absolute difference in risk between control and treatment.",
  },
  {
    name: "Relative risk reduction",
    formula: "absolute risk reduction / control event rate",
    meaning: "The proportional reduction in risk compared with the control group.",
  },
  {
    name: "Relative risk",
    formula: "treatment event rate / control event rate",
    meaning: "The proportional risk in one group compared with another.",
  },
  {
    name: "NNT",
    formula: "1 / absolute risk reduction",
    meaning: "How many people need treatment for one extra person to benefit.",
  },
  {
    name: "NNH",
    formula: "1 / absolute risk increase",
    meaning: "How many people need exposure for one extra person to be harmed.",
  },
];

const faqs = [
  {
    question: "What statistics formulas do I need for the AKT?",
    answer:
      "The core AKT statistics formulas are sensitivity, specificity, PPV, NPV, absolute risk, relative risk, absolute risk reduction, absolute risk increase, NNT and NNH. You also need to interpret confidence intervals, charts, forest plots and practice-level data.",
  },
  {
    question: "How do I calculate NNT in the AKT?",
    answer:
      "Calculate the absolute risk reduction first, then use NNT = 1 / ARR. If control event rate is 20% and treatment event rate is 15%, ARR is 5% or 0.05, so NNT is 20.",
  },
  {
    question: "How do I remember sensitivity and specificity?",
    answer:
      "Use the disease column first. Sensitivity is true positives divided by everyone with disease. Specificity is true negatives divided by everyone without disease. Then PPV and NPV start from the test result instead.",
  },
  {
    question: "Is AKT statistics only about formulas?",
    answer:
      "No. The AKT also tests interpretation: confidence intervals, graphs, prescribing dashboards, patient risk communication, study design and critical appraisal. Formulas are the base layer, not the whole section.",
  },
];

export default function AktStatisticsFormulasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "AKT Statistics Formulas: NNT, Sensitivity and PPV",
        description:
          "A focused formula guide for MRCGP AKT evidence-based practice and statistics questions.",
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
            name: "AKT Statistics Formulas",
            url: "https://medexia-akt.com/akt-statistics-formulas",
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
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            AKT statistics formulas: NNT, sensitivity, specificity and PPV
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            AKT statistics questions are usually simple once the table is set
            up correctly. Learn the formulas, then practise turning wordy
            scenarios into a 2x2 table or a pair of event rates.
          </p>

          <AiAnswerBox
            eyebrow="Statistics formulas"
            title="Short answer"
            answer={
              <p>
                The core AKT statistics formulas to know are sensitivity,
                specificity, PPV, NPV, ARR, RRR, NNT, NNH and basic
                interpretation of confidence intervals. Most calculation
                questions become straightforward if you build the 2x2 table
                first. For NNT and NNH, convert percentages to decimals before
                using 1 divided by the absolute risk difference.
              </p>
            }
            bestFor={[
              "fast formula review",
              "2x2 table practice",
              "NNT, ARR and RRR questions",
              "diagnostic-test interpretation",
            ]}
            nextSteps={[
              { label: "Revise AKT statistics", href: "/akt-statistics" },
              { label: "Try mock questions", href: "/akt-mock-exam" },
              { label: "Compare revision tools", href: "/best-akt-revision-tool" },
              {
                label: "Start free practice",
                href: "/join/free",
                intent: "start_free",
              },
            ]}
          />

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Diagnostic-test formulas
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {diagnosticFormulas.map((item) => (
                <article
                  key={item.name}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[18px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="mt-2 rounded-lg p-3 text-[13px]"
                    style={{
                      background: "rgba(255,255,255,.035)",
                      color: "var(--fg-high)",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    }}
                  >
                    {item.formula}
                  </p>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.meaning}
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
              Risk and treatment formulas
            </h2>
            <div className="mt-4 grid gap-3">
              {riskFormulas.map((item) => (
                <article
                  key={item.name}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="grid gap-3 md:grid-cols-[180px_1fr] md:items-center">
                    <h3
                      className="text-[16px] font-semibold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="rounded-lg p-3 text-[13px]"
                      style={{
                        background: "rgba(255,255,255,.035)",
                        color: "var(--fg-high)",
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      }}
                    >
                      {item.formula}
                    </p>
                  </div>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.meaning}
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
              Fast setup for a 2x2 table
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Put disease status across the top and test result down the side.
              That gives you true positives, false positives, false negatives
              and true negatives. Sensitivity and specificity start with disease
              status. PPV and NPV start with the test result.
            </p>
            <div
              className="mt-4 overflow-x-auto rounded-xl"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <table className="w-full text-[13px] md:text-[14px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="p-3 text-left"> </th>
                    <th className="p-3 text-left">Disease present</th>
                    <th className="p-3 text-left">Disease absent</th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--fg-mid)" }}>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="p-3 font-semibold">Test positive</td>
                    <td className="p-3">True positive</td>
                    <td className="p-3">False positive</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Test negative</td>
                    <td className="p-3">False negative</td>
                    <td className="p-3">True negative</td>
                  </tr>
                </tbody>
              </table>
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
              AKT statistics formulas FAQ
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
              <a
                href="https://cks.nice.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE Clinical Knowledge Summaries
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
            <a className="btn-primary text-center text-[16px]" href="/akt-statistics">
              Read the statistics guide &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/akt-mock-exam">
              Practise timed mocks
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check RCGP,
            NICE CKS and the BNF for current exam and clinical guidance. Last
            reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
