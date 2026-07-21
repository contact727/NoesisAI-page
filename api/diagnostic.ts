// =============================================================
//  Fonction serverless — réception d'un diagnostic IA
//  Envoie deux emails via Resend :
//    1. la fiche de lead complète vers la boîte de contact ;
//    2. le diagnostic personnalisé vers le prospect.
//  La clé API reste côté serveur : elle n'est jamais exposée au
//  navigateur, contrairement à une clé de service de formulaire.
// =============================================================

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const ICLOSED_URL = "https://app.iclosed.io/e/NoesisAI/30min";

/* -------------------------------------------------------------
 *  Types du payload (miroir de src/data/diagnostic.ts)
 * -----------------------------------------------------------*/

type Chantier = {
  chantier: string;
  solution: string;
  stack: string[];
  heuresAn: number;
  economieAn: number;
};

type Payload = {
  contact: {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    poste: string;
    societe: string;
  };
  entreprise: {
    secteur: string;
    effectif: number;
    ca: string;
    coutHoraire: number;
  };
  equipes: {
    pole: string;
    collaborateurs: number;
    heuresParCollaborateur: number;
    heuresTotales: number;
  }[];
  taches: { tache: string; heuresSemaine: number }[];
  contexte: {
    maturite: string;
    donnees: string;
    outils: string[];
    objectif: string;
    urgence: string;
    budget: string;
  };
  resultats: {
    score: number;
    niveau: string;
    heuresRepetitivesSemaine: number;
    tauxAutomatisation: number;
    heuresGagneesSemaine: number;
    heuresGagneesAn: number;
    economieAn: number;
    economieMois: number;
    etpLiberes: number;
    joursOuvresAn: number;
    chantiers: Chantier[];
  };
};

/* -------------------------------------------------------------
 *  Formatage
 * -----------------------------------------------------------*/

const euro = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

const nombre = (n: number, d = 0) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(n);

/** Neutralise le HTML des champs libres avant insertion dans l'email. */
const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* -------------------------------------------------------------
 *  Gabarits d'email
 * -----------------------------------------------------------*/

const COQUILLE = (contenu: string) => `
<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:24px 12px;background:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
    <tr><td style="height:5px;background:linear-gradient(100deg,#3b82f6 0%,#8b5cf6 52%,#c026d3 100%);"></td></tr>
    <tr><td style="padding:32px;">${contenu}</td></tr>
  </table>
  <p style="max-width:640px;margin:16px auto 0;text-align:center;font-size:11px;color:#9ca3af;">
    NOESIS.AI · Studio d'ingénierie IA · noesisai.fr
  </p>
</body></html>`;

const tuile = (valeur: string, label: string) => `
<td style="padding:14px;background:#f8f7ff;border-radius:12px;vertical-align:top;">
  <div style="font-size:22px;font-weight:800;color:#111827;line-height:1.2;">${valeur}</div>
  <div style="font-size:12px;color:#6b7280;margin-top:4px;">${label}</div>
</td>`;

