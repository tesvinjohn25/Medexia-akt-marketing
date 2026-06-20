import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Smoking, Alcohol and Substance Misuse Revision",
  description:
    "MRCGP AKT smoking, alcohol and substance misuse revision: smoking cessation, AUDIT, alcohol dependence, opioids, harm reduction and safeguarding.",
  alternates: {
    canonical:
      "https://medexia-akt.com/akt-smoking-alcohol-substance-misuse",
  },
  openGraph: {
    title: "MRCGP AKT Smoking, Alcohol and Substance Misuse Revision",
    description:
      "A focused AKT guide covering smoking cessation, AUDIT, alcohol dependence, opioid dependence, harm reduction, safeguarding and relapse prevention.",
    type: "article",
    url: "https://medexia-akt.com/akt-smoking-alcohol-substance-misuse",
  },
};

const coreAreas = [
  {
    title: "Smoking cessation",
    text: "Revise very brief advice, nicotine replacement therapy, varenicline or bupropion where appropriate, relapse prevention, pregnancy and comorbid mental health.",
  },
  {
    title: "Alcohol screening",
    text: "Know AUDIT and AUDIT-C use, hazardous versus harmful drinking, dependence clues, brief interventions, withdrawal risk and when specialist input is needed.",
  },
  {
    title: "Alcohol dependence",
    text: "Cover community versus inpatient detox, withdrawal seizures, delirium tremens, chlordiazepoxide regimens, relapse prevention and vitamin supplementation.",
  },
  {
    title: "Opioid dependence",
    text: "Focus on methadone, buprenorphine, supervised consumption, shared care, overdose risk, naloxone, pregnancy and safe prescribing boundaries.",
  },
  {
    title: "Harm reduction",
    text: "Revise needle exchange, blood-borne virus testing, hepatitis B vaccination, hepatitis C treatment, safer injecting advice and non-judgemental follow-up.",
  },
  {
    title: "Safeguarding and comorbidity",
    text: "Link substance misuse with mental health, domestic abuse, child safeguarding, driving, employment, homelessness, exploitation and medication interactions.",
  },
];

const redFlags = [
  "Alcohol withdrawal with seizures, delirium tremens, confusion, severe autonomic symptoms or high-risk comorbidity",
  "Opioid overdose, respiratory depression, reduced consciousness, polysubstance use or unsafe access to sedatives",
  "Pregnancy with alcohol or substance dependence, safeguarding concern, domestic abuse or child at risk",
  "Suicidal ideation, psychosis, severe depression, self-neglect or acute mental health crisis",
  "Jaundice, haematemesis, melaena, ascites, encephalopathy or suspected decompensated liver disease",
  "Injection-site infection, fever, endocarditis features, blood-borne virus risk or severe soft-tissue infection",
];

const faqs = [
  {
    question: "Is smoking, alcohol and substance misuse tested in the MRCGP AKT?",
    answer:
      "Yes. It is a named RCGP curriculum topic. AKT questions can test smoking cessation, AUDIT, alcohol dependence, opioid substitution, harm reduction, blood-borne viruses, safeguarding and mental health comorbidity.",
  },
  {
    question: "What should I revise first for AKT substance misuse?",
    answer:
      "Prioritise smoking cessation advice and medicines, AUDIT scoring, alcohol withdrawal risk, detox thresholds, relapse prevention, opioid substitution, naloxone, blood-borne virus testing and safeguarding.",
  },
  {
    question: "How does AUDIT come up in AKT questions?",
    answer:
      "AUDIT is used to identify hazardous, harmful or dependent drinking. AKT stems may test score interpretation, brief intervention, referral thresholds or when withdrawal risk makes community management unsafe.",
  },
  {
    question: "What is the AKT trap with opioid dependence?",
    answer:
      "The trap is treating opioid dependence as only a prescribing issue. Safe answers consider overdose risk, supervised consumption, shared-care boundaries, naloxone, pregnancy, safeguarding and blood-borne virus prevention.",
  },
];

export default function AktSmokingAlcoholSubstanceMisusePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Smoking, Alcohol and Substance Misuse Revision",
        description:
          "A focused MRCGP AKT guide for smoking cessation, AUDIT, alcohol dependence, opioid dependence, harm reduction, safeguarding and relapse prevention.",
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
            name: "AKT Smoking, Alcohol and Substance Misuse",
            url: "https://medexia-akt.com/akt-smoking-alcohol-substance-misuse",
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
            MRCGP AKT smoking, alcohol and substance misuse revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            These questions test practical GP care: smoking cessation, AUDIT,
            alcohol withdrawal risk, opioid dependence, harm reduction,
            safeguarding and comorbid mental health.
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
              For AKT smoking, alcohol and substance misuse revision, prioritise
              smoking cessation, AUDIT, alcohol withdrawal risk, detox
              thresholds, relapse prevention, opioid substitution, naloxone,
              blood-borne virus testing, harm reduction and safeguarding.
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
                The trap is either moralising or treating the problem as a
                single prescription. AKT answers usually reward practical,
                non-judgemental risk assessment, harm reduction, safeguarding
                awareness and knowing when specialist support is needed.
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
              AKT substance misuse FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/smoking-alcohol-substance-misuse"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP smoking, alcohol and substance misuse topic guide
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng209"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE tobacco guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg115"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE alcohol-use disorders guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/cg52"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE opioid detoxification guideline
              </a>
              <a
                href="https://www.nice.org.uk/guidance/qs11"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE alcohol-use disorders quality standard
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/smoking-alcohol-substance-misuse"
            >
              Open substance misuse topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-mental-health"
            >
              Review mental health &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, NICE, local drug and alcohol pathways, safeguarding pathways
            and BNF guidance for clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
