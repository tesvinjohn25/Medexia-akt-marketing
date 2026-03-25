export interface AktTopic {
  slug: string;
  name: string;
  category: "Professional" | "Life Stages" | "Clinical";
  description: string;
  /** SEO meta description (action-oriented, ~155 chars) */
  metaDescription: string;
  /** Enriched content for the topic page (300-500 words, UK guidelines-verified) */
  content: string;
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
    metaDescription:
      "Free AKT revision for consulting in general practice. Master Calgary-Cambridge, shared decision-making, and breaking bad news with 20,000+ questions and audio.",
    content: `The AKT tests your understanding of consultation models and communication frameworks in the context of general practice. You need to know the theory, but more importantly, you need to recognise how these models apply to clinical scenarios in exam questions.

The Calgary-Cambridge model is the most commonly referenced framework. It structures a consultation into five phases: initiating the session, gathering information, physical examination, explanation and planning, and closing. AKT questions often present a clinical scenario and ask which phase of the consultation a particular action belongs to, or what the most appropriate communication technique is at a given point.

Shared decision-making is a core principle in modern general practice. NICE guidance emphasises that clinicians should present options, discuss benefits and risks, and support patients in making informed choices. In AKT questions, the correct answer often involves acknowledging the patient's perspective and involving them in the decision rather than directing them.

Breaking bad news follows structured approaches like SPIKES (Setting, Perception, Invitation, Knowledge, Emotions, Strategy). Questions may ask about the appropriate order of steps, or how to handle a specific emotional response from a patient. The key principle is responding to the patient's emotions before delivering information.

Motivational interviewing techniques appear in questions about behaviour change, particularly around smoking cessation, alcohol reduction, and weight management. The OARS framework (Open questions, Affirmations, Reflections, Summaries) is worth knowing well.

You should also understand concepts like health literacy, the use of interpreters, capacity in the context of communication (distinct from Mental Capacity Act assessments), and telephone and video consultations. Since the pandemic, remote consultation skills have become a more prominent part of the RCGP curriculum.

AKT Navigator covers all consultation models with questions, audio revision, and detailed explanations aligned to the RCGP curriculum.`,
    aliases: ["consultation skills", "communication", "shared decision making"],
  },
  {
    slug: "equality-diversity-inclusion",
    name: "Equality, Diversity and Inclusion",
    category: "Professional",
    description:
      "Understand health inequalities, cultural competence, and the Equality Act as applied to general practice. Covers unconscious bias, reasonable adjustments, and inclusive care.",
    metaDescription:
      "Free AKT revision for equality, diversity and inclusion. Cover the Equality Act, health inequalities, unconscious bias, and inclusive care with audio and questions.",
    content: `Equality, diversity and inclusion questions in the AKT focus on the legal framework and its practical application in general practice. The Equality Act 2010 is central and you need to know the nine protected characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation.

The Act introduces the concept of reasonable adjustments for disabled patients. In practice, this means things like longer appointment slots, accessible premises, easy-read materials, and British Sign Language interpreters. AKT questions often test whether a proposed adjustment is reasonable or whether a practice is meeting its legal obligations.

Health inequalities are a major theme. The Marmot Review and subsequent reports established that health outcomes follow a social gradient, and the gap in life expectancy between the most and least deprived areas in England is significant. You should understand the inverse care law (Tudor Hart, 1971), which states that those who need healthcare most are least likely to receive it.

Cultural competence goes beyond language barriers. It includes understanding different health beliefs, approaches to death and dying, dietary practices, and attitudes to mental health across different communities. AKT questions may present scenarios where cultural factors influence a patient's presentation or their response to treatment.

Unconscious bias affects clinical decision-making. Research shows that patients from ethnic minority backgrounds are less likely to be offered certain treatments and more likely to be detained under the Mental Health Act. You should understand how bias operates and what steps can mitigate it, such as structured clinical assessments and audit.

NICE guidance on reducing health inequalities includes recommendations on digital inclusion, interpreting services, and targeted screening in deprived populations. The NHS Long Term Plan sets out commitments to reduce health inequalities, and you may see questions about Core20PLUS5, the national approach to reducing inequalities in healthcare.`,
    aliases: ["health inequalities", "cultural competence", "equality act"],
  },
  {
    slug: "evidence-in-practice",
    name: "Evidence in Practice",
    category: "Professional",
    description:
      "Critical appraisal, research methodology, and evidence-based medicine as tested in the AKT. Covers study design, statistics, NNT, sensitivity, specificity, and clinical guidelines.",
    metaDescription:
      "Free AKT revision for evidence-based practice and statistics. Master NNT, sensitivity, specificity, study design, and critical appraisal with questions and audio.",
    content: `Evidence in practice makes up roughly 10% of the AKT and is one of the areas trainees most commonly neglect. The questions are often formula-based and follow predictable patterns, making them some of the easiest marks on the paper if you learn the core concepts.

Study design is fundamental. You need to recognise randomised controlled trials, cohort studies, case-control studies, cross-sectional surveys, and systematic reviews. Each has specific strengths and limitations. RCTs are the gold standard for intervention studies but cannot answer every clinical question. Case-control studies work backwards from outcome to exposure and are useful for rare diseases.

Statistical concepts tested include sensitivity (how well a test detects disease), specificity (how well it rules out disease), positive predictive value (PPV), negative predictive value (NPV), number needed to treat (NNT), number needed to harm (NNH), absolute risk reduction (ARR), relative risk, odds ratios, and confidence intervals.

NNT is calculated as 1 divided by the absolute risk reduction. AKT questions often give you event rates in two groups and ask you to calculate the NNT. For example, if a drug reduces events from 20% to 15%, the ARR is 5% and the NNT is 20. This means you need to treat 20 patients for one additional patient to benefit.

Sensitivity and specificity require a 2x2 contingency table. Sensitivity equals true positives divided by all positives (TP + FN). Specificity equals true negatives divided by all negatives (TN + FP). A highly sensitive test is good for ruling out disease (SnNOut), while a highly specific test is good for ruling in disease (SpPIn).

Critical appraisal involves evaluating whether a study's conclusions are valid, applicable, and clinically meaningful. CONSORT guidelines apply to trials, STROBE to observational studies, and PRISMA to systematic reviews.

NICE guideline development uses the GRADE framework to rate evidence quality from high to very low. Understanding how NICE interprets evidence helps you answer questions about guideline recommendations and their strength.`,
    aliases: ["EBM", "statistics", "critical appraisal", "research methods", "NNT", "sensitivity specificity"],
  },
  {
    slug: "continuity-quality-safety-prescribing",
    name: "Continuity of Care, Quality Improvement, Safety and Prescribing",
    category: "Professional",
    description:
      "Quality improvement, patient safety, significant event analysis, and prescribing principles. Covers audit cycles, QOF, medication safety, and MHRA alerts.",
    metaDescription:
      "Free AKT revision for QI, prescribing, and patient safety. Cover audit cycles, SEA, QOF indicators, MHRA alerts, and medication safety with questions and audio.",
    content: `This topic spans quality improvement methodology, patient safety systems, and prescribing principles. It is heavily tested in the AKT because safe prescribing and quality improvement are central to everyday general practice.

The audit cycle is a fundamental QI tool. A clinical audit measures current practice against a defined standard, implements changes, and re-audits to see if practice improved. You need to distinguish audit from research: audit measures against known standards while research generates new knowledge. Audit does not need ethical approval; research does.

Significant event analysis (SEA) is the process of investigating and learning from clinical incidents. It involves identifying the event, gathering data, analysing what happened and why, agreeing on actions, and monitoring implementation. AKT questions may ask about the correct sequence or the purpose of each step.

The Quality and Outcomes Framework (QOF) is a pay-for-performance scheme that incentivises practices to meet clinical indicators across conditions like diabetes, hypertension, and mental health. You should know the general structure and common indicators, though specific thresholds change annually.

Prescribing questions cover a wide range. You need to know the principles of rational prescribing, BNF categories, drug interactions, prescribing in renal and hepatic impairment, prescribing in pregnancy and breastfeeding, and MHRA drug safety alerts. Common alerts include the risks of valproate in women of childbearing age, the cardiovascular risks of NSAIDs, and QT prolongation with certain antibiotics and antipsychotics.

Medication safety includes understanding of controlled drugs legislation, prescription fraud prevention, repeat prescribing systems, and polypharmacy reviews. The STOPP/START criteria help identify potentially inappropriate prescribing in older adults and are a common source of AKT questions.

Patient safety frameworks include the Swiss cheese model (Reason), which explains how incidents occur when multiple system failures align. Never events, duty of candour, and the role of the CQC in monitoring safety are also tested.`,
    aliases: ["prescribing", "patient safety", "QI", "audit", "QOF", "medication safety"],
  },
  {
    slug: "leadership-management",
    name: "Leadership and Management",
    category: "Professional",
    description:
      "GP leadership, practice management, and NHS structures. Covers CQC, appraisal and revalidation, team working, and medico-legal responsibilities.",
    metaDescription:
      "Free AKT revision for GP leadership and management. Cover CQC inspections, appraisal, revalidation, NHS structures, and medico-legal topics with questions and audio.",
    content: `Leadership and management questions test your knowledge of NHS structures, regulatory bodies, practice management, and professional responsibilities. These are often seen as dry topics, but they account for a meaningful portion of the AKT.

The Care Quality Commission (CQC) inspects and rates GP practices against five key questions: Is the service safe, effective, caring, responsive, and well-led? You should know the possible ratings (outstanding, good, requires improvement, inadequate) and what triggers a CQC inspection. Practices rated as inadequate may be placed in special measures.

Appraisal and revalidation are linked but distinct processes. Annual appraisal involves reflecting on your practice, reviewing CPD, reviewing significant events, and setting objectives. Revalidation happens every five years and is the GMC's process for confirming that a doctor remains fit to practise. The responsible officer makes a recommendation to the GMC based on appraisal evidence.

NHS structures are tested regularly. You need to understand the roles of NHS England, integrated care boards (ICBs), primary care networks (PCNs), and local medical committees (LMCs). ICBs replaced clinical commissioning groups in 2022 and are responsible for planning and commissioning healthcare for their population.

Employment law relevant to general practice includes understanding of salaried GP contracts, partnership agreements, locum arrangements, and the distinction between employed and self-employed status. The GMS, PMS, and APMS contracts govern how practices are funded.

Fitness to practise concerns involve understanding the GMC's processes, mandatory reporting obligations, and the duty to raise concerns about colleagues. The GMC can impose conditions, suspend, or erase a doctor from the register. You should know the threshold for referral and the difference between health concerns and conduct concerns.

Teamworking and delegation are tested through scenarios about skill mix, role boundaries, and appropriate delegation within the practice team including nurses, healthcare assistants, pharmacists, and social prescribers.`,
    aliases: ["practice management", "CQC", "revalidation", "NHS structure"],
  },
  {
    slug: "population-planetary-health",
    name: "Population and Planetary Health",
    category: "Professional",
    description:
      "Public health, epidemiology, screening programmes, and sustainability in healthcare. Covers vaccination schedules, health promotion, and planetary health.",
    metaDescription:
      "Free AKT revision for population and planetary health. Cover vaccination schedules, screening programmes, epidemiology, and NHS sustainability with questions and audio.",
    content: `Population and planetary health covers public health principles, screening programmes, vaccination schedules, and the environmental impact of healthcare. This topic has expanded in recent years with the addition of planetary health to the RCGP curriculum.

Screening programmes are heavily tested. The UK National Screening Committee oversees programmes including cervical screening (ages 25-64), breast screening (ages 50-70, triennial mammography), bowel screening (ages 56-74, FIT test), abdominal aortic aneurysm screening (men aged 65), and diabetic eye screening (annual for all diabetics). You need to know the Wilson and Jungner criteria for evaluating screening programmes.

The UK vaccination schedule changes regularly and AKT questions reflect the current schedule. Key vaccinations include the childhood programme (6-in-1, PCV, MenB, Hib/MenC, MMR, 4-in-1 pre-school booster), the HPV vaccine (years 8-9), the flu vaccine (annual for at-risk groups, all over 65s, and children), the shingles vaccine (ages 70-79), and the pneumococcal vaccine (65+). COVID-19 vaccination is part of the ongoing programme.

Epidemiological concepts tested include incidence, prevalence, mortality rates, life expectancy, and disability-adjusted life years (DALYs). You should understand the difference between incidence (new cases over time) and prevalence (total cases at a point in time).

Health promotion models include the Tannahill model (health education, prevention, health protection), the Ottawa Charter, and behaviour change theory including the stages of change model (Prochaska and DiClemente). AKT questions may ask about appropriate health promotion strategies for specific populations.

Planetary health is a newer curriculum area. Healthcare contributes approximately 4-5% of the UK's carbon emissions. The NHS has committed to reaching net zero by 2040 for direct emissions and 2045 for the broader supply chain. Practical measures include reducing unnecessary prescribing (inhalers are a significant source of emissions), promoting active travel, and reducing waste. You may see questions about the relative carbon footprint of MDI vs DPI inhalers.

Travel health questions cover pre-travel risk assessment, destination-specific vaccinations, malaria prophylaxis, and advice for travellers with chronic conditions.`,
    aliases: ["public health", "epidemiology", "screening", "vaccination", "health promotion"],
  },

  // ── Life Stages (4) ───────────────────────────────────────
  {
    slug: "children-young-people",
    name: "Children and Young People",
    category: "Life Stages",
    description:
      "Paediatric presentations in primary care including child development, safeguarding, childhood infections, immunisation schedules, and adolescent health.",
    metaDescription:
      "Free AKT revision for children and young people. Cover child development milestones, safeguarding, childhood infections, and immunisation with questions and audio.",
    content: `Paediatric presentations in primary care are a major AKT topic. You need to recognise common childhood conditions, understand developmental milestones, know the immunisation schedule, and be confident in safeguarding processes.

Child development milestones are tested frequently. Key milestones include smiling at 6 weeks, sitting unsupported at 6 months, first words at 12 months, walking at 12-18 months, and combining two words by 2 years. You need to know when to refer for developmental concerns and which milestones are most predictive of later problems.

Safeguarding is a core competency. You should understand the categories of abuse (physical, emotional, sexual, neglect), recognise concerning presentations (unexplained injuries, failure to thrive, inappropriate sexual behaviour, frequent attendance), and know the referral pathway. GPs have a duty to share information with children's social care if they have concerns about a child's welfare. Fraser competence and Gillick competence govern consent in under-16s.

Common childhood infections tested include chickenpox (infectivity period, management, when to refer), hand foot and mouth disease, scarlet fever (notifiable, requires antibiotics), measles (notifiable, complications including encephalitis), slapped cheek (parvovirus B19, risk in pregnancy), and meningitis (non-blanching rash, when to give IM benzylpenicillin).

The childhood immunisation schedule is a reliable source of AKT questions. The 6-in-1 vaccine is given at 8, 12, and 16 weeks. MenB is given at 8 weeks, 16 weeks, and 1 year. PCV is given at 12 weeks and 1 year. MMR is given at 1 year and 3 years 4 months. The Hib/MenC booster is at 1 year.

Adolescent health covers areas including eating disorders (NICE recommends SCOFF screening), self-harm (assess intent, mental state, safeguarding), acne (stepped treatment approach), and sexual health (confidentiality for under-16s, Fraser competence). Mental health presentations in young people are increasingly common and the AKT reflects this.

Red flags in paediatrics include non-blanching rash, bulging fontanelle, bile-stained vomiting in neonates, and limp in a child with fever.`,
    aliases: ["paediatrics", "child health", "safeguarding", "immunisation", "adolescent health"],
  },
  {
    slug: "long-term-conditions-cancer",
    name: "People with Long-term Conditions Including Cancer",
    category: "Life Stages",
    description:
      "Management of chronic disease in general practice including multimorbidity, cancer recognition, two-week-wait referrals, and palliative transitions.",
    metaDescription:
      "Free AKT revision for long-term conditions and cancer. Cover multimorbidity management, 2WW referral criteria, and palliative transitions with questions and audio.",
    content: `This topic covers the management of patients with chronic diseases and the recognition of cancer in primary care. It is one of the most clinically relevant AKT topics because managing long-term conditions is the core work of general practice.

Multimorbidity affects over a quarter of the UK population and is the norm rather than the exception in general practice. NICE guideline NG56 on multimorbidity recommends an approach that considers treatment burden, polypharmacy, patient priorities, and the interaction between conditions. You should understand that guidelines for individual conditions may not apply straightforwardly to patients with multiple conditions.

Cancer recognition relies on understanding NICE NG12 (suspected cancer: recognition and referral). The guideline specifies two-week-wait (2WW) referral criteria for each cancer type. High-yield cancers for the AKT include lung (persistent cough, haemoptysis, unexplained weight loss in a smoker), colorectal (change in bowel habit over 60, unexplained iron deficiency anaemia, rectal mass), breast (unexplained lump in over-30s), and skin (pigmented lesion meeting the 7-point checklist).

The safety netting approach is critical when cancer cannot be ruled out. This means giving the patient clear instructions about when to return, what symptoms to watch for, and ensuring there is a system for following up investigation results.

Palliative transitions are the shift from active management of a long-term condition to a palliative approach. The GSF (Gold Standards Framework) Prognostic Indicator Guidance helps identify patients who may be in the last year of life. The surprise question ("Would you be surprised if this patient died in the next 12 months?") is a simple screening tool.

Annual reviews for long-term conditions follow QOF and NICE guidance. For diabetes, this includes HbA1c, renal function, blood pressure, cholesterol, foot examination, and retinal screening. For COPD, it includes spirometry review, inhaler technique, vaccination status, and exacerbation history. For heart failure, it includes medication optimisation, fluid assessment, and functional status.

Cancer survivorship is an expanding area. GPs play a key role in managing the long-term effects of cancer treatment, coordinating follow-up, and detecting recurrence.`,
    aliases: ["chronic disease", "cancer", "multimorbidity", "two week wait", "2WW"],
  },
  {
    slug: "older-adults",
    name: "Older Adults",
    category: "Life Stages",
    description:
      "Geriatric medicine in primary care including frailty, falls, dementia, polypharmacy, capacity assessment, and care home medicine.",
    metaDescription:
      "Free AKT revision for older adults. Cover frailty assessment, falls prevention, dementia diagnosis, polypharmacy, and capacity with questions and audio.",
    content: `Older adults medicine is a high-yield AKT topic because the ageing population makes up a large proportion of GP consultations. Questions often involve complex scenarios with multiple interacting conditions, medications, and social factors.

Frailty is a clinical syndrome characterised by reduced physiological reserve. The electronic Frailty Index (eFI) uses routine GP data to identify frailty. The Clinical Frailty Scale (Rockwood) ranges from 1 (very fit) to 9 (terminally ill). NICE recommends identifying frailty in people aged 65 and over and offering comprehensive geriatric assessment to those who are moderately or severely frail.

Falls are a common and preventable cause of morbidity. NICE guideline CG161 recommends a multifactorial risk assessment for people who have fallen or are at risk. This includes medication review (particularly antihypertensives, sedatives, and anticholinergics), visual assessment, cardiovascular assessment (including lying and standing blood pressure), gait and balance assessment, and home hazard assessment.

Dementia diagnosis in primary care follows the NICE pathway. Initial assessment includes a cognitive screening tool (GPCOG or 6-CIT are recommended for primary care), blood tests to exclude reversible causes (thyroid function, B12, folate, calcium, glucose, renal function), and referral to memory services for formal assessment. Treatment includes acetylcholinesterase inhibitors (donepezil, rivastigmine, galantamine) for mild to moderate Alzheimer's and memantine for moderate to severe. You should know contraindications and monitoring requirements.

Polypharmacy reviews are essential in older adults. The STOPP/START criteria provide evidence-based guidance on potentially inappropriate medications (STOPP) and medications that should be considered (START). Common STOPP examples include long-term NSAIDs in over-65s, benzodiazepines for more than 4 weeks, and anticholinergics in patients with dementia.

Capacity assessment follows the Mental Capacity Act 2005. The two-stage test asks: (1) Does the person have an impairment of or disturbance in the functioning of the mind or brain? (2) If so, does that impairment mean they cannot understand, retain, use or weigh, or communicate the relevant information? Capacity is decision-specific and time-specific.

Care home medicine involves structured medication reviews, advance care planning, and managing the interface between primary care, care home staff, and secondary care.`,
    aliases: ["geriatrics", "frailty", "dementia", "falls", "polypharmacy", "capacity"],
  },
  {
    slug: "end-of-life",
    name: "People at the End of Life",
    category: "Life Stages",
    description:
      "Palliative care, symptom management, advance care planning, and end-of-life decision making in the community. Covers syringe drivers, DNACPR, and bereavement.",
    metaDescription:
      "Free AKT revision for end-of-life care. Cover symptom management, syringe drivers, DNACPR, advance care planning, and bereavement support with questions and audio.",
    content: `End-of-life care is a core GP competency and a regular source of AKT questions. The focus is on symptom management in the community, advance care planning, and the legal and ethical framework around end-of-life decisions.

Symptom management in the last days of life commonly involves pain, nausea, breathlessness, agitation, and respiratory secretions. First-line medications include morphine for pain and breathlessness, midazolam for agitation and seizures, haloperidol or levomepromazine for nausea, and hyoscine butylbromide for respiratory secretions. These are often delivered via a syringe driver (continuous subcutaneous infusion) when the patient can no longer take oral medications.

Anticipatory prescribing means having injectable medications available in the patient's home before they are needed. The typical anticipatory medications kit includes morphine, midazolam, haloperidol, levomepromazine, and hyoscine butylbromide. Doses should be prescribed with clear instructions for use.

Advance care planning involves discussions about the patient's wishes for future care, including preferred place of death, treatment escalation decisions, and advance decisions to refuse treatment (ADRTs). An ADRT is legally binding if it is valid (made voluntarily by a competent adult) and applicable to the circumstances. If it involves refusing life-sustaining treatment, it must be in writing, signed, witnessed, and include a statement that it applies even if life is at risk.

DNACPR (Do Not Attempt Cardiopulmonary Resuscitation) decisions are clinical decisions, not patient requests. A clinician can make a DNACPR decision if CPR would not be successful. If CPR might work but the patient does not want it, a DNACPR can be completed with the patient's agreement. The decision should be communicated sensitively and documented clearly. ReSPECT forms are increasingly used as a broader framework for emergency treatment preferences.

Bereavement support in primary care includes recognising normal grief, identifying complicated grief, and knowing when to refer. The Kubler-Ross model (denial, anger, bargaining, depression, acceptance) describes common grief responses but is not a rigid sequence. Prolonged grief disorder is recognised when grief symptoms persist beyond 12 months and significantly impair functioning.

Certification of death, cremation forms, and referral to the coroner are practical tasks that GPs perform. You should know when death must be referred to the coroner, including deaths within 14 days of surgery, deaths related to an industrial disease, and deaths where the cause is unknown.`,
    aliases: ["palliative care", "end of life", "terminal care", "syringe driver", "DNACPR"],
  },

  // ── Clinical (22) ─────────────────────────────────────────
  {
    slug: "allergy-immunology",
    name: "Allergy and Immunology",
    category: "Clinical",
    description:
      "Allergic conditions in primary care including anaphylaxis management, food allergy, drug allergy, immunodeficiency, and immunisation.",
    metaDescription:
      "Free AKT revision for allergy and immunology. Cover anaphylaxis management, food allergy, drug allergy, and immunodeficiency with questions and 50+ hours of audio.",
    content: `Allergy and immunology questions in the AKT focus on recognition, management, and emergency treatment of allergic conditions. Anaphylaxis management is the highest priority topic and questions about it appear regularly.

Anaphylaxis follows the Resuscitation Council UK guidelines. The first-line treatment is intramuscular adrenaline (1:1000, 0.5ml in adults, 0.3ml in children 6-12, 0.15ml in children under 6) given into the anterolateral thigh. This should be repeated at 5-minute intervals if there is no improvement. After adrenaline, the patient needs airway management, high-flow oxygen, IV fluid resuscitation, and observation. Tryptase levels should be taken at the time of reaction, 1-2 hours after, and at baseline (24 hours or at follow-up). Every patient who experiences anaphylaxis should be prescribed two adrenaline auto-injectors and referred to an allergy clinic.

Food allergy in children is a common presentation. IgE-mediated allergy (immediate, within minutes to 2 hours) presents with urticaria, angioedema, vomiting, and anaphylaxis. Non-IgE-mediated allergy (delayed, hours to days) presents with eczema flares, reflux, colic, and bloody stools. Cow's milk protein allergy (CMPA) is the most common food allergy in infants. NICE recommends an elimination diet followed by supervised reintroduction for diagnosis.

Drug allergy documentation is important. Penicillin allergy is over-reported, and true IgE-mediated penicillin allergy is rare (estimated at less than 10% of people labelled as allergic). De-labelling inappropriate penicillin allergy is a priority because it leads to use of broader-spectrum antibiotics and worse outcomes. AKT questions may test whether a cross-reaction is likely between specific antibiotics.

Immunodeficiency presentations in primary care include recurrent infections (more than 4 ear infections per year, 2 pneumonias, or infections requiring IV antibiotics in a normally well person). Primary immunodeficiencies include IgA deficiency (commonest, often asymptomatic), common variable immunodeficiency, and X-linked agammaglobulinaemia. Secondary causes include HIV, diabetes, malignancy, immunosuppressive drugs, and splenectomy.

Patients with asplenia or hyposplenism require lifelong prophylactic antibiotics (phenoxymethylpenicillin), pneumococcal, meningococcal, Hib, and annual influenza vaccinations. They should carry an alert card.`,
    aliases: ["allergy", "anaphylaxis", "immunology", "food allergy"],
  },
  {
    slug: "cardiovascular",
    name: "Cardiovascular Health",
    category: "Clinical",
    description:
      "Cardiovascular disease in primary care including hypertension, heart failure, atrial fibrillation, lipid management, and chest pain assessment.",
    metaDescription:
      "Free AKT revision for cardiovascular health. Cover hypertension, heart failure, AF, lipid management, and chest pain with 20,000+ questions and audio revision.",
    content: `Cardiovascular disease is one of the most heavily tested clinical topics in the AKT. You need to know the current NICE guidelines for hypertension, heart failure, atrial fibrillation, lipid management, and acute coronary syndromes.

Hypertension management follows NICE guideline NG136. Diagnosis requires ambulatory or home blood pressure monitoring to confirm clinic readings. Treatment thresholds: offer treatment at stage 1 (clinic BP 140/90 or higher, ABPM 135/85 or higher) if there is target organ damage, CVD risk over 10%, renal disease, or diabetes. Step 1 treatment: ACE inhibitor or ARB (CCB for Afro-Caribbean patients or those over 55). Step 2: ACE inhibitor/ARB plus CCB. Step 3: add thiazide-like diuretic. Step 4 (resistant hypertension): consider spironolactone if potassium is 4.5 or below.

Heart failure diagnosis requires NT-proBNP levels. Levels above 2000 pg/mL require urgent echocardiography within 2 weeks. Levels 400-2000 require echocardiography within 6 weeks. Treatment of heart failure with reduced ejection fraction (HFrEF) follows a stepwise approach: ACE inhibitor plus beta-blocker, add mineralocorticoid receptor antagonist (spironolactone or eplerenone), consider SGLT2 inhibitor (dapagliflozin), and consider sacubitril/valsartan to replace ACE inhibitor if still symptomatic.

Atrial fibrillation management involves rate control vs rhythm control and anticoagulation. CHA2DS2-VASc score determines stroke risk and need for anticoagulation. DOACs (apixaban, rivaroxaban, edoxaban) are first-line over warfarin. Rate control with a beta-blocker is first-line for most patients.

Lipid management uses QRISK3 for primary prevention. Offer atorvastatin 20mg if 10-year CVD risk is 10% or more. For secondary prevention, offer atorvastatin 80mg. Aim for more than 40% reduction in non-HDL cholesterol at 3 months.

Acute chest pain assessment in primary care requires rapid risk stratification. Refer immediately if suspected ACS (call 999, give aspirin 300mg). NICE guideline CG95 covers stable chest pain assessment and when to refer for investigation.`,
    aliases: ["cardiology", "hypertension", "heart failure", "AF", "atrial fibrillation", "chest pain", "lipids"],
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    category: "Clinical",
    description:
      "Skin conditions commonly seen in general practice including eczema, psoriasis, skin cancer recognition, acne, and fungal infections.",
    metaDescription:
      "Free AKT revision for dermatology. Cover eczema, psoriasis, skin cancer recognition, acne management, and fungal infections with questions and audio revision.",
    content: `Dermatology is a high-yield AKT topic. Many questions include clinical descriptions or images and ask for diagnosis or management. Pattern recognition is important, but so is knowing the stepped treatment approaches for common conditions.

Eczema management follows a stepwise approach. Emollients are the foundation for all patients, applied liberally and frequently. Mild eczema: add mild topical corticosteroid (hydrocortisone 1%). Moderate eczema: moderate potency steroid (betamethasone valerate 0.025% or clobetasone butyrate). Severe eczema: potent topical corticosteroid (betamethasone valerate 0.1%). Face and flexures require lower potency. Tacrolimus (topical calcineurin inhibitor) is second-line for moderate to severe eczema, particularly useful on the face.

Psoriasis presents with well-demarcated erythematous plaques with silvery scale, typically on extensor surfaces, scalp, and lower back. First-line treatment is a potent topical corticosteroid combined with a vitamin D analogue (calcipotriol). Scalp psoriasis is treated with potent corticosteroid scalp applications. Refer if topical treatment fails or if psoriatic arthritis is suspected (NICE recommends rheumatology referral within 2 weeks).

Skin cancer recognition is critical. The 7-point checklist for pigmented lesions includes three major features (change in size, irregular shape, irregular colour) and four minor features (largest diameter 7mm or more, inflammation, oozing, change in sensation). Score 3 or more triggers a 2WW referral. Basal cell carcinomas present as pearly, telangiectatic nodules or non-healing ulcers. Squamous cell carcinomas present as keratinised nodules or non-healing ulcers on sun-exposed skin.

Acne treatment is stepped. Mild comedonal: topical retinoid (adapalene). Mild inflammatory: add topical benzoyl peroxide or topical antibiotic. Moderate: oral antibiotics (lymecycline or doxycycline for a maximum of 3 months) combined with topical retinoid. Severe or scarring: refer for consideration of isotretinoin. The teratogenicity of isotretinoin and the pregnancy prevention programme are commonly tested.

Fungal infections include dermatophyte infections (tinea corporis, pedis, cruris, capitis, unguium), candidal infections (oral thrush, vulvovaginal candidiasis), and pityriasis versicolor. Tinea capitis requires oral antifungal treatment (terbinafine or griseofulvin) and is common in children.`,
    aliases: ["skin", "eczema", "psoriasis", "skin cancer", "acne", "rashes"],
  },
  {
    slug: "ent-speech-hearing",
    name: "ENT, Speech and Hearing",
    category: "Clinical",
    description:
      "Ear, nose and throat presentations including otitis media, hearing loss, tonsillitis, sinusitis, epistaxis, and vertigo.",
    metaDescription:
      "Free AKT revision for ENT. Cover otitis media, hearing loss, tonsillitis, sinusitis, epistaxis, and vertigo with 20,000+ questions and audio revision.",
    content: `ENT presentations are common in general practice and well represented in the AKT. The main areas are ear infections and hearing loss, throat infections, nasal conditions, and vertigo.

Acute otitis media is one of the most common childhood presentations. NICE recommends a delayed prescribing strategy for most cases: reassurance, analgesia, and a prescription to use if symptoms do not improve within 48-72 hours. Immediate antibiotics are recommended for systemically unwell children, children under 2 with bilateral otitis media, and those with otorrhoea. First-line antibiotic is amoxicillin.

Hearing loss types: conductive (outer or middle ear problem, e.g. wax, otitis media with effusion, otosclerosis) vs sensorineural (inner ear or nerve, e.g. presbyacusis, noise-induced, acoustic neuroma). Sudden sensorineural hearing loss is a red flag requiring urgent ENT referral. Rinne and Weber tuning fork tests distinguish the types: Rinne is normal (air > bone) in sensorineural loss but abnormal (bone > air) in conductive loss. Weber lateralises to the affected ear in conductive loss and to the unaffected ear in sensorineural loss.

Tonsillitis management uses the FeverPAIN or Centor criteria to determine likelihood of bacterial infection and need for antibiotics. FeverPAIN scores of 4-5 suggest antibiotic treatment is likely beneficial. First-line is phenoxymethylpenicillin for 10 days. Avoid amoxicillin if glandular fever is suspected (causes a rash). Recurrent tonsillitis (7 episodes in 1 year, 5 per year for 2 years, or 3 per year for 3 years) may warrant tonsillectomy referral.

Sinusitis is usually viral and self-limiting. NICE recommends no antibiotic for acute sinusitis unless symptoms persist beyond 10 days without improvement. If antibiotics are needed, first-line is phenoxymethylpenicillin. Refer urgently if periorbital cellulitis, visual changes, or severe frontal headache are present.

Vertigo has three main primary care diagnoses. BPPV causes brief episodes triggered by head position changes and is diagnosed with the Dix-Hallpike test. Treatment is the Epley manoeuvre. Vestibular neuritis causes prolonged vertigo lasting days with nausea but no hearing loss. Meniere's disease causes episodic vertigo with hearing loss, tinnitus, and aural fullness.

Epistaxis is usually anterior (from Little's area) and managed with firm pressure for 15-20 minutes. Posterior bleeds require nasal packing and ENT referral.`,
    aliases: ["ENT", "ear", "hearing loss", "tonsillitis", "sinusitis", "vertigo"],
  },
  {
    slug: "eyes-vision",
    name: "Eyes and Vision",
    category: "Clinical",
    description:
      "Ophthalmology in primary care including red eye, acute vision loss, glaucoma, cataracts, and diabetic retinopathy screening.",
    metaDescription:
      "Free AKT revision for eyes and vision. Cover red eye differential diagnosis, acute vision loss, glaucoma, cataracts, and diabetic retinopathy with questions and audio.",
    content: `Ophthalmology questions in the AKT focus on differentiating causes of red eye, recognising emergencies requiring same-day referral, and understanding common chronic eye conditions.

Red eye differential diagnosis is a frequent AKT question. Conjunctivitis is the most common cause: bacterial (purulent discharge, sticky eyes), viral (watery discharge, often following URTI), and allergic (itching, bilateral, seasonal). Bacterial conjunctivitis is usually self-limiting; chloramphenicol drops can be used if needed. Most important is distinguishing benign causes from emergencies.

Same-day ophthalmology referral is needed for acute angle-closure glaucoma (painful red eye, haloes around lights, semi-dilated fixed pupil, hard globe), anterior uveitis (painful red eye, photophobia, small irregular pupil, ciliary flush), corneal ulcer (pain, photophobia, visible white opacity on cornea), and chemical injury (immediate irrigation for at least 20 minutes, then emergency referral).

Acute vision loss requires urgent assessment. Causes include giant cell arteritis (temporal headache, jaw claudication, raised ESR/CRP, treat immediately with high-dose prednisolone before biopsy), central retinal artery occlusion (painless sudden loss, cherry red spot, emergency), central retinal vein occlusion (sudden blurred vision, dilated tortuous veins on fundoscopy), and retinal detachment (flashes, floaters, curtain across vision).

Glaucoma screening and management: open-angle glaucoma is the most common type and is often asymptomatic until advanced. Risk factors include raised intraocular pressure, family history, Afro-Caribbean ethnicity, and myopia. Treatment is with prostaglandin analogue eye drops (latanoprost) as first-line. Monitoring includes IOP measurement, visual field testing, and optic disc assessment.

Cataracts cause gradual painless loss of vision with glare. Referral for surgery is indicated when vision impacts daily activities. Diabetic retinopathy is screened annually in all diabetic patients. Stages progress from background (microaneurysms, dot haemorrhages) through pre-proliferative (cotton wool spots, venous beading) to proliferative (new vessel formation, requiring urgent laser treatment).`,
    aliases: ["ophthalmology", "red eye", "vision loss", "glaucoma", "cataracts"],
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    category: "Clinical",
    description:
      "GI conditions including IBS, IBD, coeliac disease, GORD, liver disease, and GI cancer recognition. Covers H. pylori testing and management.",
    metaDescription:
      "Free AKT revision for gastroenterology. Cover IBS, IBD, coeliac disease, GORD, liver disease, and H. pylori with 20,000+ questions and audio revision.",
    content: `Gastroenterology is a heavily tested AKT topic covering a wide range of conditions from functional disorders to cancer recognition. Knowing when to test, when to treat, and when to refer is key.

Irritable bowel syndrome (IBS) is diagnosed clinically using NICE criteria: abdominal pain or bloating related to defecation, with altered bowel habit, for at least 6 months. Key investigations to exclude organic disease include FBC, ESR/CRP, coeliac serology, and calprotectin (to distinguish IBS from IBD). Management is stepwise: lifestyle and dietary advice (regular meals, adequate fluids, limit caffeine and alcohol), low FODMAP diet (with dietitian support), antispasmodics (mebeverine, hyoscine), laxatives for constipation-predominant IBS, loperamide for diarrhoea-predominant IBS, and low-dose tricyclic antidepressants if first-line measures fail.

Inflammatory bowel disease includes Crohn's disease (any part of GI tract, skip lesions, transmural inflammation) and ulcerative colitis (continuous inflammation starting at rectum, limited to mucosa). Calprotectin above 100 supports referral. Acute flares of UC may present with bloody diarrhoea, urgency, and systemic symptoms. First-line treatment for UC flares is mesalazine (topical and/or oral).

Coeliac disease affects approximately 1% of the UK population but is significantly underdiagnosed. Test with tissue transglutaminase (tTG) IgA antibodies and total IgA level (to exclude IgA deficiency which causes false negatives). The patient must be eating gluten for at least 6 weeks before testing. Positive serology requires duodenal biopsy for confirmation. Treatment is a strict lifelong gluten-free diet.

GORD management follows a stepwise approach. Lifestyle measures first, then PPI (omeprazole or lansoprazole) for 4-8 weeks. Refer for endoscopy if alarm symptoms are present (dysphagia, weight loss, persistent vomiting, GI bleeding, palpable mass) or if aged over 55 with unexplained new dyspepsia.

H. pylori testing uses urea breath test or stool antigen test (stop PPI 2 weeks before). Eradication therapy is triple therapy: PPI plus two antibiotics (amoxicillin and clarithromycin, or metronidazole if penicillin-allergic) for 7 days.

Liver disease presentations include non-alcoholic fatty liver disease (most common chronic liver disease in the UK, managed with lifestyle modification), alcohol-related liver disease, and hepatitis B and C. Know the enhanced liver fibrosis (ELF) test and FIB-4 score for fibrosis assessment.`,
    aliases: ["GI", "IBS", "IBD", "coeliac", "GORD", "liver", "H pylori"],
  },
  {
    slug: "genomic-medicine",
    name: "Genomic Medicine",
    category: "Clinical",
    description:
      "Genetic conditions, inheritance patterns, genetic testing and counselling in primary care. Covers pharmacogenomics and cancer genetics.",
    metaDescription:
      "Free AKT revision for genomic medicine. Cover inheritance patterns, genetic testing, cancer genetics, and pharmacogenomics with questions and audio revision.",
    content: `Genomic medicine is a growing area in the AKT curriculum. Questions focus on inheritance patterns, common genetic conditions, when to refer for genetic testing, and the basics of pharmacogenomics.

Inheritance patterns are commonly tested. Autosomal dominant conditions (50% chance of inheritance, affected parent): Huntington's disease, familial hypercholesterolaemia, Marfan syndrome, neurofibromatosis, polycystic kidney disease (adult type). Autosomal recessive conditions (25% chance if both parents are carriers): cystic fibrosis, sickle cell disease, thalassaemia, phenylketonuria, haemochromatosis. X-linked recessive conditions (50% of sons affected if mother is carrier): haemophilia A and B, Duchenne muscular dystrophy, G6PD deficiency, red-green colour blindness.

Genetic testing referral in primary care is indicated for patients with a strong family history of cancer (multiple first-degree relatives, young age of onset), suspected familial hypercholesterolaemia (total cholesterol above 7.5 in adults or 6.7 in children with family history), suspected inherited cardiac conditions (sudden cardiac death in a young relative), and carrier testing for conditions like sickle cell and thalassaemia.

Cancer genetics: BRCA1 and BRCA2 mutations significantly increase the risk of breast and ovarian cancer. Refer using NICE guideline CG164 criteria: 10% or greater probability of BRCA mutation based on family history. Lynch syndrome (hereditary non-polyposis colorectal cancer) increases the risk of colorectal, endometrial, and other cancers. Familial adenomatous polyposis (FAP) involves hundreds of colonic polyps and near-certain colorectal cancer without prophylactic surgery.

Pharmacogenomics affects prescribing decisions. DPYD deficiency affects metabolism of fluoropyrimidine chemotherapy (5-FU, capecitabine), leading to life-threatening toxicity. TPMT deficiency affects azathioprine metabolism and should be tested before starting treatment. CYP2D6 status affects codeine metabolism: poor metabolisers get no pain relief while ultra-rapid metabolisers are at risk of toxicity.

Prenatal screening includes the combined test (nuchal translucency, beta-hCG, PAPP-A at 11-13 weeks) for Down's, Edwards', and Patau's syndromes. Non-invasive prenatal testing (NIPT) uses cell-free fetal DNA in maternal blood and is now offered as a contingent screening test in the NHS.`,
    aliases: ["genetics", "genomics", "genetic testing", "inheritance", "pharmacogenomics"],
  },
  {
    slug: "gynaecology-breast",
    name: "Gynaecology and Breast",
    category: "Clinical",
    description:
      "Gynaecological conditions including menorrhagia, PCOS, endometriosis, menopause, cervical screening, and breast lump assessment.",
    metaDescription:
      "Free AKT revision for gynaecology and breast. Cover menorrhagia, PCOS, endometriosis, menopause, and cervical screening with questions and audio revision.",
    content: `Gynaecology questions in the AKT cover common conditions managed in primary care, cervical screening, breast assessment, and menopause management. Several of these have had recent guideline updates.

Menorrhagia (heavy menstrual bleeding) is defined as excessive menstrual blood loss that interferes with quality of life. NICE recommends first-line treatment with the levonorgestrel-releasing intrauterine system (Mirena). Second-line options include tranexamic acid, NSAIDs (mefenamic acid), combined oral contraceptive, or cyclical progestogens. Investigate with FBC to check for iron deficiency. Refer if treatment fails, intermenstrual or postcoital bleeding is present, or pelvic mass is found.

PCOS is diagnosed using the Rotterdam criteria: at least two of oligomenorrhoea or amenorrhoea, clinical or biochemical hyperandrogenism, and polycystic ovaries on ultrasound. Management includes lifestyle modification (weight loss improves symptoms significantly), combined oral contraceptive for menstrual regulation and acne, metformin if glucose intolerance is present, and fertility treatment (letrozole or clomifene) if pregnancy is desired.

Endometriosis affects approximately 10% of women of reproductive age. Symptoms include cyclical pelvic pain, dysmenorrhoea, deep dyspareunia, and subfertility. NICE recommends empirical treatment with analgesia and hormonal contraceptives before referral. Laparoscopy is the gold standard for diagnosis. Treatment includes hormonal suppression (combined pill, progestogens, GnRH analogues) and surgical excision.

Menopause management has changed significantly. NICE guideline NG23 recommends offering HRT to women with vasomotor symptoms, after discussing benefits and risks. HRT reduces osteoporosis risk and improves quality of life. Women with a uterus need combined HRT (oestrogen plus progestogen). Those without a uterus can use oestrogen alone. The breast cancer risk with HRT is small and varies with type and duration. Cognitive behavioural therapy is an effective non-hormonal option for vasomotor symptoms.

Cervical screening uses HPV primary testing. Samples are tested for high-risk HPV first. If HPV positive, cytology is performed on the same sample. Screening intervals: every 3 years (ages 25-49), every 5 years (ages 50-64). Abnormal results follow a colposcopy referral pathway.

Breast lump assessment: all unexplained breast lumps in women over 30 should be referred via the 2-week wait pathway. In women under 30, refer if the lump persists after the next menstrual cycle. Triple assessment (clinical examination, imaging, biopsy) is performed in the breast clinic.`,
    aliases: ["gynaecology", "menopause", "PCOS", "endometriosis", "cervical screening", "breast"],
  },
  {
    slug: "haematology",
    name: "Haematology",
    category: "Clinical",
    description:
      "Blood disorders in primary care including iron deficiency anaemia, B12 deficiency, anticoagulation management, and haematological malignancies.",
    metaDescription:
      "Free AKT revision for haematology. Cover iron deficiency anaemia, B12 deficiency, anticoagulation, and blood cancers with 20,000+ questions and audio revision.",
    content: `Haematology questions in the AKT typically focus on interpreting blood results, managing anaemia, anticoagulation, and recognising haematological malignancies in primary care.

Iron deficiency anaemia is the most common anaemia worldwide. It presents with microcytic hypochromic anaemia (low MCV, low MCH). Ferritin is the most useful single test, but it is an acute phase reactant, so levels may be falsely normal in infection or inflammation. In men and postmenopausal women, iron deficiency always needs investigation for GI blood loss. NICE recommends both upper and lower GI investigation. In premenopausal women, menorrhagia is the most common cause. Treatment is oral iron (ferrous sulphate 200mg twice daily) for at least 3 months after haemoglobin normalises.

B12 deficiency causes macrocytic anaemia. Common causes include pernicious anaemia (autoimmune destruction of parietal cells, positive intrinsic factor antibodies), dietary deficiency (vegans), and metformin use. Neurological symptoms (peripheral neuropathy, subacute combined degeneration of the spinal cord) can occur with or without anaemia and may be irreversible if treatment is delayed. Treatment is hydroxocobalamin injections: initially every other day for 2 weeks if neurological symptoms present, then every 3 months.

Folate deficiency also causes macrocytic anaemia. Always check B12 before treating folate deficiency, because folate supplementation can mask B12 deficiency and worsen neurological damage.

Anticoagulation management is a major topic. DOACs (apixaban, rivaroxaban, edoxaban, dabigatran) are first-line for most indications including AF, DVT, and PE. Key advantages over warfarin: no routine monitoring, fewer interactions, rapid onset. Key disadvantages: renal dose adjustment required (especially dabigatran), limited reversal agents (idarucizumab for dabigatran, andexanet alfa for factor Xa inhibitors), and cannot be used in mechanical heart valves or moderate-severe mitral stenosis.

Warfarin is still used for mechanical heart valves and antiphospholipid syndrome. INR monitoring is essential. Target INR 2.5 for most indications, 3.5 for mechanical mitral valves. Drug interactions are extensive (antibiotics, NSAIDs, amiodarone all increase INR).

Haematological malignancies to recognise: unexplained lymphadenopathy, unexplained splenomegaly, unexplained bruising, persistent unexplained fatigue with abnormal FBC. Urgent FBC and blood film should prompt urgent referral if abnormalities suggest leukaemia or lymphoma.`,
    aliases: ["blood disorders", "anaemia", "anticoagulation", "warfarin", "DOAC"],
  },
  {
    slug: "infectious-diseases-travel",
    name: "Infectious Diseases and Travel Health",
    category: "Clinical",
    description:
      "Common infections, travel medicine, tropical diseases, and infection control. Covers HIV, hepatitis, travel vaccinations, and antimicrobial stewardship.",
    metaDescription:
      "Free AKT revision for infectious diseases and travel health. Cover HIV, hepatitis, travel vaccinations, and antimicrobial stewardship with questions and audio.",
    content: `Infectious diseases and travel health cover a broad range of AKT content including common infections managed in primary care, notifiable diseases, HIV, hepatitis, travel medicine, and antimicrobial stewardship.

HIV testing is recommended in areas with high prevalence (more than 2 per 1000) and for all new GP registrations in those areas. Indicator conditions for HIV testing include herpes zoster in under-65s, unexplained lymphadenopathy, oral candidiasis, unexplained weight loss, and any STI. Fourth-generation tests detect both HIV antigen and antibodies and have a window period of approximately 4 weeks. Post-exposure prophylaxis (PEP) should be started within 72 hours of exposure.

Hepatitis B is notifiable and has defined markers for interpretation. HBsAg positive indicates current infection. Anti-HBs indicates immunity (from vaccination or past infection). Anti-HBc IgM indicates acute infection. HBeAg indicates high infectivity. Vaccination is offered to at-risk groups including healthcare workers, household contacts of cases, and men who have sex with men.

Hepatitis C is curable with direct-acting antiviral therapy. Screen high-risk groups including people who inject drugs, those who received blood transfusions before 1991, and people from high-prevalence countries. Refer all HCV-positive patients to hepatology.

Antimicrobial stewardship is a major theme. Principles include avoiding antibiotics for self-limiting viral infections, using narrow-spectrum antibiotics where possible, prescribing the shortest effective course, and following local antibiotic guidelines. Delayed prescribing is recommended for many respiratory tract infections, UTIs in young women (with back-up prescription), and acute otitis media.

Notifiable diseases that GPs must report to Public Health include measles, meningitis, tuberculosis, food poisoning, whooping cough, scarlet fever, and hepatitis (A, B, C, E). Notification is a statutory duty and does not require patient consent.

Travel health consultations include risk assessment based on destination, itinerary, and individual patient factors. Yellow fever vaccination is required for entry to some countries and is only available at designated centres. Malaria prophylaxis depends on the destination: atovaquone-proguanil, doxycycline, or mefloquine. Travellers' diarrhoea is usually self-limiting; standby antibiotics (azithromycin) may be appropriate for high-risk travellers.`,
    aliases: ["infections", "travel health", "HIV", "hepatitis", "tropical medicine", "antibiotics"],
  },
  {
    slug: "learning-disability",
    name: "Learning Disability",
    category: "Clinical",
    description:
      "Healthcare for people with learning disabilities including annual health checks, reasonable adjustments, capacity, and health inequalities.",
    metaDescription:
      "Free AKT revision for learning disability. Cover annual health checks, reasonable adjustments, capacity assessment, and health inequalities with questions and audio.",
    content: `Learning disability healthcare is an important AKT topic that sits at the intersection of clinical medicine, ethics, and health inequalities. People with learning disabilities have significantly worse health outcomes than the general population, with an average life expectancy 15-20 years shorter.

Annual health checks are offered to all adults with learning disabilities on the GP learning disability register. The check covers physical health, mental health, medication review, health promotion, and coordination with other services. It follows a structured template and should result in a health action plan. Uptake varies significantly between practices and is a focus of NHS quality improvement efforts.

Reasonable adjustments are a legal requirement under the Equality Act 2010. In practice, this means longer appointment slots, easy-read appointment letters and health information, accessible premises, allowing a support worker or family member to be present, and adapting communication style. AKT questions may present a scenario and ask which adjustment is most appropriate.

Capacity assessment follows the Mental Capacity Act 2005. People with learning disabilities must not be assumed to lack capacity simply because of their diagnosis. Capacity is decision-specific: a person may have capacity to consent to a blood test but not to a complex surgical procedure. The five principles of the MCA are: assume capacity, support decision-making, right to make unwise decisions, best interests, and least restrictive option.

Health inequalities are stark. People with learning disabilities are more likely to die from preventable causes including aspiration pneumonia, constipation (a leading cause of death in this group, often due to underdiagnosis and delayed treatment), and epilepsy. The LeDeR (Learning Disability Mortality Review) programme reviews all deaths and has identified systemic issues including diagnostic overshadowing (attributing symptoms to the learning disability rather than investigating them).

Epilepsy is more common in people with learning disabilities (approximately 25% compared to 1% in the general population). SUDEP (sudden unexpected death in epilepsy) risk is higher, and medication management may be more complex.

Mental health conditions are also more common, but diagnosis is often delayed because of communication difficulties and diagnostic overshadowing. Behaviour changes should prompt physical health assessment before assuming a psychiatric cause.`,
    aliases: ["learning difficulties", "intellectual disability", "annual health check"],
  },
  {
    slug: "maternity-reproductive-health",
    name: "Maternity and Reproductive Health",
    category: "Clinical",
    description:
      "Pregnancy, postnatal care, contraception, and fertility in primary care. Covers antenatal screening, gestational diabetes, and postpartum mental health.",
    metaDescription:
      "Free AKT revision for maternity and reproductive health. Cover contraception, antenatal care, gestational diabetes, and postnatal mental health with questions and audio.",
    content: `Maternity and reproductive health covers contraception, pregnancy management in primary care, and postnatal care. Contraception questions are among the most commonly tested items in the AKT.

Contraception options and their effectiveness. Long-acting reversible contraceptives (LARCs) are the most effective: copper IUD (non-hormonal, lasts 5-10 years), levonorgestrel IUS (Mirena lasts 5 years, also treats menorrhagia), subdermal implant (Nexplanon, lasts 3 years), and depot injection (Depo-Provera, every 12-13 weeks). The combined oral contraceptive is contraindicated in women with migraine with aura (due to stroke risk), BMI over 35, age over 35 who smoke, and uncontrolled hypertension. The UKMEC criteria (categories 1-4) guide safe prescribing: Category 1 (no restriction), 2 (advantages outweigh risks), 3 (risks outweigh advantages), 4 (unacceptable risk).

Emergency contraception: levonorgestrel (up to 72 hours), ulipristal acetate (up to 120 hours), or copper IUD (up to 120 hours, most effective option). The copper IUD is the most effective emergency contraception and should be offered to all women presenting within the time window.

Antenatal care in primary care involves booking before 10 weeks, arranging dating scan at 11-14 weeks, combined screening for Down's/Edwards'/Patau's syndromes, anomaly scan at 18-20 weeks, and routine blood tests (FBC, blood group, antibodies, hepatitis B, HIV, syphilis, rubella immunity). Gestational diabetes screening (OGTT at 24-28 weeks) is offered to women with risk factors: BMI above 30, previous GDM, family history of diabetes, or ethnicity with high diabetes prevalence.

Prescribing in pregnancy: folic acid 400mcg daily before conception until 12 weeks (5mg if high risk: previous neural tube defect, on antiepileptics, BMI over 30, diabetes). Vitamin D 10mcg daily throughout pregnancy. Drugs to avoid: ACE inhibitors, statins, warfarin (first trimester teratogenicity), retinoids, methotrexate, and sodium valproate.

Postnatal mental health: the Edinburgh Postnatal Depression Scale (EPDS) screens for depression. Postnatal depression affects 10-15% of women. Baby blues (first 2 weeks, self-limiting) must be distinguished from postnatal depression (persistent low mood, anhedonia, guilt) and puerperal psychosis (rare, onset within 2 weeks, psychiatric emergency requiring urgent referral).`,
    aliases: ["pregnancy", "contraception", "fertility", "antenatal", "postnatal", "obstetrics"],
  },
  {
    slug: "mental-health",
    name: "Mental Health",
    category: "Clinical",
    description:
      "Psychiatric conditions in primary care including depression, anxiety, psychosis, eating disorders, and the Mental Health Act. Covers SSRIs and risk assessment.",
    metaDescription:
      "Free AKT revision for mental health. Cover depression, anxiety, SSRI prescribing, psychosis, eating disorders, and the Mental Health Act with questions and audio.",
    content: `Mental health is a high-yield AKT topic. Questions cover diagnosis, management, prescribing, risk assessment, and the legal framework. Depression and anxiety account for the majority of questions, but you also need to know about psychosis, eating disorders, and the Mental Health Act.

Depression is diagnosed using ICD-11 criteria: persistent low mood, loss of interest or enjoyment, and reduced energy, plus at least two additional symptoms including poor concentration, low self-esteem, guilt, pessimism, sleep disturbance, appetite change, and suicidal thoughts. Severity guides treatment: mild depression is managed with guided self-help, exercise, and watchful waiting. Moderate to severe depression warrants an SSRI (sertraline is first-line per NICE) alongside psychological therapy.

SSRI prescribing: sertraline is first-line. Common side effects include nausea, headache, insomnia, and sexual dysfunction. The suicide risk warning applies to all antidepressants in under-25s. Discontinuation symptoms occur with abrupt cessation, particularly with paroxetine and venlafaxine. Serotonin syndrome is a rare but serious complication of excessive serotonergic activity (agitation, tremor, clonus, hyperthermia).

Anxiety disorders include generalised anxiety disorder (GAD), panic disorder, social anxiety, and OCD. NICE recommends stepped care: self-help and psychoeducation first, then CBT (the most effective psychological therapy for anxiety), then SSRI (sertraline for GAD and panic, fluoxetine for OCD) if psychological therapy alone is insufficient.

Psychosis in primary care: refer urgently to early intervention in psychosis services if first episode. Antipsychotics should ideally be initiated by a specialist. Know the metabolic side effects of antipsychotics (weight gain, diabetes, dyslipidaemia) and the need for metabolic monitoring (weight, glucose, lipids at baseline and annually).

The Mental Health Act 1983 (amended 2007): Section 2 is assessment for up to 28 days (requires two doctors and an approved mental health professional). Section 3 is treatment for up to 6 months. Section 136 allows police to remove a person from a public place to a place of safety. GPs can be one of the recommending doctors for Sections 2 and 3.

Risk assessment for suicide involves asking directly about suicidal thoughts (this does not increase risk), assessing intent, plan, means, and protective factors. High-risk features include a clear plan, access to means, previous attempts, social isolation, and substance misuse.`,
    aliases: ["psychiatry", "depression", "anxiety", "psychosis", "mental health act", "SSRI"],
  },
  {
    slug: "metabolic-endocrinology",
    name: "Metabolic Problems and Endocrinology",
    category: "Clinical",
    description:
      "Endocrine and metabolic conditions including diabetes, thyroid disease, obesity, adrenal disorders, and calcium metabolism.",
    metaDescription:
      "Free AKT revision for metabolic and endocrine conditions. Cover diabetes management, thyroid disease, obesity, and adrenal disorders with questions and audio.",
    content: `Metabolic and endocrine conditions are heavily tested in the AKT, with diabetes and thyroid disease being the most common topics. You need to know current NICE guidelines and be able to interpret blood results.

Type 2 diabetes management follows the NICE NG28 pathway. First-line is metformin (standard release initially, modified release if GI side effects). If HbA1c remains above target (usually 48 mmol/mol for most patients), add a second agent. SGLT2 inhibitors (dapagliflozin, empagliflozin) are recommended early, especially if the patient has CVD, heart failure, or CKD, because of their cardiovascular and renal benefits. GLP-1 receptor agonists (semaglutide, liraglutide) are options if BMI is above 35 or other oral agents have failed. Insulin is introduced when oral and injectable agents cannot achieve target HbA1c.

Diabetic complications screening: annual review including HbA1c, renal function (eGFR and urine ACR), blood pressure, cholesterol, foot examination (monofilament and pulse check), and retinal screening. Diabetic kidney disease is indicated by persistently raised ACR (above 3 mg/mmol on two occasions). Treatment includes ACE inhibitor or ARB and SGLT2 inhibitor.

Thyroid disease: hypothyroidism is diagnosed by raised TSH with low free T4. Subclinical hypothyroidism (raised TSH, normal T4) may warrant treatment if TSH is above 10, symptoms are present, or the patient is trying to conceive. Levothyroxine is the treatment, with TSH monitoring 6-8 weeks after dose changes and annually once stable. Hyperthyroidism presents with weight loss, tremor, palpitations, heat intolerance, and lid lag. Graves' disease (autoimmune, positive TSH receptor antibodies) is the most common cause. Treatment options include carbimazole (block and replace or titration regimen), radioiodine, and surgery.

Adrenal conditions: Addison's disease (primary adrenal insufficiency) presents with fatigue, weight loss, hyperpigmentation, and postural hypotension. Short Synacthen test is the diagnostic investigation. Treatment is lifelong hydrocortisone and fludrocortisone. Sick day rules are critical: double the hydrocortisone dose during illness.

Calcium metabolism: hypercalcaemia is most commonly caused by primary hyperparathyroidism (raised PTH with raised calcium) and malignancy (suppressed PTH). Symptoms include fatigue, thirst, constipation, confusion, and renal stones ("bones, stones, groans, and moans").`,
    aliases: ["diabetes", "thyroid", "endocrinology", "obesity", "HbA1c", "insulin"],
  },
  {
    slug: "musculoskeletal",
    name: "Musculoskeletal Health",
    category: "Clinical",
    description:
      "MSK conditions including back pain, osteoarthritis, rheumatoid arthritis, osteoporosis, and soft tissue injuries. Covers red flags and referral criteria.",
    metaDescription:
      "Free AKT revision for musculoskeletal health. Cover back pain red flags, osteoarthritis, rheumatoid arthritis, and osteoporosis with questions and audio revision.",
    content: `Musculoskeletal conditions are one of the most common reasons for GP consultations and are well represented in the AKT. Questions focus on diagnosis, red flag recognition, and management pathways.

Low back pain is extremely common. NICE guideline NG59 recommends against routine imaging for non-specific low back pain. Red flags requiring urgent investigation include cauda equina syndrome (bilateral leg weakness, saddle anaesthesia, urinary retention or incontinence), suspected spinal fracture (significant trauma, osteoporosis risk, corticosteroid use), suspected malignancy (weight loss, history of cancer, age over 50 with new onset), and suspected infection (fever, IV drug use, immunosuppression). Management of non-specific back pain includes staying active, analgesia, and physiotherapy. Avoid prolonged bed rest.

Osteoarthritis is the most common joint disease. Diagnosis is clinical: joint pain that worsens with activity and improves with rest, morning stiffness lasting less than 30 minutes, crepitus, and bony enlargement. X-ray findings include joint space narrowing, osteophytes, subchondral sclerosis, and subchondral cysts. NICE recommends core treatments for all patients: exercise, weight management, and written information. Pharmacological options: paracetamol is no longer recommended as a standalone treatment (evidence of limited benefit). Topical NSAIDs are first-line for hand and knee OA. Oral NSAIDs at the lowest effective dose for the shortest duration if topical treatment is insufficient. Intra-articular corticosteroid injections provide short-term relief. Joint replacement referral when symptoms significantly impair quality of life despite conservative management.

Rheumatoid arthritis presents with symmetrical small joint polyarthritis, morning stiffness lasting more than 30 minutes, and systemic symptoms. NICE recommends urgent referral if persistent synovitis (even in just one joint) lasting more than 6 weeks, or positive squeeze test of the MCP or MTP joints. Blood tests include RF, anti-CCP antibodies (more specific than RF), ESR, and CRP. Early aggressive treatment with DMARDs (methotrexate is first-line) improves long-term outcomes.

Osteoporosis assessment uses FRAX or QFracture tools. DEXA scan is the gold standard for diagnosis. T-score of -2.5 or below indicates osteoporosis. Treatment includes bisphosphonates (alendronate first-line), calcium and vitamin D supplementation, and lifestyle measures. Take alendronate on an empty stomach with plenty of water, remain upright for 30 minutes.

Gout presents with acute monoarthritis, typically affecting the first MTP joint. Serum urate may be normal during an acute attack. Acute treatment: NSAID or colchicine. Long-term urate-lowering therapy (allopurinol, started 2-4 weeks after acute attack resolves) is indicated after two or more attacks per year or if tophi, joint damage, or renal stones are present.`,
    aliases: ["MSK", "back pain", "arthritis", "osteoporosis", "rheumatology", "joint pain"],
  },
  {
    slug: "neurodevelopmental-neurodiversity",
    name: "Neurodevelopmental Conditions and Neurodiversity",
    category: "Clinical",
    description:
      "ADHD, autism spectrum conditions, and neurodiversity in primary care. Covers assessment pathways, medication, and reasonable adjustments.",
    metaDescription:
      "Free AKT revision for neurodevelopmental conditions. Cover ADHD, autism, assessment pathways, and medication management with questions and audio revision.",
    content: `Neurodevelopmental conditions are an expanding area of the RCGP curriculum and increasingly tested in the AKT. The focus is on recognition in primary care, appropriate referral pathways, and ongoing management.

ADHD presents with inattention, hyperactivity, and impulsivity that are persistent, pervasive (present in multiple settings), and cause functional impairment. In adults, hyperactivity often manifests as inner restlessness rather than physical overactivity. NICE guideline NG87 recommends that GPs can recognise symptoms and refer for specialist assessment, but should not initiate ADHD medication. Referral is to a psychiatrist or specialist ADHD service. Diagnosis requires symptoms present since childhood (before age 12), though formal diagnosis may occur much later.

ADHD medication: methylphenidate (Ritalin, Concerta) is first-line for children and young people. Lisdexamfetamine is first-line for adults. Non-stimulant options include atomoxetine and guanfacine. Before starting stimulant medication, baseline assessments include height, weight, blood pressure, pulse, and cardiovascular history. Ongoing monitoring includes cardiovascular parameters, growth (in children), appetite, sleep, and mood. Side effects include appetite suppression, sleep disturbance, headache, and increased blood pressure.

Autism spectrum conditions present with persistent differences in social communication and interaction, alongside restricted and repetitive patterns of behaviour, interests, or activities. In primary care, recognition may come from developmental concerns in children (delayed social communication, limited imaginative play, repetitive behaviours) or from adults who present with social difficulties, sensory sensitivities, rigid thinking patterns, and mental health comorbidities.

The diagnostic pathway for autism involves referral to a specialist multidisciplinary team. GPs should not diagnose autism but should recognise when to refer. Key indicators include difficulty with social reciprocity, limited use or understanding of nonverbal communication, difficulty developing and maintaining relationships, and sensory sensitivities.

Reasonable adjustments for neurodivergent patients in general practice include clear and literal communication, predictable appointment structures, reduced waiting in busy waiting rooms, written summaries of consultations, and awareness that sensory environments (lighting, noise) may be distressing.

Comorbidities are common: anxiety, depression, sleep disorders, and eating disorders frequently co-occur with both ADHD and autism. Mental health presentations in neurodivergent patients may present atypically and require adapted assessment approaches.`,
    aliases: ["ADHD", "autism", "ASD", "neurodiversity", "neurodevelopmental"],
  },
  {
    slug: "neurology",
    name: "Neurology",
    category: "Clinical",
    description:
      "Neurological conditions including headache, epilepsy, stroke, multiple sclerosis, Parkinson's disease, and neuropathy.",
    metaDescription:
      "Free AKT revision for neurology. Cover headache diagnosis, epilepsy management, stroke recognition, MS, and Parkinson's with questions and audio revision.",
    content: `Neurology is a broad AKT topic covering headache, epilepsy, stroke, movement disorders, and neuropathy. Pattern recognition and red flag awareness are key.

Headache diagnosis is frequently tested. Tension-type headache is the most common: bilateral, pressing quality, mild to moderate severity. Migraine presents with unilateral pulsating headache, nausea, photophobia and phonophobia, lasting 4-72 hours. Migraine with aura (visual disturbance preceding headache by 5-60 minutes) is a contraindication to combined oral contraceptives due to stroke risk. Cluster headache is severe unilateral periorbital pain with autonomic features (lacrimation, nasal congestion, ptosis), occurring in clusters over weeks. Red flags: thunderclap headache (sudden onset, worst ever, subarachnoid haemorrhage until proven otherwise), headache with fever and neck stiffness (meningitis), headache with papilloedema (raised intracranial pressure), new headache in over-50s with scalp tenderness (giant cell arteritis).

Epilepsy management in primary care involves recognising seizure types, knowing first-line medications, and understanding when to refer. First-line for focal seizures: lamotrigine or levetiracetam. First-line for generalised tonic-clonic seizures: sodium valproate (not in women of childbearing age due to teratogenicity) or lamotrigine. First-line for absence seizures: ethosuximide or sodium valproate. Women of childbearing age must not be prescribed valproate unless no alternative exists and they are on the Pregnancy Prevention Programme. Driving restrictions: must be seizure-free for 12 months (or 12 months of seizures only during sleep if established pattern).

Stroke recognition uses the FAST mnemonic (Face, Arms, Speech, Time). Acute management is emergency referral for thrombolysis (within 4.5 hours of onset) or thrombectomy (within 6-24 hours for large vessel occlusion). Secondary prevention includes antiplatelet therapy (clopidogrel 75mg), statin, blood pressure management, and lifestyle modification. TIA requires urgent assessment within 24 hours.

Parkinson's disease presents with the classic triad: bradykinesia (mandatory for diagnosis), plus either resting tremor or rigidity. Refer to neurology for diagnosis. Do not start treatment in primary care. First-line treatment is levodopa (co-careldopa or co-beneldopa) for motor symptoms. Dopamine agonists (ropinirole, pramipexole) are alternatives, particularly in younger patients, but carry risks of impulse control disorders.

Multiple sclerosis presents with episodes of neurological dysfunction separated in time and space. Common presentations include optic neuritis (painful vision loss), transverse myelitis, and sensory symptoms. Refer to neurology for MRI and diagnosis. GPs manage ongoing symptom management and coordination of care.`,
    aliases: ["headache", "epilepsy", "stroke", "MS", "Parkinsons", "migraine", "neuropathy"],
  },
  {
    slug: "renal-urology",
    name: "Renal and Urological Conditions",
    category: "Clinical",
    description:
      "Kidney and urological conditions including CKD, UTI, prostate disease, haematuria, and renal stones. Covers eGFR monitoring and referral thresholds.",
    metaDescription:
      "Free AKT revision for renal and urological conditions. Cover CKD staging, UTI management, prostate disease, and haematuria with questions and audio revision.",
    content: `Renal and urological conditions are frequently tested in the AKT. You need to know CKD staging and management, UTI treatment, prostate assessment, and when to investigate haematuria.

Chronic kidney disease is staged by eGFR and albuminuria. Stage 1: eGFR above 90 with evidence of kidney damage. Stage 2: eGFR 60-89. Stage 3a: 45-59. Stage 3b: 30-44. Stage 4: 15-29. Stage 5: below 15. Albuminuria categories: A1 (ACR below 3), A2 (3-30), A3 (above 30). Management includes blood pressure control (target below 140/90, or 130/80 if ACR above 70), ACE inhibitor or ARB if ACR above 30 or if diabetic with ACR above 3, SGLT2 inhibitor if CKD with ACR above 22.6 (or type 2 diabetes with any CKD), statin for cardiovascular risk reduction, and avoiding nephrotoxic drugs (NSAIDs, aminoglycosides). Refer to nephrology if eGFR below 30, ACR above 70, sustained eGFR decline of more than 25% in 12 months, or uncontrolled hypertension despite 4 agents.

UTI management: uncomplicated lower UTI in women is treated empirically without culture. First-line: nitrofurantoin 100mg modified release twice daily for 3 days (avoid if eGFR below 45). Second-line: trimethoprim 200mg twice daily for 3 days. Men with UTI, pregnant women, catheterised patients, and recurrent UTI always require urine culture. UTI in pregnancy requires treatment (nitrofurantoin or cefalexin, avoid trimethoprim in first trimester). Recurrent UTI (3 or more per year): self-start antibiotics, postcoital prophylaxis, or continuous low-dose prophylaxis.

Prostate assessment: PSA testing requires informed consent and discussion of benefits and limitations. Factors that raise PSA include BPH, prostatitis, UTI, recent ejaculation, and digital rectal examination. Refer via 2WW if PSA is above the age-specific reference range or if there is a hard, irregular prostate on DRE. BPH management: watchful waiting for mild symptoms, alpha-blockers (tamsulosin) for moderate symptoms, 5-alpha reductase inhibitors (finasteride) if prostate is enlarged.

Haematuria: visible haematuria in anyone over 45 requires 2WW urology referral (suspected bladder cancer). Non-visible haematuria with proteinuria suggests renal disease (refer nephrology). Non-visible haematuria without proteinuria in over-60s requires 2WW referral for urology assessment.

Renal stones present with acute colicky loin pain radiating to the groin. Non-contrast CT KUB is the gold standard investigation. Management of acute renal colic includes NSAIDs (diclofenac) as first-line analgesia. Stones less than 5mm usually pass spontaneously. Medical expulsive therapy with tamsulosin may help stones 5-10mm. Refer urgently if signs of infection with obstruction (pyonephrosis), bilateral obstruction, or single functioning kidney.`,
    aliases: ["kidney", "CKD", "UTI", "prostate", "urology", "haematuria"],
  },
  {
    slug: "respiratory",
    name: "Respiratory Health",
    category: "Clinical",
    description:
      "Respiratory conditions including asthma, COPD, pneumonia, lung cancer, and sleep apnoea. Covers inhaler technique, spirometry, and BTS guidelines.",
    metaDescription:
      "Free AKT revision for respiratory health. Cover asthma, COPD, pneumonia, lung cancer, and sleep apnoea with 20,000+ questions and 50+ hours of audio.",
    content: `Respiratory conditions are a major AKT topic. Asthma and COPD are the most heavily tested, but you also need to know about pneumonia, lung cancer recognition, and sleep apnoea.

Asthma diagnosis in adults requires demonstration of variable airflow obstruction. NICE recommends spirometry (FEV1/FVC ratio below 0.7 supports obstruction), bronchodilator reversibility (improvement of 12% and 200ml in FEV1), FeNO (above 40 ppb supports eosinophilic inflammation), and peak flow variability (more than 20% variation). Treatment follows a stepwise approach: SABA reliever as needed (step 1), add low-dose ICS (step 2), add LTRA or LABA (step 3), increase ICS to medium dose (step 4), refer to specialist (step 5). NICE and BTS/SIGN guidelines differ slightly: NICE recommends LTRA before LABA at step 3, while BTS/SIGN recommends LABA first. Check which guideline the question references.

COPD is diagnosed with post-bronchodilator spirometry showing FEV1/FVC below 0.7 in a patient with appropriate symptoms and exposure history (typically smoking). Severity is graded by FEV1: mild (above 80%), moderate (50-79%), severe (30-49%), very severe (below 30%). Management: smoking cessation (most important intervention), inhaled bronchodilators (SABA or SAMA as needed), long-acting bronchodilators (LAMA or LABA), ICS added if asthmatic features or repeated exacerbations despite dual bronchodilator therapy. Pulmonary rehabilitation is offered if MRC breathlessness grade 3 or above.

Pneumonia in primary care is assessed using CRB-65 score: Confusion, Respiratory rate above 30, Blood pressure (systolic below 90 or diastolic below 60), and age 65 or over. Score 0: treat at home with amoxicillin. Score 1-2: consider hospital assessment. Score 3-4: urgent hospital admission.

Lung cancer recognition: NICE recommends urgent CXR if aged 40 or over with unexplained haemoptysis, or if aged 40 or over with two or more unexplained symptoms including cough, fatigue, shortness of breath, chest pain, weight loss, or appetite loss. Refer via 2WW if CXR suggests lung cancer.

Obstructive sleep apnoea presents with daytime somnolence, loud snoring, and witnessed apnoeas. Screen with the Epworth Sleepiness Scale. Refer to sleep services for home sleep study. Treatment is CPAP for moderate to severe OSA. Patients must inform the DVLA.

Inhaler technique assessment is essential at every review. Poor technique is the most common cause of poor asthma and COPD control. Check technique before stepping up treatment.`,
    aliases: ["asthma", "COPD", "pneumonia", "lung cancer", "inhaler", "spirometry"],
  },
  {
    slug: "sexual-health",
    name: "Sexual Health",
    category: "Clinical",
    description:
      "Sexual health in primary care including STI testing and management, PrEP, sexual dysfunction, and LGBTQ+ healthcare.",
    metaDescription:
      "Free AKT revision for sexual health. Cover STI diagnosis and management, PrEP, sexual dysfunction, and LGBTQ+ healthcare with questions and audio revision.",
    content: `Sexual health questions in the AKT cover STI diagnosis and management, HIV prevention, sexual dysfunction, and inclusive healthcare for LGBTQ+ patients.

Chlamydia is the most common bacterial STI in the UK. It is often asymptomatic. The National Chlamydia Screening Programme offers testing to sexually active under-25s. Diagnosis is by NAAT (nucleic acid amplification test) on a vulvovaginal swab or first-catch urine sample. Treatment: doxycycline 100mg twice daily for 7 days (first-line, changed from azithromycin due to evidence of superior cure rates). Partner notification and treatment are essential.

Gonorrhoea presents with purulent urethral or vaginal discharge. Diagnosis by NAAT and culture (culture is needed for antibiotic sensitivity testing). Treatment is a single dose of IM ceftriaxone 1g. Dual therapy with azithromycin is no longer routinely recommended. A test of cure is required 2 weeks after treatment.

Syphilis has resurged in the UK. Primary syphilis presents with a painless chancre. Secondary syphilis presents with a widespread non-itchy rash, condylomata lata, and systemic symptoms. Diagnosis by syphilis serology (EIA screening, RPR/VDRL for monitoring). Treatment is IM benzathine penicillin. Refer to GUM services.

PrEP (pre-exposure prophylaxis) with tenofovir/emtricitabine is available on the NHS for people at high risk of HIV. This includes men who have sex with men (MSM) with recent STIs, condomless sex, or partners with detectable HIV, and other groups at substantial risk. GPs may be involved in monitoring (renal function every 3-6 months, STI screening, HIV testing).

Sexual dysfunction is common but underdiscussed. Erectile dysfunction: assess cardiovascular risk (ED is an independent cardiovascular risk factor), check testosterone, glucose, and lipids. First-line treatment is PDE5 inhibitor (sildenafil). Contraindicated with nitrates. Female sexual dysfunction includes low desire (consider psychosocial factors, medication effects, hormonal factors), pain (vaginismus, vulvodynia), and arousal disorders.

LGBTQ+ healthcare involves understanding specific health needs: higher rates of mental health conditions, substance misuse, and certain cancers in MSM. Trans healthcare in primary care includes respectful use of pronouns, understanding of gender-affirming hormone therapy side effects and monitoring, and cervical screening for trans men who retain a cervix.`,
    aliases: ["STI", "sexual health", "chlamydia", "PrEP", "sexual dysfunction"],
  },
  {
    slug: "smoking-alcohol-substance-misuse",
    name: "Smoking, Alcohol and Substance Misuse",
    category: "Clinical",
    description:
      "Addiction medicine in primary care including smoking cessation, alcohol use disorders, opioid dependence, and harm reduction approaches.",
    metaDescription:
      "Free AKT revision for smoking, alcohol, and substance misuse. Cover cessation strategies, AUDIT scoring, opioid substitution, and harm reduction with questions and audio.",
    content: `Smoking, alcohol, and substance misuse are important AKT topics that test your knowledge of screening tools, brief interventions, pharmacological treatments, and harm reduction approaches.

Smoking cessation is the single most effective intervention a GP can offer. NICE recommends Very Brief Advice (VBA): ask about smoking status, advise on the best way to quit, and act on the patient's response. Pharmacological options include nicotine replacement therapy (NRT, available in patches, gum, lozenges, inhalers), varenicline (most effective single agent, partial nicotine receptor agonist), and bupropion (alternative, contraindicated in epilepsy). Combination NRT (patch plus short-acting form) is as effective as varenicline. E-cigarettes are increasingly used and NICE acknowledges they are substantially less harmful than smoking, though they are not licensed as medicines.

Alcohol use is screened using the AUDIT questionnaire (10 questions, score 0-40). AUDIT-C is a shorter screening version (3 questions). Scores of 8 or above on the full AUDIT indicate hazardous or harmful drinking. Brief interventions (feedback, responsibility, advice, menu of options, empathy, self-efficacy) are effective and should be offered opportunistically.

Alcohol dependence is characterised by tolerance, withdrawal symptoms, compulsive drinking, and continued use despite harm. Alcohol withdrawal can be life-threatening (seizures, delirium tremens). Community detoxification with reducing dose chlordiazepoxide is appropriate for patients without a history of complicated withdrawal, seizures, or delirium tremens. Those with severe dependence or comorbidities need inpatient detoxification. Post-detox relapse prevention options include acamprosate (reduces craving), naltrexone (blocks rewarding effects of alcohol), and disulfiram (causes unpleasant reaction if alcohol is consumed).

Opioid dependence is managed with opioid substitution therapy (OST): methadone (oral liquid, daily supervised consumption initially) or buprenorphine (sublingual, less risk of respiratory depression). Treatment is usually initiated by a specialist service, but GPs may take over prescribing under shared care arrangements. Naloxone for emergency reversal of opioid overdose is available to patients, families, and hostels.

Drug-related harm reduction includes needle exchange programmes, naloxone distribution, hepatitis B vaccination for people who inject drugs, and hepatitis C testing and treatment (now curable with direct-acting antivirals).

Cannabis is the most commonly used illicit drug. Regular use is associated with psychosis, particularly in adolescents and those with a family history. Synthetic cannabinoids (e.g. Spice) carry much higher risks including severe psychiatric symptoms and physical harm.`,
    aliases: ["smoking", "alcohol", "drugs", "addiction", "substance misuse", "smoking cessation"],
  },
  {
    slug: "urgent-unscheduled-care",
    name: "Urgent and Unscheduled Care",
    category: "Clinical",
    description:
      "Emergency presentations in primary care including sepsis recognition, acute abdomen, anaphylaxis, and medical emergencies. Covers NEWS2 and safety netting.",
    metaDescription:
      "Free AKT revision for urgent and unscheduled care. Cover sepsis recognition, NEWS2, acute abdomen, anaphylaxis, and safety netting with questions and audio revision.",
    content: `Urgent and unscheduled care tests your ability to recognise and manage emergencies in the primary care setting. This is a high-stakes topic because getting it wrong in practice means delayed treatment and worse outcomes.

Sepsis recognition is critical. The National Early Warning Score 2 (NEWS2) helps identify deteriorating patients, but in primary care, use the NICE guideline NG51 criteria. High-risk features include: systolic BP below 90, heart rate above 130, respiratory rate above 25, SpO2 below 91%, not passed urine in 18 hours, mottled or ashen skin, lactate above 2, and non-blanching rash. If sepsis is suspected: give antibiotics within one hour (if you can), call 999, and start IV fluids if available. Do not wait for blood results.

The acute abdomen requires systematic assessment. Key differentials by location include: right iliac fossa (appendicitis, ovarian pathology, ectopic pregnancy), right upper quadrant (biliary colic, cholecystitis, hepatitis), left iliac fossa (diverticulitis, ovarian pathology), epigastric (peptic ulcer, pancreatitis, MI), and generalised (peritonitis, bowel obstruction, ruptured AAA). Red flags requiring immediate referral include peritonism (guarding, rebound tenderness), haemodynamic instability, and signs of bowel obstruction.

Anaphylaxis management follows Resuscitation Council UK guidelines. IM adrenaline 1:1000 (500mcg in adults) into the anterolateral thigh. Repeat every 5 minutes if no improvement. Position the patient flat with legs raised (or sitting up if breathing difficulty). High-flow oxygen, IV fluids for shock, and antihistamines and hydrocortisone as adjuncts (not first-line). After treatment: observe for at least 6-12 hours (biphasic reactions occur), prescribe two adrenaline auto-injectors, and refer to allergy clinic.

Other medical emergencies in primary care include: meningitis (non-blanching rash, headache, neck stiffness, photophobia, give IM benzylpenicillin before transfer), acute asthma (PEFR below 50% predicted, SpO2 below 92%, unable to complete sentences, give salbutamol nebuliser and oral prednisolone, call 999), and MI (chest pain, sweating, nausea, give aspirin 300mg, GTN, call 999).

Safety netting is the systematic approach to managing diagnostic uncertainty. It involves communicating clearly with the patient about what to watch for, when to return, and what to do if symptoms worsen. Effective safety netting includes specific symptoms to watch for (not just "come back if worse"), a timeframe for follow-up, and a plan for what happens next. Document your safety net advice.

The duty doctor role involves triaging urgent same-day requests, managing acute presentations, and deciding between primary care management, emergency department referral, and 999 transfer. Effective triage requires recognising red flags rapidly and acting decisively.`,
    aliases: ["emergency", "urgent care", "sepsis", "acute", "safety netting", "NEWS2"],
  },
];
