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
  const cols = grid[0].length;
  const rows = grid.length;
  const style: CSSProperties = { color, shapeRendering: "crispEdges" };
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${cols} ${rows}`}
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
