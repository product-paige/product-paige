import type { CSSProperties } from "react";

/**
 * Pixel-art glyphs for the Practice areas chips.
 * Each icon is a string-grid of `#` (filled) and `.` (empty) pixels
 * rendered as crisp <rect> elements.
 *
 * Style nods to the reference: bold, dithery, ~12×12, single-color.
 */
const ICONS = {
  // Product strategy — bullseye
  target: [
    "....####....",
    "..##....##..",
    ".#........#.",
    "#...####...#",
    "#..#....#..#",
    "#..#.##.#..#",
    "#..#.##.#..#",
    "#..#....#..#",
    "#...####...#",
    ".#........#.",
    "..##....##..",
    "....####....",
  ],
  // AI content design — capital A
  sparkleA: [
    "....##......",
    "....##......",
    "...####.....",
    "...####.....",
    "..##..##....",
    "..##..##....",
    ".########...",
    ".########...",
    ".##....##...",
    "##......##..",
    "##......##..",
    "............",
  ],
  // AI web design — browser window with bar
  browser: [
    "############",
    "#..........#",
    "##.##.##...#",
    "############",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "############",
  ],
  // UX and conversion — classic cursor pointer arrow
  cursor: [
    "#...........",
    "##..........",
    "###.........",
    "####........",
    "#####.......",
    "######......",
    "#######.....",
    "########....",
    "#########...",
    "####........",
    ".###........",
    "..###.......",
  ],
  // Positioning and narrative — megaphone cone
  megaphone: [
    "...........#",
    "..........##",
    ".........###",
    "......######",
    "...#########",
    "############",
    "...#########",
    "......######",
    ".........###",
    "..........##",
    "...........#",
    "............",
  ],
  // Onboarding and activation — door + open mark
  door: [
    ".########...",
    ".#......#...",
    ".#......#...",
    ".#......#...",
    ".#......#...",
    ".#...##.#...",
    ".#...##.#...",
    ".#......#...",
    ".#......#...",
    ".#......#...",
    ".########...",
    "............",
  ],
  // Growth and prioritization — arrow up + chart base
  arrowUp: [
    ".....##.....",
    "....####....",
    "...######...",
    "..##.##.##..",
    "...#.##.#...",
    ".....##.....",
    ".....##.....",
    ".....##.....",
    ".....##.....",
    ".....##.....",
    "############",
    "............",
  ],
  // Systems and ops — gear / cog
  gear: [
    ".....##.....",
    "....####....",
    "##...##...##",
    "##........##",
    "...######...",
    "..##....##..",
    "..##....##..",
    "...######...",
    "##........##",
    "##...##...##",
    "....####....",
    ".....##.....",
  ],
} as const satisfies Record<string, readonly string[]>;

export type PixelIconName = keyof typeof ICONS;

/**
 * Compute the bounding box of filled pixels in a grid. Used so each icon
 * renders at its actual visible bounds — a cursor that lives in the top-left
 * 9×12 of a 12×12 grid gets centered in its container instead of appearing
 * left-shifted.
 */
function boundingBox(grid: readonly string[]): {
  minX: number;
  minY: number;
  w: number;
  h: number;
} {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "#") {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  });
  if (minX === Infinity) {
    // Empty grid fallback — render the whole grid area
    return { minX: 0, minY: 0, w: grid[0].length, h: grid.length };
  }
  return { minX, minY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

export function PixelIcon({
  name,
  color = "currentColor",
  size = 18,
}: {
  name: PixelIconName;
  color?: string;
  size?: number;
}) {
  const grid = ICONS[name];
  if (!grid) return null;

  // ViewBox trimmed to the icon's actual visible bounds plus a uniform 1-cell
  // border, so every icon renders centered with consistent whitespace inside
  // its container — L-shapes like the cursor stop touching multiple edges.
  const { minX, minY, w, h } = boundingBox(grid);
  const pad = 1;
  const style: CSSProperties = { color, shapeRendering: "crispEdges" };
  return (
    <svg
      width={size}
      height={size}
      viewBox={`${minX - pad} ${minY - pad} ${w + pad * 2} ${h + pad * 2}`}
      fill="currentColor"
      style={style}
      aria-hidden="true"
    >
      {grid.map((row, y) =>
        Array.from(row).map((cell, x) =>
          cell === "#" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
          ) : null,
        ),
      )}
    </svg>
  );
}
