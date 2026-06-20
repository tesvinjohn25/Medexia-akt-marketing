import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Gastroenterology Revision: IBS and IBD",
  description:
    "MRCGP AKT gastroenterology revision: IBS, IBD, coeliac disease, dyspepsia, H. pylori, liver disease, rectal bleeding and cancer red flags.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-gastroenterology",
  },
  openGraph: {
    title: "MRCGP AKT Gastroenterology Revision: IBS and IBD",
    description:
      "A focused AKT gastroenterology guide covering IBS, IBD, coeliac disease, dyspepsia, H. pylori, liver disease and cancer red flags.",
    type: "article",
    url: "https://medexia-akt.com/akt-gastroenterology",
  },
};

const coreAreas = [
  {
    title: "IBS and functional bowel symptoms",
    text: "Revise positive IBS diagnostic features, baseline tests, coeliac serology, faecal calprotectin, dietary advice, antispasmodics, laxatives, loperamide and low-dose TCAs.",
  },
  {
    title: "IBD and inflammatory symptoms",
    text: "Know the difference between Crohn's disease and ulcerative colitis, when calprotectin supports referral, flare clues, blood in stool, systemic symptoms and steroid or mesalazine context.",
  },
  {
    title: "Coeliac disease",
    text: "Focus on tTG-IgA, total IgA, the need to keep eating gluten before testing, symptoms beyond diarrhoea, associated autoimmune disease and lifelong gluten-free management.",
  },
  {
    title: "Dyspepsia, GORD and H. pylori",
    text: "Revise PPI trials, alarm symptoms, H. pylori stool antigen or urea breath testing, stopping PPIs before testing and when endoscopy or cancer referral is needed.",
  },
  {
    title: "Liver disease",
    text: "Prioritise abnormal LFT interpretation, alcohol-related liver disease, viral hepatitis, NAFLD, fibrosis assessment, jaundice, ascites and decompensation red flags.",
  },
  {
    title: "Cancer recognition and rectal bleeding",
    text: "Know colorectal, upper GI and pancreatic cancer signals: weight loss, anaemia, dysphagia, persistent vomiting, rectal bleeding, change in bowel habit and abdominal mass.",
  },
];

const redFlags = [
  "Dysphagia, persistent vomiting, haematemesis, melaena or unexplained weight loss",
  "Iron-deficiency anaemia, rectal bleeding with bowel-habit change or abdominal or rectal mass",
  "Acute severe abdominal pain, guarding, sepsis, obstruction or suspected perforation",
  "Jaundice, ascites, encephalopathy, spontaneous bruising or suspected decompensated liver disease",
  "Bloody diarrhoea with systemic illness, dehydration or suspected severe colitis",
  "Pancreatic cancer signals such as painless jaundice, weight loss, new diabetes or persistent upper abdominal pain",
];

const faqs = [
  {
    question: "Is gastroenterology high yield for the MRCGP AKT?",
    answer:
      "Yes. Gastroenterology is a major RCGP clinical topic and AKT questions commonly test IBS, IBD, coeliac disease, dyspepsia, H. pylori, liver disease, abnormal LFTs, rectal bleeding and GI cancer red flags.",
  },
  {
    question: "What gastroenterology topics should I revise for the AKT?",
    answer:
      "Prioritise IBS diagnostic criteria, faecal calprotectin, IBD flares, coeliac serology, dyspepsia and H. pylori testing, GORD alarm features, abnormal LFTs, NAFLD fibrosis assessment and colorectal cancer red flags.",
  },
  {
    question: "How does IBS come up in AKT questions?",
    answer:
      "IBS questions often test positive diagnostic features, appropriate baseline tests, when to check coeliac serology or calprotectin, and when red flags make an IBS label unsafe.",
  },
  {
    question: "What GI cancer red flags are high yield for the AKT?",
    answer:
      "Know dysphagia, unexplained weight loss, iron-deficiency anaemia, rectal bleeding with bowel-habit change, abdominal or rectal mass, persistent vomiting, jaundice and pancreatic cancer warning patterns.",
  },
];

export default function AktGastroenterologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Gastroenterology Revision: IBS and IBD",
        description:
          "A focused MRCGP AKT gastroenterology guide for IBS, IBD, coeliac disease, dyspepsia, H. pylori, liver disease, rectal bleeding and GI cancer red flags.",
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
            name: "AKT Gastroenterology",
            url: "https://medexia-akt.com/akt-gastroenterology",
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
            MRCGP AKT gastroenterology revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Gastroenterology questions test whether you can separate functional
            symptoms from inflammatory disease, choose the right first tests,
            treat common dyspepsia safely and recognise GI cancer or liver
            disease before the stem becomes obvious.
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
              For AKT gastroenterology revision, prioritise IBS criteria,
              faecal calprotectin, IBD flares, coeliac serology, dyspepsia,
              H. pylori testing, GORD alarm symptoms, abnormal LFTs, NAFLD
              fibrosis assessment, rectal bleeding and GI cancer red flags.
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
              Why gastroenterology questions catch candidates out
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
                The trap is often a comfortable label: IBS, reflux or fatty
                liver. The AKT then adds one feature that changes the pathway:
                anaemia, weight loss, dysphagia, raised calprotectin, jaundice
                or an abnormal fibrosis score.
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
              AKT gastroenterology FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/gastroenterology"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP gastroenterology topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg61"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE IBS guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng20"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE coeliac disease guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg184"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE GORD and dyspepsia guideline
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
                href="https://www.nice.org.uk/guidance/ng49"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE NAFLD guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/gastroenterology"
            >
              Open gastroenterology topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-minor-illness-urgent-care"
            >
              Review urgent care red flags
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
