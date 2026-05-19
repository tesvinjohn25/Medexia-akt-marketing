import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://medexia-akt.com"),
  alternates: {
    canonical: "https://medexia-akt.com",
  },
  title: {
    default:
      "AKT Navigator Pricing — Free AKT Questions + Audio from £59",
    template: "%s | AKT Navigator by Medexia",
  },
  description:
    "AKT Navigator pricing: practise with 21,000+ AKT questions for free. Full AKT audiobook access starts from £59 early access, then £79 from 8 July 2026.",
  keywords: [
    "AKT",
    "AKT Navigator",
    "MRCGP AKT",
    "AKT revision",
    "MRCGP revision",
    "AKT question bank",
    "GP training",
    "Medexia",
    "free AKT questions",
  ],
  openGraph: {
    title: "AKT Navigator Pricing — Free AKT Questions + Audio from £59",
    description:
      "AKT Navigator pricing: 21,000+ AKT questions stay free. Full AKT audio access starts from £59 early access, then £79 from 8 July 2026.",
    type: "website",
    url: "https://medexia-akt.com",
    siteName: "AKT Navigator by Medexia",
    // og:image auto-wired from src/app/opengraph-image.tsx — do not set
    // `images` here or it overrides the file-based convention.
  },
  twitter: {
    card: "summary_large_image",
    title: "AKT Navigator Pricing — Free AKT Questions + Audio from £59",
    description:
      "AKT Navigator pricing: 21,000+ AKT questions stay free. Full AKT audio access starts from £59 early access, then £79 from 8 July 2026.",
    // twitter:image auto-wired from src/app/twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "AKT Navigator",
      alternateName: "AKT Navigator by Medexia",
      description:
        "AKT question practice with 21,000+ free questions and full AKT audiobook access from £59 early access.",
      url: "https://medexia-akt.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      offers: [
        {
          "@type": "Offer",
          name: "Free Practice",
          price: "0",
          priceCurrency: "GBP",
          description:
            "21,000+ AKT questions, deep structured explanations, mock exams and basic practice, plus 2 hours of audiobook listening.",
        },
        {
          "@type": "Offer",
          name: "Early Access",
          price: "59",
          priceCurrency: "GBP",
          description:
            "4 months full AKT audiobook access from 8 July 2026. Available before 8 July 2026.",
        },
        {
          "@type": "Offer",
          name: "Full Audio Access",
          price: "79",
          priceCurrency: "GBP",
          description:
            "4 months full AKT audiobook access from 8 July 2026 onwards. Questions remain free.",
        },
      ],
      creator: {
        "@type": "Organization",
        name: "Medexia",
        url: "https://medexia-akt.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are AKT Navigator questions free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Free Practice includes 21,000+ AKT questions, deep structured explanations, mock exams and basic practice.",
          },
        },
        {
          "@type": "Question",
          name: "What is paid in AKT Navigator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Full access to the 90+ hour AKT audiobook library is the paid audio tier. Early Access is £59 before 8 July 2026, then Full Audio Access is £79 for 4 months.",
          },
        },
        {
          "@type": "Question",
          name: "Is AKT Navigator a paid question bank?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. AKT Navigator offers free AKT question practice with an optional paid full-audio upgrade.",
          },
        },
      ],
    },
  ],
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
