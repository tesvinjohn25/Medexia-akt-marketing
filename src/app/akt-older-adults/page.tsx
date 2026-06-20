import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Older Adults Revision: Frailty, Falls and Dementia",
  description:
    "MRCGP AKT older adults revision: frailty, falls, dementia, delirium, polypharmacy, multimorbidity, care homes and mental capacity.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-older-adults",
  },
  openGraph: {
    title: "MRCGP AKT Older Adults Revision: Frailty, Falls and Dementia",
    description:
      "A focused AKT older adults guide covering frailty, falls, dementia, delirium, polypharmacy, multimorbidity, care homes and mental capacity.",
    type: "article",
    url: "https://medexia-akt.com/akt-older-adults",
  },
};

const coreAreas = [
  {
    title: "Frailty and function",
    text: "Revise frailty recognition, functional decline, falls risk, continence, nutrition, social support, care planning and when a comprehensive geriatric approach is needed.",
  },
  {
    title: "Falls and syncope",
    text: "Focus on multifactorial falls assessment, lying and standing blood pressure, medication review, vision, gait, balance, home hazards and fracture prevention.",
  },
  {
    title: "Dementia assessment",
    text: "Know how memory concerns are assessed, reversible causes, depression and delirium mimics, carer history, driving, safeguarding and memory-service referral.",
  },
  {
    title: "Delirium",
    text: "Cover acute confusion, fluctuating attention, infection, dehydration, medicines, pain, constipation, urinary retention and why delirium is not the same as dementia.",
  },
  {
    title: "Polypharmacy and multimorbidity",
    text: "Revise treatment burden, medication review, anticholinergic load, sedatives, NSAIDs, renal function, patient priorities and deprescribing discussions.",
  },
  {
    title: "Capacity and care homes",
    text: "Link decision-specific capacity, best interests, advance care planning, care-home communication, safeguarding and coordination with community teams.",
  },
];

const redFlags = [
  "Sudden confusion, reduced consciousness, new neurological deficit, sepsis features or rapidly worsening function",
  "Fall with head injury, anticoagulant use, suspected hip fracture, inability to weight-bear or unexplained syncope",
  "New memory symptoms with rapid progression, focal neurology, seizures, severe headache or systemic cancer symptoms",
  "Delirium in a care-home resident, dehydration, urinary retention, constipation, pain or high-risk medication change",
  "Safeguarding concern, unexplained injuries, neglect, coercion, financial abuse or carer breakdown",
  "Medication toxicity, postural hypotension, recurrent falls, acute kidney injury or dangerous sedative burden",
];

const faqs = [
  {
    question: "Is older adults medicine high yield for the MRCGP AKT?",
    answer:
      "Yes. Older adults is a named RCGP curriculum topic and AKT questions commonly test frailty, falls, dementia, delirium, polypharmacy, multimorbidity, care homes, safeguarding and mental capacity.",
  },
  {
    question: "What older adults topics should I revise for the AKT?",
    answer:
      "Prioritise frailty recognition, falls assessment, dementia work-up, delirium, polypharmacy, medication review, multimorbidity, anticholinergic burden, care-home medicine, advance care planning and decision-specific capacity.",
  },
  {
    question: "How do falls come up in AKT questions?",
    answer:
      "Falls questions often test whether you look beyond the injury: lying and standing blood pressure, medication review, vision, gait and balance, home hazards, fracture risk, syncope, safeguarding and anticoagulant head-injury risk.",
  },
  {
    question: "What is the AKT trap with dementia and delirium?",
    answer:
      "The trap is missing acute delirium or reversible causes. Dementia is usually gradual; delirium is acute and fluctuating, often driven by infection, dehydration, constipation, pain, urinary retention or medication changes.",
  },
];

export default function AktOlderAdultsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Older Adults Revision: Frailty, Falls and Dementia",
        description:
          "A focused MRCGP AKT older adults guide for frailty, falls, dementia, delirium, polypharmacy, multimorbidity, care homes and mental capacity.",
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
            name: "AKT Older Adults",
            url: "https://medexia-akt.com/akt-older-adults",
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
            MRCGP AKT older adults revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Older-adult questions test whether you can handle complexity without
            losing safety: frailty, falls, dementia, delirium, multimorbidity,
            medication burden, care homes and capacity all interact.
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
              For AKT older adults revision, prioritise frailty, falls
              assessment, dementia work-up, delirium, polypharmacy, medication
              review, multimorbidity, care-home medicine, safeguarding and
              decision-specific mental capacity.
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
              Why older-adult questions catch candidates out
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
                The trap is answering a single disease guideline while ignoring
                frailty, function and treatment burden. In AKT stems, the safest
                answer often depends on the person&apos;s baseline function,
                medicines, cognition, capacity, carers and goals of care.
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
              AKT older adults FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/older-adults"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP older adults topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng249"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE falls assessment and prevention guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng97"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE dementia guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg103"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE delirium guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng56"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE multimorbidity guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng108"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE decision-making and mental capacity guideline
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
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/older-adults"
            >
              Open older adults topic &rarr;
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
            RCGP, NICE, local frailty pathways, care-home arrangements and BNF
            guidance for clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
