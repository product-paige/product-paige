import { ArrowUpRight, Container, ScribbleBullet, sectionHeading } from "./ui";

// Three other ways to do Who I work with: each helps a founder see themselves and then sends
// them to the right place. Temporary, to compare; the winner replaces WhoIWorkWith.

// Who, what they usually need, and where to start (the engagement it maps to in Ways to work
// together). Draft copy for Paige to edit.
const who = [
  {
    title: "Starting out",
    phrase: "starting out",
    you: "You've got the product. The store isn't built yet.",
    need: "Brand, site and copy, launched together.",
    start: "Full store build",
  },
  {
    title: "Already selling",
    phrase: "already selling",
    you: "You've got customers. The site isn't keeping up.",
    need: "A clear read on what's costing you sales, then the fixes.",
    start: "Advice and reviews",
  },
  {
    title: "Building for Shopify",
    phrase: "building for Shopify",
    you: "Your app works. Merchants don't see why yet.",
    need: "Positioning, a listing and a site that sell it.",
    start: "One focused project",
  },
];

// How the right clients like to work (draft copy for Paige to edit).
const aboutYou = [
  "You like to prototype fast, with AI in the loop",
  "You're fine if the process isn't linear",
  "You'd rather ship and learn than polish forever",
  "You want one person who owns it end to end",
];

function OptionLabel({ children }: { children: string }) {
  return <p className="mono mb-6 inline-block rounded-full bg-ink px-3 py-1.5 text-[12px] text-white">{children}</p>;
}

/** A link to the pricing, in the mono label style. */
function StartLink({ label }: { label: string }) {
  return (
    <a href="#pricing" className="group mono inline-flex items-center gap-2 text-[13px]">
      <span className="border-b border-current pb-0.5">Start with: {label}</span>
      <ArrowUpRight turn className="size-4" />
    </a>
  );
}

// B. One sentence: the three audiences inline in a single big line, each a link down to where
// to start. No cards at all.
function Sentence() {
  return (
    <section className="border-t border-grid py-8 lg:py-14">
      <Container>
        <OptionLabel>Option B · One sentence</OptionLabel>
        <p className="mono flex items-center gap-3"><i aria-hidden className="size-3 rounded-full bg-accent" />Who I work with</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="serif max-w-[26ch] text-[clamp(32px,4vw,56px)] leading-[1.12] tracking-[-0.04em]">
              I typically work with founders{" "}
              {who.map((w, n) => (
                <span key={w.title}>
                  <a href="#pricing" className="underline decoration-accent decoration-[0.06em] underline-offset-[0.16em] transition-colors hover:text-accent">
                    {w.phrase}
                  </a>
                  {n === 0 ? ", " : n === 1 ? " and teams " : ""}
                </span>
              ))}
              .
            </p>
            <p className="mt-6 max-w-xl text-[17px]">Pick the one that sounds like you and I'll point you to where to start.</p>
          </div>
          {/* About you: how they like to work, so the right people recognise themselves */}
          <div className="border-t border-line pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <p className="text-base font-medium">About you</p>
            <ul className="mt-3 space-y-2.5">
              {aboutYou.map((t, i) => (
                <li key={t} className="flex items-start gap-2.5">
                  <ScribbleBullet variant={i} className="mt-0.5 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

// C. A table: three columns, one per audience, and three rows (where you are, what helps,
// where to start), so it reads as a quick comparison rather than three cards. Every cell has a
// fine border, and the column headings are folder tabs on top of the grid.
function Table() {
  const rows: [string, (w: (typeof who)[number]) => React.ReactNode][] = [
    ["Where you are", (w) => <span className="serif text-[22px] leading-[1.2] tracking-[-0.02em]">{w.you}</span>],
    ["What helps", (w) => w.need],
    ["Start with", (w) => <StartLink label={w.start} />],
  ];
  return (
    <section className="border-t border-grid py-8 lg:py-14">
      <Container>
        <OptionLabel>Option C · At a glance</OptionLabel>
        <h2 className={sectionHeading}>Who I work with</h2>
        <div className="mt-8 overflow-x-auto lg:mt-10">
          {/* A full grid of fine borders; the column headings sit on top as folder tabs */}
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="w-[16%]" />
                {who.map((w) => (
                  <th key={w.title} className="pl-0 align-bottom">
                    <span className="mono -mb-px inline-flex items-center gap-2.5 rounded-t-ui border border-b-0 border-line bg-sheet px-4 pt-2.5 pb-2 text-[13px] font-normal">
                      <i aria-hidden className="size-2.5 rounded-full bg-accent" />{w.title}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, cell], r) => (
                <tr key={label} className="align-top">
                  <th className={`mono border-b border-l border-line px-4 py-5 text-[12px] font-normal text-muted ${r === 0 ? "border-t" : ""}`}>{label}</th>
                  {who.map((w) => (
                    <td key={w.title} className={`border-r border-b border-l-0 border-line px-5 py-5 text-[16px] ${r === 0 ? "border-t" : ""} first-of-type:border-l`}>{cell(w)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

export function AudienceOptions() {
  return (
    <>
      <Sentence />
      <Table />
    </>
  );
}
