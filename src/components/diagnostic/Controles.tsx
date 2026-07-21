// Contrôles réutilisables du questionnaire de diagnostic.
// Ils reprennent le vocabulaire visuel du site (cartes sombres,
// bordures blanches translucides, accent dégradé bleu → magenta).

import { cn } from "../ui/cn";

/* ---------------------------------------------------------------
 *  Barre de progression
 * -------------------------------------------------------------*/

export function Progression({
  etape,
  total,
  titres,
}: {
  etape: number;
  total: number;
  titres: string[];
}) {
  const pct = ((etape + 1) / total) * 100;
  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-medium text-white">
          <span className="text-gradient font-bold">{titres[etape]}</span>
        </p>
        <p className="shrink-0 text-xs font-medium text-slate-400">
          Étape {etape + 1} sur {total}
        </p>
      </div>
      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={etape + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Progression du diagnostic"
      >
        <div
          className="h-full rounded-full bg-brand-gradient transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
 *  En-tête d'étape
 * -------------------------------------------------------------*/

export function EnteteEtape({
  titre,
  sousTitre,
}: {
  titre: string;
  sousTitre: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">{titre}</h2>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">{sousTitre}</p>
    </div>
  );
}

/* ---------------------------------------------------------------
 *  Champs de saisie
 * -------------------------------------------------------------*/

const champBase =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-brand-500/60 focus:bg-white/10 focus:outline-none";

export function Champ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  requis,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  requis?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {requis && <span className="ml-1 text-brand-400">*</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={champBase}
      />
    </label>
  );
}

export function Liste({
  label,
  value,
  onChange,
  options,
  placeholder,
  requis,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  requis?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {requis && <span className="ml-1 text-brand-400">*</span>}
      </span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={champBase}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------------------------------------------------------------
 *  Compteur (− valeur +) — pour les effectifs
 * -------------------------------------------------------------*/

export function Compteur({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
  suffixe,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  suffixe?: string;
}) {
  const borne = (v: number) => Math.min(max, Math.max(min, v));
  const bouton =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10 disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-white/5";

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={bouton}
          onClick={() => onChange(borne(value - 1))}
          disabled={value <= min}
          aria-label={`Diminuer : ${label}`}
        >
          −
        </button>
        <input
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(borne(Number(e.target.value) || 0))}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center text-base font-bold text-white focus:border-brand-500/60 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          className={bouton}
          onClick={() => onChange(borne(value + 1))}
          disabled={value >= max}
          aria-label={`Augmenter : ${label}`}
        >
          +
        </button>
      </div>
      {suffixe && <p className="mt-1.5 text-xs text-slate-500">{suffixe}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------
 *  Curseur
 * -------------------------------------------------------------*/

export function Curseur({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffixe,
  aide,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffixe?: string;
  aide?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className="shrink-0 text-sm font-bold text-white">
          {value}
          {suffixe ? ` ${suffixe}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-500"
      />
      {aide && <p className="mt-2 text-xs leading-relaxed text-slate-500">{aide}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------
 *  Carte sélectionnable (choix unique ou multiple)
 * -------------------------------------------------------------*/

export function CarteChoix({
  titre,
  hint,
  actif,
  onClick,
  children,
}: {
  titre: string;
  hint?: string;
  actif: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all duration-200",
        actif
          ? "border-brand-500/50 bg-brand-800/20 shadow-[0_12px_32px_-16px_rgba(124,58,237,0.6)]"
          : "border-white/10 bg-night-card hover:border-white/25 hover:bg-white/5"
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-pressed={actif}
        className="flex w-full items-start gap-3 text-left"
      >
        <span
          aria-hidden
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold transition-colors",
            actif
              ? "border-transparent bg-brand-gradient text-white"
              : "border-white/25 text-transparent"
          )}
        >
          ✓
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-white">{titre}</span>
          {hint && <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{hint}</span>}
        </span>
      </button>
      {actif && children && <div className="mt-4 border-t border-white/10 pt-4">{children}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------
 *  Navigation bas de page
 * -------------------------------------------------------------*/

export function Navigation({
  onPrecedent,
  onSuivant,
  libelleSuivant = "Continuer",
  precedentVisible = true,
  desactive,
  chargement,
}: {
  onPrecedent: () => void;
  onSuivant: () => void;
  libelleSuivant?: string;
  precedentVisible?: boolean;
  desactive?: boolean;
  chargement?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {precedentVisible ? (
        <button
          type="button"
          onClick={onPrecedent}
          className="rounded-full px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          ← Retour
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onSuivant}
        disabled={desactive || chargement}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-base font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:pointer-events-none disabled:opacity-40"
      >
        {chargement ? "Calcul en cours…" : libelleSuivant}
        {!chargement && (
          <span aria-hidden className="-mr-0.5 translate-y-px text-[0.95em] opacity-80">
            ››
          </span>
        )}
      </button>
    </div>
  );
}
