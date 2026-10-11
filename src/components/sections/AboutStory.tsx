"use client";

import Image from "next/image";
import { animate, m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { about, experience, person, projects, skills, socials } from "@/data/portfolio";
import type { GitHubProfile } from "@/lib/github";
import { useLocalTime } from "@/hooks/useLocalTime";
import { RevealLines } from "@/components/ui/Reveal";
import { StatusDot } from "@/components/ui/StatusDot";
import { reveal } from "@/lib/reveal";
import { pad } from "@/lib/utils";
import portrait from "@/assets/zahed-portrait.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Word-by-word statement reveal — wraps naturally, never stacks letters. */
function Statement({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span aria-hidden>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <m.span
            className="inline-block"
            initial={{ y: reduce ? "0%" : "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.03 + i * 0.035 }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </span>
  );
}

/** Count-up stat that settles on its final value with reduced motion. */
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = String(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
}

/**
 * About as an editorial dossier: one sticky identity rail, everything else
 * flows as typography — no card grid, no boxes, no pinning.
 */
export function AboutStory({ profile }: { profile?: GitHubProfile | null }) {
  const time = useLocalTime(person.timezone);
  const { role, scope, care } = about.story;
  const github = socials.find((s) => s.label === "GitHub");

  const stats = [
    { value: new Date().getFullYear() - 2024 + 1, label: "Years shipping" },
    { value: skills.length, label: "Disciplines" },
    { value: new Set(skills.flatMap((g) => g.items.map((t) => t.toLowerCase()))).size, label: "Technologies" },
    { value: about.builds.length, label: "Things I build" },
  ];

  return (
    <section aria-labelledby="about-me-title" className="relative py-20 md:py-44">
      <div className="shell">
        <RevealLines
          id="about-me-title"
          lines={["About", "me"]}
          className="display text-[clamp(2.25rem,7vw,7.5rem)] [--wdth:76]"
        />

        <h3 {...reveal(1)} className="display mt-8 max-w-[20ch] text-[clamp(1.5rem,3.4vw,2.75rem)] normal-case leading-[1.05] tracking-[-0.01em] [--wdth:100]">
          <span className="sr-only">{role} {scope.text}</span>
          <Statement text={`${role} — ${scope.text}`} />
        </h3>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:gap-x-6">
          {/* identity rail */}
          <aside aria-label="Identity" className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <div {...reveal(0)} className="overflow-hidden rounded-3xl border border-rule bg-graphite/70">
                <div className="relative aspect-square w-full">
                  {profile ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatarUrl}
                      alt={`GitHub avatar of ${profile.name ?? profile.username}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={portrait}
                      alt={`Portrait of ${person.name}`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover object-top"
                    />
                  )}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <p className="display text-2xl text-bone [--wdth:104]">{profile?.name ?? person.name}</p>
                      <p className="mt-0.5 text-sm text-bone/70">{profile ? `@${profile.username}` : person.role}</p>
                    </div>
                    {person.available && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-ink/60 px-3 py-1.5 text-[0.6875rem] text-mint backdrop-blur-sm">
                        <StatusDot />
                        Open
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {profile?.bio && (
                <p {...reveal(0)} className="mt-5 border-l-2 border-signal pl-4 text-[0.9375rem] leading-relaxed text-bone/85">
                  {profile.bio}
                </p>
              )}

              {profile && (
                <div {...reveal(1)} className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {[
                    { v: profile.followers, l: "Followers" },
                    { v: profile.following, l: "Following" },
                    { v: profile.publicRepos, l: "Repos" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl border border-rule bg-graphite/70 px-2 py-3">
                      <p className="display text-xl text-bone tabular-nums [--wdth:70]">{s.v.toLocaleString("en")}</p>
                      <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-smoke">{s.l}</p>
                    </div>
                  ))}
                </div>
              )}

              <dl {...reveal(1)} className="mt-6 space-y-4 text-sm">
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">Based in</dt>
                  <dd className="text-right text-bone">{person.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">Local time</dt>
                  <dd className="font-mono tabular-nums text-bone" suppressHydrationWarning>{time || "--:--"}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">Now</dt>
                  <dd className="text-right text-bone">{experience[0].role} · {experience[0].org}</dd>
                </div>
                {github && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">GitHub</dt>
                    <dd>
                      <a href={github.href} target="_blank" rel="noopener noreferrer" className="link-line text-bone">
                        {github.handle}
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>

          {/* flowing story */}
          <div className="md:col-span-7 md:col-start-6">
            <div {...reveal(0)}>
              <p className="eyebrow">Scope</p>
              <p className="mt-4 text-xl leading-relaxed text-bone/90 md:text-2xl">
                {scope.chain.map((s, k) => (
                  <span key={s}>
                    {k > 0 && <span aria-hidden className="mx-2 text-signal">→</span>}
                    {s}
                  </span>
                ))}
              </p>
            </div>

            <figure {...reveal(1)} className="mt-14 border-l-2 border-signal pl-6 md:mt-20">
              <blockquote className="display text-[clamp(1.5rem,3vw,2.25rem)] normal-case leading-tight [--wdth:96]">
                “{care.unseen}. {care.felt}.”
              </blockquote>
              <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-smoke">
                {care.text}
              </figcaption>
            </figure>

            <div {...reveal(2)} className="mt-14 md:mt-20">
              <p className="eyebrow">What I build</p>
              <ol className="mt-2">
                {about.builds.map((b, k) => (
                  <li
                    key={b}
                    className="group flex items-baseline gap-5 border-b border-rule py-4 transition-colors duration-300 first:border-t hover:border-rule-strong"
                  >
                    <span className="font-mono text-xs tabular-nums text-smoke transition-colors duration-300 group-hover:text-signal">
                      {pad(k + 1)}
                    </span>
                    <span className="display text-[clamp(1.125rem,2.4vw,1.5rem)] [--wdth:100] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                      {b}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <dl {...reveal(3)} className="mt-14 grid grid-cols-2 gap-y-8 sm:grid-cols-4 md:mt-20">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-rule pl-5 first:border-l-0 first:pl-0 sm:[&:nth-child(3)]:border-l sm:[&:nth-child(3)]:pl-5">
                  <dd className="display text-[clamp(2rem,4vw,3rem)] text-bone [--wdth:70]">
                    <Counter to={s.value} />
                  </dd>
                  <dt className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-smoke">{s.label}</dt>
                </div>
              ))}
            </dl>

            <p {...reveal(4)} className="mt-10 text-sm text-ash">
              {person.availability} — Selected work:{" "}
              {projects.length > 1 ? `${projects.length} projects below` : <span className="text-bone">{projects[0].title}</span>}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
