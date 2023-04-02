import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { ReactNode } from "react";
import Tweet from "@/app/components/tweet";

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
  tweets: any;
}

export function MDX({ code, tweets }: MDXProps) {
  const Component = useMDXComponent(code);

  const StaticTweet = ({ id }: { id: string }) => {
    const tweet = tweets.find((tweet: any) => tweet.id === id);
    return <Tweet metadata={tweet} />;
  };
  return (
    <article className="mx-5 sm:mx-auto prose prose-thead:text-lg prose-headings:font-display prose-h2:text-3xl prose-a:underline-offset-4 prose-a:font-semibold prose-neutral">
      <Component components={{ ...components, StaticTweet }} />
    </article>
  );
}
