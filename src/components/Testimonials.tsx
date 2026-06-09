import { Section, SectionHeading, Reveal } from "./ui/Section";
import { TESTIMONIALS } from "../data/content";

export function Testimonials() {
  return (
    <Section id="avis" className="bg-white/[0.02]">
      <SectionHeading
        badge={TESTIMONIALS.badge}
        title={TESTIMONIALS.title}
        subtitle={TESTIMONIALS.subtitle}
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {TESTIMONIALS.items.map((t, i) => (
          <Reveal key={t.company} delay={(i % 2) * 0.08}>
            <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-night-card p-7 sm:p-8">
              <div className="text-lg text-brand-400" aria-hidden>
                ★★★★★
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-200">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                  {t.company.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{t.author}</span>
                  <span className="block text-xs text-slate-400">{t.company}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
