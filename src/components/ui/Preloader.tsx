"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { useIntro } from "@/components/providers/IntroProvider";
import { person } from "@/data/portfolio";
import { pad } from "@/lib/utils";

const SESSION_KEY = "intro-seen";
const COUNT_MS = 1050;

/**
 * Opening sequence: black frame → name → counter + hairline → curtain lifts.
 * Plays once per session on tablet/desktop, never with reduced motion. ~1.6s total.
 */
export function Preloader() {
  const { setReady } = useIntro();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [visible, setVisible] = useState(true);
  const started = useRef(false);
  const countRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage blocked: just play it */
    }

    // Phones skip the counter (it's also hidden by CSS below md, so it never blocks first paint).
    const small = window.matchMedia("(max-width: 767px)").matches;

    if (seen || reduce || small) {
      setVisible(false);
      setReady(true);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / COUNT_MS);
      // ease-in-out so the counter breathes rather than ticks linearly
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      if (countRef.current) countRef.current.textContent = pad(Math.round(eased * 100), 3);
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setVisible(false);
        setReady(true);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce, setReady]);

  // Hold the page still while the sequence plays.
  useEffect(() => {
    if (!lenis) return;
    if (visible) lenis.stop();
    else lenis.start();
  }, [lenis, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          id="preloader"
          key="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[100] hidden flex-col justify-between bg-ink px-[var(--gutter)] py-8 md:flex"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <m.div
            className="meta flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span>{person.name}</span>
            <span>Portfolio {new Date().getFullYear()}</span>
          </m.div>

          <div>
            <p
              ref={countRef}
              className="display text-[clamp(4rem,16vw,14rem)] text-bone tabular-nums"
              style={{ ["--wdth" as string]: 62 }}
              aria-hidden
            >
              000
            </p>
            <div className="mt-6 h-px w-full bg-rule">
              <div ref={barRef} className="h-px origin-left bg-signal" style={{ transform: "scaleX(0)" }} />
            </div>
            <div className="meta mt-3 flex justify-between">
              <span>Compiling the experience</span>
              <span>{person.location}</span>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
