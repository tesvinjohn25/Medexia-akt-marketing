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
      "MRCGP AKT Revision — The Whole AKT in 90 Hours of Audio",
    template: "%s | Medexia",
  },
  description:
    "MRCGP AKT audio revision with free syllabus-mapped questions, mocks and 90+ hours of audio. Free until 8 July; full audio from £59.",
  keywords: [
    "AKT",
    "MRCGP AKT",
    "RCGP AKT",
    "AKT exam",
    "Applied Knowledge Test",
    "AKT revision",
    "AKT revision plan",
    "AKT revision timetable",
    "AKT audio revision",
    "AKT audiobook",
    "AKT question bank",
    "AKT mock exam",
    "AKT exam dates",
    "AKT exam format",
    "AKT exam day",
    "Pearson VUE AKT",
    "AKT pass rate",
    "AKT results",
    "AKT retake",
    "AKT feedback reports",
    "AKT statistics",
    "AKT statistics formulas",
    "AKT NNT",
    "AKT sensitivity specificity",
    "AKT prescribing",
    "AKT medication safety",
    "AKT medication monitoring",
    "AKT confidentiality",
    "AKT safeguarding",
    "AKT data protection",
    "AKT neurology",
    "AKT gait disturbance",
    "AKT headache red flags",
    "AKT children",
    "AKT paediatrics",
    "AKT paediatric cancer",
    "AKT dermatology",
    "AKT skin cancer",
    "AKT rashes",
    "AKT syllabus",
    "AKT curriculum",
    "AKT exam fee",
    "AKT eligibility",
    "AKT evidence based practice",
    "MRCGP revision",
    "GP training",
    "AKT Navigator",
    "Medexia",
    "free AKT questions",
  ],
  openGraph: {
    title: "MRCGP AKT Revision — The Whole AKT in 90 Hours of Audio",
    description:
      "Free syllabus-mapped AKT questions, mocks and 90+ hours of audio across all 32 topics. Free until 8 July; full audio from £59.",
    type: "website",
    url: "https://medexia-akt.com",
    siteName: "AKT Navigator by Medexia",
    // og:image auto-wired from src/app/opengraph-image.tsx — do not set
    // `images` here or it overrides the file-based convention.
  },
  twitter: {
    card: "summary_large_image",
    title: "MRCGP AKT Revision — The Whole AKT in 90 Hours of Audio",
    description:
      "Free syllabus-mapped AKT questions, mocks and 90+ hours of audio across all 32 topics. Free until 8 July; full audio from £59.",
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
      legalName: "Medexia Ltd",
      alternateName: "Medexia AKT Navigator",
      url: "https://medexia-akt.com",
      logo: {
        "@type": "ImageObject",
        url: "https://medexia-akt.com/app-icon.png",
      },
      email: "support@medexia-akt.com",
      description:
        "Medexia builds AKT Navigator, an independent audio-first revision resource for the RCGP MRCGP Applied Knowledge Test (AKT). It is not affiliated with, or endorsed by, the Royal College of General Practitioners.",
      knowsAbout: [
        "MRCGP Applied Knowledge Test",
        "AKT revision",
        "GP specialty training",
        "Audio-based medical education",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://medexia-akt.com/#website",
      name: "AKT Navigator by Medexia",
      url: "https://medexia-akt.com",
      inLanguage: "en-GB",
      description:
        "Audio-first MRCGP AKT revision: free syllabus-mapped questions, mock exams with AI debriefs, and 90+ hours of audio across all 32 RCGP curriculum topics.",
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
