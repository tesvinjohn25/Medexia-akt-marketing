import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Urgent and Unscheduled Care Revision",
  description:
    "MRCGP AKT urgent and unscheduled care revision: sepsis, NEWS2, acute deterioration, anaphylaxis, acute abdomen, OOH triage and safety-netting.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-urgent-unscheduled-care",
  },
  openGraph: {
    title: "MRCGP AKT Urgent and Unscheduled Care Revision",
    description:
      "A focused AKT urgent and unscheduled care guide covering sepsis, NEWS2, deterioration, anaphylaxis, acute abdomen, OOH triage and safety-netting.",
    type: "article",
    url: "https://medexia-akt.com/akt-urgent-unscheduled-care",
  },
};

const coreAreas = [
  {
    title: "Recognising deterioration",
    text: "Revise abnormal observations, altered mental state, poor perfusion, respiratory compromise, rapid progression and when a patient needs emergency transfer.",
  },
  {
    title: "Sepsis decisions",
    text: "Know adult, child, pregnancy and recently pregnant sepsis risk features, why normal early observations can mislead, and when same-day escalation is unsafe to delay.",
  },
  {
    title: "NEWS2 and judgement",
    text: "Use NEWS2 as an adjunct to clinical assessment. AKT stems often test the unsafe patient where a score should not override deterioration, context or gut concern.",
  },
  {
    title: "Anaphylaxis",
    text: "Focus on early IM adrenaline, positioning, oxygen, fluids, repeated adrenaline if needed, observation, two auto-injectors and allergy referral after recovery.",
  },
  {
    title: "Acute abdomen and chest pain",
    text: "Cover peritonism, bowel obstruction, ruptured AAA, ectopic pregnancy, ACS, pulmonary embolism and when primary-care reassurance is unsafe.",
  },
  {
    title: "OOH triage and safety-netting",
    text: "Revise telephone triage limits, home-visit decisions, explicit safety-net advice, documentation and when diagnostic uncertainty requires face-to-face assessment.",
  },
];

const redFlags = [
  "Suspected sepsis, mottled or ashen skin, non-blanching rash, new confusion, poor perfusion or rapidly worsening illness",
  "Severe breathlessness, hypoxia, exhaustion, inability to speak in sentences or silent chest",
  "Chest pain with sweating, collapse, severe breathlessness, haemodynamic instability or high-risk ECG features",
  "Acute abdomen with guarding, rebound tenderness, persistent vomiting, obstruction signs, pregnancy risk or collapse",
  "Anaphylaxis features: airway swelling, wheeze, hypotension, collapse or rapidly progressive systemic allergic reaction",
  "Safeguarding concern, unsafe home situation, carer inability to cope or patient unable to follow safety-net advice",
];

const faqs = [
  {
    question: "Is urgent and unscheduled care tested in the MRCGP AKT?",
    answer:
      "Yes. Urgent and unscheduled care is a named RCGP curriculum topic. AKT questions test sepsis, acute deterioration, anaphylaxis, acute abdomen, chest pain, OOH triage, safety-netting and escalation decisions.",
  },
  {
    question: "What should I revise first for AKT urgent care?",
    answer:
      "Prioritise sepsis recognition, NEWS2 as an adjunct, emergency red flags, acute asthma, anaphylaxis, chest pain, acute abdomen, same-day triage, telephone assessment limits and safety-netting.",
  },
  {
    question: "Should NEWS2 replace clinical judgement in AKT questions?",
    answer:
      "No. NEWS2 supports recognition of acute deterioration, but AKT questions often test whether you escalate because the whole clinical picture is unsafe, even when a single score or observation is not definitive.",
  },
  {
    question: "How does urgent care differ from minor illness revision?",
    answer:
      "Minor illness revision focuses on common self-limiting presentations and prescribing thresholds. Urgent and unscheduled care focuses on deterioration, red flags, out-of-hours triage and emergency escalation.",
  },
];

export default function AktUrgentUnscheduledCarePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Urgent and Unscheduled Care Revision",
        description:
          "A focused MRCGP AKT guide for urgent and unscheduled care, sepsis, NEWS2, acute deterioration, anaphylaxis, acute abdomen, OOH triage and safety-netting.",
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
            name: "AKT Urgent and Unscheduled Care",
            url: "https://medexia-akt.com/akt-urgent-unscheduled-care",
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
            MRCGP AKT urgent and unscheduled care revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Urgent-care questions test whether you recognise the unsafe patient
            early: sepsis, acute deterioration, anaphylaxis, chest pain, acute
            abdomen, OOH triage and clear safety-netting.
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
              For AKT urgent and unscheduled care revision, prioritise sepsis,
              acute deterioration, NEWS2 as an adjunct, anaphylaxis, acute
              asthma, chest pain, acute abdomen, OOH triage and safety-netting.
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
                The trap is over-managing uncertainty in primary care when the
                scenario needs escalation. AKT stems often test whether you can
                stop, recognise risk, call for help and document a clear plan.
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
              AKT urgent care FAQ
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
                href="https://www.nice.org.uk/guidance/ng253"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE suspected sepsis in people aged 16 or over guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng254"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE suspected sepsis in under 16s guideline
              </a>
              <a
                href="https://www.nice.org.uk/advice/mib205/chapter/The-technology"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE briefing on NEWS2 systems
              </a>
              <a
                href="https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis/emergency-treatment-anaphylactic-reactions"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                Resuscitation Council UK anaphylaxis guidance
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/urgent-unscheduled-care"
            >
              Open urgent care topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-minor-illness-urgent-care"
            >
              Review minor illness &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, Resuscitation Council UK, local urgent-care pathways
            and BNF guidance for clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
