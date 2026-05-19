import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { TopicGrid } from "@/components/sections/TopicGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { aktTopics } from "@/data/akt-topics";

export const metadata: Metadata = {
  title: "All 32 AKT Topics — Full RCGP Curriculum Coverage",
  description:
    "Every topic in the RCGP AKT curriculum. Clinical (80%), Professional (10%), and Life Stages. Free AKT questions and explanations, with full audio access from £59.",
  alternates: {
    canonical: "https://medexia-akt.com/topics",
  },
  openGraph: {
    title: "All 32 AKT Topics — Full RCGP Curriculum Coverage",
    description:
      "Every topic in the RCGP AKT curriculum with dedicated audio, questions, and explanations.",
    type: "website",
    url: "https://medexia-akt.com/topics",
  },
};

export default function TopicsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AKT Topics — Full RCGP Curriculum",
    description:
      "All 32 topics covered by the MRCGP AKT across Clinical, Professional, and Life Stages.",
    url: "https://medexia-akt.com/topics",
    hasPart: aktTopics.map((t) => ({
      "@type": "Course",
      name: t.name,
      url: `https://medexia-akt.com/topics/${t.slug}`,
      description: t.description,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <section
        className="section-padding"
        style={{ paddingTop: "calc(80px + 48px)" }}
      >
        <div className="container-x max-w-[720px]">
          <h1
            className="text-[32px] md:text-[44px] leading-[1.1]"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
            }}
          >
            All 32 AKT topics
          </h1>
          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            The RCGP AKT curriculum spans 32 topics across three areas.
            Clinical medicine makes up around 80% of the exam. Evidence in
            practice and organisation/management each make up 10%. Every topic
            below has free question practice, deep structured explanations, and
            audio-first revision in AKT Navigator.
          </p>
        </div>
      </section>

      <TopicGrid showHeader={false} />
      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
