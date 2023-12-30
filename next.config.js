const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "github.com"],
  },
};

module.exports = withContentlayer(nextConfig);
