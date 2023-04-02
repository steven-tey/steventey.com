import Link from "next/link";
import cx from "classnames";
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export default function Card({
  as: Component = "div",
  className,
  children,
}: {
  as?: any;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Component
      className={cx(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  );
}

Card.Link = function CardLink({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  return (
    <>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
      <Link href={props.href} {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

Card.Title = function CardTitle({
  as: Component = "h2",
  href,
  children,
}: {
  as?: any;
  href?: string;
  children: ReactNode;
}) {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({
  children,
}: {
  children: ReactNode;
}) {
  return <p className="relative z-10 mt-2 text-sm text-zinc-600">{children}</p>;
};

Card.Cta = function CardCta({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRight className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

Card.Eyebrow = function CardEyebrow({
  as: Component = "p",
  decorate = false,
  className,
  children,
  ...props
}: {
  as?: any;
  decorate?: boolean;
  className?: string;
  children: ReactNode;
  [key: string]: any;
}) {
  return (
    <Component
      className={cx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
        </span>
      )}
      {children}
    </Component>
  );
};
