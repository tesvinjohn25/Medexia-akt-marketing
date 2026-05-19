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
            "Everything in AKT Navigator is free until 8 July 2026. After that, Free Practice remains £0 with 2 hours of audio, Early Access is £59 from 8 July, and Full Audio Access is £79.",
        },
        description:
          "Audio-first MRCGP AKT revision covering the full syllabus in 90+ hours. Everything is free until 8 July 2026, including questions, audio, statistics, statistics explainer videos and Dermatology Navigator. After that, questions remain free with 2 hours of audio, and paid access starts from £59 early access.",
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
              text: "Yes. Free Practice includes syllabus-mapped AKT questions covering the full MRCGP AKT syllabus, deep structured explanations, mock exams, basic practice and 2 hours of audiobook listening.",
            },
          },
          {
            "@type": "Question",
            name: "When does paid AKT audio access start?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Everything in AKT Navigator remains free until 8 July 2026. Early Access paid access starts on 8 July 2026 and runs for 4 months.",
            },
          },
          {
            "@type": "Question",
            name: "What is included in paid AKT audio access?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Paid access includes the full 90+ hour AKT audiobook library, interactive statistics course, 2+ hours of statistics explainer videos, Dermatology Navigator image pocket guide and future premium audio upgrades during the user's access period.",
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
