import {
  CANONICAL_POSITIONING,
  homePositioningFaqs,
} from "@/data/product-positioning";

export function SchemaJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Medexia AKT Navigator",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        url: "https://app.medexia-akt.com",
        description: CANONICAL_POSITIONING,
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
          offerCount: 3,
          description:
            "Questions, timed mocks, structured explanations and basic practice are free. Full access to the 90+ hour audio library is the paid upgrade after 8 July 2026; Early Access is £59 before 8 July and standard Full Audio Access is £79 for 4 months.",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: homePositioningFaqs.map((faq) => ({
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
