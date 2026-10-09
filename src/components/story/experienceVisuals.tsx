import type { ExperienceItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Chips, Panel, v } from "./atoms";

/** All roles on a timeline with the current one lit, its stack beneath, education last. */
export function ExperienceVisual({
  items,
  active,
  education,
}: {
  items: ExperienceItem[];
  active: number;
  education: { degree: string; school: string };
}) {
  return (
    <Panel className="flex flex-col justify-between gap-5">
      <ol className="flex flex-1 flex-col justify-center">
        {items.map((it, k) => (
          <li
            key={it.period + it.role}
            style={v(k)}
            className={cn(
              "s-in flex items-center gap-3 border-b border-rule py-4 md:gap-4 md:py-5",
              k === active ? "text-bone" : "text-smoke",
            )}
          >
            <span
              className={cn(
                "size-2 shrink-0 rounded-full",
                k === active ? "bg-signal" : "bg-rule-strong",
              )}
            />
            <span className="w-10 shrink-0 font-mono text-xs tabular-nums">
              {it.period}
            </span>
            <span className="display text-[clamp(1rem,2.6vw,1.25rem)] [--wdth:104]">
              {it.role}
            </span>
            <span className="ml-auto hidden text-sm text-ash sm:block">
              {it.org}
            </span>
          </li>
        ))}
      </ol>
      <Chips items={items[active].stack} start={items.length} accentFirst />
      <p
        className="s-in font-mono text-[0.6875rem] text-smoke [@media(max-height:640px)]:hidden"
        style={v(items.length + 5)}
      >
        {education.degree} · {education.school}
      </p>
    </Panel>
  );
}
