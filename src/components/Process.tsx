import { Section, SectionHeading, Reveal } from "./ui/Section";
import { PROCESS } from "../data/content";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading badge={PROCESS.badge} title={PROCESS.title} subtitle={PROCESS.subtitle} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.steps.map((s, i) => (
          <Reveal key={s.n} delay={(i % 4) * 0.08}>
            <div className="relative h-full rounded-3xl border border-white/10 bg-night-card p-7">
              <span className="font-display text-4xl font-extrabold text-gradient">{s.n}</span>
              <h3 className="mt-3 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
