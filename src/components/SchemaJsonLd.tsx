export function SchemaJsonLd() {
  const schema = {
    "@context": "https://schema.org",
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
