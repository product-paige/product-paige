import type { NextConfig } from "next";
import { site } from "./content";

// What the site loads, for the Content Security Policy: its own files, plus Google Analytics.
// Vercel Analytics and Speed Insights load from this site (/_vercel/...), so 'self' covers them.
// Inline scripts and styles are allowed because Next.js and the reveal script use them.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const security = [
  // Report-only for now: the browser logs anything the policy would block, without blocking it.
  // Once a few weeks pass with no reports in the console, rename to Content-Security-Policy.
  { key: "Content-Security-Policy-Report-Only", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

// Images and other files in public/: cached for a day, then refreshed in the background. Not longer,
// because images get swapped under the same filename.
const publicFiles = ["/hero/:path*", "/blog/:path*", "/projects/:path*", "/illustrations/:path*", "/logos/:path*", "/:file(about\\.jpg|headshot\\.webp|tape\\.webp)"];
const cacheADay = { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" };

const nextConfig: NextConfig = {
  // Lets `next upgrade` know this app takes security upgrades
  experimental: { agentUpgrade: "security" },
  async headers() {
    return [
      { source: "/:path*", headers: security },
      ...publicFiles.map((source) => ({ source, headers: [cacheADay] })),
      // While the site is hidden, every response (pages, images, files) also tells
      // search engines not to index it, not just the HTML page.
      ...(site.hideFromSearch ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
    ];
  },
};

export default nextConfig;
