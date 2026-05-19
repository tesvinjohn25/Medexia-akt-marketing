"use client";

import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [pricingVisible, setPricingVisible] = useState(false);

  useEffect(() => {
    const heroCTA = document.querySelector("[data-hero-cta]");
    if (!heroCTA) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when hero CTA scrolls out of view
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroCTA);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pricing = document.querySelector("#pricing");
    if (!pricing) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPricingVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(pricing);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden transition-transform duration-300"
      style={{
        transform: visible && !pricingVisible ? "translateY(0)" : "translateY(100%)",
        background: "var(--bg-surface)",
        backdropFilter: "blur(14px)",
        borderTop: "1px solid var(--border)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href="https://app.medexia-akt.com"
          className="text-[13px] font-semibold flex-shrink-0"
          style={{ color: "var(--fg-mid)" }}
        >
          Log in
        </a>
        <a
          href="https://app.medexia-akt.com"
          className="btn-primary flex-1 text-center !py-3 text-[14px]"
        >
          Start free &rarr;
        </a>
      </div>
    </div>
  );
}
