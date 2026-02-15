import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://medexia-akt.com"),
  title: {
    default: "Medexia AKT Navigator — Guided revision for the MRCGP AKT",
    template: "%s — Medexia AKT Navigator",
  },
  description:
    "60hrs of audio revision, adaptive learning, and examiner-level explanations. Founding cohort — £35 for everything.",
  openGraph: {
    title: "Medexia AKT Navigator",
    description:
      "60hrs of audio revision, adaptive learning, and examiner-level explanations. Founding cohort — £35 for everything.",
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
      "60hrs of audio revision, adaptive learning, and examiner-level explanations. Founding cohort — £35 for everything.",
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
