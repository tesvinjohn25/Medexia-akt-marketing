import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FAQ } from "@/components/sections/FAQ";
import { FAQS } from "@/data/faq";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "AKT FAQ — Common Questions About the MRCGP AKT",
  description:
    "MRCGP AKT FAQ for GP trainees: revision timeline, 160-question exam format, pass rate, common mistakes and working-full-time revision.",
  alternates: {
    canonical: "https://medexia-akt.com/faq",
  },
  openGraph: {
    title: "AKT FAQ — Common Questions About the MRCGP AKT",
    description:
      "Revision timeline, exam format, pass rate, common mistakes, and how to study while working full time.",
    type: "website",
    url: "https://medexia-akt.com/faq",
  },
};

const sourceLinks = [
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-introduction",
    label: "RCGP: Introducing the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-applying",
    label: "RCGP: Applying for the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-preparing",
    label: "RCGP: Preparing for the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/further-help-support",
    label: "RCGP: AKT feedback reports and FAQs",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "AKT FAQ",
        url: "https://medexia-akt.com/faq",
        description:
          "Common questions about the MRCGP AKT exam, revision, format, pass rate and AKT Navigator.",
        datePublished: "2026-03-25",
        dateModified: "2026-06-20",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
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
          { name: "AKT FAQ", url: "https://medexia-akt.com/faq" },
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
            Common AKT questions
          </h1>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The questions GP trainees ask most about the MRCGP AKT &mdash;
            timeline, format, pass rate, common mistakes, and how to revise
            when your time is already spent on clinic, family, and life.
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
              The AKT is a 160-question, 2 hour 40 minute MRCGP exam for ST2
              and ST3 GP trainees. It is mostly clinical medicine, with evidence
              and organisation topics also tested. AKT Navigator keeps
              syllabus-mapped questions free and focuses the paid upgrade on
              full audio-first revision.
            </p>
          </div>
        </div>
      </section>

      <FAQ showHeader={false} />

      <section className="section-padding pt-0">
        <div className="container-x max-w-[720px]">
          <section
            className="rounded-xl p-4"
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
              This FAQ is independent of the RCGP. Exam format, eligibility,
              application process, preparation guidance and feedback-report
              figures are checked against public RCGP information.
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
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
