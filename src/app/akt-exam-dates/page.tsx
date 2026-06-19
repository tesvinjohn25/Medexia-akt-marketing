import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ExamCountdown } from "@/components/sections/ExamCountdown";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
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

export default function AktExamDatesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": EXAM_SITTINGS.map((sitting) => ({
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
              question even if you are unsure.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
            The exam is sat at a Pearson VUE test centre. Since December 2025,
              you book directly through MyRCGP without a separate reservation
              step. The RCGP publishes the reasonable adjustment deadlines,
              final booking deadlines, Pearson booking windows, test dates and
              result dates on its MRCGP key dates page.
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
              situation.
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
                href="https://app.medexia-akt.com"
                className="font-medium transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                start free practice
              </a>
              .
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              className="btn-primary inline-block text-[16px]"
              href="https://app.medexia-akt.com"
            >
              Start free practice &rarr;
            </a>
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
