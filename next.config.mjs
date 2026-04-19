/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ["next-mdx-remote"],
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
