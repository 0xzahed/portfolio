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

/**
 * Two-column hero: type + intro + CTAs on the left, framed dither portrait
 * with live status on the right, and a 4-up meta strip along the bottom.
 */
export function Hero() {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  const small = useMediaQuery("(max-width: 767px)");
  const startW = small ? undefined : 62;
  const scrollTo = useScrollTo();
  const time = useLocalTime(person.timezone);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const meta = [
    { k: "Based in", v: person.location },
    { k: "Local time", v: time || "--:--", mono: true },
    { k: "Status", v: person.availability, dot: true },
    { k: "Scroll", v: "More below ↓" },
  ];

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <m.div
        style={{ opacity: fade }}
        className="shell grid flex-1 grid-cols-1 items-center gap-10 pb-8 pt-[calc(var(--nav-h)+2rem)] md:pb-10 lg:grid-cols-12 lg:gap-x-6"
      >
        <div className="lg:col-span-7">
          <m.p
            className="js-reveal eyebrow mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            {person.name} — {person.roles.join(" · ")}
          </m.p>

          <m.h1 id="hero-title" style={{ y: headY }} className="display text-ash text-[clamp(2.5rem,min(10vw,15svh),11rem)]">
            <span className="sr-only">{`${person.name}, ${person.role.toLowerCase()} — `}</span>
            {HEADLINE.map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.04em]">
                <m.span
                  className="js-reveal wdth block origin-left bg-gradient-to-b from-bone via-[#C0C8CA] to-signal bg-clip-text text-transparent"
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

          <m.p
            className="js-reveal mt-6 max-w-[38ch] text-lg leading-snug text-ash md:mt-8 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {person.intro}
          </m.p>

          <m.div
            className="js-reveal mt-8 flex flex-wrap gap-3"
            initial={false}
            animate={{ transform: ready ? "translateY(0px)" : "translateY(24px)" }}
            transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.7 }}
          >
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
                className="inline-flex h-12 items-center border border-rule-strong bg-ink/85 px-6 text-sm text-ash transition-colors duration-300 hover:border-bone hover:text-bone"
              >
                Let&apos;s work together
              </a>
            </Magnetic>
          </m.div>
        </div>

        <m.div
          className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none"
          initial={{ opacity: 0, transform: reduce ? "none" : "translateY(40px)" }}
          animate={ready ? { opacity: 1, transform: "translateY(0px)" } : { opacity: 0, transform: reduce ? "none" : "translateY(40px)" }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.3 }}
        >
          <div aria-hidden className="overflow-hidden rounded-3xl border border-rule-strong bg-graphite/60">
            <div className="aspect-[3/4] w-full">
              <DitherPortrait
                src={portrait.src}
                active={ready}
                cellSize={small ? 4 : 5}
                className="h-full w-full [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
              />
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-rule bg-ink/70 px-4 py-3 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-xs text-bone">
              <StatusDot />
              {person.availability}
            </span>
            <span className="font-mono text-xs tabular-nums text-ash" suppressHydrationWarning>
              {time}
            </span>
          </div>
        </m.div>

        <m.dl
          className="js-reveal grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-6 sm:grid-cols-4 lg:col-span-12"
          initial={false}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.85 }}
        >
          {meta.map((it) => (
            <div key={it.k}>
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">{it.k}</dt>
              <dd className={`mt-1 text-sm text-ash ${it.mono ? "font-mono tabular-nums" : ""} ${it.dot ? "flex items-center gap-2" : ""}`} suppressHydrationWarning={it.mono}>
                {it.dot && <StatusDot />}
                {it.v}
              </dd>
            </div>
          ))}
        </m.dl>
      </m.div>
    </section>
  );
}
