import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/**
 * Mini back-office CRM : stockage des leads dans data/leads.json.
 * Convient à un hébergement Node (VPS, serveur dédié). Sur une plateforme
 * serverless (Vercel…), remplacer ce module par une base (Postgres, KV…)
 * en conservant la même interface.
 */

export type LeadStatus = "nouveau" | "contacté" | "devis envoyé" | "gagné" | "perdu";

export type Lead = {
  id: string;
  ref: string;
  createdAt: string;
  status: LeadStatus;
  locale: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  origin?: string;
  destination?: string;
  goods?: string;
  volume?: string;
  frequency?: string;
  message?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "leads.json");

let queue: Promise<unknown> = Promise.resolve();
/** Sérialise les écritures pour éviter les collisions de fichier. */
function serialized<T>(op: () => Promise<T>): Promise<T> {
  const run = queue.then(op, op);
  queue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

async function writeAll(leads: Lead[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

export function makeRef(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `TGC-${stamp}`;
}

export async function addLead(input: Omit<Lead, "id" | "ref" | "createdAt" | "status">): Promise<Lead> {
  return serialized(async () => {
    const lead: Lead = {
      id: randomUUID(),
      ref: makeRef(),
      createdAt: new Date().toISOString(),
      status: "nouveau",
      ...input,
    };
    const all = await readAll();
    all.unshift(lead);
    await writeAll(all);
    return lead;
  });
}

export async function listLeads(): Promise<Lead[]> {
  return readAll();
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  return serialized(async () => {
    const all = await readAll();
    const lead = all.find((l) => l.id === id);
    if (!lead) return null;
    lead.status = status;
    await writeAll(all);
    return lead;
  });
}
