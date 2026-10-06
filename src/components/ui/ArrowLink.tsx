import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Text link with an arrow that nudges on hover. External links open in a new tab. */
export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const isExternal = external ?? /^(https?:|mailto:)/.test(href);
  const content = (
    <>
      <span className="link-line pb-0.5">{children}</span>
      <ArrowUpRight
        aria-hidden
        className="size-[1em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.5}
      />
      {isExternal && href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  const cls = cn("group inline-flex items-center gap-1.5", className);
  if (isExternal) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
