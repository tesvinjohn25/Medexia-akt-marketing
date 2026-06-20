import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Population and Planetary Health Revision",
  description:
    "MRCGP AKT population and planetary health revision: screening, immunisation, prevention, health inequalities, wider determinants and greener primary care.",
  alternates: {
    canonical:
      "https://medexia-akt.com/akt-population-planetary-health",
  },
  openGraph: {
    title: "MRCGP AKT Population and Planetary Health Revision",
    description:
      "A focused AKT guide covering screening, immunisation, prevention, health inequalities, wider determinants and greener primary care.",
    type: "article",
    url: "https://medexia-akt.com/akt-population-planetary-health",
  },
};

const coreAreas = [
  {
    title: "Screening programmes",
    text: "Revise who is invited, why screening is offered to defined groups, benefits, harms, false positives, false negatives, informed choice and follow-up responsibilities.",
  },
  {
    title: "Immunisation",
    text: "Know the routine schedule, missed vaccines, contraindications, live vaccine cautions, opportunistic catch-up, pregnancy vaccines and how to handle hesitancy.",
  },
  {
    title: "Prevention and risk",
    text: "Focus on smoking, alcohol, obesity, cardiovascular risk, cancer prevention, sexual health, antimicrobial stewardship and brief interventions in primary care.",
  },
  {
    title: "Health inequalities",
    text: "Link outcomes to deprivation, ethnicity, disability, homelessness, language, access barriers, digital exclusion and reasonable adjustments.",
  },
  {
    title: "Wider determinants",
    text: "Understand how housing, work, education, income, social isolation, environment and adverse childhood experiences affect consultation risk and management.",
  },
  {
    title: "Planetary health",
    text: "Revise sustainable prescribing, inhaler carbon footprint, low-value care, waste reduction, active travel, prevention and resource stewardship.",
  },
];

const redFlags = [
  "Safeguarding concern, neglect, domestic abuse, exploitation or inability to access urgent care",
  "Severe infection risk in an under-immunised child, pregnancy, immunosuppression or vulnerable household",
  "Missed cancer screening follow-up, abnormal screening result or red-flag symptom hidden inside a prevention stem",
  "Population-health question where the safest answer is targeted outreach rather than blaming non-attendance",
  "Planetary-health stem where greener care must not override clinical effectiveness, consent or patient safety",
  "Health-inequality scenario involving language barriers, disability, homelessness, digital exclusion or lack of reasonable adjustments",
];

const faqs = [
  {
    question: "Is population and planetary health tested in the MRCGP AKT?",
    answer:
      "Yes. It is a named RCGP curriculum topic. AKT questions can test screening, immunisation, prevention, health inequalities, wider determinants of health, sustainable prescribing and resource stewardship.",
  },
  {
    question: "What should I revise first for AKT population health?",
    answer:
      "Start with NHS screening programmes, routine immunisation, cardiovascular and cancer prevention, health inequalities, deprivation, access barriers, antimicrobial stewardship and safe follow-up systems.",
  },
  {
    question: "How does planetary health come up in AKT questions?",
    answer:
      "Planetary-health questions usually test safe resource stewardship: avoiding low-value care, reducing waste, considering inhaler carbon footprint, prevention and shared decisions without compromising clinical care.",
  },
  {
    question: "What is the common AKT trap with health inequalities?",
    answer:
      "The trap is treating non-attendance or poor uptake as an individual failure. Better answers consider access, language, disability, deprivation, digital exclusion, targeted outreach and reasonable adjustments.",
  },
];

export default function AktPopulationPlanetaryHealthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Population and Planetary Health Revision",
        description:
          "A focused MRCGP AKT guide for screening, immunisation, prevention, health inequalities, wider determinants and greener primary care.",
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
            name: "AKT Population and Planetary Health",
            url: "https://medexia-akt.com/akt-population-planetary-health",
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
            MRCGP AKT population and planetary health revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            These questions test practical GP prevention: screening,
            immunisation, wider determinants, health inequalities, greener
            prescribing and using resources without missing risk.
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
              For AKT population and planetary health revision, prioritise NHS
              screening, immunisation, prevention, health inequalities, wider
              determinants, antimicrobial stewardship, inhaler carbon footprint
              and safe resource stewardship.
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
                The trap is revising this as abstract public health. AKT stems
                usually ask for a GP-safe action: invite, explain, follow up,
                safety-net, remove barriers, choose lower-risk prescribing or
                avoid low-value care while keeping the patient safe.
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
              AKT population health FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/population-planetary-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP population and planetary health topic guide
              </a>
              <a
                href="https://www.nhs.uk/tests-and-treatments/nhs-screening/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS screening overview
              </a>
              <a
                href="https://www.gov.uk/government/publications/the-complete-routine-immunisation-schedule/complete-routine-immunisation-schedule-from-1-january-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                UKHSA routine immunisation schedule
              </a>
              <a
                href="https://www.england.nhs.uk/greenernhs/a-net-zero-nhs/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS England delivering a net zero NHS
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/population-planetary-health"
            >
              Open population health topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-respiratory"
            >
              Review respiratory and inhalers &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NHS, UKHSA, NICE, local screening and immunisation guidance
            for clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
