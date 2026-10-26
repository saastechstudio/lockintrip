/**
 * Intervenants. Renseignez `name`, `role` et `photo` (ex. "/images/experts/claire.jpg")
 * au fur et à mesure des confirmations. Sans photo, un portrait d'attente élégant s'affiche.
 *
 * `outcomes` décrit les sujets travaillés avec l'expert. Ne rien y promettre :
 * ni résultat, ni gain, ni chiffre. On décrit ce qui est étudié, pas ce qui sera obtenu.
 */
export type Expert = {
  emoji: "ai" | "marketing" | "ecommerce" | "legal" | "mind" | "business";
  domain: string;
  promise: string;
  outcomes: string[];
  name?: string;
  role?: string;
  photo?: string;
};

export const experts: Expert[] = [
  {
    emoji: "ai",
    domain: "Intelligence artificielle",
    promise: "Tu acquiers de nouvelles compétences pour utiliser l'IA dans ton travail.",
    outcomes: ["Automatiser des tâches répétitives", "Prendre en main des assistants IA", "Suivre l'évolution des outils"],
  },
  {
    emoji: "marketing",
    domain: "Marketing",
    promise: "Tu acquiers de nouvelles compétences en marketing et en acquisition.",
    outcomes: ["Clarifier son positionnement", "Construire un plan de contenu", "Comprendre les canaux d'acquisition"],
  },
  {
    emoji: "ecommerce",
    domain: "E-commerce",
    promise: "Tu acquiers de nouvelles compétences pour lancer ou structurer une boutique en ligne.",
    outcomes: ["Choisir et évaluer un produit", "Fournisseurs et logistique", "Leviers de conversion"],
  },
  {
    emoji: "legal",
    domain: "Juridique",
    promise: "Tu acquiers de nouvelles compétences sur le cadre juridique d'une activité.",
    outcomes: ["Statuts et fiscalité", "Contrats et conditions de vente", "Protection de la marque"],
  },
  {
    emoji: "mind",
    domain: "Performance mentale",
    promise: "Tu acquiers de nouvelles compétences pour gérer ta concentration et ton énergie.",
    outcomes: ["Méthodes de concentration", "Gestion de l'énergie", "Décider sous pression"],
  },
  {
    emoji: "business",
    domain: "Entrepreneuriat",
    promise: "Tu acquiers de nouvelles compétences pour construire et développer une activité.",
    outcomes: ["Définir une offre et un prix", "Premières étapes de vente", "S'organiser et déléguer"],
  },
];
