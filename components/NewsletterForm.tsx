"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./ui";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The footer's email sign-up, styled for the dark footer. Posts the email to `endpoint` (a
 * newsletter service) when one is set; without one, it opens the visitor's email app with a
 * sign-up request addressed to `email`.
 */
export function NewsletterForm({ endpoint, email, label, success }: { endpoint: string; email: string; label: string; success: string }) {
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

  if (status === "sent") return <p role="status" className="text-white/80">{success}</p>;

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <label htmlFor="nl-email" className="sr-only">Email</label>
      {/* 16px so iOS doesn't zoom in on focus */}
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@yourstore.com"
        className="min-w-0 flex-1 rounded-ui border border-white/30 bg-white/5 px-4 py-2.5 text-base text-white outline-none transition placeholder:text-white/50 focus:border-white/70"
      />
      <Button type="submit" light disabled={status === "sending"}>{status === "sending" ? "Sending…" : label}</Button>
      {status === "error" && <p aria-live="polite" className="text-[14px] text-white/60 sm:hidden">That didn’t go through. Please try again.</p>}
    </form>
  );
}
