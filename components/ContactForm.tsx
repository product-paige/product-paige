"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";

type Status = "idle" | "sending" | "sent" | "error";

// Styled for the paper contact drawer. Fields are 16px so iOS doesn't zoom in on focus.
const field =
  "w-full rounded-ui border border-line bg-white px-4 py-2.5 text-base text-ink outline-none transition placeholder:text-muted focus:border-ink";
const label = "mb-1.5 block text-sm label text-muted";

/**
 * Posts to `endpoint` (the site's /api/contact, which emails it through Resend) when one is set.
 * Without one, it opens the visitor's email app with the message filled in.
 */
export function ContactForm({
  endpoint,
  email,
  deadlines,
  interests,
  messageLabel,
  messagePlaceholder,
  success,
}: {
  endpoint: string;
  email: string;
  deadlines: string[];
  interests: string[];
  messageLabel: string;
  messagePlaceholder: string;
  success: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!endpoint) {
      const get = (k: string) => String(data.get(k) ?? "");
      const body = [
        get("message"),
        "",
        get("name"),
        get("website") ? `Website: ${get("website")}` : "",
        get("deadline") ? `Deadline: ${get("deadline")}` : "",
        get("interest") ? `Interested in: ${get("interest")}` : "",
        get("email"),
      ].filter((line, i) => i < 2 || line).join("\n");
      const subject = `Intro from ${get("name")}${get("website") ? ` (${get("website")})` : ""}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="rounded-ui bg-sage p-8 text-ink">
        {success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
      {/* A trap for spam bots: hidden from people and screen readers, so only bots fill it in */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="cf-name" className={label}>Name</label>
        <input id="cf-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="cf-website" className={label}>Website</label>
        <input id="cf-website" name="website" type="url" inputMode="url" placeholder="https://" autoComplete="url" className={field} />
      </div>
      <div>
        <label htmlFor="cf-deadline" className={label}>Deadline</label>
        <select id="cf-deadline" name="deadline" defaultValue="" className={`${field} select`}>
          <option value="">Choose one</option>
          {deadlines.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-interest" className={label}>Interested in</label>
        <select id="cf-interest" name="interest" defaultValue="" className={`${field} select`}>
          <option value="">Choose one</option>
          {interests.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>{messageLabel}</label>
        <textarea id="cf-message" name="message" required rows={4} placeholder={messagePlaceholder} className={`${field} resize-y`} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" accent disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p aria-live="polite" className="text-[14px] text-muted">
          {status === "error" ? `That didn’t send. Please email ${email} instead.` : ""}
        </p>
      </div>
    </form>
  );
}
