import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Long-Term Conditions and Cancer Revision",
  description:
    "MRCGP AKT long-term conditions and cancer revision: multimorbidity, treatment burden, cancer red flags, safety-netting and 2WW referral.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-long-term-conditions-cancer",
  },
  openGraph: {
    title: "MRCGP AKT Long-Term Conditions and Cancer Revision",
    description:
      "A focused AKT guide for multimorbidity, chronic disease reviews, cancer red flags, safety-netting, 2WW referral and survivorship.",
    type: "article",
    url: "https://medexia-akt.com/akt-long-term-conditions-cancer",
  },
};

const coreAreas = [
  {
    title: "Multimorbidity",
    text: "Revise how multiple conditions interact, how treatment burden changes decisions, and why the safest answer is often person-centred rather than disease-by-disease.",
  },
  {
    title: "Long-term condition reviews",
    text: "Know the purpose of structured reviews, monitoring tests, lifestyle support, medicines optimisation, escalation thresholds and shared management plans.",
  },
  {
    title: "Cancer red flags",
    text: "Focus on symptom patterns, age thresholds, persistent unexplained symptoms, examination findings and when NICE suspected-cancer pathways apply.",
  },
  {
    title: "Safety-netting",
    text: "AKT stems often test whether you arrange follow-up, explain what change should trigger review and make sure abnormal results do not get lost.",
  },
  {
    title: "Living with and beyond cancer",
    text: "Cover survivorship, recurrence concerns, late treatment effects, psychological impact, coordination with secondary care and holistic needs.",
  },
  {
    title: "Palliative transition",
    text: "Recognise when care shifts toward symptom control, advance care planning, carer support, anticipatory medicines and community coordination.",
  },
];

const redFlags = [
  "Haemoptysis, persistent cough, recurrent chest infections, weight loss or appetite loss in a patient at lung-cancer risk",
  "Iron-deficiency anaemia, rectal bleeding, change in bowel habit, abdominal mass or unexplained weight loss",
  "Breast lump, nipple change, skin dimpling, unilateral persistent symptoms or suspicious breast examination finding",
  "Changing pigmented lesion, non-healing ulcer, rapidly growing lesion or skin lesion with suspicious bleeding or colour change",
  "Persistent unexplained bone pain, pallor, bruising, lymphadenopathy or soft-tissue lump in a child or young person",
  "Multimorbidity with rapid functional decline, treatment toxicity, medication harm, frailty, carer breakdown or unsafe self-management",
];

const faqs = [
  {
    question: "Is long-term conditions including cancer high yield for the AKT?",
    answer:
      "Yes. It is a named RCGP curriculum topic and it overlaps with common AKT scenarios: multimorbidity, long-term condition monitoring, cancer red flags, 2WW referral, safety-netting, survivorship and palliative transition.",
  },
  {
    question: "What should I revise first for this AKT topic?",
    answer:
      "Start with multimorbidity, treatment burden, shared decisions, structured chronic disease reviews, medicines optimisation, NICE suspected-cancer referral patterns, safety-netting and follow-up systems.",
  },
  {
    question: "How do cancer red flags come up in AKT questions?",
    answer:
      "They usually appear as a primary-care presentation where the key decision is investigation, urgent suspected-cancer referral, safety-netting, or recognising that persistent unexplained symptoms should not be treated as benign.",
  },
  {
    question: "What is the AKT trap with multimorbidity?",
    answer:
      "The trap is applying a single guideline without considering frailty, renal function, side effects, patient priorities, carers, treatment burden and whether extra investigation or treatment is likely to help.",
  },
];

export default function AktLongTermConditionsCancerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Long-Term Conditions and Cancer Revision",
        description:
          "A focused MRCGP AKT guide for long-term conditions, multimorbidity, cancer red flags, safety-netting, 2WW referral and survivorship.",
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
            name: "AKT Long-Term Conditions and Cancer",
            url: "https://medexia-akt.com/akt-long-term-conditions-cancer",
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
            MRCGP AKT long-term conditions and cancer revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            This topic tests everyday GP judgement: chronic disease reviews,
            multimorbidity, treatment burden, cancer red flags, safety-netting,
            survivorship and palliative transition.
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
              For AKT long-term conditions and cancer revision, prioritise
              multimorbidity, treatment burden, chronic disease monitoring,
              cancer red flags, NICE suspected-cancer referral, safety-netting,
              survivorship and palliative transitions.
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
                The hard part is choosing the safest next step when several
                problems compete. AKT questions may give a familiar disease,
                but the answer turns on cancer risk, medication harm,
                follow-up reliability, patient goals or whether further
                treatment creates more burden than benefit.
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
              AKT long-term conditions and cancer FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/long-term-conditions-including-cancer"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP long-term conditions including cancer topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng12"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE suspected cancer recognition and referral guideline
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
                href="https://www.nice.org.uk/guidance/qs55"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE cancer services for children and young people quality
                standard
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/long-term-conditions-cancer"
            >
              Open long-term conditions topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-older-adults"
            >
              Review older adults &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, local cancer pathways, local long-term condition
            protocols and BNF guidance for clinical decisions. Last reviewed
            June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
