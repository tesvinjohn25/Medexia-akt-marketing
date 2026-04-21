import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { FAQ } from "@/components/sections/FAQ";
import { FAQS } from "@/data/faq";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

export const metadata: Metadata = {
  title: "AKT FAQ — Common Questions About the MRCGP AKT",
  description:
    "Every question GP trainees ask about the MRCGP AKT — revision timeline, exam format (160 questions in 2h40m), pass rate, common mistakes, and how to revise while working full time.",
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

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
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
        </div>
      </section>

      <FAQ showHeader={false} />
      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
