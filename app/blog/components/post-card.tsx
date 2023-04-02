"use client";

import { Post } from "@/.contentlayer/generated";
import Card from "@/app/components/card";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${post.slug}`}>{post.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.publishedAt}
          className="md:hidden"
          decorate
        >
          {formatDate(post.publishedAt)}
        </Card.Eyebrow>
        <Card.Description>{post.summary}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.publishedAt}
        className="mt-1 hidden md:block"
      >
        {formatDate(post.publishedAt)}
      </Card.Eyebrow>
    </article>
  );
}
