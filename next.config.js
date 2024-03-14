/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Match all domains and subdomains
      },
      {
        protocol: "http",
        hostname: "*", // Match all domains and subdomains
      },
    ],
  },
};

module.exports = nextConfig;
