export function SchemaJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Medexia AKT Navigator",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "0",
          highPrice: "79",
          priceCurrency: "GBP",
          offerCount: 3,
          description:
            "Full access is free until 8 July 2026. After that, Free Practice remains £0 with 2 hours of audio, Early Access full audio is £59 from 8 July, and Full Audio Access is £79.",
        },
        description:
          "Full AKT Navigator access is free until 8 July 2026. After that, AKT questions remain free with 2 hours of audio, and full AKT audiobook access starts from £59 early access.",
        url: "https://app.medexia-akt.com",
        author: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Are AKT Navigator questions free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Free Practice includes 21,000+ AKT questions, deep structured explanations, mock exams, basic practice and 2 hours of audiobook listening.",
            },
          },
          {
            "@type": "Question",
            name: "When does paid AKT audio access start?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Full AKT Navigator access remains free until 8 July 2026. Early Access paid audio starts on 8 July 2026 and runs for 4 months.",
            },
          },
          {
            "@type": "Question",
            name: "What is included in paid AKT audio access?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Paid audio access includes the full 90+ hour AKT audiobook library for 4 months, with future premium audio upgrades included during the user's access period.",
            },
          },
        ],
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
