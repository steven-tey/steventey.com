"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ReactNode } from "react";

const meta: Record<string, { title: string; description: string }> = {
  about: {
    title: "I'm Steven Tey. I'm a programmer, writer, and pianist.",
    description: "A brief introduction to me, my background, and my interests.",
  },
  projects: {
    title: "Things I've made trying to put my dent in the universe.",
    description:
      "I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.",
  },
  blog: {
    title: "Writing on software, design, and startups",
    description:
      "All of my long-form thoughts on programming, product design, and more, collected in chronological order.",
  },
};

export default function Container({ children }: { children: ReactNode }) {
  const segment = useSelectedLayoutSegments();

  return (
    <main className="mx-auto max-w-2xl lg:max-w-5xl mt-16 sm:mt-32">
      {segment.length === 1 && (
        <div className="max-w-2xl">
          <h1 className="text-4xl font-display tracking-tight text-zinc-800 sm:text-5xl">
            {meta[segment[0]].title}
          </h1>
          <p className="mt-6 text-base text-zinc-600">
            {meta[segment[0]].description}
          </p>
        </div>
      )}
      {children}
    </main>
  );
}
