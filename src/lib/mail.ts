import nodemailer from "nodemailer";
import { SITE } from "./site";
import type { Lead } from "./leads";

/**
 * Notification email à l'équipe Tegic à chaque nouveau lead.
 * Configuration par variables d'environnement (voir README) :
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE,
 *   LEADS_NOTIFY_EMAIL (défaut : contact@tegiclogistique.com),
 *   EMAIL_FROM.
 * Sans configuration SMTP, le lead est quand même enregistré dans le
 * mini-CRM — l'envoi est simplement ignoré (loggé).
 */
export async function notifyNewLead(lead: Lead): Promise<{ sent: boolean }> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.info(`[mail] SMTP non configuré — lead ${lead.ref} enregistré sans notification email.`);
    return { sent: false };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    const to = process.env.LEADS_NOTIFY_EMAIL ?? SITE.email;
    const from = process.env.EMAIL_FROM ?? `Tegic Web <no-reply@tegiclogistique.com>`;

    const rows: [string, string | undefined][] = [
      ["Référence", lead.ref],
      ["Nom", lead.name],
      ["Société", lead.company],
      ["Email", lead.email],
      ["Téléphone", lead.phone],
      ["Service", lead.service],
      ["Origine", lead.origin],
      ["Destination", lead.destination],
      ["Marchandise", lead.goods],
      ["Volume / poids", lead.volume],
      ["Fréquence", lead.frequency],
      ["Message", lead.message],
      ["Langue", lead.locale],
      ["Reçu le", new Date(lead.createdAt).toLocaleString("fr-FR")],
    ];

    const text = rows
      .filter(([, v]) => v && v.trim() !== "")
      .map(([k, v]) => `${k} : ${v}`)
      .join("\n");

    const html = `
      <h2 style="font-family:sans-serif">Nouvelle demande de devis — ${lead.ref}</h2>
      <table style="font-family:sans-serif;border-collapse:collapse">
        ${rows
          .filter(([, v]) => v && v.trim() !== "")
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 14px 6px 0;color:#145426;font-weight:bold;vertical-align:top">${k}</td><td style="padding:6px 0">${String(v).replace(/</g, "&lt;")}</td></tr>`
          )
          .join("")}
      </table>`;

    await transporter.sendMail({
      from,
      to,
      replyTo: lead.email,
      subject: `[Devis] ${lead.service} — ${lead.company} (${lead.ref})`,
      text,
      html,
    });
    return { sent: true };
  } catch (err) {
    console.error("[mail] Échec d'envoi de la notification :", err);
    return { sent: false };
  }
}
