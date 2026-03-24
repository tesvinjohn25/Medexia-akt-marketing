import type { MetadataRoute } from "next";
import { aktTopics } from "@/data/akt-topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const topicPages = aktTopics.map((topic) => ({
    url: `https://medexia-akt.com/topics/${topic.slug}`,
    lastModified: new Date("2026-03-24"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://medexia-akt.com/",
      lastModified: new Date("2026-03-24"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...topicPages,
  ];
}
