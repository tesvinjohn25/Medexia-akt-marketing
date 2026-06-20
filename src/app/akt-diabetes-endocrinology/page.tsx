import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Diabetes and Endocrinology Revision",
  description:
    "MRCGP AKT diabetes and endocrinology revision: type 2 diabetes, thyroid tests, HbA1c, SGLT2 inhibitors, sick-day rules, obesity and adrenal red flags.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-diabetes-endocrinology",
  },
  openGraph: {
    title: "MRCGP AKT Diabetes and Endocrinology Revision",
    description:
      "A focused AKT diabetes and endocrinology guide covering diabetes medicines, thyroid tests, sick-day rules, obesity, adrenal disease and calcium.",
    type: "article",
    url: "https://medexia-akt.com/akt-diabetes-endocrinology",
  },
};

const coreAreas = [
  {
    title: "Type 2 diabetes medicines",
    text: "Revise metformin, SGLT2 inhibitors, GLP-1 receptor agonists, insulin escalation, cardiovascular or renal indications, contraindications and when HbA1c targets change.",
  },
  {
    title: "Diabetes monitoring and complications",
    text: "Know HbA1c, blood pressure, lipids, urine ACR, eGFR, foot checks, retinal screening, hypoglycaemia, DKA and hyperosmolar hyperglycaemic state.",
  },
  {
    title: "Sick-day rules",
    text: "Understand medication pauses during acute illness, dehydration risk, ketone testing, insulin safety and steroid sick-day rules in adrenal insufficiency.",
  },
  {
    title: "Thyroid disease",
    text: "Focus on TSH and free T4 interpretation, subclinical disease, levothyroxine monitoring, Graves' disease, carbimazole risks and thyroid red flags.",
  },
  {
    title: "Obesity and metabolic risk",
    text: "Revise BMI and waist-to-height assessment, ethnicity and risk, hypertension, lipids, NAFLD, sleep apnoea, weight-management medicines and bariatric referral principles.",
  },
  {
    title: "Adrenal and calcium disorders",
    text: "Recognise Addison's disease, steroid emergency rules, hypercalcaemia, primary hyperparathyroidism, malignancy patterns, osteoporosis and vitamin D deficiency.",
  },
];

const redFlags = [
  "Suspected diabetic ketoacidosis, hyperosmolar hyperglycaemic state or severe hypoglycaemia",
  "Vomiting, dehydration or acute illness in someone taking insulin or SGLT2 inhibitors",
  "Possible adrenal crisis: collapse, hypotension, vomiting, sepsis or missed steroids",
  "Thyroid storm, severe thyrotoxicosis, new atrial fibrillation or eye emergency",
  "Hypercalcaemia with confusion, dehydration, renal impairment or suspected malignancy",
  "Rapid unexplained weight loss, pancreatic symptoms or atypical diabetes presentation",
];

const faqs = [
  {
    question: "Is diabetes and endocrinology high yield for the MRCGP AKT?",
    answer:
      "Yes. The RCGP metabolic and endocrinology topic includes diabetes, thyroid disease, obesity, adrenal disease, calcium disorders, biochemical test interpretation, chronic disease monitoring and endocrine emergencies.",
  },
  {
    question: "What diabetes topics should I revise for the AKT?",
    answer:
      "Prioritise type 2 diabetes medicines, HbA1c targets, SGLT2 inhibitor cautions, GLP-1 receptor agonists, insulin safety, hypoglycaemia, DKA, HHS, urine ACR, eGFR, foot checks and retinal screening.",
  },
  {
    question: "How does thyroid disease come up in AKT questions?",
    answer:
      "Thyroid questions often test TSH and free T4 interpretation, subclinical hypothyroidism, levothyroxine monitoring, Graves' disease, carbimazole adverse effects, pregnancy considerations and urgent thyrotoxicosis red flags.",
  },
  {
    question: "What sick-day rules are high yield for AKT endocrinology?",
    answer:
      "Know when acute illness changes diabetes treatment, when to pause dehydration-risk medicines, when to check ketones, why insulin should not be stopped casually, and why adrenal insufficiency needs steroid sick-day escalation.",
  },
];

export default function AktDiabetesEndocrinologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Diabetes and Endocrinology Revision",
        description:
          "A focused MRCGP AKT guide for diabetes medicines, HbA1c, thyroid tests, SGLT2 inhibitors, sick-day rules, obesity, adrenal disease, calcium disorders and endocrine red flags.",
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
            name: "AKT Diabetes and Endocrinology",
            url: "https://medexia-akt.com/akt-diabetes-endocrinology",
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
            MRCGP AKT diabetes and endocrinology revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Diabetes and endocrine questions usually test safe GP thresholds:
            how to interpret HbA1c or thyroid function, when a medicine is
            unsafe during illness, which complication must be screened, and when
            a vague presentation is actually an endocrine emergency.
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
              For AKT diabetes and endocrinology revision, prioritise type 2
              diabetes medicines, HbA1c targets, SGLT2 inhibitor safety, urine
              ACR and eGFR, diabetic emergencies, thyroid function tests,
              sick-day rules, obesity and metabolic risk, adrenal insufficiency
              and calcium disorders.
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
              Red flags to recognise quickly
            </h2>
            <ul
              className="mt-4 grid gap-3 sm:grid-cols-2"
              style={{ color: "var(--fg-mid)" }}
            >
              {redFlags.map((flag) => (
                <li
                  key={flag}
                  className="rounded-xl p-4 text-[14px] leading-[1.55]"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {flag}
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
              Why endocrine questions catch candidates out
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
                The AKT rarely asks for diabetes or thyroid facts in isolation.
                It usually asks what the result means for this patient: which
                medicine is unsafe, which complication changes the target, which
                symptom needs urgent action, or which monitoring step has been
                missed.
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
              AKT diabetes and endocrinology FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/metabolic-problems-endocrinology"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP metabolic problems and endocrinology topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng28"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE type 2 diabetes guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng17"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE type 1 diabetes guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng145"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE thyroid disease guideline
              </a>
              <a
                href="https://cks.nice.org.uk/topics/diabetes-type-2/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS type 2 diabetes
              </a>
              <a
                href="https://cks.nice.org.uk/topics/hypothyroidism/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS hypothyroidism
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
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/metabolic-endocrinology"
            >
              Open endocrine topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-prescribing-and-medication-safety"
            >
              Review medication safety
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE CKS and BNF guidance for clinical decisions. Last
            reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
