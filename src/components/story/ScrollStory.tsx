"use client";

import { useLenis } from "lenis/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn, pad } from "@/lib/utils";

export type StoryStep = {
  id: string;
  /** The big word beside the visual. */
  label: string;
  /** Oversized figure above the label; defaults to 01, 02, 03… */
  index?: string;
  /** One short line. Everything else should be a visual. */
  text?: ReactNode;
  /** The visual that stands in for a paragraph. */
  visual: ReactNode;
  /** Plain-text version for screen readers and crawlers (only the active step is exposed visually). */
  summary?: string;
};

type Props = {
  id?: string;
  /** Small section name, top left. */
  eyebrow: string;
  /** Hidden heading for sections with no visible one. */
  title?: string;
  steps: StoryStep[];
  /** Extra scroll length per step, in svh: [phones, desktop]. */
  stepVh?: [number, number];
  className?: string;
};

const clampIndex = (p: number, n: number) =>
  Math.min(n - 1, Math.max(0, Math.floor(p * n)));

/**
 * One pinned screen per step. As you scroll, the big label slides to the next step and the
 * visual re-draws; after the last step the page carries on. With reduced motion the steps
 * simply stack, unpinned.
 */
export function ScrollStory({
  id,
  eyebrow,
  title,
  steps,
  stepVh = [55, 70],
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const n = steps.length;
  const [active, setActive] = useState(0);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);

  // Progress is plain arithmetic on a cached position, and the scroll listener only exists while the
  // section is within a screen of the viewport. (Per-section scroll tracking cost ~4ms of main thread
  // per frame on a throttled phone.)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let top = 0;
    let span = 1;
    let measuredAt = 0;
    let raf = 0;
    let near = false;
    const last: number[] = [];
    const measure = () => {
      top = el.getBoundingClientRect().top + window.scrollY;
      span = Math.max(1, el.offsetHeight - window.innerHeight);
      measuredAt = performance.now();
    };
    const update = () => {
      raf = 0;
      if (performance.now() - measuredAt > 600) measure();
      const p = Math.min(1, Math.max(0, (window.scrollY - top) / span));
      setActive(clampIndex(p, n));
      for (let k = 0; k < n; k++) {
        const f = fills.current[k];
        const v = Math.min(1, Math.max(0, p * n - k));
        if (f && last[k] !== v) {
          f.style.transform = `scaleX(${v})`;
          last[k] = v;
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting === near) return;
        near = entry.isIntersecting;
        if (near) {
          measure();
          onScroll();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", measure);
        } else {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", measure);
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    measure();
    raf = requestAnimationFrame(update); // also picks the right step after a reload mid-page
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [n]);

  const jump = (k: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + ((k + 0.5) / n) * (el.offsetHeight - window.innerHeight);
    // Lenis only runs on fine pointers (touch scrolls natively), so a Lenis scrollTo would do nothing there.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (lenis && !touch) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id={id}
      aria-label={title ?? eyebrow}
      className={cn(
        "story-section relative [--step:var(--step-sm)] md:[--step:var(--step-md)] motion-reduce:!h-auto",
        className,
      )}
      style={
        {
          "--step-sm": `${stepVh[0]}svh`,
          "--step-md": `${stepVh[1]}svh`,
          height: `calc(100svh + var(--step) * ${n})`,
        } as CSSProperties
      }
    >
      {title && <h2 className="sr-only">{title}</h2>}
      <ol className="sr-only">
        {steps.map((s) => (
          <li key={s.id}>
            {s.label}
            {s.summary
              ? `: ${s.summary}`
              : typeof s.text === "string"
                ? `: ${s.text}`
                : ""}
          </li>
        ))}
      </ol>

      <div className="story-sticky sticky top-0 flex h-[100svh] flex-col pb-4 pt-[calc(var(--nav-h)+0.25rem)] motion-reduce:static motion-reduce:h-auto motion-reduce:py-20 md:pb-8">
        <div className="shell flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-end justify-between border-b border-rule pb-3">
            <span className="eyebrow">{eyebrow}</span>
            <span
              aria-hidden
              className="font-mono text-xs tabular-nums text-ash motion-reduce:hidden"
            >
              {pad(active + 1)} / {pad(n)}
            </span>
          </div>

          <div className="story-stack grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)] pt-4 md:pt-8 motion-reduce:flex motion-reduce:flex-col motion-reduce:gap-20">
            {steps.map((s, k) => (
              <div
                key={s.id}
                data-active={k === active}
                style={{ "--rel": k - active } as CSSProperties}
                className="story-step grid min-h-0 grid-cols-1 grid-rows-[auto_auto_minmax(0,1fr)] gap-x-6 gap-y-3 [grid-area:1/1] md:grid-cols-12 md:grid-rows-[1fr] md:gap-y-0 motion-reduce:[grid-area:auto]"
              >
                <div className="flex min-h-0 flex-col md:col-span-5 md:justify-between">
                  <div className="overflow-hidden pb-[0.08em]">
                    <div
                      aria-hidden
                      className="story-label flex items-baseline gap-3 md:block"
                    >
                      <span className="display block text-signal tabular-nums [--wdth:62] text-[clamp(2.5rem,13vw,3.5rem)] md:text-[clamp(4rem,8.5vw,8.5rem)]">
                        {s.index ?? pad(k + 1)}
                      </span>
                      <span className="display block text-[clamp(1.25rem,5.5vw,1.625rem)] [--wdth:112] md:mt-2 md:text-[clamp(1.5rem,2.6vw,2.5rem)]">
                        {s.label}
                      </span>
                    </div>
                  </div>
                  {s.text && (
                    <p
                      aria-hidden
                      className="s-in mt-2 hidden max-w-[30ch] text-base leading-snug text-bone/85 md:mt-0 md:block md:text-base"
                    >
                      {s.text}
                    </p>
                  )}
                </div>
                {s.text && (
                  <p
                    aria-hidden
                    className="s-in text-sm leading-snug text-bone/80 md:hidden"
                  >
                    {s.text}
                  </p>
                )}
                <div className="flex min-h-0 flex-col justify-center md:col-span-7 md:col-start-6">
                  {s.visual}
                </div>
              </div>
            ))}
          </div>

          <ol
            className="mt-3 grid shrink-0 gap-2 motion-reduce:hidden md:mt-6"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
          >
            {steps.map((s, k) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => jump(k)}
                  aria-label={`Go to ${s.label}`}
                  className="block w-full text-left"
                >
                  <span className="block h-px w-full bg-rule">
                    <span
                      ref={(node) => {
                        fills.current[k] = node;
                      }}
                      className="block h-px origin-left bg-bone"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                  <span
                    className={cn(
                      "mt-2 hidden truncate text-xs uppercase tracking-[0.12em] transition-colors duration-500 md:block",
                      k === active ? "text-bone" : "text-smoke",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
