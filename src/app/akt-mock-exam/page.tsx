import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { AiAnswerBox } from "@/components/sections/AiAnswerBox";

export const metadata: Metadata = {
  title: "AKT Mock Exam — Free Timed MRCGP AKT Practice",
  description:
    "Generate free MRCGP AKT mock exams from syllabus-mapped questions. Choose 40, 80 or 160 questions for timed practice across the full AKT curriculum.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-mock-exam",
  },
  openGraph: {
    title: "AKT Mock Exam — Free Timed MRCGP AKT Practice",
    description:
      "Generate free AKT mock exams covering every syllabus topic. Timed 40, 80 or 160-question practice mapped to the RCGP AKT curriculum.",
    type: "website",
    url: "https://medexia-akt.com/akt-mock-exam",
  },
};

const sourceLinks = [
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-introduction",
    label: "RCGP: Introducing the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-preparing",
    label: "RCGP: Preparing for the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/getmedia/d22734f1-a57c-4486-a0bd-e319b1172a89/2025-AKT-standard-setting-maintenance-faqs.pdf",
    label: "RCGP AKT standard setting FAQs",
  },
  {
    href: "https://www.pearsonvue.com/us/en/rcgp.html",
    label: "Pearson VUE RCGP test centre information",
  },
];

const mockFaqs = [
  {
    question: "Can I generate free AKT mock exams?",
    answer:
      "Yes. AKT Navigator lets you generate free AKT mock exams from syllabus-mapped questions, with 40, 80 or 160-question practice options.",
  },
  {
    question: "How long is a full AKT mock exam?",
    answer:
      "From October 2025, the RCGP AKT format is 160 single-best-answer questions in 2 hours 40 minutes, so a full AKT Navigator mock uses 160 questions and a 160-minute timing target.",
  },
  {
    question: "How often should I do AKT mocks?",
    answer:
      "Early in revision, use a mock or shorter diagnostic to find weak areas. In the final month, regular timed mocks are useful if you review mistakes properly and do not use them as passive score checks.",
  },
  {
    question: "Should I do mocks before I finish the syllabus?",
    answer:
      "Yes. A baseline mock before finishing the syllabus can feel uncomfortable, but it shows what to revise next. Use early mocks diagnostically, then move to full timed mocks as the exam gets closer.",
  },
  {
    question: "Are AKT mock exams enough on their own?",
    answer:
      "No. Mock exams are best used with topic review. Sit mocks to find weak areas, then revise the relevant topic guide, explanations and audio before retesting.",
  },
  {
    question: "Is there negative marking in the AKT?",
    answer:
      "No. RCGP standard-setting guidance says there is no negative marking in the AKT, so timed mocks should train you to answer every question rather than leaving blanks.",
  },
];

