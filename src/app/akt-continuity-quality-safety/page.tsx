import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Continuity, Quality and Patient Safety Revision",
  description:
    "MRCGP AKT continuity, quality and patient safety revision: QI, audit, significant events, safety systems, continuity, prescribing risk and PSIRF.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-continuity-quality-safety",
  },
  openGraph: {
    title: "MRCGP AKT Continuity, Quality and Patient Safety Revision",
    description:
      "A focused AKT guide covering continuity, quality improvement, audit, significant-event learning, patient safety systems and prescribing risk.",
    type: "article",
    url: "https://medexia-akt.com/akt-continuity-quality-safety",
  },
};

const coreAreas = [
  {
    title: "Continuity of care",
    text: "Revise relational, informational and management continuity: seeing the right clinician, shared records, follow-up responsibility and coordinated care.",
  },
  {
    title: "Quality improvement",
    text: "Know audit cycles, PDSA cycles, baseline measurement, standards, re-audit, change ideas and how to measure whether improvement happened.",
  },
  {
    title: "Patient safety systems",
    text: "Focus on reporting, learning culture, safety-netting, handover, test-result follow-up, prescribing checks and reducing repeat errors.",
  },
  {
    title: "Significant-event learning",
    text: "Understand proportionate review, human factors, system contributors, compassionate engagement and action plans rather than individual blame.",
  },
  {
    title: "Medicines optimisation",
    text: "Link medication review, reconciliation, adherence, shared decisions, monitoring, repeat prescribing and high-risk medicines to safer outcomes.",
  },
  {
    title: "Risk in organisations",
    text: "Revise complaints, duty of candour principles, information flow, supervision, delegation, escalation and safe care across teams.",
  },
];

const traps = [
  "Choosing individual blame when the safer answer is system learning and risk reduction",
  "Starting an audit without a clear standard, baseline measure or re-audit plan",
  "Treating continuity as only seeing the same GP rather than records, coordination and follow-up",
  "Missing test-result follow-up or handover failure as the real safety issue",
  "Continuing repeat medication without review, monitoring or reconciliation after discharge",
  "Confusing patient-safety response with disciplinary investigation or complaint handling",
];

const faqs = [
  {
    question: "Is continuity, quality and safety tested in the MRCGP AKT?",
    answer:
      "Yes. It is a named RCGP curriculum topic. AKT questions can test continuity, audit, quality improvement, significant-event learning, patient-safety systems, medicines optimisation and safe prescribing processes.",
  },
  {
    question: "What should I revise first for AKT quality improvement?",
    answer:
      "Start with audit cycles, PDSA cycles, standards, baseline measurement, re-audit, significant-event learning, safety-netting, test-result follow-up, handover and medicines reconciliation.",
  },
  {
    question: "How does patient safety come up in AKT questions?",
    answer:
      "Patient-safety questions often ask for the safest next system action: report and learn from incidents, close follow-up gaps, improve handover, review repeat errors, involve affected patients and reduce future risk.",
  },
  {
    question: "Is this the same as AKT prescribing revision?",
    answer:
      "It overlaps, but it is broader. Prescribing questions test drug and monitoring decisions; continuity, quality and safety questions test the systems that prevent missed follow-up, repeat errors and unsafe care.",
  },
];

export default function AktContinuityQualitySafetyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Continuity, Quality and Patient Safety Revision",
        description:
          "A focused MRCGP AKT guide for continuity, quality improvement, audit, significant-event learning, patient safety systems and prescribing risk.",
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
            name: "AKT Continuity, Quality and Safety",
            url: "https://medexia-akt.com/akt-continuity-quality-safety",
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
            MRCGP AKT continuity, quality and patient safety revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            These questions test safe GP systems: continuity, audit, quality
            improvement, significant-event learning, handover, test-result
            follow-up and prescribing risk.
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
              For AKT continuity, quality and safety revision, prioritise audit
              cycles, PDSA, significant-event learning, safety-netting,
              test-result follow-up, handover, medicines reconciliation,
              repeat-prescribing systems and how practices learn from errors.
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
                The trap is answering as if the question is asking who made the
                mistake. AKT safety stems usually reward practical system
                thinking: close the loop, measure the problem, learn from the
                event, communicate honestly and reduce the chance of recurrence.
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
              AKT quality and safety FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/rcgp-curriculum-being-gp"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP Being a GP curriculum
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
                href="https://www.england.nhs.uk/patient-safety/patient-safety-insight/incident-response-framework/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS England Patient Safety Incident Response Framework
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/continuity-quality-safety-prescribing"
            >
              Open quality and safety topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-prescribing-and-medication-safety"
            >
              Review prescribing safety &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, BNF, NHS England, local safety and medicines-management
            guidance for clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
