import { philosophy } from "@/data/portfolio";
import { RevealLines, Fade } from "@/components/ui/Reveal";

/** Belief as a quiet centered statement — no pinning, no scroll choreography. */
export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="relative border-t border-rule py-28 md:py-48">
      <div className="shell mx-auto max-w-5xl text-center">
        <p className="eyebrow">Belief</p>
        <RevealLines
          id="philosophy-title"
          lines={philosophy.lines}
          className="display mt-6 text-[clamp(2.5rem,7vw,7rem)] [--wdth:80]"
        />
        <Fade className="mx-auto mt-8 max-w-[50ch] text-lg leading-relaxed text-ash md:text-xl" y={20}>
          <p>{philosophy.body}</p>
        </Fade>
      </div>
    </section>
  );
}
