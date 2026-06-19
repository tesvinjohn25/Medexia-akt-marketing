import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Neurology Revision: Gait, Headache and Seizures",
  description:
    "MRCGP AKT neurology revision: gait disturbance, headache red flags, epilepsy, stroke, Parkinson's, MS and recurring RCGP feedback themes.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-neurology",
  },
  openGraph: {
    title: "MRCGP AKT Neurology Revision: Gait, Headache and Seizures",
    description:
      "A focused AKT neurology guide covering gait disturbance, headache red flags, seizures, stroke, Parkinson's, MS and recent feedback themes.",
    type: "article",
    url: "https://medexia-akt.com/akt-neurology",
  },
};

const coreAreas = [
  {
    title: "Gait disturbance",
    text: "Recent AKT feedback specifically highlights difficulty recognising common gait disturbances. Revise Parkinsonian, ataxic, sensory, neuropathic and hemiplegic patterns.",
  },
  {
    title: "Headache red flags",
    text: "Know thunderclap headache, meningism, papilloedema, new headache over 50, cancer history, focal neurology and pattern change that needs urgent action.",
  },
  {
    title: "Seizures and epilepsy",
    text: "Recognise first seizure pathways, focal versus generalised seizures, status epilepticus, driving advice and valproate restrictions.",
  },
  {
    title: "Stroke and TIA",
    text: "Focus on FAST symptoms, posterior circulation symptoms, urgent referral windows, AF-related stroke prevention and secondary prevention principles.",
  },
  {
    title: "Movement disorders",
    text: "Parkinson's diagnosis requires bradykinesia plus tremor or rigidity. Distinguish essential tremor, drug-induced parkinsonism and atypical features.",
  },
  {
    title: "MS and neuro-inflammatory disease",
    text: "Revise optic neuritis, transverse myelitis, symptoms separated in time and space, and when primary care should refer rather than diagnose.",
  },
];

const feedbackSignals = [
  {
    sitting: "January 2026",
    text: "The official report says neurology has been a frequent area of feedback, including each of the last four AKTs, with difficulty recognising gait disturbances.",
  },
  {
    sitting: "October 2025",
    text: "Recent feedback again highlighted important neurological presentations, reinforcing neurology as a repeated weak-area theme.",
  },
  {
    sitting: "Revision priority",
    text: "Neurology questions often reward pattern recognition: time course, focal signs, red flags, gait type and whether the presentation is urgent.",
  },
];

const redFlags = [
  "Thunderclap headache or worst headache ever",
  "Headache with fever, neck stiffness or photophobia",
  "Papilloedema, new focal neurology or altered consciousness",
  "Suspected stroke, TIA or acute posterior circulation symptoms",
  "Status epilepticus or first seizure with high-risk features",
  "Rapidly progressive weakness or ascending weakness",
];

const faqs = [
  {
    question: "Is neurology high yield for the MRCGP AKT?",
    answer:
      "Yes. Recent RCGP feedback says neurology has been a frequent area of feedback, including each of the last four AKT sittings. Gait disturbance, important neurological presentations and pattern recognition are key areas to revise.",
  },
  {
    question: "What neurology topics should I revise for the AKT?",
    answer:
      "Prioritise gait disturbance, headache red flags, seizures and epilepsy, stroke and TIA, Parkinson's disease, tremor, multiple sclerosis, neuropathy, focal weakness and urgent referral thresholds.",
  },
  {
    question: "How should I revise gait disturbance for the AKT?",
    answer:
      "Learn the pattern first: Parkinsonian gait, cerebellar ataxia, sensory ataxia, neuropathic gait, spastic or hemiplegic gait. Then practise linking the gait description to the likely diagnosis and urgency.",
  },
  {
    question: "Are headache red flags tested in the AKT?",
    answer:
      "Yes. Headache questions commonly test whether you can identify urgent red flags such as thunderclap onset, meningism, papilloedema, focal neurology, new headache over 50 or a major change in headache pattern.",
  },
];

export default function AktNeurologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Neurology Revision: Gait, Headache and Seizures",
        description:
          "A focused MRCGP AKT neurology guide for gait disturbance, headache red flags, seizures, stroke, Parkinson's disease and MS.",
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
          { name: "AKT Neurology", url: "https://medexia-akt.com/akt-neurology" },
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
            MRCGP AKT neurology revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Neurology is one of the strongest repeated AKT feedback signals.
            The exam often tests pattern recognition: gait, headache red flags,
            seizure type, focal neurology, urgency and when primary care should
            refer.
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
              For AKT neurology, prioritise gait disturbance, headache red
              flags, first seizures, epilepsy medication principles, stroke and
              TIA recognition, Parkinson&apos;s disease, tremor, MS, neuropathy
              and urgent referral thresholds.
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
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT neurology FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/neurology"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP neurology topic guide
              </a>
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
                href="https://www.rcgp.org.uk/getmedia/124946b0-3c0d-4337-8c1d-406c53a51cf2/January-2026-AKT-feedback-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP January 2026 AKT feedback report
              </a>
              <a
                href="https://cks.nice.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                NICE Clinical Knowledge Summaries
              </a>
              <a
                href="https://bnf.nice.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                BNF
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
            <a className="btn-secondary text-center text-[16px]" href="/topics/neurology">
              Open neurology topic
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
