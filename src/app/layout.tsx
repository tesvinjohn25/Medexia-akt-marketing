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
  openGraph: {
    title: "AKT Navigator by Medexia — Free AKT Revision for GP Trainees",
    description:
      "Free RCGP AKT revision for GP trainees. 20,000+ questions, 50+ hours of audio, adaptive learning, unlimited mock exams and AI-powered debriefs.",
    type: "website",
    url: "https://medexia-akt.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AKT Navigator by Medexia — Free AKT Revision for GP Trainees",
    description:
      "Free RCGP AKT revision for GP trainees. 20,000+ questions, 50+ hours of audio, adaptive learning, unlimited mock exams and AI-powered debriefs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
