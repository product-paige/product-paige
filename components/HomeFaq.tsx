import { faq } from "@/content";
import { Faq } from "./Faq";
import { Reveal, sectionHeading } from "./ui";

/**
 * Questions I get asked, on the homepage, laid out like Capabilities: the heading and a line on the left,
 * a full-height divider, then the questions as serif rows that open.
 */
export function HomeFaq() {
  return (
    <section id="faq" className="border-t border-grid">
      <div className="md:mx-6 lg:mx-10 lg:grid lg:grid-cols-[2fr_3fr]">
        <div className="border-grid px-4 pt-8 pb-10 sm:px-6 lg:border-r lg:py-8 lg:pr-10 lg:pl-10">
          <Reveal className="lg:sticky lg:top-28">
            <h2 className={sectionHeading}>{faq.heading}</h2>
            <p className="lede mt-5 max-w-[30ch]">{faq.body}</p>
          </Reveal>
        </div>
        <Reveal delay={100} className="border-t border-grid lg:border-t-0">
          <Faq rows items={faq.items.map((f) => ({ q: f.q, a: <p className="max-w-[60ch] leading-relaxed">{f.a}</p> }))} />
        </Reveal>
      </div>
    </section>
  );
}
