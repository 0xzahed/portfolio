import { person, socials } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-12 text-sm md:grid-cols-12">
        <div className="col-span-2 md:col-span-4">
          <p className="display text-2xl [--wdth:112]">
            {person.name}
            <span className="text-signal">.</span>
          </p>
          <p className="mt-2 text-ash">
            {person.role}, {person.location}
          </p>
        </div>
        <div className="md:col-span-2 md:col-start-6">
          <p className="text-ash">Elsewhere</p>
          <ul className="mt-2 space-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-ash">Email</p>
          <a href={`mailto:${person.email}`} className="link-line mt-2 inline-block">
            {person.email}
          </a>
        </div>
        <div className="col-span-2 flex flex-col justify-between gap-2 text-ash md:col-span-2 md:text-right">
          <p>© {year} {person.name}</p>
          <p className="text-smoke">Designed &amp; engineered with curiosity.</p>
        </div>
      </div>
    </footer>
  );
}
