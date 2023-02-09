const { withContentlayer } = require("next-contentlayer");

/** 
 * @type {import('next').NextConfig} 
 */

module.exports = withContentlayer({
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
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
});
