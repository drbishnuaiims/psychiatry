
/*
=========================================================
  PSYCHIATRY — GUIDELINE REGISTRY

  ORDER:

  -------------------------------------------------------
  NEWEST CPG
      ↓
  2nd NEWEST
      ↓
  3rd NEWEST
      ↓
  ...
      ↓
  OLDEST CPG

  IMPORTANT:
  - Always add the newest CPG at the TOP.
  - Use the next available "NEW CPG SLOT".
  - Do not change the order of older CPGs.
  - "url" must exactly match the HTML filename.
  - URLs must be relative to the website root.
=========================================================
*/

const GUIDELINES = [

  {
    title: "Lithium: Square Clinical Cards",
    shortTitle: "Lithium Clinical Cards",
    authors: "The Prescriber's Guide: Psychiatry",
    year: "2026",
    journal: "The Prescriber's Guide: Psychiatry / Clinical Cards",
    category: "Books / Prescriber's Guide: Psychiatry / Mood Stabilizers",
    description: "Interactive clinical cards covering lithium indications, dosing, therapeutic drug monitoring, adverse effects, toxicity, interactions, special populations and practical prescribing decisions.",
    tags: ["Lithium", "Mood Stabilizer", "Bipolar Disorder", "Clinical Cards"],
    keywords: [
      "lithium", "lithium carbonate", "mood stabilizer", "mood stabiliser",
      "bipolar disorder", "acute mania", "lithium dose", "lithium level",
      "therapeutic drug monitoring", "lithium toxicity", "lithium interactions",
      "renal monitoring", "thyroid monitoring", "prescriber's guide psychiatry",
      "psychiatry prescriber guide", "clinical cards"
    ],
    url: "books/prescribers-guide-psychiatry/lithium.html",
    readTime: "15 min read"
  },

  {
    title: "Levetiracetam: Square Clinical Cards",
    shortTitle: "Levetiracetam Clinical Cards",
    authors: "Epilepsy Prescriber’s Guide",
    year: "2026",
    journal: "Epilepsy Prescriber’s Guide / Clinical Cards",
    category: "Books / Epilepsy / Antiseizure Medications",
    description: "Interactive clinical cards covering levetiracetam indications, dosing, renal adjustment, adverse effects, drug interactions, monitoring, pregnancy and practical prescribing decisions.",
    tags: ["Levetiracetam", "Epilepsy", "Antiseizure Medication", "Clinical Cards"],
    keywords: ["levetiracetam", "keppra", "antiepileptic drug", "antiseizure medication", "SV2A", "epilepsy", "seizure", "renal dose adjustment", "behavioural adverse effects", "levetiracetam dosing"],
    url: "books/epilepsy-prescriber-guide-to-aed/levetiracetam.html",
    readTime: "15 min read"
  },

  {
    title: "CBT in Anxiety Disorders and OC-Related Disorders",
    shortTitle: "CBT for Anxiety and OCRDs",
    authors: "Reddy, Sudhir, Manjula, Arumugham, Narayanaswamy",
    year: "2020",
    journal: "Indian Journal of Psychiatry",
    category: "Psychotherapy / Anxiety Disorders / OCRDs",
    description: "Bedside reference to cognitive behavioural therapy for anxiety disorders and obsessive-compulsive related disorders, including assessment, formulation, exposure and disorder-specific interventions.",
    tags: ["CBT", "Anxiety Disorders", "OCD", "Exposure Therapy"],
    keywords: ["cognitive behavioural therapy", "CBT", "anxiety disorders", "obsessive compulsive disorder", "OCD", "OCRD", "panic disorder", "generalised anxiety disorder", "GAD", "social anxiety", "phobia", "exposure therapy", "habit reversal training"],
    url: "cpg/cpg-cbt-in-anxiety-disorders-and-ocrd.html",
    readTime: "25 min read"
  },

  {
    title: "Psychiatric Disorders and Endocrine Disorders",
    shortTitle: "Psychiatry in Endocrine Disorders",
    authors: "Mishra, Sawant, Garg",
    year: "2022",
    journal: "Indian Journal of Psychiatry",
    category: "Consultation-Liaison Psychiatry / Endocrinology",
    description: "Bedside reference for the bidirectional relationship between endocrine and psychiatric disorders, including thyroid and parathyroid disease, diabetes, metabolic syndrome, hyperprolactinaemia and steroid-induced psychiatric symptoms.",
    tags: ["Endocrine Psychiatry", "Thyroid Disorders", "Diabetes", "Metabolic Syndrome"],
    keywords: ["psychiatric disorders endocrine disorders", "endocrine psychiatry", "thyroid psychiatric symptoms", "hypothyroidism depression", "hyperthyroidism anxiety", "diabetes depression", "antipsychotic metabolic syndrome", "lithium thyroid monitoring", "steroid induced psychosis", "hyperprolactinaemia psychiatry"],
    url: "cpg/cpg-clp/cpg-clp-psychiatry-in-endocrine-disorders.html",
    readTime: "25 min read"
  },

  {
    title: "Psychiatric Disorders in Parkinson’s Disease",
    shortTitle: "Psychiatry in Parkinson’s Disease",
    authors: "Tripathi, Gupta, Bansal",
    year: "2022",
    journal: "Indian Journal of Psychiatry",
    category: "Consultation-Liaison Psychiatry / Neuropsychiatry",
    description: "Bedside reference for assessment and management of depression, anxiety, psychosis, cognitive impairment, apathy, sleep disorders and impulse-control disorders in Parkinson’s disease.",
    tags: ["Parkinson’s Disease", "Neuropsychiatry", "Parkinson’s Psychosis", "Cognitive Impairment"],
    keywords: ["psychiatric disorders Parkinson disease", "Parkinson disease depression", "Parkinson disease anxiety", "Parkinson disease psychosis", "Parkinson disease dementia", "Parkinson disease apathy", "Parkinson disease sleep disorders", "dopamine agonist impulse control disorder", "Parkinson neuropsychiatry"],
    url: "cpg/cpg-clp/psychiatric-disorders-in-parkinsons-disease.html",
    readTime: "25 min read"
  },

  {
    title: "Psychiatric Disorders in the Perinatal Period",
    shortTitle: "Perinatal Psychiatry",
    authors: "Bharadwaj, Endumathi, Parial, Chandra",
    year: "2022",
    journal: "Indian Journal of Psychiatry",
    category: "Consultation-Liaison Psychiatry / Perinatal Psychiatry",
    description: "Bedside reference for assessing and managing psychiatric disorders during pregnancy and the postpartum period, including medication safety, lactation, depression, anxiety, bipolar disorder, psychosis, substance use and acute risk.",
    tags: [
      "Perinatal Psychiatry",
      "Pregnancy",
      "Postpartum Psychiatry",
      "Lactation"
    ],
    keywords: [
      "perinatal psychiatry",
      "psychiatric disorders in the perinatal period",
      "pregnancy mental health",
      "antenatal depression",
      "postpartum depression",
      "postpartum psychosis",
      "psychotropic medication in pregnancy",
      "breastfeeding psychotropics"
    ],
    url: "cpg/cpg-clp/cpg-clp-perinatal-psychiatry.html",
    readTime: "20 min read"
  },

  {
    title: "Psychiatric Disorders in Epilepsy",
    shortTitle: "Psychiatry in Epilepsy",
    authors: "Kedare, Baliga",
    year: "2022",
    journal: "Indian Journal of Psychiatry",
    category: "Consultation-Liaison Psychiatry / Neuropsychiatry",
    description: "Clinical reference for recognising and treating depression, anxiety, psychosis and other psychiatric comorbidities in epilepsy, with attention to antiseizure medication interactions and seizure threshold.",
    tags: [
      "Epilepsy",
      "Neuropsychiatry",
      "Psychiatric Comorbidity",
      "Antiseizure Medications"
    ],
    keywords: [
      "psychiatric disorders in epilepsy",
      "psychiatric morbidity in epilepsy",
      "depression in epilepsy",
      "anxiety in epilepsy",
      "psychosis in epilepsy",
      "seizure threshold",
      "antiepileptic drug interactions",
      "antiseizure medication psychiatric side effects"
    ],
    url: "cpg/cpg-clp/cpg-clp-psychiatric-morbidities-in-epilepsy.html",
    readTime: "20 min read"
  },

  {
    title: "Habit Reversal Training for Trichotillomania",
    shortTitle: "Habit Reversal Training",
    authors: "Clinical Workbook",
    year: "2026",
    journal: "Study Cards / Clinical Skills",
    category: "Psychotherapy / Obsessive-Compulsive Related Disorders",
    description: "Interactive study cards for habit reversal training in trichotillomania, covering awareness training, warning signs, competing responses, stimulus control and structured homework.",
    tags: [
      "Habit Reversal Training",
      "Trichotillomania",
      "Body-Focused Repetitive Behaviors",
      "CBT"
    ],
    keywords: [
      "habit reversal training",
      "HRT",
      "trichotillomania",
      "hair pulling disorder",
      "TTM",
      "competing response training",
      "awareness training",
      "stimulus control",
      "body focused repetitive behavior"
    ],
    url: "cpg/habit-reversal-training-trichotillomania.html",
    readTime: "10 min read"
  },

  {
    title: "Psychosexual Health and Sexual Medicine in CL Psychiatry",
    shortTitle: "Psychosexual Medicine",
    authors: "Rao, Banerjee, Tandon, Sawant, Jha, Manohar, Rao",
    year: "2022",
    journal: "Indian Journal of Psychiatry",
    category: "Consultation-Liaison Psychiatry / Sexual Medicine",
    description: "Bedside reference for evaluating and managing sexual dysfunction and psychosexual concerns in medical settings, including chronic illness, medication-induced dysfunction, hypersexuality and gender dysphoria.",
    tags: [
      "Psychosexual Health",
      "Sexual Medicine",
      "Sexual Dysfunction",
      "Consultation-Liaison Psychiatry"
    ],
    keywords: [
      "psychosexual health",
      "sexual medicine",
      "sexual dysfunction",
      "erectile dysfunction",
      "drug induced sexual dysfunction",
      "sexual side effects of psychotropics",
      "hypersexual disorder",
      "gender dysphoria",
      "consultation liaison psychiatry"
    ],
    url: "cpg/cpg-clp/cpg-clp-psychosexual-medicine.html",
    readTime: "20 min read"
  },

  {
    title: "Medical Emergencies with Psychotropics",
    shortTitle: "Psychotropic Emergencies",
    authors: "Grover, Sarkar, Avasthi",
    year: "2022",
    journal: "Indian Journal of Psychiatry",
    category: "Psychopharmacology / Medical Emergencies",
    description: "Bedside reference for acute psychotropic-related emergencies, covering acute dystonia, akathisia, neuroleptic malignant syndrome, serotonin syndrome, anticholinergic syndrome, lithium and mood stabilizer toxicity, and psychotropic overdose.",
    tags: [
      "Psychotropic Emergencies",
      "Neuroleptic Malignant Syndrome",
      "Serotonin Syndrome",
      "Lithium Toxicity",
      "Overdose"
    ],
    keywords: [
      "medical emergencies with psychotropics",
      "psychotropic emergency",
      "neuroleptic malignant syndrome",
      "serotonin syndrome",
      "acute dystonia",
      "akathisia",
      "anticholinergic syndrome",
      "lithium toxicity",
      "psychotropic overdose"
    ],
    url: "cpg/cpg-clp/psychotropic-emergency.html",
    readTime: "15 min read"
  },

  {
    title: "Systemic Medical Emergencies with Psychotropics",
    shortTitle: "Psychotropic Medical Emergencies",
    authors: "Grover, Sarkar, Avasthi",
    year: "2022",
    journal: "Indian Journal of Psychiatry",
    category: "Psychopharmacology / Medical Emergencies",
    description: "Bedside reference for recognising and managing systemic medical emergencies associated with psychotropics, including seizures, hyponatremia, QTc prolongation, clozapine-related cardiac effects, DKA, GI emergencies, hepatic injury and genitourinary emergencies.",
    tags: [
      "Psychotropic Emergencies",
      "Clozapine",
      "Hyponatremia",
      "QTc Prolongation",
      "Medical Emergencies"
    ],
    keywords: [
      "systemic medical emergencies with psychotropics",
      "psychotropic medical emergencies",
      "psychotropic adverse effects",
      "clozapine myocarditis",
      "psychotropic hyponatremia",
      "QTc prolongation",
      "drug induced liver injury",
      "psychiatric emergency"
    ],
    url: "cpg/cpg-clp/systemic-medical-emergencies-with-psychotropics.html",
    readTime: "20 min read"
  },

  /* =====================================================
     NEW CPG SLOT — 01
     >>> ADD THE NEXT NEWEST CPG HERE <<<
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
     NEW CPG SLOT — 02
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
     NEW CPG SLOT — 03
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
     NEW CPG SLOT — 04
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
     NEW CPG SLOT — 05
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
     NEW CPG SLOT — 06
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
     NEW CPG SLOT — 07
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
     NEW CPG SLOT — 08
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
     NEW CPG SLOT — 09
  ===================================================== */

  /*
  {
    title: "FULL GUIDELINE TITLE",
    shortTitle: "SHORT TITLE",
    authors: "AUTHOR 1, AUTHOR 2, AUTHOR 3",
    year: "YEAR",
    journal: "Indian Journal of Psychiatry",
    category: "CATEGORY",
    description: "Brief description of the guideline and the major clinical areas covered.",
    tags: [
      "tag 1",
      "tag 2",
      "tag 3"
    ],
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4"
    ],
    url: "cpg/your-guideline-filename.html",
    readTime: "15 min read"
  },
  */

  /* =====================================================
   BIPOLAR DISORDER — DIAGNOSTIC WORKUP PROFORMA
   CANMAT / ISBD 2018–BASED CLINICAL TOOL
   ===================================================== */

{
  title:
    "Bipolar Disorder Diagnostic Workup, Formulation and Treatment Plan",

  shortTitle:
    "Bipolar Disorder Workup Proforma",

  authors:
    "Clinical implementation tool based on CANMAT/ISBD 2018 Bipolar Disorder Guidelines",

  year:
    "2018",

  journal:
    "Based on CANMAT/ISBD Bipolar Disorder Guidelines",

  category:
    "Mood Disorders / Bipolar Disorder",

  description:
    "Structured clinical workup and documentation proforma for patients presenting with suspected or established bipolar disorder. Covers diagnostic assessment, longitudinal bipolarity assessment, manic and depressive episode characterization, mental status examination, suicide and violence risk assessment, differential diagnosis and secondary causes, medical and laboratory workup, 5P biopsychosocial formulation, treatment-setting decision, acute pharmacological treatment planning, lithium and antipsychotic monitoring, psychosocial management, maintenance planning, discharge criteria and OPD/IPD clinical round checklists.",

  tags: [
    "bipolar disorder",
    "bipolar I disorder",
    "bipolar II disorder",
    "bipolar diagnosis",
    "diagnostic workup",
    "clinical assessment",
    "psychiatric assessment",
    "mania",
    "hypomania",
    "bipolar depression",
    "psychotic mania",
    "suicide risk",
    "risk assessment",
    "differential diagnosis",
    "medical workup",
    "laboratory investigations",
    "5P formulation",
    "biopsychosocial formulation",
    "treatment plan",
    "acute mania",
    "maintenance treatment",
    "lithium monitoring",
    "antipsychotic monitoring",
    "OPD",
    "IPD",
    "psychiatry",
    "CANMAT",
    "ISBD"
  ],

  keywords: [
    "bipolar disorder diagnostic workup",
    "bipolar disorder assessment",
    "bipolar disorder clinical assessment",
    "bipolar disorder diagnosis",
    "bipolar I disorder diagnosis",
    "bipolar II disorder diagnosis",
    "mania assessment",
    "manic episode assessment",
    "hypomania assessment",
    "bipolar depression assessment",
    "current episode mania",
    "current episode depression",
    "psychotic features bipolar disorder",
    "mixed features bipolar disorder",
    "rapid cycling bipolar disorder",
    "past mania history",
    "past hypomania history",
    "past depression history",
    "family history bipolar disorder",
    "collateral history bipolar disorder",
    "mood charting",
    "mental status examination bipolar disorder",
    "MSE bipolar disorder",
    "suicide risk bipolar disorder",
    "self harm risk",
    "violence risk mania",
    "capacity assessment psychiatry",
    "differential diagnosis mania",
    "secondary mania",
    "substance induced mania",
    "medication induced mania",
    "schizoaffective disorder differential",
    "schizophrenia differential mania",
    "ADHD differential mania",
    "borderline personality disorder differential",
    "delirium differential mania",
    "thyroid disease mania",
    "hyperthyroidism mania",
    "neurological causes of mania",
    "medical causes of mania",
    "bipolar disorder investigations",
    "psychiatric laboratory investigations",
    "CBC bipolar disorder",
    "glucose bipolar disorder",
    "lipid profile bipolar disorder",
    "LFT bipolar disorder",
    "renal function bipolar disorder",
    "creatinine bipolar disorder",
    "eGFR bipolar disorder",
    "TSH bipolar disorder",
    "calcium bipolar disorder",
    "electrolytes bipolar disorder",
    "urine toxicology bipolar disorder",
    "ECG bipolar disorder",
    "pregnancy test bipolar disorder",
    "prolactin antipsychotic monitoring",
    "5P formulation bipolar disorder",
    "biopsychosocial formulation psychiatry",
    "predisposing factors bipolar disorder",
    "precipitating factors bipolar disorder",
    "perpetuating factors bipolar disorder",
    "protective factors bipolar disorder",
    "presenting factors bipolar disorder",
    "bipolar treatment plan",
    "acute mania treatment",
    "first line treatment mania",
    "lithium bipolar disorder",
    "quetiapine bipolar disorder",
    "divalproex bipolar disorder",
    "asenapine bipolar disorder",
    "aripiprazole bipolar disorder",
    "risperidone bipolar disorder",
    "paliperidone bipolar disorder",
    "cariprazine bipolar disorder",
    "lithium monitoring",
    "lithium serum level",
    "lithium toxicity monitoring",
    "lithium renal monitoring",
    "lithium thyroid monitoring",
    "antipsychotic metabolic monitoring",
    "weight monitoring antipsychotics",
    "EPS monitoring",
    "akathisia monitoring",
    "relapse prevention bipolar disorder",
    "maintenance bipolar disorder",
    "bipolar discharge planning",
    "psychiatry OPD proforma",
    "psychiatry IPD proforma",
    "bipolar disorder OPD",
    "bipolar disorder IPD",
    "psychiatry clinical proforma",
    "CANMAT ISBD bipolar disorder"
  ],

  url:
    "cpg/sample-bpad-workup-canmat.html",

  readTime:
    "15 min clinical workup"
},
  /* =====================================================
     BIPOLAR DISORDER — NEWEST CPG
     CANMAT / ISBD 2018
   ===================================================== */

  {
    title:
      "Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) 2018 Guidelines for the Management of Patients with Bipolar Disorder",

    shortTitle:
      "CANMAT/ISBD Bipolar Disorder Guidelines",

    authors:
      "Yatham LN, Kennedy SH, Parikh SV, Schaffer A, Bond DJ, Frey BN, Sharma V, Goldstein BI, Rej S, Beaulieu S, Alda M, MacQueen G, Milev RV, Ravindran A, O'Donovan C, McIntosh D, Lam RW, Vazquez G, Kapczinski F, McIntyre RS, Kozicky J, Kanba S, Lafer B, Suppes T, Calabrese JR, Vieta E, Malhi GS",

    year:
      "2018",

    journal:
      "Bipolar Disorders",

    category:
      "Mood Disorders / Bipolar Disorder",

    description:
      "Comprehensive CANMAT and ISBD evidence-based guidelines for the assessment and management of bipolar disorder. Covers diagnosis and differential diagnosis, suicide risk assessment, psychosocial interventions, acute mania, acute bipolar I depression, maintenance treatment, bipolar II disorder, special populations including pregnancy, postpartum, children, adolescents and older adults, psychiatric and medical comorbidities, pharmacological treatment, electroconvulsive therapy, and medication safety and monitoring.",

    tags: [
      "bipolar disorder",
      "bipolar I disorder",
      "bipolar II disorder",
      "mania",
      "hypomania",
      "bipolar depression",
      "maintenance treatment",
      "mood disorders",
      "psychopharmacology",
      "psychiatry",
      "CANMAT",
      "ISBD"
    ],

    keywords: [
      "bipolar disorder",
      "bipolar I disorder",
      "bipolar II disorder",
      "mania",
      "hypomania",
      "acute mania",
      "acute bipolar depression",
      "bipolar depression",
      "maintenance treatment",
      "mood stabilizers",
      "lithium",
      "divalproex",
      "valproate",
      "quetiapine",
      "lurasidone",
      "lamotrigine",
      "asenapine",
      "aripiprazole",
      "risperidone",
      "paliperidone",
      "cariprazine",
      "olanzapine",
      "carbamazepine",
      "ziprasidone",
      "haloperidol",
      "clozapine",
      "antidepressants bipolar disorder",
      "antidepressant-induced mania",
      "mixed features",
      "rapid cycling",
      "psychotic mania",
      "psychotic depression",
      "suicide risk bipolar disorder",
      "suicide prevention",
      "electroconvulsive therapy",
      "ECT",
      "rTMS",
      "psychoeducation",
      "cognitive behavioral therapy",
      "CBT",
      "family-focused therapy",
      "FFT",
      "interpersonal and social rhythm therapy",
      "IPSRT",
      "substance use disorder",
      "anxiety disorder",
      "ADHD",
      "metabolic syndrome",
      "pregnancy bipolar disorder",
      "postpartum bipolar disorder",
      "postpartum psychosis",
      "children bipolar disorder",
      "adolescent bipolar disorder",
      "geriatric bipolar disorder",
      "older adults bipolar disorder",
      "lithium monitoring",
      "lithium toxicity",
      "thyroid monitoring",
      "renal monitoring",
      "valproate monitoring",
      "lamotrigine rash",
      "Stevens-Johnson syndrome",
      "antipsychotic monitoring",
      "metabolic monitoring",
      "EPS",
      "akathisia",
      "tardive dyskinesia",
      "neuroleptic malignant syndrome",
      "prolactin",
      "mood charting",
      "relapse prevention",
      "psychoeducation bipolar disorder",
      "clinical decision making bipolar disorder"
    ],

    url:
      "cpg/canmat-isbd-bipolar-disorder-2018.html",

    readTime:
      "35 min read"
  },
{
    title: "Medical / Organic Differentials of Anxiety: Approach to Diagnosis",

    shortTitle: "Organic Differentials of Anxiety",

    authors: "Clinical Seminar / Psychiatry",

    year: "2026",

    journal:
      "Psychiatry Clinical Practice / Seminar Notes",

    category:
      "Psychiatry / Consultation-Liaison Psychiatry",

    description:
      "A structured clinical approach to identifying medical and neurological conditions that can present with anxiety-like symptoms. The note covers clinical red flags, endocrine, cardiovascular, respiratory and neurological differentials, stepwise diagnostic assessment, appropriate investigations and escalation based on clinical suspicion.",

    tags: [
      "anxiety",
      "organic differentials",
      "medical causes of anxiety",
      "psychiatry",
      "consultation liaison psychiatry",
      "medical psychiatry",
      "endocrine disorders",
      "cardiovascular disorders",
      "respiratory disorders",
      "neurological disorders"
    ],

    keywords: [
      "anxiety",
      "organic anxiety",
      "secondary anxiety",
      "medical differential diagnosis",
      "medical causes of anxiety",
      "organic differentials of anxiety",
      "anxiety differential diagnosis",
      "late onset anxiety",
      "new onset anxiety",
      "red flags anxiety",
      "absence of psychiatric history",
      "family history anxiety",
      "childhood anxiety",
      "separation anxiety",
      "phobias",
      "avoidance",
      "anticipatory anxiety",
      "altered consciousness",
      "ataxia",
      "bladder dysfunction",
      "focal neurological deficits",
      "cognitive fluctuation",
      "abnormal vital signs",
      "goitre",
      "tremor",
      "weight loss",
      "weight change",
      "endocrine causes of anxiety",
      "hyperthyroidism",
      "thyrotoxicosis",
      "pheochromocytoma",
      "phaeochromocytoma",
      "hypoglycemia",
      "insulinoma",
      "primary hyperparathyroidism",
      "hypercalcemia",
      "Cushing syndrome",
      "Addison disease",
      "adrenal disorders",
      "cardiovascular causes of anxiety",
      "cardiac arrhythmia",
      "supraventricular tachycardia",
      "SVT",
      "atrial fibrillation",
      "AF",
      "PACs",
      "PVCs",
      "premature atrial contractions",
      "premature ventricular contractions",
      "mitral valve prolapse",
      "MVP",
      "acute coronary syndrome",
      "ACS",
      "heart failure",
      "severe hypertension",
      "respiratory causes of anxiety",
      "asthma",
      "COPD",
      "pulmonary embolism",
      "PE",
      "hyperventilation syndrome",
      "obstructive sleep apnea",
      "OSA",
      "chronic hypoxia",
      "neurological causes of anxiety",
      "temporal lobe epilepsy",
      "TLE",
      "migraine",
      "vestibular migraine",
      "multiple sclerosis",
      "MS",
      "Wilson disease",
      "CNS tumour",
      "CNS tumor",
      "brain tumor",
      "TIA",
      "cerebrovascular disease",
      "post-concussive syndrome",
      "neurodegenerative disorders",
      "medical evaluation of anxiety",
      "psychiatric assessment",
      "physical examination",
      "first line investigations",
      "targeted investigations",
      "diagnostic workup",
      "investigation escalation",
      "low clinical suspicion",
      "moderate clinical suspicion",
      "high clinical suspicion",
      "thyroid function tests",
      "blood glucose",
      "serum calcium",
      "ECG",
      "oxygen saturation",
      "neurological examination",
      "clinical red flags",
      "anxiety mimics",
      "secondary psychiatric disorders"
    ],

    url: "cpg/organic_differentials_anxiety.html",

    readTime: "15 min read"
},
  {
    title: "Parkinson’s Disease: Etiopathogenesis and Treatment",

    shortTitle: "Parkinson’s Disease",

    authors: "Jankovic J, Tan EK",

    year: "2020",

    journal:
      "Journal of Neurology, Neurosurgery & Psychiatry",

    category:
      "Neurology / Movement Disorders",

    description:
      "A comprehensive review of Parkinson’s disease covering the prodromal phase, clinical syndrome, genetic and environmental factors, molecular pathogenesis, motor and non-motor manifestations, levodopa therapy, motor complications, pharmacological treatment, rehabilitation, deep brain stimulation and emerging disease-modifying therapies.",

    tags: [
      "Parkinson’s disease",
      "Parkinson disease",
      "Parkinsonism",
      "movement disorders",
      "neurology",
      "levodopa",
      "deep brain stimulation",
      "non-motor symptoms"
    ],

    keywords: [
      "Parkinson’s disease",
      "Parkinson disease",
      "Parkinsonism",
      "movement disorders",
      "bradykinesia",
      "rigidity",
      "rest tremor",
      "postural instability",
      "PIGD",
      "tremor dominant Parkinson disease",
      "prodromal Parkinson disease",
      "REM sleep behaviour disorder",
      "anosmia",
      "hyposmia",
      "constipation",
      "autonomic dysfunction",
      "depression",
      "cognitive impairment",
      "dementia",
      "dysautonomia",
      "alpha synuclein",
      "α-synuclein",
      "Lewy bodies",
      "oxidative stress",
      "mitochondrial dysfunction",
      "neuroinflammation",
      "autophagy",
      "lysosomal dysfunction",
      "ubiquitin proteasome system",
      "SNCA",
      "PRKN",
      "PARKIN",
      "LRRK2",
      "GBA",
      "PINK1",
      "DJ-1",
      "genetics of Parkinson disease",
      "environmental risk factors",
      "pesticide exposure",
      "caffeine",
      "exercise",
      "levodopa",
      "carbidopa",
      "benserazide",
      "wearing off",
      "motor fluctuations",
      "dyskinesia",
      "peak dose dyskinesia",
      "dopamine agonists",
      "pramipexole",
      "ropinirole",
      "rotigotine",
      "apomorphine",
      "MAO-B inhibitors",
      "selegiline",
      "rasagiline",
      "safinamide",
      "COMT inhibitors",
      "entacapone",
      "tolcapone",
      "opicapone",
      "amantadine",
      "istradefylline",
      "anticholinergics",
      "non-motor symptoms Parkinson disease",
      "psychosis Parkinson disease",
      "depression Parkinson disease",
      "sleep disorders Parkinson disease",
      "orthostatic hypotension",
      "constipation Parkinson disease",
      "deep brain stimulation",
      "DBS",
      "subthalamic nucleus",
      "STN DBS",
      "globus pallidus internus",
      "GPi DBS",
      "focused ultrasound",
      "gene therapy Parkinson disease",
      "cell replacement therapy",
      "disease modifying therapy",
      "neuroprotective therapy",
      "movement disorder treatment"
    ],

    url: "cpg/parkinsons_note.html",

    readTime: "25 min read"
  },

  {
    title: "A Therapist’s Guide to Assess and Treat Internet Addiction",
    shortTitle: "Internet / Cybersexual Addiction",
    authors: "Young KS",
    year: "1998",
    journal: "A Therapist’s Guide to Assess and Treat Internet Addiction",
    category: "Behavioral Addictions",
    description: "A clinical guide addressing problematic internet use and cybersexual addiction, including assessment, behavioural patterns, treatment approaches and relapse prevention.",
    tags: [
      "internet addiction",
      "internet use disorder",
      "cybersexual addiction",
      "pornography addiction",
      "problematic pornography use",
      "behavioral addiction"
    ],
    keywords: [
      "internet addiction",
      "internet use disorder",
      "cybersexual addiction",
      "pornography addiction",
      "problematic pornography use",
      "online pornography",
      "cybersex",
      "sexual compulsivity",
      "behavioral addiction",
      "Young Internet Addiction Test",
      "Internet Addiction Impairment Index",
      "ACE model",
      "anonymity",
      "convenience",
      "escape",
      "craving",
      "withdrawal",
      "relapse prevention",
      "cognitive behavioral therapy",
      "cybersexual addiction treatment",
      "Internet addiction treatment",
      "couples counseling",
      "support groups"
    ],
    url: "cpg/pornography-addiction-young-therapists-guide.html",
    readTime: "15 min read"
  },

  /* =====================================================
     CURRENT GUIDELINES
  ===================================================== */

  /* =====================================================
     ADHD — CURRENT NEWEST CPG
  ===================================================== */

  {
    title: "Clinical Practice Guidelines for the Assessment and Management of ADHD",
    shortTitle: "ADHD",
    authors: "Shah R, Grover S, Avasthi A",
    year: "2019",
    journal: "Indian Journal of Psychiatry",
    category: "Child & Adolescent Psychiatry",
    description: "Clinical Practice Guidelines for the assessment and management of attention-deficit hyperactivity disorder, covering diagnosis, rating scales, comorbidities, behavioural interventions and pharmacological treatment.",
    tags: [
      "ADHD",
      "attention-deficit hyperactivity disorder",
      "child psychiatry",
      "adolescent psychiatry",
      "methylphenidate"
    ],
    keywords: [
      "ADHD",
      "attention-deficit hyperactivity disorder",
      "attention deficit hyperactivity disorder",
      "child psychiatry",
      "adolescent psychiatry",
      "hyperactivity",
      "inattention",
      "impulsivity",
      "methylphenidate",
      "atomoxetine",
      "clonidine",
      "parent training",
      "behavioral management",
      "rating scales",
      "comorbidity",
      "Indian Psychiatric Society"
    ],
    url: "cpg/adhd-cpg-shah-2019.html",
    readTime: "15 min read"
  },

  /* =====================================================
     AUTISM SPECTRUM DISORDER — CURRENT 2ND NEWEST
  ===================================================== */

  {
    title: "Clinical Practice Guidelines for Autism Spectrum Disorders",
    shortTitle: "Autism Spectrum Disorder",
    authors: "Subramanyam AA, Mukherjee A, Dave M, Chavda K",
    year: "2019",
    journal: "Indian Journal of Psychiatry",
    category: "Autism Spectrum Disorder",
    description: "Clinical Practice Guidelines covering assessment, screening, diagnosis, comorbidities, behavioural and educational interventions, pharmacological management and long-term care in autism spectrum disorders.",
    tags: [
      "autism",
      "ASD",
      "autism spectrum disorder",
      "child psychiatry",
      "neurodevelopmental disorders"
    ],
    keywords: [
      "autism spectrum disorder",
      "ASD",
      "autism",
      "child psychiatry",
      "neurodevelopmental disorders",
      "M-CHAT",
      "M-CHAT-R",
      "ADOS",
      "ADI",
      "CARS",
      "ABC",
      "ISAA",
      "ABA",
      "PECS",
      "TEACCH",
      "SCERTS",
      "ESDM",
      "DIR Floortime",
      "social skills training",
      "sensory integration",
      "risperidone",
      "aripiprazole",
      "methylphenidate",
      "atomoxetine",
      "ADHD",
      "intellectual disability",
      "Indian Psychiatric Society"
    ],
    url: "cpg/autism-spectrum-disorder-subramanyam-2019.html",
    readTime: "20 min read"
  },

  /* =====================================================
     SCHIZOPHRENIA — OLDEST CURRENT CPG
  ===================================================== */

  {
    title: "Clinical Practice Guidelines for Management of Schizophrenia",
    shortTitle: "Schizophrenia",
    authors: "Grover S, Chakrabarti S, Kulhara P, Avasthi A",
    year: "2017",
    journal: "Indian Journal of Psychiatry",
    category: "Schizophrenia",
    description: "Clinical Practice Guidelines for the assessment and management of schizophrenia, including pharmacological, psychosocial and treatment-resistant illness management.",
    tags: [
      "schizophrenia",
      "psychosis",
      "antipsychotics",
      "clozapine",
      "treatment resistance"
    ],
    keywords: [
      "schizophrenia",
      "psychosis",
      "antipsychotics",
      "clozapine",
      "treatment resistance",
      "ECT",
      "psychosocial interventions",
      "Indian Psychiatric Society"
    ],
    url: "cpg/schizophrenia.html",
    readTime: "15 min read"
  }

];
