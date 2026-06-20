import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Neurodiversity Revision: ADHD, Autism and GP Care",
  description:
    "MRCGP AKT neurodiversity revision: ADHD, autism, referral pathways, medication monitoring, reasonable adjustments and mental health overlap.",
  alternates: {
    canonical:
      "https://medexia-akt.com/akt-neurodevelopmental-neurodiversity",
  },
  openGraph: {
    title: "MRCGP AKT Neurodiversity Revision: ADHD, Autism and GP Care",
    description:
      "A focused AKT neurodiversity guide covering ADHD, autism, referral pathways, medication monitoring, reasonable adjustments and mental health overlap.",
    type: "article",
    url: "https://medexia-akt.com/akt-neurodevelopmental-neurodiversity",
  },
};

const coreAreas = [
  {
    title: "ADHD recognition",
    text: "Revise persistent inattention, hyperactivity or impulsivity across settings, functional impairment, childhood onset clues and adult presentations such as inner restlessness.",
  },
  {
    title: "Autism recognition",
    text: "Know social communication differences, restricted or repetitive patterns, sensory sensitivities, masking, late adult presentation and when specialist assessment is needed.",
  },
  {
    title: "Referral pathways",
    text: "GPs recognise and refer rather than diagnose most ADHD or autism presentations. AKT stems often test appropriate specialist referral and avoiding unsupported reassurance.",
  },
  {
    title: "Medication monitoring",
    text: "Cover stimulant and non-stimulant ADHD medicines, shared-care principles, baseline cardiovascular checks, blood pressure, pulse, weight, appetite, sleep and mood monitoring.",
  },
  {
    title: "Reasonable adjustments",
    text: "Revise predictable appointments, written summaries, clear literal language, reduced sensory load, extra processing time and flexible examination or investigation plans.",
  },
  {
    title: "Mental health overlap",
    text: "Anxiety, depression, eating disorders, sleep problems, self-harm and substance misuse may present differently in neurodivergent patients and need adapted assessment.",
  },
];

const redFlags = [
  "Suicidal ideation, self-harm, severe depression, psychosis, safeguarding concern or acute functional collapse",
  "New severe anxiety, eating restriction, school refusal, burnout, shutdowns or marked deterioration after transition",
  "Chest pain, syncope, palpitations, severe hypertension, weight loss or serious adverse effects on ADHD medication",
  "Substance misuse, medication diversion, escalating stimulant dose requests or unsafe shared-care monitoring gaps",
  "Diagnostic overshadowing where pain, epilepsy, sleep disorder, endocrine disease or mental illness is being missed",
  "Carer breakdown, domestic abuse, exploitation, bullying, isolation or inability to access routine healthcare",
];

const faqs = [
  {
    question: "Is neurodiversity tested in the MRCGP AKT?",
    answer:
      "Yes. Neurodevelopmental conditions and neurodiversity is a named RCGP curriculum topic. AKT questions can test ADHD, autism, referral pathways, reasonable adjustments, mental health overlap and medication monitoring.",
  },
  {
    question: "What should I revise first for AKT neurodiversity?",
    answer:
      "Prioritise ADHD and autism recognition, specialist referral pathways, reasonable adjustments, shared-care medication monitoring, safeguarding, diagnostic overshadowing and mental health comorbidity.",
  },
  {
    question: "Can a GP diagnose ADHD or autism for the AKT?",
    answer:
      "In most AKT scenarios, the GP role is to recognise features, assess risk and impairment, make reasonable adjustments, and refer to an appropriate specialist assessment pathway rather than making a new diagnosis alone.",
  },
  {
    question: "What monitoring matters for ADHD medication?",
    answer:
      "Know baseline cardiovascular history, blood pressure, pulse, height or weight, appetite, sleep, mood and adverse effects. Shared-care prescribing depends on local arrangements and specialist initiation.",
  },
];

export default function AktNeurodevelopmentalNeurodiversityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Neurodiversity Revision: ADHD, Autism and GP Care",
        description:
          "A focused MRCGP AKT neurodiversity guide for ADHD, autism, referral pathways, medication monitoring, reasonable adjustments and mental health overlap.",
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
            name: "AKT Neurodevelopmental Conditions and Neurodiversity",
            url: "https://medexia-akt.com/akt-neurodevelopmental-neurodiversity",
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
            MRCGP AKT neurodiversity revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Neurodevelopmental questions test recognition and safe GP support:
            ADHD, autism, referral pathways, reasonable adjustments,
            medication monitoring and mental health overlap.
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
              For AKT neurodiversity revision, prioritise ADHD and autism
              recognition, specialist referral pathways, reasonable
              adjustments, shared-care medication monitoring, diagnostic
              overshadowing, safeguarding and mental health comorbidity.
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
                The common mistake is treating neurodivergence as a narrow
                diagnosis question. AKT stems often test access, adaptation,
                medication safety, risk assessment and whether mental or
                physical illness is being missed.
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
              AKT neurodiversity FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/neurodevelopmental-conditions-neurodiversity"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP neurodevelopmental conditions and neurodiversity topic
                guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng87"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE ADHD diagnosis and management guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg128"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE autism under-19 recognition, referral and diagnosis
                guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg142"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE autism in adults diagnosis and management guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/neurodevelopmental-neurodiversity"
            >
              Open neurodiversity topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-learning-disability"
            >
              Review learning disability &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, local neurodevelopmental pathways, shared-care
            arrangements and BNF guidance for clinical decisions. Last reviewed
            June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
