import { Nav } from "@/components/Nav";
import { AccessNotice } from "@/components/sections/AccessNotice";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { AudioJourney } from "@/components/sections/AudioJourney";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { StickyMobileCTA } from "@/components/sections/StickyMobileCTA";
import { PricingSection } from "@/components/sections/PricingSection";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { TopicMarquee } from "@/components/fx/TopicMarquee";

export default function Home() {
  return (
    <main>
      <SchemaJsonLd />
      <SmoothScroll />
      <ScrollProgress />
      <Nav />

      <HeroSection />

      <AccessNotice />

      <FeatureHighlights />

      <TopicMarquee />

      <AudioJourney />

      <AppShowcase />

      <LiveDemo />

      <SocialProof />

      <PricingSection />

      <FinalCTA />

      <MinimalFooter />

      <StickyMobileCTA />
    </main>
  );
}
