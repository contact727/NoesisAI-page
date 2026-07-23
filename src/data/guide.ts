// =============================================================
//  NOESIS AI — Guide d'automatisation (ressource /guide-automatisation)
//  À partir d'un besoin exprimé + quelques questions, oriente vers
//  les bons outils et produit un plan d'action avec des prompts
//  prêts à copier.
//
//  Deux moteurs :
//   • IA (api/guide.ts, Claude) — plan sur-mesure, comme la référence.
//   • Repli déterministe (recommanderLocal) — si la clé API n'est pas
//     encore posée ou si l'appel échoue, la ressource reste utilisable.
// =============================================================

import { CONTACT_EMAIL } from "./content";
import { DIAGNOSTIC_ACCESS_KEY } from "./diagnostic";

/* -------------------------------------------------------------
 *  Endpoint IA
 * -----------------------------------------------------------*/

/** Fonction serverless du projet. Absente sous `vite dev` : en local,
 *  le plan est donc toujours généré par le repli déterministe. */
export const GUIDE_ENDPOINT = "/api/guide";

/* -------------------------------------------------------------
 *  Étape 1 — Le besoin
 * -----------------------------------------------------------*/

/** Cas d'usage proposés en un clic ; pré-remplissent le champ besoin. */
export const CAS_USAGE = [
  "Envoyer mes factures automatiquement",
  "Relancer les paiements en retard",
  "Trier et répondre à mes emails récurrents",
  "Générer des devis depuis un formulaire",
  "Planifier mes publications sur les réseaux",
  "Qualifier mes leads entrants",
  "Rappeler ou relancer mes rendez-vous",
  "Synchroniser mes outils entre eux",
];

/* -------------------------------------------------------------
 *  Étape 2 — Le contexte
 * -----------------------------------------------------------*/

export const OUTILS_ACTUELS = [
  "Make",
  "Zapier",
  "n8n",
  "Notion",
  "Airtable",
  "Google Workspace",
  "Microsoft 365",
  "Un CRM (HubSpot, Pipedrive…)",
  "Zapier / Make jamais utilisés",
  "Aucun, je débute",
];

export type Choix = { id: string; label: string; hint: string };

export const COMPETENCES: Choix[] = [
  {
    id: "debutant",
    label: "Débutant",
    hint: "Je veux du no-code simple, guidé",
  },
  {
    id: "intermediaire",
    label: "Intermédiaire",
    hint: "J'ai déjà bricolé une ou deux automatisations",
  },
  {
    id: "alaise",
    label: "À l'aise",
    hint: "Je code, ou j'ai un profil technique sous la main",
  },
];

export const VOLUMES: Choix[] = [
  { id: "faible", label: "Quelques fois par semaine", hint: "Volume ponctuel" },
  { id: "quotidien", label: "Tous les jours", hint: "Plusieurs fois par jour" },
  { id: "intense", label: "En continu", hint: "Des dizaines de fois par jour" },
];

export const BUDGETS = [
  "Gratuit / le moins cher possible",
  "Moins de 50 €/mois",
  "50 – 200 €/mois",
  "Plus de 200 €/mois",
  "Peu importe si le retour sur investissement est là",
];

/* -------------------------------------------------------------
 *  État du questionnaire
 * -----------------------------------------------------------*/

export type GuideState = {
  besoin: string;
  outils: string[];
  competence: string;
  volume: string;
  budget: string;
};

export const ETAT_INITIAL: GuideState = {
  besoin: "",
  outils: [],
  competence: "",
  volume: "",
  budget: "",
};

export type Contact = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  societe: string;
};

export const CONTACT_INITIAL: Contact = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  societe: "",
};

/* -------------------------------------------------------------
 *  Le plan produit (identique côté IA et côté repli)
 * -----------------------------------------------------------*/

export type Outil = { nom: string; role: string; pourquoi: string };
export type Etape = { titre: string; detail: string; declencheur: string };
export type Prompt = { titre: string; pour: string; contenu: string };

export type Plan = {
  titre: string;
  resume: string;
  difficulte: "Simple" | "Intermédiaire" | "Avancé";
  gainEstime: string;
  outils: Outil[];
  etapes: Etape[];
  integrations: string[];
  donnees: string[];
  prompts: Prompt[];
};

export type Source = "ia" | "local";

/* -------------------------------------------------------------
 *  Repli déterministe
 *  Un arbre de décision simple sélectionne l'outil pivot selon la
 *  compétence et les outils déjà en place, puis compose un plan
 *  générique mais actionnable, rattaché au besoin exprimé.
 * -----------------------------------------------------------*/

type FicheOutil = {
  nom: string;
  role: string;
  pourquoi: string;
  difficulte: Plan["difficulte"];
};

