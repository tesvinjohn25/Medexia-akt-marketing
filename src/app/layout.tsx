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
      "AKT Navigator by Medexia — Free AKT Revision | 20,000+ Questions, 50+ Hours Audio",
    template: "%s | AKT Navigator by Medexia",
  },
  description:
    "Free RCGP AKT revision for GP trainees. 20,000+ questions, 50+ hours of audio, adaptive learning, unlimited mock exams and AI-powered debriefs. Free for the April and July 2026 sittings.",
  keywords: [
    "AKT",
    "AKT Navigator",
    "MRCGP AKT",
    "AKT revision",
    "MRCGP revision",
    "AKT question bank",
    "GP training",
    "Medexia",
    "free AKT revision",
  ],
  openGraph: {
    title: "AKT Navigator by Medexia — Free AKT Revision for GP Trainees",
    description:
      "Free RCGP AKT revision for GP trainees. 20,000+ questions, 50+ hours of audio, adaptive learning, unlimited mock exams and AI-powered debriefs.",
    type: "website",
    url: "https://medexia-akt.com",
    siteName: "AKT Navigator by Medexia",
    images: [
      {
        url: "https://medexia-akt.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AKT Navigator by Medexia — Free MRCGP AKT revision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKT Navigator by Medexia — Free AKT Revision for GP Trainees",
    description:
      "Free RCGP AKT revision for GP trainees. 20,000+ questions, 50+ hours of audio, adaptive learning, unlimited mock exams and AI-powered debriefs.",
    images: ["https://medexia-akt.com/og-image.jpg"],
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
    "Free RCGP AKT revision for GP trainees. 20,000+ questions, 50+ hours of audio, adaptive learning, unlimited mock exams and AI-powered debriefs.",
  url: "https://medexia-akt.com",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
    description: "Free for the April and July 2026 sittings",
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
