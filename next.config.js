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
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "blog.steventey.com",
          },
        ],
        destination: "https://steventey.com/blog",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "blog.steventey.com",
          },
        ],
        destination: "https://steventey.com/blog/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
