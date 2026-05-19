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
            "Free AKT question practice, Early Access full audio at £59, and Full Audio Access at £79 from 8 July 2026.",
        },
        description:
          "AKT questions remain free. Full AKT audiobook access starts from £59 early access, then £79 from 8 July 2026.",
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
              text: "Yes. Free Practice includes 21,000+ AKT questions, deep structured explanations, mock exams and basic practice.",
            },
          },
          {
            "@type": "Question",
            name: "What is included in paid AKT audio access?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Paid audio access includes the full 90+ hour AKT audiobook library for 4 months. Early Access is £59 before 8 July 2026; standard Full Audio Access is £79 from 8 July.",
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
