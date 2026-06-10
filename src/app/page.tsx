import { Nav } from "@/components/Nav";
import { AccessNotice } from "@/components/sections/AccessNotice";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { AudioJourney } from "@/components/sections/AudioJourney";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { StickyMobileCTA } from "@/components/sections/StickyMobileCTA";
import { PricingSection } from "@/components/sections/PricingSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";

export default function Home() {
  return (
    <main>
      <SchemaJsonLd />
      <Nav />

      <HeroSection />

      <AccessNotice />

      <FeatureHighlights />

      <AudioJourney />

      <AppShowcase />

      <SocialProof />

      <PricingSection />

      <FinalCTA />

      <MinimalFooter />

      <StickyMobileCTA />
    </main>
  );
}
