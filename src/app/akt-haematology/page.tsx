import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Haematology Revision: Anaemia and VTE",
  description:
    "MRCGP AKT haematology revision: anaemia, iron deficiency, B12 and folate, VTE, anticoagulation, thrombocytopenia, abnormal FBC and red flags.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-haematology",
  },
  openGraph: {
    title: "MRCGP AKT Haematology Revision: Anaemia and VTE",
    description:
      "A focused AKT haematology guide covering anaemia, iron deficiency, VTE, anticoagulation, thrombocytopenia, abnormal FBC and urgent red flags.",
    type: "article",
    url: "https://medexia-akt.com/akt-haematology",
  },
};

const coreAreas = [
  {
    title: "Anaemia and iron deficiency",
    text: "Revise microcytic, normocytic and macrocytic anaemia, ferritin interpretation, iron replacement, response to treatment and when iron deficiency needs GI or gynaecology investigation.",
  },
  {
    title: "B12, folate and macrocytosis",
    text: "Know dietary causes, pernicious anaemia, malabsorption, alcohol, liver disease, hypothyroidism, medication effects and neurological symptoms that change urgency.",
  },
  {
    title: "VTE and anticoagulation",
    text: "Focus on DVT and PE probability, D-dimer use, urgent imaging pathways, DOAC safety, renal function, bleeding risk and duration of anticoagulation principles.",
  },
  {
    title: "Abnormal FBC patterns",
    text: "Cover thrombocytopenia, thrombocytosis, neutropenia, lymphocytosis, polycythaemia, repeat testing, artefact, infection, inflammation and malignancy signals.",
  },
  {
    title: "Bleeding and bruising",
    text: "Revise easy bruising, petechiae, mucosal bleeding, heavy menstrual bleeding, anticoagulant complications, liver disease, platelet disorders and urgent escalation triggers.",
  },
  {
    title: "Haematological cancer clues",
    text: "Know the red flags: unexplained anaemia, persistent lymphadenopathy, splenomegaly, night sweats, weight loss, recurrent infection, bone pain and abnormal blood film.",
  },
];

const redFlags = [
  "Severe anaemia symptoms, syncope, chest pain, breathlessness at rest or suspected active bleeding",
  "Iron-deficiency anaemia in an adult with GI symptoms, weight loss, rectal bleeding or abnormal examination",
  "Suspected PE with hypoxia, haemodynamic instability, syncope, pleuritic chest pain or haemoptysis",
  "Thrombocytopenia with mucosal bleeding, petechiae, neurological symptoms or suspected sepsis",
  "Neutropenia with fever, systemic illness, chemotherapy exposure or recurrent severe infection",
  "Lymphadenopathy with B symptoms, splenomegaly, unexplained bruising, bone pain or abnormal blood film",
];

const faqs = [
  {
    question: "Is haematology high yield for the MRCGP AKT?",
    answer:
      "Yes. Haematology is a named RCGP curriculum topic and AKT questions commonly test anaemia, iron deficiency, B12 and folate deficiency, VTE, anticoagulation, thrombocytopenia, abnormal FBC patterns and cancer red flags.",
  },
  {
    question: "What haematology topics should I revise for the AKT?",
    answer:
      "Prioritise anaemia patterns, ferritin interpretation, iron replacement, B12 and folate deficiency, VTE probability and D-dimer use, DOAC safety, thrombocytopenia, neutropenia, abnormal FBCs and haematological cancer red flags.",
  },
  {
    question: "How does anaemia come up in AKT questions?",
    answer:
      "Anaemia questions often test the MCV pattern, ferritin context, likely cause, oral iron dosing, expected response, referral thresholds and when iron deficiency suggests occult GI or gynaecological blood loss.",
  },
  {
    question: "What haematology red flags are high yield for the AKT?",
    answer:
      "Know severe anaemia symptoms, active bleeding, PE instability, thrombocytopenia with bleeding, febrile neutropenia, unexplained lymphadenopathy, B symptoms, splenomegaly and abnormal blood film findings.",
  },
];

export default function AktHaematologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Haematology Revision: Anaemia and VTE",
        description:
          "A focused MRCGP AKT haematology guide for anaemia, iron deficiency, B12 and folate deficiency, VTE, anticoagulation, thrombocytopenia, abnormal FBC patterns and red flags.",
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
            name: "AKT Haematology",
            url: "https://medexia-akt.com/akt-haematology",
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
            MRCGP AKT haematology revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Haematology questions test whether you can interpret common blood
            results safely, investigate anaemia properly, manage VTE pathways
            and recognise bleeding, clotting or cancer red flags.
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
              For AKT haematology revision, prioritise anaemia patterns,
              ferritin interpretation, iron replacement, B12 and folate
              deficiency, VTE probability, D-dimer use, DOAC safety,
              thrombocytopenia, abnormal FBCs and haematological cancer red
              flags.
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
              Why haematology questions catch candidates out
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
                The trap is usually over-reassurance: treating iron deficiency
                without looking for the cause, ignoring an abnormal FBC trend,
                missing bleeding risk on anticoagulants or forgetting that VTE
                pathways depend on pre-test probability.
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
              AKT haematology FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/haematology"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP haematology topic guide
              </a>
              <a
                href="https://cks.nice.org.uk/topics/anaemia-iron-deficiency/management/management/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS iron deficiency anaemia management
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng158"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE venous thromboembolic diseases guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng24"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE blood transfusion guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/haematology"
            >
              Open haematology topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-gastroenterology"
            >
              Review anaemia red flags &rarr;
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
