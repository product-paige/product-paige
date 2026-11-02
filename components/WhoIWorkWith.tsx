import { audiences } from "@/content";
import { CuttingMat } from "./CuttingMat";
import { Container, Reveal, SectionHead, section } from "./ui";

/**
 * Who I work with: the persona cards as "Sound familiar?" checklists (real checkboxes), on the
 * bright blue cutting mat. Shared by the homepage and /approach, so editing the copy in
 * content.ts (audiences) changes both. `body` overrides the intro line; `link` shows the link to
 * the services below (homepage only).
 */
export function WhoIWorkWith({ body = audiences.body, link = false }: { body?: string; link?: boolean }) {
  return (
    <section className={section}>
      <Container>
        <SectionHead heading={audiences.heading} body={body} />
        {/* The cards laid out on the bright blue cutting mat */}
        <div className="relative overflow-hidden rounded-[20px] px-4 py-10 sm:px-6 lg:px-14 lg:py-16">
          <CuttingMat />
          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {audiences.items.map((a, i) => (
              <Reveal key={a.title} delay={i * 120} className="h-full">
                {/* A "Sound familiar?" checklist: the title and line, then the points
                    as real checkboxes a founder can tick. */}
                <div className="h-full bg-paper p-6 shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_30px_rgb(0_0_0/0.18)] lg:p-8">
                  <h3 className="serif text-[clamp(24px,2.2vw,30px)] leading-[1.1] tracking-[-0.03em]">{a.title}</h3>
                  <p className="mt-2">{a.body}</p>
                  <p className="mono mt-6 text-[12px] text-muted">Sound familiar?</p>
                  <ul className="mt-3 space-y-3">
                    {a.points.map((p) => (
                      <li key={p}>
                        <label className="flex cursor-pointer items-start gap-3 text-[15px]">
                          <input type="checkbox" className="peer sr-only" />
                          <span aria-hidden className="mt-0.5 grid size-[18px] shrink-0 place-items-center border-[1.5px] border-ink transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100">
                            <svg viewBox="0 0 16 16" className="size-3.5 scale-50 text-accent opacity-0 transition duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7" /></svg>
                          </span>
                          {p}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {link && (
          <Reveal className="mt-8 flex justify-center lg:mt-12">
            <a href="#services" className="link">How I can help</a>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
