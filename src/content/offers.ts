export type OfferId = "explorer" | "all-inclusive";

export type Offer = {
  id: OfferId;
  name: string;
  price: number;
  pitch: string;
  includes: string[];
  excludes?: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

export const offers: Offer[] = [
  {
    id: "explorer",
    name: "Explorer",
    price: 1990,
    pitch: "Le programme complet sur place. Tu organises ton vol.",
    includes: [
      "Hôtel 6 nuits (séjour de 7 jours)",
      "Assurance voyage incluse",
      "Encadrement à chaque étape du séjour (hors temps libre)",
      "Suivi personnalisé en groupe de 20 personnes",
      "Chambre partagée",
      "Petit-déjeuner à l'hôtel",
      "Déjeuner au restaurant",
      "Transfert aéroport ↔ hôtel",
      "Transport pour tous les déplacements",
      "Masterclass et travail en groupe",
      "Activité au choix chaque après-midi",
      "Excursion pendant la semaine",
      "Soirée de clôture à bord d'un catamaran",
      "Entretien individuel d'entrée",
      "Entretien individuel de sortie",
      "Communauté privée",
      "Plan d'action personnalisé",
      "D'autres surprises",
    ],
    excludes: ["Vol non inclus"],
    cta: "Réserver",
  },
  {
    id: "all-inclusive",
    name: "All Inclusive",
    price: 2590,
    pitch: "Tu n'as qu'à faire ta valise. On s'occupe de tout, de Paris à Phuket.",
    includes: [
      "Tout Explorer",
      "Vol aller-retour France → Phuket",
      "Accompagnement avant départ",
      "Groupe privé avant séjour",
    ],
    cta: "Réserver ma place",
    featured: true,
    badge: "Le plus populaire",
  },
];

export const startingPrice = Math.min(...offers.map((o) => o.price));
export const getOffer = (id: OfferId) => offers.find((o) => o.id === id)!;
