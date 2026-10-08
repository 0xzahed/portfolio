"use client";

import { AnimatePresence, m, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { about } from "@/data/portfolio";
import { pad } from "@/lib/utils";
import { reveal } from "@/lib/reveal";

/** A word whose brightness follows scroll position — the statement "reads itself" as you scroll. */
function ScrollWord({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.38, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </m.span>
  );
}

function ProcessCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % about.process.length), 1800);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="relative">
      <div className="flex items-end justify-between border-b border-rule pb-4">
        <span className="eyebrow">Process</span>
        <span className="font-mono text-xs text-ash tabular-nums">
          {pad(i + 1)} / {pad(about.process.length)}
        </span>
      </div>
      <div className="relative mt-4 h-[clamp(7rem,15vw,13rem)] overflow-hidden" aria-live="off">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.div
            key={i}
            className="absolute inset-0 flex items-baseline gap-5"
            initial={{ transform: "translateY(100%)" }}
            animate={{ transform: "translateY(0%)" }}
            exit={{ transform: "translateY(-100%)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <span
              className="display text-[clamp(7rem,15vw,13rem)] text-signal tabular-nums"
              style={{ ["--wdth" as string]: 62 }}
            >
              {pad(i + 1)}
            </span>
            <span className="display text-[clamp(1.75rem,3.6vw,3.25rem)]" style={{ ["--wdth" as string]: 112 }}>
              {about.process[i]}
            </span>
          </m.div>
        </AnimatePresence>
      </div>
      <ol className="mt-6 grid grid-cols-4 gap-2" aria-label="How I work">
        {about.process.map((step, k) => (
          <li key={step}>
            <span className="block h-px w-full bg-rule">
              <m.span
                className="block h-px origin-left bg-bone"
                animate={{ scaleX: k === i ? 1 : k < i ? 1 : 0, opacity: k === i ? 1 : 0.35 }}
                transition={{ duration: k === i && !reduce ? 1.8 : 0.4, ease: "linear" }}
              />
            </span>
            <span
              className={`mt-3 block text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-500 sm:text-xs ${
                k === i ? "text-bone" : "text-smoke"
              }`}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function About() {
  const statementRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: statementRef, offset: ["start 85%", "end 45%"] });
  const words = about.statement.flatMap((line, li) => line.split(" ").map((w) => ({ w, li })));

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 md:py-48">
      <div className="shell">
        <h2
          id="about-title"
          ref={statementRef}
          className="display max-w-[14ch] text-[clamp(2.75rem,8.4vw,9.5rem)]"
          style={{ ["--wdth" as string]: 88 }}
        >
          <span className="sr-only">{about.statement.join(" ")}</span>
          <span aria-hidden>
            {about.statement.map((line, li) => (
              <span key={li} className="block">
                {words
                  .map((x, idx) => ({ ...x, idx }))
                  .filter((x) => x.li === li)
                  .map(({ w, idx }) => (
                    <ScrollWord
                      key={idx}
                      word={w}
                      progress={scrollYProgress}
                      range={[idx / words.length, (idx + 1) / words.length]}
                    />
                  ))}
              </span>
            ))}
          </span>
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-16 md:mt-32 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-6 lg:col-span-5">
            {about.paragraphs.map((p, k) => (
              <p key={p.slice(0, 16)} {...reveal(k)} className="mb-6 max-w-[60ch] text-lg leading-relaxed text-bone/85">
                {p}
              </p>
            ))}
            <h3 className="eyebrow mt-14 border-b border-rule pb-4">What I build</h3>
            <ul className="mt-2">
              {about.builds.map((b, k) => (
                <li key={b} {...reveal(k, "left")} className="border-b border-rule py-3 text-[0.9375rem] text-bone/90">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="md:sticky md:top-32">
              <ProcessCounter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
