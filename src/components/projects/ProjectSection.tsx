"use client";

import Image from "next/image";
import Link from "next/link";
import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { cn, pad } from "@/lib/utils";
import { ProjectVisual, VisualPlaceholder } from "./visuals";

export function ProjectMedia({ project, defer = false }: { project: Project; defer?: boolean }) {
  if (defer) return <VisualPlaceholder />;
  if (project.image) {
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        sizes="(min-width: 768px) 66vw, 100vw"
        className="h-full w-full object-cover"
      />
    );
  }
  return <ProjectVisual kind={project.visual} />;
}

export function ProjectSection({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [hover, setHover] = useState(false);
  // Mount the visual a screen or so before it arrives; until then it's an empty frame.
  const near = useInView(mediaRef, { once: true, margin: "100% 0px" });
  const flip = index % 2 === 1;
  const href = `/work/${project.slug}`;

  // Image mask opens as the visual scrolls into frame.
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "center 55%"] });
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v * 0.6}% ${v}% ${v * 0.6}% )`);
  const innerScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1]);

  // Visual leans toward the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine || reduce || !mediaRef.current) return;
    const r = mediaRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHover(false);
  };

  return (
    <article
      ref={ref}
      aria-labelledby={`project-${project.slug}`}
      className="relative border-t border-rule pb-24 pt-6 md:pb-40"
    >
      <div className="grid grid-cols-2 gap-x-6 text-[0.75rem] uppercase tracking-[0.12em] text-ash md:grid-cols-12">
        <p className="flex items-center gap-3 md:col-span-3">
          <span>Project</span>
          <span className="relative inline-block h-[1.4em] overflow-hidden font-mono leading-[1.4em] tabular-nums text-bone">
            <m.span
              className="block"
              animate={{ y: hover ? "-50%" : "0%" }}
              transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            >
              <span className="block">{pad(index + 1)}</span>
              <span className="block text-signal">{pad(index + 1)}</span>
            </m.span>
          </span>
          <span className="text-smoke">/ {pad(total)}</span>
        </p>
        <p className="text-right md:col-span-3 md:col-start-7 md:text-left">{project.category}</p>
        <p className="hidden text-right md:col-span-3 md:col-start-10 md:block">{project.year}</p>
      </div>

      <h3 id={`project-${project.slug}`} className="mt-8 md:mt-10">
        <Link
          href={href}
          className={cn("display block text-[clamp(2.75rem,11.5vw,13rem)] transition-[font-variation-settings,color] duration-700 ease-[var(--ease-out-expo)]", flip && "md:text-right")}
          style={{ ["--wdth" as string]: hover ? 118 : 96 }}
          data-cursor="view"
          data-cursor-label="Open"
        >
          {project.title}
        </Link>
      </h3>

      <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-12 md:gap-x-6">
        <div
          className={cn(
            "flex flex-col justify-between gap-10 md:col-span-4",
            flip ? "md:order-2 md:col-start-9" : "md:order-1",
          )}
        >
          <div>
            <p className="max-w-[42ch] text-lg leading-snug text-bone md:text-xl">{project.summary}</p>
            <p className="mt-5 text-sm text-ash">{project.role}</p>
          </div>
          <div>
            <h4 className="sr-only">Technology</h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 border-t border-rule pt-5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ash">
              {project.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <Link href={href} className="group inline-flex items-center gap-2 text-bone">
                <span className="link-line">View project</span>
                <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-line text-ash hover:text-bone">
                  Live site<span className="sr-only"> for {project.title} (opens in a new tab)</span>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-line text-ash hover:text-bone">
                  Source<span className="sr-only"> for {project.title} (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div
          ref={mediaRef}
          className={cn("md:col-span-8", flip ? "md:order-1 md:col-start-1" : "md:order-2")}
          onPointerEnter={() => setHover(true)}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <Link
            href={href}
            data-cursor="view"
            aria-hidden
            tabIndex={-1}
            className="block"
          >
            <m.div style={{ clipPath }} className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
              <m.div style={{ scale: innerScale }} className="h-full w-full">
                <m.div
                  style={{ x: sx, y: sy }}
                  animate={{ scale: hover ? 1.025 : 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                  aria-hidden
                >
                  <ProjectMedia project={project} defer={!near} />
                </m.div>
              </m.div>
            </m.div>
          </Link>
        </div>
      </div>
    </article>
  );
}
