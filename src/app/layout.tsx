import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://medexia-akt.com"),
  title: {
    default: "Medexia AKT Navigator — Guided revision for the MRCGP AKT",
    template: "%s — Medexia AKT Navigator",
  },
  description:
    "RCGP AKT revision with 60hrs of audio, adaptive learning, and examiner-level explanations. Founding cohort — from £35 with a friend.",
  openGraph: {
    title: "Medexia AKT Navigator",
    description:
      "RCGP AKT revision with 60hrs of audio, adaptive learning, and examiner-level explanations. Founding cohort — from £35 with a friend.",
    type: "website",
    url: "https://medexia-akt.com",
    images: [
      {
        url: "https://medexia-akt.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medexia AKT Navigator",
    description:
      "RCGP AKT revision with 60hrs of audio, adaptive learning, and examiner-level explanations. Founding cohort — from £35 with a friend.",
    images: ["https://medexia-akt.com/og-image.png"],
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
      <body>{children}</body>
    </html>
  );
}
