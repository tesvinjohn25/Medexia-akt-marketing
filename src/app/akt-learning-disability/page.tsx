import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Learning Disability Revision: Health Checks and Capacity",
  description:
    "MRCGP AKT learning disability revision: annual health checks, reasonable adjustments, diagnostic overshadowing, capacity, epilepsy and behaviour that challenges.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-learning-disability",
  },
  openGraph: {
    title: "MRCGP AKT Learning Disability Revision: Health Checks and Capacity",
    description:
      "A focused AKT learning disability guide covering annual health checks, reasonable adjustments, diagnostic overshadowing, capacity, epilepsy and behaviour that challenges.",
    type: "article",
    url: "https://medexia-akt.com/akt-learning-disability",
  },
};

const coreAreas = [
  {
    title: "Annual health checks",
    text: "Revise the learning disability register, annual health checks from age 14, health action plans, carers, screening, immunisation, medicines and long-term condition review.",
  },
  {
    title: "Reasonable adjustments",
    text: "Know practical adjustments such as longer appointments, easy-read information, accessible communication, familiar supporters and flexible examination or investigation plans.",
  },
  {
    title: "Diagnostic overshadowing",
    text: "AKT stems often test whether physical or mental illness is missed because new symptoms are wrongly attributed to the learning disability.",
  },
  {
    title: "Capacity and consent",
    text: "Focus on decision-specific capacity, supported decision-making, best interests, advocacy, safeguarding and when carers can or cannot consent on behalf of someone.",
  },
  {
    title: "Behaviour that challenges",
    text: "Look for pain, infection, constipation, medication effects, sensory distress, communication needs, mental illness, environmental triggers and carer strain before assuming behaviour is intentional.",
  },
  {
    title: "Common comorbidity",
    text: "Cover epilepsy, dysphagia, constipation, reflux, sensory impairment, mental health problems, autism overlap, obesity, osteoporosis and premature ageing.",
  },
];

const redFlags = [
  "Any acute change in behaviour, function, sleep, appetite, mobility or communication without a clear explanation",
  "Pain, fever, vomiting, constipation, urinary symptoms, seizure change or swallowing difficulty that may be under-reported",
  "Possible abuse, neglect, restraint concern, unexplained injuries, carer breakdown or unsafe living situation",
  "New mental health symptoms, self-injury, withdrawal, agitation, psychosis, severe anxiety or suicidal risk",
  "Medication toxicity, anticholinergic burden, sedative effects, missed monitoring or multiple psychotropics",
  "Loss of capacity for a specific decision, conflict about best interests or lack of an appropriate advocate",
];

const faqs = [
  {
    question: "Is learning disability tested in the MRCGP AKT?",
    answer:
      "Yes. Learning disability is a named RCGP curriculum topic. AKT questions can test annual health checks, reasonable adjustments, capacity, safeguarding, diagnostic overshadowing, epilepsy, mental health and behaviour that challenges.",
  },
  {
    question: "What should I revise first for AKT learning disability?",
    answer:
      "Prioritise annual health checks and health action plans, reasonable adjustments, diagnostic overshadowing, supported communication, decision-specific capacity, safeguarding, epilepsy, constipation, mental health and medication review.",
  },
  {
    question: "What is diagnostic overshadowing?",
    answer:
      "Diagnostic overshadowing is when symptoms are incorrectly attributed to a person's learning disability rather than investigated as possible physical or mental illness. In AKT questions, the safest answer usually looks for a treatable cause.",
  },
  {
    question: "Who can have a learning disability annual health check?",
    answer:
      "In England, people aged 14 or over on their GP practice learning disability register can have a free annual health check, with an updated health action plan after the review.",
  },
];

export default function AktLearningDisabilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Learning Disability Revision: Health Checks and Capacity",
        description:
          "A focused MRCGP AKT learning disability guide for annual health checks, reasonable adjustments, diagnostic overshadowing, capacity, epilepsy and behaviour that challenges.",
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
            name: "AKT Learning Disability",
            url: "https://medexia-akt.com/akt-learning-disability",
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
            MRCGP AKT learning disability revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Learning disability questions test whether you can adapt primary
            care safely: communicate clearly, make reasonable adjustments,
            avoid diagnostic overshadowing and involve carers without losing
            the person&apos;s rights.
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
              For AKT learning disability revision, prioritise annual health
              checks, health action plans, reasonable adjustments, diagnostic
              overshadowing, supported communication, capacity, safeguarding,
              epilepsy, mental health and medication review.
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
                The AKT trap is assuming the presentation is behavioural or
                social when there may be pain, infection, constipation,
                medication harm, mental illness or safeguarding risk. The safer
                answer usually adapts the consultation and looks for the cause.
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
              AKT learning disability FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/learning-disability"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP learning disability topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/qs187/chapter/quality-statement-4-annual-health-check"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE annual health check quality statement
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng11"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE behaviour that challenges guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng54"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE mental health problems in people with learning
                disabilities guideline
              </a>
              <a
                href="https://www.nhs.uk/conditions/learning-disabilities/annual-health-checks/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS learning disability annual health checks
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/learning-disability"
            >
              Open learning disability topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-confidentiality-safeguarding-data-protection"
            >
              Review safeguarding &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, NHS, safeguarding, local learning disability and BNF
            guidance for clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
