const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = withContentlayer(nextConfig);
