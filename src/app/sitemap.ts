import type { MetadataRoute } from "next";
import { aktTopics } from "@/data/akt-topics";

const LAST_MODIFIED = new Date("2026-06-19");

export default function sitemap(): MetadataRoute.Sitemap {
  const topicPages = aktTopics.map((topic) => ({
    url: `https://medexia-akt.com/topics/${topic.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const contentPages = [
    {
      url: "https://medexia-akt.com/demo",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: "https://medexia-akt.com/how-to-pass-the-akt",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: "https://medexia-akt.com/akt-revision-plan",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/best-akt-question-bank",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: "https://medexia-akt.com/akt-exam-dates",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/akt-exam-format",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-exam-day",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/akt-pass-rate",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-results-and-retakes",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/akt-feedback-reports",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-statistics",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-statistics-formulas",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/akt-prescribing-and-medication-safety",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-confidentiality-safeguarding-data-protection",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-neurology",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-children-young-people",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-dermatology",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-cardiovascular",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-respiratory",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-diabetes-endocrinology",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-renal-urology",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-musculoskeletal",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-gastroenterology",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-ent-speech-hearing",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-eyes-vision",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-haematology",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-allergy-immunology",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-infectious-diseases-travel",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-minor-illness-urgent-care",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-mental-health",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-womens-health",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-maternity-reproductive-health",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-syllabus",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-exam-fee",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-audio-revision",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/akt-mock-exam",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/topics",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/faq",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [
    {
      url: "https://medexia-akt.com/",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...contentPages,
    ...topicPages,
  ];
}
