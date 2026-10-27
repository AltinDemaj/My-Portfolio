import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/images/projects/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
    ];
  },
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
