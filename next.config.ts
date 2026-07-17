import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (outputs to ./out)
  output: "export",
  // Emit /route/index.html so clean URLs resolve on static hosts
  trailingSlash: true,
  // GitHub Pages cannot run the Next image optimizer
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
