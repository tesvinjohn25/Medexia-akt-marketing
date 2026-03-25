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
}

export const EXAM_SITTINGS: ExamSitting[] = [
  {
    label: "April 2026",
    shortLabel: "Apr 27",
    date: new Date("2026-04-27T12:00:00Z"),
  },
  {
    label: "July 2026",
    shortLabel: "Jul 7",
    date: new Date("2026-07-07T12:00:00Z"),
  },
];

/** Convenience accessors for the two current sittings */
export const APRIL_SITTING = EXAM_SITTINGS[0];
export const JULY_SITTING = EXAM_SITTINGS[1];

/** AKT exam format (updated October 2025) */
export const EXAM_FORMAT = {
  questions: 160,
  durationMinutes: 160,
  durationLabel: "2 hours 40 minutes",
  negativeMarking: false,
  eligibility: ["ST2", "ST3"],
  passRate: "~75%",
  passMark: "~71%",
} as const;
