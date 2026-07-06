/**
 * Single source of truth for the 8 July 2026 offer cutover.
 *
 * Before 00:00 UK time on 8 July 2026 ("pre"): the whole product is free,
 * £59 Early Access can be locked in (£49 via referral link).
 * From 8 July 2026 ("post"): Early Access is gone. Free Practice (questions,
 * timed mocks, structured explanations, basic practice, first 2 hours of
 * audio) plus £79 Full Audio Access for 4 months.
 *
 * Server components read the phase at render time; combined with the
 * site-wide ISR revalidation window (root layout `revalidate`), every page,
 * metadata block, JSON-LD graph and OG image flips to post-cutover copy
 * automatically — no manual deploy needed.
 */

export const OFFER_CUTOVER_UK = new Date("2026-07-08T00:00:00+01:00");

export type OfferPhase = "pre" | "post";

export function getOfferPhase(now: Date = new Date()): OfferPhase {
  return now.getTime() < OFFER_CUTOVER_UK.getTime() ? "pre" : "post";
}

export function isPreCutover(now: Date = new Date()): boolean {
  return getOfferPhase(now) === "pre";
}

export function isPostCutover(now: Date = new Date()): boolean {
  return getOfferPhase(now) === "post";
}

/** Pick pre- or post-cutover copy in one expression. */
export function phased<T>(phase: OfferPhase, pre: T, post: T): T {
  return phase === "pre" ? pre : post;
}
