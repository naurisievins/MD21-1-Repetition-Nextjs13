/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["*"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig