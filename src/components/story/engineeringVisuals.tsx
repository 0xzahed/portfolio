import Link from "next/link";
import type { Project } from "@/lib/types";
import { Panel, Tiles, v } from "./atoms";

/** One discipline: its tools as chips, and the projects where it shipped. */
export function DisciplineVisual({
  items,
  shipped,
}: {
  items: string[];
  shipped: Project[];
}) {
  return (
    <Panel className="flex flex-col justify-between gap-6">
      <div className="flex flex-1 items-center">
        <Tiles items={items} accentFirst className="w-full" />
      </div>
      {shipped.length > 0 && (
        <div className="border-t border-rule pt-4">
          <p
            className="s-in font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke"
            style={v(items.length)}
          >
            Shipped in
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {shipped.map((p, k) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                style={v(items.length + 1 + k)}
                className="s-in inline-flex h-9 items-center rounded-full border border-rule-strong px-4 text-sm transition-colors hover:border-signal hover:text-mint"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
}
