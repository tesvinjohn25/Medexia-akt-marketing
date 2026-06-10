import { Nav } from "@/components/Nav";
import { AccessNotice } from "@/components/sections/AccessNotice";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { PricingSection } from "@/components/sections/PricingSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { AwardHero } from "@/components/award/AwardHero";
import { PlayerBar } from "@/components/award/PlayerBar";
import { ChapterListen } from "@/components/award/ChapterListen";
import { ChapterAnswer } from "@/components/award/ChapterAnswer";
import { ChapterMark } from "@/components/award/ChapterMark";

/**
 * The award-concept homepage: the page is the audiobook. The hero is
 * the cover, scrolling is playback (the PlayerBar maps progress onto
 * 0 → 90 hours), and the story plays in chapters — Listen, Answer,
 * Try, Proof, Access. Same facts as main, new vehicle.
 */
export default function Home() {
  return (
    <main>
      <SchemaJsonLd />
      <SmoothScroll />
      <Nav />

      <AwardHero />

      <ChapterListen />

      <ChapterAnswer />

      <div data-track="03 · Live demo">
        <ChapterMark no="03" title="Try" />
        <LiveDemo />
      </div>

      <div data-track="04 · The toolkit">
        <ChapterMark no="04" title="The toolkit" />
        <FeatureHighlights />
        <AppShowcase />
      </div>

      <div data-track="05 · What trainees say">
        <ChapterMark no="05" title="Proof" />
        <SocialProof />
      </div>

      <div data-track="06 · Access">
        <ChapterMark no="06" title="Access" />
        <AccessNotice />
        <PricingSection />
      </div>

      <div data-track="Start free">
        <FinalCTA />
        <MinimalFooter />
      </div>

      {/* Breathing room above the fixed player bar */}
      <div aria-hidden className="h-[64px]" />

      <PlayerBar />
    </main>
  );
}
