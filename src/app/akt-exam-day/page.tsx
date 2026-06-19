import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "MRCGP AKT Exam Day: ID, Pearson VUE and What to Bring",
  description:
    "MRCGP AKT exam day guide: Pearson VUE test centre booking, required ID, arrival time, personal belongings, comfort aids and reasonable adjustments.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-exam-day",
  },
  openGraph: {
    title: "MRCGP AKT Exam Day: ID, Pearson VUE and What to Bring",
    description:
      "A calm AKT exam-day checklist for GP trainees: what ID to bring, what not to bring, Pearson VUE timing and reasonable adjustments.",
    type: "article",
    url: "https://medexia-akt.com/akt-exam-day",
  },
};

const checklist = [
  {
    title: "Check your Pearson confirmation",
    text: "Use the exact test centre, arrival window and start time in your Pearson booking confirmation. RCGP notes there is no flexibility on admission times if you arrive late.",
  },
  {
    title: "Bring two forms of ID",
    text: "RCGP requires a primary photographic ID and a secondary ID containing at least your name and signature. The names must match your RCGP application exactly.",
  },
  {
    title: "Leave personal items in a locker",
    text: "Personal belongings are not allowed in the test room. RCGP lists bags, coats, calculators, notes, phones, watches, wallets and food or drink except permitted water.",
  },
  {
    title: "Confirm adjustments early",
    text: "Reasonable adjustments need to be requested through the RCGP process with supporting evidence. Do not assume the test centre can add them on the day.",
  },
];

const faqs = [
  {
    question: "What ID do I need for the AKT?",
    answer:
      "RCGP says candidates must bring two forms of ID to the test centre: primary photographic ID and secondary ID containing at least a name and signature. The names must match the RCGP application exactly.",
  },
  {
    question: "Can I bring a calculator to the AKT?",
    answer:
      "RCGP lists calculators among the personal items that cannot be brought into the test room. Check the RCGP sitting-the-AKT page and Pearson candidate information for current test-centre rules.",
  },
  {
    question: "What happens if I arrive late for the AKT?",
    answer:
      "RCGP states that if you arrive late, you will not be allowed to take the examination. Check transport, parking, arrival window and start time before exam day.",
  },
  {
    question: "How do AKT reasonable adjustments work?",
    answer:
      "Reasonable adjustments are requested through the RCGP process with supporting evidence. Approved adjustments are shared with Pearson VUE for AKT delivery. Requests have deadlines, so check the RCGP reasonable adjustments pages early.",
  },
];

export default function AktExamDayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "MRCGP AKT Exam Day: ID, Pearson VUE and What to Bring",
        description:
          "Practical AKT exam-day guidance for GP trainees, including ID, Pearson VUE booking, personal belongings and reasonable adjustments.",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-06-20",
        dateModified: "2026-06-20",
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
            name: "MRCGP AKT Exam Day",
            url: "https://medexia-akt.com/akt-exam-day",
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
            MRCGP AKT exam day: ID, Pearson VUE and what to bring
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            AKT exam day should be boring. The main risks are avoidable:
            missing ID, arriving late, misunderstanding the Pearson VUE booking
            window or assuming a reasonable adjustment can be sorted at the test
            centre.
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
              Bring the two forms of ID required by RCGP, check that your names
              match your application, arrive within the Pearson confirmation
              window and leave personal items in the test-centre locker. If you
              need reasonable adjustments, request them through RCGP before the
              deadline with supporting evidence.
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
              AKT exam-day checklist
            </h2>
            <div className="mt-4 grid gap-3">
              {checklist.map((item) => (
                <article
                  key={item.title}
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
              Booking the Pearson VUE test centre
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              RCGP says the AKT is booked through the MyRCGP process. To choose
              a Pearson test centre, log into MyRCGP, go to Your Exam Booking
              and use the Pearson access link during the published test-centre
              booking window.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Pearson also publishes RCGP candidate information for scheduling,
              rescheduling and test-centre expectations. If you need to change
              your test centre or time, do it inside the RCGP-defined booking
              period and check official instructions before cancelling anything.
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
              Reasonable adjustments and comfort aids
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              RCGP has a dedicated AKT reasonable-adjustments process. It covers
              common adjustments such as extra time, extra breaks, access to
              snacks or drink, wheelchair access, a separate room, overlays and
              reader or scribe arrangements where appropriate.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Pearson also has a comfort-aid list for items that may be allowed
              without pre-approval. RCGP advises candidates bringing comfort aids
              to arrive at the beginning of the arrival window so Pearson has
              time to check them.
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
              AKT exam-day FAQ
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
                href="https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-sitting"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP sitting the AKT
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
                href="https://www.rcgp.org.uk/mrcgp-exams/mrcgp-important-info/reasonable-adjustments/ra-for-akt"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                RCGP reasonable adjustments for AKT
              </a>
              <a
                href="https://www.pearsonvue.com/us/en/rcgp.html"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                Pearson VUE RCGP candidate page
              </a>
              <a
                href="https://bnf.nice.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--brand-violet-light)" }}
              >
                BNF
              </a>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary text-center text-[16px]" href="/akt-exam-dates">
              Check AKT dates &rarr;
            </a>
            <a className="btn-secondary text-center text-[16px]" href="/akt-mock-exam">
              Practise timed mocks
            </a>
          </div>

          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            This is revision guidance, not official RCGP or Pearson VUE advice.
            Check your Pearson confirmation and RCGP pages before exam day.
            Last reviewed June 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
