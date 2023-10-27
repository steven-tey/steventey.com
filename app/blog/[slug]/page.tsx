import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { MDX } from "../components/mdx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getBlurDataURL, getImages } from "@/lib/images";
import NewsletterForm from "../components/newsletter-form";
import BlurImage from "@/app/components/blur-image";
import getRepos from "@/lib/github";

export const revalidate = 3600;

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
    : `https://steventey.com/api/og?title=${encodeURIComponent(title)}}`;

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

  const [images, repos] = await Promise.all([
    post.images && getImages(post.images),
    // post.tweetIds
    //   ? await Promise.all(post.tweetIds.map(async (id: string) => getTweet(id)))
    //   : [],
    post.githubRepos && getRepos(post.githubRepos),
  ]);

  return (
    <div className="lg:relative">
      <div className="mx-auto max-w-2xl mb-20">
        <Link
          href="/blog"
          className="group ml-5 sm:ml-0 mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
        >
          <span className="sr-only">Back to blog</span>
          <ArrowLeft className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
        </Link>
        <div>
          <div className="mx-5 sm:mx-auto flex flex-col">
            <h1 className="mt-6 text-4xl tracking-tighter font-bold text-zinc-800 sm:text-5xl">
              {post.title}
            </h1>
            <time
              dateTime={post.publishedAt}
              className="order-first flex items-center text-base text-zinc-500"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
              <span className="ml-3">{formatDate(post.publishedAt)}</span>
            </time>
          </div>
          <BlurImage
            src={post.image}
            alt={post.title}
            width={1200}
            height={900}
            priority // since it's above the fold
            placeholder="blur"
            blurDataURL={await getBlurDataURL(post.image!)}
            className="sm:rounded-3xl my-10"
          />

          <MDX code={post.body.code} images={images} repos={repos} />
        </div>
        <NewsletterForm />
      </div>
    </div>
  );
}
