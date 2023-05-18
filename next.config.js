const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
      "user-images.githubusercontent.com",
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
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "steven.blue",
          },
        ],
        destination: "https://staging.bsky.app/profile/steven.blue",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
