import { NextResponse } from "next/server";
import { updateLeadStatus, type LeadStatus } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES: LeadStatus[] = ["nouveau", "contacté", "devis envoyé", "gagné", "perdu"];

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const token = process.env.ADMIN_TOKEN;
  const header = req.headers.get("authorization") ?? "";
  if (!token || header !== `Bearer ${token}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const status = body.status as LeadStatus;
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ ok: false, error: "invalid_status" }, { status: 400 });
  }

  const lead = await updateLeadStatus(id, status);
  if (!lead) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, lead });
}
