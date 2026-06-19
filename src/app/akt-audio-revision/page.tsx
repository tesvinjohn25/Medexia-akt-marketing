import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { aktTopics } from "@/data/akt-topics";

export const metadata: Metadata = {
  title: "MRCGP AKT Audio Revision — 90+ Hours",
  description:
    "90+ hours of MRCGP AKT audio revision across all 32 RCGP topics. Listen on commutes, walks and clinics. Free until 8 July; audio from £59.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-audio-revision",
  },
  openGraph: {
    title: "MRCGP AKT Audio Revision — 90+ Hours",
    description:
      "Audio-first MRCGP AKT revision covering all 32 RCGP topics in 90+ hours. Free until 8 July; full audio from £59.",
    type: "website",
    url: "https://medexia-akt.com/akt-audio-revision",
  },
};

const sourceLinks = [
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-introduction",
    label: "RCGP: Introducing the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-preparing",
    label: "RCGP: Preparing for the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum/clinical-topic-guides",
    label: "RCGP: 32 curriculum topic guides",
  },
  {
    href: "https://cks.nice.org.uk/",
    label: "NICE CKS",
  },
  {
    href: "https://bnf.nice.org.uk/",
    label: "BNF",
  },
];

const audioFaqs = [
  {
    question: "Is there MRCGP AKT audio revision?",
    answer:
      "Yes. AKT Navigator provides 90+ hours of MRCGP AKT audio revision covering all 32 RCGP curriculum topics, built for commutes, walks, childcare and low-energy revision days.",
  },
  {
    question: "What does the AKT audio library cover?",
    answer:
      "The audio library covers clinical medicine, evidence-based practice and statistics, and organisation and management topics across the RCGP curriculum topic guides.",
  },
  {
    question: "How much does full AKT audio access cost?",
    answer:
      "Full access is free until 8 July 2026. Early Access is £59 before 8 July for 4 months of access starting 8 July; standard Full Audio Access is £79 for 4 months from 8 July onwards. Questions remain free.",
  },
];

