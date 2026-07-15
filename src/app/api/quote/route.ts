import { NextResponse } from "next/server";
import { addLead } from "@/lib/leads";
import { notifyNewLead } from "@/lib/mail";

export const runtime = "nodejs";

const REQUIRED = ["name", "company", "email", "phone", "service"] as const;
const OPTIONAL = ["origin", "destination", "goods", "volume", "frequency", "message", "locale"] as const;

function clean(v: unknown, max = 2000): string {
  return String(v ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Pot de miel : les bots remplissent ce champ → on répond OK sans stocker.
  if (clean(body.website) !== "") {
    return NextResponse.json({ ok: true, ref: "TGC-OK" });
  }

  const data: Record<string, string> = {};
  for (const k of [...REQUIRED, ...OPTIONAL]) data[k] = clean(body[k]);

  for (const k of REQUIRED) {
    if (!data[k]) {
      return NextResponse.json({ ok: false, error: `missing_${k}` }, { status: 400 });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    const lead = await addLead({
      locale: data.locale || "fr",
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      service: data.service,
      origin: data.origin || undefined,
      destination: data.destination || undefined,
      goods: data.goods || undefined,
      volume: data.volume || undefined,
      frequency: data.frequency || undefined,
      message: data.message || undefined,
    });

    // La notification ne doit jamais faire échouer la demande.
    notifyNewLead(lead).catch(() => undefined);

    return NextResponse.json({ ok: true, ref: lead.ref });
  } catch (err) {
    console.error("[quote] Échec d'enregistrement du lead :", err);
    return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 500 });
  }
}
