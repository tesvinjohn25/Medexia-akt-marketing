import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ExamCountdown } from "@/components/sections/ExamCountdown";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { EXAM_SITTINGS, EXAM_FORMAT } from "@/data/exam-dates";

export const metadata: Metadata = {
  title: "AKT Exam Dates 2026 — July and October",
  description:
    "RCGP AKT exam dates 2026: July 7 and October 26 sittings, MyRCGP booking deadlines, results dates, 160-question format and eligibility.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-exam-dates",
  },
  openGraph: {
    title: "AKT Exam Dates 2026 — July and October",
    description:
      "The next RCGP AKT sittings are 7 July and 26 October 2026. Booking windows, results dates, exam format and eligibility.",
    type: "website",
    url: "https://medexia-akt.com/akt-exam-dates",
  },
};

const sourceLinks = [
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/mrcgp-exam-applications",
    label: "RCGP: MRCGP key dates and applications",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-applying",
    label: "RCGP: Applying for the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-introduction",
    label: "RCGP: Introducing the AKT",
  },
  {
    href: "https://www.pearsonvue.com/us/en/rcgp.html",
    label: "Pearson VUE: RCGP test centres",
  },
];

const faqs = [
  {
    question: "When is the next MRCGP AKT exam?",
    answer:
      "The next published MRCGP AKT sitting is 7 July 2026. The following 2026 sitting is 26 October 2026.",
  },
  {
    question: "When is the October 2026 AKT booking deadline?",
    answer:
      "The final booking deadline for the October 2026 AKT is 1 September 2026. Pearson centre booking runs from 7 to 16 September 2026.",
  },
  {
    question: "Where do GP trainees book the AKT?",
    answer:
      "GP trainees book and manage AKT applications through MyRCGP. Pearson centre booking is accessed from the MyRCGP exam booking area.",
  },
  {
    question: "When are July 2026 AKT results released?",
    answer:
      "The RCGP key dates page lists July 2026 AKT results for 6 August 2026 at 17:00.",
  },
];

