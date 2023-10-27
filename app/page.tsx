/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import {
  LinkedInIcon,
  TwitterIcon,
  GitHubIcon,
} from "./components/icons/social";

export default function Home() {
  return (
    <div className="mx-5 sm:mx-0 flex flex-col space-y-5 max-w-xl">
      <Image
        src="/profile.jpg"
        alt="Profile Picture"
        width={60}
        height={60}
        className="rounded-full"
      />
      <h1 className="text-5xl font-bold tracking-tighter">
        Programmer. Writer. Pianist.
      </h1>
      <p className="mt-6 text-base text-zinc-600">
        Hey, I'm Steven. I'm a Senior Developer Advocate at{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-4 text-zinc-800 font-semibold"
        >
          Vercel
        </a>
        , where I help build the future of the web.
      </p>
      <p className="mt-6 text-base text-zinc-600">
        I also maintain projects like{" "}
        <a
          href="https://dub.sh/"
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-4 text-zinc-800 font-semibold"
        >
          Dub
        </a>
        ,{" "}
        <a
          href="https://novel.sh/"
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-4 text-zinc-800 font-semibold"
        >
          Novel
        </a>
        , and{" "}
        <a
          href="https://oneword.domains"
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-4 text-zinc-800 font-semibold"
        >
          One Word Domains
        </a>
        .
      </p>
      <div className="mt-6 flex gap-6">
        <a
          href="https://twitter.com/steventey"
          target="_blank"
          rel="noreferrer noopener"
        >
          <TwitterIcon className="h-6 w-6 hover:scale-105 transition-all" />
        </a>
        <a
          href="https://github.com/steven-tey"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GitHubIcon className="h-6 w-6 hover:scale-105 transition-all" />
        </a>
        <a
          href="https://linkedin.com/in/steventey"
          target="_blank"
          rel="noreferrer noopener"
        >
          <LinkedInIcon className="h-6 w-6 hover:scale-105 transition-all" />
        </a>
      </div>
    </div>
  );
}
