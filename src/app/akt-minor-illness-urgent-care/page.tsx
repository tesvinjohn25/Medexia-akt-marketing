import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Minor Illness and Urgent Care Revision",
  description:
    "MRCGP AKT minor illness and urgent care revision: sepsis, NEWS2, delayed antibiotics, otitis media, tonsillitis, sinusitis and safety-netting.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-minor-illness-urgent-care",
  },
  openGraph: {
    title: "MRCGP AKT Minor Illness and Urgent Care Revision",
    description:
      "A focused AKT urgent-care guide covering sepsis recognition, NEWS2, delayed antibiotics, common infections and safety-netting.",
    type: "article",
    url: "https://medexia-akt.com/akt-minor-illness-urgent-care",
  },
};

const revisionAreas = [
  {
    title: "Sepsis and acute deterioration",
    text: "Recognise high-risk features, altered mental state, respiratory compromise, poor perfusion, non-blanching rash and when emergency escalation is needed.",
  },
  {
    title: "Minor illness triage",
    text: "Decide whether self-care, routine review, same-day assessment, delayed prescription, immediate treatment or emergency referral is safest.",
  },
  {
    title: "Delayed antibiotics",
    text: "Know when back-up or delayed antibiotics fit self-limiting respiratory and ENT infections, and when immediate antibiotics or escalation are needed.",
  },
  {
    title: "ENT infections",
    text: "Revise acute otitis media, tonsillitis, sinusitis, FeverPAIN or Centor scoring, red flags, complications and when to refer.",
  },
  {
    title: "UTI and common infections",
    text: "Cover lower UTI, pyelonephritis red flags, pregnancy, men, children, catheterised patients and when urine culture changes management.",
  },
  {
    title: "Safety-netting",
    text: "Be precise about worsening features, timeframe, who to contact and what should trigger same-day or emergency review.",
  },
];

const redFlags = [
  "Suspected sepsis or rapidly worsening acute illness",
  "Non-blanching rash with systemic illness",
  "Respiratory distress, hypoxia, exhaustion or inability to complete sentences",
  "Periorbital cellulitis, visual change or severe frontal headache in sinusitis",
  "Mastoiditis signs, systemically unwell child, otorrhoea or high-risk otitis media",
  "Pyelonephritis, pregnancy UTI, male UTI, catheter-associated infection or recurrent UTI patterns",
];

const faqs = [
  {
    question: "Is minor illness tested in the MRCGP AKT?",
    answer:
      "Yes. Minor illness appears through applied GP presentations such as respiratory infections, ENT symptoms, urinary symptoms, febrile children, prescribing decisions, safety-netting and when to escalate urgent care.",
  },
  {
    question: "What urgent care topics should I revise for AKT?",
    answer:
      "Prioritise sepsis recognition, acute deterioration, NEWS2 as an adjunct to clinical judgement, same-day triage, delayed antibiotics, respiratory and ENT infections, UTI red flags and safety-netting.",
  },
  {
    question: "Should I memorise NEWS2 for AKT?",
    answer:
      "Know what NEWS2 is for and how it supports recognition of acute deterioration, but do not treat it as a substitute for clinical judgement. AKT questions often test the unsafe patient, not only a score.",
  },
  {
    question: "How do delayed antibiotics appear in AKT questions?",
    answer:
      "They usually test antimicrobial stewardship and risk thresholds: when a self-limiting infection can be managed with advice or a back-up prescription, and when symptoms require immediate treatment or escalation.",
  },
];

export default function AktMinorIllnessUrgentCarePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Minor Illness and Urgent Care Revision",
        description:
          "A focused MRCGP AKT guide to minor illness, urgent care, sepsis recognition, NEWS2, delayed antibiotics, common infections and safety-netting.",
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
            name: "AKT Minor Illness and Urgent Care",
            url: "https://medexia-akt.com/akt-minor-illness-urgent-care",
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
            MRCGP AKT minor illness and urgent care revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Minor illness questions are rarely just about naming a diagnosis.
            They test primary-care triage: what can wait, what needs
            same-day review, what needs antibiotics, and what must be escalated
            because the patient is becoming unsafe.
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
              For AKT minor illness and urgent care, prioritise sepsis
              recognition, NEWS2, same-day triage, delayed antibiotics, acute
              otitis media, tonsillitis, sinusitis, upper and lower respiratory
              infection, UTI red flags, safety-netting and antimicrobial
              stewardship.
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
              {revisionAreas.map((area) => (
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
              Recent feedback signal
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
                The April 2026 RCGP AKT feedback report highlighted minor
                illnesses alongside prescribing, medication monitoring, data
                protection, safeguarding and confidentiality. Treat that as a
                signal to revise risk thresholds, not just lists of common
                diagnoses.
              </p>
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
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT minor illness and urgent care FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/urgent-unscheduled-care"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP urgent and unscheduled care topic guide
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
                href="https://www.rcgp.org.uk/getmedia/efd08d10-8c08-4a6a-a0d5-9a528256f4c8/April-2026-AKT-feedback-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP April 2026 AKT feedback report
              </a>
              <a
                href="https://www.nice.org.uk/guidance/qs121/chapter/quality-statement-2-back-up-delayed-prescribing"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE quality statement on back-up delayed prescribing
              </a>
              <a
                href="https://elearning.rcgp.org.uk/mod/book/view.php?chapterid=438&id=12646"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP Learning delayed antibiotics
              </a>
              <a
                href="https://www.england.nhs.uk/ourwork/clinical-policy/sepsis/nationalearlywarningscore/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS England NEWS2
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
            <a className="btn-primary text-center text-[16px]" href="/akt-feedback-reports">
              Review feedback themes &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/topics/urgent-unscheduled-care">
              Open urgent care topic
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE CKS, NHS England and BNF guidance for clinical
            decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
