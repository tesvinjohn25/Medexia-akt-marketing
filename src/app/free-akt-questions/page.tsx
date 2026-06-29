import type { Metadata } from "next";
import { FreeAktQuestionsJsonLd } from "@/components/FreeAktQuestionsJsonLd";
import { Nav } from "@/components/Nav";
import { FreeAktQuestionsLanding } from "@/components/sections/FreeAktQuestionsLanding";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import {
  FREE_AKT_QUESTIONS_CANONICAL,
  FREE_AKT_QUESTIONS_DESCRIPTION,
  FREE_AKT_QUESTIONS_SOCIAL_DESCRIPTION,
  FREE_AKT_QUESTIONS_TITLE,
} from "@/data/free-akt-questions";

export const metadata: Metadata = {
  title: {
    absolute: FREE_AKT_QUESTIONS_TITLE,
  },
  description: FREE_AKT_QUESTIONS_DESCRIPTION,
  alternates: {
    canonical: FREE_AKT_QUESTIONS_CANONICAL,
  },
  openGraph: {
    title: FREE_AKT_QUESTIONS_TITLE,
    description: FREE_AKT_QUESTIONS_SOCIAL_DESCRIPTION,
    type: "website",
    url: FREE_AKT_QUESTIONS_CANONICAL,
    siteName: "AKT Navigator by Medexia",
  },
  twitter: {
    card: "summary_large_image",
    title: FREE_AKT_QUESTIONS_TITLE,
    description: FREE_AKT_QUESTIONS_SOCIAL_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FreeAktQuestionsPage() {
  return (
    <main>
      <FreeAktQuestionsJsonLd />
      <Nav />
      <FreeAktQuestionsLanding sourceSurface="free_questions_landing" />
      <MinimalFooter />
    </main>
  );
}
