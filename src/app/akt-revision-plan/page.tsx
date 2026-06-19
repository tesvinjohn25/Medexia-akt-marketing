import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Revision Plan and Timetable",
  description:
    "MRCGP AKT revision plan: how long to revise, 12-week, 8-week and 4-week AKT timetables, timed mocks, audio revision and weak-area practice.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-revision-plan",
  },
  openGraph: {
    title: "MRCGP AKT Revision Plan and Timetable",
    description:
      "A practical AKT revision timetable for GP trainees: 12-week, 8-week and 4-week plans built around questions, timed mocks and audio revision.",
    type: "article",
    url: "https://medexia-akt.com/akt-revision-plan",
  },
};

const timetablePlans = [
  {
    title: "12-week plan",
    subtitle: "Best if you can start early",
    steps: [
      "Weeks 1-2: sit a baseline mock and map weak AKT topics.",
      "Weeks 3-6: cover the syllabus systematically with daily question practice.",
      "Weeks 7-9: add regular timed mocks and review every wrong answer.",
      "Weeks 10-11: focus on statistics, prescribing, neurology, safeguarding, confidentiality and repeated weak areas.",
      "Week 12: taper, review summaries, protect sleep and check exam logistics.",
    ],
  },
  {
    title: "8-week plan",
    subtitle: "Focused, realistic and still workable",
    steps: [
      "Week 1: take a baseline mock immediately, then prioritise your weakest domains.",
      "Weeks 2-5: do 40-60 questions most days and verify mistakes against NICE CKS or the BNF.",
      "Weeks 6-7: move into timed mocks, statistics blocks and official feedback-report themes.",
      "Week 8: review high-yield errors, avoid new rabbit holes and keep revision light before the exam.",
    ],
  },
  {
    title: "4-week plan",
    subtitle: "Not ideal, but possible with triage",
    steps: [
      "Day 1: take a short diagnostic or full mock to expose the biggest gaps.",
      "Weeks 1-3: use daily timed question blocks, not passive reading.",
      "Protect separate blocks for statistics, prescribing, guideline changes and organisation topics.",
      "Final week: review mistakes, practise pacing and avoid cramming deep new topics.",
    ],
  },
];

const weeklyRoutine = [
  {
    title: "Question practice",
    text: "Use questions as the main learning loop. Read explanations carefully and turn repeated mistakes into a short weak-area list.",
  },
  {
    title: "Timed mocks",
    text: "Practise recall under pressure. The current AKT format gives one minute per question, so pacing has to be trained.",
  },
  {
    title: "Audio revision",
    text: "Use audio for commutes, walks, chores and low-energy days. Keep screen-based time for questions, mocks and mistake review.",
  },
  {
    title: "Official guidance checks",
    text: "When an answer depends on current clinical guidance, verify it with NICE CKS, the BNF or the relevant RCGP material.",
  },
];

const faqs = [
  {
    question: "How long should I revise for the MRCGP AKT?",
    answer:
      "A 12-week focused plan is a practical target for many GP trainees. Some trainees start 3 to 6 months before the exam, especially if work, childcare or on-calls limit study time. Shorter plans can work, but they need tighter prioritisation.",
  },
  {
    question: "Is 8 weeks enough for the AKT?",
    answer:
      "Eight weeks can be enough if you start with a baseline mock, revise consistently and focus on weak areas rather than comfortable topics. You should include timed mocks, statistics practice and official feedback-report themes from the first half of the plan.",
  },
  {
    question: "Can I revise for the AKT while working full time?",
    answer:
      "Yes. Most GP trainees revise around clinical work. Put question practice into your alert time, use audio revision for travel or low-energy moments, and reserve longer blocks for timed mocks and reviewing mistakes.",
  },
  {
    question: "Should I do AKT questions or read guidelines first?",
    answer:
      "Start with questions. They show what you actually know, expose weak areas and make guideline reading more targeted. Use NICE CKS, the BNF and RCGP resources to check and consolidate difficult or changing areas.",
  },
];

export default function AktRevisionPlanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Revision Plan and Timetable",
        description:
          "A practical AKT revision timetable for GP trainees, including 12-week, 8-week and 4-week plans.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-06-19",
        dateModified: "2026-06-19",
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
            name: "MRCGP AKT Revision Plan",
            url: "https://medexia-akt.com/akt-revision-plan",
          },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[840px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            MRCGP AKT revision plan and timetable
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The best AKT revision plan is simple: diagnose your weak areas,
            practise questions consistently, review mistakes properly and use
            timed mocks early enough to fix pacing. Audio revision fills the
            gaps around clinics, commuting, childcare and low-energy days.
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
              If possible, allow around <strong>12 weeks</strong> of focused AKT
              revision. With <strong>8 weeks</strong>, take a baseline mock
              immediately and prioritise weak topics, statistics, prescribing
              and official feedback-report themes. With <strong>4 weeks</strong>,
              use daily timed blocks and avoid passive reading.
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
              Choose your AKT timetable
            </h2>
            <div className="mt-4 grid gap-3">
              {timetablePlans.map((plan) => (
                <article
                  key={plan.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3
                      className="text-[18px] font-semibold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {plan.title}
                    </h3>
                    <p
                      className="text-[13px]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {plan.subtitle}
                    </p>
                  </div>
                  <ul
                    className="mt-3 space-y-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {plan.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
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
              What to do every week
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {weeklyRoutine.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
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
              Fit revision around clinics
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Put your hardest screen-based work into the times you are most
              alert: timed questions, mock review and statistics. Put audio
              revision into the margins: the commute, school run, gym, walk
              home, cooking or the final half hour before bed. That keeps your
              AKT plan moving even when you do not have another full study
              block.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              AKT Navigator is built around that rhythm: free syllabus-mapped
              questions and mocks for active recall, plus the 90+ hour audio
              library when listening is the only realistic revision slot.
            </p>
          </section>

          <section className="mt-10">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT revision plan FAQ
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
              Official sources to build around
            </h2>
            <div
              className="mt-3 grid gap-2 text-[14px]"
              style={{ color: "var(--fg-mid)" }}
            >
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-preparing"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP preparing for the AKT
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
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/clinical-topic-guides"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP curriculum topic guides
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
            <a className="btn-primary text-center text-[16px]" href="/akt-mock-exam">
              Try timed AKT mocks &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/akt-audio-revision">
              Use audio revision
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Always check
            the RCGP, NICE CKS and BNF for current exam and clinical guidance.
            Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
