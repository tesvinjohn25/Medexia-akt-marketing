import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Equality, Diversity and Inclusion Revision",
  description:
    "MRCGP AKT equality, diversity and inclusion revision: reasonable adjustments, interpreters, disability, access barriers, health inequalities and inclusive GP care.",
  alternates: {
    canonical:
      "https://medexia-akt.com/akt-equality-diversity-inclusion",
  },
  openGraph: {
    title: "MRCGP AKT Equality, Diversity and Inclusion Revision",
    description:
      "A focused AKT guide covering reasonable adjustments, accessible information, communication barriers, health inequalities and inclusive GP care.",
    type: "article",
    url: "https://medexia-akt.com/akt-equality-diversity-inclusion",
  },
};

const coreAreas = [
  {
    title: "Reasonable adjustments",
    text: "Know how disability, sensory loss, neurodiversity, learning disability and long-term conditions can require practical changes to access, communication and follow-up.",
  },
  {
    title: "Accessible communication",
    text: "Revise interpreters, accessible formats, hearing or visual impairment, literacy, digital exclusion and how communication support changes safe care.",
  },
  {
    title: "Health inequalities",
    text: "Think beyond disease knowledge: deprivation, ethnicity, homelessness, migration, disability and access barriers can all change risk, uptake and outcomes.",
  },
  {
    title: "Inclusive consulting",
    text: "AKT stems may test respectful language, shared decisions, cultural context, patient preferences, advocacy and avoiding assumptions or stereotypes.",
  },
  {
    title: "Equitable systems",
    text: "Look for practical system fixes: flagging communication needs, longer appointments, proactive recall, accessible screening and clear safety-netting.",
  },
  {
    title: "Protected characteristics",
    text: "Understand how age, disability, race, sex, pregnancy and maternity, religion or belief, sexual orientation and gender reassignment can affect fair access.",
  },
];

const traps = [
  "Treating equality as giving every patient the same process rather than removing barriers to fair access",
  "Using a family member instead of a professional interpreter for complex, sensitive or high-risk clinical communication",
  "Missing the need to record, flag, share and meet communication support needs",
  "Blaming non-attendance without considering transport, disability, literacy, trauma, poverty or digital-access barriers",
  "Forgetting that reasonable adjustments may need proactive systems, not just individual goodwill",
  "Ignoring how EDI overlaps with safeguarding, capacity, confidentiality, screening uptake and chronic disease review",
];

const faqs = [
  {
    question: "Is equality, diversity and inclusion tested in the MRCGP AKT?",
    answer:
      "Yes. Equality, diversity and inclusion is an RCGP professional curriculum topic. AKT questions can test reasonable adjustments, accessible information, interpreters, communication barriers, health inequalities and inclusive GP systems.",
  },
  {
    question: "What should I revise first for AKT EDI questions?",
    answer:
      "Start with reasonable adjustments, accessible communication, professional interpreter use, disability and neurodiversity access, health inequalities, cultural safety, screening uptake and practical system changes in primary care.",
  },
  {
    question: "How do reasonable adjustments come up in the AKT?",
    answer:
      "They often appear as access or communication problems: longer appointments, accessible formats, interpreter support, sensory impairment, learning disability, autism, digital exclusion, appointment systems and follow-up planning.",
  },
  {
    question: "How is this different from population health revision?",
    answer:
      "Population health focuses on prevention, screening, immunisation and wider determinants. EDI focuses on fair access and inclusive care for individual patients and groups who may face barriers inside the healthcare system.",
  },
];

export default function AktEqualityDiversityInclusionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Equality, Diversity and Inclusion Revision",
        description:
          "A focused MRCGP AKT guide for reasonable adjustments, accessible information, communication barriers, health inequalities and inclusive GP care.",
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
            name: "AKT Equality, Diversity and Inclusion",
            url: "https://medexia-akt.com/akt-equality-diversity-inclusion",
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
            MRCGP AKT equality, diversity and inclusion revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            These questions test whether you can spot access barriers, make
            reasonable adjustments, use communication support safely and apply
            inclusive care in everyday UK general practice.
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
              For AKT EDI revision, prioritise reasonable adjustments,
              accessible information, interpreter use, disability and
              neurodiversity access, health inequalities, cultural context and
              practical systems that help patients receive fair, safe care.
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
              Common AKT traps
            </h2>
            <ul
              className="mt-4 grid gap-3 sm:grid-cols-2"
              style={{ color: "var(--fg-mid)" }}
            >
              {traps.map((trap) => (
                <li
                  key={trap}
                  className="rounded-xl p-4 text-[14px] leading-[1.55]"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {trap}
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
                The trap is treating EDI as a values statement. In the AKT it
                is practical: which adjustment removes the barrier, when a
                professional interpreter is needed, how to document
                communication needs and how access barriers affect clinical
                risk.
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
              AKT equality and inclusion FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/equality"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP equality, diversity and inclusion topic guide
              </a>
              <a
                href="https://standards.nhs.uk/published-standards/accessible-information"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS Accessible Information Standard
              </a>
              <a
                href="https://www.gov.uk/guidance/equality-act-2010-guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GOV.UK Equality Act 2010 guidance
              </a>
              <a
                href="https://www.gmc-uk.org/professional-standards/the-professional-standards/good-medical-practice/domain-2-patients-partnership-and-communication"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GMC patients, partnership and communication
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/equality-diversity-inclusion"
            >
              Open EDI topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-learning-disability"
            >
              Review reasonable adjustments &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, GMC, NHS, NICE, local policy and safeguarding guidance for
            clinical decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
