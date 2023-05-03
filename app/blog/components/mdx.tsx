"use client";

import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import cx from "classnames";
import { useEffect, useState } from "react";
import Tweet from "./tweet";
import RepoCard, { GithubRepoProps } from "./repo-card";

const CustomLink = (props: any) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  a: CustomLink,
};

interface MDXProps {
  code: string;
  images: { url: string; blurDataURL: string }[];
  tweets: any[];
  repos: GithubRepoProps[];
}

export function MDX({ code, images, tweets, repos }: MDXProps) {
  const Component = useMDXComponent(code);

  const BlurImage = (props: any) => {
    const image = images.find((image) => image.url === props.src);
    const [isLoading, setLoading] = useState(true);
    const [src, setSrc] = useState(props.src);
    useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes
    return (
      <Image
        {...props}
        src={src}
        alt={props.alt}
        className={cx(
          props.className,
          "rounded-lg duration-300 ease w-full",
          isLoading
            ? "blur-sm" // to create the blur loading effect
            : "blur-none"
        )}
        placeholder="blur"
        blurDataURL={
          image?.blurDataURL ||
          "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
        }
        onLoadingComplete={async () => {
          setLoading(false);
        }}
      />
    );
  };

  const StaticTweet = ({ id }: { id: string }) => {
    const tweet = tweets.find((tweet: any) => tweet.id === id);
    return <Tweet metadata={tweet} />;
  };

  const GithubRepo = ({ url }: { url: string }) => {
    const repo = repos.find((repo) => repo.url === url);
    return <RepoCard {...repo!} />;
  };

  return (
    <article
      className="mx-5 sm:mx-auto prose prose-thead:text-lg prose-headings:font-display prose-h2:text-3xl prose-a:font-medium prose-a:text-gray-500 
    prose-a:underline-offset-4 hover:prose-a:text-black prose-neutral"
    >
      <Component
        components={{ ...components, BlurImage, StaticTweet, GithubRepo }}
      />
    </article>
  );
}
