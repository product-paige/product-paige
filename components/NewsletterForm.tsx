"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The email sign-up, for the paper subscribe pop-up (or `dark` for a dark block). Posts the email to `endpoint` (a
 * newsletter service) when one is set; without one, it opens the visitor's email app with a
 * sign-up request addressed to `email`.
 */
export function NewsletterForm({ endpoint, email, label, success, dark = false }: { endpoint: string; email: string; label: string; success: string; dark?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!endpoint) {
      const from = String(data.get("email") ?? "");
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Newsletter sign-up")}&body=${encodeURIComponent(`Please add ${from} to the newsletter.`)}`;
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

  if (status === "sent") return <p role="status" className={dark ? "text-white/80" : ""}>{success}</p>;

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3">
      <label htmlFor="nl-email" className="sr-only">Email</label>
      {/* 16px so iOS doesn't zoom in on focus */}
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@yourstore.com"
        className={`min-w-0 flex-1 rounded-ui border px-4 py-2.5 text-base outline-none transition ${dark ? "border-white/30 bg-white/5 text-white placeholder:text-white/50 focus:border-white/70" : "border-line bg-white text-ink placeholder:text-muted focus:border-ink"}`}
      />
      <Button type="submit" light={dark} accent={!dark} disabled={status === "sending"}>{status === "sending" ? "Sending…" : label}</Button>
      {status === "error" && <p aria-live="polite" className={`text-[14px] ${dark ? "text-white/60" : "text-muted"}`}>That didn’t go through. Please try again.</p>}
    </form>
  );
}
