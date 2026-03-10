import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://medexia-akt.com"),
  title: {
    default: "AKT Navigator by Medexia — Guided Revision for the MRCGP AKT",
    template: "%s | AKT Navigator by Medexia",
  },
  description:
    "AKT Navigator — the smart MRCGP AKT revision tool by Medexia. 50+ hrs of audio (15+ live now, 35+ more this month), adaptive learning that targets your weak spots, and examiner-level explanations. Founding cohort — just £45, or £35 with a friend.",
  keywords: [
    "AKT",
    "AKT Navigator",
    "Navigator",
    "MRCGP AKT",
    "AKT revision",
    "MRCGP revision",
    "AKT question bank",
    "GP training",
    "Medexia",
  ],
  openGraph: {
    title: "AKT Navigator by Medexia",
    description:
      "AKT Navigator — the smart MRCGP AKT revision tool. 50+ hrs of audio (15+ live now, 35+ more this month), adaptive learning, and examiner-level explanations. Founding cohort — just £45, or £35 with a friend.",
    type: "website",
    url: "https://medexia-akt.com",
    siteName: "AKT Navigator by Medexia",
    images: [
      {
        url: "https://medexia-akt.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AKT Navigator by Medexia — MRCGP AKT revision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKT Navigator by Medexia",
    description:
      "AKT Navigator — the smart MRCGP AKT revision tool. 50+ hrs of audio (15+ live now, 35+ more this month), adaptive learning, and examiner-level explanations. Founding cohort — just £45, or £35 with a friend.",
    images: ["https://medexia-akt.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://medexia-akt.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AKT Navigator",
  alternateName: "AKT Navigator by Medexia",
  description:
    "Smart MRCGP AKT revision tool with 50+ hours of audio (15+ hrs live, 35+ more this month), adaptive learning, and examiner-level explanations.",
  url: "https://medexia-akt.com",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "45.00",
    priceCurrency: "GBP",
    description: "Founding cohort — 4 months full access",
  },
  creator: {
    "@type": "Organization",
    name: "Medexia",
    url: "https://medexia-akt.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
