import { NextResponse } from "next/server";
import { listLeads } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function assertAdmin(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const header = req.headers.get("authorization") ?? "";
  return header === `Bearer ${token}`;
}

export async function GET(req: Request) {
  if (!assertAdmin(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const leads = await listLeads();
  return NextResponse.json({ ok: true, leads });
}
