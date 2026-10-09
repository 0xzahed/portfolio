import Link from "next/link";
import { cn } from "@/lib/utils";

/** Underlined text link. External links open in a new tab. */
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
      {isExternal && href.startsWith("http") && (
        <span className="sr-only"> (opens in a new tab)</span>
      )}
    </>
  );
  const cls = cn("group inline-flex items-center gap-1.5", className);
  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
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
