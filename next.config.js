/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    return config;
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
};

module.exports = nextConfig;