const PIVOTS: Record<string, FicheOutil> = {
  zapier: {
    nom: "Zapier",
    role: "Chef d'orchestre no-code",
    pourquoi:
      "Le plus simple pour démarrer : des milliers d'applications déjà connectées et une prise en main immédiate, sans logique complexe à écrire.",
    difficulte: "Simple",
  },
  make: {
    nom: "Make",
    role: "Chef d'orchestre visuel",
    pourquoi:
      "Le meilleur rapport puissance/prix pour des scénarios à plusieurs branches : on visualise le flux, on gère les conditions et les erreurs sans coder.",
    difficulte: "Intermédiaire",
  },
  n8n: {
    nom: "n8n",
    role: "Moteur d'automatisation avancé",
    pourquoi:
      "Le plus flexible et le plus économique à l'échelle : auto-hébergeable, extensible par du code quand il en faut, idéal dès que les volumes montent.",
    difficulte: "Avancé",
  },
};

/** Détecte un outil déjà maîtrisé pour le privilégier comme pivot. */
function pivotDepuisOutils(outils: string[]): FicheOutil | null {
  if (outils.includes("n8n")) return PIVOTS.n8n;
  if (outils.includes("Make")) return PIVOTS.make;
  if (outils.includes("Zapier")) return PIVOTS.zapier;
  return null;
}

function pivotDepuisCompetence(competence: string): FicheOutil {
  if (competence === "alaise") return PIVOTS.n8n;
  if (competence === "intermediaire") return PIVOTS.make;
  return PIVOTS.zapier;
}

/** Devine un « socle de données » utile selon le besoin. */
function socleDonnees(besoin: string, outils: string[]): FicheOutil | null {
  const b = besoin.toLowerCase();
  const veutSuivi =
    /lead|client|devis|facture|command|suivi|crm|contact|rendez|rdv/.test(b);
  if (!veutSuivi) return null;
  if (outils.includes("Airtable")) {
    return {
      nom: "Airtable",
      role: "Base de données centrale",
      pourquoi:
        "Sert de source de vérité : chaque élément suivi (lead, devis, commande) y vit, et l'automatisation lit et écrit dedans.",
      difficulte: "Simple",
    };
  }
  return {
    nom: outils.includes("Notion") ? "Notion" : "Airtable",
    role: "Base de données centrale",
    pourquoi:
      "Donne un point unique où l'automatisation enregistre et met à jour vos éléments, plutôt que de les éparpiller dans des emails et des tableurs.",
    difficulte: "Simple",
  };
}

function besoinCourt(besoin: string) {
  const t = besoin.trim().replace(/\s+/g, " ");
  return t.length > 90 ? `${t.slice(0, 87)}…` : t;
}

export function recommanderLocal(s: GuideState): Plan {
  const pivot = pivotDepuisOutils(s.outils) ?? pivotDepuisCompetence(s.competence);
  const socle = socleDonnees(s.besoin, s.outils);
  const besoin = s.besoin.trim() || "la tâche répétitive que vous avez décrite";

  const outils: Outil[] = [
    { nom: pivot.nom, role: pivot.role, pourquoi: pivot.pourquoi },
  ];
  if (socle && socle.nom !== pivot.nom) {
    outils.push({ nom: socle.nom, role: socle.role, pourquoi: socle.pourquoi });
  }
  outils.push({
    nom: "Un modèle d'IA (ChatGPT ou Claude)",
    role: "Cerveau de rédaction et de tri",
    pourquoi:
      "Pour tout ce qui demande de comprendre, rédiger ou classer du texte : messages, réponses, résumés, catégorisation.",
  });

  const etapes: Etape[] = [
    {
      titre: "Identifier le déclencheur",
      detail:
        "Déterminez l'événement qui doit lancer l'automatisation (un email reçu, un formulaire soumis, une ligne ajoutée, une heure de la journée).",
      declencheur: "Le point de départ, à connecter en premier dans " + pivot.nom,
    },
    {
      titre: "Connecter vos outils",
      detail:
        "Reliez dans " +
        pivot.nom +
        " les applications concernées, puis authentifiez chacune une seule fois.",
      declencheur: "Comptes connectés",
    },
    {
      titre: "Écrire la logique",
      detail:
        "Enchaînez les actions : récupérer la donnée, la transformer (au besoin avec l'IA), puis agir (envoyer, créer, notifier). Ajoutez les conditions qui reflètent vos règles métier.",
      declencheur: "Scénario complet",
    },
    {
      titre: "Tester sur des cas réels",
      detail:
        "Faites tourner le scénario sur quelques cas passés et vérifiez chaque sortie avant d'automatiser pour de bon.",
      declencheur: "Validation",
    },
    {
      titre: "Mettre en production et surveiller",
      detail:
        "Activez le déclenchement automatique, puis gardez un œil sur les premiers jours et ajoutez une alerte en cas d'erreur.",
      declencheur: "En ligne",
    },
  ];

  const integrations = Array.from(
    new Set(
      [
        pivot.nom,
        socle?.nom,
        "Votre messagerie (Gmail / Outlook)",
        s.outils.find((o) => o.startsWith("Un CRM")) ? "Votre CRM" : null,
      ].filter(Boolean) as string[]
    )
  );

  const donnees = [
    "Les informations d'entrée liées à « " + besoinCourt(besoin) + " »",
    "Vos règles métier (qui, quand, quel message)",
    "Un modèle de sortie (email type, format de document, champ à remplir)",
  ];

  const prompts: Prompt[] = [
    {
      titre: "Cadrer l'automatisation",
      pour: "ChatGPT ou Claude",
      contenu:
        "Tu es expert en automatisation no-code. Je veux automatiser : « " +
        besoin +
        " ». Mes outils actuels : " +
        (s.outils.join(", ") || "aucun") +
        ". Mon niveau : " +
        (COMPETENCES.find((c) => c.id === s.competence)?.label ?? "débutant") +
        ". Propose-moi le scénario " +
        pivot.nom +
        " étape par étape (déclencheur, modules, données, conditions), puis liste les pièges à éviter.",
    },
    {
      titre: "Rédiger le message automatique",
      pour: "ChatGPT ou Claude",
      contenu:
        "Rédige le message que mon automatisation enverra dans le cadre de « " +
        besoin +
        " ». Ton : professionnel et chaleureux. Fournis une version courte et une version de relance, avec les variables à insérer entre accolades (ex. {prenom}, {montant}).",
    },
  ];

  return {
    titre: "Automatiser : " + besoinCourt(besoin),
    resume:
      "Un scénario " +
      pivot.nom +
      " orchestre le déclencheur, la logique et l'action, avec un modèle d'IA pour la partie rédaction ou tri.",
    difficulte: pivot.difficulte,
    gainEstime: "2 à 5 h par semaine selon le volume",
    outils,
    etapes,
    integrations,
    donnees,
    prompts,
  };
}

