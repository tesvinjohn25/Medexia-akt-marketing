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
import { ProductFacts } from "@/components/sections/ProductFacts";
import { HomePositioningFaq } from "@/components/sections/HomePositioningFaq";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export default function Home() {
  return (
    <main>
      <SchemaJsonLd />
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: "https://medexia-akt.com/" }]}
      />
      <Nav />

      <HeroSection />

      <ProductFacts />

      <AccessNotice />

      <HomePositioningFaq />

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
