"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { education, experience } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/Reveal";
import type { ExperienceItem } from "@/lib/types";

function Entry({ item }: { item: ExperienceItem }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  // Only the large display type dims; body copy keeps full contrast.
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], reduce ? [1, 1, 1, 1] : [0.38, 1, 1, 0.38]);
  const wdth = useTransform(scrollYProgress, [0, 0.35], reduce ? [100, 100] : [62, 100]);

  return (
    <li ref={ref} className="relative grid grid-cols-1 gap-6 border-t border-rule py-12 md:grid-cols-12 md:gap-x-6 md:py-16">
      <m.p
        className="display wdth text-[clamp(4rem,11vw,11rem)] tabular-nums md:col-span-5"
        style={{ ["--wdth" as string]: wdth, opacity }}
      >
        {item.period}
      </m.p>
      <div className="md:col-span-6 md:col-start-7 md:pt-3">
        <m.h3 style={{ opacity }} className="display text-[clamp(1.5rem,2.8vw,2.6rem)] [--wdth:110]">
          {item.role}
        </m.h3>
        <p className="mt-2 text-ash">{item.org}</p>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-bone/85">{item.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ash">
          {item.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 50%"] });

  return (
    <section id="experience" aria-labelledby="exp-title" className="relative border-t border-rule py-32 md:py-44">
      <div className="shell">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-6">
          <RevealLines id="exp-title" lines={["Experience"]} className="display text-[clamp(3rem,10vw,11rem)] [--wdth:76] md:col-span-9" />
          <p className="max-w-[30ch] self-end text-ash md:col-span-3">
            {education.degree}, {education.school}.
          </p>
        </div>
        <div className="relative mt-16 md:mt-24">
          <div aria-hidden className="absolute -left-[calc(var(--gutter)/2)] top-0 hidden h-full w-px bg-rule md:block">
            <m.div className="h-full w-px origin-top bg-signal" style={{ scaleY: scrollYProgress }} />
          </div>
          <ol ref={listRef}>
            {experience.map((item) => (
              <Entry key={item.period + item.role} item={item} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
