// =============================================================
//  NOESIS AI — contenu centralisé du site
//  Modifiez ce fichier pour mettre à jour les textes, les cas
//  clients, les logos, la FAQ, etc. (pas besoin de toucher au JSX).
// =============================================================

/** Lien de prise de rendez-vous iClosed — utilisé par tous les CTA. */
export const ICLOSED_URL = "https://app.iclosed.io/e/NoesisAI/30min";

export const CONTACT_EMAIL = "contact@noesisiai.pro";

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/in/ugo-sartini-04a14620a/",
  instagram: "https://www.instagram.com/ugoia2025/",
};

export const NAV_LINKS = [
  { label: "Expertises", href: "#expertises" },
  { label: "Agents vocaux", href: "#agents-vocaux" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Équipe", href: "#equipe" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  badge: "Studio d'ingénierie IA · solutions sur-mesure",
  // Le titre est composé dans Hero.tsx (partie en dégradé).
  subtitle:
    "NOESIS.AI conçoit, déploie et opère des agents IA, des automatisations et des produits digitaux taillés pour vos enjeux métier — de l'audit à la mise en production.",
  primaryCta: "Échanger avec un expert",
  secondaryCta: "Voir nos réalisations",
  stats: [
    { value: "Sur-mesure", label: "chaque solution conçue pour vous" },
    { value: "24/7", label: "agents IA en production" },
    { value: "RGPD", label: "sécurité & conformité by design" },
  ],
};

export const TRUST_TITLE = "Ils nous font confiance";

/** Logos clients — fichiers dans /public/logos/clients/. */
// Versions blanches monochromes (fond transparent) générées à partir des originaux.
export const CLIENT_LOGOS: { name: string; src: string }[] = [
  { name: "Muller", src: "/logos/clients/muller-w.png" },
  { name: "ISCI International", src: "/logos/clients/isci-w.png" },
  { name: "Homelok", src: "/logos/clients/homelok-w.png" },
  { name: "FastParts", src: "/logos/clients/fastparts-w.png" },
  { name: "BT Propre Nettoyage", src: "/logos/clients/bt-propre-w.png" },
  { name: "Bungazur", src: "/logos/clients/bungazur-w.png" },
  { name: "NRGY UP", src: "/logos/clients/nrgy-up-w.png" },
  { name: "Bunker Game", src: "/logos/clients/bunker-game-w.png" },
  { name: "Immobilier", src: "/logos/clients/client-immobilier-w.png" },
];

export const PROBLEM = {
  badge: "Le problème",
  title: "Vos équipes perdent un temps précieux sur des tâches sans valeur ajoutée",
  subtitle:
    "Avant de présenter nos solutions, voici les blocages que rencontrent la plupart des entreprises que nous accompagnons.",
  pains: [
    {
      title: "Des tâches répétitives chronophages",
      text: "Saisie manuelle, copier-coller entre outils, relances : jusqu'à 70% du temps part dans l'administratif à faible valeur.",
    },
    {
      title: "Des appels et des leads perdus",
      text: "Les appels hors disponibilité (soir, week-end, terrain) ne sont jamais décrochés, et les devis dormants ne sont jamais relancés.",
    },
    {
      title: "Des données éparpillées",
      text: "CRM, mails, factures, devis : l'information est dispersée entre plusieurs plateformes, sans vision unifiée ni suivi fiable.",
    },
  ],
};

export const SOLUTIONS = {
  badge: "Notre solution",
  title: "Des automatisations IA complètes, de l'audit au déploiement",
  subtitle:
    "Des solutions complètes pour transformer vos processus métier en workflows intelligents et automatisés.",
  items: [
    {
      title: "Audit & roadmap",
      text: "Analyse approfondie de vos processus pour identifier les opportunités d'automatisation les plus rentables.",
    },
    {
      title: "Développement n8n / Make",
      text: "Conception de workflows robustes connectés à vos outils via des intégrations API natives.",
    },
    {
      title: "Agents IA (texte & voix)",
      text: "Création d'agents conversationnels et vocaux intelligents pour automatiser vos interactions clients.",
    },
    {
      title: "Intégration & déploiement",
      text: "Mise en place complète de vos automatisations avec respect des standards de sécurité et RGPD.",
    },
    {
      title: "Optimisation continue",
      text: "Accompagnement long terme pour maintenir, fiabiliser et optimiser vos automatisations.",
    },
    {
      title: "Formation des équipes",
      text: "Montée en compétences de vos collaborateurs pour exploiter l'IA générative au quotidien.",
    },
  ],
};

export const EXPERTISE = {
  badge: "Nos expertises",
  title: "Ce que nous concevons pour vous",
  subtitle:
    "De l'application métier sur-mesure aux systèmes d'IA les plus avancés : nous couvrons toute la chaîne, du produit digital à l'intelligence artificielle.",
  categories: [
    {
      label: "Produits digitaux",
      items: [
        { title: "Logiciel métier", text: "Des outils internes sur-mesure qui digitalisent vos processus spécifiques." },
        { title: "Application web & SaaS", text: "Plateformes web performantes, du MVP au produit SaaS multi-utilisateurs." },
        { title: "Automatisation", text: "Workflows n8n / Make qui connectent vos outils et éliminent les tâches manuelles." },
        { title: "API & microservices", text: "Architectures modulaires et intégrations robustes entre vos systèmes." },
      ],
    },
    {
      label: "Solutions IA",
      items: [
        { title: "Agents autonomes & multi-agents", text: "Des agents IA qui exécutent des tâches complexes et collaborent entre eux." },
        { title: "Agentic Workflows", text: "Des chaînes de décision intelligentes orchestrant IA, outils et données." },
        { title: "AI Engineering", text: "Intégration de LLM, RAG et fine-tuning au cœur de vos applications." },
        { title: "Computer Vision", text: "Analyse d'images et de vidéos pour automatiser le contrôle et la détection." },
      ],
    },
  ],
};

export const VOICE_AGENTS = {
  badge: "Notre expertise phare",
  title: "Des agents vocaux IA qui décrochent à votre place, 24/7",
  subtitle:
    "Ne perdez plus jamais un appel. Nos agents vocaux répondent, qualifient la demande et déclenchent les bonnes actions dans vos outils — même quand vous êtes sur le terrain.",
  capabilities: [
    "Décroche les appels entrants hors disponibilité (soir, week-end, interventions)",
    "Trie et qualifie la demande (SAV, devis, prise de RDV…)",
    "Résout les cas simples par téléphone via des instructions guidées",
    "Crée automatiquement les tickets et pré-remplit les devis dans vos outils",
    "Planifie les rendez-vous (SMS + synchronisation agenda)",
    "Transcrit chaque échange et transfère à un humain à la demande",
  ],
  // Cas concret mis en avant
  highlight: {
    client: "FastParts",
    sector: "Pièces détachées auto · Belgique",
    quote:
      "Le volume d'appels (référence, disponibilité, prix) saturait les commerciaux. Notre agent vocal identifie le véhicule, qualifie la pièce recherchée et envoie automatiquement un devis par SMS/email — et bascule vers un commercial pour les cas complexes.",
    stack: ["n8n", "Twilio", "OpenAI"],
  },
};

export const ROI = {
  badge: "Calculateur ROI",
  title: "Combien vous coûtent vos appels manqués ?",
  subtitle:
    "Estimez le chiffre d'affaires que vous perdez chaque mois faute de décrocher — et ce qu'un agent vocal IA pourrait récupérer.",
  defaults: {
    appelsManquesParMois: 40,
    panierMoyen: 250,
    tauxConversion: 20,
  },
  cta: "Récupérer ce chiffre d'affaires",
};

export const REALISATIONS = {
  badge: "Réalisations",
  title: "Ce que nos clients ont transformé avec NOESIS AI",
  subtitle:
    "Découvrez comment nos clients ont automatisé leurs opérations et fiabilisé leur pilotage grâce à nos automatisations IA.",
  cases: [
    {
      client: "FastParts",
      sector: "Pièces détachées auto",
      country: "Belgique",
      summary:
        "Agent vocal IA dédié aux demandes de pièces détachées : il identifie le véhicule (marque, modèle, année), qualifie la pièce recherchée et envoie automatiquement un devis par SMS/email — et bascule vers un commercial pour les cas complexes.",
      results: ["Appels qualifiés 24/7, même hors horaires", "Devis envoyés automatiquement", "Commerciaux déchargés des appels simples"],
      tags: ["Agent vocal IA", "Automatisation n8n", "Twilio"],
    },
    {
      client: "Muller and Comfort",
      sector: "BTP",
      country: "Suisse",
      summary:
        "Application web couvrant tout le cycle opérationnel : devis assisté par IA, suivi de la marge réelle des chantiers, bibliothèque de prix multi-entités et gestion des fiches clients.",
      results: ["Devis assistés par IA", "Marge chantier suivie en temps réel", "Pointage & factures centralisés"],
      tags: ["App web", "IA générative", "Suivi de marge"],
    },
    {
      client: "ISCI International",
      sector: "Tech & Consulting (ESN)",
      country: "Québec",
      summary:
        "Préqualification par agent vocal IA + matching IA sur un vivier de 15 000 CV, CRM/ATS en Kanban et veille marché — le tout conforme à la Loi 25 par conception.",
      results: ["15 000 CV exploités", "80% des opérations visées en automatisation", "Hébergement souverain & conforme Loi 25"],
      tags: ["Agent vocal IA", "Matching IA", "Conformité"],
    },
    {
      client: "Woody's Camp",
      sector: "E-commerce",
      country: "France",
      summary:
        "Montée en compétences sur l'IA générative et assistance à la gestion du support client (réponses, FAQ, gestion des avis) pour une équipe réduite.",
      results: ["Support client assisté par IA", "Équipe formée à l'IA générative", "Prise en main accélérée"],
      tags: ["Formation IA", "Support client", "E-commerce"],
    },
  ],
};

export const PROCESS = {
  badge: "Comment ça marche",
  title: "Votre transformation en 4 étapes",
  subtitle:
    "Une démarche claire et progressive, de l'audit gratuit jusqu'à l'optimisation continue.",
  steps: [
    { n: "01", title: "Audit gratuit", text: "Nous analysons vos workflows actuels pour identifier les tâches les plus chronophages et les plus rentables à automatiser." },
    { n: "02", title: "Roadmap personnalisée", text: "Nous priorisons les automatisations selon leur ROI et construisons un plan d'action clair et chiffré." },
    { n: "03", title: "Intégration & déploiement", text: "Nous développons et connectons vos automatisations à vos outils, dans le respect du RGPD et de la sécurité." },
    { n: "04", title: "Optimisation continue", text: "Nous maintenons, mesurons et améliorons vos automatisations pour un ROI durable." },
  ],
};

export const LEAD_MAGNET = {
  badge: "Guide gratuit",
  title: "Les 5 processus les plus rentables à automatiser",
  subtitle:
    "Un guide étape par étape pour identifier les tâches chronophages et démarrer vos premières automatisations.",
  cta: "Télécharger le guide gratuit",
  placeholder: "Votre email professionnel",
};

export const TESTIMONIALS = {
  badge: "Avis clients",
  title: "Ce que disent les entreprises que nous accompagnons",
  subtitle:
    "Des dirigeants et des équipes qui ont gagné du temps et fiabilisé leurs opérations grâce à l'automatisation IA.",
  items: [
    {
      quote:
        "L'agent vocal prend les demandes de pièces, identifie le véhicule et envoie le devis tout seul. Nos commerciaux ne sont plus interrompus en permanence et on ne perd plus d'appels.",
      author: "Direction",
      company: "FastParts",
    },
    {
      quote:
        "Le suivi de marge par chantier a changé notre façon de piloter. Les devis assistés par IA nous font gagner un temps fou.",
      author: "Direction",
      company: "Muller and Comfort",
    },
    {
      quote:
        "On exploite enfin notre vivier de candidats. La préqualification vocale et le matching IA nous remettent des shortlists déjà qualifiées.",
      author: "Direction",
      company: "ISCI International",
    },
  ],
};

export const TEAM = {
  badge: "L'équipe",
  title: "Notre équipe",
  subtitle:
    "Les experts derrière NOESIS AI, passionnés par l'innovation et l'automatisation intelligente.",
  members: [
    {
      name: "Ugo Sartini",
      role: "Co-founder",
      photo: "/team/ugo.png",
      linkedin: "https://www.linkedin.com/in/ugo-sartini-automatisation-ia/",
    },
    {
      name: "Karim Kraiouh",
      role: "Co-founder",
      photo: "/team/karim.png",
      linkedin: "https://www.linkedin.com/in/karim-k-702890198/",
    },
  ],
};

export const FAQ = {
  badge: "FAQ",
  title: "Questions fréquemment posées",
  subtitle:
    "Réponses aux questions sur l'automatisation IA, les agents vocaux, les intégrations (n8n / Make), la sécurité et les délais.",
  items: [
    {
      q: "Comment fonctionne un audit d'automatisation ?",
      a: "Nous analysons gratuitement vos workflows actuels pour repérer les tâches répétitives les plus chronophages et estimer le ROI de leur automatisation. Vous repartez avec une roadmap claire, même sans travailler avec nous.",
    },
    {
      q: "Combien de temps faut-il pour mettre en place une automatisation ?",
      a: "Cela dépend de la complexité, mais un premier workflow utile est généralement livré en quelques semaines. Nous procédons par étapes pour générer un retour sur investissement visible dès les premiers mois.",
    },
    {
      q: "Qu'est-ce qu'un agent vocal IA et que peut-il faire ?",
      a: "C'est un assistant téléphonique qui décroche à votre place, comprend la demande, y répond ou la qualifie, puis déclenche les bonnes actions dans vos outils (tickets, devis, prises de RDV). Il fonctionne 24/7 et transfère à un humain à la demande.",
    },
    {
      q: "Avez-vous des exemples concrets d'automatisations réussies ?",
      a: "Oui : agent vocal pour les demandes de pièces détachées chez FastParts, application de gestion de chantiers pour Muller and Comfort, et préqualification + matching IA sur 15 000 CV pour ISCI International.",
    },
    {
      q: "Mes données sont-elles en sécurité ?",
      a: "Oui. Nous respectons les normes RGPD et appliquons les standards de sécurité (chiffrement, contrôle d'accès, hébergement adapté). Pour ISCI, nous avons par exemple déployé une architecture souveraine conforme à la Loi 25.",
    },
    {
      q: "Avec quels outils travaillez-vous ?",
      a: "n8n, Make, OpenAI, Claude, ElevenLabs, Twilio, Supabase, HubSpot, Pennylane, Monday, et bien d'autres. Nous nous intégrons à votre stack existante via des API natives.",
    },
  ],
};

export const FINAL_CTA = {
  title: "Prêt à transformer vos processus ?",
  subtitle:
    "Commencez par un audit gratuit de vos workflows actuels. Repartez avec une roadmap claire et le ROI estimé de vos automatisations.",
  cta: "Réserver un audit gratuit",
};

export const FOOTER = {
  tagline:
    "Agence d'automatisation IA sur-mesure : n8n, Make, LLM et agents vocaux pour éliminer les tâches répétitives et accélérer votre croissance.",
  navTitle: "Navigation",
  nav: NAV_LINKS,
  legalTitle: "Légal",
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "CGU / CGV", href: "/cgu" },
  ],
};
