export const FREE_AKT_QUESTIONS_CANONICAL =
  "https://medexia-akt.com/free-akt-questions";

export const FREE_AKT_QUESTIONS_TITLE =
  "Free MRCGP AKT Questions + Mocks | AKT Navigator";

export const FREE_AKT_QUESTIONS_DESCRIPTION =
  "Practise 21,000+ MRCGP AKT-style questions, timed mocks and structured explanations for free. No card required. Full AKT audio revision is the optional paid upgrade.";

export const FREE_AKT_QUESTIONS_SOCIAL_DESCRIPTION =
  "Free AKT-style questions, timed mocks and structured explanations for UK GP trainees. No card required. Full audio revision is optional.";

export const FREE_PRACTICE_ANSWER =
  "AKT Navigator is a free MRCGP AKT question bank for UK GP trainees. It includes 21,000+ AKT-style questions, timed mocks, structured explanations and basic progress tracking. The free practice layer stays free; full audio revision is the optional paid upgrade for trainees who want to revise during commutes, walks and tired evenings.";

export const freePracticeIncludes = [
  "21,000+ AKT-style questions",
  "Timed mocks",
  "Structured why-wrong explanations",
  "Basic progress tracking",
  "First 2 hours of audio free",
] as const;

export const alwaysFreeFeatures = [
  "21,000+ AKT-style questions",
  "Timed mocks",
  "Structured explanations",
  "Basic practice/progress",
  "Explanation Builder access path",
] as const;

export const optionalPaidAudioFeatures = [
  "Full AKT audio revision",
  "90+ hour audio library",
  "Audio-first revision for commutes, walks, gym and tired evenings",
  "Premium audio resources",
] as const;

export const explanationDifferenceItems = [
  "Key question clues",
  "What examiners are testing",
  "Near-miss trap",
  "Why the other options are wrong",
  "Key AKT takeaway",
  "Explain-it-back prompt",
] as const;

export const sampleFreeAktQuestion = {
  question:
    "A patient with COPD taking theophylline develops regular SVT. Vagal manoeuvres fail. Which statement about adenosine is true?",
  options: [
    "A. Theophylline potentiates adenosine - lower dose",
    "B. Theophylline antagonises adenosine - higher dose may be required",
    "C. Adenosine is contraindicated with theophylline",
    "D. Use IV digoxin instead",
    "E. Go straight to DC cardioversion",
  ],
  correctAnswer:
    "B - Theophylline antagonises adenosine; a higher dose may be required.",
  keyClue:
    "Theophylline is a methylxanthine and antagonises adenosine receptors.",
  examinerTrap:
    "Do not confuse interaction with contraindication. Theophylline reduces adenosine effect; dipyridamole potentiates it.",
  nearMiss:
    "A lower adenosine dose applies to dipyridamole, not theophylline.",
  takeaway:
    "In AKT prescribing questions, identify whether the drug interaction increases effect, reduces effect, or creates a true contraindication.",
} as const;

export const trustStackItems = [
  "AI-assisted, not AI-dumped",
  "AKT-topic structured",
  "Multi-stage automated review",
  "Explanation-focused",
  "User flagging/correction loop",
  "Guideline-aware where relevant",
  "Independent of RCGP",
] as const;

export const bestForItems = [
  "You want free MRCGP AKT-style questions",
  "You want breadth without paying before you know whether the explanation style works for you",
  "You want timed mocks without paying upfront",
  "You want explanations that teach the trap, not just the answer",
  "You are comparing AKT question banks",
  "You want to try the product before considering audio",
] as const;

export const conventionalBankItems = [
  "You specifically want a doctor-written-only resource",
  "You prefer established legacy platforms",
  "You want to cross-check weak areas across multiple resources",
] as const;

export const freePracticeFacts = [
  ["Category", "Free MRCGP AKT question bank"],
  ["Audience", "UK GP trainees preparing for the AKT"],
  [
    "Includes",
    "21,000+ AKT-style questions, timed mocks, structured explanations, basic progress",
  ],
  ["Cost", "Free practice layer"],
  ["Card required", "No"],
  ["Paid upgrade", "Full AKT audio revision"],
  [
    "Best for",
    "Time-poor GP trainees who want free practice and clear explanations",
  ],
  ["Independence", "Not affiliated with or endorsed by the RCGP"],
] as const;

export const freeAktQuestionsFaqs = [
  {
    question: "Are AKT Navigator questions really free?",
    answer:
      "Yes. AKT Navigator's question practice, timed mocks, structured explanations and basic progress tools are free. Full audio revision is the optional paid upgrade.",
  },
  {
    question: "Is this a free AKT question bank?",
    answer:
      "Yes. AKT Navigator can be used as a free MRCGP AKT question bank for UK GP trainees preparing for the Applied Knowledge Test.",
  },
  {
    question: "Do I need a card?",
    answer: "No. You can start free AKT questions without a card.",
  },
  {
    question: "What is the paid part?",
    answer:
      "The paid upgrade is full AKT audio revision. Questions, mocks and explanations stay free.",
  },
  {
    question: "Are the questions AI-generated?",
    answer:
      "AKT Navigator uses an AI-assisted question and explanation pipeline. The value is not raw AI output; it is the structured AKT topic mapping, multi-stage automated review, explanation format and user flagging loop. The question bank is for exam revision only, and users should cross-check current guidance where needed.",
  },
  {
    question: "Are the questions doctor-written?",
    answer:
      "No. We do not position the free bank as doctor-written. The question bank is AI-assisted and structured through a review process. It is designed for AKT exam revision, and users should cross-check current guidance where needed.",
  },
  {
    question: "Is AKT Navigator RCGP-endorsed?",
    answer:
      "No. AKT Navigator is independent and is not affiliated with or endorsed by the RCGP.",
  },
  {
    question: "Does it include mocks?",
    answer: "Yes, timed mocks are part of the free practice layer.",
  },
  {
    question: "What is the AKT Explanation Builder?",
    answer:
      "It is a free ChatGPT tool by AKT Navigator that turns a pasted AKT-style SBA into a structured teaching explanation. It explains the clues, trap, near-miss answer and why the other options are wrong.",
  },
  {
    question: "Can I use this alongside PassMedicine, GP SelfTest or other resources?",
    answer:
      "Yes. Many trainees use more than one resource. AKT Navigator is useful if you want free practice, structured explanations and optional audio revision.",
  },
] as const;
