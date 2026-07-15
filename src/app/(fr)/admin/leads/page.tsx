import type { Metadata } from "next";
import { AdminLeads } from "@/components/AdminLeads";
import { TegicWordmark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Leads — back-office Tegic",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return (
    <div className="section section--dark" style={{ minHeight: "100vh" }}>
      <div className="container" style={{ display: "grid", gap: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <TegicWordmark height={24} />
          <span className="mono" style={{ color: "var(--muted)" }}>Back-office · Demandes de devis</span>
        </div>
        <AdminLeads />
      </div>
    </div>
  );
}
