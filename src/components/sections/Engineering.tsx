"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, skills } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { Chips } from "@/components/story/atoms";
import { reveal } from "@/lib/reveal";
import { cn, pad } from "@/lib/utils";
import type { SkillGroup } from "@/lib/types";

function projectsFor(group: SkillGroup) {
  if (group.usedIn) return projects.filter((p) => group.usedIn!.includes(p.slug));
  const needles = group.items.map((i) => i.toLowerCase());
  return projects.filter((p) => p.technologies.some((t) => needles.some((n) => t.toLowerCase().includes(n))));
}

/** Six disciplines as an accordion: one open at a time, tools + shipped-in inside. */
export function Engineering() {
  const [open, setOpen] = useState(0);
  return (
    <section aria-labelledby="eng-title" className="relative border-t border-rule py-20 md:py-44">
      <div className="shell mb-10 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <RevealLines
          id="eng-title"
          lines={["Engineered", "with intention."]}
          className="display text-[clamp(2rem,5.6vw,6.25rem)] [--wdth:84]"
        />
        <p {...reveal(1)} className="font-mono text-xs tabular-nums text-smoke">
          {pad(open + 1)} / {pad(skills.length)}
        </p>
      </div>
      <div className="shell">
        <div {...reveal(0)} className="border-t border-rule">
          {skills.map((g, i) => {
            const isOpen = i === open;
            const shipped = projectsFor(g);
            return (
              <div key={g.id} className="border-b border-rule">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`eng-panel-${g.id}`}
                  className="flex min-h-[44px] w-full cursor-pointer items-center gap-4 py-5 text-left md:gap-8 md:py-7"
                >
                  <span className={cn("font-mono text-xs tabular-nums transition-colors", isOpen ? "text-signal" : "text-smoke")}>
                    {pad(i + 1)}
                  </span>
                  <span className="flex-1">
                    <span className={cn("display block text-[clamp(1.5rem,3.4vw,2.75rem)] transition-colors duration-300 [--wdth:104]", isOpen ? "text-bone" : "text-smoke")}>
                      {g.label}
                    </span>
                    <span className="mt-1 block text-sm text-ash">{g.note}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-300",
                      isOpen ? "rotate-45 border-signal text-mint" : "border-rule-strong text-ash",
                    )}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`eng-panel-${g.id}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                    isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-5 pb-7 pl-9 md:flex-row md:items-center md:justify-between md:pl-14">
                      <Chips items={g.items} />
                      {shipped.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">Shipped in</span>
                          {shipped.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/work/${p.slug}`}
                              className="inline-flex h-9 items-center rounded-full border border-rule-strong px-4 text-sm transition-colors hover:border-signal hover:text-mint"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
