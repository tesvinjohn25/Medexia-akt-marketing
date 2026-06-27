import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Nav } from "@/components/Nav";
import { ExplanationBuilderBridge } from "@/components/sections/ExplanationBuilderBridge";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

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
  return (
    <main>
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
