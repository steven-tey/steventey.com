"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { motion, useCycle } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

const navItems = ["about", "projects", "blog"];

export default function NavBar() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="top-0 z-10 h-16 pt-6 w-full flex justify-between items-center mx-5 sm:mx-auto max-w-2xl lg:max-w-5xl">
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
      <ul className="hidden sm:flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
        {navItems.map((item) => (
          <DesktopNavItem
            key={item}
            href={`/${item}`}
            isActive={segment === item}
            display={item}
          />
        ))}
      </ul>
      <div>
        <MobileNav />
      </div>
    </nav>
  );
}

const DesktopNavItem = ({
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
          ${isActive ? "text-teal-500" : "hover:text-teal-500"}
        `}
      >
        <p className="capitalize">{display}</p>
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0" />
        )}
      </Link>
    </li>
  );
};

const MobileNav = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const segment = useSelectedLayoutSegment();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={`fixed inset-0 z-40 w-full sm:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-white"
        variants={{
          open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
            transition: {
              type: "spring",
              stiffness: 20,
              restDelta: 2,
            },
          }),
          closed: {
            clipPath: "circle(0px at 100% 0)",
            transition: {
              delay: 0.3,
              type: "spring",
              stiffness: 400,
              damping: 40,
            },
          },
        }}
      />
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16"
      >
        {navItems.map((item, idx) => (
          <>
            <MenuItem key={item}>
              <Link
                href={`/${item}`}
                className={`flex w-full font-semibold capitalize ${
                  segment === item ? "text-teal-500" : ""
                }`}
                onClick={() => {
                  toggleOpen();
                }}
              >
                {item}
              </Link>
            </MenuItem>

            <MenuItem
              key={`divider-${idx}`}
              className="my-3 h-px w-full bg-gray-300"
            />
          </>
        ))}
      </motion.ul>
      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  );
};

const MenuToggle = ({ toggle }: { toggle: any }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute top-8 right-6"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dimensions.current;
};
