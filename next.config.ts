import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
		remotePatterns: [{ hostname: "*" }],
	},
  experimental: {
    authInterrupts: true,
  }
};

export default nextConfig;
