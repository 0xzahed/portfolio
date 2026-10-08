"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useIntro } from "@/components/providers/IntroProvider";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { Magnetic } from "@/components/ui/Magnetic";
import { StatusDot } from "@/components/ui/StatusDot";
import { useLocalTime } from "@/hooks/useLocalTime";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { person } from "@/data/portfolio";
import portrait from "@/assets/zahed-portrait.webp";
import { DitherPortrait } from "@/components/ui/DitherPortrait";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const HEADLINE = ["Building", "digital", "systems."];

export function Hero() {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  // Re-flowing huge type every frame is the most expensive effect on the page,
  // so phones get the line reveal at final width.
  const small = useMediaQuery("(max-width: 767px)");
  const startW = small ? undefined : 62;
  const scrollTo = useScrollTo();
  const time = useLocalTime(person.timezone);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <m.div
        style={{ opacity: fade }}
        className="shell relative flex flex-1 flex-col justify-end lg:static pb-8 pt-[calc(var(--nav-h)+3rem)] md:pb-10"
      >
        <div className="relative lg:static">
          {/* Phones: sits in the empty space above the headline. Desktop: stands on the rule, right of the type. */}
          <m.div
            aria-hidden
            className="pointer-events-none relative -mb-[4svh] ml-auto aspect-[433/692] h-[50svh] lg:absolute lg:bottom-0 lg:right-[max(var(--gutter),calc((100%-112rem)/2+var(--gutter)))] lg:mb-0 lg:h-[min(92svh,920px)]"
            initial={{ opacity: 0, transform: reduce ? "none" : "translateY(40px)" }}
            animate={ready ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: reduce ? "none" : "translateY(40px)" }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.3 }}
          >
            <DitherPortrait
              src={portrait.src}
              active={ready}
              cellSize={small ? 4 : 5}
              className="relative h-full w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            />
          </m.div>

        <m.p
          className="js-reveal eyebrow relative z-10 mb-6 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          {person.roles.join(" · ")}
        </m.p>

        <m.h1 id="hero-title" style={{ y: headY }} className="display relative z-10 text-ash text-[clamp(2.5rem,min(13.8vw,19svh),17rem)]">
          <span className="sr-only">{HEADLINE.join(" ")}</span>
          {HEADLINE.map((word, i) => (
            <span
              key={word}
              aria-hidden
              className={`block overflow-hidden pb-[0.04em] ${i === 1 ? "md:pl-[14vw]" : ""}`}
            >
              <m.span
                className="js-reveal wdth block origin-left"
                initial={{ transform: "translateY(105%)", ["--wdth" as string]: startW ?? (i === 2 ? 100 : 112) }}
                animate={
                  ready
                    ? { transform: "translateY(0%)", ["--wdth" as string]: i === 2 ? 100 : 112 }
                    : { transform: "translateY(105%)", ["--wdth" as string]: startW ?? (i === 2 ? 100 : 112) }
                }
                transition={{
                  transform: { duration: 1, ease: EASE_OUT, delay: 0.1 + i * 0.08 },
                  ["--wdth" as string]: { duration: 1.8, ease: [0.65, 0, 0.35, 1] as const, delay: 0.45 + i * 0.09 },
                }}
              >
                {word}
              </m.span>
            </span>
          ))}
        </m.h1>
        </div>

        <m.div
          className="js-reveal relative z-10 mt-8 grid grid-cols-1 gap-y-8 border-t border-rule pt-6 md:mt-10 md:grid-cols-12 md:gap-x-6"
          initial={false}
          animate={{ transform: ready ? "translateY(0px)" : "translateY(24px)" }}
          transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.7 }}
        >
          <p className="max-w-[34ch] text-lg leading-snug text-ash md:col-span-4 lg:col-span-5 md:text-xl">{person.intro}</p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:col-span-4 md:col-start-5 lg:col-start-6">
            <div>
              <dt className="text-ash">Based in</dt>
              <dd className="text-ash">
                {person.location}
                <span className="ml-2 font-mono text-xs text-ash tabular-nums" suppressHydrationWarning>
                  {time}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-ash">Status</dt>
              <dd className="flex items-center gap-2 text-ash">
                <StatusDot />
                {person.availability}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-start gap-3 md:col-span-4 md:col-start-9 md:justify-end lg:col-span-4 lg:col-start-9">
            <Magnetic>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#work");
                }}
                className="inline-flex h-12 items-center border border-rule-strong bg-carbon px-6 text-sm font-medium text-ash transition-colors duration-300 hover:border-signal hover:text-mint"
              >
                View projects
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
                className="inline-flex h-12 items-center border border-rule-strong bg-ink/85 px-6 text-sm text-ash md:backdrop-blur-sm transition-colors duration-300 hover:border-bone hover:text-bone"
              >
                Let&apos;s work together
              </a>
            </Magnetic>
          </div>
        </m.div>
      </m.div>

    </section>
  );
}
