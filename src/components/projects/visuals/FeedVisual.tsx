"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const SCREENS = [
  { title: "Feed", posts: 3 },
  { title: "Profile", posts: 2 },
  { title: "Messages", posts: 4 },
  { title: "Notifications", posts: 3 },
];

function Phone({ title, posts, tone }: { title: string; posts: number; tone: number }) {
  return (
    <div className="flex aspect-[9/18] h-full shrink-0 flex-col overflow-hidden rounded-[22px] border border-rule-strong bg-ink p-2.5">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-rule-strong" />
      <p className="px-1 text-[11px] font-medium text-bone">{title}</p>
      <div className="mt-3 flex flex-col gap-3">
        {Array.from({ length: posts }).map((_, i) => (
          <div key={i} className="border-b border-rule pb-3">
            <div className="flex items-center gap-2 px-1">
              <span className="size-5 rounded-full bg-carbon" />
              <span className="h-1.5 w-16 bg-rule-strong" />
            </div>
            <div className="mt-2 space-y-1 px-1">
              <span className="block h-1 w-full bg-rule" />
              <span className="block h-1 w-3/4 bg-rule" />
            </div>
            {(i + tone) % 2 === 0 && (
              <div
                className="mt-2 aspect-[4/3] w-full"
                style={{
                  background: `linear-gradient(${140 + tone * 30}deg, rgba(170,183,183,${0.14 + tone * 0.03}), rgba(46,65,86,1) 70%)`,
                }}
              />
            )}
            <div className="mt-2 flex gap-3 px-1">
              <span className="h-1 w-6 bg-rule-strong" />
              <span className="h-1 w-6 bg-rule" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Phones drift sideways as the section scrolls past — the page's one horizontal moment. */
export function FeedVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-34%"]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden border border-rule bg-graphite">
      <m.div style={{ x }} className="flex h-full items-center gap-5 py-8 pl-8 will-change-transform">
        {SCREENS.map((s, i) => (
          <div key={s.title} className="h-full" style={{ transform: `translateY(${i % 2 ? 6 : -6}%)` }}>
            <Phone {...s} tone={i} />
          </div>
        ))}
      </m.div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-graphite to-transparent" />
    </div>
  );
}
