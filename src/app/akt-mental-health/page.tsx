import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Mental Health Revision: Depression and Risk",
  description:
    "MRCGP AKT mental health revision: depression, anxiety, suicide risk, self-harm, SSRIs, psychosis, eating disorders and Mental Health Act basics.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-mental-health",
  },
  openGraph: {
    title: "MRCGP AKT Mental Health Revision: Depression and Risk",
    description:
      "A focused AKT mental health guide covering depression, anxiety, suicide risk, self-harm, SSRIs, psychosis and Mental Health Act basics.",
    type: "article",
    url: "https://medexia-akt.com/akt-mental-health",
  },
};

const coreAreas = [
  {
    title: "Depression",
    text: "Recognise severity, functional impairment, psychotic symptoms, chronic physical-health overlap, relapse risk and when psychological therapy or medication is most appropriate.",
  },
  {
    title: "Anxiety and panic",
    text: "Revise GAD, panic disorder, OCD, PTSD, stepped care, CBT, SSRI use and when symptoms could represent physical illness instead.",
  },
  {
    title: "Suicide risk and self-harm",
    text: "Ask directly about suicidal thoughts, intent, plan, means, previous attempts, alcohol or substance misuse, protective factors and immediate safety.",
  },
  {
    title: "SSRI prescribing",
    text: "Know common adverse effects, early worsening, under-25 suicide-risk warnings, discontinuation symptoms, serotonin syndrome and review timing.",
  },
  {
    title: "Psychosis and severe mental illness",
    text: "Recognise first-episode psychosis, urgent referral, antipsychotic metabolic effects, physical-health checks and diagnostic overshadowing.",
  },
  {
    title: "Eating disorders and legal frameworks",
    text: "Revise anorexia and bulimia red flags, physical-risk thresholds, safeguarding, capacity, Mental Health Act sections and emergency escalation.",
  },
];

const riskSignals = [
  "Clear suicidal plan, access to means or preparations",
  "Recent self-harm, escalating frequency or high-lethality method",
  "Psychotic depression, command hallucinations or severe agitation",
  "First-episode psychosis or rapidly deteriorating mental state",
  "Severe eating disorder features, syncope, bradycardia or electrolyte concern",
  "Substance misuse, social isolation, domestic abuse or safeguarding concern",
];

const faqs = [
  {
    question: "Is mental health high yield for the MRCGP AKT?",
    answer:
      "Yes. Mental health is one of the RCGP clinical topic guides and AKT questions commonly test depression, anxiety, suicide risk, self-harm, antidepressant prescribing, psychosis, eating disorders and legal frameworks.",
  },
  {
    question: "What mental health topics should I revise for the AKT?",
    answer:
      "Prioritise depression severity, anxiety and panic, suicide risk, self-harm, SSRI prescribing, psychosis, antipsychotic monitoring, eating disorders, safeguarding, the Mental Health Act and the Mental Capacity Act.",
  },
  {
    question: "How should I revise suicide risk for the AKT?",
    answer:
      "Practise direct risk assessment: suicidal thoughts, intent, plan, means, previous attempts, current mental state, substance use, protective factors, safeguarding and whether same-day crisis or emergency help is needed.",
  },
  {
    question: "Are antidepressant side effects tested in AKT mental health questions?",
    answer:
      "Yes. AKT questions can test SSRI adverse effects, early review, discontinuation symptoms, serotonin syndrome, interactions, under-25 risk warnings and safe prescribing in complex patients.",
  },
];

export default function AktMentalHealthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Mental Health Revision: Depression and Risk",
        description:
          "A focused MRCGP AKT mental health guide for depression, anxiety, suicide risk, self-harm, SSRIs, psychosis, eating disorders and legal frameworks.",
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
            name: "AKT Mental Health",
            url: "https://medexia-akt.com/akt-mental-health",
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
            MRCGP AKT mental health revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Mental health questions test more than diagnosis. The AKT often
            asks whether you can judge risk, prescribe safely, spot physical
            health overlap and choose the right level of follow-up or referral
            in a primary-care scenario.
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
              For AKT mental health, prioritise depression, anxiety, suicide
              risk, self-harm, SSRI prescribing, psychosis, antipsychotic
              monitoring, eating disorders, safeguarding, the Mental Health Act
              and the Mental Capacity Act.
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
              Risk signals to recognise quickly
            </h2>
            <ul
              className="mt-4 grid gap-3 sm:grid-cols-2"
              style={{ color: "var(--fg-mid)" }}
            >
              {riskSignals.map((signal) => (
                <li
                  key={signal}
                  className="rounded-xl p-4 text-[14px] leading-[1.55]"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {signal}
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
              Why AKT mental health questions feel tricky
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
                The correct answer is often the safest next step, not the most
                dramatic diagnosis. Look for risk, capacity, safeguarding,
                medication harms, physical-health mimics and whether the person
                can wait for routine review.
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
              AKT mental health FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/mental-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP mental health topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng222"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE depression in adults guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg113"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE generalised anxiety and panic disorder guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng225"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE self-harm guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng215"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE medicines dependence and withdrawal guideline
              </a>
              <a
                href="https://cks.nice.org.uk/topics/depression/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS depression
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
            <a className="btn-primary text-center text-[16px]" href="/topics/mental-health">
              Open mental health topic &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/akt-audio-revision">
              Explore audio revision
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE CKS and BNF guidance for clinical decisions. Last
            reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
