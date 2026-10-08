"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives every [data-reveal] element on the page with a single IntersectionObserver.
 * It only toggles a class; the motion itself is a CSS transition (see globals.css).
 * New nodes (streamed Suspense sections, route changes) are picked up by a MutationObserver.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -7% 0px" },
    );
    const watch = (root: ParentNode) => {
      root.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };
    watch(document);
    const mo = new MutationObserver((records) => {
      for (const r of records)
        r.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches("[data-reveal]:not(.is-in)")) io.observe(n);
          watch(n);
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // The last rows of the page can never clear the -7% trigger line. A 1px sentinel at the
    // very end reveals whatever is still pending and on screen once the page bottom shows.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "height:1px;width:1px;pointer-events:none";
    document.body.appendChild(sentinel);
    const end = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    });
    end.observe(sentinel);
    return () => {
      io.disconnect();
      mo.disconnect();
      end.disconnect();
      sentinel.remove();
    };
  }, [pathname]);

  return null;
}
