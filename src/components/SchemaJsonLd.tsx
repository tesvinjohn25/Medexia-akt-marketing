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
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
          description: "Free for the April and July 2026 AKT sittings",
        },
        description:
          "Free AKT revision for the April & July sittings. 50+ hours of audio, adaptive learning, deep explanations.",
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
            name: "Is Medexia AKT Navigator really free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Medexia AKT Navigator is completely free for the April and July 2026 AKT sittings. No trial, no credit card, no catch.",
            },
          },
          {
            "@type": "Question",
            name: "What does Medexia AKT Navigator include?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "50+ hours of audio revision, adaptive learning that targets your weak spots, deep explanations, mock exams (40, 80, or 160 questions), AI Supervisor, and 20,000+ questions covering all 32 AKT topics.",
            },
          },
          {
            "@type": "Question",
            name: "How does the adaptive learning work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The app tracks your performance across all 32 AKT topics and identifies your weakest areas. Each session is tailored to target the topics where you need the most improvement.",
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
