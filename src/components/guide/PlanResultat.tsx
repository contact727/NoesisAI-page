// Affichage du plan d'automatisation généré : outils recommandés,
// étapes, intégrations, données et prompts prêts à copier.

import { useState } from "react";
import { motion } from "framer-motion";
import { ICLOSED_URL } from "../../data/content";
import type { Contact, Plan, Source } from "../../data/guide";

/* ---------------------------------------------------------------
 *  Bouton « copier » pour les prompts
 * -------------------------------------------------------------*/

function BoutonCopier({ texte }: { texte: string }) {
  const [copie, setCopie] = useState(false);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(texte);
    } catch {
      // Repli si l'API clipboard est bloquée (http, permissions).
      const zone = document.createElement("textarea");
      zone.value = texte;
      zone.style.position = "fixed";
      zone.style.opacity = "0";
      document.body.appendChild(zone);
      zone.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(zone);
    }
    setCopie(true);
    window.setTimeout(() => setCopie(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copier}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10"
    >
      {copie ? "✓ Copié" : "Copier"}
    </button>
  );
}

/* ---------------------------------------------------------------
 *  Puce de difficulté
 * -------------------------------------------------------------*/

function Difficulte({ niveau }: { niveau: Plan["difficulte"] }) {
  const couleur =
    niveau === "Simple"
      ? "text-emerald-300 border-emerald-400/30 bg-emerald-400/10"
      : niveau === "Intermédiaire"
        ? "text-amber-300 border-amber-400/30 bg-amber-400/10"
        : "text-rose-300 border-rose-400/30 bg-rose-400/10";
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${couleur}`}>
      {niveau}
    </span>
  );
}

/* ---------------------------------------------------------------
 *  Écran complet
 * -------------------------------------------------------------*/

export function PlanResultat({
  plan,
  contact,
  source,
}: {
  plan: Plan;
  contact: Contact;
  source: Source;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* En-tête */}
      <div className="rounded-3xl border border-white/10 bg-night-card p-7 sm:p-9">
        <p className="text-sm font-medium text-slate-400">
          {contact.prenom}, voici votre plan
        </p>
        <h2 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-[2rem]">
          {plan.titre}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {plan.resume}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Difficulte niveau={plan.difficulte} />
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            Gain estimé : {plan.gainEstime}
          </span>
        </div>
      </div>

      {/* Outils recommandés */}
      <div className="mt-10">
        <h3 className="text-xl font-extrabold text-white sm:text-2xl">
          Vos outils recommandés
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {plan.outils.map((o, i) => (
            <motion.div
              key={o.nom + i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-night-card p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-base font-bold text-white">{o.nom}</h4>
                <span className="shrink-0 text-xs font-medium text-gradient">{o.role}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{o.pourquoi}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Étapes */}
      <div className="mt-10">
        <h3 className="text-xl font-extrabold text-white sm:text-2xl">
          Le plan, étape par étape
        </h3>
        <div className="mt-5 flex flex-col gap-3">
          {plan.etapes.map((e, i) => (
            <motion.div
              key={e.titre + i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="flex gap-4 rounded-2xl border border-white/10 bg-night-card p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white">{e.titre}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{e.detail}</p>
                {e.declencheur && (
                  <p className="mt-2 text-xs font-medium text-slate-500">→ {e.declencheur}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Intégrations & données */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-night-card p-5">
          <h3 className="text-sm font-bold text-white">À connecter</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {plan.integrations.map((x, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1 text-white/40">→</span> {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-night-card p-5">
          <h3 className="text-sm font-bold text-white">Données à préparer</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {plan.donnees.map((x, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-1 text-white/40">→</span> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prompts prêts à copier */}
      <div className="mt-10">
        <h3 className="text-xl font-extrabold text-white sm:text-2xl">
          Vos prompts prêts à l'emploi
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          À copier-coller dans ChatGPT ou Claude pour construire et faire tourner votre
          automatisation.
        </p>
        <div className="mt-5 flex flex-col gap-4">
          {plan.prompts.map((p, i) => (
            <div
              key={p.titre + i}
              className="rounded-2xl border border-white/10 bg-night-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white">{p.titre}</h4>
                  <p className="mt-0.5 text-xs text-slate-500">Pour {p.pour}</p>
                </div>
                <BoutonCopier texte={p.contenu} />
              </div>
              <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl border border-white/5 bg-black/30 p-4 font-sans text-sm leading-relaxed text-slate-300">
                {p.contenu}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Prise de rendez-vous */}
      <div className="mt-12 overflow-hidden rounded-4xl border border-brand-500/30 bg-gradient-to-br from-brand-800/50 via-night-card to-night px-7 py-10 shadow-[0_24px_60px_-24px_rgba(124,58,237,0.5)] sm:px-10 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Vous voulez qu'on la mette en place pour vous ?
          </h3>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            En 30 minutes, on valide ensemble le bon outil et on vous dit exactement comment
            construire cette automatisation — ou on la construit pour vous, clé en main.
          </p>
          <a
            href={ICLOSED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-medium text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
          >
            Réserver un échange de 30 min
            <span aria-hidden className="-mr-0.5 translate-y-px text-[0.95em] opacity-80">
              ››
            </span>
          </a>
          <p className="mt-4 text-xs text-white/50">Sans engagement · En visio</p>
        </div>
      </div>

      {/* Note de méthode */}
      <p className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-xs leading-relaxed text-slate-400">
        {source === "ia"
          ? "Plan généré sur-mesure à partir de votre besoin. C'est un point de départ fiable ; les détails exacts dépendent de vos outils et de vos règles métier."
          : "Plan-cadre établi à partir de votre besoin. Pour une version entièrement personnalisée et une mise en place accompagnée, réservez un échange ci-dessus."}
      </p>
    </motion.div>
  );
}
