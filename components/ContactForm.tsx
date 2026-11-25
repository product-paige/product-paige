"use client";

import { contact } from "@/content";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui";

type Status = "idle" | "sending" | "sent" | "error";

// The most the attachments can add up to (the server checks too)
const MAX_FILES = 4 * 1024 * 1024;
type Role = keyof typeof contact.roles;

// Styled for the paper contact drawer. Fields are 16px so iOS doesn't zoom in on focus.
const field =
  "w-full rounded-ui border border-line bg-white px-4 py-2.5 text-base text-ink outline-none transition placeholder:text-muted focus:border-ink";
const label = "mb-1.5 block text-sm label text-muted";

/** A labelled field, with optional helper text under it. */
function Field({ id, text, help, wide, children }: { id: string; text: string; help?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className={label}>{text}</label>
      {children}
      {help && <p className="mt-1.5 text-[13px] text-muted">{help}</p>}
    </div>
  );
}

/** A select with a "Choose one" prompt. */
function Select({ id, name, options, required, value, onChange }: { id: string; name: string; options: string[]; required?: boolean; value?: string; onChange?: (v: string) => void }) {
  return (
    <select id={id} name={name} required={required} {...(value !== undefined ? { value, onChange: (e) => onChange?.(e.target.value) } : { defaultValue: "" })} className={`${field} select`}>
      <option value="">Choose one</option>
      {options.map((s) => <option key={s}>{s}</option>)}
    </select>
  );
}

/**
 * The contact form. "Which describes you?" comes first and decides the rest: people hiring skip
 * the website, offer and deadline; team size shows for brands and software teams, monthly sales for
 * brands. The open box's label follows the offer picked. `presetInterest` (from an offer's button)
 * starts the "Interested in" field on that offer.
 *
 * Posts to `endpoint` (the site's /api/contact, which emails it through Resend) when one is set.
 * Without one, it opens the visitor's email app with the message filled in.
 */
export function ContactForm({ endpoint, email, presetInterest = "" }: { endpoint: string; email: string; presetInterest?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [role, setRole] = useState<Role | "">("");
  const [interest, setInterest] = useState(presetInterest);
  const [tooBig, setTooBig] = useState(false);
  const hiring = role === "hiring";
  const messageLabel = hiring ? contact.messageLabels.hiring : interest.startsWith("Ask Paige") ? contact.messageLabels.ask : contact.messageLabels.other;

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
        ...(["role", "company", "website", "interest", "deadline", "team", "sales"] as const).map((k) => (get(k) ? `${k}: ${get(k)}` : "")),
        get("email"),
      ].filter((line, i) => i < 2 || line).join("\n");
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Intro from ${get("name")}`)}&body=${encodeURIComponent(body)}`;
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
        {contact.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
      {/* A trap for spam bots: hidden from people and screen readers, so only bots fill it in */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-nickname">Nickname</label>
        <input id="cf-nickname" name="nickname" tabIndex={-1} autoComplete="off" />
      </div>

      {/* First, which describes them: decides the rest of the form */}
      <fieldset className="sm:col-span-2">
        <legend className={label}>{contact.roleLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(contact.roles) as [Role, string][]).map(([key, text]) => (
            <label key={key} className={`cursor-pointer rounded-ui border px-3.5 py-2 text-[15px] transition-colors has-focus-visible:outline-2 has-focus-visible:outline-accent ${role === key ? "border-accent bg-accent text-white" : "border-line bg-white hover:border-ink"}`}>
              <input type="radio" name="role" value={text} required checked={role === key} onChange={() => setRole(key)} className="sr-only" />
              {text}
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="cf-name" text="Name"><input id="cf-name" name="name" required autoComplete="name" className={field} /></Field>
      <Field id="cf-email" text="Email"><input id="cf-email" name="email" type="email" required autoComplete="email" className={field} /></Field>
      <Field id="cf-company" text="Company"><input id="cf-company" name="company" autoComplete="organization" className={field} /></Field>
      {!hiring && (
        <Field id="cf-website" text="Website"><input id="cf-website" name="website" type="text" inputMode="url" placeholder="yourstore.com" autoComplete="url" className={field} /></Field>
      )}
      {!hiring && (
        <>
          <Field id="cf-interest" text={contact.interestLabel}>
            <Select id="cf-interest" name="interest" options={contact.interests} required value={interest} onChange={setInterest} />
          </Field>
          <Field id="cf-deadline" text={contact.deadlineLabel}>
            <Select id="cf-deadline" name="deadline" options={contact.deadlines} required />
          </Field>
        </>
      )}
      {(role === "brand" || role === "software") && (
        <Field id="cf-team" text={contact.teamLabel} help={contact.optionalHelp}>
          <Select id="cf-team" name="team" options={contact.teamSizes} />
        </Field>
      )}
      {role === "brand" && (
        <Field id="cf-sales" text={contact.salesLabel} help={contact.optionalHelp}>
          <Select id="cf-sales" name="sales" options={contact.sales} />
        </Field>
      )}
      <Field id="cf-message" text={messageLabel} wide>
        <textarea id="cf-message" name="message" required rows={4} className={`${field} resize-y`} />
      </Field>
      {/* Screenshots or files, attached to the email (up to 4 MB in total) */}
      {!hiring && (
        <Field id="cf-files" text={contact.filesLabel} help={tooBig ? contact.filesTooBig : contact.filesHelp} wide>
          <input
            id="cf-files"
            name="files"
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={(e) => setTooBig([...(e.target.files ?? [])].reduce((n, f) => n + f.size, 0) > MAX_FILES)}
            className={`${field} cursor-pointer py-2 file:mr-4 file:cursor-pointer file:rounded-ui file:border-0 file:bg-sheet file:px-3 file:py-1.5 file:text-[14px] file:text-ink ${tooBig ? "border-accent" : ""}`}
          />
        </Field>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-span-2">
        <Button type="submit" accent disabled={status === "sending" || tooBig}>
          {status === "sending" ? "Sending…" : contact.button}
        </Button>
        <p className="small text-muted">
          {contact.emailLine} <a href={`mailto:${email}`} className="link">{email}</a>
        </p>
        <p aria-live="polite" className="small w-full text-muted empty:hidden">
          {status === "error" ? `That didn’t send. Please email ${email} instead.` : ""}
        </p>
      </div>
    </form>
  );
}
