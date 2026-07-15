"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/leads";

const STATUSES: LeadStatus[] = ["nouveau", "contacté", "devis envoyé", "gagné", "perdu"];

export function AdminLeads() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async (tok: string) => {
    setError("");
    const res = await fetch("/api/leads", { headers: { Authorization: `Bearer ${tok}` } });
    if (!res.ok) {
      setLeads(null);
      setError(res.status === 401 ? "Jeton invalide (vérifier ADMIN_TOKEN)." : "Erreur de chargement.");
      return false;
    }
    const json = await res.json();
    setLeads(json.leads as Lead[]);
    return true;
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("tegic-admin-token");
    if (saved) {
      setToken(saved);
      void load(saved);
    }
  }, [load]);

  async function connect() {
    const ok = await load(input);
    if (ok) {
      setToken(input);
      sessionStorage.setItem("tegic-admin-token", input);
    }
  }

  async function setStatus(id: string, status: LeadStatus) {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setLeads((prev) => prev?.map((l) => (l.id === id ? { ...l, status } : l)) ?? null);
  }

  function exportCsv() {
    if (!leads?.length) return;
    const cols: (keyof Lead)[] = ["ref", "createdAt", "status", "name", "company", "email", "phone", "service", "origin", "destination", "goods", "volume", "frequency", "message", "locale"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(";"), ...leads.map((l) => cols.map((c) => esc(l[c])).join(";"))].join("\n");
    const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `tegic-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  if (leads === null) {
    return (
      <div style={{ maxWidth: 420, display: "grid", gap: "1rem" }}>
        <p className="lead">Espace réservé à l&apos;équipe Tegic — saisir le jeton d&apos;administration.</p>
        <div className="field">
          <label htmlFor="admin-token" style={{ color: "var(--muted)" }}>Jeton (ADMIN_TOKEN)</label>
          <input
            id="admin-token"
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && connect()}
            style={{ background: "var(--g850)", border: "1px solid var(--line)", color: "var(--txt)" }}
          />
        </div>
        {error ? <p style={{ color: "#e8b46a", fontSize: "0.9rem" }}>{error}</p> : null}
        <button className="btn btn--primary" onClick={connect}>Se connecter</button>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "1.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <p className="mono" style={{ color: "var(--g300)" }}>{leads.length} lead(s)</p>
        <div style={{ display: "flex", gap: "0.7rem" }}>
          <button className="btn btn--ghost" onClick={() => load(token)}>Rafraîchir</button>
          <button className="btn btn--primary" onClick={exportCsv}>Exporter CSV</button>
        </div>
      </div>

      <div className="admin-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Réf.</th><th>Reçu</th><th>Contact</th><th>Besoin</th><th>Flux</th><th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id}>
                <td className="mono" style={{ color: "var(--g300)" }}>{l.ref}</td>
                <td style={{ whiteSpace: "nowrap" }}>{new Date(l.createdAt).toLocaleString("fr-FR")}</td>
                <td>
                  <strong>{l.name}</strong> · {l.company}
                  <br />
                  <a href={`mailto:${l.email}`} style={{ color: "var(--g300)" }}>{l.email}</a> · {l.phone}
                </td>
                <td>
                  {l.service}
                  {l.frequency ? <> · {l.frequency}</> : null}
                  {l.volume ? <><br />{l.volume}</> : null}
                </td>
                <td>
                  {l.origin || l.destination ? <>{l.origin ?? "—"} → {l.destination ?? "—"}<br /></> : null}
                  {l.goods ? <>{l.goods}<br /></> : null}
                  {l.message ? <em style={{ color: "var(--muted)" }}>{l.message}</em> : null}
                </td>
                <td>
                  <select value={l.status} onChange={(e) => setStatus(l.id, e.target.value as LeadStatus)}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
