"use client";

import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { about } from "@/data/portfolio";

/** A word whose brightness follows scroll position — the statement "reads itself" as you scroll. */
function ScrollWord({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.38, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </m.span>
  );
}

export function About() {
  const statementRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: statementRef, offset: ["start 85%", "end 45%"] });
  const words = about.statement.flatMap((line, li) => line.split(" ").map((w) => ({ w, li })));

  return (
    <section id="about" aria-labelledby="about-title" className="relative pb-6 pt-20 md:pb-20 md:pt-48">
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
      </div>
    </section>
  );
}
