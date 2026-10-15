import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deploys to GitHub Pages, Vercel, Netlify or any static host.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
