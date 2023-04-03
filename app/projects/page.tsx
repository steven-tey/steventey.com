import { Link } from "lucide-react";
import Card from "../components/card";

const projects = [
  {
    name: "Dub",
    description:
      "Link management for modern marketing teams. 6K stars on GitHub, 5.2K users.",
    link: { href: "https://dub.sh", label: "dub.sh" },
    logo: "https://dub.sh/_static/logo.png",
  },
  {
    name: "DomainsGPT",
    description:
      "Generate brandable & memorable domain names using AI. Over 280K names generated.",
    link: { href: "https://domainsg.pt", label: "domainsg.pt" },
    logo: "https://oneword.domains/logo.png",
  },
  {
    name: "ShareGPT",
    description:
      "Share your wildest ChatGPT conversations with 1 click. Used by Google to train Bard.",
    link: { href: "https://sharegpt.com", label: "sharegpt.com" },
    logo: "https://sharegpt.com/logo.png",
  },
  {
    name: "One Word Domains",
    description:
      "Database of 1.2M+ available one-word domains for your startup.",
    link: { href: "https://oneword.domains", label: "oneword.domains" },
    logo: "https://oneword.domains/logo.png",
  },
  {
    name: "Extrapolate",
    description: "See how well you age with AI. Over 36K photos generated.",
    link: { href: "https://extrapolate.app", label: "extrapolate.app" },
    logo: "https://extrapolate.app/logo.png",
  },
  {
    name: "Precedent",
    description:
      "An opinionated collection of components, hooks, and utilities for your Next.js project.",
    link: { href: "https://precedent.dev", label: "precedent.dev" },
    logo: "https://precedent.dev/logo.png",
  },
];

export default function Projects() {
  return (
    <div className="my-20 mx-5 sm:mx-0">
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <img
              src={project.logo}
              alt={`${project.name} Logo`}
              className="h-8 w-8 relative z-10 rounded-md"
            />
            <h2 className="mt-6 text-base font-semibold text-zinc-800">
              <Card.Link
                href={project.link.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {project.name}
              </Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-teal-500">
              <Link className="h-4 w-4" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </div>
  );
}
