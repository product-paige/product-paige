/**
 * A small ecommerce UX mockup drawn in HTML, for the hero's row of storefront screens. It's its
 * own size container and sets every measure in cqw, so the whole screen scales with its box.
 */

/**
 * A cart on a phone, with the conversion touches a good cart has: progress towards free
 * shipping, an add-on that closes the gap, the total on the checkout button and a trust line.
 * Matches the Cart / Phone component in Figma (1cqw there is 4.2px).
 */
export function CartMockup({ className = "" }: { className?: string }) {
  const items = [
    { name: "Daily body oil", size: "100 ml", price: "$38", tone: "#c9826b" },
    { name: "Refill pouch", size: "250 ml", price: "$24", tone: "#8fa58b" },
  ];
  const thumb = (tone: string, size: string) => (
    <span className={`grid shrink-0 place-items-center rounded-[1.4cqw] bg-[#f3e6dc] ${size}`}>
      <span className="h-[66%] w-[30%] rounded-t-[1cqw] rounded-b-[0.5cqw]" style={{ background: tone }} />
    </span>
  );
  return (
    <div aria-hidden className={`@container relative overflow-hidden bg-butter font-sans ${className}`}>
      <div className="absolute top-[6.7cqw] -bottom-[40cqw] left-[17.9cqw] w-[64.3cqw] overflow-hidden rounded-[8.6cqw] border-[1.9cqw] border-ink bg-white px-[1.9cqw] pt-[3.3cqw] shadow-[0_3cqw_8cqw_rgb(26_26_26/0.14)]">
        <div className="mx-auto h-[2.9cqw] w-[16.7cqw] rounded-full bg-ink" />
        <div className="flex flex-col gap-[2.1cqw] px-[3.3cqw] pt-[2.6cqw] leading-[1.2] text-ink">
          <div className="flex items-baseline justify-between">
            <span className="text-[4cqw] font-medium tracking-[-0.03em]">Your cart</span>
            <span className="text-[2.6cqw] opacity-60">2 items</span>
          </div>
          {/* Free-shipping unlock */}
          <div className="flex flex-col gap-[1.4cqw] rounded-[1.9cqw] bg-sheet px-[2.4cqw] py-[2.1cqw]">
            <span className="text-[2.5cqw]">Add <b className="font-semibold">$14</b> to unlock free shipping</span>
            <span className="h-[1.4cqw] overflow-hidden rounded-full bg-ink/10">
              <span className="block h-full w-[82%] rounded-full bg-accent" />
            </span>
            <span className="flex justify-between text-[2.1cqw] opacity-60"><span>$62</span><span>Free shipping at $76</span></span>
          </div>
          {items.map((it) => (
            <div key={it.name} className="flex items-center gap-[2.4cqw] border-t border-line pt-[2.1cqw]">
              {thumb(it.tone, "size-[9cqw]")}
              <span className="flex flex-1 flex-col gap-[0.7cqw]">
                <span className="text-[2.7cqw] font-medium">{it.name}</span>
                <span className="text-[2.3cqw] opacity-60">{it.size}</span>
              </span>
              <span className="flex flex-col items-end gap-[1cqw]">
                <span className="text-[2.7cqw] font-medium">{it.price}</span>
                <span className="flex items-center gap-[1.7cqw] rounded-full border border-line px-[1.4cqw] text-[2.3cqw]">
                  <span>−</span>1<span>+</span>
                </span>
              </span>
            </div>
          ))}
          {/* Add-on: the product that closes the gap to free shipping */}
          <div className="flex flex-col gap-[1.7cqw] rounded-[1.9cqw] border border-dashed border-accent/35 px-[2.4cqw] py-[2.1cqw]">
            <span className="text-[2.3cqw] font-medium tracking-[0.02em] text-accent">Complete your routine</span>
            <div className="flex items-center gap-[2.1cqw]">
              {thumb("#e8c54a", "size-[8.1cqw]")}
              <span className="flex flex-1 flex-col gap-[0.5cqw]">
                <span className="text-[2.6cqw] font-medium">Travel SPF 50</span>
                <span className="text-[2.3cqw] opacity-60">30 ml · $14</span>
              </span>
              <span className="rounded-full bg-accent px-[2.4cqw] py-[1.2cqw] text-[2.4cqw] font-medium text-white">+ Add</span>
            </div>
          </div>
          <div className="flex justify-between border-t border-line pt-[2.1cqw] text-[2.9cqw] font-medium">
            <span>Subtotal</span>
            <span>$62</span>
          </div>
          <span className="grid place-items-center rounded-[1.7cqw] bg-dark py-[2.6cqw] text-[2.9cqw] font-medium text-white">Checkout · $62</span>
          <span className="text-center text-[2.1cqw] opacity-60">Free returns · Secure checkout</span>
        </div>
      </div>
    </div>
  );
}
