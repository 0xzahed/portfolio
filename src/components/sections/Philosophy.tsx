"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { philosophy } from "@/data/portfolio";

function Line({ text, progress, index, last }: { text: string; progress: MotionValue<number>; index: number; last: boolean }) {
  const reduce = useReducedMotion();
  const start = 0.08 + index * 0.16;
  const y = useTransform(progress, [start, start + 0.16], reduce ? ["0%", "0%"] : ["105%", "0%"]);
  const wdth = useTransform(progress, [start, start + 0.3], reduce ? [100, 100] : [62, last ? 125 : 100]);
  // The last word does what it says: it fades almost to nothing.
  const opacity = useTransform(progress, last ? [0.62, 0.86] : [0, 1], last && !reduce ? [1, 0.07] : [1, 1]);

  return (
    <span className="block overflow-hidden pb-[0.05em]">
      <m.span className="wdth block will-change-transform" style={{ y, opacity, ["--wdth" as string]: wdth }}>
        {text}
      </m.span>
    </span>
  );
}

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bodyOpacity = useTransform(scrollYProgress, [0.66, 0.82], reduce ? [1, 1] : [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.66, 0.82], reduce ? [0, 0] : [24, 0]);
  const rule = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} aria-labelledby="philosophy-title" className="relative h-[190vh] border-t border-rule md:h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell">
          <h2 id="philosophy-title" className="display text-[clamp(3rem,min(9.6vw,22svh),13rem)] leading-[0.84]">
            <span className="sr-only">{philosophy.lines.join(" ")}</span>
            <span aria-hidden>
              {philosophy.lines.map((l, i) => (
                <Line key={l} text={l} index={i} progress={scrollYProgress} last={i === philosophy.lines.length - 1} />
              ))}
            </span>
          </h2>
          <m.p
            style={{ opacity: bodyOpacity, y: bodyY }}
            className="mt-12 max-w-[50ch] text-lg leading-relaxed text-ash md:ml-[calc(100%/12*7)] md:text-xl"
          >
            {philosophy.body}
          </m.p>
        </div>
        <div aria-hidden className="shell absolute inset-x-0 bottom-10">
          <div className="h-px w-full bg-rule">
            <m.div className="h-px origin-left bg-bone/40" style={{ scaleX: rule }} />
          </div>
        </div>
      </div>
    </section>
  );
}
