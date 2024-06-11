"use client";

import { notFound, redirect, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode } from "react";

const meta: Record<string, { title: string; description: string }> = {
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

  if (segment.length > 0 && !meta[segment[0]]) {
    redirect("/");
  }

  return (
    <main className="max-w-2xl lg:max-w-5xl mt-16 sm:mt-32 mx-auto">
      {segment.length === 1 && (
        <div className="max-w-2xl mx-5 sm:mx-0">
          <h1 className="text-4xl tracking-tighter text-zinc-800 sm:text-5xl font-bold">
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
