import { allPosts } from "contentlayer/generated";

export default async function sitemap() {
  const posts = allPosts.map((post) => ({
    url: `https://steventey.com/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/about", "/projects", "/blog"].map((route) => ({
    url: `https://steventey.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts];
}
