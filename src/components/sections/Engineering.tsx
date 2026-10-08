"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { projects, skills } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { cn, pad } from "@/lib/utils";

function projectsFor(groupId: string) {
  const group = skills.find((g) => g.id === groupId)!;
  if (group.usedIn) return projects.filter((p) => group.usedIn!.includes(p.slug));
  const needles = group.items.map((i) => i.toLowerCase());
  return projects.filter((p) => p.technologies.some((t) => needles.some((n) => t.toLowerCase().includes(n))));
}

export function Engineering() {
  const [active, setActive] = useState(skills[0].id);
  const fine = useFinePointer();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const group = skills.find((g) => g.id === active)!;
  const usedIn = useMemo(() => projectsFor(active), [active]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = i;
    if (e.key in keys) next = (i + keys[e.key] + skills.length) % skills.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = skills.length - 1;
    else return;
    e.preventDefault();
    setActive(skills[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="eng-title" className="relative border-t border-rule py-20 md:py-44">
      <div className="shell">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-6">
          <RevealLines
            id="eng-title"
            lines={["Engineered", "with intention."]}
            className="display text-[clamp(2.75rem,8vw,9rem)] [--wdth:84] md:col-span-9"
          />
          <p className="max-w-[36ch] self-end text-ash md:col-span-3">
            The tools behind the work. Pick a discipline to see where it ships.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12 md:gap-x-6">
          <div role="tablist" aria-orientation="vertical" aria-label="Disciplines" className="md:col-span-5">
            {skills.map((g, i) => {
              const selected = g.id === active;
              return (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${g.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${g.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(g.id)}
                  onPointerEnter={() => fine && setActive(g.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group flex w-full items-baseline justify-between gap-4 border-b border-rule py-4 text-left first:border-t md:py-5"
                >
                  <span
                    className={cn(
                      "display text-[clamp(1.75rem,3.6vw,3.5rem)] transition-[font-variation-settings,color] duration-700 ease-[var(--ease-out-expo)]",
                      selected ? "text-bone" : "text-smoke group-hover:text-ash",
                    )}
                    style={{ ["--wdth" as string]: selected ? 118 : 72 }}
                  >
                    {g.label}
                  </span>
                  <span className={cn("font-mono text-xs tabular-nums transition-colors", selected ? "text-signal" : "text-smoke")}>
                    {pad(g.items.length)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="md:sticky md:top-32">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={group.id}
                  id={`panel-${group.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${group.id}`}
                  initial={{ opacity: 0, transform: "translateY(12px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={{ opacity: 0, transform: "translateY(-12px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xl leading-snug text-bone md:text-2xl">{group.note}</p>
                  <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2">
                    {group.items.map((item, i) => (
                      <m.li
                        key={item}
                        className="flex items-baseline gap-4 border-b border-rule py-4"
                        initial={{ opacity: 0, transform: "translateX(-10px)" }}
                        animate={{ opacity: 1, transform: "translateX(0px)" }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span className="font-mono text-[0.6875rem] text-smoke tabular-nums">{pad(i + 1)}</span>
                        <span className="text-lg">{item}</span>
                      </m.li>
                    ))}
                  </ul>
                  {usedIn.length > 0 && (
                    <div className="mt-10">
                      <p className="text-sm text-ash">Shipped in</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {usedIn.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/work/${p.slug}`}
                              className="inline-flex h-9 items-center border border-rule-strong px-3.5 text-sm transition-colors hover:border-signal hover:text-mint"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
