import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { aktTopics } from "@/data/akt-topics";

export const metadata: Metadata = {
  title: "MRCGP AKT Syllabus and 32 Curriculum Topics",
  description:
    "MRCGP AKT syllabus: 80% clinical knowledge, 10% evidence-based practice, 10% organisation and management, plus all 32 RCGP topic guides.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-syllabus",
  },
  openGraph: {
    title: "MRCGP AKT Syllabus and 32 Curriculum Topics",
    description:
      "A clear guide to what the AKT covers: section weighting, the 32 RCGP curriculum topic guides and how to revise the syllabus.",
    type: "article",
    url: "https://medexia-akt.com/akt-syllabus",
  },
};

const syllabusSections = [
  {
    title: "Clinical knowledge",
    weight: "80%",
    text: "Applied clinical problem-solving in UK general practice across common presentations, long-term conditions, life stages and urgent care.",
  },
  {
    title: "Evidence-based practice",
    weight: "10%",
    text: "Statistics, critical appraisal, study design, diagnostic-test interpretation, graphs, prescribing data and risk communication.",
  },
  {
    title: "Organisation and management",
    weight: "10%",
    text: "Ethics, confidentiality, safeguarding, prescribing systems, practice organisation, NHS structures, leadership and professional responsibilities.",
  },
];

const faqs = [
  {
    question: "What is in the MRCGP AKT syllabus?",
    answer:
      "The AKT covers applied general-practice knowledge across the RCGP curriculum. The exam is broadly 80% clinical knowledge, 10% evidence-based practice and critical appraisal, and 10% primary care organisation and management.",
  },
  {
    question: "How many RCGP AKT topics are there?",
    answer:
      "The RCGP curriculum is supported by 32 topic guides grouped into Professional, Life Stages and Clinical topic guides. AKT revision should cover all 32, not only the common clinical specialties.",
  },
  {
    question: "Can I revise only high-yield AKT topics?",
    answer:
      "You can weight your time toward weak areas and recurring feedback-report themes, but the AKT still tests the full curriculum. The safest plan is broad coverage plus extra time for statistics, prescribing, neurology, safeguarding, confidentiality and your weakest topics.",
  },
  {
    question: "How does AKT Navigator cover the syllabus?",
    answer:
      "AKT Navigator maps revision across all 32 RCGP curriculum topics with free syllabus-mapped questions, mock exams, deep structured explanations and a 90+ hour audio library for full audio access.",
  },
];

export default function AktSyllabusPage() {
  const professional = aktTopics.filter((topic) => topic.category === "Professional");
  const lifeStages = aktTopics.filter((topic) => topic.category === "Life Stages");
  const clinical = aktTopics.filter((topic) => topic.category === "Clinical");
  const topicGroups = [
    { label: "Professional topic guides", topics: professional },
    { label: "Life Stages topic guides", topics: lifeStages },
    { label: "Clinical topic guides", topics: clinical },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Syllabus and 32 Curriculum Topics",
        description:
          "A clear guide to the MRCGP AKT syllabus, section weighting and the 32 RCGP curriculum topic guides.",
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
      {
        "@type": "CollectionPage",
        name: "MRCGP AKT syllabus topics",
        hasPart: aktTopics.map((topic) => ({
          "@type": "WebPage",
          name: topic.name,
          url: `https://medexia-akt.com/topics/${topic.slug}`,
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
            name: "MRCGP AKT Syllabus",
            url: "https://medexia-akt.com/akt-syllabus",
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
            MRCGP AKT syllabus and 32 curriculum topics
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The AKT syllabus is the RCGP GP curriculum applied to written
            problem-solving. The exam is not just clinical medicine: one fifth
            of the paper comes from evidence-based practice, statistics,
            organisation and professional topics.
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
              The MRCGP AKT covers <strong>80% clinical knowledge</strong>,{" "}
              <strong>10% evidence-based practice</strong> and{" "}
              <strong>10% primary care organisation and management</strong>.
              The RCGP curriculum is supported by <strong>32 topic guides</strong>{" "}
              across Professional, Life Stages and Clinical areas.
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
              AKT syllabus weighting
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {syllabusSections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-[28px] font-semibold"
                    style={{
                      color: "var(--brand-iris)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {section.weight}
                  </p>
                  <h3
                    className="mt-2 text-[16px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {section.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {section.text}
                  </p>
                </article>
              ))}
            </div>
            <p
              className="mt-4 text-[15px] leading-[1.65]"
              style={{ color: "var(--fg-mid)" }}
            >
              For the evidence-based practice section, keep the{" "}
              <a
                href="/akt-statistics-formulas"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT statistics formulas
              </a>{" "}
              close while practising NNT, NNH and diagnostic-test questions.
            </p>
          </section>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              The 32 RCGP curriculum topic guides
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The RCGP topic guides are grouped into Professional, Life Stages
              and Clinical areas. The AKT can sample across the full curriculum,
              so use the list as a coverage map rather than a reading list to
              memorise from start to finish.
            </p>
            <div className="mt-5 grid gap-5">
              {topicGroups.map((group) => (
                <article
                  key={group.label}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3
                      className="text-[17px] font-semibold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {group.label}
                    </h3>
                    <p
                      className="text-[13px]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {group.topics.length} topics
                    </p>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {group.topics.map((topic) => (
                      <a
                        key={topic.slug}
                        href={`/topics/${topic.slug}`}
                        className="rounded-lg p-3 text-[14px] transition-colors hover:bg-white/[.03]"
                        style={{
                          background: "rgba(255,255,255,.025)",
                          border: "1px solid rgba(255,255,255,.06)",
                          color: "var(--fg-mid)",
                        }}
                      >
                        {topic.name}
                      </a>
                    ))}
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
              How to revise the syllabus without drowning in it
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "Use the syllabus as a checklist",
                  text: "Make sure every RCGP topic guide has been touched, but do not spend equal time everywhere. Let weak areas and feedback reports set the priority.",
                },
                {
                  title: "Do not skip the 20%",
                  text: "Evidence-based practice, statistics, organisation and management account for around 32 questions in the current 160-question format. Use the AKT statistics formulas page for NNT, NNH and the AKT prescribing page for medication-safety themes.",
                },
                {
                  title: "Pair questions with audio",
                  text: "Use screen time for questions, timed mocks and mistake review. Use audio to keep curriculum coverage moving during commutes, walks and low-energy revision slots.",
                },
              ].map((item) => (
                <article
                  key={item.title}
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
            <p
              className="mt-4 text-[15px] leading-[1.65]"
              style={{ color: "var(--fg-mid)" }}
            >
              For the professional 10%, use the{" "}
              <a
                href="/akt-prescribing-and-medication-safety"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT prescribing and medication safety guide
              </a>{" "}
              and{" "}
              <a
                href="/akt-confidentiality-safeguarding-data-protection"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT confidentiality and safeguarding guide
              </a>{" "}
              alongside the{" "}
              <a
                href="/akt-neurology"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT neurology guide
              </a>{" "}
              and statistics formulas page.
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
              AKT syllabus FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP introducing the AKT
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP GP curriculum
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
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/further-help-support"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP AKT feedback reports
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
            <a className="btn-primary text-center text-[16px]" href="/topics">
              Review all AKT topics &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/akt-audio-revision">
              Explore audio revision
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP advice. Check the RCGP
            curriculum and exam pages for current syllabus and exam information.
            Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
