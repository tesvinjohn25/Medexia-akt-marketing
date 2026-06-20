import { Nav } from "@/components/Nav";
import { AccessNotice } from "@/components/sections/AccessNotice";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { AudioJourney } from "@/components/sections/AudioJourney";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { PricingSection } from "@/components/sections/PricingSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

const sourceLinks = [
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-introduction",
    label: "RCGP: Introducing the AKT",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/gp-curriculum",
    label: "RCGP: GP curriculum",
  },
  {
    href: "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-preparing",
    label: "RCGP: Preparing for the AKT",
  },
  {
    href: "https://www.pearsonvue.com/us/en/rcgp.html",
    label: "Pearson VUE: RCGP test centres",
  },
];

function HomeAnswerSources() {
  return (
    <section className="section-padding pt-8 md:pt-10">
      <div className="container-x grid gap-4 md:grid-cols-[1.15fr_.85fr]">
        <div
          className="rounded-xl p-4 md:p-5"
          style={{
            background: "rgba(52,211,153,.06)",
            border: "1px solid rgba(52,211,153,.18)",
          }}
        >
          <h2
            className="text-[18px] md:text-[20px] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Quick answer
          </h2>
          <p
            className="mt-2 text-[14px] md:text-[15px] leading-[1.65]"
            style={{ color: "var(--fg-mid)" }}
          >
            AKT Navigator is audio-first MRCGP AKT revision: the whole syllabus
            in 90+ hours of audio, with syllabus-mapped questions, mocks,
            statistics, stats videos and Dermatology Navigator. Everything is
            free until 8 July 2026; after that, questions and a free audio
            allowance remain free, with full audio access paid.
          </p>
        </div>

        <div
          className="rounded-xl p-4 md:p-5"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
          }}
        >
          <h2
            className="text-[18px] md:text-[20px] font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Official sources
          </h2>
          <p
            className="mt-2 text-[13px] leading-[1.65]"
            style={{ color: "var(--fg-mid)" }}
          >
            Independent of the RCGP. Exam format, curriculum and test-centre
            information are checked against public RCGP and Pearson VUE pages.
          </p>
          <div className="mt-3 grid gap-2">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-3 py-2 text-[12px] font-medium transition-colors hover:bg-white/[.05]"
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
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <SchemaJsonLd />
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: "https://medexia-akt.com/" }]}
      />
      <Nav />

      <HeroSection />

      <AccessNotice />

      <HomeAnswerSources />

      <FeatureHighlights />

      <AudioJourney />

      <AppShowcase />

      <LiveDemo />

      <SocialProof />

      <PricingSection />

      <FinalCTA />

      <MinimalFooter />
    </main>
  );
}
