import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT End of Life Revision: Palliative Care and DNACPR",
  description:
    "MRCGP AKT end of life revision: palliative care, anticipatory medicines, DNACPR, advance care planning, capacity and last-days care.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-end-of-life",
  },
  openGraph: {
    title: "MRCGP AKT End of Life Revision: Palliative Care and DNACPR",
    description:
      "A focused AKT end-of-life guide covering palliative care, anticipatory medicines, DNACPR, advance care planning, capacity and last-days care.",
    type: "article",
    url: "https://medexia-akt.com/akt-end-of-life",
  },
};

const coreAreas = [
  {
    title: "Identifying end of life",
    text: "Revise how GPs identify people who may be approaching the end of life, record decisions, review needs and coordinate care with community teams.",
  },
  {
    title: "Advance care planning",
    text: "Know personalised care planning, treatment escalation plans, preferred place of care, advance statements and advance decisions to refuse treatment.",
  },
  {
    title: "DNACPR and capacity",
    text: "Focus on decision-specific capacity, best interests, consultation, documentation, communication with families and the difference between DNACPR and overall treatment ceilings.",
  },
  {
    title: "Common symptoms",
    text: "Cover pain, breathlessness, nausea, agitation, secretions, constipation, cachexia, fatigue and when urgent specialist palliative advice is needed.",
  },
  {
    title: "Anticipatory medicines",
    text: "Understand why medicines are prescribed in advance, what symptoms they cover, syringe-driver principles and how renal impairment or frailty affects prescribing.",
  },
  {
    title: "Care after death",
    text: "Revise verification, certification awareness, bereavement support, safeguarding, coronial referral signals and communication with relatives and carers.",
  },
];

const redFlags = [
  "Uncontrolled pain, breathlessness, agitation, vomiting, bleeding or distress that needs urgent palliative or acute-care input",
  "Possible spinal cord compression, hypercalcaemia, superior vena cava obstruction or other oncological emergency",
  "New confusion, reduced consciousness, sepsis features, dehydration, medication toxicity or reversible cause of deterioration",
  "Capacity uncertainty, conflict about treatment decisions, unclear best-interests process or missing documentation",
  "Carer breakdown, unsafe home situation, safeguarding concern, medication access failure or no overnight support",
  "Unexpected death, trauma, neglect concern, recent operation or circumstance that may need coronial advice",
];

const faqs = [
  {
    question: "Is end-of-life care high yield for the MRCGP AKT?",
    answer:
      "Yes. People at the end of life is a named RCGP curriculum topic. AKT questions commonly test palliative care planning, anticipatory medicines, capacity, DNACPR, last-days care, carers and communication.",
  },
  {
    question: "What should I revise first for AKT end-of-life care?",
    answer:
      "Prioritise identifying patients approaching end of life, personalised care planning, DNACPR, advance decisions, capacity, symptom control, anticipatory medicines, syringe-driver principles and care after death.",
  },
  {
    question: "What is the AKT trap with DNACPR?",
    answer:
      "The trap is treating DNACPR as a decision to stop all active treatment. DNACPR only relates to CPR. Other treatment decisions still need clinical judgement, patient wishes, capacity assessment and best-interests reasoning.",
  },
  {
    question: "How do anticipatory medicines come up in AKT questions?",
    answer:
      "They usually appear as a patient deteriorating at home or in a care home. The question tests whether you recognise common end-of-life symptoms, prescribe safely and know when to seek specialist palliative support.",
  },
];

export default function AktEndOfLifePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT End of Life Revision: Palliative Care and DNACPR",
        description:
          "A focused MRCGP AKT guide for palliative care, anticipatory medicines, DNACPR, advance care planning, capacity and last-days care.",
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
            name: "AKT End of Life",
            url: "https://medexia-akt.com/akt-end-of-life",
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
            MRCGP AKT end of life revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            End-of-life questions test calm GP judgement: identifying
            deterioration, planning care, managing symptoms, communicating with
            families, and making lawful decisions around capacity and CPR.
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
              For AKT end-of-life revision, prioritise palliative care
              planning, anticipatory medicines, DNACPR, advance decisions,
              capacity, symptom control, syringe-driver principles, last-days
              care, carers and care after death.
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
                The difficult AKT questions are rarely about memorising a drug
                list. They test whether you can balance comfort, safety,
                capacity, patient wishes, family distress, carer support and
                when to call for specialist help.
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
              AKT end of life FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/people-end-life"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP people at the end of life topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng142"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE end of life care for adults service delivery guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng31"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE care of dying adults in the last days of life guideline
              </a>
              <a
                href="https://www.gmc-uk.org/professional-standards/the-professional-standards/treatment-and-care-towards-the-end-of-life"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GMC treatment and care towards the end of life guidance
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/end-of-life"
            >
              Open end of life topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-long-term-conditions-cancer"
            >
              Review long-term conditions &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, GMC, local palliative care pathways, local prescribing
            guidance and BNF guidance for clinical decisions. Last reviewed
            June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
