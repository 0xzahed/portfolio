import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Neutral window chrome for code-built visuals: a path bar instead of fake traffic lights. */
export function Frame({ path, children, className }: { path: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full w-full flex-col border border-rule bg-graphite", className)}>
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-rule px-3">
        <span className="font-mono text-[10px] text-ash">{path}</span>
        <span className="h-1 w-8 bg-rule" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
