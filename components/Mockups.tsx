/**
 * A small ecommerce UX mockup drawn in HTML, for the hero's row of storefront screens. It's its
 * own size container and sets every measure in cqw, so the whole screen scales with its box.
 */

/** A cart on a phone: line items, a free-shipping bar and the checkout button. */
export function CartMockup({ className = "" }: { className?: string }) {
  const items = [
    { name: "Daily body oil", price: "$38", tone: "#c9826b" },
    { name: "Refill pouch", price: "$24", tone: "#8fa58b" },
  ];
  return (
    <div aria-hidden className={`@container relative overflow-hidden bg-butter font-sans ${className}`}>
      <div className="absolute inset-x-[14cqw] top-[10cqw] bottom-[-40cqw] origin-top scale-[0.82] overflow-hidden rounded-[9cqw] border-[2.4cqw] border-ink bg-white shadow-[0_3cqw_8cqw_rgb(26_26_26/0.16)]">
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
