import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "Is the AKT Exam Fee Funded? 2026 Reimbursement Rules",
  description:
    "From 1 April 2026, MRCGP AKT and SCA exam fees are reimbursed for resident doctors in England — the first two attempts of mandatory royal college exams. Who qualifies, from when, and how it works.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-exam-fee-funding",
  },
  openGraph: {
    title: "Is the MRCGP AKT Exam Fee Funded? 2026 Reimbursement Rules",
    description:
      "MRCGP AKT and SCA exam fees are reimbursed for resident doctors in England from 1 April 2026 — first two attempts of mandatory royal college exams.",
    type: "article",
    url: "https://medexia-akt.com/akt-exam-fee-funding",
  },
};

const facts = [
  {
    label: "AKT fee",
    value: "£481",
    detail:
      "The RCGP lists the current Applied Knowledge Test examination fee as £481. You still pay this up front; the funding is a reimbursement.",
  },
  {
    label: "Who is covered",
    value: "Resident doctors in England",
    detail:
      "Funding covers mandatory royal college exam fees for resident doctors (and doctors in local employment / LEDs) in England. It comes from the June 2026 government pay-and-jobs deal accepted by resident doctors.",
  },
  {
    label: "Attempts covered",
    value: "First 2",
    detail:
      "The first two attempts of each mandatory royal college exam are reimbursed. For GP trainees the mandatory MRCGP exams are the AKT and the SCA.",
  },
  {
    label: "From when",
    value: "Exams sat from 1 Apr 2026",
    detail:
      "Reimbursement applies to mandatory exams sat on or after 1 April 2026. Royal college membership fees and portfolio fees are separately covered from April 2027.",
  },
];

const faqs = [
  {
    question: "Does the government pay for the MRCGP AKT exam?",
    answer:
      "Yes. Under the June 2026 government offer accepted by resident doctors in England, mandatory royal college examination fees are funded for the first two attempts. For GP trainees this includes the MRCGP AKT (currently £481) and the SCA. It applies to mandatory exams sat on or after 1 April 2026 and is paid by reimbursement.",
  },
  {
    question: "Is the AKT fee reimbursed or paid up front?",
    answer:
      "It is a reimbursement. You still pay the RCGP the £481 examination fee when you book, and then claim it back. The exact claim process is administered through NHS employers and training bodies in England — check with your deanery, foundation/GP scheme or employer for how to submit your claim.",
  },
  {
    question: "How many attempts of the AKT are covered?",
    answer:
      "The first two attempts of each mandatory exam are reimbursed. Because only the first two attempts are funded, passing early matters — a third attempt would not be covered by this scheme.",
  },
  {
    question: "From what date does AKT fee reimbursement apply?",
    answer:
      "Reimbursement applies to mandatory royal college exams sat on or after 1 April 2026. Exams sat before that date are not covered by this scheme.",
  },
  {
    question: "Does the funding cover the SCA as well as the AKT?",
    answer:
      "Yes. Both the AKT and the SCA are mandatory MRCGP exams needed to complete GP training and gain a Certificate of Completion of Training (CCT), so both fall within the funded mandatory exams for resident doctors in England.",
  },
  {
    question: "Does this apply in Scotland, Wales and Northern Ireland?",
    answer:
      "The June 2026 offer covers resident doctors in England. Arrangements in Scotland, Wales and Northern Ireland are set separately, so trainees outside England should check their own deanery or NHS body for the current position on exam fee funding.",
  },
  {
    question: "How much is the MRCGP AKT exam fee now?",
    answer:
      "The AKT examination fee itself is unchanged at £481 as listed by the RCGP. What has changed is that eligible resident doctors in England can reclaim that fee for their first two attempts, for exams sat from 1 April 2026.",
  },
  {
    question: "Are royal college membership and portfolio fees covered too?",
    answer:
      "Under the accepted offer, royal college membership fees and portfolio (e-portfolio) fees for doctors in training in England are covered from April 2027, separately from the exam-fee reimbursement that starts for exams sat from 1 April 2026.",
  },
];

