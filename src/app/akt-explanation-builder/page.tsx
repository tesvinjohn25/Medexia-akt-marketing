import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Nav } from "@/components/Nav";
import { ExplanationBuilderBridge } from "@/components/sections/ExplanationBuilderBridge";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { explanationBuilderFaqs } from "@/data/explanation-builder";

const title = "Free AKT Explanation Builder — AKT Navigator";
const description =
  "Paste an AKT-style SBA and get a structured teaching explanation: key clues, examiner trap, near-miss answer, why-wrong breakdown and AKT takeaway.";
const canonical = "https://medexia-akt.com/akt-explanation-builder";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonical,
    siteName: "AKT Navigator by Medexia",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function AktExplanationBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Free AKT Explanation Builder",
        description,
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        datePublished: "2026-06-27",
        dateModified: "2026-06-29",
      },
      {
        "@type": "FAQPage",
        mainEntity: explanationBuilderFaqs.map((faq) => ({
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
          { name: "Free AKT Explanation Builder", url: canonical },
        ]}
      />
      <Nav />
      <ExplanationBuilderBridge />
      <MinimalFooter />
    </main>
  );
}
