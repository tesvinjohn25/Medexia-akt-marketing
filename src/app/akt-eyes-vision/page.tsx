import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Eyes Revision: Red Eye and Vision Loss",
  description:
    "MRCGP AKT eyes and vision revision: red eye, visual loss, flashes and floaters, diplopia, glaucoma, cataracts, AMD and diabetic eye disease.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-eyes-vision",
  },
  openGraph: {
    title: "MRCGP AKT Eyes Revision: Red Eye and Vision Loss",
    description:
      "A focused AKT eyes and vision guide covering red eye, visual loss, flashes and floaters, diplopia, glaucoma, cataracts, AMD and diabetic eye disease.",
    type: "article",
    url: "https://medexia-akt.com/akt-eyes-vision",
  },
};

const coreAreas = [
  {
    title: "Red eye",
    text: "Revise conjunctivitis, episcleritis, keratitis, iritis, scleritis, acute angle-closure glaucoma, contact lens risk, photophobia, pain and reduced visual acuity.",
  },
  {
    title: "Visual loss and field defects",
    text: "Know sudden versus gradual visual loss, monocular versus binocular symptoms, visual field loss, amaurosis fugax, retinal vascular events and when same-day eye assessment is needed.",
  },
  {
    title: "Flashes, floaters and distortion",
    text: "Focus on retinal detachment clues, vitreous haemorrhage, new floaters, curtain-like field loss, metamorphopsia, Amsler chart use and wet AMD urgency.",
  },
  {
    title: "Glaucoma and cataracts",
    text: "Cover chronic open-angle glaucoma case-finding, raised intraocular pressure, optic-disc changes, cataract symptoms, visual function and referral thresholds.",
  },
  {
    title: "Diabetic and vascular eye disease",
    text: "Revise diabetic retinopathy screening, macular oedema, hypertensive eye disease, retinal vein or artery occlusion and cardiovascular risk implications.",
  },
  {
    title: "Diplopia, pupils and eyelids",
    text: "Know diplopia red flags, cranial nerve palsies, Horner's syndrome, ptosis, orbital cellulitis, entropion, ectropion, lid lumps and when symptoms suggest neurology.",
  },
];

const redFlags = [
  "Painful red eye with reduced vision, photophobia, corneal opacity or contact lens use",
  "Sudden visual loss, curtain-like field defect, new flashes or a shower of floaters",
  "Severe eye pain with headache, halos, nausea, vomiting or a fixed mid-dilated pupil",
  "Diplopia with headache, ptosis, abnormal pupils, focal neurology or suspected cranial nerve palsy",
  "Distorted central vision, rapidly worsening vision or suspected wet macular degeneration",
  "Orbital swelling, painful eye movements, fever, proptosis or suspected orbital cellulitis",
];

const faqs = [
  {
    question: "Is eyes and vision high yield for the MRCGP AKT?",
    answer:
      "Yes. Eyes and vision is a named RCGP curriculum topic and AKT questions commonly test red eye, visual loss, flashes and floaters, diplopia, glaucoma, cataracts, AMD, diabetic eye disease and urgent referral thresholds.",
  },
  {
    question: "What eye topics should I revise for the AKT?",
    answer:
      "Prioritise red eye red flags, reduced visual acuity, photophobia, contact lens keratitis, acute glaucoma, retinal detachment, sudden visual loss, diplopia, cataracts, glaucoma, AMD and diabetic retinopathy screening.",
  },
  {
    question: "How does red eye come up in AKT questions?",
    answer:
      "Red eye questions often test whether the presentation is safe to manage in primary care or needs same-day eye assessment because of pain, photophobia, reduced vision, contact lens use, corneal change or suspected glaucoma.",
  },
  {
    question: "What visual loss red flags are high yield for the AKT?",
    answer:
      "Know sudden painless visual loss, curtain-like field defect, new flashes or floaters, distorted central vision, diplopia with neurological signs, painful red eye with reduced vision and orbital cellulitis features.",
  },
];

export default function AktEyesVisionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Eyes Revision: Red Eye and Vision Loss",
        description:
          "A focused MRCGP AKT eyes and vision guide for red eye, visual loss, flashes and floaters, diplopia, glaucoma, cataracts, AMD and diabetic eye disease.",
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
            name: "AKT Eyes and Vision",
            url: "https://medexia-akt.com/akt-eyes-vision",
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
            MRCGP AKT eyes and vision revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Eye questions test whether you can separate common primary-care
            problems from sight-threatening presentations: painful red eye,
            sudden visual loss, new flashes or floaters, diplopia and
            glaucoma-type symptoms.
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
              For AKT eyes and vision revision, prioritise red eye red flags,
              reduced visual acuity, photophobia, contact lens keratitis,
              acute glaucoma, retinal detachment, sudden visual loss, diplopia,
              cataracts, glaucoma, AMD and diabetic eye disease.
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
              Why eye questions catch candidates out
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
                Many stems start like simple conjunctivitis or age-related
                blur. The mark is often the danger feature: reduced vision,
                pain, photophobia, contact lens use, field loss, distortion,
                abnormal pupil or new neurological symptoms.
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
              AKT eyes and vision FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/eyes-and-vision"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP eyes and vision topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng81"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE glaucoma guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng82"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE age-related macular degeneration guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng77"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE cataracts in adults guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/eyes-vision"
            >
              Open eyes and vision topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-diabetes-endocrinology"
            >
              Review diabetes eye disease &rarr;
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
