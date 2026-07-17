const sections = [
  {
    eyebrow: "Scope",
    title: "What this covers",
    body: "This policy applies to productpaige.com and any direct correspondence with Product Paige (Paige Harris, sole practitioner). It does not cover third-party sites linked from here.",
  },
  {
    eyebrow: "Collection",
    title: "What gets collected",
    body: "Just the basics needed to run a small consulting site: anonymized analytics (page views, referrer, country), the email address you send messages from, and any information you choose to share in those messages. No tracking pixels, no fingerprinting, no third-party ad networks.",
  },
  {
    eyebrow: "Usage",
    title: "How it's used",
    body: "Analytics inform what content is working and where the site can be improved. Email correspondence is used only to reply to your message and, if a project starts, to deliver the work. Information is never sold, rented, or shared with marketing partners.",
  },
  {
    eyebrow: "Storage",
    title: "Where it lives",
    body: "Analytics: Vercel Analytics (no cookies, no personal identifiers). Email: stored in a personal inbox provider (Google Workspace). Project work: stored in personal tools (Notion, Figma, Linear) under standard provider security.",
  },
  {
    eyebrow: "Cookies",
    title: "Cookies",
    body: "The site uses essential cookies only — those required for the site to function. No analytics cookies, no marketing cookies, no consent banner needed.",
  },
  {
    eyebrow: "Rights",
    title: "Your rights",
    body: "You can request to see, correct, or delete any information held about you at any time. Email hello@productpaige.com and you'll get a response within 30 days.",
  },
  {
    eyebrow: "Updates",
    title: "Changes to this policy",
    body: "If this policy changes, the updated version will be posted on this page with a new effective date. For substantive changes, returning clients will be notified by email.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="theme contents">

      {/* === HEADER === */}
      <section
        id="privacy-hero"
        data-section="privacy-hero"
        className="p-6 md:p-10 section-border-b"
      >
        <div className="flex flex-col gap-6 max-w-[720px]">
          <span className="type-eyebrow">Privacy</span>
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl md:text-6xl font-display leading-none tracking-[-1px] text-ink max-w-[18ch]">
              Plain-language privacy.
            </h1>
            <p className="text-lg leading-[1.4] opacity-80">
              Product Paige is a one-person practice. The site collects very
              little, uses what it has only to reply to you, and never sells
              your data.
            </p>
          </div>
          <p className="text-sm leading-[1.4] opacity-60">
            Effective: 26 June 2026
          </p>
        </div>
      </section>

      {/* === SECTIONS === */}
      <section data-section="privacy-body" className="p-6 md:p-10 section-border-b">
        <ul className="flex flex-col gap-12 max-w-[720px]">
          {sections.map((s) => (
            <li key={s.title} className="flex flex-col gap-3">
              <span className="type-eyebrow">{s.eyebrow}</span>
              <h2 className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-ink">{s.title}</h2>
              <p className="text-base leading-[1.4] opacity-80">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* === CONTACT === */}
      <section data-section="privacy-contact" className="p-6 md:p-10 section-border-b">
        <div className="flex flex-col gap-6 max-w-[640px]">
          <span className="type-eyebrow">Questions</span>
          <h2 className="text-2xl md:text-3xl font-display leading-[1.15] tracking-[-1px] text-ink">
            Send anything to{" "}
            <a
              href="mailto:hello@productpaige.com"
              className="underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              hello@productpaige.com
            </a>
            .
          </h2>
        </div>
      </section>
    </div>
  );
}
