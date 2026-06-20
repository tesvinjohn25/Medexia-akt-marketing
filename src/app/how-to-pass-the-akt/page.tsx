import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { aktTopics } from "@/data/akt-topics";
import { EXAM_FORMAT } from "@/data/exam-dates";

export const metadata: Metadata = {
  title: "How to Pass the AKT — Study Guide for GP Trainees (2026)",
  description:
    "How to pass the MRCGP AKT: exam format, pass rate, study strategy, common mistakes, topic breakdown and free revision resources.",
  alternates: {
    canonical: "https://medexia-akt.com/how-to-pass-the-akt",
  },
  openGraph: {
    title: "How to Pass the AKT — Complete Study Guide",
    description:
      "Everything GP trainees need to know about passing the RCGP AKT: format, strategy, topic coverage, and free resources.",
    type: "article",
    url: "https://medexia-akt.com/how-to-pass-the-akt",
  },
};

export default function HowToPassTheAktPage() {
  const clinical = aktTopics.filter((t) => t.category === "Clinical");
  const professional = aktTopics.filter((t) => t.category === "Professional");
  const lifeStages = aktTopics.filter((t) => t.category === "Life Stages");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "How to Pass the AKT — Study Guide for GP Trainees",
        description:
          "Complete guide to passing the RCGP Applied Knowledge Test, covering format, study strategy, topic breakdown, and free revision resources.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-03-25",
        dateModified: "2026-06-19",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How long should I revise for the AKT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most trainees start 3 to 6 months before the exam and revise a few evenings a week. Consistent short sessions are more effective than cramming. AKT Navigator sessions take 15 to 20 minutes with 10 questions picked for your weak areas.",
            },
          },
          {
            "@type": "Question",
            name: "What is the AKT pass rate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The pass rate changes each sitting. Official RCGP feedback reports show 80.22% of all candidates passed in April 2026, 76.52% passed in January 2026, and 70.63% passed in October 2025. The pass marks were 107, 108 and 109 out of 160 respectively.",
            },
          },
          {
            "@type": "Question",
            name: "What are the most common mistakes in the AKT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Running out of time (the new 160-question format gives just 1 minute per question), neglecting evidence-based practice and statistics topics, and not doing enough full-length mock exams under timed conditions.",
            },
          },
        ],
      },
    ],
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
            How to Pass the AKT
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The RCGP Applied Knowledge Test is one of the three components of
            the MRCGP exam. It tests your clinical knowledge, evidence-based
            practice, and understanding of professional and organisational
            topics. This guide covers everything you need to know to prepare
            effectively.
          </p>

          {/* The exam at a glance */}
          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              The exam at a glance
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Questions", value: `${EXAM_FORMAT.questions}` },
                { label: "Duration", value: EXAM_FORMAT.durationLabel },
                { label: "Pass rate", value: EXAM_FORMAT.passRate },
                { label: "Pass mark", value: EXAM_FORMAT.passMark },
                {
                  label: "Negative marking",
                  value: EXAM_FORMAT.negativeMarking ? "Yes" : "No",
                },
                { label: "Eligibility", value: "ST2 / ST3" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center rounded-xl p-3"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="text-[14px]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-[14px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Since October 2025, the AKT has {EXAM_FORMAT.questions} questions
              in {EXAM_FORMAT.durationLabel}. That is one minute per question
              with no negative marking. The exam is computer-based and sat at a
              Pearson VUE test centre. See the{" "}
              <a
                href="/akt-exam-format"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                current AKT exam format
              </a>{" "}
              for section weighting and marking, then check the{" "}
              <a
                href="/akt-exam-dates"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                current exam dates
              </a>{" "}
              for booking windows and sitting dates, then build your{" "}
              <a
                href="/akt-revision-plan"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT revision plan
              </a>{" "}
              around that sitting.
            </p>
          </div>

          {/* How long to revise */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              How long should you revise?
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Most trainees start 3 to 6 months before the exam. The key is
              consistency rather than volume. A few focused sessions each week
              will do more for your retention than a weekend of cramming. If you
              are working full time (and almost every GP trainee is), plan for 3
              to 5 sessions of 15 to 30 minutes per week.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              AKT Navigator sessions are 15 to 20 minutes with 10 questions
              picked for your weak areas. The algorithm handles the planning so
              you just open the app and start. You can also use the{" "}
              <a
                href="/akt-audio-revision"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                90+ hours of audio revision
              </a>{" "}
              during your commute, gym sessions, or any time you are away from a
              screen.
            </p>
          </div>

          {/* Study strategy */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Study strategy that works
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The biggest mistake trainees make is doing thousands of random
              questions without a strategy. Targeted revision, where you focus on
              your weak areas, is far more effective. Here is what works:
            </p>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "1. Start with a baseline",
                  text: "Take a full-length mock exam under timed conditions before you start revising. It shows you where you stand and which topics need the most work.",
                },
                {
                  title: "2. Focus on your weak areas",
                  text: "Spend more time on topics you scored lowest on. This sounds obvious, but many trainees default to revising what they already know because it feels productive.",
                },
                {
                  title: "3. Do questions, not just reading",
                  text: "Active recall (answering questions) is more effective than passive reading. Use a question bank as your primary revision tool, with textbooks and guidelines for reference.",
                },
                {
                  title: "4. Do not neglect the non-clinical topics",
                  text: "Evidence-based practice and organisational topics make up 20% of the AKT. Many trainees skip them because they feel less interesting. That is 32 questions on the exam.",
                },
                {
                  title: "5. Practice under timed conditions",
                  text: "The new 160-question format gives you one minute per question. Many trainees report feeling rushed. Regular timed mocks build the speed you need.",
                },
                {
                  title: "6. Review your mistakes properly",
                  text: "When you get a question wrong, read the full explanation. Understand why the correct answer is correct, not just what it is. This is where the real learning happens.",
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

          {/* Common mistakes */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Common mistakes
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              These are the pitfalls that trip up trainees who know their
              clinical medicine but still struggle on exam day:
            </p>
            <ul
              className="mt-3 space-y-2 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              <li>
                <strong style={{ color: "var(--fg-high)" }}>
                  Running out of time.
                </strong>{" "}
                One minute per question means you cannot deliberate. If you are
                unsure, make your best guess and move on. There is no negative
                marking.
              </li>
              <li>
                <strong style={{ color: "var(--fg-high)" }}>
                  Ignoring drug side effects.
                </strong>{" "}
                A recurring theme in AKT questions. Know the common side effects
                of SSRIs, statins, ACE inhibitors, and antiepileptics.
              </li>
              <li>
                <strong style={{ color: "var(--fg-high)" }}>
                  Skipping statistics.
                </strong>{" "}
                Sensitivity, specificity, NNT, and study design questions are
                free marks if you learn the formulas. Most trainees avoid them.
              </li>
              <li>
                <strong style={{ color: "var(--fg-high)" }}>
                  Not doing enough mocks.
                </strong>{" "}
                A single mock is not enough. You need repeated practice to build
                the pacing and stamina the real exam demands. AKT Navigator lets
                you{" "}
                <a
                  href="/akt-mock-exam"
                  className="font-medium transition-colors"
                  style={{ color: "var(--brand-violet-light)" }}
                >
                  generate unlimited mocks
                </a>{" "}
                from a bank of thousands of questions.
              </li>
            </ul>
          </div>

          {/* Topic breakdown */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              The 32 AKT topics
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The AKT curriculum spans 32 topics. Around 80% of questions are
              clinical medicine (including life stages such as children, older
              adults, and end of life), 10% cover evidence-based practice and
              statistics, and 10% cover organisational and professional topics.
            </p>

            {[
              {
                label: `Clinical (${clinical.length} topics)`,
                topics: clinical,
              },
              {
                label: `Professional (${professional.length} topics)`,
                topics: professional,
              },
              {
                label: `Life Stages (${lifeStages.length} topics)`,
                topics: lifeStages,
              },
            ].map((group) => (
              <div key={group.label} className="mt-6">
                <h3
                  className="text-[13px] tracking-[0.18em] uppercase font-semibold mb-2"
                  style={{ color: "rgba(167,139,250,.85)" }}
                >
                  {group.label}
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {group.topics.map((topic) => (
                    <a
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="block rounded-lg p-3 transition-colors hover:bg-white/[.03]"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <span
                        className="text-[14px] font-medium"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {topic.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* How to know you're ready */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              How to know you are ready
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Take a full 160-question mock under timed conditions. If you are
              consistently scoring above 75% and finishing with time to spare,
              you are in a good position. Pay attention to the debrief: if you
              are still getting entire topics wrong or showing fatigue patterns,
              there is more work to do.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              AKT Navigator&apos;s{" "}
              <a
                href="/akt-mock-exam"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AI-powered mock debriefs
              </a>{" "}
              catch patterns you cannot see yourself, like confidently-wrong
              topics and time management issues.
            </p>
          </div>

          {/* Resources */}
          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Revision resources
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  href: "/akt-mock-exam",
                  title: "Mock exams",
                  desc: "Mocks from thousands of free questions with AI debriefs",
                },
                {
                  href: "/akt-audio-revision",
                  title: "Audio revision",
                  desc: "90+ hours across all 32 topics, from £59",
                },
                {
                  href: "/best-akt-question-bank",
                  title: "Question bank comparison",
                  desc: "How AKT Navigator compares to PassMedicine, Pastest, and others",
                },
                {
                  href: "/akt-exam-dates",
                  title: "Exam dates 2026",
                  desc: "July and October sittings with booking windows",
                },
                {
                  href: "/akt-exam-format",
                  title: "AKT exam format",
                  desc: "160 questions, timing, sections and marking",
                },
                {
                  href: "/akt-exam-day",
                  title: "AKT exam day",
                  desc: "Pearson VUE, ID, timing and adjustments",
                },
                {
                  href: "/akt-revision-plan",
                  title: "AKT revision plan",
                  desc: "12-week, 8-week and 4-week timetables",
                },
                {
                  href: "/akt-exam-fee",
                  title: "AKT exam fee",
                  desc: "Fee, booking, eligibility and attempts",
                },
                {
                  href: "/akt-pass-rate",
                  title: "AKT pass rate",
                  desc: "Recent official pass rates and pass marks",
                },
                {
                  href: "/akt-results-and-retakes",
                  title: "AKT results and retakes",
                  desc: "Score reports, appeals and next-attempt planning",
                },
                {
                  href: "/akt-feedback-reports",
                  title: "AKT feedback reports",
                  desc: "Latest weak areas from official reports",
                },
                {
                  href: "/akt-statistics",
                  title: "AKT statistics",
                  desc: "Evidence-based practice and key formulas",
                },
                {
                  href: "/akt-statistics-formulas",
                  title: "AKT statistics formulas",
                  desc: "NNT, NNH, sensitivity, specificity, PPV and NPV",
                },
                {
                  href: "/akt-prescribing-and-medication-safety",
                  title: "AKT prescribing",
                  desc: "Medication monitoring, errors and safety themes",
                },
                {
                  href: "/akt-confidentiality-safeguarding-data-protection",
                  title: "AKT confidentiality",
                  desc: "Safeguarding, records and data protection",
                },
                {
                  href: "/akt-neurology",
                  title: "AKT neurology",
                  desc: "Gait, headache red flags and seizures",
                },
                {
                  href: "/akt-children-young-people",
                  title: "AKT children",
                  desc: "Acute illness, cancer red flags and safeguarding",
                },
                {
                  href: "/akt-dermatology",
                  title: "AKT dermatology",
                  desc: "Rashes, skin cancer and image-led revision",
                },
                {
                  href: "/akt-cardiovascular",
                  title: "AKT cardiovascular",
                  desc: "AF, hypertension and heart failure",
                },
                {
                  href: "/akt-respiratory",
                  title: "AKT respiratory",
                  desc: "Asthma, COPD, inhalers and red flags",
                },
                {
                  href: "/akt-diabetes-endocrinology",
                  title: "AKT diabetes",
                  desc: "Diabetes, thyroid tests and sick-day rules",
                },
                {
                  href: "/akt-renal-urology",
                  title: "AKT renal",
                  desc: "CKD, UTI, haematuria and stones",
                },
                {
                  href: "/akt-musculoskeletal",
                  title: "AKT musculoskeletal",
                  desc: "Back pain, arthritis and osteoporosis",
                },
                {
                  href: "/akt-gastroenterology",
                  title: "AKT gastroenterology",
                  desc: "IBS, IBD, coeliac and red flags",
                },
                {
                  href: "/akt-ent-speech-hearing",
                  title: "AKT ENT",
                  desc: "Otitis, hearing loss and vertigo",
                },
                {
                  href: "/akt-eyes-vision",
                  title: "AKT eyes",
                  desc: "Red eye, visual loss and glaucoma",
                },
                {
                  href: "/akt-haematology",
                  title: "AKT haematology",
                  desc: "Anaemia, VTE and anticoagulation",
                },
                {
                  href: "/akt-allergy-immunology",
                  title: "AKT allergy",
                  desc: "Anaphylaxis, food and drug allergy",
                },
                {
                  href: "/akt-infectious-diseases-travel",
                  title: "AKT infections",
                  desc: "HIV, hepatitis and travel health",
                },
                {
                  href: "/akt-minor-illness-urgent-care",
                  title: "AKT minor illness",
                  desc: "Sepsis, delayed antibiotics and safety-netting",
                },
                {
                  href: "/akt-urgent-unscheduled-care",
                  title: "AKT urgent care",
                  desc: "Sepsis, NEWS2 and emergency escalation",
                },
                {
                  href: "/akt-smoking-alcohol-substance-misuse",
                  title: "AKT substance misuse",
                  desc: "Smoking, alcohol and opioid dependence",
                },
                {
                  href: "/akt-mental-health",
                  title: "AKT mental health",
                  desc: "Depression, suicide risk and SSRI prescribing",
                },
                {
                  href: "/akt-womens-health",
                  title: "AKT women's health",
                  desc: "Contraception, HRT and bleeding red flags",
                },
                {
                  href: "/akt-maternity-reproductive-health",
                  title: "AKT maternity",
                  desc: "Pregnancy, postnatal care and red flags",
                },
                {
                  href: "/akt-sexual-health",
                  title: "AKT sexual health",
                  desc: "STIs, HIV testing and safeguarding",
                },
                {
                  href: "/akt-older-adults",
                  title: "AKT older adults",
                  desc: "Frailty, falls and dementia",
                },
                {
                  href: "/akt-long-term-conditions-cancer",
                  title: "AKT long-term conditions",
                  desc: "Cancer red flags and multimorbidity",
                },
                {
                  href: "/akt-end-of-life",
                  title: "AKT end of life",
                  desc: "Palliative care, DNACPR and capacity",
                },
                {
                  href: "/akt-learning-disability",
                  title: "AKT learning disability",
                  desc: "Health checks and diagnostic overshadowing",
                },
                {
                  href: "/akt-neurodevelopmental-neurodiversity",
                  title: "AKT neurodiversity",
                  desc: "ADHD, autism and medication monitoring",
                },
                {
                  href: "/akt-syllabus",
                  title: "AKT syllabus",
                  desc: "80/10/10 weighting and all 32 RCGP topics",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl p-4 transition-colors hover:bg-white/[.03]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.title}
                  </h3>
                  <p
                    className="mt-1 text-[13px]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {link.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              className="btn-primary inline-block text-[16px]"
              href="https://app.medexia-akt.com"
            >
              Start revising free &rarr;
            </a>
          </div>

          {/* Trust signal */}
          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Content aligned to NICE CKS and the RCGP curriculum. Written by a GP
            trainee. Last reviewed March 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
