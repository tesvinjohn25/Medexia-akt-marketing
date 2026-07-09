import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { AiAnswerBox } from "@/components/sections/AiAnswerBox";
import { getOfferPhase, phased, type OfferPhase } from "@/lib/offer-phase";

export const metadata: Metadata = {
  title: "Best AKT Question Bank 2026 — Free Questions, Mocks & Audio",
  description:
    "Looking for the best MRCGP AKT question bank? AKT Navigator keeps 21,000+ AKT-style questions, timed mocks and structured explanations free, with optional 90+ hours of audio revision. No card required.",
  alternates: {
    canonical: "https://medexia-akt.com/best-akt-question-bank",
  },
  openGraph: {
    title: "Best AKT Question Bank 2026 — Free Questions, Mocks & Audio",
    description:
      "AKT Navigator keeps 21,000+ AKT questions, timed mocks and explanations free for GP trainees, with full 90+ hour audio revision as the optional upgrade.",
    type: "article",
    url: "https://medexia-akt.com/best-akt-question-bank",
  },
};

const LAST_CHECKED = "June 2026";

interface QuestionBank {
  name: string;
  questions: string;
  audio: string;
  reviewTools: string;
  explanations: string;
  mockExams: string;
  price: string;
  highlight?: boolean;
}

const getQuestionBanks = (phase: OfferPhase): QuestionBank[] => [
  {
    name: "AKT Navigator",
    questions: "Free",
    audio: "90+ hours",
    reviewTools: "Adaptive review",
    explanations: "Structured · NICE/CKS/BNF-aligned",
    mockExams: "Included",
    price: phased(
      phase,
      "Free questions; £59 Early Access",
      "Free questions; £79 full audio",
    ),
    highlight: true,
  },
  {
    name: "PassMedicine",
    questions: "~4,500",
    audio: "No",
    reviewTools: "Basic tracking",
    explanations: "Yes",
    mockExams: "Limited",
    price: "£35 / 4 months",
  },
  {
    name: "Pastest",
    questions: "3,300+",
    audio: "No",
    reviewTools: "Performance data",
    explanations: "Thorough",
    mockExams: "Yes",
    price: "£95–£180",
  },
  {
    name: "BMJ OnExamination",
    questions: "2,455",
    audio: "No",
    reviewTools: "Basic tracking",
    explanations: "Yes",
    mockExams: "Yes",
    price: "From £44.99",
  },
  {
    name: "i-Medics",
    questions: "~3,000",
    audio: "No",
    reviewTools: "Basic",
    explanations: "Yes",
    mockExams: "Limited",
    price: "Free",
  },
  {
    name: "RCGP GP SelfTest",
    questions: "Official cases",
    audio: "No",
    reviewTools: "Topic tests",
    explanations: "Yes",
    mockExams: "Practice tests",
    price: "Free for RCGP members",
  },
];

const sourceLinks = [
  {
    href: "https://www.passmedicine.com/akt/index.php",
    label: "PassMedicine: AKT question bank",
  },
  {
    href: "https://www.pastest.com/products/mrcgp-akt",
    label: "Pastest: MRCGP AKT",
  },
  {
    href: "https://www.onexamination.com/",
    label: "BMJ OnExamination: MRCGP AKT",
  },
  {
    href: "https://i-medics.co.uk/AKTcombined",
    label: "i-Medics: MRCGP AKT",
  },
  {
    href: "https://www.rcgp.org.uk/learning-resources/gp-selftest",
    label: "RCGP: GP SelfTest",
  },
];

