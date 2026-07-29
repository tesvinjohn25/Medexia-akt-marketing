import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { TrackedAppLink } from "@/components/marketing/TrackedAppLink";
import { aktTopics } from "@/data/akt-topics";
import { getOfferPhase, phased, type OfferPhase } from "@/lib/offer-phase";

const DEMO_AUDIO = "/demo/audio";

export const metadata: Metadata = {
  title: "MRCGP AKT Audio Revision — 90+ Hours, First 2 Free",
  description:
    "90+ hours of MRCGP AKT audio revision for GP trainees who need to keep revising on commutes, walks and tired evenings. First 2 hours free, no card, plus free-forever questions and mocks.",
  alternates: {
    canonical: "https://medexia-akt.com/akt-audio-revision",
  },
  openGraph: {
    title: "MRCGP AKT Audio Revision — 90+ Hours, First 2 Free",
    description:
      "Audio-first MRCGP AKT revision covering all 32 RCGP topics in 90+ hours, with free-forever questions, timed mocks and structured explanations.",
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

const getAudioFaqs = (phase: OfferPhase) => [
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
    question: "Is audio revision enough for the AKT?",
    answer:
      "Audio revision is useful for coverage and repetition, but it should not replace question practice. Use audio to keep moving through the syllabus during commutes or low-energy time, then use questions and mocks to test exam decisions and timing.",
  },
  {
    question: "How should I combine AKT audio with questions?",
    answer:
      "Use questions to find weak areas, then use audio to reinforce those topics between clinics, on walks or during travel. Re-test with short question blocks or timed mocks so the learning becomes exam-ready.",
  },
  {
    question: "When should I use AKT audio revision?",
    answer:
      "Use AKT audio when reading is unrealistic: commuting, exercising, cooking, childcare, walking or low-energy evenings after clinic. Keep your most alert time for questions, mock exams and reviewing mistakes.",
  },
  {
    question: "Can I try AKT audio for free?",
    answer: phased(
      phase,
      "Yes. Full access is free until 8 July 2026. After that, Free Practice includes 2 hours of AKT audio across any audiobook, and you can use the demo route to hear a sample before committing.",
      "Yes. Free Practice includes 2 hours of AKT audio across any audiobook, and you can use the demo route to hear a sample before committing.",
    ),
  },
  {
    question: "How much free AKT audio is included?",
    answer: phased(
      phase,
      "After 8 July 2026, Free Practice includes 2 hours of AKT audio across any audiobook. Full access to the 90+ hour library is the paid upgrade.",
      "Free Practice includes 2 hours of AKT audio across any audiobook. Full access to the 90+ hour library is the paid upgrade.",
    ),
  },
  {
    question: "How much does full AKT audio access cost?",
    answer: phased(
      phase,
      "Full access is free until 8 July 2026. Early Access is £59 before 8 July for 4 months of access starting 8 July; standard Full Audio Access is £79 for 4 months from 8 July onwards. Questions remain free.",
      "Full Audio Access is £79 for 4 months and unlocks the complete 90+ hour AKT audio library. Questions, mocks and your first 2 hours of audio remain free.",
    ),
  },
];

export default function AktAudioRevisionPage() {
  const phase = getOfferPhase();
  const audioFaqs = getAudioFaqs(phase);
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
          lowPrice: phased(phase, "59", "0"),
          highPrice: "79",
          priceCurrency: "GBP",
          offerCount: 2,
          description: phased(
            phase,
            "Full AKT Navigator access is free until 8 July 2026. Early Access is £59 before then for access starting 8 July; standard full audio access is £79 for 4 months.",
            "Free Practice includes 2 hours of AKT audio. Full Audio Access is £79 for 4 months and unlocks the complete 90+ hour library.",
          ),
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

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, #000 0%, rgba(7,5,14,.95) 65%, transparent 100%)",
          }}
        />
        <div className="hero-noise" />
        <div
          className="container-x relative grid gap-7 pb-10 md:grid-cols-[1.02fr_.98fr] md:items-center md:gap-12 md:pb-14"
          style={{
            paddingTop:
              "calc(env(safe-area-inset-top, 0px) + clamp(88px, 10vw, 120px))",
          }}
        >
          <div className="max-w-[620px]">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(236,72,153,.88)" }}
            >
              90+ hours · all 32 RCGP topic areas
            </p>
            <h1
              className="mt-4 text-[38px] leading-[1.02] md:text-[54px] lg:text-[62px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.045em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              MRCGP AKT audio revision for the hours you can&rsquo;t read.
            </h1>
            <p
              className="mt-5 max-w-[560px] text-[16px] leading-[1.6] md:text-[18px]"
              style={{ color: "rgba(232,236,255,.76)" }}
            >
              Cover the AKT syllabus on commutes, walks and tired evenings.
              Hear a real chapter now, with no signup, then use your first two
              hours of audio free.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedAppLink
                href={DEMO_AUDIO}
                intent="demo"
                className="btn-primary inline-block text-[15px]"
              >
                Listen to a free sample &rarr;
              </TrackedAppLink>
              <TrackedAppLink
                href="/join/audio"
                intent="start_audio"
                className="btn-secondary inline-flex items-center text-[15px]"
              >
                Start 2 free hours
              </TrackedAppLink>
            </div>
            <p
              className="mt-4 text-[12px] leading-[1.5]"
              style={{ color: "var(--fg-mid)" }}
            >
              Sample: no account needed. Free audio allowance: no card needed.
              Questions and timed mocks stay free.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[280px] md:max-w-[300px]">
            <div
              className="pointer-events-none absolute -inset-10 rounded-full"
              aria-hidden
              style={{
                background:
                  "radial-gradient(closest-side, rgba(236,72,153,.18), rgba(167,139,250,.12) 48%, transparent 80%)",
                filter: "blur(34px)",
              }}
            />
            <div
              className="relative overflow-hidden rounded-[42px] p-[9px]"
              style={{
                background: "#06070b",
                border: "1px solid rgba(255,255,255,.14)",
                boxShadow:
                  "0 45px 130px rgba(0,0,0,.62), 0 0 80px rgba(155,107,255,.16)",
              }}
            >
              <Image
                src="/appshots/audio-player-current-430x932.png"
                alt="AKT Navigator Neurology audiobook player showing chapter controls and chapter list"
                width={430}
                height={932}
                sizes="(max-width: 767px) 72vw, 300px"
                className="block h-auto w-full rounded-[33px]"
              />
            </div>
            <p
              className="mt-3 text-center text-[12px] font-medium"
              style={{ color: "var(--fg-mid)" }}
            >
              Neurology audiobook player in AKT Navigator
            </p>
          </div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{ paddingTop: "clamp(16px, 3vw, 32px)" }}
      >
        <div className="container-x max-w-[720px]">
          {/* Why audio */}
          <div className="mt-12">
            <h2
              className="text-[24px] md:text-[28px] leading-[1.15]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              When reading is not happening, revision can still happen.
            </h2>
            <p
              className="mt-4 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              Audio revision is not a replacement for questions. It is the way
              your revision keeps moving on the days when another screen-based
              session is unrealistic. Use it in the commute, on a walk, at the
              gym, during cooking, around childcare or on a low-energy evening
              after clinic.
            </p>
            <p
              className="mt-3 text-[16px] leading-[1.7]"
              style={{ color: "var(--fg-mid)" }}
            >
              {phased(
                phase,
                "Use the free audio allowance to test whether AKT audio fits your life. After 8 July, Free Practice includes 2 hours of AKT audio; full access to the 90+ hour library is the paid upgrade.",
                "Use the free audio allowance to test whether AKT audio fits your life. Free Practice includes 2 hours of AKT audio; full access to the 90+ hour library is the paid upgrade at £79 for 4 months.",
              )}
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
                  text: "Turn a workout into a revision session. A treadmill or weights session can become dermatology, cardiovascular medicine or statistics reinforcement.",
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
              Official sources
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
            <TrackedAppLink
              className="btn-primary inline-block text-[16px]"
              href="/join/audio"
              intent="start_audio"
            >
              Start 2 free hours of AKT audio &rarr;
            </TrackedAppLink>
          </div>

          {/* Trust signal */}
          <p
            className="mt-6 text-[12px]"
            style={{ color: "var(--fg-muted)" }}
          >
            Independent revision resource; not affiliated with or endorsed by
            the RCGP. For clinical decisions, use current official guidance.
          </p>
        </div>
      </section>

      <FinalCTA />
      <MinimalFooter />
    </main>
  );
}
