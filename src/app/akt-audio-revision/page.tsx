import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { aktTopics } from "@/data/akt-topics";

export const metadata: Metadata = {
  title: "AKT Audio Revision — 50+ Hours Free | Listen on Your Commute",
  description:
    "Over 50 hours of free AKT audio revision across all 32 RCGP topics. Listen on your commute, at the gym, or between patients. Covers everything from cardiovascular to evidence-based practice.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-audio-revision",
  },
  openGraph: {
    title: "AKT Audio Revision — 50+ Hours Free",
    description:
      "Over 50 hours of free AKT audio revision across all 32 RCGP topics. Listen anywhere, learn everywhere.",
    type: "website",
    url: "https://medexia-akt.com/akt-audio-revision",
  },
};

export default function AktAudioRevisionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AKT Audio Revision by AKT Navigator",
    description:
      "Over 50 hours of audio revision covering all 32 RCGP AKT curriculum topics. Free for the April and July 2026 sittings.",
    provider: {
      "@type": "Organization",
      name: "Medexia",
      url: "https://medexia-akt.com",
    },
    isAccessibleForFree: true,
    courseMode: "audio",
    numberOfCredits: "50+ hours",
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
            AKT Audio Revision
          </h1>

          <p
            className="mt-4 text-[16px] md:text-[18px] leading-[1.7]"
            style={{ color: "var(--fg-mid)" }}
          >
            Over 50 hours of audio covering every topic in the RCGP AKT
            curriculum. Built for GP trainees who are short on time and need
            revision that fits around clinical work.
          </p>

          {/* Key stats */}
          <div className="mt-8 grid gap-4 grid-cols-3">
            {[
              { stat: "50+", label: "Hours of audio" },
              { stat: "32", label: "AKT topics" },
              { stat: "Free", label: "For April & July" },
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
              Most GP trainees revise during stolen moments: the drive to work,
              waiting for a clinic to start, walking the dog. Screen-based
              revision does not fit into those gaps. Audio does.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              AKT Navigator gives you over 50 hours of audio across all 32
              curriculum topics. That is more than seven times what Arora Medical
              Education offers (7 hours), and it is completely free for the April
              and July 2026 sittings.
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
                  text: "Some trainees listen in the evening instead of reading a textbook. The conversational tone makes it easier to absorb after a long day.",
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

          {/* Comparison */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              How it compares
            </h2>
            <div
              className="mt-4 overflow-x-auto rounded-xl"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <table className="w-full text-[14px]">
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--fg-high)" }}
                    >
                      Provider
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--fg-high)" }}
                    >
                      Audio hours
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--fg-high)" }}
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody style={{ color: "var(--fg-mid)" }}>
                  <tr
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: "rgba(109,106,232,.04)",
                    }}
                  >
                    <td className="p-3 font-semibold" style={{ color: "var(--brand-iris)" }}>
                      AKT Navigator
                    </td>
                    <td className="p-3">50+ hours</td>
                    <td className="p-3">Free</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="p-3">Arora Medical Education</td>
                    <td className="p-3">~7 hours</td>
                    <td className="p-3">Paid</td>
                  </tr>
                  <tr>
                    <td className="p-3">GP on the Move</td>
                    <td className="p-3">Varies</td>
                    <td className="p-3">Paid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              className="btn-primary inline-block text-[16px]"
              href="https://app.medexia-akt.com"
            >
              Start listening free &rarr;
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
