import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title:
    "Best AKT Question Bank 2026 — Free & Paid Options Compared",
  description:
    "Honest comparison of AKT question banks for GP trainees: PassMedicine, Pastest, BMJ OnExamination, i-Medics, and AKT Navigator. Features, prices, question counts, and what actually helps you pass.",
  alternates: {
    canonical: "https://medexia-akt.com/best-akt-question-bank",
  },
  openGraph: {
    title: "Best AKT Question Bank 2026 — Honest Comparison",
    description:
      "PassMedicine vs Pastest vs BMJ OnExamination vs AKT Navigator. An honest feature-by-feature comparison for GP trainees.",
    type: "article",
    url: "https://medexia-akt.com/best-akt-question-bank",
  },
};

const LAST_CHECKED = "March 2026";

interface QuestionBank {
  name: string;
  questions: string;
  audio: string;
  adaptiveLearning: string;
  mockExams: string;
  aiDebrief: string;
  price: string;
  highlight?: boolean;
}

const questionBanks: QuestionBank[] = [
  {
    name: "AKT Navigator",
    questions: "21,000+",
    audio: "90+ hours",
    adaptiveLearning: "Yes",
    mockExams: "Included",
    aiDebrief: "Yes",
    price: "Free questions; audio from £59",
    highlight: true,
  },
  {
    name: "PassMedicine",
    questions: "~3,500",
    audio: "No",
    adaptiveLearning: "Basic",
    mockExams: "Limited",
    aiDebrief: "No",
    price: "~£35 / 4 months",
  },
  {
    name: "Pastest",
    questions: "~2,500",
    audio: "No",
    adaptiveLearning: "No",
    mockExams: "Yes",
    aiDebrief: "No",
    price: "£95–£180",
  },
  {
    name: "BMJ OnExamination",
    questions: "~1,200",
    audio: "No",
    adaptiveLearning: "Basic",
    mockExams: "Yes",
    aiDebrief: "No",
    price: "~£50 / 6 months",
  },
  {
    name: "i-Medics",
    questions: "~3,000",
    audio: "No",
    adaptiveLearning: "No",
    mockExams: "Limited",
    aiDebrief: "No",
    price: "Free",
  },
];

export default function BestAktQuestionBankPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best AKT Question Bank 2026 — Free & Paid Options Compared",
    description:
      "Honest comparison of AKT question banks for GP trainees preparing for the MRCGP AKT.",
    author: {
      "@type": "Organization",
      name: "Medexia",
      url: "https://medexia-akt.com",
    },
    datePublished: "2026-03-25",
    dateModified: "2026-03-25",
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
        <div className="container-x max-w-[820px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            Best AKT Question Bank 2026
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Every GP trainee preparing for the AKT faces the same question:
            which question bank should I use? There are several options out
            there, each with different strengths. Here is an honest
            feature-by-feature breakdown to help you decide.
          </p>

          <p
            className="mt-3 text-[16px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            We built AKT Navigator, so take this comparison with that context in
            mind. But everything listed below is factual and sourced from each
            provider&apos;s public website. We have noted where we got each
            figure so you can verify it yourself.
          </p>

          {/* Comparison table */}
          <div
            className="mt-8 overflow-x-auto rounded-xl"
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
                    "Audio",
                    "Adaptive",
                    "Mocks",
                    "AI Debrief",
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
                    <td className="p-3">{bank.audio}</td>
                    <td className="p-3">{bank.adaptiveLearning}</td>
                    <td className="p-3">{bank.mockExams}</td>
                    <td className="p-3">{bank.aiDebrief}</td>
                    <td className="p-3 whitespace-nowrap">{bank.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="mt-3 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            AKT Navigator questions remain free. Full audio Early Access is £59
            before 8 July 2026, then £79 for 4 months. Prices sourced from
            provider websites, last checked {LAST_CHECKED}.
          </p>

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
                of. It covers around 3,500 questions for about £35 over four
                months. The questions are well written and many trainees swear by
                it. The main limitation is that there is no audio and no AI
                analysis of your performance. If you are someone who learns best
                by reading and doing questions on a screen, PassMedicine is a
                solid choice.
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
                Pastest has been around for a long time and has a good reputation
                across medical exams, not just the AKT. Their AKT bank has
                around 2,500 questions and costs between £95 and £180 depending
                on the subscription length. The explanations are generally
                thorough. The downside is the price, especially for trainees
                already paying for courses and textbooks.
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
                BMJ OnExamination offers around 1,200 AKT questions for about
                £50 over six months. It has basic performance tracking and the
                questions are written by GPs. The question count is smaller than
                other options, which means you may see repeats if you go through
                the bank more than once.
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
                i-Medics offers around 3,000 free AKT questions. If you are on a
                tight budget, it is a reasonable option. The questions vary in
                quality and there is no adaptive learning, audio, or performance
                analysis. It works best as a supplement alongside another
                resource rather than your primary revision tool.
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
                AKT Navigator has over 21,000 questions, which is significantly
                more than any other AKT question bank. It includes 90+ hours of
                audio revision across all 32 topics, adaptive learning that
                builds sessions around your weak areas, unlimited mock exams with
                AI-powered debriefs, and AI support for deeper topic review.
              </p>
              <p
                className="mt-3 text-[16px] leading-[1.7]"
                style={{ color: "var(--fg-mid)" }}
              >
                The question bank remains free. Full audio access is separate:
                Early Access is £59 before 8 July 2026 for 4 months of access
                starting 8 July, then standard Full Audio Access is £79 for 4
                months. AKT Navigator was built by a GP trainee who wanted
                something better than what was available, so it is designed
                around how trainees actually study: short sessions, on-the-go
                audio, and smart question selection that adapts to your gaps.
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
              It depends on how you learn best. If you want the biggest question
              bank with audio and AI features, AKT Navigator gives you free
              questions with optional full audio access from £59. If you prefer a
              battle-tested question bank that your friends used, PassMedicine is
              the safe bet. If money is no object and you want thorough written
              explanations, Pastest is reliable.
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
                  href: "/how-to-pass-the-akt",
                  title: "How to pass the AKT",
                  desc: "Complete study guide with exam strategy",
                },
                {
                  href: "/akt-mock-exam",
                  title: "AKT mock exams",
                  desc: "Mocks from 21,000+ free questions",
                },
                {
                  href: "/akt-audio-revision",
                  title: "AKT audio revision",
                  desc: "90+ hours, listen anywhere",
                },
                {
                  href: "/akt-exam-dates",
                  title: "AKT exam dates 2026",
                  desc: "April and July sittings with countdown",
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
              Try free questions &rarr;
            </a>
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
