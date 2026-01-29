import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://medexia-akt.com"),
  title: {
    default: "Medexia AKT Navigator — Guided revision for the MRCGP AKT",
    template: "%s — Medexia AKT Navigator",
  },
  description:
    "The AKT covers everything. Medexia covers what matters. Guided revision for UK GP trainees with senior-colleague explanations and a clear plan.",
  openGraph: {
    title: "Medexia AKT Navigator",
    description:
      "Guided revision for the MRCGP AKT. Try the demo and feel the difference in under 90 seconds.",
    type: "website",
    url: "https://medexia-akt.com",
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