/* -------------------------------------------------------------
 *  Génération du plan
 * -----------------------------------------------------------*/

export async function genererPlan(
  s: GuideState
): Promise<{ plan: Plan; source: Source }> {
  try {
    const reponse = await fetch(GUIDE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        besoin: s.besoin,
        outils: s.outils,
        competence: COMPETENCES.find((c) => c.id === s.competence)?.label ?? "",
        volume: VOLUMES.find((v) => v.id === s.volume)?.label ?? "",
        budget: s.budget,
      }),
    });
    if (!reponse.ok) throw new Error(`IA indisponible (${reponse.status})`);
    const data = (await reponse.json()) as { plan?: Plan };
    if (!data.plan || !Array.isArray(data.plan.etapes)) {
      throw new Error("Réponse IA invalide");
    }
    return { plan: data.plan, source: "ia" };
  } catch {
    // Repli : la ressource reste utile même sans clé API configurée.
    return { plan: recommanderLocal(s), source: "local" };
  }
}

/* -------------------------------------------------------------
 *  Envoi du lead (réutilise le compte Web3Forms du diagnostic)
 * -----------------------------------------------------------*/

export type ModeLead = "web3forms" | "mailto";

export async function envoyerLead(
  s: GuideState,
  c: Contact
): Promise<ModeLead> {
  const recap = [
    "=== NOUVEAU LEAD — GUIDE AUTOMATISATION ===",
    "",
    `Prénom / Nom : ${c.prenom} ${c.nom}`,
    `Email : ${c.email}`,
    `Téléphone : ${c.telephone}`,
    `Société : ${c.societe || "non renseignée"}`,
    "",
    "--- SA DEMANDE ---",
    `Besoin : ${s.besoin}`,
    `Outils actuels : ${s.outils.join(", ") || "aucun"}`,
    `Niveau : ${COMPETENCES.find((x) => x.id === s.competence)?.label ?? "-"}`,
    `Fréquence : ${VOLUMES.find((x) => x.id === s.volume)?.label ?? "-"}`,
    `Budget : ${s.budget || "-"}`,
  ].join("\n");

  if (!DIAGNOSTIC_ACCESS_KEY) {
    const sujet = encodeURIComponent(
      `Guide automatisation — ${c.societe || `${c.prenom} ${c.nom}`}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${sujet}&body=${encodeURIComponent(
      recap
    )}`;
    return "mailto";
  }

  await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: DIAGNOSTIC_ACCESS_KEY,
      subject: `Guide automatisation — ${c.societe || `${c.prenom} ${c.nom}`}`,
      from_name: "Guide automatisation · noesisai.fr",
      email: c.email,
      message: recap,
      prenom: c.prenom,
      nom: c.nom,
      telephone: c.telephone,
      societe: c.societe,
      besoin: s.besoin,
      outils: s.outils.join(", ") || "aucun",
      niveau: COMPETENCES.find((x) => x.id === s.competence)?.label ?? "",
      budget: s.budget || "non renseigné",
    }),
  }).catch(() => {
    // Le lead ne doit pas bloquer l'affichage du plan : on avale l'erreur.
  });

  return "web3forms";
}
