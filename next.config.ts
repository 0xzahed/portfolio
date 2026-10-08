import type { NextConfig } from "next";

// Old public addresses of this project. They 301 to the canonical one so search engines
// index a single site instead of splitting it across duplicates.
const LEGACY_HOSTS = ["portfolio-sepia-three-25.vercel.app", "portfolio-nexilos-projects.vercel.app"];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_HOSTS.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://0xzahed.vercel.app/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
