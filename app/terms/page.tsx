const sections = [
  {
    eyebrow: "Scope",
    title: "What's covered",
    body: "These terms apply to consulting work performed by Product Paige (Paige Harris, sole practitioner) — including Ask Paige sessions, retainers, and project engagements — and to use of productpaige.com.",
  },
  {
    eyebrow: "Engagement",
    title: "How work is scoped",
    body: "Every engagement starts with a written scope: what's included, what's not, the expected timeline, and the price. Anything outside that scope is a new engagement with its own scope and price. No surprise invoices.",
  },
  {
    eyebrow: "Payment",
    title: "Payment terms",
    body: "Ask Paige sessions: paid in full before the session. Retainers and project work: 50% on signature, 50% on delivery, unless otherwise written into the scope. Invoices are payable within 14 days via Wise, Stripe, or bank transfer. Currency is USD unless otherwise agreed.",
  },
  {
    eyebrow: "Deliverables",
    title: "Ownership of deliverables",
    body: "On final payment, ownership of all written deliverables, design files, and code transfers to the client. The right to reference the engagement in case studies and portfolio work is retained — sensitive details can be anonymized on request before any public reference.",
  },
  {
    eyebrow: "Confidentiality",
    title: "Confidentiality",
    body: "Anything shared in the course of an engagement is treated as confidential and is not discussed with third parties without permission. A mutual NDA can be signed before any sensitive material is reviewed.",
  },
  {
    eyebrow: "Cancellation",
    title: "Cancellation + refunds",
    body: "Ask Paige sessions: full refund if canceled 48+ hours before the scheduled time, no refund within 48 hours (one reschedule allowed). Project work: 50% deposit is non-refundable after work begins; remaining balance is owed for work completed up to the cancellation date.",
  },
  {
    eyebrow: "Liability",
    title: "Limitations",
    body: "Product Paige provides product strategy, marketing, and design advice — not legal, financial, accounting, or regulatory advice. Total liability for any engagement is limited to fees paid for that engagement. Work is delivered as-is with no implied warranty of merchantability or fitness for a particular purpose.",
  },
  {
    eyebrow: "Jurisdiction",
    title: "Governing law",
    body: "These terms are governed by the laws of British Columbia, Canada. Any disputes will be resolved in the courts of British Columbia unless both parties agree to binding arbitration.",
  },
];

export default function TermsPage() {
  return (
    <div className="theme-v2 contents">

      {/* === HEADER === */}
      <section
        id="terms-hero"
        data-section="terms-hero"
        className="p-6 md:p-10 section-border-b"
      >
        <div className="flex flex-col gap-6 max-w-[720px]">
          <span className="type-eyebrow">Terms</span>
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] text-[#1A191E] max-w-[18ch]">
              The shape of the engagement.
            </h1>
            <p className="text-lg leading-[1.4] opacity-80">
              Short, written, mutual — no surprises. These are the standard
              terms for any work with Product Paige. A signed scope of work
              takes precedence over anything below.
            </p>
          </div>
          <p className="text-sm leading-[1.4] opacity-60">
            Effective: 26 June 2026
          </p>
        </div>
      </section>

      {/* === SECTIONS === */}
      <section data-section="terms-body" className="p-6 md:p-10 section-border-b">
        <ul className="flex flex-col gap-12 max-w-[720px]">
          {sections.map((s) => (
            <li key={s.title} className="flex flex-col gap-3">
              <span className="type-eyebrow">{s.eyebrow}</span>
              <h2 className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-[#1A191E]">{s.title}</h2>
              <p className="text-base leading-[1.4] opacity-80">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* === CONTACT === */}
      <section data-section="terms-contact" className="p-6 md:p-10 section-border-b">
        <div className="flex flex-col gap-6 max-w-[640px]">
          <span className="type-eyebrow">Questions</span>
          <h2 className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-[#1A191E]">
            Email{" "}
            <a
              href="mailto:hello@productpaige.com"
              className="underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              hello@productpaige.com
            </a>{" "}
            before any engagement.
          </h2>
        </div>
      </section>
    </div>
  );
}
