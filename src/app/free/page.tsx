import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Nav } from "@/components/Nav";
import { CustomGptReturnBridge } from "@/components/sections/CustomGptReturnBridge";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

const title = "Start Free AKT Questions — AKT Navigator";
const description =
  "Start free AKT questions, mocks and structured explanations with AKT Navigator. No card required.";
const canonical = "https://medexia-akt.com/free";

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

export default function FreePage() {
  return (
    <main>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://medexia-akt.com/" },
          { name: "Start free AKT questions", url: canonical },
        ]}
      />
      <Nav />
      <CustomGptReturnBridge />
      <MinimalFooter />
    </main>
  );
}
