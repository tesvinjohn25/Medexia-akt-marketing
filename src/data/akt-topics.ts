export interface AktTopic {
  slug: string;
  name: string;
  category: "Professional" | "Life Stages" | "Clinical";
  description: string;
  aliases: string[];
}

export const aktTopics: AktTopic[] = [
  // ── Professional (6) ──────────────────────────────────────
  {
    slug: "consulting-in-general-practice",
    name: "Consulting in General Practice",
    category: "Professional",
    description:
      "Master the consultation models, communication skills, and shared decision-making frameworks tested in the AKT. Covers Calgary-Cambridge, patient-centred care, and breaking bad news.",
    aliases: ["consultation skills", "communication", "shared decision making"],
  },
  {
    slug: "equality-diversity-inclusion",
    name: "Equality, Diversity and Inclusion",
    category: "Professional",
    description:
      "Understand health inequalities, cultural competence, and the Equality Act as applied to general practice. Covers unconscious bias, reasonable adjustments, and inclusive care.",
    aliases: ["health inequalities", "cultural competence", "equality act"],
  },
  {
    slug: "evidence-in-practice",
    name: "Evidence in Practice",
    category: "Professional",
    description:
      "Critical appraisal, research methodology, and evidence-based medicine as tested in the AKT. Covers study design, statistics, NNT, sensitivity, specificity, and clinical guidelines.",
    aliases: ["EBM", "statistics", "critical appraisal", "research methods", "NNT", "sensitivity specificity"],
  },
  {
    slug: "continuity-quality-safety-prescribing",
    name: "Continuity of Care, Quality Improvement, Safety and Prescribing",
    category: "Professional",
    description:
      "Quality improvement, patient safety, significant event analysis, and prescribing principles. Covers audit cycles, QOF, medication safety, and MHRA alerts.",
    aliases: ["prescribing", "patient safety", "QI", "audit", "QOF", "medication safety"],
  },
  {
    slug: "leadership-management",
    name: "Leadership and Management",
    category: "Professional",
    description:
      "GP leadership, practice management, and NHS structures. Covers CQC, appraisal and revalidation, team working, and medico-legal responsibilities.",
    aliases: ["practice management", "CQC", "revalidation", "NHS structure"],
  },
  {
    slug: "population-planetary-health",
    name: "Population and Planetary Health",
    category: "Professional",
    description:
      "Public health, epidemiology, screening programmes, and sustainability in healthcare. Covers vaccination schedules, health promotion, and planetary health.",
    aliases: ["public health", "epidemiology", "screening", "vaccination", "health promotion"],
  },

  // ── Life Stages (4) ───────────────────────────────────────
  {
    slug: "children-young-people",
    name: "Children and Young People",
    category: "Life Stages",
    description:
      "Paediatric presentations in primary care including child development, safeguarding, childhood infections, immunisation schedules, and adolescent health.",
    aliases: ["paediatrics", "child health", "safeguarding", "immunisation", "adolescent health"],
  },
  {
    slug: "long-term-conditions-cancer",
    name: "People with Long-term Conditions Including Cancer",
    category: "Life Stages",
    description:
      "Management of chronic disease in general practice including multimorbidity, cancer recognition, two-week-wait referrals, and palliative transitions.",
    aliases: ["chronic disease", "cancer", "multimorbidity", "two week wait", "2WW"],
  },
  {
    slug: "older-adults",
    name: "Older Adults",
    category: "Life Stages",
    description:
      "Geriatric medicine in primary care including frailty, falls, dementia, polypharmacy, capacity assessment, and care home medicine.",
    aliases: ["geriatrics", "frailty", "dementia", "falls", "polypharmacy", "capacity"],
  },
  {
    slug: "end-of-life",
    name: "People at the End of Life",
    category: "Life Stages",
    description:
      "Palliative care, symptom management, advance care planning, and end-of-life decision making in the community. Covers syringe drivers, DNACPR, and bereavement.",
    aliases: ["palliative care", "end of life", "terminal care", "syringe driver", "DNACPR"],
  },

  // ── Clinical (22) ─────────────────────────────────────────
  {
    slug: "allergy-immunology",
    name: "Allergy and Immunology",
    category: "Clinical",
    description:
      "Allergic conditions in primary care including anaphylaxis management, food allergy, drug allergy, immunodeficiency, and immunisation.",
    aliases: ["allergy", "anaphylaxis", "immunology", "food allergy"],
  },
  {
    slug: "cardiovascular",
    name: "Cardiovascular Health",
    category: "Clinical",
    description:
      "Cardiovascular disease in primary care including hypertension, heart failure, atrial fibrillation, lipid management, and chest pain assessment.",
    aliases: ["cardiology", "hypertension", "heart failure", "AF", "atrial fibrillation", "chest pain", "lipids"],
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    category: "Clinical",
    description:
      "Skin conditions commonly seen in general practice including eczema, psoriasis, skin cancer recognition, acne, and fungal infections.",
    aliases: ["skin", "eczema", "psoriasis", "skin cancer", "acne", "rashes"],
  },
  {
    slug: "ent-speech-hearing",
    name: "ENT, Speech and Hearing",
    category: "Clinical",
    description:
      "Ear, nose and throat presentations including otitis media, hearing loss, tonsillitis, sinusitis, epistaxis, and vertigo.",
    aliases: ["ENT", "ear", "hearing loss", "tonsillitis", "sinusitis", "vertigo"],
  },
  {
    slug: "eyes-vision",
    name: "Eyes and Vision",
    category: "Clinical",
    description:
      "Ophthalmology in primary care including red eye, acute vision loss, glaucoma, cataracts, and diabetic retinopathy screening.",
    aliases: ["ophthalmology", "red eye", "vision loss", "glaucoma", "cataracts"],
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    category: "Clinical",
    description:
      "GI conditions including IBS, IBD, coeliac disease, GORD, liver disease, and GI cancer recognition. Covers H. pylori testing and management.",
    aliases: ["GI", "IBS", "IBD", "coeliac", "GORD", "liver", "H pylori"],
  },
  {
    slug: "genomic-medicine",
    name: "Genomic Medicine",
    category: "Clinical",
    description:
      "Genetic conditions, inheritance patterns, genetic testing and counselling in primary care. Covers pharmacogenomics and cancer genetics.",
    aliases: ["genetics", "genomics", "genetic testing", "inheritance", "pharmacogenomics"],
  },
  {
    slug: "gynaecology-breast",
    name: "Gynaecology and Breast",
    category: "Clinical",
    description:
      "Gynaecological conditions including menorrhagia, PCOS, endometriosis, menopause, cervical screening, and breast lump assessment.",
    aliases: ["gynaecology", "menopause", "PCOS", "endometriosis", "cervical screening", "breast"],
  },
  {
    slug: "haematology",
    name: "Haematology",
    category: "Clinical",
    description:
      "Blood disorders in primary care including iron deficiency anaemia, B12 deficiency, anticoagulation management, and haematological malignancies.",
    aliases: ["blood disorders", "anaemia", "anticoagulation", "warfarin", "DOAC"],
  },
  {
    slug: "infectious-diseases-travel",
    name: "Infectious Diseases and Travel Health",
    category: "Clinical",
    description:
      "Common infections, travel medicine, tropical diseases, and infection control. Covers HIV, hepatitis, travel vaccinations, and antimicrobial stewardship.",
    aliases: ["infections", "travel health", "HIV", "hepatitis", "tropical medicine", "antibiotics"],
  },
  {
    slug: "learning-disability",
    name: "Learning Disability",
    category: "Clinical",
    description:
      "Healthcare for people with learning disabilities including annual health checks, reasonable adjustments, capacity, and health inequalities.",
    aliases: ["learning difficulties", "intellectual disability", "annual health check"],
  },
  {
    slug: "maternity-reproductive-health",
    name: "Maternity and Reproductive Health",
    category: "Clinical",
    description:
      "Pregnancy, postnatal care, contraception, and fertility in primary care. Covers antenatal screening, gestational diabetes, and postpartum mental health.",
    aliases: ["pregnancy", "contraception", "fertility", "antenatal", "postnatal", "obstetrics"],
  },
  {
    slug: "mental-health",
    name: "Mental Health",
    category: "Clinical",
    description:
      "Psychiatric conditions in primary care including depression, anxiety, psychosis, eating disorders, and the Mental Health Act. Covers SSRIs and risk assessment.",
    aliases: ["psychiatry", "depression", "anxiety", "psychosis", "mental health act", "SSRI"],
  },
  {
    slug: "metabolic-endocrinology",
    name: "Metabolic Problems and Endocrinology",
    category: "Clinical",
    description:
      "Endocrine and metabolic conditions including diabetes, thyroid disease, obesity, adrenal disorders, and calcium metabolism.",
    aliases: ["diabetes", "thyroid", "endocrinology", "obesity", "HbA1c", "insulin"],
  },
  {
    slug: "musculoskeletal",
    name: "Musculoskeletal Health",
    category: "Clinical",
    description:
      "MSK conditions including back pain, osteoarthritis, rheumatoid arthritis, osteoporosis, and soft tissue injuries. Covers red flags and referral criteria.",
    aliases: ["MSK", "back pain", "arthritis", "osteoporosis", "rheumatology", "joint pain"],
  },
  {
    slug: "neurodevelopmental-neurodiversity",
    name: "Neurodevelopmental Conditions and Neurodiversity",
    category: "Clinical",
    description:
      "ADHD, autism spectrum conditions, and neurodiversity in primary care. Covers assessment pathways, medication, and reasonable adjustments.",
    aliases: ["ADHD", "autism", "ASD", "neurodiversity", "neurodevelopmental"],
  },
  {
    slug: "neurology",
    name: "Neurology",
    category: "Clinical",
    description:
      "Neurological conditions including headache, epilepsy, stroke, multiple sclerosis, Parkinson's disease, and neuropathy.",
    aliases: ["headache", "epilepsy", "stroke", "MS", "Parkinsons", "migraine", "neuropathy"],
  },
  {
    slug: "renal-urology",
    name: "Renal and Urological Conditions",
    category: "Clinical",
    description:
      "Kidney and urological conditions including CKD, UTI, prostate disease, haematuria, and renal stones. Covers eGFR monitoring and referral thresholds.",
    aliases: ["kidney", "CKD", "UTI", "prostate", "urology", "haematuria"],
  },
  {
    slug: "respiratory",
    name: "Respiratory Health",
    category: "Clinical",
    description:
      "Respiratory conditions including asthma, COPD, pneumonia, lung cancer, and sleep apnoea. Covers inhaler technique, spirometry, and BTS guidelines.",
    aliases: ["asthma", "COPD", "pneumonia", "lung cancer", "inhaler", "spirometry"],
  },
  {
    slug: "sexual-health",
    name: "Sexual Health",
    category: "Clinical",
    description:
      "Sexual health in primary care including STI testing and management, PrEP, sexual dysfunction, and LGBTQ+ healthcare.",
    aliases: ["STI", "sexual health", "chlamydia", "PrEP", "sexual dysfunction"],
  },
  {
    slug: "smoking-alcohol-substance-misuse",
    name: "Smoking, Alcohol and Substance Misuse",
    category: "Clinical",
    description:
      "Addiction medicine in primary care including smoking cessation, alcohol use disorders, opioid dependence, and harm reduction approaches.",
    aliases: ["smoking", "alcohol", "drugs", "addiction", "substance misuse", "smoking cessation"],
  },
  {
    slug: "urgent-unscheduled-care",
    name: "Urgent and Unscheduled Care",
    category: "Clinical",
    description:
      "Emergency presentations in primary care including sepsis recognition, acute abdomen, anaphylaxis, and medical emergencies. Covers NEWS2 and safety netting.",
    aliases: ["emergency", "urgent care", "sepsis", "acute", "safety netting", "NEWS2"],
  },
];
