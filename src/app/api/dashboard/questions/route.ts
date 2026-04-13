import { NextRequest, NextResponse } from "next/server";
import { getNeonQuery } from "@/lib/neon";

export async function GET(req: NextRequest) {
  try {
    const sql = getNeonQuery();
    const topic = req.nextUrl.searchParams.get("topic");
    const search = req.nextUrl.searchParams.get("q");

    // If no params, return distinct topics for the dropdown
    if (!topic && !search) {
      const rows = await sql`SELECT DISTINCT topic FROM question ORDER BY topic`;
      return NextResponse.json({ topics: rows.map((r) => r.topic) });
    }

    // Build search with tagged template
    if (topic && search) {
      const pattern = `%${search}%`;
      const rows = await sql`
        SELECT question_uid, stem, topic, subtopic, difficulty,
               correct, option_a, option_b, option_c, option_d,
               LEFT(rationale, 200) AS rationale_preview
        FROM question
        WHERE topic ILIKE ${topic}
          AND (stem ILIKE ${pattern} OR rationale ILIKE ${pattern} OR subtopic ILIKE ${pattern})
        ORDER BY topic, subtopic, difficulty
        LIMIT 50
      `;
      return NextResponse.json({ questions: rows });
    }

    if (topic) {
      const rows = await sql`
        SELECT question_uid, stem, topic, subtopic, difficulty,
               correct, option_a, option_b, option_c, option_d,
               LEFT(rationale, 200) AS rationale_preview
        FROM question
        WHERE topic ILIKE ${topic}
        ORDER BY subtopic, difficulty
        LIMIT 50
      `;
      return NextResponse.json({ questions: rows });
    }

    // search only
    const pattern = `%${search}%`;
    const rows = await sql`
      SELECT question_uid, stem, topic, subtopic, difficulty,
             correct, option_a, option_b, option_c, option_d,
             LEFT(rationale, 200) AS rationale_preview
      FROM question
      WHERE stem ILIKE ${pattern} OR rationale ILIKE ${pattern} OR subtopic ILIKE ${pattern}
      ORDER BY topic, subtopic, difficulty
      LIMIT 50
    `;
    return NextResponse.json({ questions: rows });
  } catch (err) {
    console.error("Questions API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Database query failed" },
      { status: 500 },
    );
  }
}
