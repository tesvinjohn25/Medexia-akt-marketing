import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Consulting in General Practice Revision",
  description:
    "MRCGP AKT consulting in general practice revision: shared decisions, consent, uncertainty, safety-netting, capacity, remote consulting and patient-centred care.",
  alternates: {
    canonical:
      "https://medexia-akt.com/akt-consulting-in-general-practice",
  },
  openGraph: {
    title: "MRCGP AKT Consulting in General Practice Revision",
    description:
      "A focused AKT guide covering consultation skills, shared decisions, consent, uncertainty, safety-netting, capacity and remote consulting.",
    type: "article",
    url: "https://medexia-akt.com/akt-consulting-in-general-practice",
  },
};

const coreAreas = [
  {
    title: "Shared decisions",
    text: "Revise option discussion, benefits, harms, uncertainty, decision aids, patient preferences and checking what matters to the patient.",
  },
  {
    title: "Consent and capacity",
    text: "Know informed consent, proportionate risk discussion, decision-specific capacity, supported decision making and what to record.",
  },
  {
    title: "Managing uncertainty",
    text: "AKT stems often reward explicit safety-netting, timeframes, red flags, follow-up responsibility and explaining uncertainty clearly.",
  },
  {
    title: "Patient-centred care",
    text: "Consider ideas, concerns, expectations, health beliefs, social context, multimorbidity, literacy, language and accessibility.",
  },
  {
    title: "Remote consulting",
    text: "Focus on triage, limitations of remote assessment, confidentiality, identity checks, escalation and when face-to-face review is needed.",
  },
  {
    title: "Complex consultations",
    text: "Revise angry patients, hidden agendas, medically unexplained symptoms, safeguarding cues, mental health risk and challenging requests.",
  },
];

const traps = [
  "Giving information without checking what matters to the patient",
  "Assuming consent is valid because a patient signed a form",
  "Managing uncertainty without clear safety-netting or follow-up ownership",
  "Using remote consulting when examination, safeguarding or deterioration risk needs escalation",
  "Treating capacity as global rather than decision-specific and time-specific",
  "Ignoring language, hearing, literacy, culture, disability or digital-access barriers",
];

const faqs = [
  {
    question: "Is consulting in general practice tested in the MRCGP AKT?",
    answer:
      "Yes. It is a named RCGP professional topic. AKT questions can test shared decision making, consent, capacity, safety-netting, uncertainty, remote consulting, communication barriers and patient-centred care.",
  },
  {
    question: "What should I revise first for AKT consulting questions?",
    answer:
      "Start with shared decisions, GMC consent principles, decision-specific capacity, risk communication, safety-netting, managing uncertainty, remote-consultation limits and communication barriers.",
  },
  {
    question: "How does safety-netting come up in the AKT?",
    answer:
      "Safety-netting questions usually test whether advice is specific: what red flags to watch for, when to seek help, how soon to review, who owns follow-up and what to do if symptoms change.",
  },
  {
    question: "Is consulting revision only relevant to the SCA?",
    answer:
      "No. The SCA tests observed consulting performance, but the AKT can test the knowledge behind safe consulting: consent, capacity, risk discussion, escalation and patient-centred decisions.",
  },
];

export default function AktConsultingInGeneralPracticePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Consulting in General Practice Revision",
        description:
          "A focused MRCGP AKT guide for shared decisions, consent, capacity, uncertainty, safety-netting, remote consulting and patient-centred care.",
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
            name: "AKT Consulting in General Practice",
            url: "https://medexia-akt.com/akt-consulting-in-general-practice",
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
            MRCGP AKT consulting in general practice revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            These questions test the knowledge behind safe consultations:
            shared decisions, consent, capacity, uncertainty, safety-netting,
            remote consulting and patient-centred care.
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
              For AKT consulting revision, prioritise shared decision making,
              consent, capacity, risk communication, safety-netting, managing
              uncertainty, remote-consultation limits and communication barriers
              that change safe management.
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
                The trap is treating consulting as soft skill theory. In the
                AKT, consulting knowledge is practical: whether consent is
                valid, what risk needs explaining, when remote care is unsafe,
                and how to safety-net uncertainty without missing deterioration.
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
              AKT consulting FAQ
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
                href="https://www.rcgp.org.uk/getmedia/524f7fcd-bce1-45ee-bfbf-329707df0662/topic-guides-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP curriculum topic guides 2025
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/rcgp-curriculum-being-gp"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP Being a GP curriculum
              </a>
              <a
                href="https://www.gmc-uk.org/professional-standards/the-professional-standards/decision-making-and-consent"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GMC decision making and consent guidance
              </a>
              <a
                href="https://www.nice.org.uk/guidance/ng197"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE shared decision making guideline
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/consulting-in-general-practice"
            >
              Open consulting topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-evidence-in-practice"
            >
              Review risk communication &rarr;
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check current
            RCGP, GMC, NICE, local policy and safeguarding guidance for clinical
            decisions. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