export default function AktMockExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: "AKT Mock Exams by AKT Navigator",
        description:
          "Free mock AKT exams from syllabus-mapped questions covering every RCGP AKT curriculum topic, with 40, 80 and 160-question timed practice.",
        provider: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        mainEntity: mockFaqs.map((faq) => ({
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
            name: "AKT Mock Exam",
            url: "https://medexia-akt.com/akt-mock-exam",
          },
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
            AKT mock exams
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Generate mock exams from a free question bank covering every
            syllabus topic. Choose your length, sit it under timed conditions,
            and use the debrief to identify weak topics before the real exam.
          </p>

          <AiAnswerBox
            eyebrow="Timed mock practice"
            title="Short answer"
            answer={
              <p>
                Yes. You can use AKT Navigator to generate free timed AKT mock
                exams. Mocks are most useful when you review mistakes afterwards
                and use the result to choose what to revise next. A full mock
                should mirror the current format: 160 questions in 2 hours 40
                minutes.
              </p>
            }
            bestFor={[
              "pacing practice",
              "exam readiness checks",
              "weak-area detection",
              "final-month revision",
            ]}
            nextSteps={[
              {
                label: "Generate your first mock",
                href: "/join/free",
                intent: "start_free",
              },
              { label: "Read the revision plan", href: "/akt-revision-plan" },
              { label: "Revise statistics", href: "/akt-statistics" },
              { label: "Compare revision tools", href: "/best-akt-revision-tool" },
            ]}
          />

          {/* Key stats */}
          <div className="mt-8 grid gap-4 grid-cols-3">
            {[
              { stat: "160", label: "Full mock" },
              { stat: "2h 40m", label: "Timed format" },
              { stat: "Free", label: "Questions stay free" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl px-3 py-4 text-center md:p-4"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="whitespace-nowrap text-[22px] font-bold md:text-[24px]"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--brand-iris)",
                  }}
                >
                  {item.stat}
                </div>
                <div
                  className="text-[12px] mt-1"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Choose your length */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Choose your exam length
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Not every revision session needs a full mock. AKT Navigator lets
              you pick how many questions you want:
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                {
                  count: "40 questions",
                  time: "~40 min",
                  desc: "Quick confidence check. Good for lunchtime revision.",
                },
                {
                  count: "80 questions",
                  time: "~80 min",
                  desc: "Half-length mock. Tests stamina without the full time commitment.",
                },
                {
                  count: "160 questions",
                  time: "2h 40m",
                  desc: "Full AKT simulation. Matches the real exam exactly.",
                },
              ].map((item) => (
                <div
                  key={item.count}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="text-[16px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.count}
                  </div>
                  <div
                    className="text-[13px] mt-0.5"
                    style={{ color: "var(--brand-iris)" }}
                  >
                    {item.time}
                  </div>
                  <p
                    className="mt-2 text-[13px] leading-[1.5]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Debrief */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Debrief after each mock
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              After each mock, AKT Navigator analyses your performance and
              highlights patterns that are easy to miss when you review your
              own answers:
            </p>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "Fatigue detection",
                  text: "Are you getting more questions wrong towards the end of the exam? The debrief picks up on performance drop-off and shows you exactly where it starts.",
                },
                {
                  title: "Timing analysis",
                  text: "Spending too long on certain question types? The debrief tracks time per question and flags where you are losing minutes that could be spent elsewhere.",
                },
                {
                  title: "Confidently wrong",
                  text: "The most dangerous pattern in any exam: topics where you feel confident but are actually getting questions wrong. The debrief highlights these blind spots.",
                },
                {
                  title: "Topic gap analysis",
                  text: "See your performance broken down by all 32 AKT topics. Find out which areas need the most work before the real exam.",
                },
              ].map((item) => (
                <div
                  key={item.title}
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
                    {item.title}
                  </h3>
                  <p
                    className="mt-1 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Turn a mock into a revision plan
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              After your debrief, use the weak-topic breakdown to decide what
              to revise next. Pair the mock with topic explanations and audio
              revision so you are not only measuring performance, but improving
              the areas that cost marks.
            </p>
          </div>

          {/* Why repeat mocks matter */}
          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Why repeat mocks matter
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              One mock tells you how you performed on one day. Repeating mocks
              shows whether timing, fatigue and topic gaps are improving. Use a
              full 160-question mock for exam stamina, and shorter mocks when
              you want a focused check without losing a whole evening.
            </p>
          </div>

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
              AKT Navigator is independent of the RCGP. Mock timing and
              revision guidance are aligned to public RCGP AKT information,
              RCGP preparation resources and Pearson VUE test-centre guidance.
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

          <section className="mt-12">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT mock exam FAQ
            </h2>
            <div className="mt-4 grid gap-3">
              {mockFaqs.map((faq) => (
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

          {/* CTA */}
          <div className="mt-10">
            <TrackedAppLink
              className="btn-primary inline-block text-[16px]"
              href="/join/free"
              intent="start_free"
            >
              Generate your first mock free &rarr;
            </TrackedAppLink>
          </div>

          {/* Trust signal */}
          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Questions aligned to NICE CKS and the RCGP curriculum. Last reviewed
            June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
