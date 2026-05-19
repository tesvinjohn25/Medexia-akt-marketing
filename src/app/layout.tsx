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
      "AKT Navigator Pricing — Free Until 8 July + Audio from £59",
    template: "%s | AKT Navigator by Medexia",
  },
  description:
    "Full AKT Navigator access is free until 8 July 2026. After that, practise with 21,000+ AKT questions and 2 hours of audio for free; full AKT audio starts from £59.",
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
    title: "AKT Navigator Pricing — Free Until 8 July + Audio from £59",
    description:
      "Full access is free until 8 July 2026. After that, 21,000+ AKT questions and 2 hours of audio stay free; full AKT audio starts from £59.",
    type: "website",
    url: "https://medexia-akt.com",
    siteName: "AKT Navigator by Medexia",
    // og:image auto-wired from src/app/opengraph-image.tsx — do not set
    // `images` here or it overrides the file-based convention.
  },
  twitter: {
    card: "summary_large_image",
    title: "AKT Navigator Pricing — Free Until 8 July + Audio from £59",
    description:
      "Full access is free until 8 July 2026. After that, 21,000+ AKT questions and 2 hours of audio stay free; full AKT audio starts from £59.",
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
      "@type": "Organization",
      "@id": "https://medexia-akt.com/#organization",
      name: "Medexia",
      url: "https://medexia-akt.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://medexia-akt.com/#website",
      name: "AKT Navigator by Medexia",
      url: "https://medexia-akt.com",
      publisher: {
        "@id": "https://medexia-akt.com/#organization",
      },
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
