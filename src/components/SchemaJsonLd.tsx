import {
  getCanonicalPositioning,
  getHomePositioningFaqs,
  getPricingFaqs,
} from "@/data/product-positioning";
import { getOfferPhase, phased } from "@/lib/offer-phase";

export function SchemaJsonLd() {
  const phase = getOfferPhase();
  const homepageFaqs = [
    ...getHomePositioningFaqs(phase),
    ...getPricingFaqs(phase),
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://medexia-akt.com/#organization",
        name: "Medexia",
        alternateName: ["AKT Navigator", "Medexia AKT Navigator"],
        url: "https://medexia-akt.com",
        description:
          "Medexia builds AKT Navigator, an audio-first MRCGP AKT revision platform for UK GP trainees with a permanently free question bank, timed mocks and structured explanations.",
        sameAs: ["https://www.reddit.com/r/Medexia/"],
      },
      {
        "@type": "WebSite",
        "@id": "https://medexia-akt.com/#website",
        name: "AKT Navigator by Medexia",
        url: "https://medexia-akt.com",
        publisher: { "@id": "https://medexia-akt.com/#organization" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Medexia AKT Navigator",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        url: "https://app.medexia-akt.com",
        description: getCanonicalPositioning(phase),
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "GP trainee",
        },
        creator: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "0",
          highPrice: "79",
          priceCurrency: "GBP",
          offerCount: phased(phase, 3, 2),
          description: phased(
            phase,
            "Questions, timed mocks, structured explanations and basic practice are free. Full access to the 90+ hour audio library is the paid upgrade after 8 July 2026; Early Access is £59 before 8 July and standard Full Audio Access is £79 for 4 months.",
            "Questions, timed mocks, structured explanations, basic practice and the first 2 hours of audio are free. Full access to the 90+ hour audio library is the paid upgrade: Full Audio Access is £79 for 4 months.",
          ),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: homepageFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
