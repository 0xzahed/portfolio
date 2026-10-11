"use client";

import Image from "next/image";
import { animate, m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { about, currentlyBuilding, experience, person, projects, skills, socials } from "@/data/portfolio";
import { useLocalTime } from "@/hooks/useLocalTime";
import { RevealLines } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { StatusDot } from "@/components/ui/StatusDot";
import { reveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";
import portrait from "@/assets/zahed-portrait.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Letter-by-letter name reveal, 21st profile-card style. */
function NameReveal({ name }: { name: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]" aria-hidden>
      <span className="flex">
        {name.split("").map((ch, i) => (
          <m.span
            key={i}
            className="display text-[clamp(2.75rem,7vw,4.5rem)] [--wdth:100]"
            initial={{ y: reduce ? "0%" : "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 + i * 0.045 }}
          >
            {ch}
          </m.span>
        ))}
      </span>
    </span>
  );
}

/** Count-up stat that settles on its final value with reduced motion. */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden className={className}>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** About as a 21st-style bento: profile, scope, care, builds + live stats + marquee. */
export function AboutStory() {
  const time = useLocalTime(person.timezone);
  const { role, scope, care, builds } = about.story;

  const github = socials.find((s) => s.label === "GitHub");

  return (
    <section aria-labelledby="about-me-title" className="relative overflow-hidden py-20 md:py-44">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(170,183,183,0.09), transparent)" }}
      />

      <div className="shell relative">
        <RevealLines
          id="about-me-title"
          lines={["About", "me"]}
          className="display text-[clamp(2.25rem,7vw,7.5rem)] [--wdth:76]"
        />
        <p {...reveal(1)} className="mt-4 max-w-[52ch] text-lg leading-snug text-ash md:text-xl">
          {role} {scope.text} {currentlyBuilding.stage.charAt(0).toLowerCase() + currentlyBuilding.stage.slice(1)}.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-12 md:gap-5">
          {/* profile — hero plate */}
          <article aria-label={`${person.name}, ${person.role}`} {...reveal(0)} className="md:col-span-7">
            <SpotlightCard className="p-6 md:p-9">
              <div className="relative flex min-h-[22rem] flex-col justify-between gap-8 overflow-hidden md:min-h-[26rem]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 right-0 h-[105%] w-[46%]"
                >
                  <Image
                    src={portrait}
                    alt=""
                    sizes="(min-width: 768px) 380px, 50vw"
                    className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(60% 50% at 70% 60%, rgba(170,183,183,0.16), transparent 70%)" }}
                  />
                </div>

                <div className="relative">
                  <span className="sr-only">{person.name}</span>
                  <NameReveal name={person.name} />
                  <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-signal/40 px-3.5 py-1.5 text-xs text-mint">
                    <StatusDot />
                    {person.role}
                  </p>
                </div>

                <div className="relative grid max-w-[58%] gap-4 border-t border-rule pt-5">
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    <p>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">Based in</span>
                      <span className="mt-1 block text-bone">{person.location}</span>
                    </p>
                    <p>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">Local time</span>
                      <span className="mt-1 block font-mono tabular-nums text-bone" suppressHydrationWarning>
                        {time || "--:--"}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {person.available && (
                      <span className="inline-flex items-center gap-2 text-xs text-ash">
                        <span aria-hidden className="relative inline-flex size-1.5">
                          <span className="absolute inset-0 animate-pulse-dot rounded-full bg-signal" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
                        </span>
                        {person.availability}
                      </span>
                    )}
                    {github && (
                      <a
                        href={github.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-11 items-center gap-2 rounded-full border border-rule-strong px-5 text-sm text-bone transition-colors duration-300 hover:border-signal hover:text-mint"
                      >
                        <GitHubIcon className="size-4" />
                        {github.handle}
                        <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </article>

          {/* scope — chain plate */}
          <article aria-label={`Scope: ${scope.text}`} {...reveal(1)} className="md:col-span-5">
            <SpotlightCard className="flex flex-col justify-between gap-6 p-6 md:p-8" glow="rgba(192,200,202,0.12)">
              <div>
                <p className="font-mono text-xs tabular-nums text-signal">01</p>
                <h3 className="display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] [--wdth:104]">Scope</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-bone/85">{scope.text}</p>
              </div>
              <ol className="space-y-1">
                {scope.chain.map((label, k) => (
                  <li key={label} className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-colors duration-300 hover:border-rule-strong hover:bg-carbon/70">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-rule-strong bg-carbon font-mono text-xs text-mint">
                      {String(k + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-[clamp(1.0625rem,2.4vw,1.375rem)] [--wdth:104]">{label}</span>
                    <span aria-hidden className="ml-auto h-px w-8 bg-rule transition-all duration-300 group-hover:w-12 group-hover:bg-signal" />
                  </li>
                ))}
              </ol>
            </SpotlightCard>
          </article>

          {/* care — split plate */}
          <article aria-label={`Care: ${care.text}`} {...reveal(0)} className="md:col-span-5">
            <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-6 md:p-8" glow="rgba(192,200,202,0.12)">
              <div>
                <p className="font-mono text-xs tabular-nums text-signal">02</p>
                <h3 className="display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] [--wdth:104]">Care</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-bone/85">{care.text}</p>
              </div>
              <div className="space-y-6">
                <div className="rounded-2xl border border-rule bg-carbon/60 p-5">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">Under the hood</p>
                  <p className="display mt-2 text-[clamp(1.25rem,2.6vw,1.625rem)] [--wdth:100]">{care.unseen}</p>
                </div>
                <div className="rounded-2xl border border-signal/40 bg-signal/10 p-5">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">In the hand</p>
                  <p className="display mt-2 text-[clamp(1.25rem,2.6vw,1.625rem)] text-mint [--wdth:100]">{care.felt}</p>
                </div>
              </div>
            </SpotlightCard>
          </article>

          {/* builds — cloud plate */}
          <article aria-label={`${builds.text} ${about.builds.join(", ")}`} {...reveal(1)} className="md:col-span-7">
            <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-6 md:p-8">
              <div>
                <p className="font-mono text-xs tabular-nums text-signal">03</p>
                <h3 className="display mt-2 text-[clamp(1.75rem,3vw,2.5rem)] [--wdth:104]">Builds</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-bone/85">{builds.text}</p>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {about.builds.map((b, k) => (
                  <li
                    key={b}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors duration-300 hover:border-signal hover:text-mint",
                      k === 0 ? "border-signal/50 text-mint" : "border-rule-strong text-bone/90",
                    )}
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <p className="border-t border-rule pt-4 text-sm text-ash">
                {experience[0].role} · {experience[0].org} — {projects.length > 1 ? `${projects.length} selected projects` : `Selected work: ${projects[0].title}`}.
              </p>
            </SpotlightCard>
          </article>
        </div>

        {/* live stats band */}
        <dl className="mt-4 grid grid-cols-2 gap-4 md:mt-5 md:grid-cols-4 md:gap-5">
          {[
            { value: new Date().getFullYear() - 2024 + 1, suffix: "", label: "Years shipping" },
            { value: skills.length, suffix: "", label: "Disciplines" },
            { value: new Set(skills.flatMap((g) => g.items.map((t) => t.toLowerCase()))).size, suffix: "", label: "Technologies" },
            { value: about.builds.length, suffix: "", label: "Things I build" },
          ].map((s, i) => (
            <div key={s.label} {...reveal(i % 4)} className="rounded-3xl border border-rule bg-graphite/70 px-6 py-7 text-center transition-colors duration-300 hover:border-rule-strong">
              <dd className="display text-[clamp(2.25rem,4.5vw,3.5rem)] text-bone [--wdth:70]">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* marquee divider */}
      <div aria-hidden className="mt-14 overflow-hidden border-y border-rule py-4 motion-reduce:hidden md:mt-20">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[...about.builds, ...about.builds].map((b, k) => (
            <span key={k} className="flex items-center gap-8">
              <span className="display text-lg text-smoke [--wdth:100]">{b}</span>
              <span className="size-1.5 rounded-full bg-signal/60" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{about.builds.join(", ")}</p>
    </section>
  );
}
