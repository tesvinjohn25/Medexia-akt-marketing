import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ExamCountdown } from "@/components/sections/ExamCountdown";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { EXAM_SITTINGS, EXAM_FORMAT } from "@/data/exam-dates";

export const metadata: Metadata = {
  title: "AKT Exam Dates 2026 — Next Sitting 7 July, Booking & Format",
  description:
    "RCGP AKT exam dates for 2026: the next sitting is 7 July (the April sitting was 27 April). Booking windows, exam format (160 questions, 2h40m), eligibility, and free AKT question practice.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-exam-dates",
  },
  openGraph: {
    title: "AKT Exam Dates 2026 — Next Sitting 7 July",
    description:
      "The next RCGP AKT sitting is 7 July 2026. Booking windows, exam format, eligibility, and free AKT question practice.",
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
            January, April, July, and October. Here are the upcoming dates for
            2026, along with everything you need to know about format and
            eligibility.
          </p>

          {/* Countdown */}
          <div className="mt-8 max-w-[340px]">
            <ExamCountdown variant="compact" />
          </div>

          {/* Sitting details */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {EXAM_SITTINGS.map((sitting) => (
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
                  {sitting.date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </p>
                <p
                  className="mt-1 text-[14px] leading-[1.6]"
                  style={{ color: "var(--fg-mid)" }}
                >
                  <strong style={{ color: "var(--fg-high)" }}>
                    Booking:
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
              step. Check the RCGP website for the booking window for each
              sitting.
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
            Exam dates sourced from RCGP.org.uk. Last reviewed March 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
