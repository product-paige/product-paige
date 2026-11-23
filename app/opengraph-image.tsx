import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content";

// The sharing card for every page, laid out like the site's hero: the blue P and the booking line,
// the headline with {design} drawn selected as in a design tool, then the storefront screens along
// the bottom, all on the paper sheet over the gridded ground.
export const alt = `${site.logo}: ${hero.heading.join(" ").replace(/[{}]/g, "")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#fbfaf6";
const ink = "#1d1d1b";
const blue = "#2450e0";
const ground = "#d8d4cb";

// The logo mark (as in SiteChrome), as an image
const logo = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="49 0 202 300"><path d="M49.5303 61.9189L178.237 1.50586L224.203 27.7724V59.4866L250.47 47.5134V136.32L224.203 150V178.989L136.21 221.016V278.618L95.2762 300L49.5308 274.678L49.5303 61.9189Z" fill="#2450e0"/><path d="M49.5303 60.6055L178.893 0L224.203 27.7723L95.1878 89.683V299.815L49.5303 274.862V60.6055Z" fill="#142e8a"/><path d="M224.203 32.6357L250.469 47.4727L224.203 59.5081L224.203 32.6357Z" fill="#142e8a"/><path d="M206.466 73.8267V147.373L136.867 180.294L136.867 106.66L206.466 73.8267Z" fill="#142e8a"/><path d="M136.867 106.776L161.82 94.9557V120.618L136.868 132.464L136.867 106.776Z" fill="#fff"/></svg>`,
).toString("base64")}`;

// A storefront screen from public/, as a JPEG the card can draw (it can't read WebP)
async function screen(src: string, height: number) {
  const buf = await sharp(join(process.cwd(), "public", src)).resize({ height: height * 2 }).jpeg({ quality: 82 }).toBuffer();
  const { width = 0, height: h = 1 } = await sharp(buf).metadata();
  return { uri: `data:image/jpeg;base64,${buf.toString("base64")}`, width: Math.round((width / h) * height), height };
}

export default async function OpengraphImage() {
  const serif = await readFile(join(process.cwd(), "app/fonts/TiemposText-Regular.otf"));
  // Azeret Mono (SIL Open Font License, from Google Fonts), for the booking line, as on the site
  const mono = await readFile(join(process.cwd(), "app/fonts/AzeretMono-Regular.ttf"));
  const rowHeight = 228;
  const shots = await Promise.all(hero.shots.map((s) => screen(s.src.replace(/^\//, ""), rowHeight)));

  // One headline line, with any {word} drawn inside a selection box with corner handles
  const line = (text: string) =>
    text.split(/(\{[^}]+\})/g).filter(Boolean).map((part, i) =>
      part.startsWith("{") ? (
        <div key={i} style={{ display: "flex", position: "relative", padding: "0 8px", marginLeft: 4, border: `2px solid ${blue}`, background: "rgba(36,80,224,0.08)" }}>
          {part.slice(1, -1)}
          {[
            { top: -7, left: -7 },
            { top: -7, right: -7 },
            { bottom: -7, left: -7 },
            { bottom: -7, right: -7 },
          ].map((pos, j) => (
            <div key={j} style={{ position: "absolute", width: 12, height: 12, background: "#fff", border: `2px solid ${blue}`, ...pos }} />
          ))}
        </div>
      ) : (
        <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>{part}</div>
      ),
    );

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", padding: 28, background: ground }}>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "40px 56px 36px", background: paper, color: ink, fontFamily: "Tiempos" }}>
          {/* The logo and the booking line */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={30} height={44} alt="" />
            <div style={{ display: "flex", fontFamily: "Azeret Mono", fontSize: 21, letterSpacing: 1.3, color: ink }}>{site.availability.toUpperCase()}</div>
          </div>
          {/* The headline */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 30, fontSize: 64, lineHeight: 1.08, letterSpacing: -2.2 }}>
            {hero.heading.map((l) => (
              <div key={l} style={{ display: "flex", alignItems: "center" }}>{line(l)}</div>
            ))}
          </div>
          {/* The storefront screens */}
          <div style={{ display: "flex", gap: 16, marginTop: "auto" }}>
            {shots.map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.uri.slice(-24)} src={s.uri} width={s.width} height={s.height} alt="" style={{ borderRadius: 8, border: "1px solid rgba(29,29,27,0.15)" }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [
        { name: "Tiempos", data: serif, weight: 400, style: "normal" },
        { name: "Azeret Mono", data: mono, weight: 400, style: "normal" },
      ] },
  );
}
