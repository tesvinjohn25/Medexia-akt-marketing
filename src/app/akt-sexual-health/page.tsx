import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Sexual Health Revision: STIs, HIV and Consent",
  description:
    "MRCGP AKT sexual health revision: STIs, chlamydia, gonorrhoea, herpes, HIV testing, partner notification, contraception, consent and safeguarding.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-sexual-health",
  },
  openGraph: {
    title: "MRCGP AKT Sexual Health Revision: STIs, HIV and Consent",
    description:
      "A focused AKT sexual health guide covering STIs, chlamydia, gonorrhoea, herpes, HIV testing, partner notification, consent and safeguarding.",
    type: "article",
    url: "https://medexia-akt.com/akt-sexual-health",
  },
};

const coreAreas = [
  {
    title: "Sexual history and STI testing",
    text: "Revise confidential history-taking, anatomical sites of exposure, asymptomatic infection, full STI screening, pregnancy status and when specialist sexual-health referral is safer.",
  },
  {
    title: "Chlamydia and partner notification",
    text: "Know typical presentations, asymptomatic testing, first-line treatment principles, pregnancy caveats, abstinence advice, partner notification and retesting themes.",
  },
  {
    title: "Gonorrhoea and resistance",
    text: "Focus on referral to specialist sexual-health services, antimicrobial resistance, extra-genital testing, partner management and avoiding under-treatment in primary care.",
  },
  {
    title: "Genital herpes and ulcers",
    text: "Cover first episode versus recurrence, timing of antivirals, pain control, pregnancy considerations, alternative ulcer diagnoses and HIV or syphilis testing prompts.",
  },
  {
    title: "HIV testing, PEP and PrEP",
    text: "Revise indicator conditions, local prevalence logic, consent, confidentiality, post-exposure prophylaxis timing, PrEP awareness and when same-day specialist input is needed.",
  },
  {
    title: "Consent and safeguarding",
    text: "Link Fraser guidance, coercion, exploitation, sexual assault, capacity, domestic abuse, confidentiality limits and the threshold for sharing information without consent.",
  },
];

const redFlags = [
  "Pelvic inflammatory disease symptoms, fever, pelvic pain, cervical motion tenderness, pregnancy or suspected ectopic pregnancy",
  "Sexual assault, coercion, exploitation, domestic abuse, trafficking or immediate safeguarding concern",
  "Under-13 sexual activity, concerning age or power imbalance, inability to consent, or pressure from another person",
  "Possible HIV exposure within 72 hours where PEP may be needed, or acute seroconversion symptoms after high-risk exposure",
  "Genital ulceration with systemic illness, severe pain, urinary retention, pregnancy or diagnostic uncertainty",
  "Suspected disseminated gonorrhoea, septic arthritis, severe epididymo-orchitis or systemic infection",
];

const faqs = [
  {
    question: "Is sexual health high yield for the MRCGP AKT?",
    answer:
      "Yes. Sexual health is a named RCGP curriculum topic. AKT questions can test STI testing, chlamydia, gonorrhoea, genital herpes, HIV testing, partner notification, contraception overlap, consent, confidentiality and safeguarding.",
  },
  {
    question: "What sexual health topics should I revise for the AKT?",
    answer:
      "Prioritise sexual history-taking, STI screening, chlamydia, gonorrhoea, genital herpes, HIV testing, PEP timing, PrEP awareness, partner notification, contraception safety, Fraser guidance, consent and safeguarding thresholds.",
  },
  {
    question: "How does chlamydia come up in AKT questions?",
    answer:
      "Chlamydia questions often test asymptomatic infection, appropriate testing, treatment principles, pregnancy caveats, partner notification, abstinence until treatment is complete and when a GUM or sexual-health clinic is more appropriate.",
  },
  {
    question: "What safeguarding issues are high yield in AKT sexual health?",
    answer:
      "Know under-13 sexual activity, coercion, exploitation, sexual assault, trafficking, domestic abuse, impaired capacity, pressure from a partner or family member, and when confidentiality can be overridden to protect someone.",
  },
];

export default function AktSexualHealthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Sexual Health Revision: STIs, HIV and Consent",
        description:
          "A focused MRCGP AKT sexual health guide for STI testing, chlamydia, gonorrhoea, genital herpes, HIV testing, partner notification, contraception overlap, consent and safeguarding.",
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
            name: "AKT Sexual Health",
            url: "https://medexia-akt.com/akt-sexual-health",
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
            MRCGP AKT sexual health revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Sexual-health questions test more than STI facts. They test whether
            you can take a confidential history, offer the right tests, involve
            specialist services, manage partner risk and recognise safeguarding
            thresholds.
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
              For AKT sexual health revision, prioritise sexual history-taking,
              STI screening, chlamydia, gonorrhoea, genital herpes, HIV testing,
              PEP timing, PrEP awareness, partner notification, contraception
              overlap, consent, confidentiality and safeguarding.
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
              Why sexual-health questions catch candidates out
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
                The common trap is answering the infection but missing the
                system around it: partner notification, pregnancy status,
                anatomical site of exposure, HIV testing, consent, confidentiality
                or safeguarding. In AKT stems, those details often determine the
                safest next step.
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
              AKT sexual health FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/sexual-health"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP sexual health topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng221"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE reducing sexually transmitted infections guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng60"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE HIV testing guideline
              </a>
              <a
                href="https://cks.nice.org.uk/topics/chlamydia-uncomplicated-genital/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS chlamydia guidance
              </a>
              <a
                href="https://cks.nice.org.uk/topics/herpes-simplex-genital/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE CKS genital herpes guidance
              </a>
              <a
                href="https://www.bashh.org/resources/guidelines/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                BASHH sexual-health and STI guidelines
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/sexual-health"
            >
              Open sexual health topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-confidentiality-safeguarding-data-protection"
            >
              Review consent and safeguarding &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE CKS, BASHH, local sexual-health pathways and BNF guidance
            for clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
