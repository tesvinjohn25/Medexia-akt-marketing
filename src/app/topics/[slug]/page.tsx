import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { aktTopics } from "@/data/akt-topics";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return aktTopics.map((t) => ({ slug: t.slug }));
}

const topicTitleOverrides: Record<string, string> = {
  "continuity-quality-safety-prescribing": "Prescribing, QI and Safety — AKT",
};

function compactMetaDescription(description: string) {
  if (description.length <= 160) return description;

  const trimmed = description.slice(0, 157);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 120 ? lastSpace : 157)}...`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = aktTopics.find((t) => t.slug === slug);
  if (!topic) return {};

  const title = topicTitleOverrides[topic.slug] ?? `${topic.name} — AKT`;
  const description = compactMetaDescription(
    topic.metaDescription || topic.description,
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://medexia-akt.com/topics/${topic.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://medexia-akt.com/topics/${topic.slug}`,
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = aktTopics.find((t) => t.slug === slug);
  if (!topic) notFound();

  const related = aktTopics
    .filter((t) => t.category === topic.category && t.slug !== topic.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `AKT: ${topic.name}`,
    description: topic.description,
    provider: {
      "@type": "Organization",
      name: "Medexia",
      url: "https://medexia-akt.com",
    },
    isAccessibleForFree: true,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: topic.name,
      targetDescription: topic.description,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://medexia-akt.com/" },
          { name: "AKT Topics", url: "https://medexia-akt.com/topics" },
          {
            name: topic.name,
            url: `https://medexia-akt.com/topics/${topic.slug}`,
          },
        ]}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[720px]">
          {/* Category badge */}
          <div
            className="inline-flex items-center rounded-md px-2 py-[3px] mb-4"
            style={{
              background: "rgba(167,139,250,.08)",
              border: "1px solid rgba(167,139,250,.18)",
            }}
          >
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{ color: "rgba(167,139,250,.85)" }}
            >
              {topic.category}
            </span>
          </div>

          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            {topic.name}
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            {topic.description}
          </p>

          {/* Aliases / keywords */}
          {topic.aliases.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {topic.aliases.map((alias) => (
                <span
                  key={alias}
                  className="rounded-full px-3 py-1 text-[12px] font-medium"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--fg-muted)",
                  }}
                >
                  {alias}
                </span>
              ))}
            </div>
          )}

          {/* Enriched content */}
          {topic.content && (
            <div
              className="mt-10 text-[16px] leading-[1.7] space-y-4"
              style={{ color: "var(--fg-mid)" }}
            >
              {topic.content.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8">
            <a
              className="btn-primary inline-block text-[16px]"
              href="https://app.medexia-akt.com"
            >
              Start free practice &rarr;
            </a>
          </div>

          {/* Explore more */}
          <div className="mt-12">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Explore more
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  href: "/how-to-pass-the-akt",
                  title: "How to pass the AKT",
                  desc: "Complete study guide with exam strategy",
                },
                {
                  href: "/akt-audio-revision",
                  title: "AKT audio revision",
                  desc: "90+ hours of audio across all 32 topics",
                },
                {
                  href: "/akt-mock-exam",
                  title: "AKT mock exams",
                  desc: "Mocks from thousands of free questions",
                },
                {
                  href: "/best-akt-question-bank",
                  title: "Best AKT question bank",
                  desc: "Honest comparison of all options",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl p-4 transition-colors hover:bg-white/[.03]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.title}
                  </h3>
                  <p
                    className="mt-1 text-[13px]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {link.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Related topics */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2
                className="text-[13px] tracking-[0.22em] uppercase font-semibold mb-4"
                style={{ color: "rgba(167,139,250,.85)" }}
              >
                Related {topic.category} topics
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/topics/${r.slug}`}
                    className="block rounded-xl p-4 transition-colors hover:bg-white/[.03]"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <h3
                      className="text-[15px] font-semibold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {r.name}
                    </h3>
                    <p
                      className="mt-1 text-[13px] leading-[1.5] line-clamp-2"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {r.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* E-E-A-T trust signal */}
          <p
            className="mt-10 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Content aligned to NICE CKS guidelines and the RCGP AKT curriculum.
            Last reviewed March 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
