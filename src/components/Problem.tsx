import { Section, SectionHeading, Reveal } from "./ui/Section";
import { Card } from "./ui/Card";
import { PROBLEM } from "../data/content";

export function Problem() {
  return (
    <Section id="probleme" className="bg-white/[0.02]">
      <SectionHeading badge={PROBLEM.badge} title={PROBLEM.title} subtitle={PROBLEM.subtitle} />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PROBLEM.pains.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <Card className="h-full">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/15 text-lg font-bold text-brand-300">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
