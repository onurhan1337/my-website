const { withContentlayer } = require("next-contentlayer")

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = withContentlayer({
    reactStrictMode: true,
    webpack: config => {
        config.resolve.fallback = { fs: false }
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        })
        return config
    },
    env: {
        AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
        AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID
    },
    experimental: {
        externalDir:
            true |
            {
                enable: true,
                silent: true
            },
        legacyBrowsers: false,
        browsersListForSwc: true
    }
})

module.exports = nextConfig
