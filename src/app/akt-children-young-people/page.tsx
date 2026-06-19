import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Children and Young People Revision",
  description:
    "MRCGP AKT children revision: paediatric cancer, acute illness, safeguarding, immunisation, development, adolescent health and feedback themes.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-children-young-people",
  },
  openGraph: {
    title: "MRCGP AKT Children and Young People Revision",
    description:
      "A focused AKT children guide covering paediatric cancer, acute illness, safeguarding, immunisation, development and adolescent health.",
    type: "article",
    url: "https://medexia-akt.com/akt-children-young-people",
  },
};

const childAreas = [
  {
    title: "Acute illness in children",
    text: "Recognise sepsis, meningitis, non-blanching rash, respiratory distress, dehydration, fever in infants and when same-day or emergency assessment is needed.",
  },
  {
    title: "Paediatric cancer recognition",
    text: "Revise persistent unexplained symptoms, repeated presentations, red flags such as bone pain, lymphadenopathy, weight loss, bruising and neurological signs.",
  },
  {
    title: "Safeguarding",
    text: "Know categories of abuse, concerning presentations, repeated attendance, information sharing, documentation and when to escalate concerns.",
  },
  {
    title: "Development and milestones",
    text: "Learn common developmental milestones, red flags for delay, speech and language concerns, regression and when to refer.",
  },
  {
    title: "Immunisation and infection",
    text: "Keep the UK childhood schedule fresh and revise common infections such as scarlet fever, measles, chickenpox, otitis media and meningitis.",
  },
  {
    title: "Adolescent health",
    text: "Revise confidentiality, Fraser guidance, self-harm, eating disorders, acne, sexual health and safeguarding risk in teenagers.",
  },
];

const feedbackSignals = [
  {
    sitting: "October 2025",
    text: "The official feedback report highlighted paediatric cancer, acute illness in children and safeguarding as areas that caused difficulty.",
  },
  {
    sitting: "April 2026",
    text: "The latest feedback again mentioned safeguarding children with confidentiality, keeping children and young people in the weak-area cluster.",
  },
  {
    sitting: "Revision priority",
    text: "Paediatric AKT questions often test escalation: what is common, what is serious, what needs safety-netting and when safeguarding changes the plan.",
  },
];

const redFlags = [
  "Non-blanching rash, neck stiffness, photophobia or altered consciousness",
  "Respiratory distress, cyanosis, exhaustion or poor feeding in an infant",
  "Fever in a very young infant or a child who looks seriously unwell",
  "Unexplained bruising, repeated injuries or inconsistent history",
  "Persistent bone pain, weight loss, night sweats or lymphadenopathy",
  "Regression, developmental loss or new neurological signs",
];

const faqs = [
  {
    question: "Is paediatrics high yield for the MRCGP AKT?",
    answer:
      "Yes. Children and young people is a full RCGP curriculum topic and recent AKT feedback has highlighted paediatric cancer, acute illness in children, safeguarding and confidentiality themes.",
  },
  {
    question: "What children topics should I revise for the AKT?",
    answer:
      "Prioritise acute illness recognition, paediatric cancer red flags, safeguarding, developmental milestones, immunisation, common childhood infections, adolescent health, confidentiality and Fraser guidance.",
  },
  {
    question: "How should I revise paediatric cancer for the AKT?",
    answer:
      "Focus on recognition rather than oncology detail: persistent unexplained symptoms, repeated presentations, bone pain, lymphadenopathy, bruising, weight loss, night sweats and new neurological signs.",
  },
  {
    question: "How does safeguarding appear in AKT child-health questions?",
    answer:
      "Safeguarding questions often test whether you recognise concerning patterns, share information appropriately, document the rationale and escalate rather than simply treating the presenting symptom in isolation.",
  },
];

export default function AktChildrenYoungPeoplePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Children and Young People Revision",
        description:
          "A focused MRCGP AKT guide for paediatrics, child safeguarding, acute illness, paediatric cancer, immunisation and adolescent health.",
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
            name: "AKT Children and Young People",
            url: "https://medexia-akt.com/akt-children-young-people",
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
            MRCGP AKT children and young people revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Paediatrics in the AKT is about recognising risk quickly. Recent
            feedback points to paediatric cancer, acute illness, safeguarding
            and confidentiality, so revise common presentations alongside the
            red flags you cannot miss.
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
              For AKT children and young people, prioritise acute illness,
              paediatric cancer red flags, safeguarding, developmental
              milestones, immunisation, childhood infections, adolescent health,
              confidentiality and Fraser guidance.
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
              {childAreas.map((area) => (
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
              Recent feedback signals
            </h2>
            <div className="mt-4 grid gap-3">
              {feedbackSignals.map((signal) => (
                <article
                  key={signal.sitting}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="grid gap-2 sm:grid-cols-[130px_1fr]">
                    <h3
                      className="text-[13px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--brand-emerald)" }}
                    >
                      {signal.sitting}
                    </h3>
                    <p
                      className="text-[14px] leading-[1.65]"
                      style={{ color: "var(--fg-mid)" }}
                    >
                      {signal.text}
                    </p>
                  </div>
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
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT children FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/children-young-people"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP children and young people topic guide
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/further-help-support"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT feedback reports
              </a>
              <a
                href="https://www.rcgp.org.uk/getmedia/0736ec09-1f0f-4a7f-ab26-722e8da4d5a1/October-2025-AKT-feedback-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP October 2025 AKT feedback report
              </a>
              <a
                href="https://www.rcgp.org.uk/learning-resources/safeguarding-standards"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP safeguarding standards
              </a>
              <a
                href="https://cks.nice.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE Clinical Knowledge Summaries
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
            <a
              className="btn-primary text-center text-[16px]"
              href="/akt-feedback-reports"
            >
              Review feedback themes &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/topics/children-young-people">
              Open children topic
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
