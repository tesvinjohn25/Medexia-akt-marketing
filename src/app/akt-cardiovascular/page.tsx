import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Cardiovascular Revision: AF and Hypertension",
  description:
    "MRCGP AKT cardiovascular revision: hypertension, atrial fibrillation, heart failure, chest pain, lipids, QRISK3 and emergency red flags.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-cardiovascular",
  },
  openGraph: {
    title: "MRCGP AKT Cardiovascular Revision: AF and Hypertension",
    description:
      "A focused AKT cardiovascular guide covering hypertension, AF, heart failure, chest pain, CVD risk, lipids and red flags.",
    type: "article",
    url: "https://medexia-akt.com/akt-cardiovascular",
  },
};

const coreAreas = [
  {
    title: "Hypertension",
    text: "Revise ABPM or HBPM confirmation, treatment thresholds, CVD risk, target-organ damage, diabetes or CKD, and the stepwise ACEi/ARB, CCB and thiazide-like pathway.",
  },
  {
    title: "Atrial fibrillation",
    text: "Know ECG confirmation, rate control, anticoagulation decisions, CHA2DS2-VASc, ORBIT bleeding risk and why aspirin is not stroke prevention in AF.",
  },
  {
    title: "Heart failure",
    text: "Focus on breathlessness, oedema, NT-proBNP thresholds, echo referral urgency, HFrEF medicines, renal monitoring and when acute heart failure is unsafe.",
  },
  {
    title: "Chest pain and ACS",
    text: "Separate stable angina from suspected acute coronary syndrome. If ACS is suspected, primary-care management is emergency escalation, not routine testing.",
  },
  {
    title: "Lipids and CVD risk",
    text: "Use QRISK3 for primary prevention, know statin thresholds, secondary prevention intensity and reviewing non-HDL cholesterol response.",
  },
  {
    title: "Stroke, TIA and vascular disease",
    text: "Revise FAST symptoms, TIA urgency, peripheral arterial disease, AAA screening, venous thromboembolism and red-flag limb ischaemia.",
  },
];

const redFlags = [
  "Suspected acute coronary syndrome or ongoing cardiac chest pain",
  "Acute breathlessness with pulmonary oedema or suspected acute heart failure",
  "Syncope with exertion, palpitations, ECG abnormality or structural heart disease",
  "Suspected TIA, stroke or new focal neurology",
  "Severe hypertension with end-organ symptoms",
  "Acute limb ischaemia, suspected aortic dissection or haemodynamic instability",
];

const faqs = [
  {
    question: "Is cardiovascular health high yield for the MRCGP AKT?",
    answer:
      "Yes. Cardiovascular health is a major RCGP clinical topic and AKT questions commonly test hypertension, atrial fibrillation, heart failure, lipid management, chest pain, CVD risk, stroke prevention and urgent red flags.",
  },
  {
    question: "What cardiovascular topics should I revise for the AKT?",
    answer:
      "Prioritise hypertension diagnosis and treatment, atrial fibrillation anticoagulation, heart failure and NT-proBNP, ACS red flags, lipid modification, QRISK3, TIA and stroke prevention, AAA screening and peripheral vascular disease.",
  },
  {
    question: "How does atrial fibrillation come up in AKT questions?",
    answer:
      "AF questions often test ECG confirmation, rate control, stroke-risk scoring, DOAC choice, bleeding-risk assessment and avoiding aspirin monotherapy for stroke prevention.",
  },
  {
    question: "What heart failure facts are high yield for the AKT?",
    answer:
      "Know when to request NT-proBNP, the referral urgency linked to high results, echocardiography, HFrEF medicine groups and monitoring renal function and potassium after treatment changes.",
  },
];

export default function AktCardiovascularPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Cardiovascular Revision: AF and Hypertension",
        description:
          "A focused MRCGP AKT cardiovascular guide for hypertension, atrial fibrillation, heart failure, chest pain, lipids, QRISK3 and emergency red flags.",
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
            name: "AKT Cardiovascular",
            url: "https://medexia-akt.com/akt-cardiovascular",
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
            MRCGP AKT cardiovascular revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Cardiovascular questions test everyday GP thresholds: which blood
            pressure needs treatment, which irregular pulse needs
            anticoagulation, when breathlessness needs NT-proBNP, and when
            chest pain or collapse is too unsafe for routine care.
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
              For AKT cardiovascular revision, prioritise hypertension, atrial
              fibrillation, heart failure, NT-proBNP, chest pain and ACS red
              flags, lipid modification, QRISK3, TIA and stroke prevention,
              AAA screening and peripheral vascular disease.
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
              Why cardiovascular questions catch candidates out
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
                The AKT often gives just enough information to test the next
                safest step: confirm the diagnosis, estimate risk, start
                treatment, refer urgently or call 999. Do not treat the topic as
                memorised cardiology; treat it as risk-based GP decision-making.
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
              AKT cardiovascular FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/cardiovascular-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP cardiovascular health topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng136"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE hypertension guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng196"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE atrial fibrillation guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng106"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE chronic heart failure guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng238"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CVD risk and lipid modification guideline
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
            <a className="btn-primary text-center text-[16px]" href="/topics/cardiovascular">
              Open cardiovascular topic &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/demo">
              Try sample AKT questions
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
