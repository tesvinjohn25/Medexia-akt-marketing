import {
  FREE_AKT_QUESTIONS_CANONICAL,
  FREE_AKT_QUESTIONS_DESCRIPTION,
  FREE_AKT_QUESTIONS_TITLE,
  freeAktQuestionsFaqs,
} from "@/data/free-akt-questions";

export function FreeAktQuestionsJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://medexia-akt.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free AKT Questions",
            item: FREE_AKT_QUESTIONS_CANONICAL,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${FREE_AKT_QUESTIONS_CANONICAL}#webpage`,
        url: FREE_AKT_QUESTIONS_CANONICAL,
        name: FREE_AKT_QUESTIONS_TITLE,
        description: FREE_AKT_QUESTIONS_DESCRIPTION,
        isPartOf: {
          "@id": "https://medexia-akt.com/#website",
        },
        about: {
          "@id": `${FREE_AKT_QUESTIONS_CANONICAL}#learning-resource`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${FREE_AKT_QUESTIONS_CANONICAL}#software`,
        name: "AKT Navigator Free AKT Questions",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        url: FREE_AKT_QUESTIONS_CANONICAL,
        description:
          "Free MRCGP AKT question practice with timed mocks and structured explanations.",
        isAccessibleForFree: true,
        provider: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        audience: {
          "@type": "Audience",
          audienceType: "UK GP trainees preparing for the MRCGP AKT",
        },
      },
      {
        "@type": "LearningResource",
        "@id": `${FREE_AKT_QUESTIONS_CANONICAL}#learning-resource`,
        name: "AKT Navigator Free AKT Questions",
        description:
          "Free MRCGP AKT question practice with timed mocks and structured explanations.",
        isAccessibleForFree: true,
        educationalUse: "Exam preparation",
        learningResourceType: "Question bank / practice test",
        audience: {
          "@type": "Audience",
          audienceType: "UK GP trainees preparing for the MRCGP AKT",
        },
        provider: {
          "@type": "Organization",
          name: "Medexia",
          url: "https://medexia-akt.com",
        },
        url: FREE_AKT_QUESTIONS_CANONICAL,
      },
      {
        "@type": "FAQPage",
        mainEntity: freeAktQuestionsFaqs.map((faq) => ({
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
