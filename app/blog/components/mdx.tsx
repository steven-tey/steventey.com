"use client";

import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import Tweet from "@/app/components/tweet";
import cx from "classnames";
import { useEffect, useState } from "react";

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
}

export function MDX({ code, images, tweets }: MDXProps) {
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
          "rounded-lg duration-300 ease",
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
  return (
    <article className="mx-5 sm:mx-auto prose prose-thead:text-lg prose-headings:font-display prose-h2:text-3xl prose-neutral">
      <Component components={{ ...components, BlurImage, StaticTweet }} />
    </article>
  );
}
