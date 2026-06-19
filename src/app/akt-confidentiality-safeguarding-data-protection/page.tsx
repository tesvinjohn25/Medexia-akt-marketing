import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "AKT Confidentiality, Safeguarding and Data Protection",
  description:
    "MRCGP AKT revision for confidentiality, safeguarding, recorded consultations, consent, GDPR-style data protection and GMC guidance.",
  alternates: {
    canonical:
      "https://medexia-akt.com/akt-confidentiality-safeguarding-data-protection",
  },
  openGraph: {
    title: "AKT Confidentiality, Safeguarding and Data Protection",
    description:
      "A focused AKT guide to confidentiality, safeguarding, recorded consultations, information sharing and data-protection themes in recent feedback.",
    type: "article",
    url: "https://medexia-akt.com/akt-confidentiality-safeguarding-data-protection",
  },
};

const testedAreas = [
  {
    title: "Confidentiality and disclosure",
    text: "Know when patient information should stay confidential, when consent should be sought and when disclosure may be justified by law or public interest.",
  },
  {
    title: "Children and young people",
    text: "Revise Gillick competence, Fraser guidance, parental access to records, sexual health confidentiality and when child protection overrides confidentiality.",
  },
  {
    title: "Safeguarding",
    text: "Recognise abuse and neglect, know when to share information, document your rationale and avoid delaying action where a child or adult may be at risk.",
  },
  {
    title: "Recorded consultations",
    text: "AKT scenarios may test consent, secure storage, personal devices, cloud storage and handling recordings as sensitive clinical information.",
  },
  {
    title: "Data protection in practice",
    text: "Focus on access to records, privacy notices, data minimisation, secure handling, subject access requests and safe disposal of health records.",
  },
];

const feedbackSignals = [
  {
    sitting: "April 2026",
    text: "The official feedback report highlighted data protection around recorded consultations and safeguarding children with confidentiality.",
  },
  {
    sitting: "October 2025",
    text: "The report highlighted confidentiality guidance, paediatric safeguarding and acute child-health themes as areas that caused difficulty.",
  },
  {
    sitting: "Exam pattern",
    text: "These questions usually reward practical judgement: who needs to know, what is proportionate, whether consent is needed and what should be documented.",
  },
];

const revisionRules = [
  {
    title: "Start with safety",
    text: "If there is a risk of serious harm, safeguarding and public-interest disclosure can override confidentiality. Do not delay action to seek consent if that increases risk.",
  },
  {
    title: "Ask whether consent is possible",
    text: "If sharing is not urgent, consider consent first. If consent is refused, decide whether disclosure is still justified and document the reasoning.",
  },
  {
    title: "Share the minimum necessary",
    text: "Information sharing should be relevant, proportionate and limited to the people or agencies who need it for care, safeguarding or legal reasons.",
  },
  {
    title: "Treat recordings as clinical data",
    text: "Recorded consultations should be handled with the same seriousness as health records: secure storage, approved systems and no casual personal-device workflow.",
  },
];

const faqs = [
  {
    question: "Is confidentiality tested in the MRCGP AKT?",
    answer:
      "Yes. Confidentiality and information sharing sit within professional and organisational AKT content. Recent feedback reports have highlighted confidentiality, data protection and recorded-consultation scenarios.",
  },
  {
    question: "What should I revise for AKT safeguarding questions?",
    answer:
      "Revise child and adult safeguarding principles, information sharing, consent, documentation, escalation pathways, Gillick competence, Fraser guidance and when public-interest disclosure can override confidentiality.",
  },
  {
    question: "Can confidentiality be broken for safeguarding?",
    answer:
      "Yes, when disclosure is required by law or justified in the public interest, including to protect a child, young person, adult at risk or others from serious harm. The AKT usually tests proportionate sharing and clear documentation.",
  },
  {
    question: "Why are recorded consultations relevant to the AKT?",
    answer:
      "Recorded consultations combine consent, confidentiality, data protection and secure storage. Recent AKT feedback has specifically highlighted data protection around recorded consultations.",
  },
];

export default function AktConfidentialitySafeguardingDataProtectionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "AKT Confidentiality, Safeguarding and Data Protection",
        description:
          "A focused MRCGP AKT guide for confidentiality, safeguarding, recorded consultations and data-protection questions.",
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
            name: "AKT Confidentiality and Safeguarding",
            url: "https://medexia-akt.com/akt-confidentiality-safeguarding-data-protection",
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
            AKT confidentiality, safeguarding and data protection
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            These AKT questions are professional judgement questions. They test
            whether you can protect confidentiality, share information safely,
            recognise safeguarding risk and handle recorded consultations or
            health records properly.
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
              For AKT confidentiality and safeguarding, revise GMC
              confidentiality principles, child and adult safeguarding,
              Gillick competence, Fraser guidance, information sharing without
              consent, recorded-consultation storage and secure handling of
              health records.
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
              What AKT questions test
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {testedAreas.map((area) => (
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
              Recent feedback signals
            </h2>
            <div className="mt-4 grid gap-3">
              {feedbackSignals.map((signal) => (
                <article
                  key={signal.sitting}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="grid gap-2 sm:grid-cols-[130px_1fr]">
                    <h3
                      className="text-[13px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--brand-emerald)" }}
                    >
                      {signal.sitting}
                    </h3>
                    <p
                      className="text-[14px] leading-[1.65]"
                      style={{ color: "var(--fg-mid)" }}
                    >
                      {signal.text}
                    </p>
                  </div>
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
              Four rules for exam scenarios
            </h2>
            <div className="mt-4 grid gap-3">
              {revisionRules.map((rule) => (
                <article
                  key={rule.title}
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
                    {rule.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {rule.text}
                  </p>
                </article>
              ))}
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
              AKT confidentiality FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/further-help-support"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT feedback reports
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/wpba/recording-consultation-guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP recording consultation guidance
              </a>
              <a
                href="https://www.rcgp.org.uk/learning-resources/safeguarding-standards"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP safeguarding standards
              </a>
              <a
                href="https://www.gmc-uk.org/professional-standards/the-professional-standards/confidentiality/disclosures-for-the-protection-of-patients-and-others"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GMC disclosures for protection of patients and others
              </a>
              <a
                href="https://www.gmc-uk.org/professional-standards/the-professional-standards/0-18-years/principles-of-confidentiality"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GMC 0-18 years: principles of confidentiality
              </a>
              <a
                href="https://www.england.nhs.uk/long-read/information-governance-and-data-protection/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS England information governance and data protection
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/akt-feedback-reports"
            >
              Review feedback themes &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/topics/children-young-people"
            >
              Open child-health topic
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP or GMC advice. Check
            current RCGP, GMC and NHS guidance for professional or clinical
            decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
