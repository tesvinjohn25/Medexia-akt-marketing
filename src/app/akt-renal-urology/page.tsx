import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Renal and Urology Revision: CKD and UTI",
  description:
    "MRCGP AKT renal and urology revision: CKD, eGFR, ACR, AKI, UTI, haematuria, LUTS, PSA, renal stones and urgent referral red flags.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-renal-urology",
  },
  openGraph: {
    title: "MRCGP AKT Renal and Urology Revision: CKD and UTI",
    description:
      "A focused AKT renal and urology guide covering CKD, AKI, UTI, haematuria, LUTS, PSA, renal stones and urgent referral red flags.",
    type: "article",
    url: "https://medexia-akt.com/akt-renal-urology",
  },
};

const coreAreas = [
  {
    title: "CKD staging and monitoring",
    text: "Revise eGFR, ACR categories, repeat testing, blood pressure targets, CVD risk reduction, ACEi or ARB use, SGLT2 inhibitor indications and referral thresholds.",
  },
  {
    title: "AKI and medicine safety",
    text: "Know the AKI clues in primary care: acute illness, dehydration, NSAIDs, ACEi or ARBs, diuretics, metformin, contrast exposure and when urgent same-day assessment is needed.",
  },
  {
    title: "UTI and pyelonephritis",
    text: "Separate lower UTI, recurrent UTI, pregnancy, men, catheter-associated infection and pyelonephritis. The AKT often tests culture, antibiotic choice and escalation.",
  },
  {
    title: "Haematuria and cancer pathways",
    text: "Focus on visible versus non-visible haematuria, proteinuria, infection, age thresholds, bladder or renal cancer referral and when repeat urine testing is not enough.",
  },
  {
    title: "LUTS, PSA and prostate disease",
    text: "Revise storage and voiding symptoms, IPSS, DRE, PSA counselling, prostatitis, BPH medicines and suspected prostate cancer referral signals.",
  },
  {
    title: "Renal stones and acute retention",
    text: "Know renal colic, CT KUB, NSAID analgesia, infection with obstruction, single kidney risk, bilateral obstruction and acute urinary retention management.",
  },
];

const redFlags = [
  "Suspected AKI with sepsis, dehydration, oliguria, hyperkalaemia or rapid eGFR fall",
  "Visible haematuria, persistent non-visible haematuria with risk factors or haematuria with proteinuria",
  "Renal colic with fever, rigors, single kidney, bilateral obstruction or uncontrolled pain",
  "Acute urinary retention, catheter complications or post-renal obstruction",
  "Testicular pain or swelling where torsion, cancer or serious infection is possible",
  "Abnormal DRE, concerning PSA context or systemic symptoms suggesting urological malignancy",
];

const faqs = [
  {
    question: "Is renal and urology high yield for the MRCGP AKT?",
    answer:
      "Yes. The RCGP renal and urology topic includes CKD monitoring, AKI, UTI, haematuria, urinary retention, LUTS, prostate disease, renal stones, testicular pathology and urological cancer referral thresholds.",
  },
  {
    question: "What renal topics should I revise for the AKT?",
    answer:
      "Prioritise CKD staging with eGFR and ACR, blood pressure and CVD risk, ACEi or ARB monitoring, SGLT2 inhibitor indications, AKI recognition, medicine safety, renal referral thresholds and hyperkalaemia risk.",
  },
  {
    question: "How does haematuria come up in AKT questions?",
    answer:
      "Haematuria questions usually test visible versus non-visible haematuria, age and cancer-risk thresholds, infection, proteinuria suggesting renal disease, and whether referral or repeat testing is the safest next step.",
  },
  {
    question: "What UTI facts are high yield for the AKT?",
    answer:
      "Know when urine culture is needed, how pregnancy, men, recurrent infection, catheters and pyelonephritis change management, and when red flags mean same-day assessment rather than routine antibiotics.",
  },
];

export default function AktRenalUrologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Renal and Urology Revision: CKD and UTI",
        description:
          "A focused MRCGP AKT renal and urology guide for CKD, eGFR, ACR, AKI, UTI, haematuria, LUTS, PSA, renal stones and urgent referral red flags.",
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
            name: "AKT Renal and Urology",
            url: "https://medexia-akt.com/akt-renal-urology",
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
            MRCGP AKT renal and urology revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Renal and urology questions are threshold-heavy: whether an eGFR or
            ACR needs action, whether a medicine should be paused, whether
            haematuria is safe to repeat, and when urinary symptoms point to
            cancer, obstruction or infection.
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
              For AKT renal and urology revision, prioritise CKD staging,
              eGFR, ACR, AKI, medication safety, UTI, pyelonephritis,
              haematuria, LUTS, PSA counselling, renal stones, acute urinary
              retention and urgent urology referral red flags.
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
              Why renal questions catch candidates out
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
                The trap is usually not obscure nephrology. It is deciding what
                the result means today: repeat, monitor, stop a risky medicine,
                refer for cancer, treat infection, or escalate because the
                patient may have AKI, obstruction or sepsis.
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
              AKT renal and urology FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/renal-urology"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP renal and urology topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng203"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE chronic kidney disease guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng12"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE suspected cancer referral guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng109"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE lower UTI antimicrobial guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng112"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE recurrent UTI antimicrobial guideline
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
              href="/topics/renal-urology"
            >
              Open renal topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-prescribing-and-medication-safety"
            >
              Review medication safety
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
