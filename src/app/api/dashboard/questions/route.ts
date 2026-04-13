import { NextRequest, NextResponse } from "next/server";
import { getNeonPool } from "@/lib/neon";

export async function GET(req: NextRequest) {
  const pool = getNeonPool();
  const topic = req.nextUrl.searchParams.get("topic");
  const search = req.nextUrl.searchParams.get("q");

  // If no params, return distinct topics for the dropdown
  if (!topic && !search) {
    const result = await pool.query(
      `SELECT DISTINCT topic FROM question ORDER BY topic`,
    );
    return NextResponse.json({ topics: result.rows.map((r) => r.topic) });
  }

  // Build search query
  const conditions: string[] = [];
  const values: string[] = [];
  let idx = 1;

  if (topic) {
    conditions.push(`q.topic ILIKE $${idx}`);
    values.push(topic);
    idx++;
  }

  if (search) {
    conditions.push(
      `(q.stem ILIKE $${idx} OR q.rationale ILIKE $${idx} OR q.subtopic ILIKE $${idx})`,
    );
    values.push(`%${search}%`);
    idx++;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query(
    `SELECT q.question_uid, q.stem, q.topic, q.subtopic, q.difficulty,
            q.correct, q.option_a, q.option_b, q.option_c, q.option_d,
            LEFT(q.rationale, 200) AS rationale_preview
     FROM question q
     ${where}
     ORDER BY q.topic, q.subtopic, q.difficulty
     LIMIT 50`,
    values,
  );

  return NextResponse.json({ questions: result.rows });
}
