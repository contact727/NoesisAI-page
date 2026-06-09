import { useMemo, useState } from "react";
import { Section, SectionHeading } from "./ui/Section";
import { Button, Chevrons } from "./ui/Button";
import { ICLOSED_URL, ROI } from "../data/content";

function euro(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

type FieldProps = {
  label: string;
  suffix?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
};

function SliderField({ label, suffix, value, min, max, step, onChange }: FieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <span className="text-sm font-bold text-white">
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-500"
      />
    </div>
  );
}

export function MissedCallsRoi() {
  const [appels, setAppels] = useState(ROI.defaults.appelsManquesParMois);
  const [panier, setPanier] = useState(ROI.defaults.panierMoyen);
  const [taux, setTaux] = useState(ROI.defaults.tauxConversion);

  const { mensuel, annuel } = useMemo(() => {
    const m = appels * (taux / 100) * panier;
    return { mensuel: m, annuel: m * 12 };
  }, [appels, panier, taux]);

  return (
    <Section id="roi">
      <SectionHeading badge={ROI.badge} title={ROI.title} subtitle={ROI.subtitle} />

      <div className="mx-auto mt-14 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="rounded-3xl border border-white/10 bg-night-card p-7 sm:p-8">
          <div className="flex flex-col gap-7">
            <SliderField
              label="Appels manqués par mois"
              value={appels}
              min={5}
              max={300}
              step={5}
              onChange={setAppels}
            />
            <SliderField
              label="Panier moyen"
              suffix="€"
              value={panier}
              min={50}
              max={5000}
              step={50}
              onChange={setPanier}
            />
            <SliderField
              label="Taux de conversion d'un appel en vente"
              suffix="%"
              value={taux}
              min={5}
              max={80}
              step={5}
              onChange={setTaux}
            />
          </div>
        </div>

        {/* Résultat */}
        <div className="flex flex-col justify-between rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-800/40 via-night-card to-night p-7 text-white shadow-[0_24px_60px_-24px_rgba(124,58,237,0.5)] sm:p-8">
          <div>
            <p className="text-sm font-medium text-white/60">
              Chiffre d'affaires potentiellement perdu
            </p>
            <div className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">
              {euro(mensuel)}
            </div>
            <p className="mt-1 text-sm text-white/50">par mois</p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/60">soit sur un an</p>
              <div className="text-2xl font-bold">{euro(annuel)}</div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Un agent vocal IA décroche 24/7 et récupère ces appels — même le soir, le week-end ou
              quand vos équipes sont sur le terrain.
            </p>
          </div>
          <Button href={ICLOSED_URL} external variant="secondary" className="mt-7 w-full">
            {ROI.cta} <Chevrons />
          </Button>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-slate-400">
        Estimation indicative basée sur vos hypothèses. Les résultats réels dépendent de votre
        activité.
      </p>
    </Section>
  );
}
