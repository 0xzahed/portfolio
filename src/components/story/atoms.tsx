import type { CSSProperties, ReactNode } from "react";
import { cn, pad } from "@/lib/utils";

/** Stagger index for the .s-in / .s-bar / .s-pop / .s-grow transitions (see globals.css). */
export const v = (i: number) => ({ "--i": i }) as CSSProperties;

/** The card every visual sits on. */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-full max-h-[46rem] w-full overflow-hidden rounded-xl border border-rule bg-graphite/70 p-4 md:p-6 [@media(max-height:700px)]:p-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  i = 0,
  accent,
  className,
}: {
  children: ReactNode;
  i?: number;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      style={v(i)}
      className={cn(
        "s-in inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8125rem] md:px-3.5 md:text-sm",
        accent ? "border-signal/50 text-mint" : "border-rule-strong text-bone/90",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Chips({ items, start = 0, accentFirst }: { items: string[]; start?: number; accentFirst?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t, k) => (
        <Chip key={t} i={start + k} accent={accentFirst && k === 0}>
          {t}
        </Chip>
      ))}
    </div>
  );
}

/** Numbered tiles: a bigger, calmer way to show a list of short items. */
export function Tiles({
  items,
  start = 0,
  cols = 2,
  accentFirst,
  className,
}: {
  items: string[];
  start?: number;
  cols?: 1 | 2;
  accentFirst?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2.5 md:gap-3.5", cols === 2 ? "grid-cols-2" : "grid-cols-1", className)}>
      {items.map((t, k) => (
        <div
          key={t}
          style={v(start + k)}
          className={cn(
            "s-in flex items-start justify-between gap-3 rounded-xl border bg-carbon/70 px-4 py-4 md:px-5 md:py-5 [@media(max-height:700px)]:px-3 [@media(max-height:700px)]:py-2.5",
            accentFirst && k === 0 ? "border-signal/50" : "border-rule-strong",
          )}
        >
          <span className="display min-w-0 text-[clamp(1rem,2.6vw,1.75rem)] [--wdth:100] [overflow-wrap:anywhere] [@media(max-height:700px)]:text-[0.9375rem]">{t}</span>
          <span className="pt-1 font-mono text-[0.625rem] tabular-nums text-smoke max-[360px]:hidden">{pad(k + 1)}</span>
        </div>
      ))}
    </div>
  );
}
