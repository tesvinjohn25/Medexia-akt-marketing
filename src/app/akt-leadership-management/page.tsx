import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Leadership and Management Revision",
  description:
    "MRCGP AKT leadership and management revision: teamwork, raising concerns, complaints, resources, QI, governance and safe general practice systems.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-leadership-management",
  },
  openGraph: {
    title: "MRCGP AKT Leadership and Management Revision",
    description:
      "A focused AKT guide covering leadership, teamwork, resource use, raising concerns, complaints, QI and safe practice systems.",
    type: "article",
    url: "https://medexia-akt.com/akt-leadership-management",
  },
};

const coreAreas = [
  {
    title: "Teamwork and accountability",
    text: "Revise MDT working, supervision, delegation, handover, shared responsibility, escalation and when a GP remains accountable for safe care.",
  },
  {
    title: "Raising concerns",
    text: "Know the professional duty to act early on patient-safety concerns, document clearly, escalate through appropriate routes and protect patients from avoidable harm.",
  },
  {
    title: "Practice systems",
    text: "AKT questions often test repeat prescribing, test-result workflows, task delegation, recall systems, access models and safe follow-up ownership.",
  },
  {
    title: "Complaints and feedback",
    text: "Focus on openness, early acknowledgement, learning from complaints, candour, communication with patients and changing systems after problems.",
  },
  {
    title: "Resources and prioritisation",
    text: "Leadership stems can involve fair resource use, triage, workload, appointment access, risk prioritisation and balancing individual and population need.",
  },
  {
    title: "Quality improvement",
    text: "Link leadership to audit, PDSA, significant-event learning, feedback, measurable aims and small system changes that improve patient outcomes.",
  },
];

const traps = [
  "Choosing informal reassurance when a patient-safety concern needs clear escalation",
  "Assuming delegation removes the GP's responsibility to ensure the task is suitable and supervised",
  "Treating complaints as defensiveness rather than a source of learning and system improvement",
  "Focusing on individual blame when the AKT stem is pointing to a process or workflow failure",
  "Ignoring conflicts of interest, fairness or transparency when resources are limited",
  "Missing that leadership is tested through practical GP systems, not only management theory",
];

const faqs = [
  {
    question: "Is leadership and management tested in the MRCGP AKT?",
    answer:
      "Yes. Leadership, management and administration is an RCGP professional curriculum topic. AKT questions can test teamwork, delegation, raising concerns, complaints, resource use, QI, audit, governance and safe practice systems.",
  },
  {
    question: "What should I revise first for AKT leadership questions?",
    answer:
      "Start with raising patient-safety concerns, team communication, delegation, supervision, complaints, duty of candour, audit, PDSA, significant-event learning, resource allocation and repeat-prescribing or test-result systems.",
  },
  {
    question: "How does leadership differ from quality and safety in the AKT?",
    answer:
      "There is overlap. Quality and safety focuses on the improvement method and patient-safety systems; leadership and management focuses on how doctors work with teams, escalate concerns, use resources and improve services.",
  },
  {
    question: "Do I need to memorise management frameworks for the AKT?",
    answer:
      "Usually no. The AKT is more likely to test practical professional judgement: what to escalate, how to communicate with teams, how to respond to complaints and how to make safer systems.",
  },
];

export default function AktLeadershipManagementPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Leadership and Management Revision",
        description:
          "A focused MRCGP AKT guide for teamwork, raising concerns, complaints, resource use, QI, governance and safe general practice systems.",
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
            name: "AKT Leadership and Management",
            url: "https://medexia-akt.com/akt-leadership-management",
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
            MRCGP AKT leadership and management revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            These questions test practical professional judgement: how you work
            with teams, escalate concerns, use resources, respond to complaints
            and improve the systems that keep patients safe.
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
              For AKT leadership revision, prioritise teamwork, delegation,
              raising concerns, complaints, duty of candour, resource use,
              audit, PDSA, significant-event learning and safe repeat
              prescribing, recall and test-result systems.
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
                The trap is looking for abstract leadership theory. In the AKT,
                leadership usually appears as a concrete system problem: a
                missed result, unsafe delegation, a complaint, a prescribing
                workflow, a concern that needs escalation or a limited resource
                that must be used fairly.
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
              AKT leadership and management FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/leadership-management"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP leadership, management and administration topic guide
              </a>
              <a
                href="https://www.gmc-uk.org/professional-standards/the-professional-standards/leadership-and-management/about-this-guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GMC leadership and management guidance
              </a>
              <a
                href="https://www.gmc-uk.org/professional-standards/the-professional-standards/leadership-and-management/working-with-colleagues"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GMC working with colleagues
              </a>
              <a
                href="https://www.england.nhs.uk/wp-content/uploads/2019/03/an-introduction-to-quality-improvement-in-general-practice.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NHS England quality improvement in general practice
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/topics/leadership-management"
            >
              Open leadership topic &rarr;
            </a>
            <a
              className="btn-secondary text-center text-[16px]"
              href="/akt-continuity-quality-safety"
            >
              Review quality and safety &rarr;
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
