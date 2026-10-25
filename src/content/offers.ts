export type OfferId = "explorer" | "all-inclusive";

export type Offer = {
  id: OfferId;
  name: string;
  price: number;
  pitch: string;
  includes: string[];
  note?: string;
  featured?: boolean;
  badge?: string;
};

const core = [
  "Hôtel 7 nuits",
  "Chambre partagée",
  "Petit-déjeuner",
  "Déjeuner",
  "Masterclass quotidiennes",
  "Activités sportives",
  "Excursion en mer",
  "Entretiens individuels",
  "Accès à vie à la communauté",
];

export const offers: Offer[] = [
  {
    id: "explorer",
    name: "Explorer",
    price: 1990,
    pitch: "Le programme complet, sur place. Vous organisez votre vol.",
    includes: core,
    note: "Vol non inclus",
  },
  {
    id: "all-inclusive",
    name: "All Inclusive",
    price: 2590,
    pitch: "Tout est pris en charge, de Paris à Phuket et retour.",
    includes: [
      "Tout le programme Explorer",
      "Vol aller-retour France → Phuket",
      "Transferts aéroport ↔ hôtel",
      "Assistance voyage 24/7",
    ],
    featured: true,
    badge: "Plus populaire",
  },
];

export const getOffer = (id: OfferId) => offers.find((o) => o.id === id)!;
