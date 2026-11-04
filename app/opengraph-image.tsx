import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content";

// The sharing card for every page: the name and headline in the serif on paper, with the
// blue ground as a border, as on the site.
export const alt = `${site.logo}: ${hero.heading.join(" ").replace(/[{}]/g, "")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const serif = await readFile(join(process.cwd(), "app/fonts/TiemposText-Regular.otf"));
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", padding: 32, background: "#d8d4cb" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "64px 72px", background: "#fbfaf6", color: "#1d1d1b", fontFamily: "Tiempos" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34 }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#2450e0" }} />
            {site.logo}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
            {hero.heading.map((line) => <span key={line}>{line.replace(/[{}]/g, "")}</span>)}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Tiempos", data: serif, weight: 400, style: "normal" }] },
  );
}
