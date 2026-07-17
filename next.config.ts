import type { NextConfig } from "next";

/**
 * When deploying to a GitHub Pages *project* site the app is served from
 * a sub-path (e.g. /cheriven-v2). The CI sets PAGES_BASE_PATH so assets and
 * links resolve correctly. Locally (and on a custom root domain) it stays "".
 */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (outputs to ./out)
  output: "export",
  // Emit /route/index.html so clean URLs resolve on static hosts
  trailingSlash: true,
  basePath,
  // Expose the base path to the client bundle so asset() can prefix image URLs
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // GitHub Pages cannot run the Next image optimizer
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
