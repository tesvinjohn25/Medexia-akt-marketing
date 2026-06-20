import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { TopicGrid } from "@/components/sections/TopicGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { aktTopics } from "@/data/akt-topics";

export const metadata: Metadata = {
  title: "All 32 AKT Topics — Full RCGP Curriculum Coverage",
  description:
    "Every topic in the RCGP AKT curriculum. Clinical (80%), Professional (10%), and Life Stages. Free AKT questions and explanations, with £59 Early Access before 8 July and £79 full audio access from 8 July.",
  alternates: {
    canonical: "https://medexia-akt.com/topics",
  },
  openGraph: {
    title: "All 32 AKT Topics — Full RCGP Curriculum Coverage",
    description:
      "Every topic in the RCGP AKT curriculum with dedicated audio, questions, and explanations.",
    type: "website",
    url: "https://medexia-akt.com/topics",
  },
};

const sourceLinks = [
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum",
    label: "RCGP: GP curriculum",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/clinical-topic-guides",
    label: "RCGP: Clinical topic guides",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/professional-topic-guides",
    label: "RCGP: Professional topic guides",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/life-stages-topic-guides",
    label: "RCGP: Life stages topic guides",
  },
];

const faqs = [
  {
    question: "How many RCGP AKT topics are there?",
    answer:
      "The RCGP curriculum is supported by 32 topic guides across clinical, professional and life-stage areas. AKT Navigator maps revision across all 32 topics.",
  },
  {
    question: "Which AKT topics are most important?",
    answer:
      "Clinical medicine is the largest part of the AKT at around 80% of questions. Evidence-based practice and organisation or management each make up around 10%, so they should not be ignored.",
  },
  {
    question: "Does AKT Navigator cover the full RCGP curriculum?",
    answer:
      "Yes. AKT Navigator covers the full RCGP AKT curriculum with topic pages, free question practice, deep structured explanations and audio-first revision.",
  },
  {
    question: "Should I revise by topic or by mock exam?",
    answer:
      "Use both. Topic revision helps close knowledge gaps across the curriculum, while timed mocks show whether you can apply that knowledge at one minute per question.",
  },
];

export default function TopicsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "AKT Topics — Full RCGP Curriculum",
        description:
          "All 32 topics covered by the MRCGP AKT across clinical, professional and life-stage areas.",
        url: "https://medexia-akt.com/topics",
        mainEntity: {
          "@type": "ItemList",
          name: "MRCGP AKT topic list",
          numberOfItems: aktTopics.length,
          itemListElement: aktTopics.map((topic, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: topic.name,
            url: `https://medexia-akt.com/topics/${topic.slug}`,
            description: topic.description,
          })),
        },
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
          { name: "AKT Topics", url: "https://medexia-akt.com/topics" },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[720px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            All 32 AKT topics
          </h1>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The RCGP AKT curriculum spans 32 topics across three areas.
            Clinical medicine makes up around 80% of the exam. Evidence in
            practice and organisation/management each make up 10%. Every topic
            below has free question practice, deep structured explanations, and
            audio-first revision in AKT Navigator. For the section weighting
            and curriculum structure, read the{" "}
            <a
              href="/akt-syllabus"
              className="font-medium transition-colors"
              style={{ color: "var(--brand-violet-light)" }}
            >
              AKT syllabus guide
            </a>
            .
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
              AKT Navigator covers the full RCGP AKT curriculum: all 32 topic
              guides, 80% clinical medicine, 10% evidence-based practice and
              statistics, and 10% organisation and management. Use the topic
              list below to close weak areas before testing timing with mocks.
            </p>
          </div>
        </div>
      </section>

      <TopicGrid showHeader={false} />

      <section className="section-padding pt-0">
        <div className="container-x max-w-[720px]">
          <section className="mt-4">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT topics FAQs
            </h2>
            <div className="mt-5 grid gap-3">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
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
                    {faq.question}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.65]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="mt-12 rounded-xl p-4"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Official sources
            </h2>
            <p
              className="mt-3 text-[14px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              This page is independent of the RCGP. Topic structure and
              curriculum grouping are checked against public RCGP curriculum
              and topic-guide pages.
            </p>
            <div className="mt-4 grid gap-2">
              {sourceLinks.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl px-4 py-3 text-[13px] font-medium transition-colors hover:bg-white/[.05]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--fg-high)",
                  }}
                >
                  {source.label} &rarr;
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
