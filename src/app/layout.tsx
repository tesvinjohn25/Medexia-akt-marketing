import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://medexia-akt.com"),
  title: {
    default: "Medexia AKT Navigator — Free MRCGP AKT revision for April & July",
    template: "%s — Medexia AKT Navigator",
  },
  description:
    "Free AKT revision for the April & July sittings. 50+ hours of audio, adaptive learning, deep explanations. Like a senior GP sat next to you.",
  openGraph: {
    title: "Medexia AKT Navigator — Free for April & July",
    description:
      "Free AKT revision for the April & July sittings. 50+ hours of audio, adaptive learning, deep explanations. Like a senior GP sat next to you.",
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
    title: "Medexia AKT Navigator — Free for April & July",
    description:
      "Free AKT revision for the April & July sittings. 50+ hours of audio, adaptive learning, deep explanations. Like a senior GP sat next to you.",
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
