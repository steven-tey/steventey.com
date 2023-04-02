import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { MDX } from "../components/mdx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate, getBlurDataURL } from "@/lib/utils";
import Image from "next/image";
import getTweets from "@/lib/twitter";
import NewsletterForm from "../components/newsletter-form";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://steventey.com${image}`
    : `https://steventey.com/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://steventey.com/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    notFound();
  }
  const tweets = await getTweets(post.tweetIds);
  const blurDataURL = await getBlurDataURL(
    post.image ?? "/images/placeholder.png"
  );
  return (
    <div className="lg:relative">
      <div className="mx-auto max-w-2xl mb-20">
        <Link
          href="/blog"
          className="group ml-5 sm:ml-0 mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
        >
          <ArrowLeft className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
        </Link>
        <div>
          <div className="mx-5 sm:mx-auto flex flex-col">
            <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {post.title}
            </h1>
            <time
              dateTime={post.publishedAt}
              className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              <span className="ml-3">{formatDate(post.publishedAt)}</span>
            </time>
          </div>
          <Image
            src={post.image ?? "/images/placeholder.png"}
            alt={post.title}
            width={1200}
            height={900}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="sm:rounded-3xl my-10"
          />

          <MDX code={post.body.code} tweets={tweets} />
        </div>
        <NewsletterForm />
      </div>
    </div>
  );
}
