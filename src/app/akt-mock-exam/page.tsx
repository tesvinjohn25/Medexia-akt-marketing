import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "AKT Mock Exam — Free Timed Mocks with AI Debriefs",
  description:
    "Generate free AKT mock exams from syllabus-mapped questions. Choose 40, 80 or 160 questions with timed practice and AI debriefs.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-mock-exam",
  },
  openGraph: {
    title: "AKT Mock Exam — Free Practice Mocks",
    description:
      "Generate free AKT mock exams covering every syllabus topic. Timed conditions, AI debriefs, and performance analysis.",
    type: "website",
    url: "https://medexia-akt.com/akt-mock-exam",
  },
};

export default function AktMockExamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AKT Mock Exams by AKT Navigator",
    description:
      "Free mock AKT exams from a question bank covering every syllabus topic. Timed to match real RCGP AKT conditions.",
    provider: {
      "@type": "Organization",
      name: "Medexia",
      url: "https://medexia-akt.com",
    },
    isAccessibleForFree: true,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            AKT Mock Exams
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Generate mock exams from a free question bank covering every
            syllabus topic. Choose your length, sit it under timed conditions,
            and get an AI-powered debrief that spots patterns you cannot see
            yourself.
          </p>

          {/* Key stats */}
          <div className="mt-8 grid gap-4 grid-cols-3">
            {[
              { stat: "21k+", label: "Questions" },
              { stat: "Mocks", label: "Basic practice" },
              { stat: "Free", label: "For April & July" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-[24px] font-bold"
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

          {/* AI debrief */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AI-powered debrief
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              After each mock, AKT Navigator analyses your performance and picks
              up things you would miss reviewing your own answers:
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

          {/* Chat with AI */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Dig deeper with the AI supervisor
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              After your debrief, you can chat with AKT Navigator about any part
              of your performance. Ask it to explain a topic you found difficult,
              walk through a question you got wrong, or help you build a study
              plan based on your gaps. It is like having a senior GP available
              whenever you need them.
            </p>
          </div>

          {/* Why unlimited matters */}
          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Why unlimited mocks matter
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Most question banks give you a fixed set of questions that you
              cycle through. AKT Navigator&apos;s bank is deep enough to
              generate genuinely fresh mocks every time. You will not run out
              of new questions before the exam, and every mock tests a
              different combination of topics and difficulty levels.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              className="btn-primary inline-block text-[16px]"
              href="https://app.medexia-akt.com"
            >
              Generate your first mock free &rarr;
            </a>
          </div>

          {/* Trust signal */}
          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Questions aligned to NICE CKS and the RCGP curriculum. Last reviewed
            March 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
