// Checked against the RCGP report index and AKT 60 PDF on this date.
export const AKT_FEEDBACK_REVIEWED_AT = "2026-09-16";
export const AKT_FEEDBACK_REVIEWED_LABEL = "16 September 2026";

export const latestAktReport = {
  sitting: "July 2026",
  date: "7 July 2026",
  exam: "AKT 60",
  candidates: "1,308",
  passMark: "112 / 160",
  overallPassRate: "73.17%",
  firstTimePassRate: "86.15%",
  source:
    "https://www.rcgp.org.uk/getmedia/05ed31d3-35e5-4598-9fc3-7dec163fe43f/July-2026-AKT-feedback-report.pdf",
  weakAreas: [
    "Interpreting cranial-nerve presentations",
    "Diagnosing joint disorders in children",
    "Diagnosing skin rashes",
    "Diagnosis and management of common respiratory conditions",
  ],
};

export const latestAktPassRateSummary =
  `In the ${latestAktReport.sitting} RCGP AKT report, ${latestAktReport.overallPassRate} of all ${latestAktReport.candidates} candidates passed. The pass mark was ${latestAktReport.passMark}; ${latestAktReport.firstTimePassRate} of UK graduate first-time takers passed. Pass marks vary by sitting.`;
