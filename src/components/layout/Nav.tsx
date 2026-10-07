"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { useIntro } from "@/components/providers/IntroProvider";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { StatusDot } from "@/components/ui/StatusDot";
import { navItems, person, socials } from "@/data/portfolio";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

const EASE = [0.77, 0, 0.175, 1] as const;

export function Nav() {
  const { ready } = useIntro();
  const pathname = usePathname();
  const scrollTo = useScrollTo();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 48));

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const go = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    setOpen(false);
    if (!onHome) return; // let the link navigate to /#hash
    e.preventDefault();
    // Wait a beat for the menu to close before scrolling.
    window.setTimeout(() => scrollTo(hash), open ? 450 : 0);
    history.replaceState(null, "", hash === "#top" ? "/" : hash);
  };

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-[60]"
        initial={{ y: "-100%" }}
        animate={{ y: ready ? "0%" : "-100%" }}
        transition={{ duration: 1, ease: EASE, delay: 0.5 }}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-[padding,background-color,border-color] duration-500 ease-[var(--ease-out-expo)]",
            compact ? "py-3" : "py-6",
          )}
        >
          <Link
            href="/"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollTo("#top");
              }
            }}
            className="display relative z-10 text-lg tracking-[-0.02em] transition-[font-variation-settings] duration-700"
            style={{ ["--wdth" as string]: compact ? 70 : 112 }}
            aria-label={`${person.name}, home`}
          >
            {person.shortName}
            <span className="text-signal">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9 text-[0.8125rem] tracking-[0.04em] uppercase text-bone/80">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    onClick={(e) => go(e, item.href)}
                    className="link-line hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            {person.available && (
              <p className="hidden items-center gap-2.5 text-[0.6875rem] uppercase tracking-[0.12em] text-ash lg:flex">
                <StatusDot />
                Available for work
              </p>
            )}
            <button
              type="button"
              className="relative z-10 -mr-2 flex h-10 items-center gap-3 px-2 text-[0.75rem] uppercase tracking-[0.14em] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-2 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-500",
                    open && "translate-y-1 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-bone transition-transform duration-500",
                    open && "-translate-y-[3px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
        {/* Dark backdrop fades in once the bar compacts. */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 bg-ink/95 transition-opacity duration-500",
            compact && !open ? "opacity-100" : "opacity-0",
          )}
        />
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col bg-ink md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center pt-[var(--nav-h)]">
              <ul>
                {navItems.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-rule">
                    <m.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.06 }}
                    >
                      <Link
                        href={`/${item.href}`}
                        onClick={(e) => go(e, item.href)}
                        className="flex items-baseline justify-between py-4"
                      >
                        <span className="display text-[13vw]" style={{ ["--wdth" as string]: 80 }}>
                          {item.label}
                        </span>
                      </Link>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>
            <m.div
              className="shell flex items-end justify-between gap-6 pb-8 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <ul className="space-y-1 text-sm text-ash">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2.5 text-[0.6875rem] uppercase tracking-[0.12em] text-ash">
                <StatusDot />
                Available for work
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
