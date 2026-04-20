import { Nav } from "@/components/Nav";
import { AprilBanner } from "@/components/sections/AprilBanner";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { NotesVsAudio } from "@/components/sections/NotesVsAudio";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { StickyMobileCTA } from "@/components/sections/StickyMobileCTA";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";

export default function Home() {
  return (
    <main>
      <SchemaJsonLd />
      <Nav />

      <HeroSection />

      <AprilBanner />

      <NotesVsAudio />

      <FeatureHighlights />

      <SocialProof />

      <FinalCTA />

      <MinimalFooter />

      <StickyMobileCTA />
    </main>
  );
}
