import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/demo/interactive-dashboard",
        destination: "/demo/admin-dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
