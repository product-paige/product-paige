import { models, site } from "@/content";
import { CardMat } from "./CardMat";
import { Button, Reveal } from "./ui";

/**
 * Ways to work together: the three starting points on the cutting mat, each its tag, what it is
 * in the client's words and its starting price, then the note and a button to get in touch.
 */
export function WaysToWork() {
  return (
    <CardMat
      id="pricing"
      eyebrow={models.eyebrow}
      heading={models.heading}
      items={models.items.map((m) => ({
        label: m.tag,
        title: m.title,
        meta: (
          <p className="flex items-baseline gap-2">
            <span className="serif text-[clamp(28px,2.4vw,36px)] leading-none tracking-[-0.03em]">{m.price}</span>
            <span className="mono text-muted">{m.per.replace("/ ", "per ")}</span>
          </p>
        ),
      }))}
      footer={
        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 lg:mt-10">
          <p className="max-w-xl text-[15px] text-muted">{models.note}</p>
          <Button href={site.bookingUrl} accent>Let’s talk</Button>
        </Reveal>
      }
    />
  );
}
