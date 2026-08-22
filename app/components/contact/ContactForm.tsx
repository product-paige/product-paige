"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { BtnIcons } from "../BtnIcons";

const TOPICS = [
  { value: "general", label: "General inquiry" },
  { value: "ask-paige", label: "Ask Paige session ($250)" },
  { value: "project", label: "Project inquiry" },
  { value: "hi", label: "Just saying hi" },
] as const;
type TopicValue = (typeof TOPICS)[number]["value"];

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialTopic = TOPICS.some((t) => t.value === searchParams.get("topic"))
    ? (searchParams.get("topic") as TopicValue)
    : "general";

  const [topic, setTopic] = useState<TopicValue>(initialTopic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — must stay empty
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");
  // Timestamp captured on mount; sent with the form so the server can
  // reject sub-2s submissions from bots.
  const [renderedAt] = useState(() => Date.now());

  // If the ?topic= URL param changes after mount (client-side nav), sync it.
  useEffect(() => {
    const t = searchParams.get("topic");
    if (t && TOPICS.some((x) => x.value === t)) setTopic(t as TopicValue);
  }, [searchParams]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          company_website: company,
          renderedAt,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card card-sm card-cream is-static flex flex-col gap-4 !min-h-0 w-full flex-1 !p-6 md:!p-10 [--chamfer:36px]"
    >
      <h2 className="text-xl font-display leading-[1.1] text-ink">
        Send a note
      </h2>

      {/* Honeypot — off-screen, aria-hidden, not tab-reachable. Real
          users never touch it; bots fill every field so a non-empty
          value here is a strong spam signal. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label>
          Company website
          <input
            type="text"
            name="company_website"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm leading-[1.4] opacity-70">Your name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 text-base leading-[1.4] focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm leading-[1.4] opacity-70">Email</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 text-base leading-[1.4] focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm leading-[1.4] opacity-70">Topic</span>
        <select
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as TopicValue)}
          className="appearance-none bg-white border border-[#1A191E]/40 px-3 py-2.5 pr-10 text-base font-medium leading-[1.4] tracking-[-0.01em] text-ink cursor-pointer bg-no-repeat bg-[position:right_12px_center] bg-[length:14px_9px] focus:outline-none focus:border-[#1A191E] transition-colors"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 9' fill='none' stroke='%231A191E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M1 1.5L7 7L13 1.5'/></svg>\")",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.06)",
          }}
        >
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm leading-[1.4] opacity-70">
          What&rsquo;s on your mind
        </span>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="bg-white/60 border border-[#1A191E]/20 px-3 py-2.5 text-base leading-[1.4] resize-none focus:outline-none focus:border-[#1A191E]/60 focus:bg-white transition-colors"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="inline-flex btn self-start mt-1 disabled:opacity-60"
      >
        <span className="btn-text bg-[#0E6BFF] text-white">
          {status === "sending"
            ? "Sending…"
            : status === "sent"
              ? "Sent — thanks."
              : "Send it"}
        </span>
        <span className="btn-tab bg-[#0E6BFF] text-white">
          <BtnIcons />
        </span>
      </button>

      {status === "error" ? (
        <p className="text-sm leading-[1.4] text-[#a11] mt-1" role="alert">
          {errorMsg}
        </p>
      ) : null}
      {status === "sent" ? (
        <p className="text-sm leading-[1.4] opacity-70 mt-1">
          You&rsquo;ll hear back within 48 hours.
        </p>
      ) : null}
    </form>
  );
}
