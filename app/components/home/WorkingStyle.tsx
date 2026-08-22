import { IconCard } from "../IconCard";
import type { PixelIconName } from "../PixelIcon";

/** Working-style cards. Moved here from the About page. */
const workingStyle: Array<{
  name: string;
  blurb: string;
  icon: PixelIconName;
}> = [
  {
    name: "Start rough, learn early",
    blurb: "Something real in front of people beats polished guesses.",
    icon: "cursor",
  },
  {
    name: "Clear before pretty",
    blurb: "Structure and words first. The visual comes once it makes sense.",
    icon: "target",
  },
  {
    name: "Scope it in writing",
    blurb: "Agreed before the work starts. No moving targets, no surprise invoices.",
    icon: "gear",
  },
  {
    name: "Say less, mean more",
    blurb: "Fewer words. Sharper story. Lands in one read.",
    icon: "megaphone",
  },
];

/** Capabilities, grouped into three practice areas. `sub` lists the

/** How-I-work cards. */
export function WorkingStyle() {
  return (
    <>
      {/* === WORKING STYLE === yellow icon cards. How I work, in four
          claims someone could actually disagree with. */}
      <section
        id="working-style"
        data-section="working-style"
        className="p-6 md:px-10 md:py-10 flex flex-col gap-10 section-border-b"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
          <h2 className="text-section font-display text-ink max-w-[20ch]">
            Move fast, keep it simple
          </h2>
          <p className="text-lg leading-[1.4] opacity-80 max-w-[560px]">
            Fast prototypes and clear decisions, without making it harder
            than it needs to be.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {workingStyle.map((c) => (
            <IconCard
              key={c.name}
              name={c.name}
              blurb={c.blurb}
              icon={c.icon}
              tone="card-cream"
            />
          ))}
        </div>
      </section>
    </>
  );
}
