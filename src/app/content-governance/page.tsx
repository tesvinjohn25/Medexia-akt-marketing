import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { AnimatedBulletList } from "@/components/AnimatedBulletList";
import { Nav } from "@/components/Nav";
import { MinimalFooter } from "@/components/sections/MinimalFooter";

const CANONICAL = "https://medexia-akt.com/content-governance";

const title = "Content governance | AKT Navigator";
const description =
  "How AKT Navigator creates, validates, reports and corrects AI-assisted MRCGP AKT practice questions. Learn what we check, what we do not claim, and how to use the free question bank safely.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: CANONICAL,
    siteName: "AKT Navigator by Medexia",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const heroBadges = [
  "AI-assisted",
  "UK primary-care lens",
  "Report button on every question",
  "Revision only",
  "Not RCGP-endorsed",
] as const;

const pipelineSteps = [
  {
    label: "Draft",
    title: "Draft the SBA",
    body: "Questions start as GP-relevant single best answer items with a short clinical vignette, five same-type answer options and a near-miss distractor.",
  },
  {
    label: "Validate",
    title: "Validate the answer",
    body: "The marked answer is checked from a UK primary-care perspective using a source hierarchy such as NICE guidance, NICE CKS, BNF/BNFC, DVLA, FSRH/UKMEC, UKHSA and legacy PHE resources where relevant.",
  },
  {
    label: "Harden",
    title: "Harden the reasoning",
    body: "The stem is refined so the question tests the decisive clinical detail rather than obvious recall. A tempting near-miss should be plausible, but still wrong in this scenario.",
  },
  {
    label: "Explain",
    title: "Build the teaching explanation",
    body: "Explanations are structured around the key clue, what the question is testing, the common trap, why the other options are wrong and the AKT learning point.",
  },
  {
    label: "Correct",
    title: "Report and correct",
    body: "Every question and explanation has a report button. Users can flag unclear, unsafe, outdated, non-AKT-like or possibly wrong items. Reports feed into the review/correction process.",
  },
] as const;

const checkItems = [
  "wrong marked answer",
  "mixed answer types",
  "obvious/non-discriminating question",
  "stem gives away the answer",
  "near-miss distractor is not genuinely tempting",
  "explanation is too vague",
  "wrong-answer explanations lack a specific reason",
  "guideline-sensitive answer needs cross-checking",
  "unsafe or outdated clinical implication",
  "not AKT-like wording",
] as const;

const reportCategories = [
  "Possible wrong answer",
  "Outdated guidance",
  "Unsafe clinical implication",
  "Unclear wording",
  "Not AKT-like",
  "Explanation too vague",
  "Typo / formatting issue",
] as const;

const doNotClaimItems = [
  "We do not claim AKT Navigator is affiliated with or endorsed by the RCGP.",
  "The free question bank is AI-assisted, not doctor-written.",
  "The free question bank is not individually clinician-reviewed item by item.",
  "We do not claim our explanations replace NICE CKS, BNF/BNFC or official guidance.",
  "We do not claim readiness estimates guarantee an exam result.",
  "We do not provide clinical advice.",
  "We do not recommend using AKT Navigator as your only AKT resource.",
] as const;

const goodForItems = [
  "extra SBA reps",
  "timed mock practice",
  "identifying weak areas",
  "learning from wrong-answer explanations",
  "revising during commutes or low-energy time with audio",
] as const;

const crossCheckItems = [
  "prescribing details",
  "DVLA / fitness to drive",
  "immunisation schedules",
  "contraception eligibility",
  "paediatric dosing",
  "rapidly changing guidance",
  "niche thresholds",
] as const;

const roadmapItems = [
  "public correction/update log",
  "more visible report outcomes",
  "clearer privacy/data wording",
  "clearer handling of guideline-sensitive topics",
  "sample question examples before sign-up",
  "potential clinician/editorial oversight if and when established",
] as const;

const faqs = [
  {
    question: "Are the questions doctor-written?",
    answer:
      "No. The questions are AI-assisted and structured through a content pipeline. We are not claiming that every question is doctor-written or individually clinician-reviewed.",
  },
  {
    question: "Is AKT Navigator endorsed by the RCGP?",
    answer:
      "No. AKT Navigator is independent and is not affiliated with or endorsed by the RCGP.",
  },
  {
    question: "Can I use this as my only AKT resource?",
    answer:
      "We do not recommend using AKT Navigator as your only source. It is best used as a supplementary practice tool alongside official RCGP resources, trainer advice, current NICE CKS/BNF/BNFC guidance and other established resources.",
  },
  {
    question: "What happens if I report a question?",
    answer:
      "Reports feed into the review/correction process. Items may be corrected, rewritten, retired or re-run through the pipeline depending on the issue.",
  },
  {
    question: "Does the app give clinical advice?",
    answer: "No. It is for exam revision only, not clinical advice.",
  },
  {
    question: "Are readiness estimates a pass prediction?",
    answer:
      "No. Readiness estimates are revision guidance, not a guarantee of exam performance.",
  },
  {
    question: "Why is the question bank free?",
    answer:
      "The free practice layer lets trainees practise and judge the explanation style without another upfront subscription. Full audio revision is the optional paid upgrade.",
  },
] as const;