export default function AktAudioRevisionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: "MRCGP AKT Audio Revision by AKT Navigator",
        description:
          "A 90+ hour audio-first MRCGP AKT revision library covering all 32 RCGP curriculum topics for GP trainees.",
        provider: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "GP trainee",
        },
        courseMode: "audio",
        numberOfCredits: "90+ hours",
        teaches: [
          "MRCGP Applied Knowledge Test revision",
          "RCGP AKT curriculum",
          "Evidence-based practice and statistics",
          "Clinical medicine for general practice",
          "Organisation and management for general practice",
        ],
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "59",
          highPrice: "79",
          priceCurrency: "GBP",
          offerCount: 2,
          description:
            "Full AKT Navigator access is free until 8 July 2026. Early Access is £59 before then for access starting 8 July; standard full audio access is £79 for 4 months.",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: audioFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const clinical = aktTopics.filter((t) => t.category === "Clinical");
  const professional = aktTopics.filter((t) => t.category === "Professional");
  const lifeStages = aktTopics.filter((t) => t.category === "Life Stages");

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://medexia-akt.com/" },
          {
            name: "MRCGP AKT Audio Revision",
            url: "https://medexia-akt.com/akt-audio-revision",
          },
        ]}
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
            MRCGP AKT audio revision in 90+ hours
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            AKT Navigator is an audio-first revision library for GP trainees
            preparing for the RCGP MRCGP Applied Knowledge Test. It covers all
            32 RCGP curriculum topics in over 90 hours, so you can revise while
            commuting, walking, doing childcare or recovering after clinic.
          </p>

          {/* Key stats */}
          <div className="mt-8 grid gap-4 grid-cols-3">
            {[
              { stat: "90+", label: "Hours of audio" },
              { stat: "32", label: "RCGP topics" },
              { stat: "£59", label: "Early access" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-[24px] font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--brand-iris)",
                  }}
                >
                  {item.stat}
                </div>
                <div
                  className="text-[12px] mt-1"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Why audio */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Why audio works for the AKT
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              The AKT is broad: the RCGP describes it as a computer-based exam
              with clinical knowledge, evidence-based practice and primary care
              organisation questions. That breadth is hard to cover only through
              screen time. Audio lets you keep moving through the syllabus
              during the parts of the day where reading is unrealistic.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              AKT Navigator gives you over 90 hours of audio across all 32
              RCGP curriculum topics. Full access is free until 8 July 2026.
              After that, questions stay free and full audio access starts from
              £59 Early Access before standard £79 pricing begins.
            </p>
          </div>

          {/* How trainees use it */}
          <div className="mt-10">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              How trainees use it
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "On the commute",
                  text: "Listen to a topic on the way to work. By the time you arrive, you have covered an entire subject area without opening a book.",
                },
                {
                  title: "At the gym",
                  text: "Turn a workout into a revision session. Thirty minutes on the treadmill becomes thirty minutes of dermatology or cardiovascular medicine.",
                },
                {
                  title: "Between patients",
                  text: "Got ten minutes between clinics? Pop in your earphones and revise a subtopic. The audio picks up where you left off.",
                },
                {
                  title: "Winding down",
                  text: "Some trainees listen in the evening instead of reading a textbook. The clear audio style makes it easier to absorb after a long day.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {(item as { href?: string }).href ? (
                      <a
                        href={(item as unknown as { href: string }).href}
                        className="transition-colors"
                        style={{ color: "var(--brand-violet-light)" }}
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p
                    className="mt-1 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Topic coverage */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Full topic coverage
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Audio revision is available for every topic in the RCGP AKT
              curriculum:
            </p>

            {[
              { label: "Clinical", topics: clinical },
              { label: "Professional", topics: professional },
              { label: "Life Stages", topics: lifeStages },
            ].map((group) => (
              <div key={group.label} className="mt-6">
                <h3
                  className="text-[13px] tracking-[0.18em] uppercase font-semibold mb-2"
                  style={{ color: "rgba(167,139,250,.85)" }}
                >
                  {group.label} ({group.topics.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.topics.map((topic) => (
                    <a
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className="rounded-full px-3 py-1 text-[12px] font-medium transition-colors hover:bg-white/[.05]"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                        color: "var(--fg-muted)",
                      }}
                    >
                      {topic.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Audio access */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              What full audio access adds
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "A full 90+ hour AKT audiobook library",
                  text: "Listen through complete topic coverage rather than short one-off summaries.",
                },
                {
                  title: "Statistics support for evidence-based practice",
                  text: "Paid access includes the statistics course, over 2 hours of statistics explainer videos, and evidence-based practice revision.",
                },
                {
                  title: "Dermatology Navigator",
                  text: "Image-led dermatology revision is included in paid access, alongside the audio library. Use the AKT dermatology guide for rashes, skin cancer recognition and red flags.",
                  href: "/akt-dermatology",
                },
                {
                  title: "Future premium audio upgrades",
                  text: "Any premium audio upgrades released during your access period are included.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-1 text-[14px] leading-[1.6]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Source links */}
          <div className="mt-12">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Sources used for syllabus alignment
            </h2>
            <p
              className="mt-3 text-[14px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              AKT Navigator is independent of the RCGP, but the audio curriculum
              is mapped against the public RCGP AKT and GP curriculum guidance,
              with clinical checking against NICE CKS and the BNF where
              relevant.
            </p>
            <div className="mt-4 grid gap-2">
              {sourceLinks.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl px-4 py-3 text-[13px] font-medium transition-colors hover:bg-white/[.05]"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--fg-high)",
                  }}
                >
                  {source.label} &rarr;
                </a>
              ))}
            </div>
          </div>

          {/* Answer-first FAQ */}
          <div className="mt-12">
            <h2
              className="text-[20px] md:text-[24px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              MRCGP AKT audio revision FAQ
            </h2>
            <div className="mt-4 grid gap-3">
              {audioFaqs.map((faq) => (
                <section
                  key={faq.question}
                  className="rounded-xl p-4"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.65]"
                    style={{ color: "var(--fg-mid)" }}
                  >
                    {faq.answer}
                  </p>
                </section>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              className="btn-primary inline-block text-[16px]"
              href="https://app.medexia-akt.com"
            >
              Start free &rarr;
            </a>
          </div>

          {/* Trust signal */}
          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Audio content aligned to NICE CKS and the RCGP curriculum. Last
            reviewed March 2026.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
