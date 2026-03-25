import { Nav } from "@/components/Nav";
import { AprilBanner } from "@/components/sections/AprilBanner";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { WhyFree } from "@/components/sections/WhyFree";
import { LiveCounter } from "@/components/sections/LiveCounter";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { StickyMobileCTA } from "@/components/sections/StickyMobileCTA";
import { TopicGrid } from "@/components/sections/TopicGrid";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";

export default function Home() {
  return (
    <main>
      <SchemaJsonLd />
      <Nav />

      <HeroSection />

      <AprilBanner />

      <HowItWorks />

      <FeatureHighlights />

      <WhyFree />

      <LiveCounter />

      <TopicGrid />

      <WhatYouGet />

      <FinalCTA />

      <MinimalFooter />

      <StickyMobileCTA />
    </main>
  );
}