const comparisonFaqs = [
  {
    question: "What is the best AKT question bank?",
    answer:
      "There is no single best AKT question bank for every GP trainee. PassMedicine is a familiar low-cost option, Pastest and BMJ OnExamination offer established paid banks, GP SelfTest is the official RCGP practice resource for members, and AKT Navigator is strongest if you want free-forever question practice, timed mocks and structured explanations alongside a 90+ hour audio-first revision system.",
  },
  {
    question: "Which AKT question bank is best for audio revision?",
    answer:
      "AKT Navigator is the audio-first option in this comparison. It combines free AKT question practice with a 90+ hour audio revision library for GP trainees who need to revise while commuting, walking, doing childcare or recovering after clinic.",
  },
  {
    question: "Can I use AKT Navigator with PassMedicine or GP SelfTest?",
    answer:
      "Yes. Many trainees use more than one resource. PassMedicine or GP SelfTest can provide extra question exposure, while AKT Navigator adds free syllabus-mapped practice, mocks and audio-supported revision for times when screen-based questions are unrealistic.",
  },
  {
    question: "Are free AKT questions enough?",
    answer:
      "Free AKT questions can be enough for question exposure if you use them actively, review mistakes and practise timing. Most trainees also need a plan for weak areas, statistics, prescribing and repeated review. AKT Navigator keeps questions free and uses the paid tier for full audio access.",
  },
  {
    question: "What is different about AKT Navigator?",
    answer:
      "AKT Navigator is not positioned as another paid question bank. It is an audio-first AKT revision platform with free-forever question practice, timed mocks and structured explanations. The full 90+ hour audio library helps trainees keep revising when reading at a screen is not realistic.",
  },
  {
    question: "Is AKT Navigator a paid question bank?",
    answer:
      "No. AKT Navigator keeps question practice free. The paid part is full access to the 90+ hour AKT audiobook library and included premium audio-related resources.",
  },
  {
    question: "Should I choose AKT Navigator or PassMedicine?",
    answer:
      "Choose PassMedicine if you mainly want a familiar screen-based question bank. Choose AKT Navigator if you want free question practice alongside audio revision for commutes, walks, childcare and low-energy revision time.",
  },
  {
    question: "Do I still need audio revision if I already have a question bank?",
    answer:
      "Audio revision is useful when your limiting factor is time or energy rather than access to questions. It lets you keep covering the AKT syllabus during moments where reading or doing questions is unrealistic.",
  },
];

