import { Nav } from "@/components/Nav";
import { AprilBanner } from "@/components/sections/AprilBanner";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { WhyFree } from "@/components/sections/WhyFree";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MinimalFooter } from "@/components/sections/MinimalFooter";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main>
      <Nav />

      <HeroSection />

      <AprilBanner />

      <FeatureHighlights />

      <WhyFree />

      <WhatYouGet />

      <FinalCTA />

      <MinimalFooter />
    </main>
  );
}
