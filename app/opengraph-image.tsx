import { ImageResponse } from "next/og";

export const alt =
  "Product Paige — Product marketing + UX design for Shopify teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide social sharing image, generated at build time.
 *
 * Replaces a hardcoded /og-image.webp reference that pointed at a file
 * which never existed — link previews had no image. Generating it means
 * there's no binary asset to go missing again.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBFAF6",
          padding: "72px",
          border: "16px solid #0E6BFF",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#1A191E",
              opacity: 0.55,
            }}
          >
            Product Paige
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 1.05,
              color: "#1A191E",
              maxWidth: "900px",
            }}
          >
            Multidisciplinary product marketer &amp; designer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#1A191E", opacity: 0.7 }}>
            Strategy · Design · Brand
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#f3eb88",
              padding: "14px 28px",
              fontSize: 28,
              color: "#1A191E",
            }}
          >
            productpaige.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