function Badge({ children }: { children: string }) {
  return (
    <span
      className="inline-flex rounded-md border px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.14em]"
      style={{
        background: "rgba(167,139,250,.08)",
        borderColor: "rgba(167,139,250,.18)",
        color: "rgba(197,170,255,.9)",
      }}
    >
      {children}
    </span>
  );
}

function GlassPanel({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`card card-shimmer relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-[760px]">
      {eyebrow ? (
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "rgba(167,139,250,.85)" }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="mt-2 text-[26px] leading-[1.12] md:text-[36px]"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </h2>
      {body ? (
        <p
          className="mt-3 text-[15px] leading-[1.7] md:text-[16px]"
          style={{ color: "rgba(232,236,255,.68)" }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function DotList({ items }: { items: readonly string[] }) {
  return (
    <AnimatedBulletList className="grid gap-3">
      {items.map((item, index) => (
        <li
          key={item}
          className="animated-bullet-item flex gap-3 text-[14px] leading-[1.55]"
          style={
            {
              "--bullet-delay": `${Math.min(index * 70, 420)}ms`,
            } as CSSProperties
          }
        >
          <span
            className="animated-bullet-dot mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{
              background: "rgba(52,211,153,.92)",
              boxShadow: "0 0 14px rgba(52,211,153,.72)",
            }}
            aria-hidden
          />
          <span
            className="animated-bullet-text"
            style={{ color: "rgba(232,236,255,.72)" }}
          >
            {item}
          </span>
        </li>
      ))}
    </AnimatedBulletList>
  );
}

export default function ContentGovernancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://medexia-akt.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Content governance",
            item: CANONICAL,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${CANONICAL}#webpage`,
        url: CANONICAL,
        name: title,
        description,
        isPartOf: {
          "@id": "https://medexia-akt.com/#website",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
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

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <section className="relative overflow-hidden">
        <div className="hero-noise" />
        <div
          className="pointer-events-none absolute inset-0 z-[0]"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, #000 0%, rgba(7,5,14,.96) 56%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-[-18%] top-[10%] z-[0] h-[520px] w-[520px] rounded-full"
          aria-hidden
          style={{
            background:
              "radial-gradient(closest-side, rgba(109,106,232,.20), rgba(155,107,255,.08) 58%, transparent 78%)",
            filter: "blur(30px)",
          }}
        />

        <div
          className="container-x relative z-[1] grid gap-7 pb-8 md:grid-cols-[1.04fr_.96fr] md:items-center md:gap-12 md:pb-12"
          style={{
            paddingTop:
              "calc(env(safe-area-inset-top, 0px) + clamp(90px, 10vw, 122px))",
          }}
        >
          <div className="max-w-[680px]">
            <div className="flex flex-wrap gap-2">
              {heroBadges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>

            <h1
              className="mt-5 text-[38px] leading-[1.02] md:text-[58px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.045em",
                textShadow: "0 22px 70px rgba(0,0,0,.7)",
              }}
            >
              How AKT Navigator{" "}
              <span className="text-shine">questions are built</span>
            </h1>

            <p
              className="mt-5 max-w-[620px] text-[16px] leading-[1.65] md:text-[18px]"
              style={{ color: "rgba(232,236,255,.76)" }}
            >
              AI-assisted does not mean raw AI output. AKT Navigator uses a
              structured content pipeline to draft AKT-style SBAs, validate the
              marked answer from a UK primary-care perspective, strengthen the
              reasoning, build teaching explanations and collect user reports
              for correction.
            </p>

            <p
              className="mt-4 max-w-[620px] text-[13px] leading-[1.65] md:text-[14px]"
              style={{ color: "rgba(232,236,255,.56)" }}
            >
              This is not a claim that every question is doctor-written or
              individually clinician-reviewed. AKT Navigator is independent, not
              affiliated with or endorsed by the RCGP, and intended as a
              supplementary exam-revision tool - not clinical advice and not a sole
              source of truth.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/free-akt-questions" className="btn-primary inline-block text-[15px]">
                Start free AKT questions
              </Link>
              <a
                href="#what-we-do-not-claim"
                className="btn-secondary inline-flex items-center text-[15px]"
              >
                Read the caveats
              </a>
            </div>
          </div>

          <GlassPanel
            className="p-5 md:p-6"
            style={{
              background:
                "linear-gradient(145deg, rgba(17,19,26,.9), rgba(17,19,26,.70) 58%, rgba(52,211,153,.06))",
              border: "1px solid rgba(52,211,153,.15)",
            }}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.20em]"
              style={{ color: "rgba(52,211,153,.86)" }}
            >
              Pipeline
            </p>
            <div className="mt-5 grid gap-3">
              {["Draft", "Validate", "Harden", "Explain", "Report", "Correct"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="grid grid-cols-[34px_1fr] items-center gap-3 rounded-xl border border-white/[.07] bg-white/[.025] px-3 py-2.5"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold"
                      style={{
                        color:
                          index === 0
                            ? "rgba(52,211,153,.9)"
                            : "rgba(197,170,255,.86)",
                        background: "rgba(255,255,255,.045)",
                      }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-[14px] font-semibold leading-[1.3]">
                      {step}
                    </span>
                  </div>
                ),
              )}
            </div>
            <p
              className="mt-5 border-t border-white/[.07] pt-4 text-[13px] leading-[1.6]"
              style={{ color: "rgba(232,236,255,.62)" }}
            >
              AI-assisted, not AI-dumped. Built for AKT exam revision, with a
              report button on every question and explanation.
            </p>
          </GlassPanel>
        </div>
      </section>

      <section className="pb-7 md:pb-8">
        <div className="container-x">
          <GlassPanel
            className="p-3.5 md:p-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(52,211,153,.075), rgba(17,19,26,.86) 46%, rgba(109,106,232,.07))",
              border: "1px solid rgba(52,211,153,.18)",
            }}
          >
            <div className="grid gap-2 md:grid-cols-[150px_1fr] md:items-center">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "rgba(52,211,153,.86)" }}
              >
                The short version
              </p>
              <p
                className="text-[13px] leading-[1.6] md:text-[14px]"
                style={{ color: "rgba(232,236,255,.72)" }}
              >
                AKT Navigator questions are AI-assisted and pass through a
                structured process: draft, validate, harden, explain, report
                and correct. The validation stage uses a UK primary-care lens
                and may reference sources such as NICE CKS, BNF/BNFC, DVLA,
                FSRH/UKMEC, UKHSA and legacy PHE resources where relevant.
                Users can report every question and explanation. AKT Navigator
                is independent, not RCGP-endorsed, and intended for exam
                revision only.
              </p>
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionIntro
            eyebrow="Content pipeline"
            title="The question pipeline"
            body="The public version is simple: draft, validate, harden, explain, report and correct."
          />

          <GlassPanel className="mt-6 p-0">
            <ol className="overflow-hidden rounded-[16px]">
              {pipelineSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-3 border-b border-white/[.06] bg-white/[.02] p-4 last:border-b-0 md:grid-cols-[120px_1fr]"
                >
                  <div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{
                        color:
                          index === 0
                            ? "rgba(52,211,153,.86)"
                            : "rgba(197,170,255,.82)",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-[17px] leading-[1.25]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 text-[14px] leading-[1.65]"
                      style={{ color: "rgba(232,236,255,.66)" }}
                    >
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </GlassPanel>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <SectionIntro
            title="What the checks are designed to catch"
            body="The checks are intended to make question practice more useful and safer for exam revision. They are not a claim of clinical validation."
          />
          <GlassPanel className="p-5 md:p-6">
            <DotList items={checkItems} />
          </GlassPanel>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassPanel
            className="p-5 md:p-6"
            style={{
              background:
                "linear-gradient(145deg, rgba(17,19,26,.92), rgba(17,19,26,.72) 54%, rgba(109,106,232,.06))",
              border: "1px solid rgba(167,139,250,.14)",
            }}
          >
            <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
              <SectionIntro
                eyebrow="Guidance lens"
                title="UK primary-care guidance lens"
                body="AKT Navigator is designed for UK GP trainees, so answer validation and explanations are framed from a UK primary-care perspective."
              />
              <div>
                <p
                  className="text-[14px] leading-[1.7]"
                  style={{ color: "rgba(232,236,255,.68)" }}
                >
                  Depending on the topic, the validation stage may reference
                  NICE guidance, NICE CKS, BNF/BNFC, DVLA fitness-to-drive
                  guidance, FSRH/UKMEC contraception guidance, UKHSA infection
                  or vaccination guidance, and legacy PHE resources where
                  relevant.
                </p>
                <p
                  className="mt-4 rounded-xl border px-4 py-3 text-[13px] leading-[1.65]"
                  style={{
                    color: "rgba(232,236,255,.62)",
                    background: "rgba(255,255,255,.025)",
                    borderColor: "rgba(255,255,255,.07)",
                  }}
                >
                  Guidance changes. AKT Navigator should not replace checking
                  the current source directly, especially for prescribing,
                  paediatric dosing, immunisation schedules, contraception
                  eligibility, DVLA rules and other guideline-sensitive areas.
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x grid gap-6 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
          <div>
            <SectionIntro
              title="How to report a question"
              body="Every question and explanation includes a report button. Use it if something feels unclear, unsafe, outdated, not AKT-like, or possibly wrong."
            />
            <p
              className="mt-4 text-[13px] leading-[1.65]"
              style={{ color: "rgba(232,236,255,.56)" }}
            >
              Reports are used to correct, rewrite, retire or re-run items
              through the pipeline. We are not currently claiming formal
              clinician editorial-board review for every item.
            </p>
          </div>
          <GlassPanel className="p-5 md:p-6">
            <div className="flex flex-wrap gap-2">
              {reportCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-md border px-2.5 py-1.5 text-[12px] font-semibold"
                  style={{
                    color: "rgba(232,236,255,.72)",
                    background: "rgba(255,255,255,.03)",
                    borderColor: "rgba(255,255,255,.08)",
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section id="what-we-do-not-claim" className="section-padding pt-0 scroll-mt-24">
        <div className="container-x">
          <GlassPanel
            className="p-5 md:p-6"
            style={{
              background:
                "linear-gradient(145deg, rgba(17,19,26,.92), rgba(17,19,26,.74) 58%, rgba(236,72,153,.055))",
              border: "1px solid rgba(167,139,250,.14)",
            }}
          >
            <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
              <SectionIntro
                eyebrow="Caveats"
                title="What we do not claim"
                body="This is the part a sceptical GP trainee should be able to find quickly."
              />
              <DotList items={doNotClaimItems} />
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionIntro
            title="How we recommend using AKT Navigator"
            body="Use AKT Navigator for extra SBA practice, timed mock discipline, structured explanations, weak-area detection and audio revision. Use official RCGP materials, trainer advice, current NICE CKS/BNF/BNFC guidance and established resources alongside it, especially close to the exam."
          />

          <GlassPanel className="mt-6 p-5 md:p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h3
                  className="text-[18px] leading-[1.2]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Good for
                </h3>
                <div className="mt-4">
                  <DotList items={goodForItems} />
                </div>
              </div>
              <div className="border-t border-white/[.08] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <h3
                  className="text-[18px] leading-[1.2]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Cross-check
                </h3>
                <div className="mt-4">
                  <DotList items={crossCheckItems} />
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x grid gap-6 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
          <SectionIntro
            title="What we are improving next"
            body="This page will evolve as the governance process improves. The next trust layer is making corrections, report outcomes and guidance-sensitive updates more visible."
          />
          <GlassPanel className="p-5 md:p-6">
            <DotList items={roadmapItems} />
          </GlassPanel>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <SectionIntro
            eyebrow="FAQ"
            title="Content governance FAQ"
            body="Short answers to the questions doctors usually ask once they see AI-assisted question practice."
          />

          <GlassPanel className="mt-6 p-0">
            <div className="overflow-hidden rounded-[16px]">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border-b border-white/[.06] bg-white/[.02] px-5 py-4 last:border-b-0"
                >
                  <h3
                    className="text-[16px] font-semibold leading-[1.3]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.7]"
                    style={{ color: "rgba(232,236,255,.66)" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-x">
          <GlassPanel
            className="p-6 text-center md:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(109,106,232,.10), rgba(17,19,26,.88) 42%, rgba(52,211,153,.06))",
              border: "1px solid rgba(167,139,250,.18)",
            }}
          >
            <h2
              className="mx-auto max-w-[760px] text-[28px] leading-[1.12] md:text-[42px]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
              }}
            >
              Try the free question bank with the caveats in mind.
            </h2>
            <p
              className="mx-auto mt-4 max-w-[640px] text-[15px] leading-[1.7] md:text-[16px]"
              style={{ color: "rgba(232,236,255,.70)" }}
            >
              Start with free AKT-style questions, timed mocks and structured
              explanations. Cross-check guideline-sensitive areas when needed.
            </p>
            <div className="mt-7">
              <Link href="/free-akt-questions" className="btn-primary inline-block text-[15px]">
                Start free AKT questions
              </Link>
            </div>
          </GlassPanel>
        </div>
      </section>

      <MinimalFooter />
    </main>
  );
}
