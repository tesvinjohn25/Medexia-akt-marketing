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
          "Free AKT revision for the April & July sittings. 90+ hours of audio, adaptive learning, deep explanations.",
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
            name: "How long do I need to revise for the AKT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most trainees start 3 to 6 months before the exam and study a few evenings a week. AKT Navigator sessions take 15 to 20 minutes with 10 questions picked for your weak areas. You can pause and come back anytime. If you're short on time, there are over 90 hours of audio revision you can listen to on your commute, at the gym, or between patients.",
            },
          },
          {
            "@type": "Question",
            name: "What's the best way to revise for the AKT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Targeted practice is more effective than doing thousands of random questions. AKT Navigator's algorithm tests you across every major topic, identifies your weaknesses, and builds every session around your specific gaps. No two trainees get the same questions. The algorithm handles the planning so you just hit start and revise.",
            },
          },
          {
            "@type": "Question",
            name: "What topics does the AKT cover?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The RCGP AKT spans 32 topics across three areas. Clinical topics (80%) include cardiovascular, dermatology, mental health, respiratory, and musculoskeletal. Evidence in practice covers critical appraisal and statistics (10%). Organisation and management covers ethics, prescribing, and professional topics (10%). AKT Navigator covers all 32 topics with questions, audio, and detailed explanations.",
            },
          },
          {
            "@type": "Question",
            name: "How many questions are on the AKT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Since October 2025, the AKT has 160 questions in 2 hours and 40 minutes. That is one minute per question with no negative marking. AKT Navigator lets you generate mock exams at 40, 80, or 160 questions. The debrief picks up hidden patterns like where you are losing time, fatigue towards the end, and topics you got confidently wrong.",
            },
          },
          {
            "@type": "Question",
            name: "What is the AKT pass rate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Around 75% of candidates pass the AKT and about 4 in 5 first time sitters pass. The pass mark varies each sitting but has recently been around 71%. Common weak areas include drug side effects, prescribing in older adults, and data interpretation. Many candidates report rushing through at least a third of the exam.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a free AKT question bank?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AKT Navigator is completely free for the April and July 2026 sittings. No trial, no credit card, no catch. You get access to over 20,000 questions, 90+ hours of audio revision, adaptive learning, mock exams with debriefs, and an AI supervisor. A competitive pricing plan will be introduced after that.",
            },
          },
          {
            "@type": "Question",
            name: "How do I know if I'm ready for the AKT?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Take a full length mock under timed conditions. AKT Navigator's 160 question mocks simulate the real exam and the debrief finds things you can't see yourself, including timing issues, fatigue patterns, and topics where you are confidently wrong. You can chat with the AI tool to dig deeper into any area of your performance.",
            },
          },
          {
            "@type": "Question",
            name: "Can I revise for the AKT while working full time?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AKT Navigator was built by a GP trainee who knows what it is like balancing work, family, and revision. Sessions are 15 to 20 minutes of targeted questions. The audiobooks give you over 90 hours of content you can absorb on the go. The algorithm remembers where you left off and what you need next. No planning required.",
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
