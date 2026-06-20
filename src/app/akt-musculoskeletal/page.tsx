import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Musculoskeletal Revision: Back Pain and Arthritis",
  description:
    "MRCGP AKT musculoskeletal revision: back pain red flags, osteoarthritis, rheumatoid arthritis, osteoporosis, gout, fractures and urgent referral.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-musculoskeletal",
  },
  openGraph: {
    title: "MRCGP AKT Musculoskeletal Revision: Back Pain and Arthritis",
    description:
      "A focused AKT musculoskeletal guide covering back pain red flags, osteoarthritis, rheumatoid arthritis, osteoporosis, gout and fractures.",
    type: "article",
    url: "https://medexia-akt.com/akt-musculoskeletal",
  },
};

const coreAreas = [
  {
    title: "Back pain and sciatica",
    text: "Revise when not to image, when to keep active, when sciatica changes management, and the red flags for cauda equina, fracture, malignancy or infection.",
  },
  {
    title: "Osteoarthritis",
    text: "Know the clinical diagnosis, short morning stiffness, exercise and weight management, topical NSAIDs, oral NSAID risk, injections and when joint replacement referral is appropriate.",
  },
  {
    title: "Rheumatoid arthritis",
    text: "Focus on persistent synovitis, small-joint symptoms, morning stiffness, squeeze-test clues, urgent rheumatology referral and DMARD monitoring principles.",
  },
  {
    title: "Osteoporosis and fragility fracture",
    text: "Revise FRAX or QFracture, DEXA, bisphosphonate counselling, steroid risk, calcium and vitamin D, falls risk and secondary fracture prevention.",
  },
  {
    title: "Gout and inflammatory joints",
    text: "Separate gout, septic arthritis and inflammatory arthritis. Know acute treatment, urate-lowering therapy, allopurinol timing and why serum urate may mislead during a flare.",
  },
  {
    title: "Soft tissue and trauma",
    text: "Know sprains, tendon problems, shoulder pain, carpal tunnel, fracture suspicion, safeguarding concerns and when same-day orthopaedic assessment is needed.",
  },
];

const redFlags = [
  "Cauda equina symptoms: urinary retention, saddle anaesthesia, bilateral neurology or severe progressive weakness",
  "Back pain with fever, immunosuppression, IV drug use, cancer history, trauma or unexplained weight loss",
  "Hot swollen joint where septic arthritis is possible",
  "Suspected fracture, non-accidental injury, open injury or neurovascular compromise",
  "Persistent synovitis suggesting inflammatory arthritis",
  "Acute limb ischaemia, compartment syndrome symptoms or severe pain out of proportion",
];

const faqs = [
  {
    question: "Is musculoskeletal health high yield for the MRCGP AKT?",
    answer:
      "Yes. Musculoskeletal health is a major RCGP clinical topic and AKT questions commonly test back pain red flags, osteoarthritis, rheumatoid arthritis, osteoporosis, gout, soft tissue injuries, fracture suspicion and urgent referral.",
  },
  {
    question: "What musculoskeletal topics should I revise for the AKT?",
    answer:
      "Prioritise low back pain and sciatica, cauda equina and fracture red flags, osteoarthritis, rheumatoid arthritis referral, osteoporosis risk assessment, gout, septic arthritis, analgesic safety and when imaging is not needed.",
  },
  {
    question: "How does back pain come up in AKT questions?",
    answer:
      "Back pain questions often test whether the presentation is non-specific and safe for conservative management, or whether red flags such as cauda equina, infection, malignancy or fracture mean urgent imaging or referral.",
  },
  {
    question: "What arthritis facts are high yield for the AKT?",
    answer:
      "Know how osteoarthritis differs from inflammatory arthritis, why persistent synovitis needs urgent referral, how rheumatoid arthritis presents, and when gout or septic arthritis changes the safest next step.",
  },
];

export default function AktMusculoskeletalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Musculoskeletal Revision: Back Pain and Arthritis",
        description:
          "A focused MRCGP AKT musculoskeletal guide for back pain red flags, osteoarthritis, rheumatoid arthritis, osteoporosis, gout, fractures and urgent referral.",
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
            name: "AKT Musculoskeletal",
            url: "https://medexia-akt.com/akt-musculoskeletal",
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
            MRCGP AKT musculoskeletal revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Musculoskeletal AKT questions are usually about safe sorting: which
            pain can be managed conservatively, which joint needs urgent
            referral, when imaging is unnecessary, and when red flags override a
            familiar presentation.
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
              For AKT musculoskeletal revision, prioritise back pain and
              sciatica red flags, cauda equina, osteoarthritis, rheumatoid
              arthritis referral, osteoporosis risk assessment, gout, septic
              arthritis, fracture suspicion, analgesic safety and when imaging
              is not indicated.
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
              Why musculoskeletal questions catch candidates out
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
                The AKT often gives a common symptom and tests whether you spot
                the unsafe exception. Most stems are not about memorising every
                joint examination; they are about recognising urgent referral,
                avoiding unnecessary imaging and choosing safe first-line care.
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
              AKT musculoskeletal FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/musculoskeletal-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP musculoskeletal health topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng59"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE low back pain and sciatica guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng226"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE osteoarthritis guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng100"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE rheumatoid arthritis guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg146"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE osteoporosis fracture-risk guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng219"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE gout guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/musculoskeletal"
            >
              Open musculoskeletal topic &rarr;
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
