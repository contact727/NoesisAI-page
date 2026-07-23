// =============================================================
//  Ressource cloisonnée — /guide-automatisation
//  Page autonome (ni Navbar ni Footer du site), non liée depuis le
//  site, exclue de l'indexation. À partir d'un besoin exprimé, elle
//  oriente vers les bons outils et génère un plan d'action.
// =============================================================

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BUDGETS,
  CAS_USAGE,
  COMPETENCES,
  CONTACT_INITIAL,
  ETAT_INITIAL,
  OUTILS_ACTUELS,
  VOLUMES,
  envoyerLead,
  genererPlan,
  type Contact,
  type GuideState,
  type Plan,
  type Source,
} from "../data/guide";
import { CONTACT_EMAIL } from "../data/content";
import {
  CarteChoix,
  Champ,
  EnteteEtape,
  Liste,
  Navigation,
  Progression,
} from "../components/diagnostic/Controles";
import { PlanResultat } from "../components/guide/PlanResultat";

const TITRES = ["Votre besoin", "Votre contexte", "Vos coordonnées", "Votre plan"];

export function GuideAutomatisation() {
  // -1 = accueil · 0…2 = étapes · 3 = résultat
  const [etape, setEtape] = useState(-1);
  const [etat, setEtat] = useState<GuideState>(ETAT_INITIAL);
  const [contact, setContact] = useState<Contact>(CONTACT_INITIAL);
  const [consent, setConsent] = useState(false);
  const [generation, setGeneration] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [source, setSource] = useState<Source>("local");

  /* --- Cloisonnement : hors index même si le lien fuite --- */
  useEffect(() => {
    const titrePrecedent = document.title;
    document.title = "Guide d'automatisation — NOESIS.AI";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow, noarchive";
    document.head.appendChild(robots);
    return () => {
      document.title = titrePrecedent;
      document.head.removeChild(robots);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [etape]);

  const maj = <K extends keyof GuideState>(cle: K, valeur: GuideState[K]) =>
    setEtat((e) => ({ ...e, [cle]: valeur }));

  const basculerOutil = (outil: string) =>
    setEtat((e) => ({
      ...e,
      outils: e.outils.includes(outil)
        ? e.outils.filter((o) => o !== outil)
        : [...e.outils, outil],
    }));

  const valide = (() => {
    switch (etape) {
      case 0:
        return etat.besoin.trim().length >= 10;
      case 1:
        return etat.competence !== "" && etat.volume !== "";
      case 2:
        return (
          contact.prenom.trim().length >= 2 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) &&
          contact.telephone.trim().length >= 8 &&
          consent
        );
      default:
        return true;
    }
  })();

  const suivant = () => {
    if (valide) setEtape((e) => e + 1);
  };

  const soumettre = async () => {
    if (!valide || generation) return;
    setGeneration(true);
    // Le plan et le lead partent en parallèle ; l'un ne bloque pas l'autre.
    const [resultat] = await Promise.all([
      genererPlan(etat),
      envoyerLead(etat, contact).catch(() => "web3forms" as const),
    ]);
    setPlan(resultat.plan);
    setSource(resultat.source);
    setGeneration(false);
    setEtape(3);
  };

  const champ =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-brand-500/60 focus:bg-white/10 focus:outline-none";

  const nombreMots = useMemo(
    () => etat.besoin.trim().split(/\s+/).filter(Boolean).length,
    [etat.besoin]
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <img src="/logos/noesis-mark.png" alt="" className="h-8 w-8" />
            <span className="font-display text-base font-bold tracking-tight text-white">
              NOESIS<span className="text-gradient">.AI</span>
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">Guide gratuit</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        {/* ---------------- Accueil ---------------- */}
        {etape === -1 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
              Guide gratuit · 2 minutes
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Quelle tâche voulez-vous <span className="text-gradient">automatiser</span> ?
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Décrivez un besoin en une phrase, répondez à deux ou trois questions, et repartez
              avec le bon outil, un plan d'action clair et des prompts prêts à copier dans ChatGPT
              ou Claude.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { titre: "Le bon outil", texte: "Make, Zapier, n8n… celui qui colle à votre niveau et votre budget." },
                { titre: "Un plan d'action", texte: "Le scénario étape par étape : déclencheur, logique, intégrations." },
                { titre: "Des prompts prêts", texte: "À copier-coller pour construire et faire tourner l'automatisation." },
              ].map((c) => (
                <div key={c.titre} className="rounded-2xl border border-white/10 bg-night-card p-5">
                  <h2 className="text-sm font-bold text-white">{c.titre}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{c.texte}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => setEtape(0)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-4 text-base font-medium text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
              >
                Trouver mon automatisation
                <span aria-hidden className="-mr-0.5 translate-y-px text-[0.95em] opacity-80">
                  ››
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ---------------- Questionnaire ---------------- */}
        {etape >= 0 && etape <= 2 && (
          <div>
            <Progression etape={etape} total={4} titres={TITRES} />

            <motion.div
              key={etape}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Étape 1 — Besoin */}
              {etape === 0 && (
                <>
                  <EnteteEtape
                    titre="Que voulez-vous automatiser ?"
                    sousTitre="Décrivez la tâche répétitive en une ou deux phrases, comme vous l'expliqueriez à un collègue. Plus c'est concret, meilleur sera le plan."
                  />
                  <div>
                    <textarea
                      className={champ}
                      rows={4}
                      placeholder="Ex. Quand je reçois un formulaire de contact, je veux créer le devis, l'envoyer par email et l'enregistrer dans mon tableau de suivi."
                      value={etat.besoin}
                      onChange={(e) => maj("besoin", e.target.value)}
                    />
                    <p className="mt-2 text-right text-xs text-slate-500">
                      {nombreMots < 4 ? "Un peu plus de détail aide beaucoup" : `${nombreMots} mots`}
                    </p>

                    <p className="mt-6 mb-3 text-sm font-medium text-slate-300">
                      Ou partez d'un exemple :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CAS_USAGE.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => maj("besoin", c)}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Étape 2 — Contexte */}
              {etape === 1 && (
                <>
                  <EnteteEtape
                    titre="Parlez-nous de votre contexte"
                    sousTitre="Ces réponses déterminent l'outil recommandé : un débutant sans budget et un profil technique n'ont pas la même solution idéale."
                  />
                  <div className="flex flex-col gap-8">
                    <div>
                      <h3 className="mb-3 text-sm font-semibold text-white">
                        Vos outils actuels{" "}
                        <span className="font-normal text-slate-500">(optionnel)</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {OUTILS_ACTUELS.map((o) => {
                          const actif = etat.outils.includes(o);
                          return (
                            <button
                              key={o}
                              type="button"
                              onClick={() => basculerOutil(o)}
                              aria-pressed={actif}
                              className={
                                actif
                                  ? "rounded-full border border-brand-500/50 bg-brand-800/30 px-4 py-2 text-xs font-medium text-white transition-colors"
                                  : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                              }
                            >
                              {o}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-semibold text-white">
                        Votre niveau technique
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {COMPETENCES.map((c) => (
                          <CarteChoix
                            key={c.id}
                            titre={c.label}
                            hint={c.hint}
                            actif={etat.competence === c.id}
                            onClick={() => maj("competence", c.id)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-semibold text-white">
                        À quelle fréquence ?
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {VOLUMES.map((v) => (
                          <CarteChoix
                            key={v.id}
                            titre={v.label}
                            hint={v.hint}
                            actif={etat.volume === v.id}
                            onClick={() => maj("volume", v.id)}
                          />
                        ))}
                      </div>
                    </div>

                    <Liste
                      label="Votre budget mensuel (optionnel)"
                      value={etat.budget}
                      onChange={(v) => maj("budget", v)}
                      options={BUDGETS}
                      placeholder="Sélectionnez une fourchette"
                    />
                  </div>
                </>
              )}

              {/* Étape 3 — Coordonnées */}
              {etape === 2 && (
                <>
                  <EnteteEtape
                    titre="Où envoyons-nous votre plan ?"
                    sousTitre="Votre plan s'affiche immédiatement après validation. Vos coordonnées nous permettent de vous l'envoyer et, si vous le souhaitez, d'en discuter."
                  />
                  <div className="rounded-3xl border border-white/10 bg-night-card p-6 sm:p-7">
                    <div className="flex flex-col gap-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Champ
                          label="Prénom"
                          value={contact.prenom}
                          onChange={(v) => setContact((c) => ({ ...c, prenom: v }))}
                          placeholder="Ugo"
                          requis
                          autoComplete="given-name"
                        />
                        <Champ
                          label="Nom"
                          value={contact.nom}
                          onChange={(v) => setContact((c) => ({ ...c, nom: v }))}
                          placeholder="Sartini"
                          autoComplete="family-name"
                        />
                      </div>
                      <Champ
                        label="Email professionnel"
                        type="email"
                        value={contact.email}
                        onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                        placeholder="vous@votresociete.fr"
                        requis
                        autoComplete="email"
                      />
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Champ
                          label="Téléphone"
                          type="tel"
                          value={contact.telephone}
                          onChange={(v) => setContact((c) => ({ ...c, telephone: v }))}
                          placeholder="06 12 34 56 78"
                          requis
                          autoComplete="tel"
                        />
                        <Champ
                          label="Société (optionnel)"
                          value={contact.societe}
                          onChange={(v) => setContact((c) => ({ ...c, societe: v }))}
                          placeholder="Nom de votre société"
                          autoComplete="organization"
                        />
                      </div>

                      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-400">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-brand-500"
                        />
                        <span>
                          J'accepte que NOESIS.AI me contacte au sujet de ce guide. Mes données sont
                          traitées conformément au RGPD et ne sont ni revendues ni cédées. Je peux
                          demander leur suppression à{" "}
                          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-400 underline">
                            {CONTACT_EMAIL}
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            <Navigation
              onPrecedent={() => setEtape((e) => e - 1)}
              onSuivant={etape === 2 ? soumettre : suivant}
              libelleSuivant={etape === 2 ? "Générer mon plan" : "Continuer"}
              desactive={!valide}
              chargement={generation}
            />

            {!valide && (
              <p className="mt-3 text-right text-xs text-slate-500">
                {etape === 0
                  ? "Décrivez votre besoin en une phrase pour continuer."
                  : etape === 1
                    ? "Indiquez votre niveau et la fréquence pour continuer."
                    : "Renseignez prénom, email, téléphone et acceptez les conditions."}
              </p>
            )}

            {generation && (
              <p className="mt-4 text-center text-sm text-slate-400">
                Analyse de votre besoin et construction du plan sur-mesure…
              </p>
            )}
          </div>
        )}

        {/* ---------------- Résultat ---------------- */}
        {etape === 3 && plan && (
          <>
            <PlanResultat plan={plan} contact={contact} source={source} />
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setEtat(ETAT_INITIAL);
                  setContact(CONTACT_INITIAL);
                  setConsent(false);
                  setPlan(null);
                  setEtape(-1);
                }}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                Automatiser autre chose
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} NOESIS.AI · {CONTACT_EMAIL}
          </p>
        </div>
      </footer>
    </div>
  );
}
