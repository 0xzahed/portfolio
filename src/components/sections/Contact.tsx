"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
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
    <section id="contact" aria-labelledby="contact-title" className="relative border-t border-rule pb-20 pt-20 md:pb-32 md:pt-48">
      <div className="shell">
        <RevealLines
          id="contact-title"
          lines={contact.heading}
          className="display text-[12.5vw] [--wdth:96] md:text-[clamp(3.6rem,14vw,17rem)]"
        />

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5">
            <p {...reveal(0)} className="max-w-[30ch] text-xl leading-snug md:text-2xl">{contact.subtext}</p>
            <div {...reveal(1, "scale")} className="mt-10">
              <Magnetic strength={0.25}>
                <a
                  href={`mailto:${person.email}?subject=${encodeURIComponent("Project enquiry")}`}
                  className="group inline-flex h-16 items-center gap-4 bg-signal pl-7 pr-6 text-[0.9375rem] font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-300 hover:bg-mint md:h-20 md:pl-9 md:pr-8"
                >
                  {contact.cta}
                  <ArrowRight aria-hidden className="size-5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <dl>
              <div {...reveal(0, "left")} className="flex items-center justify-between gap-4 border-t border-rule py-5">
                <dt className="text-sm text-ash">Email</dt>
                <dd className="flex items-center gap-3">
                  <a href={`mailto:${person.email}`} className="link-line text-lg md:text-xl">
                    {person.email}
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="flex size-9 items-center justify-center border border-rule-strong text-ash transition-colors hover:border-bone hover:text-bone"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                  >
                    {copied ? <Check className="size-4 text-signal" strokeWidth={1.5} /> : <Copy className="size-4" strokeWidth={1.5} />}
                  </button>
                  <span role="status" className="sr-only">{copied ? "Email address copied to clipboard" : ""}</span>
                </dd>
              </div>
              {socials.map((s, k) => (
                <div key={s.label} {...reveal(1 + k, "left")} className="border-t border-rule last:border-b">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <Magnetic strength={0.08} className="block">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between py-5"
                      >
                        <span className="text-sm text-ash transition-colors group-hover:text-bone">{s.label}</span>
                        <span className="flex items-center gap-3 text-lg md:text-xl">
                          <span className="link-line">{s.handle}</span>
                          <ArrowRight aria-hidden className="size-4 -rotate-45 text-ash transition-transform duration-500 group-hover:rotate-0 group-hover:text-signal" strokeWidth={1.5} />
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </Magnetic>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
