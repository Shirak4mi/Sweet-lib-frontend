import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
      },
    ],
  },
  redirects: async () => [
    { source: "/", destination: "/en/Home", permanent: true },
    { source: "/en", destination: "/en/Home", permanent: true },
    { source: "/es", destination: "/es/Home", permanent: true },
  ],
}) as NextConfig;
