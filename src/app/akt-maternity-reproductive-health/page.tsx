import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Maternity Revision: Pregnancy and Postnatal Care",
  description:
    "MRCGP AKT maternity revision: antenatal care, early pregnancy bleeding, pre-eclampsia, gestational diabetes, postnatal care and contraception.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-maternity-reproductive-health",
  },
  openGraph: {
    title: "MRCGP AKT Maternity Revision: Pregnancy and Postnatal Care",
    description:
      "A focused AKT maternity and reproductive health guide covering antenatal care, early pregnancy bleeding, pre-eclampsia, gestational diabetes and postnatal care.",
    type: "article",
    url: "https://medexia-akt.com/akt-maternity-reproductive-health",
  },
};

const coreAreas = [
  {
    title: "Antenatal care",
    text: "Revise booking, routine screening, scan timing, risk assessment, folic acid, vitamin D, prescribing safety and when primary care should escalate symptoms in pregnancy.",
  },
  {
    title: "Early pregnancy problems",
    text: "Know the approach to pain or bleeding in early pregnancy, ectopic pregnancy clues, miscarriage pathways, rhesus status themes and urgent assessment thresholds.",
  },
  {
    title: "Hypertension and pre-eclampsia",
    text: "Focus on blood-pressure thresholds, proteinuria, headache, visual symptoms, epigastric pain, reduced fetal movements and same-day maternity assessment triggers.",
  },
  {
    title: "Gestational diabetes",
    text: "Cover risk-factor screening, OGTT timing, previous gestational diabetes, BMI, family history, higher-risk ethnicity and postnatal follow-up after pregnancy.",
  },
  {
    title: "Postnatal care",
    text: "Revise the first 8 weeks after birth, secondary postpartum haemorrhage, mastitis, perineal pain, postnatal depression and red flags in mother or baby.",
  },
  {
    title: "Contraception after pregnancy",
    text: "Link postpartum timing, breastfeeding, VTE risk, UKMEC safety categories, emergency contraception and when long-acting reversible contraception is safest.",
  },
];

const redFlags = [
  "Early pregnancy pain, shoulder-tip pain, syncope, collapse, heavy bleeding or suspected ectopic pregnancy",
  "Headache, visual symptoms, epigastric pain, vomiting, hypertension, proteinuria or suspected pre-eclampsia",
  "Reduced fetal movements, severe abdominal pain, vaginal bleeding later in pregnancy or ruptured membranes",
  "Fever, rigors, worsening abdominal pain, offensive lochia, heavy postnatal bleeding or suspected sepsis",
  "Mastitis with systemic symptoms, breast abscess suspicion or symptoms not improving with appropriate treatment",
  "Postnatal psychosis, suicidal thoughts, thoughts of harming the baby or rapidly deteriorating mental state",
];

const faqs = [
  {
    question: "Is maternity and reproductive health high yield for the MRCGP AKT?",
    answer:
      "Yes. Maternity and reproductive health is a named RCGP curriculum topic. AKT questions can test antenatal screening, prescribing in pregnancy, early pregnancy bleeding, pre-eclampsia, gestational diabetes, postnatal care and contraception safety.",
  },
  {
    question: "What maternity topics should I revise for the AKT?",
    answer:
      "Prioritise antenatal care, early pregnancy pain or bleeding, ectopic pregnancy, miscarriage, pre-eclampsia symptoms, gestational diabetes risk factors, postnatal bleeding, mastitis, postnatal mental health and contraception after pregnancy.",
  },
  {
    question: "How does early pregnancy bleeding come up in AKT questions?",
    answer:
      "Early pregnancy bleeding questions often test whether you recognise ectopic pregnancy risk, assess pain and haemodynamic stability, arrange urgent early-pregnancy assessment, and avoid falsely reassuring from bleeding pattern alone.",
  },
  {
    question: "What postnatal red flags are high yield for the AKT?",
    answer:
      "Know heavy or worsening bleeding, fever, offensive lochia, severe pain, sepsis symptoms, mastitis with systemic illness, suspected breast abscess, postnatal psychosis and suicidal or intrusive harm thoughts.",
  },
];

export default function AktMaternityReproductiveHealthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Maternity Revision: Pregnancy and Postnatal Care",
        description:
          "A focused MRCGP AKT maternity and reproductive health guide for antenatal care, early pregnancy bleeding, ectopic pregnancy, pre-eclampsia, gestational diabetes, postnatal care and contraception after pregnancy.",
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
            name: "AKT Maternity and Reproductive Health",
            url: "https://medexia-akt.com/akt-maternity-reproductive-health",
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
            MRCGP AKT maternity and reproductive health revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Maternity questions test whether you can apply ordinary primary-care
            judgement safely in pregnancy: recognise escalation thresholds, avoid
            unsafe prescribing and handle postnatal symptoms without missing
            serious disease.
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
              For AKT maternity and reproductive health revision, prioritise
              antenatal care, early pregnancy pain or bleeding, ectopic
              pregnancy, pre-eclampsia, gestational diabetes, postnatal bleeding,
              mastitis, postnatal mental health and contraception after
              pregnancy.
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
              Why maternity questions catch candidates out
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
                The trap is treating pregnancy as a normal version of the same
                presentation. AKT stems often ask what changes because the
                patient is pregnant or recently postnatal: medication safety,
                threshold for same-day assessment, safeguarding, VTE risk,
                mental-health urgency and who needs maternity-unit input.
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
              AKT maternity and reproductive health FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/maternity-reproductive-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP maternity and reproductive health topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng201"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE antenatal care guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng194"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE postnatal care guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng126"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE ectopic pregnancy and miscarriage guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng133"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE hypertension in pregnancy guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng3"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE diabetes in pregnancy guideline
              </a>
              <a
                href="https://www.cosrh.org/Public/Public/Standards-and-Guidance/uk-medical-eligibility-criteria-for-contraceptive-use-ukmec.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                UKMEC contraception safety guidance
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/maternity-reproductive-health"
            >
              Open maternity topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-womens-health"
            >
              Review women&apos;s health &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, UKMEC, local maternity pathways and BNF guidance for
            clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
