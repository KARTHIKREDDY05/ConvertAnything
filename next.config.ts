import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: isGitHubPages ? "/ConvertAnything" : undefined,
  assetPrefix: isGitHubPages ? "/ConvertAnything/" : undefined,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

export default nextConfig;
