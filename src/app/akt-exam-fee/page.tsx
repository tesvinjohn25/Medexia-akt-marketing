import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Exam Fee, Booking and Eligibility",
  description:
    "MRCGP AKT exam fee, booking, eligibility and attempts: current RCGP AKT fee, ST2/ST3 rules, staged payments and booking through MyRCGP.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-exam-fee",
  },
  openGraph: {
    title: "MRCGP AKT Exam Fee, Booking and Eligibility",
    description:
      "Current AKT fee, booking process, ST2/ST3 eligibility, attempt limits and staged payment rules for GP trainees.",
    type: "article",
    url: "https://medexia-akt.com/akt-exam-fee",
  },
};

const facts = [
  {
    label: "Current AKT fee",
    value: "£481",
    detail:
      "The RCGP lists the current Applied Knowledge Test examination fee as £481.",
  },
  {
    label: "Eligibility",
    value: "ST2 / ST3",
    detail:
      "The AKT is for GP specialty trainees in ST2 or ST3, including flexible trainees at the equivalent stage.",
  },
  {
    label: "Attempts",
    value: "4 or 6",
    detail:
      "Four attempts applies to trainees already in training on 1 August 2023; six attempts applies to first-time GP specialty trainees entering on or after 2 August 2023.",
  },
  {
    label: "Booking route",
    value: "MyRCGP",
    detail:
      "Applications and bookings are handled through the RCGP/MyRCGP process and depend on accurate training records.",
  },
];

const faqs = [
  {
    question: "How much does the MRCGP AKT cost?",
    answer:
      "The RCGP currently lists the Applied Knowledge Test examination fee as £481. Fees can change, so check the official RCGP fees page before booking.",
  },
  {
    question: "When do I pay for the AKT?",
    answer:
      "The RCGP application guidance says staged payments apply from 1 April 2026: 25% of the examination fee is paid six months before the examination, or at booking if this is between six months and twelve weeks before the exam, with a further 25% due 12 weeks before the examination.",
  },
  {
    question: "Who can sit the AKT?",
    answer:
      "RCGP regulations limit AKT eligibility to GP trainees in Specialty Training Years 2 and 3, ST2 and ST3. Training records need to show the correct training year at the point of booking.",
  },
  {
    question: "How many attempts do you get at the AKT?",
    answer:
      "The RCGP states that trainees already in training on 1 August 2023 have a maximum of four attempts, while trainees entering GP specialty training for the first time on or after 2 August 2023 have a maximum of six attempts.",
  },
];

export default function AktExamFeePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Exam Fee, Booking and Eligibility",
        description:
          "Current RCGP AKT fee, staged payment rules, eligibility and attempt limits for GP trainees.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-06-19",
        dateModified: "2026-06-19",
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
            name: "MRCGP AKT Exam Fee",
            url: "https://medexia-akt.com/akt-exam-fee",
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
            MRCGP AKT exam fee, booking and eligibility
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The AKT is booked through the RCGP process and sat at Pearson VUE
            test centres. The key practical details are the current fee, the
            staged payment timing, ST2/ST3 eligibility and your maximum number of
            permitted attempts.
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
              The current RCGP AKT examination fee is <strong>£481</strong>. The
              AKT is normally taken in <strong>ST2 or ST3</strong>. Attempt limits
              are <strong>four</strong> or <strong>six</strong> depending on when
              you entered GP specialty training. From April 2026, RCGP staged
              payment rules apply.
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
              AKT fee and booking facts
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
              How AKT payment works
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "Current fee",
                  text: "The RCGP currently lists the AKT examination fee as £481. The fee is separate from revision resources and travel to a Pearson VUE test centre.",
                },
                {
                  title: "Staged payments",
                  text: "From 1 April 2026, RCGP staged payments apply. The guidance describes 25% payment six months before the exam, or at booking if inside that window, with a further 25% due 12 weeks before the examination.",
                },
                {
                  title: "Tax and study budget",
                  text: "RCGP guidance says tax paid on examination fees can be reclaimed through normal tax returns. Local study-budget rules vary, so confirm with your deanery or employer.",
                },
              ].map((item) => (
                <article
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
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
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
              Eligibility and attempts
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              RCGP regulations limit AKT eligibility to ST2 and ST3. The
              application process also depends on your training record showing
              the correct post and training year when you book. If those details
              are incomplete, the booking process may be blocked until your
              record is corrected.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Attempt limits depend on when you entered GP specialty training.
              Trainees already in training on 1 August 2023 have a maximum of
              four attempts. Trainees entering GP specialty training for the
              first time on or after 2 August 2023 have a maximum of six
              attempts.
            </p>
          </section>

          <section className="mt-10">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              AKT fee and eligibility FAQ
            </h2>
            <div className="mt-4 grid gap-3">
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

          <section
            className="mt-10 rounded-xl p-4"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h2
              className="text-[18px] font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Official sources
            </h2>
            <div
              className="mt-3 grid gap-2 text-[14px]"
              style={{ color: "var(--fg-mid)" }}
            >
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-applying"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP applying for the AKT
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/mrcgp-important-info"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP exam fees and admin
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/mrcgp-exam-applications"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP application and booking process
              </a>
              <a
                href="https://www.rcgp.org.uk/mrcgp-exams/all-mrcgp-regulations"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP exam regulations
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="btn-primary text-center text-[16px]"
              href="/akt-exam-dates"
            >
              Check AKT dates &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/demo">
              Try the free demo
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Fee and eligibility information should be checked against the RCGP
            before booking. Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
