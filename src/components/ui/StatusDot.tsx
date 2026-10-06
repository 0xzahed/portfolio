import { cn } from "@/lib/utils";

/** A live indicator: solid dot with a soft expanding ring. */
export function StatusDot({ className, tone = "signal" }: { className?: string; tone?: "signal" | "ash" }) {
  const color = tone === "signal" ? "bg-signal" : "bg-ash";
  return (
    <span aria-hidden className={cn("relative inline-flex size-1.5", className)}>
      <span className={cn("absolute inset-0 rounded-full animate-pulse-dot", color)} />
      <span className={cn("relative inline-flex size-1.5 rounded-full", color)} />
    </span>
  );
}
