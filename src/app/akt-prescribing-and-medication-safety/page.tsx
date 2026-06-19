import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Prescribing and Medication Safety",
  description:
    "MRCGP AKT prescribing revision: medication safety, monitoring, side effects, repeat prescribing, BNF checks and RCGP feedback themes.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-prescribing-and-medication-safety",
  },
  openGraph: {
    title: "MRCGP AKT Prescribing and Medication Safety",
    description:
      "A focused AKT prescribing guide covering medication monitoring, safety systems, side effects, BNF checks and recurring RCGP feedback themes.",
    type: "article",
    url: "https://medexia-akt.com/akt-prescribing-and-medication-safety",
  },
};

const prescribingAreas = [
  {
    title: "Medication monitoring",
    text: "Know common monitoring patterns for high-use GP medicines: renal function, U&Es, LFTs, blood counts and therapeutic-drug checks where relevant.",
  },
  {
    title: "Side effects and interactions",
    text: "Revise predictable side effects, contraindications and interaction traps for common long-term medicines rather than obscure hospital-only drugs.",
  },
  {
    title: "Repeat prescribing systems",
    text: "Questions can test safe repeat prescribing, medication reviews, shared-care responsibilities, prescribing records and error prevention.",
  },
  {
    title: "Higher-risk groups",
    text: "Pay extra attention to pregnancy, breastfeeding, older adults, children, renal impairment, hepatic impairment and polypharmacy scenarios.",
  },
  {
    title: "Prescribing errors",
    text: "Look for wrong dose, wrong formulation, missed monitoring, duplicate therapy, allergy warnings and unsafe continuation after a clinical change.",
  },
];

const feedbackThemes = [
  {
    sitting: "April 2026",
    text: "The official feedback report highlighted common medication monitoring and prescribing errors as areas where candidates struggled.",
  },
  {
    sitting: "October 2025",
    text: "The report highlighted side-effects of long-term medication, reinforcing the need to connect drugs with patient-facing risks.",
  },
  {
    sitting: "Recent reports",
    text: "Prescribing sits alongside statistics, confidentiality, safeguarding and neurology as a recurring revision signal across AKT feedback.",
  },
];

const revisionSteps = [
  {
    title: "Use the BNF and NICE CKS after questions",
    text: "Do the question first, then check the drug, monitoring requirement or contraindication in a trusted source. That makes the reference search stick.",
  },
  {
    title: "Build a high-risk medicine list",
    text: "Track anticoagulants, DMARDs, lithium, antiepileptics, opioids, insulin, steroids, ACE inhibitors, diuretics and common antibiotics.",
  },
  {
    title: "Practise monitoring as decisions",
    text: "Do not only memorise intervals. Ask what is unsafe today, what should be checked before prescribing and what advice the patient needs.",
  },
  {
    title: "Pair questions with audio revision",
    text: "Use questions for exam decisions, and audio to keep drug groups, side effects and safety principles moving during commutes or low-energy time.",
  },
];

const faqs = [
  {
    question: "Is prescribing tested in the MRCGP AKT?",
    answer:
      "Yes. Prescribing is part of the RCGP curriculum and appears in AKT feedback themes. It can be tested through medication monitoring, side effects, contraindications, repeat prescribing, medicines management and safe systems.",
  },
  {
    question: "What prescribing topics should I revise for the AKT?",
    answer:
      "Prioritise common medication monitoring, side effects and interactions, prescribing in higher-risk groups, repeat prescribing safety, prescribing errors, drug allergies, renal-dose issues and medicines that need extra monitoring.",
  },
  {
    question: "Should I memorise the BNF for the AKT?",
    answer:
      "No. Use the BNF and NICE CKS as reference sources during revision. The aim is not to memorise the entire BNF, but to recognise common safety patterns and apply them quickly in AKT-style scenarios.",
  },
  {
    question: "Why do AKT feedback reports mention prescribing?",
    answer:
      "Prescribing is high-risk in real GP work and easy to test through applied scenarios. Recent feedback reports have highlighted medication monitoring, prescribing errors and long-term medication side effects.",
  },
];

export default function AktPrescribingAndMedicationSafetyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Prescribing and Medication Safety",
        description:
          "A focused revision guide for AKT prescribing, medication monitoring and medication safety questions.",
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
            name: "AKT Prescribing and Medication Safety",
            url: "https://medexia-akt.com/akt-prescribing-and-medication-safety",
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
            MRCGP AKT prescribing and medication safety
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            AKT prescribing is not just drug trivia. The exam can test whether
            you recognise unsafe monitoring, side effects, prescribing errors,
            higher-risk patients and safe repeat-prescribing systems in UK
            general practice.
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
              For AKT prescribing, prioritise common medication monitoring,
              high-risk drug side effects and interactions, prescribing in
              pregnancy, breastfeeding, renal impairment and older adults,
              repeat prescribing safety, and BNF or NICE CKS checking after
              practice questions.
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
              What prescribing questions test
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {prescribingAreas.map((area) => (
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
              Recurring AKT feedback themes
            </h2>
            <div className="mt-4 grid gap-3">
              {feedbackThemes.map((theme) => (
                <article
                  key={theme.sitting}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="grid gap-2 sm:grid-cols-[130px_1fr]">
                    <h3
                      className="text-[13px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--brand-emerald)" }}
                    >
                      {theme.sitting}
                    </h3>
                    <p
                      className="text-[14px] leading-[1.65]"
                      style={{ color: "var(--fg-mid)" }}
                    >
                      {theme.text}
                    </p>
                  </div>
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
              How to revise prescribing safely
            </h2>
            <div className="mt-4 grid gap-3">
              {revisionSteps.map((step) => (
                <article
                  key={step.title}
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
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {step.text}
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
              AKT prescribing FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/continuity-quality-of-care"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP continuity, quality of care, safety and prescribing
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/clinical-topic-guides"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP curriculum topic guides
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
            <a
              className="btn-primary text-center text-[16px]"
              href="/akt-feedback-reports"
            >
              Review feedback themes &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/topics/continuity-quality-safety-prescribing"
            >
              Open prescribing topic
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
