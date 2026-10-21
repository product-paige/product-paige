"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";

type Status = "idle" | "sending" | "sent" | "error";

// Styled for the dark contact section. Fields are 16px so iOS doesn't zoom in on focus.
const field =
  "w-full rounded-ui border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:border-white/60 [&>option]:text-ink";
const label = "mb-2 block text-sm label text-white/60";

/**
 * Posts to `endpoint` (a form service such as Formspree) when one is set.
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
      <p role="status" className="rounded-ui bg-sage p-8 text-[17px] text-ink">
        {success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
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
        <textarea id="cf-message" name="message" required rows={5} placeholder={messagePlaceholder} className={`${field} resize-y`} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" light disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p aria-live="polite" className="text-[13px] text-white/60">
          {status === "error" ? `That didn’t send. Please email ${email} instead.` : ""}
        </p>
      </div>
    </form>
  );
}
