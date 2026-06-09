import { Section, SectionHeading, Reveal } from "./ui/Section";
import { Card } from "./ui/Card";
import { SOLUTIONS } from "../data/content";

export function Solutions() {
  return (
    <Section id="solutions">
      <SectionHeading badge={SOLUTIONS.badge} title={SOLUTIONS.title} subtitle={SOLUTIONS.subtitle} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.items.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <Card className="h-full">
              <div className="mb-4 h-9 w-9 rounded-xl bg-brand-gradient" />
              <h3 className="text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
