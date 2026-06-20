import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Respiratory Revision: Asthma and COPD",
  description:
    "MRCGP AKT respiratory revision: asthma, COPD, inhaler technique, spirometry, pneumonia, lung cancer red flags, sleep apnoea and acute asthma.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-respiratory",
  },
  openGraph: {
    title: "MRCGP AKT Respiratory Revision: Asthma and COPD",
    description:
      "A focused AKT respiratory guide covering asthma, COPD, inhaler technique, spirometry, pneumonia, lung cancer red flags and sleep apnoea.",
    type: "article",
    url: "https://medexia-akt.com/akt-respiratory",
  },
};

const coreAreas = [
  {
    title: "Asthma diagnosis",
    text: "Revise variable symptoms, spirometry, bronchodilator reversibility, FeNO, peak-flow variability and when the question is testing diagnostic uncertainty rather than treatment.",
  },
  {
    title: "Asthma treatment and reliever safety",
    text: "Know current NICE/BTS/SIGN concepts around anti-inflammatory treatment, reliever safety, SABA overuse, oral steroid bursts, escalation and when acute asthma is unsafe.",
  },
  {
    title: "COPD diagnosis",
    text: "Focus on symptoms, smoking or exposure history, post-bronchodilator spirometry, FEV1/FVC below 0.7, exacerbation history and MRC breathlessness grading.",
  },
  {
    title: "COPD management",
    text: "Prioritise smoking cessation, inhaler technique, bronchodilators, when ICS is indicated, pulmonary rehabilitation, vaccinations and oxygen or cor pulmonale red flags.",
  },
  {
    title: "Pneumonia and acute infection",
    text: "Use CRB-65 or CURB-65 carefully, then decide whether primary-care treatment, same-day assessment or emergency admission is the safest next step.",
  },
  {
    title: "Lung cancer and sleep apnoea",
    text: "Recognise haemoptysis, persistent cough, weight loss, recurrent chest infections, suspected cancer pathways, daytime sleepiness and DVLA risk in sleep apnoea.",
  },
];

const redFlags = [
  "Life-threatening acute asthma: exhaustion, silent chest, cyanosis, confusion or low oxygen saturation",
  "COPD exacerbation with hypoxia, confusion, severe breathlessness or inability to cope at home",
  "Haemoptysis, persistent unexplained cough, weight loss or recurrent chest infections",
  "Suspected pulmonary embolism, collapse or pleuritic chest pain with acute breathlessness",
  "Pneumonia with sepsis features, low oxygen saturation or high CRB-65 or CURB-65 risk",
  "Sleep apnoea with severe daytime sleepiness or a driving safety concern",
];

const faqs = [
  {
    question: "Is respiratory health high yield for the MRCGP AKT?",
    answer:
      "Yes. Respiratory health is a major RCGP clinical topic. AKT questions commonly test asthma, COPD, inhaler technique, spirometry, pneumonia severity, lung cancer red flags, sleep apnoea and acute respiratory escalation.",
  },
  {
    question: "What respiratory topics should I revise for the AKT?",
    answer:
      "Prioritise asthma diagnosis and treatment, COPD diagnosis and exacerbations, inhaler technique, spirometry, FeNO and peak-flow variability, pneumonia severity, lung cancer red flags, sleep apnoea and acute asthma or COPD escalation.",
  },
  {
    question: "How does asthma come up in AKT questions?",
    answer:
      "Asthma questions often test diagnostic evidence, reliever safety, inhaled corticosteroid use, poor control, inhaler technique, SABA overuse, acute asthma severity and when emergency admission is needed.",
  },
  {
    question: "What COPD facts are high yield for the AKT?",
    answer:
      "Know post-bronchodilator spirometry, smoking cessation, MRC breathlessness, exacerbation patterns, inhaler technique, LAMA or LABA use, when ICS is appropriate, pulmonary rehabilitation and oxygen-safety red flags.",
  },
];

export default function AktRespiratoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Respiratory Revision: Asthma and COPD",
        description:
          "A focused MRCGP AKT respiratory guide for asthma, COPD, inhaler technique, spirometry, pneumonia, lung cancer red flags, sleep apnoea and acute respiratory escalation.",
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
            name: "AKT Respiratory",
            url: "https://medexia-akt.com/akt-respiratory",
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
            MRCGP AKT respiratory revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Respiratory questions test everyday GP decision-making: which cough
            needs urgent imaging, which wheeze needs emergency care, whether the
            spirometry fits asthma or COPD, and whether poor control is really
            poor inhaler technique.
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
              For AKT respiratory revision, prioritise asthma, COPD, inhaler
              technique, spirometry, FeNO and peak-flow variability, current
              NICE/BTS/SIGN asthma guidance, pneumonia severity, lung cancer
              red flags, sleep apnoea and acute asthma or COPD escalation.
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
              Why respiratory questions catch candidates out
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
                The stem often tests whether you check inhaler technique and
                adherence before stepping up, whether the spirometry actually
                proves obstruction, and whether the patient is safe for routine
                primary-care management. Do not treat respiratory revision as a
                list of inhalers; treat it as diagnosis, safety and escalation.
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
              AKT respiratory FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/respiratory-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP respiratory health topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng245"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE/BTS/SIGN asthma guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng115"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE COPD guideline
              </a>
              <a
                href="https://cks.nice.org.uk/topics/asthma/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS asthma
              </a>
              <a
                href="https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS COPD
              </a>
              <a
                href="https://bnf.nice.org.uk/treatment-summaries/respiratory-system-inhaled-drug-delivery/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                BNF inhaled drug delivery
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary text-center text-[16px]" href="/topics/respiratory">
              Open respiratory topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-minor-illness-urgent-care"
            >
              Review urgent care red flags
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