export default function AktExamDatesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "AKT Exam Dates 2026",
        description:
          "Current RCGP AKT exam dates, booking deadlines, Pearson booking windows, results dates and format notes for GP trainees.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-03-25",
        dateModified: "2026-06-20",
      },
      ...EXAM_SITTINGS.map((sitting) => ({
        "@type": "Event",
        name: `RCGP AKT Exam — ${sitting.label}`,
        startDate: sitting.date.toISOString().split("T")[0],
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "Pearson VUE Test Centre",
          address: { "@type": "PostalAddress", addressCountry: "GB" },
        },
        organizer: {
          "@type": "Organization",
          name: "Royal College of General Practitioners",
          url: "https://www.rcgp.org.uk",
        },
        description: `MRCGP Applied Knowledge Test — ${EXAM_FORMAT.questions} questions in ${EXAM_FORMAT.durationLabel}`,
      })),
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

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

  const futureSittings = EXAM_SITTINGS.filter(
    (sitting) => sitting.date >= new Date(),
  );

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
            name: "AKT Exam Dates 2026",
            url: "https://medexia-akt.com/akt-exam-dates",
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
            AKT Exam Dates 2026
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The RCGP runs the Applied Knowledge Test four times a year, in
            January, April, July, and October. For the rest of 2026, the
            published UK sittings are 7 July 2026 and 26 October 2026.
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
              The next MRCGP AKT sitting is <strong>7 July 2026</strong>. The
              following sitting is <strong>26 October 2026</strong>. October
              booking has a final booking deadline of{" "}
              <strong>1 September 2026</strong>, with Pearson centre booking
              from <strong>7-16 September 2026</strong>.
            </p>
          </div>

          {/* Countdown */}
          <div className="mt-8 max-w-[340px]">
            <ExamCountdown variant="compact" />
          </div>

          {/* Sitting details */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {futureSittings.map((sitting) => (
              <div
                key={sitting.label}
                className="rounded-xl p-5"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <h2
                  className="text-[18px] font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {sitting.label}
                </h2>
                <p
                  className="mt-2 text-[14px] leading-[1.6]"
                  style={{ color: "var(--fg-mid)" }}
                >
                  <strong style={{ color: "var(--fg-high)" }}>
                    Exam date:
                  </strong>{" "}
                  {formatDate(sitting.date)}
                </p>
                <p
                  className="mt-1 text-[14px] leading-[1.6]"
                  style={{ color: "var(--fg-mid)" }}
                >
                  <strong style={{ color: "var(--fg-high)" }}>
                    Final booking deadline:
                  </strong>{" "}
                  {formatDate(sitting.finalBookingDeadline)}
                </p>
                <p
                  className="mt-1 text-[14px] leading-[1.6]"
                  style={{ color: "var(--fg-mid)" }}
                >
                  <strong style={{ color: "var(--fg-high)" }}>
                    Pearson booking window:
                  </strong>{" "}
                  {sitting.pearsonBookingWindow}
                </p>
                <p
                  className="mt-1 text-[14px] leading-[1.6]"
                  style={{ color: "var(--fg-mid)" }}
                >
                  <strong style={{ color: "var(--fg-high)" }}>
                    Results:
                  </strong>{" "}
                  {formatDate(sitting.resultsDate)} at 17:00
                </p>
                <p
                  className="mt-1 text-[14px] leading-[1.6]"
                  style={{ color: "var(--fg-mid)" }}
                >
                  <strong style={{ color: "var(--fg-high)" }}>
                    Apply:
                  </strong>{" "}
                  via{" "}
                  <a
                    href="https://www.rcgp.org.uk/mrcgp-exams/mrcgp-exam-applications"
                    className="font-medium transition-colors"
                    style={{ color: "var(--brand-violet-light)" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MyRCGP
                  </a>
                </p>
              </div>
            ))}
          </div>

          {/* Exam format section */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Exam format
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Since October 2025, the AKT has {EXAM_FORMAT.questions} questions
              in {EXAM_FORMAT.durationLabel}. That works out to one minute per
              question. There is no negative marking, so you should answer every
              question even if you are unsure. For the section weighting and
              marking rules, see the{" "}
              <a
                href="/akt-exam-format"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT exam format guide
              </a>
              .
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The exam is sat at a Pearson VUE test centre. Since December 2025,
              you book directly through MyRCGP without a separate reservation
              step. The RCGP publishes the reasonable adjustment deadlines,
              final booking deadlines, Pearson booking windows, test dates and
              result dates on its MRCGP key dates page. For ID, arrival timing
              and test-centre rules, use the{" "}
              <a
                href="/akt-exam-day"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT exam-day guide
              </a>
              .
            </p>
          </div>

          {/* Eligibility */}
          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Who can sit the AKT?
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The AKT is open to GP trainees in ST2 or ST3. Most trainees sit it
              during ST2 to give themselves time for a resit if needed. The
              maximum number of attempts depends on when you entered GP training:
              four attempts if you were in training before August 2023, or six
              attempts if you started on or after August 2023. Your training
              programme director can advise on the best timing for your
              situation. If you need another sitting, use the{" "}
              <a
                href="/akt-results-and-retakes"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                AKT results and retakes guide
              </a>{" "}
              to plan the next attempt.
            </p>
          </div>

          {/* Topic breakdown */}
          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              What does the AKT cover?
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The AKT tests your knowledge across three broad areas. Around 80%
              of questions cover clinical medicine, 10% cover evidence-based
              practice and statistics, and 10% cover organisational and
              professional topics. Within those areas, the RCGP curriculum spans
              32 topics.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              AKT Navigator covers all 32 topics with questions, audio revision,
              and detailed explanations aligned to NICE CKS and the RCGP
              curriculum. You can{" "}
              <a
                href="/how-to-pass-the-akt"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                read the full study guide
              </a>{" "}
              or{" "}
              <a
                href="/akt-exam-fee"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                check AKT fees and eligibility
              </a>{" "}
              or{" "}
              <TrackedAppLink
                href="/join/free"
                intent="start_free"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                start free practice
              </TrackedAppLink>
              .
            </p>
          </div>

          {/* FAQs */}
          <section className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT dates FAQs
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

          {/* Official sources */}
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
              This page is independent of the RCGP. Exam dates, application
              process, Pearson booking information and AKT format are checked
              against public RCGP and Pearson VUE information.
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

          {/* CTA */}
          <div className="mt-10">
            <TrackedAppLink
              className="btn-primary inline-block text-[16px]"
              href="/join/free"
              intent="start_free"
            >
              Start free practice &rarr;
            </TrackedAppLink>
          </div>

          {/* Trust signal */}
          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Exam dates sourced from RCGP.org.uk. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