export default function AktExamFeeFundingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Is the MRCGP AKT Exam Fee Funded? 2026 Reimbursement Rules",
        description:
          "MRCGP AKT and SCA exam fees are reimbursed for resident doctors in England from 1 April 2026 — the first two attempts of mandatory royal college exams.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-07-09",
        dateModified: "2026-07-09",
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
          {
            name: "AKT Exam Fee Funding",
            url: "https://medexia-akt.com/akt-exam-fee-funding",
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
            Is the MRCGP AKT exam fee funded?
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The June 2026 government pay-and-jobs deal accepted by resident
            doctors in England funds mandatory royal college exam fees. For GP
            trainees that means the MRCGP AKT and SCA fees can be reclaimed for
            the first two attempts. Here is who qualifies, from when, and how the
            reimbursement works.
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
              Yes. Under the June 2026 government offer accepted by resident
              doctors in England, mandatory royal college exam fees — including
              the <strong>MRCGP AKT (£481)</strong> and the{" "}
              <strong>SCA</strong> — are reimbursed for the{" "}
              <strong>first two attempts</strong>, for exams sat on or after{" "}
              <strong>1 April 2026</strong>. You still pay the fee up front and
              claim it back through your NHS employer or training body.
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
              AKT exam fee funding at a glance
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {facts.map((fact) => (
                <article
                  key={fact.label}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-[11px] uppercase"
                    style={{
                      color: "var(--fg-muted)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {fact.label}
                  </p>
                  <h3
                    className="mt-2 text-[26px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {fact.value}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {fact.detail}
                  </p>
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
              What changed, in plain terms
            </h2>
            <p
              className="mt-4 text-[15px] md:text-[16px] leading-[1.75]"
              style={{ color: "var(--fg-mid)" }}
            >
              Historically GP trainees paid the AKT fee themselves, and the NHS
              study budget covered approved preparation courses rather than the
              exam fee. The June 2026 settlement changed that for resident
              doctors in England: the fees for mandatory royal college exams are
              now reimbursed for the first two attempts. For the MRCGP that is
              the AKT and the SCA. The examination fee the RCGP charges is
              unchanged — the difference is that you can now reclaim it, provided
              you sit the exam on or after 1 April 2026.
            </p>
            <p
              className="mt-4 text-[15px] md:text-[16px] leading-[1.75]"
              style={{ color: "var(--fg-mid)" }}
            >
              Because only the first two attempts are funded, the funding
              rewards passing early. That makes strong, efficient preparation
              more valuable than ever: the goal is to make each covered attempt
              count rather than relying on a third sitting you would pay for
              yourself.
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
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-3">
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
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2
              className="text-[20px] md:text-[22px] leading-[1.2]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Official sources
            </h2>
            <div className="mt-3 flex flex-col gap-2 text-[14px]">
              <a
                href="https://www.bma.org.uk/news-and-opinion/resident-doctors-in-england-accept-government-offer-on-pay-and-jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                BMA — Resident doctors in England accept government offer
              </a>
              <a
                href="https://www.gov.uk/government/publications/government-offer-to-resident-doctors-june-2026/offer-to-bma-uk-resident-doctors-committee-june-2026-accessible-version"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                GOV.UK — Government offer to resident doctors (June 2026)
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/regulations-exam-fees"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP — MRCGP exam fees
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/free-akt-questions"
            >
              Make the funded attempts count &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/demo">
              Try the free demo
            </a>
          </div>

          <p className="mt-6 text-[12px]" style={{ color: "var(--fg-muted)" }}>
            AKT Navigator is independent and not affiliated with the RCGP, BMA or
            the government. Funding terms are summarised from public sources and
            the reimbursement process is administered by NHS employers and
            training bodies — check your deanery or employer and the RCGP for the
            current position before booking. Last reviewed July 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
