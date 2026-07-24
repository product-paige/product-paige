const items = [
  "Product strategy + UX for Shopify and ecommerce teams",
  "An independent practice · Canada · Remote",
];

export function SiteMasthead() {
  return (
    <div
      data-section="masthead"
      className="bg-[#1A191E] text-white h-9 flex items-center overflow-hidden relative"
    >
      <div
        className="masthead-track flex items-center whitespace-nowrap shrink-0"
        style={{ fontSize: "14px", lineHeight: 1 }}
      >
        {/* Four identical groups side-by-side. Track is now wide enough
            that -50% translation lands within rendered content on any
            reasonable viewport, so the wrap-around is invisible instead
            of exposing blank space at the tail. */}
        {[0, 1, 2, 3].map((groupIdx) => (
          <div
            key={groupIdx}
            className="flex items-center shrink-0"
            aria-hidden={groupIdx === 1 ? "true" : undefined}
          >
            {items.map((item, i) => (
              <span key={i} className="flex items-center shrink-0">
                <span className="px-6">{item}</span>
                <span className="opacity-40">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
