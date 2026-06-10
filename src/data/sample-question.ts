/**
 * The worked-example question shown on /demo — the public proof of
 * question and explanation quality. Swap the content here when you want
 * a different showcase question; the page and its Quiz JSON-LD both
 * render from this single source.
 *
 * Keep it guideline-stable (avoid thresholds that change yearly) and
 * representative of real AKT difficulty.
 */

export type SampleOption = {
  id: "A" | "B" | "C" | "D" | "E";
  text: string;
  /** Why this option is wrong — omitted on the correct option. */
  whyWrong?: string;
};

export type SampleQuestionData = {
  topic: string;
  guidelineTag: string;
  stem: string;
  prompt: string;
  options: SampleOption[];
  correctId: SampleOption["id"];
  understanding: string;
  keyPoints: string[];
  disclaimer: string;
};

export const SAMPLE_QUESTION: SampleQuestionData = {
  topic: "Cardiovascular health",
  guidelineTag: "Aligned to NICE",
  stem: "A 72-year-old man attends his GP surgery for follow-up after atrial fibrillation was confirmed on a 12-lead ECG, having been detected as an irregular pulse at a routine appointment. He has type 2 diabetes managed with metformin and hypertension well controlled on amlodipine. He has no history of stroke, TIA, heart failure or vascular disease. He feels well, with a heart rate of 88 beats per minute, and his renal function is normal.",
  prompt: "Which is the SINGLE MOST appropriate next step to reduce his risk of stroke?",
  options: [
    {
      id: "A",
      text: "Start aspirin 75 mg once daily",
      whyWrong:
        "Antiplatelets are not recommended for stroke prevention in atrial fibrillation — aspirin offers inadequate protection with a comparable bleeding risk.",
    },
    {
      id: "B",
      text: "Start warfarin, target INR 2–3",
      whyWrong:
        "Effective, but no longer first line. NICE recommends a DOAC first, with warfarin reserved for when DOACs are contraindicated or not tolerated.",
    },
    {
      id: "C",
      text: "Start apixaban",
    },
    {
      id: "D",
      text: "No anticoagulation needed; reassess stroke risk in 12 months",
      whyWrong:
        "His CHA₂DS₂-VASc score is 3, well above the threshold at which anticoagulation should be offered. Deferring leaves him exposed to a preventable stroke risk.",
    },
    {
      id: "E",
      text: "Refer for direct current cardioversion",
      whyWrong:
        "Cardioversion addresses rhythm, not stroke risk — and he is asymptomatic with acceptable rate control, so rate control plus anticoagulation is the priority in primary care.",
    },
  ],
  correctId: "C",
  understanding:
    "This question tests two steps: calculating a CHA₂DS₂-VASc score, then choosing the right agent. His score is 3 — hypertension (1), diabetes (1), age 65–74 (1). NICE recommends offering anticoagulation to men with a score of 2 or more, and a direct-acting oral anticoagulant (DOAC) such as apixaban, dabigatran, edoxaban or rivaroxaban is first line. Bleeding risk should be assessed (NICE recommends the ORBIT score), but a raised bleeding risk is a prompt to address modifiable factors, not usually a reason to withhold anticoagulation.",
  keyPoints: [
    "CHA₂DS₂-VASc: Congestive heart failure (1), Hypertension (1), Age ≥75 (2), Diabetes (1), Stroke/TIA/thromboembolism (2), Vascular disease (1), Age 65–74 (1), Sex category female (1).",
    "Offer anticoagulation if the score is 2 or more; consider it for men with a score of 1.",
    "DOACs are first line; warfarin is reserved for when DOACs are unsuitable — and remains the choice in, for example, mechanical heart valves.",
    "Aspirin monotherapy is not recommended for stroke prevention in atrial fibrillation.",
    "Assess bleeding risk with ORBIT and address modifiable risk factors.",
  ],
  disclaimer: "For exam revision only. Always check NICE, CKS and the BNF.",
};
