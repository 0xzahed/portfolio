"use client";

import { useState } from "react";
import { contact, person, socials } from "@/data/portfolio";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealLines } from "@/components/ui/Reveal";
import { reveal } from "@/lib/reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative border-t border-rule pb-12 pt-12 md:pb-20 md:pt-28"
    >
      <div className="shell">
        <RevealLines
          id="contact-title"
          lines={contact.heading}
          className="display text-[9.5vw] [--wdth:96] md:text-[clamp(2.75rem,9vw,11rem)]"
        />

        <div className="mt-10 md:mt-14">
          <div {...reveal(0, "left")} className="border-t border-rule py-8">
            <p className="text-sm text-ash">Email — click to write, or copy it</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={`mailto:${person.email}`}
                className="display link-line break-all text-[clamp(1.75rem,6vw,4.5rem)] leading-none [--wdth:96]"
              >
                {person.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="h-11 shrink-0 cursor-pointer border border-rule-strong px-5 text-[0.6875rem] uppercase tracking-[0.1em] text-ash transition-colors hover:border-bone hover:text-bone"
                aria-label={copied ? "Email copied" : "Copy email address"}
              >
                {copied ? <span className="text-signal">Copied</span> : "Copy"}
              </button>
            </div>
            <span role="status" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>
          <dl>
              {socials.map((s, k) => (
                <div
                  key={s.label}
                  {...reveal(1 + k, "left")}
                  className="border-t border-rule last:border-b"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <Magnetic strength={0.08} className="block">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-5"
                      >
                        <span className="text-sm text-ash transition-colors group-hover:text-bone">
                          {s.label}
                        </span>
                        <span className="flex items-center gap-3 text-lg md:text-xl">
                          <span className="link-line">{s.handle}</span>
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </Magnetic>
                  </dd>
                </div>
              ))}
            </dl>

          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p {...reveal(2)} className="max-w-[34ch] text-xl leading-snug md:text-2xl">
              {contact.subtext}
            </p>
            <div {...reveal(3, "scale")}>
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${person.email}?subject=${encodeURIComponent("Project enquiry")}`}
                  className="inline-flex h-16 items-center gap-4 bg-signal pl-7 pr-6 text-[0.9375rem] font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-300 hover:bg-mint md:h-20 md:pl-9 md:pr-8"
                >
                  {contact.cta}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
