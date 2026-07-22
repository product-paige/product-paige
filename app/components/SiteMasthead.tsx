const items = [
  "Product strategy + UX for Shopify and ecommerce teams",
  "Now booking · Q3 2026",
  "An independent practice · Canada · Remote",
];

export function SiteMasthead() {
  // Render the items twice so the marquee loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div
      data-section="masthead"
      className="bg-[#1A191E] text-white h-9 flex items-center overflow-hidden relative"
    >
      <div
        className="masthead-track flex items-center whitespace-nowrap"
        style={{ fontSize: "14px", lineHeight: 1 }}
        aria-hidden="true"
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{item}</span>
            <span className="opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
