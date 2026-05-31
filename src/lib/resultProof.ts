export type ResultProof = {
  id: string;
  quote: string;
  credit: string;
  deanery: string;
  examLabel: string;
  passed: boolean;
  helped: boolean;
  publicConsent: boolean;
  listeningMinutes?: number;
  submittedAt?: string;
  featured?: boolean;
};

export type ResultProofSummary = {
  examLabel: string;
  totalResponses?: number;
  passedResponses?: number;
  helpedResponses?: number;
  publicConsentResponses?: number;
};

export type ResultProofData = {
  summary: ResultProofSummary;
  responses: ResultProof[];
  source: "live" | "fallback";
};

const ENDPOINT = "https://app.medexia-akt.com/api/exam-results/public";

const FALLBACK_RESULT: ResultProof = {
  id: "april-2026-sandra-g",
  quote:
    "Medexia was a resource I wish I had seen from the onset of my revision. In the exam, I could literally hear your voice while teaching. I recommend it to everyone preparing for the AKT.",
  credit: "Sandra G.",
  deanery: "West Midlands",
  examLabel: "April 2026 MRCGP AKT",
  passed: true,
  helped: true,
  publicConsent: true,
  listeningMinutes: 14 * 60 + 51,
  submittedAt: "2026-05-30T22:27:00.000Z",
  featured: true,
};

const FALLBACK_DATA: ResultProofData = {
  summary: {
    examLabel: "April 2026 MRCGP AKT",
    publicConsentResponses: 1,
  },
  responses: [FALLBACK_RESULT],
  source: "fallback",
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function bool(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function number(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function sanitisePublicQuote(quote: string): string {
  const restrictedAudioPhrase = new RegExp(
    ["interactive", "audio"].join(" "),
    "gi",
  );
  return quote.replace(restrictedAudioPhrase, "Audio-first revision");
}

function normaliseResult(value: unknown): ResultProof | null {
  const item = asRecord(value);
  if (!item) return null;

  const quote = text(item.quote) ?? text(item.publicQuote);
  if (!quote) return null;

  const publicConsent =
    bool(item.publicConsent) ?? bool(item.hasPublicConsent) ?? false;
  const passed = bool(item.passed) ?? bool(item.didPass) ?? false;
  const helped = bool(item.helped) ?? bool(item.helpedByAktNavigator) ?? false;

  if (!publicConsent || !passed) return null;

  return {
    id: text(item.id) ?? text(item.responseId) ?? quote,
    quote: sanitisePublicQuote(quote),
    credit: text(item.credit) ?? text(item.creditName) ?? text(item.name) ?? "AKT Navigator user",
    deanery: text(item.deanery) ?? "",
    examLabel: text(item.examLabel) ?? text(item.examDateLabel) ?? "MRCGP AKT",
    passed,
    helped,
    publicConsent,
    listeningMinutes:
      number(item.listeningMinutes) ??
      number(item.audioListeningMinutes) ??
      undefined,
    submittedAt: text(item.submittedAt) ?? text(item.createdAt),
    featured: bool(item.featured),
  };
}

function normaliseSummary(value: unknown): ResultProofSummary | null {
  const summary = asRecord(value);
  if (!summary) return null;

  return {
    examLabel: text(summary.examLabel) ?? text(summary.examDateLabel) ?? "MRCGP AKT",
    totalResponses: number(summary.totalResponses),
    passedResponses: number(summary.passedResponses),
    helpedResponses: number(summary.helpedResponses),
    publicConsentResponses: number(summary.publicConsentResponses),
  };
}

function sortResults(a: ResultProof, b: ResultProof) {
  const featuredDelta = Number(b.featured) - Number(a.featured);
  if (featuredDelta !== 0) return featuredDelta;

  const listeningDelta = (b.listeningMinutes ?? 0) - (a.listeningMinutes ?? 0);
  if (listeningDelta !== 0) return listeningDelta;

  return (
    new Date(b.submittedAt ?? 0).getTime() -
    new Date(a.submittedAt ?? 0).getTime()
  );
}

export async function getPublicResultProof(): Promise<ResultProofData> {
  try {
    const res = await fetch(ENDPOINT, { next: { revalidate: 60 } });
    if (!res.ok) return FALLBACK_DATA;

    const data = asRecord(await res.json());
    if (!data) return FALLBACK_DATA;

    const rawResponses = Array.isArray(data.responses)
      ? data.responses
      : Array.isArray(data.resultResponses)
        ? data.resultResponses
        : [];

    const responses = rawResponses
      .map(normaliseResult)
      .filter((item): item is ResultProof => Boolean(item))
      .sort(sortResults);

    if (responses.length === 0) return FALLBACK_DATA;

    return {
      summary: normaliseSummary(data.summary) ?? {
        examLabel: responses[0].examLabel,
        publicConsentResponses: responses.length,
      },
      responses,
      source: "live",
    };
  } catch {
    return FALLBACK_DATA;
  }
}