function emailProspect(p: Payload) {
  const r = p.resultats;

  const chantiers = r.chantiers
    .map(
      (ch, i) => `
    <tr><td style="padding:16px 0;border-top:1px solid #ececf1;">
      <div style="font-size:15px;font-weight:700;color:#111827;">${i + 1}. ${esc(ch.chantier)}</div>
      <div style="font-size:13px;color:#4b5563;line-height:1.6;margin-top:6px;">${esc(ch.solution)}</div>
      <div style="font-size:13px;font-weight:700;color:#7c3aed;margin-top:10px;">
        ${nombre(ch.heuresAn)} h récupérées par an · ${euro(ch.economieAn)}
      </div>
      <div style="font-size:11px;color:#9ca3af;margin-top:6px;">${ch.stack.map(esc).join(" · ")}</div>
    </td></tr>`
    )
    .join("");

  return COQUILLE(`
    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Votre diagnostic IA</p>
    <h1 style="margin:0 0 20px;font-size:26px;line-height:1.25;color:#111827;">
      ${esc(p.contact.prenom)}, vous pouvez libérer<br>
      <span style="color:#7c3aed;">${nombre(r.heuresGagneesSemaine, 1)} heures par semaine</span>
    </h1>

    <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#4b5563;">
      Sur les ${nombre(r.heuresRepetitivesSemaine)} h hebdomadaires que vos équipes consacrent à des
      tâches répétitives, <strong>${Math.round(r.tauxAutomatisation * 100)} %</strong> sont
      automatisables avec les technologies disponibles aujourd'hui.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="6" width="100%" style="margin-bottom:8px;">
      <tr>
        ${tuile(`${nombre(r.heuresGagneesAn)} h`, "récupérées par an")}
        ${tuile(`${nombre(r.etpLiberes, 1)} ETP`, "équivalents temps plein libérés")}
      </tr>
      <tr>
        ${tuile(euro(r.economieAn), "de valeur récupérée par an")}
        ${tuile(`${r.score}/100`, esc(r.niveau))}
      </tr>
    </table>

    <h2 style="margin:32px 0 4px;font-size:18px;color:#111827;">Vos chantiers prioritaires</h2>
    <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
      Classés par impact, d'après le temps que vous y consacrez et ce qui est réellement automatisable.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${chantiers}</table>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:32px;">
      <tr><td style="padding:24px;background:#faf9ff;border-radius:14px;text-align:center;">
        <div style="font-size:17px;font-weight:700;color:#111827;">
          On va les chercher ensemble ?
        </div>
        <p style="margin:10px 0 18px;font-size:13px;line-height:1.7;color:#4b5563;">
          En 30 minutes, on repasse votre diagnostic en détail, on valide les hypothèses avec vos
          vrais chiffres et on vous remet une feuille de route chiffrée — que vous travailliez avec
          nous ensuite ou non.
        </p>
        <a href="${ICLOSED_URL}" style="display:inline-block;padding:13px 28px;background:#7c3aed;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:999px;">
          Réserver mon échange de 30 min
        </a>
      </td></tr>
    </table>

    <p style="margin:28px 0 0;font-size:11px;line-height:1.7;color:#9ca3af;border-top:1px solid #ececf1;padding-top:16px;">
      <strong>Méthodologie</strong> — gains calculés sur 45 semaines travaillées par an, en appliquant
      à chaque tâche un taux d'automatisation observé sur nos déploiements, pondéré par votre maturité
      actuelle et la qualité de vos données. Estimation indicative, établie à partir de vos
      déclarations : les résultats réels dépendent de votre organisation.
    </p>`);
}

function emailInterne(p: Payload) {
  const r = p.resultats;
  const c = p.contact;

  const ligne = (l: string, v: string) => `
    <tr>
      <td style="padding:5px 12px 5px 0;font-size:13px;color:#6b7280;white-space:nowrap;">${l}</td>
      <td style="padding:5px 0;font-size:13px;color:#111827;font-weight:600;">${v}</td>
    </tr>`;

  const equipes = p.equipes
    .map(
      (e) =>
        `<tr><td style="padding:4px 0;font-size:13px;color:#374151;">${esc(e.pole)}</td>
         <td style="padding:4px 0;font-size:13px;color:#111827;text-align:right;">
           ${e.collaborateurs} × ${e.heuresParCollaborateur} h = <strong>${e.heuresTotales} h</strong>
         </td></tr>`
    )
    .join("");

  const taches = p.taches
    .map(
      (t) =>
        `<tr><td style="padding:4px 0;font-size:13px;color:#374151;">${esc(t.tache)}</td>
         <td style="padding:4px 0;font-size:13px;color:#111827;text-align:right;">${t.heuresSemaine} h/sem</td></tr>`
    )
    .join("");

  return COQUILLE(`
    <p style="margin:0 0 4px;font-size:13px;color:#7c3aed;font-weight:700;">NOUVEAU DIAGNOSTIC</p>
    <h1 style="margin:0 0 6px;font-size:23px;color:#111827;">
      ${esc(c.societe || `${c.prenom} ${c.nom}`)}
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#4b5563;">
      Score <strong>${r.score}/100</strong> — ${esc(r.niveau)} ·
      <strong>${nombre(r.heuresGagneesAn)} h/an</strong> · <strong>${euro(r.economieAn)}/an</strong>
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f8f7ff;border-radius:12px;padding:16px;">
      ${ligne("Contact", `${esc(c.prenom)} ${esc(c.nom)}`)}
      ${ligne("Fonction", esc(c.poste) || "—")}
      ${ligne("Email", `<a href="mailto:${esc(c.email)}" style="color:#7c3aed;">${esc(c.email)}</a>`)}
      ${ligne("Téléphone", `<a href="tel:${esc(c.telephone).replace(/\s/g, "")}" style="color:#7c3aed;">${esc(c.telephone)}</a>`)}
      ${ligne("Société", esc(c.societe) || "non renseignée")}
    </table>

    <h2 style="margin:28px 0 8px;font-size:15px;color:#111827;">Entreprise</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${ligne("Secteur", esc(p.entreprise.secteur))}
      ${ligne("Effectif", String(p.entreprise.effectif))}
      ${ligne("Chiffre d'affaires", esc(p.entreprise.ca) || "non renseigné")}
      ${ligne("Coût horaire retenu", `${p.entreprise.coutHoraire} €`)}
    </table>

    <h2 style="margin:28px 0 8px;font-size:15px;color:#111827;">
      Équipes — ${nombre(r.heuresRepetitivesSemaine)} h/sem déclarées
    </h2>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${equipes}</table>

    <h2 style="margin:28px 0 8px;font-size:15px;color:#111827;">Tâches répétitives</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${taches}</table>

    <h2 style="margin:28px 0 8px;font-size:15px;color:#111827;">Contexte</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${ligne("Maturité", esc(p.contexte.maturite))}
      ${ligne("Données", esc(p.contexte.donnees))}
      ${ligne("Outils", esc(p.contexte.outils.join(", ")) || "—")}
      ${ligne("Objectif", esc(p.contexte.objectif))}
      ${ligne("Urgence", esc(p.contexte.urgence))}
      ${ligne("Budget", esc(p.contexte.budget) || "non renseigné")}
    </table>

    <h2 style="margin:28px 0 8px;font-size:15px;color:#111827;">Chantiers proposés</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${r.chantiers
        .map(
          (ch, i) =>
            `<tr><td style="padding:4px 0;font-size:13px;color:#374151;">${i + 1}. ${esc(ch.chantier)}</td>
             <td style="padding:4px 0;font-size:13px;color:#111827;text-align:right;">
               ${nombre(ch.heuresAn)} h/an · ${euro(ch.economieAn)}
             </td></tr>`
        )
        .join("")}
    </table>

    <p style="margin:28px 0 0;font-size:12px;color:#9ca3af;border-top:1px solid #ececf1;padding-top:14px;">
      Le prospect a reçu son diagnostic détaillé à la même adresse. Un « Répondre » sur cet email
      lui écrit directement.
    </p>`);
}

