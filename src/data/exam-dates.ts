/**
 * Single source of truth for RCGP AKT exam dates.
 * All dates use UTC noon to prevent BST/GMT hydration mismatches.
 *
 * Update this file when RCGP publishes new sitting dates.
 * See scripts/check-exam-dates for automated checking.
 */

export interface ExamSitting {
  label: string;
  shortLabel: string;
  date: Date;
  adjustmentDeadline: Date;
  finalBookingDeadline: Date;
  pearsonBookingWindow: string;
  resultsDate: Date;
}

export const EXAM_SITTINGS: ExamSitting[] = [
  {
    label: "April 2026",
    shortLabel: "Apr 27",
    date: new Date("2026-04-27T12:00:00Z"),
    adjustmentDeadline: new Date("2026-02-18T12:00:00Z"),
    finalBookingDeadline: new Date("2026-03-09T12:00:00Z"),
    pearsonBookingWindow: "13-20 March 2026",
    resultsDate: new Date("2026-05-28T17:00:00Z"),
  },
  {
    label: "July 2026",
    shortLabel: "Jul 7",
    date: new Date("2026-07-07T12:00:00Z"),
    adjustmentDeadline: new Date("2026-05-05T12:00:00Z"),
    finalBookingDeadline: new Date("2026-05-25T12:00:00Z"),
    pearsonBookingWindow: "28 May-3 June 2026",
    resultsDate: new Date("2026-08-06T17:00:00Z"),
  },
  {
    label: "October 2026",
    shortLabel: "Oct 26",
    date: new Date("2026-10-26T12:00:00Z"),
    adjustmentDeadline: new Date("2026-08-11T12:00:00Z"),
    finalBookingDeadline: new Date("2026-09-01T12:00:00Z"),
    pearsonBookingWindow: "7-16 September 2026",
    resultsDate: new Date("2026-11-25T17:00:00Z"),
  },
];

/** Convenience accessors for current 2026 sittings */
export const APRIL_SITTING = EXAM_SITTINGS[0];
export const JULY_SITTING = EXAM_SITTINGS[1];
export const OCTOBER_SITTING = EXAM_SITTINGS[2];

/** AKT exam format (updated October 2025) */
export const EXAM_FORMAT = {
  questions: 160,
  durationMinutes: 160,
  durationLabel: "2 hours 40 minutes",
  negativeMarking: false,
  eligibility: ["ST2", "ST3"],
  passRate: "70.63-76.52%",
  passMark: "108-109 / 160",
} as const;
