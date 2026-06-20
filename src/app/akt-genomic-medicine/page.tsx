import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Genomic Medicine Revision",
  description:
    "MRCGP AKT genomic medicine revision: family history, inheritance, genetic testing, cancer genetics, rare disease, pharmacogenomics and NHS referral routes.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-genomic-medicine",
  },
  openGraph: {
    title: "MRCGP AKT Genomic Medicine Revision",
    description:
      "A focused AKT guide covering family history, inheritance patterns, cancer genetics, rare disease, genomic testing and primary care referral decisions.",
    type: "article",
    url: "https://medexia-akt.com/akt-genomic-medicine",
  },
};

const coreAreas = [
  {
    title: "Family history",
    text: "Revise how to take a three-generation family history, identify first- and second-degree relatives, age at diagnosis and clustering of cancer or inherited disease.",
  },
  {
    title: "Inheritance patterns",
    text: "Know autosomal dominant, autosomal recessive, X-linked, mitochondrial and multifactorial inheritance well enough to interpret common AKT pedigrees.",
  },
  {
    title: "Cancer genetics",
    text: "Focus on breast, ovarian, bowel, prostate and pancreatic cancer patterns, early onset, bilateral disease and when family history should trigger specialist assessment.",
  },
  {
    title: "Rare disease signals",
    text: "Look for multisystem features, developmental delay, dysmorphism, unexplained recurrent problems, consanguinity and repeated family events.",
  },
  {
    title: "Testing and consent",
    text: "Understand that genomic testing affects relatives, needs informed consent, may produce uncertain results and is usually coordinated through specialist pathways.",
  },
  {
    title: "Primary care role",
    text: "GPs identify risk, explain uncertainty, refer appropriately, support long-term care and respond safely to direct-to-consumer or incidental genomic information.",
  },
];

const traps = [
  "Reassuring a patient with a strong family history because their own examination is normal",
  "Forgetting age at diagnosis and degree of relative when assessing familial cancer risk",
  "Treating a genetic test result as isolated to one patient when it may affect relatives",
  "Overinterpreting direct-to-consumer DNA results without clinical context or specialist advice",
  "Missing that a rare disease may present as multiple ordinary symptoms across systems",
  "Confusing autosomal dominant vertical transmission with autosomal recessive sibling clustering",
];

const faqs = [
  {
    question: "Is genomic medicine tested in the MRCGP AKT?",
    answer:
      "Yes. Genomic medicine is an RCGP curriculum topic. AKT questions can test family history, inheritance patterns, familial cancer risk, rare disease clues, genomic testing, consent, referral routes and primary care follow-up.",
  },
  {
    question: "What should I revise first for AKT genomic medicine?",
    answer:
      "Start with family-history taking, first- and second-degree relatives, inheritance patterns, familial breast or bowel cancer clues, rare disease red flags, genetic testing consent and when to refer to specialist services.",
  },
  {
    question: "How do genomic medicine questions usually appear in the AKT?",
    answer:
      "They often appear as ordinary GP consultations: a patient worried about family cancer, a child with developmental features, a direct-to-consumer DNA result, a medicine affected by genetics or a family needing referral advice.",
  },
  {
    question: "Do I need detailed molecular genetics for the AKT?",
    answer:
      "Usually no. The AKT is more likely to test practical primary care decisions: family history, pattern recognition, consent, uncertainty, referral and safe explanation of genetic or genomic risk.",
  },
];

export default function AktGenomicMedicinePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Genomic Medicine Revision",
        description:
          "A focused MRCGP AKT guide for family history, inheritance patterns, cancer genetics, rare disease, genomic testing and primary care referral decisions.",
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
            name: "AKT Genomic Medicine",
            url: "https://medexia-akt.com/akt-genomic-medicine",
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
            MRCGP AKT genomic medicine revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            These questions test how genomics appears in primary care: family
            history, inherited cancer risk, rare disease clues, testing
            decisions, consent and safe referral into NHS pathways.
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
              For AKT genomic medicine, prioritise family history,
              inheritance patterns, familial cancer clues, rare disease red
              flags, consent for genomic testing, referral thresholds and how
              to handle uncertainty or direct-to-consumer results safely.
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
              Common AKT traps
            </h2>
            <ul
              className="mt-4 grid gap-3 sm:grid-cols-2"
              style={{ color: "var(--fg-mid)" }}
            >
              {traps.map((trap) => (
                <li
                  key={trap}
                  className="rounded-xl p-4 text-[14px] leading-[1.55]"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {trap}
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
                The trap is expecting molecular detail. AKT genomic medicine is
                usually about practical primary care: spotting a pattern,
                taking the right family history, explaining uncertainty,
                considering relatives and referring through the right NHS
                pathway.
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
              AKT genomic medicine FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/genomic-medicine"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP genomic medicine topic guide
              </a>
              <a
                href="https://www.genomicseducation.hee.nhs.uk/genomics-in-healthcare/genomics-in-primary-care/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS Genomics Education: genomics in primary care
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg164/chapter/recommendations"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE familial breast cancer recommendations
              </a>
              <a
                href="https://www.england.nhs.uk/genomics/nhs-genomic-med-service/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS England Genomic Medicine Service
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/genomic-medicine"
            >
              Open genomic medicine topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-long-term-conditions-cancer"
            >
              Review cancer risk &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NHS, NICE, local genomic-medicine pathways and specialist
            advice for clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
