export type Pillar = {
  icon: "experts" | "workshop" | "one-on-one" | "sport" | "network" | "community";
  title: string;
  body: string;
  outcome: string;
};

export const pillars: Pillar[] = [
  {
    icon: "experts",
    title: "Des experts",
    body: "Des praticiens qui font ce qu'ils enseignent. Une masterclass chaque matin, et du temps sur place pour tes questions concrètes.",
    outcome: "Des méthodes issues de la pratique",
  },
  {
    icon: "workshop",
    title: "Des ateliers collaboratifs",
    body: "En petits groupes, sur ton projet réel. Les autres participants challengent tes idées, tu challenges les leurs.",
    outcome: "Un travail concret sur ton projet",
  },
  {
    icon: "one-on-one",
    title: "Des entretiens individuels",
    body: "Un entretien d'entrée pour fixer ton objectif, un entretien de sortie pour construire ton plan d'action personnalisé.",
    outcome: "Un plan d'action personnalisé",
  },
  {
    icon: "sport",
    title: "Des activités sportives",
    body: "Chaque après-midi : padel, pickleball, muay thaï, yoga, golf, randonnée... Tous niveaux, même débutant.",
    outcome: "Un moment pour se dépenser et se rencontrer",
  },
  {
    icon: "network",
    title: "Un réseau ambitieux",
    body: "Vingt personnes par session, choisies pour leurs ambitions et la complémentarité de leurs parcours.",
    outcome: "Des rencontres entre profils variés",
  },
  {
    icon: "community",
    title: "Une communauté privée",
    body: "Le séjour se termine, le cercle continue : groupe privé, rencontres en France, suivi des objectifs.",
    outcome: "Un groupe privé après le séjour",
  },
];

export const rhythm = [
  { time: "7 h – 9 h", label: "Petit-déjeuner", detail: "À l'hôtel" },
  { time: "10 h – 12 h", label: "Masterclass", detail: "Et travail en groupe" },
  { time: "12 h", label: "Déjeuner", detail: "Au restaurant" },
  { time: "15 h – 17 h", label: "Activité au choix", detail: "Tous niveaux, même débutant" },
  { time: "À partir de 17 h", label: "Temps libre", detail: "Pour tous" },
];

export const problems = ["Distractions", "Solitude", "Manque de réseau", "Manque de clarté", "Manque de méthode"];
