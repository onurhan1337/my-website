const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverless: false,
  },
};

module.exports = withContentlayer(nextConfig);
