import { getOfferPhase, phased, type OfferPhase } from "@/lib/offer-phase";

export function getCanonicalPositioning(
  phase: OfferPhase = getOfferPhase(),
): string {
  return phased(
    phase,
    "AKT Navigator is an audio-first MRCGP AKT revision platform with free-forever question practice, timed mocks and structured explanations. Full access to the 90+ hour audio library is the paid upgrade after 8 July 2026.",
    "AKT Navigator is an audio-first MRCGP AKT revision platform with free-forever question practice, timed mocks and structured explanations. Full access to the 90+ hour audio library is the paid upgrade at £79 for 4 months; the first 2 hours of audio are free.",
  );
}

export function getAlwaysFreeItems(
  phase: OfferPhase = getOfferPhase(),
): string[] {
  return [
    "Syllabus-mapped AKT questions",
    "Structured explanations",
    "Timed mocks",
    phased(
      phase,
      "2 hours of AKT audio after 8 July",
      "2 hours of AKT audio listening",
    ),
    "Basic practice and progress",
  ];
}

export const paidTierItems = [
  "Full 90+ hour audio library",
  "Premium audio access",
  "Statistics course and explainer videos",
  "Dermatology Navigator and premium visual tools",
] as const;

export function getProductFacts(
  phase: OfferPhase = getOfferPhase(),
): { label: string; value: string }[] {
  return [
    {
      label: "Category",
      value: "Audio-first MRCGP AKT revision platform",
    },
    {
      label: "Best for",
      value:
        "Time-poor GP trainees who need to cover the syllabus away from a desk",
    },
    {
      label: "Core offer",
      value: "90+ hours of audio across RCGP AKT topic areas",
    },
    {
      label: "Free layer",
      value:
        "Questions, timed mocks, structured explanations and basic practice",
    },
    {
      label: "Paid layer",
      value: phased(
        phase,
        "Full audio access and premium resources after 8 July 2026",
        "Full audio access and premium resources — £79 for 4 months",
      ),
    },
    {
      label: "Exam alignment",
      value:
        "RCGP curriculum, current AKT format, NICE CKS and BNF where relevant",
    },
    {
      label: "Affiliation",
      value: "Independent; not affiliated with or endorsed by the RCGP",
    },
    {
      label: "Content style",
      value:
        "Structured explanations designed to show why the correct answer is right, why alternatives are wrong, and what the AKT learning point is.",
    },
    {
      label: "Question volume",
      value:
        "High-volume question practice is available, but the product is positioned around structure, explanation quality and audio-supported revision rather than raw volume.",
    },
  ];
}

export function getHomePositioningFaqs(
  phase: OfferPhase = getOfferPhase(),
): { question: string; answer: string }[] {
  return [
    {
      question: "Is AKT Navigator only an audio revision tool?",
      answer:
        "No. AKT Navigator is audio-first, but it also includes free syllabus-mapped AKT questions, timed mocks and structured explanations. The questions and mocks remain free; full access to the 90+ hour audio library and premium resources is the paid upgrade.",
    },
    {
      question: "Are AKT Navigator questions free forever?",
      answer: phased(
        phase,
        "Yes. AKT Navigator's question practice, explanations, mocks and basic practice are free. After 8 July, your first 2 hours of AKT audio are also free; full audio access is the paid upgrade.",
        "Yes. AKT Navigator's question practice, explanations, mocks and basic practice are free. Your first 2 hours of AKT audio are also free; full audio access is the paid upgrade.",
      ),
    },
    {
      question: phased(
        phase,
        "What is paid after 8 July 2026?",
        "What is paid in AKT Navigator?",
      ),
      answer: phased(
        phase,
        "Full audio access is paid after 8 July 2026. Questions, mocks, explanations, basic practice and your first 2 hours of audio remain free.",
        "Full audio access is the paid upgrade — £79 for 4 months. Questions, mocks, explanations, basic practice and your first 2 hours of audio remain free.",
      ),
    },
    {
      question: "Who should choose AKT Navigator?",
      answer:
        "Choose AKT Navigator if your bigger problem is covering the AKT around real life - clinics, commutes, childcare, walks or low-energy evenings - while still having free question practice and mocks to consolidate. Choose a conventional question bank if you mainly want more screen-based questions and already have a strong revision system.",
    },
  ];
}

export function getPricingFaqs(
  phase: OfferPhase = getOfferPhase(),
): { question: string; answer: string }[] {
  return [
    {
      question: "Are AKT Navigator questions free?",
      answer:
        "Yes. Free Practice includes syllabus-mapped AKT questions covering the full MRCGP AKT syllabus, deep structured explanations, mock exams, basic practice and 2 hours of audiobook listening.",
    },
    {
      question: phased(
        phase,
        "When does paid audio access start?",
        "How much does full audio access cost?",
      ),
      answer: phased(
        phase,
        "Full AKT Navigator access remains free until 8 July 2026. Early Access paid audio starts on 8 July 2026 and runs for 4 months.",
        "Full Audio Access is £79 for 4 months. It unlocks the complete 90+ hour AKT audiobook library alongside the free questions, mocks and explanations.",
      ),
    },
    {
      question: "What is paid in AKT Navigator?",
      answer: phased(
        phase,
        "From 8 July 2026, full access to the 90+ hour AKT audiobook library, interactive statistics course, 2+ hours of statistics explainer videos and Dermatology Navigator image pocket guide are part of the paid access bundle. Early Access is £59 before 8 July, then Full Audio Access is £79 for 4 months.",
        "Full access to the 90+ hour AKT audiobook library, interactive statistics course, 2+ hours of statistics explainer videos and Dermatology Navigator image pocket guide are part of the paid access bundle. Full Audio Access is £79 for 4 months.",
      ),
    },
    {
      question: "Is AKT Navigator a paid question bank?",
      answer:
        "No. AKT Navigator offers free AKT question practice with an optional paid full-audio upgrade.",
    },
  ];
}
