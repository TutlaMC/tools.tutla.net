import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ⬅️ disables type errors in build
  },
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ disables lint during build
  },
};

export default nextConfig;
