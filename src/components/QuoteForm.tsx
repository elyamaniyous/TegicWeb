"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/i18n";
import type { Locale } from "@/lib/site";
import { SITE } from "@/lib/site";
import { IconCheck } from "./Icons";

type Status = "idle" | "sending" | "success" | "error";

export function QuoteForm({ dict, locale }: { dict: Dict["quote"]; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const f = dict.fields;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const errs: Record<string, string> = {};
    for (const k of ["name", "company", "email", "phone", "service"]) {
      if (!data[k]?.trim()) errs[k] = dict.required;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = dict.invalidEmail;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "send_failed");
      setReference(json.ref);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form__success" role="status">
        <IconCheck className="icon" />
        <h2 className="h3" style={{ color: "var(--ink)" }}>{dict.successTitle}</h2>
        <p style={{ color: "var(--ink-soft)", maxWidth: "56ch" }}>{dict.successText}</p>
        {reference ? (
          <p className="ref">
            {dict.successRef} <strong>{reference}</strong>
          </p>
        ) : null}
      </div>
    );
  }

  const field = (
    name: string,
    label: string,
    input: React.ReactNode,
    required = false
  ) => (
    <div className="field" data-invalid={Boolean(errors[name])}>
      <label htmlFor={`q-${name}`}>
        {label} {required ? <span className="req">*</span> : null}
      </label>
      {input}
      {errors[name] ? <span className="err" role="alert">{errors[name]}</span> : null}
    </div>
  );

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {/* pot de miel anti-spam */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__row">
        {field("name", f.name, <input id="q-name" name="name" autoComplete="name" />, true)}
        {field("company", f.company, <input id="q-company" name="company" autoComplete="organization" />, true)}
      </div>
      <div className="form__row">
        {field("email", f.email, <input id="q-email" name="email" type="email" autoComplete="email" />, true)}
        {field("phone", f.phone, <input id="q-phone" name="phone" type="tel" autoComplete="tel" />, true)}
      </div>
      <div className="form__row">
        {field(
          "service",
          f.service,
          <select id="q-service" name="service" defaultValue="">
            <option value="" disabled />
            {dict.serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>,
          true
        )}
        {field(
          "frequency",
          f.frequency,
          <select id="q-frequency" name="frequency" defaultValue="">
            <option value="" disabled />
            {dict.frequencyOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        )}
      </div>
      <div className="form__row">
        {field("origin", f.origin, <input id="q-origin" name="origin" placeholder={f.originPh} />)}
        {field("destination", f.destination, <input id="q-destination" name="destination" placeholder={f.destinationPh} />)}
      </div>
      <div className="form__row">
        {field("goods", f.goods, <input id="q-goods" name="goods" placeholder={f.goodsPh} />)}
        {field("volume", f.volume, <input id="q-volume" name="volume" placeholder={f.volumePh} />)}
      </div>
      {field("message", f.message, <textarea id="q-message" name="message" placeholder={f.messagePh} />)}

      {status === "error" ? (
        <p className="err" role="alert" style={{ color: "#b4552d" }}>
          {dict.errorText} <a href={`mailto:${SITE.email}`} style={{ textDecoration: "underline" }}>{SITE.email}</a>
        </p>
      ) : null}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", alignItems: "center", justifyContent: "space-between" }}>
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
          {status === "sending" ? dict.sending : dict.submit}
        </button>
        <p className="form__notice" style={{ maxWidth: "38ch" }}>{dict.privacy}</p>
      </div>
    </form>
  );
}
