import type { MetadataRoute } from "next";
import { aktTopics } from "@/data/akt-topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const topicPages = aktTopics.map((topic) => ({
    url: `https://medexia-akt.com/topics/${topic.slug}`,
    lastModified: new Date("2026-06-10"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const contentPages = [
    {
      url: "https://medexia-akt.com/demo",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: "https://medexia-akt.com/how-to-pass-the-akt",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: "https://medexia-akt.com/best-akt-question-bank",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: "https://medexia-akt.com/akt-exam-dates",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/akt-audio-revision",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/akt-mock-exam",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/topics",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://medexia-akt.com/faq",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [
    {
      url: "https://medexia-akt.com/",
      lastModified: new Date("2026-06-10"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...contentPages,
    ...topicPages,
  ];
}
