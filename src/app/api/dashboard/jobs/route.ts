import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data: jobs, error } = await supabase
    .from("content_jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ jobs });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const supabase = getSupabaseAdmin();
  const { data: job, error } = await supabase
    .from("content_jobs")
    .insert({
      job_type: body.job_type,
      style: body.style || "classic",
      topic: body.topic || null,
      question_uid: body.question_uid || null,
      count: Math.min(Math.max(body.count || 1, 1), 10),
      custom_instructions: body.custom_instructions || null,
      regenerate_from: body.regenerate_from || null,
      regenerate_target: body.regenerate_target || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ job }, { status: 201 });
}
