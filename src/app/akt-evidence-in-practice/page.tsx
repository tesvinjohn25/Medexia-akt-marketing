import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Evidence in Practice and Critical Appraisal Revision",
  description:
    "MRCGP AKT evidence in practice revision: critical appraisal, study design, diagnostic tests, risk communication, shared decisions and applying guidance.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-evidence-in-practice",
  },
  openGraph: {
    title: "MRCGP AKT Evidence in Practice and Critical Appraisal Revision",
    description:
      "A focused AKT guide covering evidence interpretation, study design, diagnostic tests, risk communication, shared decisions and applying guidance in GP.",
    type: "article",
    url: "https://medexia-akt.com/akt-evidence-in-practice",
  },
};

const coreAreas = [
  {
    title: "Study design",
    text: "Know when cohort, case-control, cross-sectional, randomised trial, systematic review and qualitative research designs are most useful.",
  },
  {
    title: "Bias and confounding",
    text: "Revise selection bias, recall bias, lead-time bias, length-time bias, attrition, blinding, allocation concealment and confounding.",
  },
  {
    title: "Diagnostic tests",
    text: "Link sensitivity, specificity, PPV, NPV and likelihood to real GP decisions, especially when prevalence changes the meaning of a result.",
  },
  {
    title: "Risk communication",
    text: "Practise absolute versus relative risk, NNT, NNH, confidence intervals and explaining benefit or harm clearly to patients.",
  },
  {
    title: "Guidelines in practice",
    text: "Understand how to apply NICE, CKS and BNF guidance while allowing for multimorbidity, preferences, capacity and local pathways.",
  },
  {
    title: "Shared decisions",
    text: "Revise option discussion, benefits and harms, decision aids, uncertainty, health literacy and documenting patient-centred decisions.",
  },
];

const traps = [
  "Choosing the biggest relative risk reduction when the absolute benefit is small",
  "Treating a positive screening test as a diagnosis instead of a risk signal needing follow-up",
  "Ignoring prevalence when interpreting PPV or NPV",
  "Assuming statistical significance automatically means clinical importance",
  "Applying a guideline rigidly despite multimorbidity, frailty, pregnancy, capacity or patient preference",
  "Missing bias in a study because the headline conclusion sounds plausible",
];

const faqs = [
  {
    question: "What is evidence in practice in the MRCGP AKT?",
    answer:
      "Evidence in practice is the AKT section covering evidence-based practice, critical appraisal, statistics, data interpretation, study design, diagnostic tests, risk communication and applying evidence safely in GP.",
  },
  {
    question: "How much of the AKT is evidence-based practice?",
    answer:
      "RCGP describes the AKT as 80% clinical knowledge, 10% evidence-based practice including evidence interpretation and 10% primary care organisation and management.",
  },
  {
    question: "What should I revise first for AKT critical appraisal?",
    answer:
      "Start with study design, bias, confounding, confidence intervals, absolute and relative risk, NNT, NNH, sensitivity, specificity, PPV, NPV, forest plots and patient risk communication.",
  },
  {
    question: "Is AKT evidence in practice just statistics?",
    answer:
      "No. Calculations matter, but AKT evidence questions also test how you interpret data, spot bias, communicate risk, use guidelines and make shared decisions in realistic primary-care scenarios.",
  },
];

export default function AktEvidenceInPracticePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Evidence in Practice and Critical Appraisal Revision",
        description:
          "A focused MRCGP AKT guide for evidence interpretation, critical appraisal, study design, diagnostic tests, risk communication and applying guidance in GP.",
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
            name: "AKT Evidence in Practice",
            url: "https://medexia-akt.com/akt-evidence-in-practice",
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
            MRCGP AKT evidence in practice and critical appraisal revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Evidence questions test whether you can interpret research,
            recognise bias, communicate risk and apply guidance safely in real
            primary-care decisions.
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
              For AKT evidence in practice revision, prioritise study design,
              bias, confounding, diagnostic-test interpretation, absolute and
              relative risk, NNT, NNH, confidence intervals, shared decisions
              and applying guidance to individual patients.
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
              What to revise first
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {coreAreas.map((area) => (
                <article
                  key={area.title}
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
                    {area.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {area.text}
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
              Common AKT traps
            </h2>
            <ul
              className="mt-4 grid gap-3 sm:grid-cols-2"
              style={{ color: "var(--fg-mid)" }}
            >
              {traps.map((trap) => (
                <li
                  key={trap}
                  className="rounded-xl p-4 text-[14px] leading-[1.55]"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {trap}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Why this topic catches candidates out
            </h2>
            <div
              className="mt-4 rounded-xl p-4"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-[15px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                The trap is learning formulas in isolation. AKT evidence
                questions often hide the calculation inside a practical
                decision: whether a result changes management, how to explain a
                treatment benefit, or when a guideline does not fit the patient
                in front of you.
              </p>
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
              AKT evidence in practice FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/evidence-in-practice"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP evidence in practice topic guide
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT introduction and content weighting
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-preparing"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT preparation resources
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng197"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE shared decision making guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/evidence-in-practice"
            >
              Open evidence in practice topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-statistics-formulas"
            >
              Review AKT formulas &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, CKS, BNF and local guidance for clinical decisions. Last
            reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
