// =============================================================
//  Fonction serverless — génération d'un plan d'automatisation
//  À partir d'un besoin + contexte, appelle Claude (Opus 4.8) et
//  renvoie un plan structuré : outils, étapes, intégrations,
//  données et prompts prêts à copier.
//
//  La clé API reste côté serveur (variable d'environnement Vercel
//  ANTHROPIC_API_KEY), jamais exposée au navigateur.
//
//  Appel via l'API Messages en HTTP direct, comme api/diagnostic.ts —
//  une seule requête, pas de dépendance ajoutée au projet.
// =============================================================

/** Évite d'ajouter @types/node au projet pour la lecture d'env. */
declare const process: { env: Record<string, string | undefined> };

const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-opus-4-8";

/* -------------------------------------------------------------
 *  Schéma de sortie (structured outputs)
 *  Contraintes : additionalProperties:false partout, tout requis,
 *  pas de minLength/maximum/récursion.
 * -----------------------------------------------------------*/

const PLAN_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    titre: { type: "string" },
    resume: { type: "string" },
    difficulte: { type: "string", enum: ["Simple", "Intermédiaire", "Avancé"] },
    gainEstime: { type: "string" },
    outils: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          nom: { type: "string" },
          role: { type: "string" },
          pourquoi: { type: "string" },
        },
        required: ["nom", "role", "pourquoi"],
      },
    },
    etapes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          titre: { type: "string" },
          detail: { type: "string" },
          declencheur: { type: "string" },
        },
        required: ["titre", "detail", "declencheur"],
      },
    },
    integrations: { type: "array", items: { type: "string" } },
    donnees: { type: "array", items: { type: "string" } },
    prompts: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          titre: { type: "string" },
          pour: { type: "string" },
          contenu: { type: "string" },
        },
        required: ["titre", "pour", "contenu"],
      },
    },
  },
  required: [
    "titre",
    "resume",
    "difficulte",
    "gainEstime",
    "outils",
    "etapes",
    "integrations",
    "donnees",
    "prompts",
  ],
} as const;

const SYSTEME = `Tu es un expert en automatisation no-code et IA chez NOESIS.AI, un studio d'ingénierie IA français.

À partir du besoin d'un dirigeant ou d'un opérationnel, tu produis un plan d'action concret pour automatiser sa tâche.

Règles :
- Écris en français, avec un vouvoiement professionnel et chaleureux.
- Recommande des outils réels et adaptés au niveau technique et au budget indiqués : Make, Zapier, n8n, Airtable, Notion, un modèle d'IA (ChatGPT ou Claude), et les intégrations utiles. Privilégie un outil déjà maîtrisé s'il est mentionné. Débutant → Zapier ou Make ; intermédiaire → Make ; à l'aise / profil technique → n8n.
- Le plan doit être actionnable : des étapes claires (déclencheur → logique → action), les intégrations à connecter, les données nécessaires.
- Fournis 2 à 3 prompts prêts à copier-coller dans ChatGPT ou Claude, réellement utiles pour construire ou faire tourner l'automatisation, avec des variables entre accolades quand c'est pertinent.
- Reste honnête et concret : pas de promesse exagérée, une estimation de gain réaliste, une difficulté juste.
- 2 à 4 outils, 4 à 6 étapes, 2 à 3 prompts. Sois précis mais concis.`;

/* -------------------------------------------------------------
 *  Utilitaires
 * -----------------------------------------------------------*/

function texte(v: unknown, max = 1200) {
  return String(v ?? "").slice(0, max);
}

/* -------------------------------------------------------------
 *  Handler
 * -----------------------------------------------------------*/

export const config = { maxDuration: 60 };

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return Response.json({ error: "Méthode non autorisée" }, { status: 405 });
    }

    const cle = process.env.ANTHROPIC_API_KEY;
    if (!cle) {
      // Non configuré : le client bascule sur son repli déterministe.
      return Response.json({ error: "Service IA non configuré" }, { status: 503 });
    }

    let corps: {
      besoin?: string;
      outils?: string[];
      competence?: string;
      volume?: string;
      budget?: string;
    };
    try {
      corps = await request.json();
    } catch {
      return Response.json({ error: "Corps illisible" }, { status: 400 });
    }

    if (!corps.besoin || corps.besoin.trim().length < 3) {
      return Response.json({ error: "Besoin manquant" }, { status: 400 });
    }

    const demande = [
      `Besoin à automatiser : ${texte(corps.besoin)}`,
      `Outils déjà en place : ${
        Array.isArray(corps.outils) && corps.outils.length
          ? corps.outils.map((o) => texte(o, 60)).join(", ")
          : "aucun"
      }`,
      `Niveau technique : ${texte(corps.competence, 60) || "non précisé"}`,
      `Fréquence de la tâche : ${texte(corps.volume, 60) || "non précisée"}`,
      `Budget : ${texte(corps.budget, 80) || "non précisé"}`,
      "",
      "Produis le plan d'automatisation correspondant.",
    ].join("\n");

    let reponse: Response;
    try {
      reponse = await fetch(ANTHROPIC_ENDPOINT, {
        method: "POST",
        headers: {
          "x-api-key": cle,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 4096,
          // Tâche de génération bornée et latency-sensitive : on coupe le
          // thinking (la sortie est de toute façon contrainte par le schéma).
          thinking: { type: "disabled" },
          output_config: {
            format: { type: "json_schema", name: "plan_automatisation", schema: PLAN_SCHEMA },
          },
          system: SYSTEME,
          messages: [{ role: "user", content: demande }],
        }),
      });
    } catch (e) {
      console.error("Appel Anthropic impossible", e);
      return Response.json({ error: "IA injoignable" }, { status: 502 });
    }

    if (!reponse.ok) {
      const detail = await reponse.text().catch(() => "");
      console.error("Anthropic", reponse.status, detail.slice(0, 400));
      return Response.json({ error: "Génération refusée" }, { status: 502 });
    }

    const message = (await reponse.json()) as {
      stop_reason?: string;
      content?: { type: string; text?: string }[];
    };

    if (message.stop_reason === "refusal") {
      return Response.json({ error: "Demande refusée" }, { status: 422 });
    }

    const bloc = message.content?.find((b) => b.type === "text" && b.text);
    if (!bloc?.text) {
      return Response.json({ error: "Réponse vide" }, { status: 502 });
    }

    let plan: unknown;
    try {
      plan = JSON.parse(bloc.text);
    } catch {
      return Response.json({ error: "Sortie illisible" }, { status: 502 });
    }

    return Response.json({ plan });
  },
};
