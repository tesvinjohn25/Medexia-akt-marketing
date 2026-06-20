import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Infectious Diseases Revision: HIV and Travel",
  description:
    "MRCGP AKT infectious diseases and travel health revision: HIV, hepatitis, immunisation, malaria, returning traveller fever and antimicrobial stewardship.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-infectious-diseases-travel",
  },
  openGraph: {
    title: "MRCGP AKT Infectious Diseases Revision: HIV and Travel",
    description:
      "A focused AKT infectious diseases and travel health guide covering HIV, hepatitis, immunisation, malaria, returning traveller fever and antimicrobial stewardship.",
    type: "article",
    url: "https://medexia-akt.com/akt-infectious-diseases-travel",
  },
};

const coreAreas = [
  {
    title: "HIV testing and indicator conditions",
    text: "Revise when to offer HIV testing, common indicator conditions, late diagnosis clues, confidentiality, consent and how infection risk is presented in primary care stems.",
  },
  {
    title: "Hepatitis B and C",
    text: "Know who is at increased risk, when to test, how abnormal LFTs or jaundice may be framed, vaccination principles and referral or specialist follow-up themes.",
  },
  {
    title: "Immunisation",
    text: "Cover routine and risk-based vaccines, incomplete records, immunosuppression, occupational exposure, pregnancy considerations and use of the UKHSA Green Book.",
  },
  {
    title: "Travel health",
    text: "Focus on pre-travel assessment, itinerary risk, malaria prevention, travel vaccines, returning traveller fever and when symptoms need same-day escalation.",
  },
  {
    title: "Common infections and stewardship",
    text: "Revise delayed or back-up antibiotics, antibiotic choice, local resistance, safety-netting, recurrent infection patterns and when not to prescribe.",
  },
  {
    title: "Notifiable disease and outbreak thinking",
    text: "Understand when notification, public-health advice, contact tracing, infection control or occupational-health input matters in an AKT-style scenario.",
  },
];

const redFlags = [
  "Fever or acute systemic illness after travel to a malaria-risk area, especially with headache, confusion, jaundice or thrombocytopenia",
  "Suspected sepsis, meningitis, rapidly progressive rash, hypotension, altered consciousness or acute deterioration",
  "New HIV indicator condition, unexplained weight loss, recurrent infections, persistent lymphadenopathy or missed testing opportunity",
  "Jaundice, markedly abnormal LFTs, needle-stick exposure, high-risk blood exposure or suspected acute hepatitis",
  "Immunosuppressed patient with fever, persistent infection, unusual organism or poor response to standard treatment",
  "Suspected TB, meningococcal disease, measles or another infection where public-health action may be needed",
];

const faqs = [
  {
    question: "Is infectious diseases and travel health high yield for the MRCGP AKT?",
    answer:
      "Yes. Infectious diseases and travel health is a named RCGP curriculum topic. AKT questions can test HIV and hepatitis testing, immunisation, returning traveller fever, malaria prevention, antimicrobial stewardship and public-health thresholds.",
  },
  {
    question: "What infectious disease topics should I revise for the AKT?",
    answer:
      "Prioritise HIV testing and indicator conditions, hepatitis B and C risk groups, immunisation schedules, travel vaccines, malaria prevention, fever in the returning traveller, notifiable infections, antimicrobial stewardship and sepsis recognition.",
  },
  {
    question: "How does HIV testing come up in AKT questions?",
    answer:
      "HIV testing questions often test whether you recognise an indicator condition or risk context, offer a test clearly, handle consent and confidentiality properly, and avoid missing late-diagnosis clues in ordinary primary-care presentations.",
  },
  {
    question: "What travel-health red flags are high yield for the AKT?",
    answer:
      "Know fever after travel to a malaria-risk area, acute confusion, jaundice, severe diarrhoea, haemodynamic instability, pregnancy, immunosuppression and symptoms that suggest sepsis or urgent same-day assessment.",
  },
];

export default function AktInfectiousDiseasesTravelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Infectious Diseases Revision: HIV and Travel",
        description:
          "A focused MRCGP AKT infectious diseases and travel health guide for HIV testing, hepatitis, immunisation, travel vaccines, malaria, returning traveller fever and antimicrobial stewardship.",
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
            name: "AKT Infectious Diseases and Travel Health",
            url: "https://medexia-akt.com/akt-infectious-diseases-travel",
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
            MRCGP AKT infectious diseases and travel health revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Infectious-disease questions test whether you can spot risk,
            escalation and prevention clues quickly: HIV indicator conditions,
            hepatitis testing, immunisation, antimicrobial stewardship and fever
            in the returning traveller.
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
              For AKT infectious diseases and travel health revision, prioritise
              HIV testing, hepatitis B and C, immunisation, travel vaccines,
              malaria prevention, fever in the returning traveller, antimicrobial
              stewardship, notifiable infections and sepsis recognition.
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
              Why infection questions catch candidates out
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
                The trap is rarely a single fact. AKT stems often combine a
                common infection with a risk modifier: recent travel, pregnancy,
                immunosuppression, high-risk exposure, abnormal blood tests or a
                public-health duty. Train yourself to ask what changes the
                threshold, not just what antibiotic treats the symptom.
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
              AKT infectious diseases and travel health FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/infectious-diseases-travel-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP infectious diseases and travel health topic guide
              </a>
              <a
                href="https://www.gov.uk/government/collections/immunisation-against-infectious-disease-the-green-book"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                UKHSA Green Book immunisation guidance
              </a>
              <a
                href="https://www.gov.uk/government/publications/malaria-prevention-guidelines-for-travellers-from-the-uk-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                UKHSA malaria prevention guidelines for travellers
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng15"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE antimicrobial stewardship guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/qs157/chapter/quality-statement-3-hiv-indicator-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE HIV indicator conditions quality statement
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ph43"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE hepatitis B and C testing guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/infectious-diseases-travel"
            >
              Open infection topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-minor-illness-urgent-care"
            >
              Review urgent infection care &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE CKS, UKHSA and BNF guidance for clinical decisions. Last
            reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