export default function BestAktQuestionBankPage() {
  const phase = getOfferPhase();
  const questionBanks = getQuestionBanks(phase);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "Best AKT Question Bank 2026 — Free & Paid Options Compared",
        description:
          "Comparison of AKT question banks and audio-first revision options for GP trainees preparing for the MRCGP AKT.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-03-25",
        dateModified: "2026-06-25",
      },
      {
        "@type": "FAQPage",
        mainEntity: comparisonFaqs.map((faq) => ({
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
            name: "Best AKT Question Bank",
            url: "https://medexia-akt.com/best-akt-question-bank",
          },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[820px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Best AKT question bank 2026
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Most AKT resources are built around screen-based question practice.
            That matters, but it is not the whole revision problem. GP trainees
            also need a way to cover the syllabus during commutes, walks,
            childcare and low-energy days when reading is not realistic.
          </p>

          <p
            className="mt-3 text-[16px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            We built AKT Navigator, so read this comparison with that context.
            The point is still straightforward: if you only want another paid
            question bank, there are established options. If you want free
            question practice, timed mocks and structured explanations alongside
            an audio-first AKT revision system, AKT Navigator is the different
            choice.
          </p>

          <AiAnswerBox
            eyebrow="Question bank comparison"
            title="Short answer"
            answer={
              <p>
                AKT Navigator is not a paid question bank. It is an
                audio-first AKT revision platform with free-forever question
                practice, timed mocks and structured explanations. Use it if
                your bigger problem is covering the syllabus around real life;
                use a conventional bank if you mainly want more screen-based
                questions.
              </p>
            }
            bestFor={[
              "comparing AKT question banks fairly",
              "finding free AKT questions",
              "choosing between question-only and audio-supported revision",
              "GP trainees revising around clinics, commuting, childcare or fatigue",
            ]}
            nextSteps={[
              {
                label: "Start free practice",
                href: "/join/free",
                intent: "start_free",
              },
              { label: "Free AKT questions", href: "/free-akt-questions" },
              { label: "Best revision tool", href: "/best-akt-revision-tool" },
              { label: "Compare audio revision", href: "/akt-audio-revision" },
              { label: "Try AKT mocks", href: "/akt-mock-exam" },
            ]}
          />

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              The real problem is not finding more questions
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Most GP trainees can find questions. The harder problem is
              knowing what to revise next, covering the whole AKT around
              clinics and portfolio work, and still making progress when you
              are too tired to read.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              AKT Navigator keeps the practice layer free, then uses audio to
              help you keep moving through the syllabus in time that would
              otherwise be lost.
            </p>
          </section>

          {/* Comparison table */}
          <div
            className="mt-8 hidden overflow-x-auto rounded-xl md:block"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <table className="w-full text-[13px] md:text-[14px]">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {[
                    "Provider",
                    "Questions",
                    "Explanations",
                    "Audio",
                    "Review",
                    "Mocks",
                    "Price",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left p-3 font-semibold whitespace-nowrap"
                      style={{ color: "var(--fg-high)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ color: "var(--fg-mid)" }}>
                {questionBanks.map((bank) => (
                  <tr
                    key={bank.name}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      ...(bank.highlight
                        ? { background: "rgba(109,106,232,.04)" }
                        : {}),
                    }}
                  >
                    <td
                      className="p-3 font-semibold whitespace-nowrap"
                      style={
                        bank.highlight
                          ? { color: "var(--brand-iris)" }
                          : { color: "var(--fg-high)" }
                      }
                    >
                      {bank.name}
                    </td>
                    <td className="p-3">{bank.questions}</td>
                    <td className="p-3">{bank.explanations}</td>
                    <td className="p-3">{bank.audio}</td>
                    <td className="p-3">{bank.reviewTools}</td>
                    <td className="p-3">{bank.mockExams}</td>
                    <td className="p-3 whitespace-nowrap">{bank.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-3 md:hidden">
            {questionBanks.map((bank) => (
              <article
                key={bank.name}
                className="rounded-xl p-4"
                style={{
                  background: bank.highlight
                    ? "rgba(109,106,232,.08)"
                    : "var(--bg-surface)",
                  border: bank.highlight
                    ? "1px solid rgba(109,106,232,.28)"
                    : "1px solid var(--border)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3
                    className="text-[16px] font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: bank.highlight
                        ? "var(--brand-iris)"
                        : "var(--fg-high)",
                    }}
                  >
                    {bank.name}
                  </h3>
                  <span
                    className="shrink-0 text-right text-[13px] font-semibold"
                    style={{ color: "var(--fg-high)" }}
                  >
                    {bank.price}
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
                  {[
                    ["Questions", bank.questions],
                    ["Audio", bank.audio],
                    ["Explanations", bank.explanations],
                    ["Review", bank.reviewTools],
                    ["Mocks", bank.mockExams],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt
                        className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {label}
                      </dt>
                      <dd
                        className="mt-1 leading-[1.35]"
                        style={{ color: "var(--fg-mid)" }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <p
            className="mt-3 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            {phased(
              phase,
              "AKT Navigator questions remain free. Full audio Early Access is £59 before 8 July 2026 for access starting 8 July, then £79 for 4 months.",
              "AKT Navigator questions remain free. Full Audio Access is £79 for 4 months.",
            )}{" "}
            Prices and feature counts are sourced from provider websites, last
            checked {LAST_CHECKED}.
          </p>

          <section className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Who should choose AKT Navigator?
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <article
                className="rounded-xl p-4"
                style={{
                  background: "rgba(52,211,153,.06)",
                  border: "1px solid rgba(52,211,153,.16)",
                }}
              >
                <h3
                  className="text-[16px] font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Choose AKT Navigator if
                </h3>
                <ul
                  className="mt-3 space-y-2 text-[14px] leading-[1.6]"
                  style={{ color: "var(--fg-mid)" }}
                >
                  {[
                    "you want free questions, mocks and explanations",
                    "you want audio revision",
                    "you revise around clinics, commutes or childcare",
                    "you need a system to cover the syllabus",
                  ].map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>

              <article
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
                  Choose a conventional bank if
                </h3>
                <ul
                  className="mt-3 space-y-2 text-[14px] leading-[1.6]"
                  style={{ color: "var(--fg-mid)" }}
                >
                  {[
                    "you mainly want screen-based questions",
                    "you prefer a traditional question-bank workflow",
                    "you already have audio or syllabus coverage elsewhere",
                  ].map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          {/* Detailed breakdown */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              The detailed breakdown
            </h2>

            {/* PassMedicine */}
            <div className="mt-8">
              <h3
                className="text-[20px] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                PassMedicine
              </h3>
              <p
                className="mt-2 text-[16px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                PassMedicine is the question bank that most trainees have heard
                of. It lists around 4,500 AKT questions for £35 over four
                months. The main limitation is that it is still a screen-based
                question bank: useful for active recall, but less useful when
                you want to revise away from a desk.
              </p>
            </div>

            {/* Pastest */}
            <div className="mt-8">
              <h3
                className="text-[20px] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Pastest
              </h3>
              <p
                className="mt-2 text-[16px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                Pastest has been around for a long time and has a good
                reputation across medical exams, not just the AKT. Their MRCGP
                AKT product lists 3,300+ questions and costs between £95 and
                £180 depending on subscription length. It is a stronger fit if
                you want an established paid question bank and are comfortable
                with a higher price.
              </p>
            </div>

            {/* BMJ OnExamination */}
            <div className="mt-8">
              <h3
                className="text-[20px] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                BMJ OnExamination
              </h3>
              <p
                className="mt-2 text-[16px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                BMJ OnExamination lists 2,455 MRCGP AKT questions and starts
                from £44.99. It is another established screen-based bank with
                written explanations and mock-style practice. Like the other
                traditional banks, it does not solve the audio revision problem.
              </p>
            </div>

            {/* i-Medics */}
            <div className="mt-8">
              <h3
                className="text-[20px] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                i-Medics
              </h3>
              <p
                className="mt-2 text-[16px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                i-Medics offers around 3,000 free AKT questions. If you are on
                a tight budget, it is a reasonable supplement. It is best seen
                as extra question exposure rather than a complete audio-first
                revision system.
              </p>
            </div>

            {/* RCGP GP SelfTest */}
            <div className="mt-8">
              <h3
                className="text-[20px] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                RCGP GP SelfTest
              </h3>
              <p
                className="mt-2 text-[16px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                GP SelfTest is the official RCGP practice resource and is free
                for RCGP members. It is useful because it is directly connected
                to the College&apos;s learning ecosystem. The trade-off is that
                it is not designed as a 90-hour audio curriculum for covering
                the whole AKT while you are away from a screen.
              </p>
            </div>

            {/* AKT Navigator */}
            <div className="mt-8">
              <h3
                className="text-[20px] font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--brand-iris)",
                }}
              >
                AKT Navigator
              </h3>
              <p
                className="mt-2 text-[16px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                AKT Navigator is not positioned as another paid question bank.
                The questions stay free, and every answer is broken down into a
                deep structured explanation: understanding the question, key
                points for your AKT, and why the other options are wrong. You
                can{" "}
                <a
                  href="/demo"
                  className="font-medium transition-colors"
                  style={{ color: "var(--brand-violet-light)" }}
                >
                  judge the quality yourself in the free demo
                </a>
                . The main paid value is the 90+ hour AKT audiobook library
                across all 32 RCGP topics, plus the statistics course, over 2
                hours of statistics explainer videos, Dermatology Navigator and
                future premium audio upgrades during your access period.
              </p>
              <p
                className="mt-3 text-[16px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                {phased(
                  phase,
                  "The question bank remains free. Full audio access is separate: Early Access is £59 before 8 July 2026 for 4 months of access starting 8 July, then standard Full Audio Access is £79 for 4 months.",
                  "The question bank remains free. Full audio access is separate: Full Audio Access is £79 for 4 months.",
                )}{" "}
                AKT Navigator was built by a GP trainee who wanted
                something better than what was available, so it is designed
                around how trainees actually study: short sessions,
                on-the-go audio, and revision time that would otherwise be
                lost.
              </p>
            </div>
          </div>

          {/* Which should you choose */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              So which should you choose?
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              It depends on what problem you are trying to solve. If you only
              want a conventional question bank, PassMedicine, Pastest, BMJ
              OnExamination, i-Medics and GP SelfTest are all reasonable
              options. If you want free question practice plus a full audio
              syllabus you can use away from a screen, AKT Navigator is the
              clearer fit.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Many trainees use more than one. AKT Navigator&apos;s questions stay
              free, so there is no reason not to add the practice layer to
              whatever else you are using. The full audio library is there when
              commute and gym time would otherwise go to waste.
            </p>
          </div>

          {/* Internal links */}
          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Learn more
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  href: "/best-akt-revision-tool",
                  title: "Best AKT revision tool",
                  desc: "Choose between audio, questions, mocks and traditional banks",
                },
                {
                  href: "/how-to-pass-the-akt",
                  title: "How to pass the AKT",
                  desc: "Complete study guide with exam strategy",
                },
                {
                  href: "/akt-revision-plan",
                  title: "AKT revision plan",
                  desc: "12-week, 8-week and 4-week timetables",
                },
                {
                  href: "/akt-explanation-builder",
                  title: "Free AKT explanation builder",
                  desc: "Turn a pasted SBA into a structured teaching explanation",
                },
                {
                  href: "/free-akt-questions",
                  title: "Free AKT questions",
                  desc: "Free MRCGP AKT question bank with mocks and structured explanations",
                },
                {
                  href: "/akt-mock-exam",
                  title: "AKT mock exams",
                  desc: "Timed mocks from free AKT questions",
                },
                {
                  href: "/akt-audio-revision",
                  title: "AKT audio revision",
                  desc: "90+ hours across the AKT syllabus",
                },
                {
                  href: "/akt-exam-dates",
                  title: "AKT exam dates 2026",
                  desc: "July and October sittings with countdown",
                },
                {
                  href: "/akt-exam-format",
                  title: "AKT exam format",
                  desc: "160 questions, sections and pass-mark rules",
                },
                {
                  href: "/akt-exam-day",
                  title: "AKT exam day",
                  desc: "Pearson VUE, ID, timing and adjustments",
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
                  href: "/akt-consulting-in-general-practice",
                  title: "AKT consulting",
                  desc: "Consent, safety-netting and shared decisions",
                },
                {
                  href: "/akt-equality-diversity-inclusion",
                  title: "AKT inclusion",
                  desc: "Reasonable adjustments and access barriers",
                },
                {
                  href: "/akt-leadership-management",
                  title: "AKT leadership",
                  desc: "Teams, concerns, complaints and systems",
                },
                {
                  href: "/akt-genomic-medicine",
                  title: "AKT genomics",
                  desc: "Family history, testing and cancer risk",
                },
                {
                  href: "/akt-statistics",
                  title: "AKT statistics",
                  desc: "Evidence-based practice and key formulas",
                },
                {
                  href: "/akt-evidence-in-practice",
                  title: "AKT evidence",
                  desc: "Critical appraisal and risk communication",
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
                  href: "/akt-continuity-quality-safety-prescribing",
                  title: "AKT continuity safety",
                  desc: "Continuity, governance and prescribing systems",
                },
                {
                  href: "/akt-continuity-quality-safety",
                  title: "AKT quality safety",
                  desc: "QI, audit and patient-safety systems",
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
                  href: "/akt-population-planetary-health",
                  title: "AKT population health",
                  desc: "Screening, immunisation and planetary health",
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

          {/* Source links */}
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
              Provider sources
            </h2>
            <p
              className="mt-3 text-[14px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Comparison data is taken from public provider pages. Pricing and
              question counts can change, so check the provider before buying.
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
              AKT question bank FAQ
            </h2>
            <div className="mt-4 grid gap-3">
              {comparisonFaqs.map((faq) => (
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
              Try free questions &rarr;
            </TrackedAppLink>
          </div>

          {/* Trust signal */}
          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Prices and features sourced from provider websites. Last checked{" "}
            {LAST_CHECKED}. AKT Navigator is built by Medexia.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
