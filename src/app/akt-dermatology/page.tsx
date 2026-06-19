import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Dermatology Revision: Rashes and Skin Cancer",
  description:
    "MRCGP AKT dermatology revision: eczema, psoriasis, acne, fungal infections, rashes, skin cancer recognition and image-led practice.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-dermatology",
  },
  openGraph: {
    title: "MRCGP AKT Dermatology Revision: Rashes and Skin Cancer",
    description:
      "A focused AKT dermatology guide covering rashes, eczema, psoriasis, acne, fungal infections, skin lesions and cancer recognition.",
    type: "article",
    url: "https://medexia-akt.com/akt-dermatology",
  },
};

const dermAreas = [
  {
    title: "Rashes and eruptions",
    text: "Practise pattern recognition: distribution, scale, itch, vesicles, systemic symptoms, drug exposure and whether the patient is well or unwell.",
  },
  {
    title: "Eczema",
    text: "Know emollients, topical steroid potency, face and flexure caution, infected eczema, contact dermatitis and when secondary care is needed.",
  },
  {
    title: "Psoriasis",
    text: "Revise plaque psoriasis, scalp disease, nail changes, psoriatic arthritis clues and topical treatment combinations.",
  },
  {
    title: "Acne and rosacea",
    text: "Know severity-based acne treatment, topical retinoids, benzoyl peroxide, antibiotics, isotretinoin referral and common rosacea patterns.",
  },
  {
    title: "Fungal and infective skin disease",
    text: "Distinguish tinea corporis, tinea capitis, candidiasis, impetigo, cellulitis and shingles from inflammatory mimics.",
  },
  {
    title: "Skin lesions and cancer",
    text: "Revise melanoma warning signs, basal cell carcinoma, squamous cell carcinoma, actinic keratosis and urgent referral thresholds.",
  },
];

const visualRevision = [
  {
    title: "Describe before diagnosing",
    text: "In image-led revision, force yourself to describe the lesion first: site, colour, border, surface, scale, symmetry and distribution.",
  },
  {
    title: "Pair images with management",
    text: "The AKT is applied. Recognising eczema is not enough; know the next treatment step, red flags and when to refer.",
  },
  {
    title: "Keep red flags separate",
    text: "Create a small list of urgent features for pigmented lesions, blistering rashes, cellulitis, meningococcal rash and severe drug reactions.",
  },
];

const redFlags = [
  "Changing pigmented lesion with asymmetry, irregular border or colour variation",
  "Rapidly growing, bleeding or non-healing lesion",
  "Non-blanching rash with systemic illness",
  "Widespread blistering, mucosal involvement or suspected severe drug reaction",
  "Cellulitis with sepsis features or rapidly spreading infection",
  "Painful rash in an immunosuppressed patient or near the eye",
];

const faqs = [
  {
    question: "Is dermatology tested in the MRCGP AKT?",
    answer:
      "Yes. Dermatology is one of the RCGP clinical topic guides and AKT questions can test common rashes, eczema, psoriasis, acne, fungal infections, skin lesions, skin cancer recognition and referral thresholds.",
  },
  {
    question: "What dermatology topics should I revise for the AKT?",
    answer:
      "Prioritise rashes and eruptions, eczema, psoriasis, acne, fungal infections, cellulitis, shingles, urticaria, leg ulcers, benign skin lesions and malignant skin lesion recognition.",
  },
  {
    question: "How should I revise skin cancer recognition for the AKT?",
    answer:
      "Focus on applied recognition: changing pigmented lesions, ABCDE melanoma features, non-healing or bleeding lesions, rapidly growing lesions and which presentations need urgent suspected-cancer referral.",
  },
  {
    question: "Why is image-led dermatology useful for AKT revision?",
    answer:
      "Dermatology is visual. Image-led practice helps you connect lesion descriptions with diagnoses, red flags and management decisions rather than memorising lists in isolation.",
  },
];

export default function AktDermatologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Dermatology Revision: Rashes and Skin Cancer",
        description:
          "A focused MRCGP AKT dermatology guide for rashes, eczema, psoriasis, acne, fungal infections, skin lesions and cancer recognition.",
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
          { name: "AKT Dermatology", url: "https://medexia-akt.com/akt-dermatology" },
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
            MRCGP AKT dermatology revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Dermatology questions reward visual pattern recognition, but they
            still test applied GP decisions: what it is, what not to miss, how
            to treat it and when to refer.
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
              For AKT dermatology, prioritise common rashes, eczema,
              psoriasis, acne, fungal infections, cellulitis, shingles,
              urticaria, leg ulcers, benign lesions, skin cancer recognition
              and urgent referral thresholds.
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
              {dermAreas.map((area) => (
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
              How to revise image-led dermatology
            </h2>
            <div className="mt-4 grid gap-3">
              {visualRevision.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.65]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
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
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT dermatology FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/dermatology"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP dermatology topic guide
              </a>
              <a
                href="https://www.rcgp.org.uk/dermatologytoolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP dermatology toolkit
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/clinical-topic-guides"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP clinical topic guides
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
            <a className="btn-primary text-center text-[16px]" href="/akt-audio-revision">
              Explore audio revision &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/topics/dermatology">
              Open dermatology topic
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
