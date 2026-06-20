import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Continuity, Quality, Safety and Prescribing",
  description:
    "MRCGP AKT continuity, quality, safety and prescribing revision: continuity of care, QI, audit, safety systems, medicines optimisation and prescribing risk.",
  alternates: {
    canonical:
      "https://medexia-akt.com/akt-continuity-quality-safety-prescribing",
  },
  openGraph: {
    title: "MRCGP AKT Continuity, Quality, Safety and Prescribing",
    description:
      "A focused AKT guide for the RCGP professional topic covering continuity, quality improvement, patient safety and safe prescribing systems.",
    type: "article",
    url: "https://medexia-akt.com/akt-continuity-quality-safety-prescribing",
  },
};

const coreAreas = [
  {
    title: "Continuity of care",
    text: "Revise relational, informational and management continuity: known clinicians, shared records, follow-up responsibility and coordinated care across services.",
  },
  {
    title: "Clinical governance",
    text: "Know how practices review standards, use data, learn from incidents, respond to complaints and maintain high-quality care across a team.",
  },
  {
    title: "Quality improvement",
    text: "Focus on audit, PDSA, baseline measurement, clear standards, re-audit, measurable aims and whether a change has improved outcomes.",
  },
  {
    title: "Patient safety",
    text: "Look for handover failures, missed results, unclear follow-up ownership, weak safety-netting, repeat errors and systems that need redesign.",
  },
  {
    title: "Prescribing systems",
    text: "Revise repeat prescribing, medicines reconciliation, discharge medication changes, monitoring, allergies, interactions and high-risk drug workflows.",
  },
  {
    title: "Medicines optimisation",
    text: "Link prescribing to shared decisions, adherence, treatment burden, polypharmacy, deprescribing, monitoring and getting the best outcome from medicines.",
  },
];

const traps = [
  "Treating this as three separate topics instead of one practical safe-systems topic",
  "Choosing individual blame when the safer AKT answer is system learning and risk reduction",
  "Starting an audit without a standard, baseline, intervention and re-audit plan",
  "Missing discharge medicines reconciliation or test-result follow-up as the key safety failure",
  "Continuing repeat medication without monitoring, review or clear shared-care responsibility",
  "Confusing continuity with only seeing the same GP rather than records, coordination and follow-up ownership",
];

const faqs = [
  {
    question:
      "Is continuity, quality of care, safety and prescribing tested in the MRCGP AKT?",
    answer:
      "Yes. It is an RCGP professional curriculum topic. AKT questions can test continuity, clinical governance, audit, QI, significant-event learning, patient-safety systems, medicines optimisation and safe prescribing workflows.",
  },
  {
    question:
      "What should I revise first for AKT continuity, quality, safety and prescribing?",
    answer:
      "Start with audit cycles, PDSA, significant-event learning, test-result follow-up, handover, medicines reconciliation, repeat prescribing, medication monitoring, safety-netting and how practices learn from errors.",
  },
  {
    question: "How does prescribing fit into this AKT topic?",
    answer:
      "The RCGP topic treats prescribing as a safety and quality issue. AKT stems may test drug choice, but they also test systems: repeat prescriptions, monitoring, reconciliation, allergies, shared care and communication after discharge.",
  },
  {
    question: "How is this different from the standalone prescribing page?",
    answer:
      "The standalone prescribing page goes deeper into medication decisions and monitoring. This page maps the full RCGP topic: continuity, governance, patient-safety systems and prescribing as one combined professional theme.",
  },
];

export default function AktContinuityQualitySafetyPrescribingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Continuity, Quality, Safety and Prescribing",
        description:
          "A focused MRCGP AKT guide for continuity of care, clinical governance, quality improvement, patient safety, medicines optimisation and prescribing systems.",
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
            name: "AKT Continuity, Quality, Safety and Prescribing",
            url: "https://medexia-akt.com/akt-continuity-quality-safety-prescribing",
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
            MRCGP AKT continuity, quality, safety and prescribing revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            This RCGP professional topic tests safe GP systems: continuity of
            care, clinical governance, quality improvement, patient safety,
            medicines optimisation and prescribing workflows.
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
              For AKT continuity, quality, safety and prescribing, prioritise
              audit, PDSA, significant-event learning, test-result follow-up,
              handover, medicines reconciliation, repeat prescribing,
              medication monitoring and systems that prevent repeat harm.
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
                The trap is answering as if the question is only about a drug,
                only about audit or only about continuity. In the AKT, the best
                answer is often the one that closes the loop: safe follow-up,
                safer prescribing, shared records, learning from error and a
                measurable system change.
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
              AKT continuity, quality, safety and prescribing FAQ
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
                RCGP continuity and quality of care, safety and prescribing
                topic guide
              </a>
              <a
                href="https://www.gmc-uk.org/professional-standards/the-professional-standards/good-medical-practice"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GMC Good medical practice
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng5"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE medicines optimisation guideline
              </a>
              <a
                href="https://www.england.nhs.uk/long-read/primary-care-patient-safety-strategy/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS England primary care patient safety strategy
              </a>
            </div>
          </section>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/continuity-quality-safety-prescribing"
            >
              Open combined topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-continuity-quality-safety"
            >
              Quality and safety &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-prescribing-and-medication-safety"
            >
              Prescribing safety &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, GMC, NICE, BNF, NHS England, local safety and
            medicines-management guidance for clinical decisions. Last reviewed
            June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
