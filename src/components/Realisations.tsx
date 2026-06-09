import { Section, SectionHeading, Reveal } from "./ui/Section";
import { REALISATIONS } from "../data/content";

export function Realisations() {
  return (
    <Section id="realisations" className="bg-white/[0.02]">
      <SectionHeading
        badge={REALISATIONS.badge}
        title={REALISATIONS.title}
        subtitle={REALISATIONS.subtitle}
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {REALISATIONS.cases.map((c, i) => (
          <Reveal key={c.client} delay={(i % 2) * 0.08}>
            <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-night-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-night-700 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{c.client}</h3>
                  <p className="mt-1 text-sm text-slate-400">{c.sector}</p>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                  {c.country}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-300">{c.summary}</p>

              <ul className="mt-5 flex flex-col gap-2">
                {c.results.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-sm text-slate-200">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-gradient text-[0.65rem] text-white">
                      ✓
                    </span>
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
