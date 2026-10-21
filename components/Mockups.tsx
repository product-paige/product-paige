/**
 * Small ecommerce UX mockups drawn in HTML, for the hero. Each one is its own size container
 * and sets every measure in cqw, so the whole screen scales with the box it sits in. The screens
 * are drawn at full width, then scaled to 78% from the top, leaving a margin of colour around them.
 */

const stars = "★★★★★";

/** A product page in a browser window, cropped by the bottom of the box. */
export function ProductPageMockup({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`@container relative overflow-hidden bg-sky font-sans ${className}`}>
      <div className="absolute inset-x-[9cqw] top-[15cqw] bottom-[-40cqw] origin-top scale-[0.78] overflow-hidden rounded-[2cqw] bg-white shadow-[0_2cqw_6cqw_rgb(26_26_26/0.12)]">
        {/* Browser bar */}
        <div className="flex items-center gap-[1cqw] border-b border-line px-[2.4cqw] py-[1.8cqw]">
          {[0, 1, 2].map((i) => <i key={i} className="size-[1.4cqw] rounded-full bg-ink/15" />)}
          <span className="ml-[2cqw] h-[2.2cqw] w-[30cqw] rounded-full bg-ink/6" />
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-[4cqw] p-[4cqw]">
          {/* Product shot: a bottle on a warm backdrop */}
          <div className="relative grid aspect-[4/5] place-items-center rounded-[1.4cqw] bg-[#f3e6dc]">
            <span className="h-[24cqw] w-[10cqw] rounded-t-[3cqw] rounded-b-[1.6cqw] bg-[#c9826b]" />
            <span className="absolute top-[7cqw] h-[3cqw] w-[5cqw] rounded-t-[0.8cqw] bg-ink/70" />
          </div>
          <div className="flex flex-col gap-[1.6cqw] text-ink">
            <span className="text-[2.4cqw] font-medium tracking-[0.08em] text-muted uppercase">Body care</span>
            <span className="text-[4.6cqw] leading-[1.05] font-medium tracking-[-0.03em]">Daily body oil</span>
            <span className="flex items-center gap-[1cqw] text-[2.6cqw]">
              <span className="text-accent">{stars}</span>
              <span className="text-muted">(214)</span>
            </span>
            <span className="text-[3.6cqw] font-medium">$38</span>
            <span className="flex gap-[1.2cqw]">
              {["#c9826b", "#8fa58b", "#d9c7a3"].map((c, i) => (
                <i key={c} className={`size-[3.4cqw] rounded-full ${i === 0 ? "ring-[0.4cqw] ring-ink ring-offset-[0.5cqw]" : ""}`} style={{ background: c }} />
              ))}
            </span>
            <span className="mt-[1cqw] grid place-items-center rounded-[1cqw] bg-ink py-[2cqw] text-[2.8cqw] font-medium text-white">Add to cart</span>
            <span className="text-[2.3cqw] text-muted">Free shipping over $60</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A cart on a phone: line items, a free-shipping bar and the checkout button. */
export function CartMockup({ className = "" }: { className?: string }) {
  const items = [
    { name: "Daily body oil", price: "$38", tone: "#c9826b" },
    { name: "Refill pouch", price: "$24", tone: "#8fa58b" },
  ];
  return (
    <div aria-hidden className={`@container relative overflow-hidden bg-butter font-sans ${className}`}>
      <div className="absolute inset-x-[14cqw] top-[16cqw] bottom-[-40cqw] origin-top scale-[0.78] overflow-hidden rounded-[9cqw] border-[2.4cqw] border-ink bg-white shadow-[0_3cqw_8cqw_rgb(26_26_26/0.16)]">
        <div className="mx-auto mt-[2.4cqw] h-[3.4cqw] w-[22cqw] rounded-full bg-ink" />
        <div className="flex flex-col gap-[3.4cqw] p-[5cqw] text-ink">
          <div className="flex items-baseline justify-between">
            <span className="text-[5.6cqw] font-medium tracking-[-0.03em]">Your cart</span>
            <span className="text-[3.4cqw] text-muted">2 items</span>
          </div>
          {/* Free-shipping progress */}
          <div className="flex flex-col gap-[1.6cqw]">
            <span className="text-[3.2cqw]">You’re $0 away from free shipping</span>
            <span className="h-[1.6cqw] overflow-hidden rounded-full bg-ink/8">
              <span className="block h-full w-full rounded-full bg-accent" />
            </span>
          </div>
          {items.map((it) => (
            <div key={it.name} className="flex items-center gap-[3cqw] border-t border-line pt-[3cqw]">
              <span className="grid size-[13cqw] shrink-0 place-items-center rounded-[2cqw] bg-[#f3e6dc]">
                <span className="h-[8cqw] w-[3.6cqw] rounded-t-[1.2cqw] rounded-b-[0.6cqw]" style={{ background: it.tone }} />
              </span>
              <span className="flex flex-1 flex-col gap-[0.8cqw]">
                <span className="text-[3.6cqw] font-medium">{it.name}</span>
                <span className="flex w-max items-center gap-[2.4cqw] rounded-full border border-line px-[2cqw] text-[3cqw]">
                  <span>−</span>1<span>+</span>
                </span>
              </span>
              <span className="text-[3.6cqw] font-medium">{it.price}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-line pt-[3cqw] text-[3.8cqw] font-medium">
            <span>Subtotal</span>
            <span>$62</span>
          </div>
          <span className="grid place-items-center rounded-[2cqw] bg-ink py-[3.4cqw] text-[3.8cqw] font-medium text-white">Checkout</span>
        </div>
      </div>
    </div>
  );
}
