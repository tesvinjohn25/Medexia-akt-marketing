import { Nav } from "@/components/Nav";
import { AccessNotice } from "@/components/sections/AccessNotice";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { PricingSection } from "@/components/sections/PricingSection";
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

      <AccessNotice />

      <FeatureHighlights />

      <PricingSection />

      <SocialProof />

      <FinalCTA />

      <MinimalFooter />

      <StickyMobileCTA />
    </main>
  );
}
