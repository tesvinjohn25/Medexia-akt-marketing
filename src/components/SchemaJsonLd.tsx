export function SchemaJsonLd() {
  const schema = {
    "@context": "https://schema.org",
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
      "Free AKT revision for the April & July sittings. 90+ hours of audio, adaptive learning, deep explanations.",
    url: "https://app.medexia-akt.com",
    author: {
      "@type": "Organization",
      name: "Medexia",
      url: "https://medexia-akt.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
