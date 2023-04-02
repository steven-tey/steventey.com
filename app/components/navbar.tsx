"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const navItems = ["about", "projects", "blog"];

export default function NavBar() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="top-0 z-10 h-16 pt-6 w-full flex justify-between items-center mx-auto max-w-2xl lg:max-w-5xl">
      <div className="w-20">
        {segment && (
          <Link href="/">
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        )}
      </div>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
        {navItems.map((item) => (
          <NavItem
            key={item}
            href={`/${item}`}
            isActive={segment === item}
            display={item}
          />
        ))}
      </ul>
      <div />
    </nav>
  );
}

const NavItem = ({
  href,
  isActive,
  display,
}: {
  href: string;
  isActive: boolean;
  display: string;
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`
          'relative block px-3 py-2 transition',
          ${
            isActive
              ? "text-teal-500 dark:text-teal-400"
              : "hover:text-teal-500 dark:hover:text-teal-400"
          }
        `}
      >
        <p className="capitalize">{display}</p>
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  );
};
