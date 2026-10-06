import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects, person } from "@/data/portfolio";
import { ProjectMedia } from "@/components/projects/ProjectSection";
import { RevealLines, Fade } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { pad } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} — ${person.name}`, description: project.summary, type: "article" },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const cs = project.caseStudy;

  return (
    <article className="pt-[calc(var(--nav-h)+3rem)]">
      <div className="shell">
        <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-ash hover:text-bone">
          <ArrowLeft aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-x-1" strokeWidth={1.5} />
          <span className="link-line">All work</span>
        </Link>

        <p className="mt-16 text-[0.75rem] uppercase tracking-[0.12em] text-ash">
          Project <span className="font-mono text-bone">{pad(index + 1)}</span> / {pad(projects.length)}
          <span className="mx-3 text-smoke">|</span>
          {project.category}
        </p>
        <RevealLines
          as="h1"
          lines={[project.title]}
          className="display mt-6 text-[clamp(2.5rem,11vw,16rem)] [--wdth:96] md:[--wdth:110]"
        />

        <Fade className="mt-12 grid grid-cols-1 gap-10 border-t border-rule pt-8 md:grid-cols-12 md:gap-x-6">
          <p className="max-w-[40ch] text-xl leading-snug md:col-span-6 md:text-2xl">{project.summary}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm md:col-span-5 md:col-start-8">
            <div>
              <dt className="text-ash">Role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
            <div>
              <dt className="text-ash">Year</dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-ash">Stack</dt>
              <dd className="mt-1">{project.technologies.join(", ")}</dd>
            </div>
            {(project.liveUrl || project.githubUrl) && (
              <div className="col-span-2 flex gap-6">
                {project.liveUrl && <ArrowLink href={project.liveUrl}>Visit live site</ArrowLink>}
                {project.githubUrl && <ArrowLink href={project.githubUrl}>View source</ArrowLink>}
              </div>
            )}
          </dl>
        </Fade>
      </div>

      <div className="shell mt-20 md:mt-28">
        <Fade y={40}>
          <div className="aspect-[4/3] w-full sm:aspect-[16/9]" aria-hidden={!project.image}>
            <ProjectMedia project={project} />
          </div>
        </Fade>
      </div>

      <div className="shell mt-28 space-y-24 md:mt-40 md:space-y-32">
        {[
          { h: "The problem", body: cs.problem },
          { h: "The approach", body: cs.approach },
        ].map((s) => (
          <section key={s.h} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-6">
            <h2 className="display text-[clamp(1.75rem,3.2vw,3rem)] [--wdth:110] md:col-span-4">{s.h}</h2>
            <Fade className="md:col-span-7 md:col-start-6">
              <p className="max-w-[62ch] text-xl leading-relaxed text-bone/85">{s.body}</p>
            </Fade>
          </section>
        ))}

        <section className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-6">
          <h2 className="display text-[clamp(1.75rem,3.2vw,3rem)] [--wdth:110] md:col-span-4">Engineering</h2>
          <ol className="md:col-span-7 md:col-start-6">
            {cs.highlights.map((h, i) => (
              <li key={h.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-rule py-8 last:border-b">
                <span className="font-mono text-xs text-ash tabular-nums">{pad(i + 1)}</span>
                <div>
                  <h3 className="text-xl font-medium">{h.title}</h3>
                  <p className="mt-3 max-w-[56ch] leading-relaxed text-ash">{h.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-x-6">
          <h2 className="display text-[clamp(1.75rem,3.2vw,3rem)] [--wdth:110] md:col-span-4">Where it stands</h2>
          <Fade className="md:col-span-7 md:col-start-6">
            <p className="max-w-[62ch] text-xl leading-relaxed text-bone/85">{cs.outcome}</p>
          </Fade>
        </section>
      </div>

      <Link
        href={`/work/${next.slug}`}
        data-cursor="view"
        data-cursor-label="Next"
        className="group mt-40 block border-t border-rule py-20 md:py-28"
      >
        <div className="shell">
          <p className="text-sm text-ash">Next project</p>
          <p className="display mt-6 text-[clamp(3rem,12vw,14rem)] text-smoke transition-[color,font-variation-settings] duration-700 ease-[var(--ease-out-expo)] [--wdth:80] group-hover:text-bone group-hover:[--wdth:120]">
            {next.title}
          </p>
        </div>
      </Link>
    </article>
  );
}
