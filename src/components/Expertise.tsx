import { Section, SectionHeading, Reveal } from "./ui/Section";
import { EXPERTISE } from "../data/content";

export function Expertise() {
  return (
    <Section id="expertises">
      <SectionHeading badge={EXPERTISE.badge} title={EXPERTISE.title} subtitle={EXPERTISE.subtitle} />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {EXPERTISE.categories.map((cat, ci) => (
          <Reveal key={cat.label} delay={ci * 0.1}>
            <div className="h-full rounded-3xl border border-white/10 bg-night-card p-7 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-8 w-1.5 rounded-full bg-brand-gradient" />
                <h3 className="text-xl font-bold text-white">{cat.label}</h3>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {cat.items.map((it) => (
                  <li
                    key={it.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-brand-500/40 hover:bg-brand-500/10"
                  >
                    <h4 className="text-sm font-semibold text-white">{it.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
