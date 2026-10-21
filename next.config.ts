import type { NextConfig } from "next";
import { site } from "./content";

const nextConfig: NextConfig = {
  // While the site is hidden, every response (pages, images, files) also tells
  // search engines not to index it, not just the HTML page.
  async headers() {
    if (!site.hideFromSearch) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
