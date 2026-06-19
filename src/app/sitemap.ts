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
      url: "https://medexia-akt.com/akt-pass-rate",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: "https://medexia-akt.com/akt-feedback-reports",
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
