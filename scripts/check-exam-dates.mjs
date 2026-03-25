#!/usr/bin/env node

/**
 * Checks RCGP AKT exam dates against our local data file.
 *
 * Usage:
 *   node scripts/check-exam-dates.mjs          # check and report
 *   node scripts/check-exam-dates.mjs --update  # update exam-dates.ts if stale
 *
 * Exit codes:
 *   0 — dates match or updated successfully
 *   1 — dates differ (no --update flag)
 *   2 — fetch/parse error
 */

const RCGP_URL =
  "https://www.rcgp.org.uk/mrcgp-exams/applied-knowledge-test/akt-exam-dates";

const LOCAL_DATA_PATH = new URL(
  "../src/data/exam-dates.ts",
  import.meta.url,
).pathname;

async function fetchRCGPDates() {
  const res = await fetch(RCGP_URL, {
    headers: {
      "User-Agent":
        "Medexia-ExamDateChecker/1.0 (checking AKT dates for accuracy)",
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    throw new Error(`RCGP returned ${res.status} ${res.statusText}`);
  }

  const html = await res.text();

  // Extract dates that look like AKT sittings (e.g. "27 April 2026", "7 July 2026")
  const datePattern =
    /(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})/gi;
  const matches = [...html.matchAll(datePattern)];

  if (matches.length === 0) {
    console.warn(
      "Warning: Could not find any dates on the RCGP page. The page structure may have changed.",
    );
    return [];
  }

  const dates = matches.map((m) => {
    const day = parseInt(m[1], 10);
    const monthStr = m[2];
    const year = parseInt(m[3], 10);
    const monthIndex = new Date(`${monthStr} 1, 2000`).getMonth();
    return {
      label: `${monthStr} ${year}`,
      date: new Date(Date.UTC(year, monthIndex, day, 12, 0, 0)),
      raw: m[0],
    };
  });

  // Deduplicate by date string
  const seen = new Set();
  return dates.filter((d) => {
    const key = d.date.toISOString();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function readLocalDates() {
  const { readFile } = await import("node:fs/promises");
  const content = await readFile(LOCAL_DATA_PATH, "utf-8");

  // Parse dates from the TypeScript source
  const datePattern = /date:\s*new\s+Date\("([^"]+)"\)/g;
  const labelPattern = /label:\s*"([^"]+)"/g;

  const dates = [...content.matchAll(datePattern)].map((m) => new Date(m[1]));
  const labels = [...content.matchAll(labelPattern)].map((m) => m[1]);

  return dates.map((date, i) => ({
    label: labels[i] || "Unknown",
    date,
  }));
}

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

async function main() {
  const updateMode = process.argv.includes("--update");

  console.log("Fetching AKT exam dates from RCGP...");

  let rcgpDates;
  try {
    rcgpDates = await fetchRCGPDates();
  } catch (err) {
    console.error(`Failed to fetch RCGP dates: ${err.message}`);
    process.exit(2);
  }

  if (rcgpDates.length === 0) {
    console.error(
      "No dates found on RCGP page. Page structure may have changed.",
    );
    process.exit(2);
  }

  console.log(`Found ${rcgpDates.length} date(s) on RCGP website:`);
  for (const d of rcgpDates) {
    console.log(`  ${d.raw} -> ${formatDate(d.date)}`);
  }

  let localDates;
  try {
    localDates = await readLocalDates();
  } catch (err) {
    console.error(`Failed to read local dates: ${err.message}`);
    process.exit(2);
  }

  console.log(`\nLocal exam-dates.ts has ${localDates.length} sitting(s):`);
  for (const d of localDates) {
    console.log(`  ${d.label} -> ${formatDate(d.date)}`);
  }

  // Compare: check if all local dates appear in RCGP dates
  const mismatches = [];
  for (const local of localDates) {
    const rcgpMatch = rcgpDates.find(
      (r) => formatDate(r.date) === formatDate(local.date),
    );
    if (!rcgpMatch) {
      mismatches.push({
        local: `${local.label} (${formatDate(local.date)})`,
        status: "not found on RCGP website",
      });
    }
  }

  // Check for new RCGP dates not in our file
  const newDates = rcgpDates.filter(
    (r) => !localDates.find((l) => formatDate(l.date) === formatDate(r.date)),
  );

  if (mismatches.length === 0 && newDates.length === 0) {
    console.log("\nAll dates match. No action needed.");
    process.exit(0);
  }

  console.log("\n--- DIFFERENCES FOUND ---");

  if (mismatches.length > 0) {
    console.log("\nLocal dates not found on RCGP:");
    for (const m of mismatches) {
      console.log(`  ${m.local} — ${m.status}`);
    }
  }

  if (newDates.length > 0) {
    console.log("\nNew dates on RCGP not in local file:");
    for (const d of newDates) {
      console.log(`  ${d.raw} (${formatDate(d.date)})`);
    }
  }

  if (!updateMode) {
    console.log(
      "\nRun with --update to update exam-dates.ts, or update manually.",
    );
    process.exit(1);
  }

  console.log(
    "\n--update flag detected, but automatic file updates are not yet implemented.",
  );
  console.log("Please update src/data/exam-dates.ts manually with the new dates above.");
  process.exit(1);
}

main();
