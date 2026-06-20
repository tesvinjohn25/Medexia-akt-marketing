import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT ENT Revision: Otitis, Hearing Loss and Vertigo",
  description:
    "MRCGP AKT ENT revision: otitis media, sore throat, sinusitis, hearing loss, vertigo, epistaxis, hoarseness and head and neck cancer red flags.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-ent-speech-hearing",
  },
  openGraph: {
    title: "MRCGP AKT ENT Revision: Otitis, Hearing Loss and Vertigo",
    description:
      "A focused AKT ENT guide covering otitis media, sore throat, sinusitis, hearing loss, vertigo, epistaxis and head and neck cancer red flags.",
    type: "article",
    url: "https://medexia-akt.com/akt-ent-speech-hearing",
  },
};

const coreAreas = [
  {
    title: "Otitis media and ear pain",
    text: "Revise acute otitis media, otitis externa, otitis media with effusion, mastoiditis, ear discharge, analgesia-first management and when antibiotics or urgent review are needed.",
  },
  {
    title: "Sore throat and sinusitis",
    text: "Know antimicrobial stewardship, FeverPAIN or Centor-style decision making, delayed prescriptions, sinusitis time course, red flags and safety-netting language.",
  },
  {
    title: "Hearing loss and tinnitus",
    text: "Focus on conductive versus sensorineural hearing loss, sudden hearing loss, earwax, unilateral symptoms, middle-ear effusion and when audiology or ENT referral is urgent.",
  },
  {
    title: "Vertigo and dizziness",
    text: "Revise BPPV, vestibular neuritis, Meniere's disease, migraine, Dix-Hallpike, Epley manoeuvre and central neurological red flags.",
  },
  {
    title: "Nose, mouth and voice symptoms",
    text: "Cover epistaxis, rhinitis, nasal obstruction, oral ulceration, hoarseness, salivary gland swelling, dental pain and persistent unexplained symptoms.",
  },
  {
    title: "Head and neck cancer recognition",
    text: "Know the patterns that should not be dismissed: persistent neck lump, hoarseness, dysphagia, unilateral throat pain, oral ulceration, weight loss and unexplained otalgia.",
  },
];

const redFlags = [
  "Sudden sensorineural hearing loss, rapidly worsening hearing loss or unilateral hearing loss with neurological symptoms",
  "Mastoid tenderness, protruding pinna, systemic illness or suspected mastoiditis",
  "Persistent hoarseness, dysphagia, unexplained neck lump, oral ulceration or weight loss",
  "Epistaxis with haemodynamic concern, anticoagulation risk, recurrent unilateral symptoms or suspected malignancy",
  "Vertigo with focal neurology, new severe headache, ataxia, diplopia, dysarthria or inability to walk",
  "Periorbital swelling, severe frontal headache, reduced consciousness or orbital symptoms in sinusitis",
];

const faqs = [
  {
    question: "Is ENT high yield for the MRCGP AKT?",
    answer:
      "Yes. ENT, speech and hearing is a named RCGP curriculum topic and AKT questions commonly test otitis media, sore throat, sinusitis, hearing loss, vertigo, epistaxis, hoarseness and head and neck cancer red flags.",
  },
  {
    question: "What ENT topics should I revise for the AKT?",
    answer:
      "Prioritise acute otitis media, otitis externa, sore throat, sinusitis, antimicrobial stewardship, sudden hearing loss, tinnitus, vertigo, epistaxis, hoarseness, mouth ulcers, neck lumps and head and neck cancer red flags.",
  },
  {
    question: "How does hearing loss come up in AKT questions?",
    answer:
      "Hearing loss questions often test conductive versus sensorineural patterns, sudden or rapidly worsening hearing loss, unilateral symptoms, earwax, middle-ear effusion and when urgent ENT referral is needed.",
  },
  {
    question: "What ENT red flags are high yield for the AKT?",
    answer:
      "Know sudden hearing loss, mastoiditis features, vertigo with neurological signs, persistent hoarseness, dysphagia, unexplained neck lump, persistent oral ulceration, weight loss and unilateral persistent symptoms.",
  },
];

export default function AktEntSpeechHearingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT ENT Revision: Otitis, Hearing Loss and Vertigo",
        description:
          "A focused MRCGP AKT ENT, speech and hearing guide for otitis media, sore throat, sinusitis, hearing loss, vertigo, epistaxis, hoarseness and head and neck cancer red flags.",
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
            name: "AKT ENT, Speech and Hearing",
            url: "https://medexia-akt.com/akt-ent-speech-hearing",
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
            MRCGP AKT ENT revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            ENT questions test whether you can avoid unnecessary antibiotics,
            recognise hearing-loss urgency, separate peripheral vertigo from
            central red flags and spot head and neck cancer signals early.
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
              For AKT ENT revision, prioritise otitis media, otitis externa,
              sore throat, sinusitis, delayed antibiotics, sudden hearing loss,
              tinnitus, vertigo, epistaxis, hoarseness, oral ulceration, neck
              lumps and head and neck cancer red flags.
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
              Why ENT questions catch candidates out
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
                The stem often looks like a simple infection or a vague dizzy
                patient. The scoring mark is usually the one detail that
                changes management: duration, unilateral symptoms, sudden
                hearing loss, focal neurology, mastoid tenderness or a cancer
                red flag.
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
              AKT ENT FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/ent"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP ENT, speech and hearing topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng91"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE acute otitis media guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng84"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE acute sore throat guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng79"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE acute sinusitis guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng98"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE hearing loss in adults guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/ent-speech-hearing"
            >
              Open ENT topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-minor-illness-urgent-care"
            >
              Review infection decisions
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
