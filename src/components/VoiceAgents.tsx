import { Section, SectionHeading, Reveal } from "./ui/Section";
import { Button, Chevrons } from "./ui/Button";
import { ICLOSED_URL, VOICE_AGENTS } from "../data/content";

export function VoiceAgents() {
  const v = VOICE_AGENTS;
  return (
    <Section id="agents-vocaux">
      <SectionHeading badge={v.badge} title={v.title} subtitle={v.subtitle} />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
        {/* Capacités */}
        <Reveal className="rounded-3xl border border-white/10 bg-night-card p-7 sm:p-9">
          <h3 className="text-xl font-bold text-white">Ce que fait votre agent vocal</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {v.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs text-white">
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-slate-300">{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Cas concret mis en avant */}
        <Reveal
          delay={0.1}
          className="flex flex-col justify-between rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-800/40 via-night-card to-night p-7 text-white shadow-[0_24px_60px_-24px_rgba(124,58,237,0.5)] sm:p-9"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-brand-400 to-brand-500" />
              Cas concret
            </span>
            <h3 className="mt-5 text-2xl font-bold">{v.highlight.client}</h3>
            <p className="mt-1 text-sm text-white/50">{v.highlight.sector}</p>
            <p className="mt-5 text-base leading-relaxed text-white/80">“{v.highlight.quote}”</p>
          </div>
          <div className="mt-7">
            <div className="flex flex-wrap gap-2">
              {v.highlight.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {s}
                </span>
              ))}
            </div>
            <Button href={ICLOSED_URL} external variant="secondary" className="mt-7">
              Déployer mon agent vocal <Chevrons />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
