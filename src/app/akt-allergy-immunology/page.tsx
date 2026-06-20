import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Allergy Revision: Anaphylaxis and Food Allergy",
  description:
    "MRCGP AKT allergy and immunology revision: anaphylaxis, adrenaline auto-injectors, food allergy, drug allergy, urticaria, angioedema and immunodeficiency.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-allergy-immunology",
  },
  openGraph: {
    title: "MRCGP AKT Allergy Revision: Anaphylaxis and Food Allergy",
    description:
      "A focused AKT allergy and immunology guide covering anaphylaxis, food allergy, drug allergy, urticaria, angioedema and immunodeficiency.",
    type: "article",
    url: "https://medexia-akt.com/akt-allergy-immunology",
  },
};

const coreAreas = [
  {
    title: "Anaphylaxis",
    text: "Revise rapid recognition, airway or breathing symptoms, hypotension, IM adrenaline, repeat dosing, observation, tryptase timing, allergy referral and safety-netting.",
  },
  {
    title: "Adrenaline auto-injectors",
    text: "Know who needs auto-injectors, why two devices are usually supplied, training points, written action plans, carrying advice and school or workplace safety.",
  },
  {
    title: "Food allergy",
    text: "Separate IgE-mediated immediate reactions from non-IgE delayed symptoms, cow's milk protein allergy, eczema or reflux overlap, elimination trials and referral triggers.",
  },
  {
    title: "Drug allergy",
    text: "Focus on structured history, timing, rash pattern, anaphylaxis features, safe prescribing, clear allergy record entries and avoiding vague lifelong allergy labels.",
  },
  {
    title: "Urticaria and angioedema",
    text: "Cover acute urticaria, chronic urticaria, antihistamine use, angioedema without urticaria, ACE-inhibitor reactions and when symptoms suggest anaphylaxis.",
  },
  {
    title: "Immunodeficiency clues",
    text: "Know when recurrent, severe, unusual or persistent infections should prompt investigation or referral, especially with poor growth, chronic diarrhoea or family history.",
  },
];

const redFlags = [
  "Airway swelling, wheeze, stridor, hypoxia, hypotension, collapse or rapidly progressive systemic reaction",
  "Anaphylaxis in a patient with asthma, food allergy, drug exposure, venom sting or previous severe reaction",
  "Angioedema affecting tongue, throat or voice, especially with breathing difficulty or ACE-inhibitor exposure",
  "Food allergy with faltering growth, severe delayed symptoms, multiple food reactions or confirmed IgE allergy with asthma",
  "Drug reaction with mucosal involvement, blistering, systemic illness, facial swelling or organ involvement",
  "Recurrent severe infections, unusual organisms, persistent thrush, chronic diarrhoea, poor growth or family history of immunodeficiency",
];

const faqs = [
  {
    question: "Is allergy and immunology high yield for the MRCGP AKT?",
    answer:
      "Yes. Allergy and clinical immunology is a named RCGP curriculum topic and AKT questions commonly test anaphylaxis, adrenaline auto-injectors, food allergy, drug allergy, urticaria, angioedema and immunodeficiency clues.",
  },
  {
    question: "What allergy topics should I revise for the AKT?",
    answer:
      "Prioritise anaphylaxis recognition, IM adrenaline, tryptase timing, allergy referral, adrenaline auto-injector counselling, IgE versus non-IgE food allergy, drug allergy documentation, urticaria, angioedema and immunodeficiency red flags.",
  },
  {
    question: "How does anaphylaxis come up in AKT questions?",
    answer:
      "Anaphylaxis questions often test recognising airway, breathing or circulation compromise, choosing IM adrenaline first, repeating adrenaline if needed, arranging observation and referral, and prescribing auto-injectors with training.",
  },
  {
    question: "What allergy red flags are high yield for the AKT?",
    answer:
      "Know airway swelling, wheeze, hypotension, collapse, angioedema affecting voice or breathing, severe drug reactions, food allergy with faltering growth or asthma, and recurrent severe infections suggesting immunodeficiency.",
  },
];

export default function AktAllergyImmunologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Allergy Revision: Anaphylaxis and Food Allergy",
        description:
          "A focused MRCGP AKT allergy and immunology guide for anaphylaxis, adrenaline auto-injectors, food allergy, drug allergy, urticaria, angioedema and immunodeficiency.",
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
            name: "AKT Allergy and Immunology",
            url: "https://medexia-akt.com/akt-allergy-immunology",
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
            MRCGP AKT allergy and immunology revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Allergy questions test whether you can recognise anaphylaxis early,
            use adrenaline correctly, avoid unsafe allergy labels and separate
            food allergy, urticaria and immunodeficiency clues from common
            mimics.
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
              For AKT allergy and immunology revision, prioritise anaphylaxis,
              IM adrenaline, tryptase timing, allergy referral, auto-injector
              counselling, IgE versus non-IgE food allergy, drug allergy
              documentation, urticaria, angioedema and immunodeficiency red
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
              Why allergy questions catch candidates out
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
                The trap is often timing and documentation: missing
                anaphylaxis because the rash is absent, recording a vague drug
                allergy without reaction details, or treating food intolerance
                and immune deficiency clues as ordinary atopy.
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
              AKT allergy and immunology FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/allergy-clinical-immunology"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP allergy and clinical immunology topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg134"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE anaphylaxis guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg116"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE food allergy in under 19s guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg183"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE drug allergy guideline
              </a>
              <a
                href="https://www.bsaci.org/wp-content/uploads/2023/06/BSACI-AAI-Guidance-June-2023.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                BSACI adrenaline auto-injector guidance
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/allergy-immunology"
            >
              Open allergy topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-respiratory"
            >
              Review asthma overlap &rarr;
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
