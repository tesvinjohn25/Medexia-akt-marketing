import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const [jobResult, assetsResult] = await Promise.all([
    supabase.from("content_jobs").select("*").eq("id", id).single(),
    supabase
      .from("content_assets")
      .select("*")
      .eq("job_id", id)
      .order("created_at", { ascending: true }),
  ]);

  if (jobResult.error) {
    return NextResponse.json(
      { error: jobResult.error.message },
      { status: 404 },
    );
  }

  return NextResponse.json({
    job: jobResult.data,
    assets: assetsResult.data || [],
  });
}
