const items = [
  "Product strategy + UX for Shopify and ecommerce teams",
  "An independent practice · Canada · Remote",
];

export function SiteMasthead() {
  return (
    <div
      data-section="masthead"
      className="bg-[#1A191E] text-white h-9 flex items-center justify-center overflow-hidden relative px-6"
      style={{ fontSize: "14px", lineHeight: 1 }}
    >
      <div className="flex items-center gap-6 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span>{item}</span>
            {i < items.length - 1 ? (
              <span className="opacity-40" aria-hidden="true">
                /
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