/* -------------------------------------------------------------
 *  Envoi via Resend
 * -----------------------------------------------------------*/

async function envoyer(
  cle: string,
  message: {
    from: string;
    to: string;
    subject: string;
    html: string;
    reply_to?: string;
  }
) {
  const reponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cle}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!reponse.ok) {
    const detail = await reponse.text().catch(() => "");
    throw new Error(`Resend ${reponse.status} — ${detail.slice(0, 300)}`);
  }
  return reponse.json();
}

/* -------------------------------------------------------------
 *  Handler
 * -----------------------------------------------------------*/

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return Response.json({ error: "Méthode non autorisée" }, { status: 405 });
    }

    const cle = process.env.RESEND_API_KEY;
    const expediteur = process.env.DIAGNOSTIC_FROM;
    const destinataire = process.env.DIAGNOSTIC_TO;

    if (!cle || !expediteur || !destinataire) {
      console.error("Variables d'environnement manquantes", {
        cle: Boolean(cle),
        expediteur: Boolean(expediteur),
        destinataire: Boolean(destinataire),
      });
      return Response.json({ error: "Service non configuré" }, { status: 500 });
    }

    let p: Payload;
    try {
      p = (await request.json()) as Payload;
    } catch {
      return Response.json({ error: "Corps de requête illisible" }, { status: 400 });
    }

    if (!p?.contact?.email || !p?.contact?.prenom || !p?.resultats) {
      return Response.json({ error: "Diagnostic incomplet" }, { status: 400 });
    }

    const nom = p.contact.societe || `${p.contact.prenom} ${p.contact.nom}`.trim();

    /* La fiche de lead part en premier : même si l'accusé au prospect
     * échoue, le contact ne doit jamais être perdu. */
    try {
      await envoyer(cle, {
        from: expediteur,
        to: destinataire,
        reply_to: p.contact.email,
        subject: `Diagnostic IA — ${nom} — ${p.resultats.score}/100 — ${euro(
          p.resultats.economieAn
        )}/an`,
        html: emailInterne(p),
      });
    } catch (e) {
      console.error("Échec de l'envoi interne", e);
      return Response.json({ error: "Envoi impossible" }, { status: 502 });
    }

    let copieProspect = true;
    try {
      await envoyer(cle, {
        from: expediteur,
        to: p.contact.email,
        reply_to: destinataire,
        subject: `${p.contact.prenom}, votre diagnostic IA — ${nombre(
          p.resultats.heuresGagneesAn
        )} h récupérables par an`,
        html: emailProspect(p),
      });
    } catch (e) {
      // Le lead est déjà sauvé : on le signale sans faire échouer la requête.
      console.error("Échec de la copie au prospect", e);
      copieProspect = false;
    }

    return Response.json({ success: true, copieProspect });
  },
};
