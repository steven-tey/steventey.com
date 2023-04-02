import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import PostCard from "./components/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
};

export default async function Blog() {
  return (
    <div className="mt-16 sm:mt-20 md:border-l md:border-zinc-100 md:pl-6">
      <div className="flex max-w-3xl flex-col space-y-16">
        {allPosts
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
      </div>
    </div>
  );
}
