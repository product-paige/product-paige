import { models, site } from "@/content";
import { CardMat } from "./CardMat";
import { Button, Reveal } from "./ui";

/**
 * Ways to work together: the three starting points on the cutting mat, each its tag, what it is
 * in the client's words, one line on it, its starting price ("Starting at") and how long it takes, then the note and a button to get in touch.
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
        body: m.body,
        meta: (
          <>
          <p className="mono text-muted">Starting at</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="serif text-[clamp(22px,1.8vw,28px)] leading-none tracking-[-0.03em]">{m.price}</span>
            <span className="mono text-muted">{m.per.replace("/ ", "per ")}</span>
          </p>
          <p className="mt-4 border-t border-line pt-3 text-[14px]">{m.timeline}</p>
          </>
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
