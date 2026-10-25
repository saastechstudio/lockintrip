/**
 * Intervenants. Renseignez `name`, `role` et `photo` (ex. "/images/experts/claire.jpg")
 * au fur et à mesure des confirmations. Sans photo, un portrait d'attente élégant s'affiche.
 *
 * `outcomes` décrit ce que les participants repartent avec — pas les diplômes de l'expert.
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
    promise: "Tu repars avec des heures gagnées chaque semaine.",
    outcomes: ["Tes tâches répétitives automatisées", "Un assistant IA configuré pour ton métier", "Une veille qui tient en 20 minutes"],
  },
  {
    emoji: "marketing",
    domain: "Marketing",
    promise: "Tu repars avec un plan d'acquisition chiffré.",
    outcomes: ["Un positionnement que l'on retient", "90 jours de contenu planifiés", "Un tunnel de vente mesurable"],
  },
  {
    emoji: "ecommerce",
    domain: "E-commerce",
    promise: "Tu repars avec une boutique prête à vendre, ou à vendre plus.",
    outcomes: ["Produit et marges validés", "Fournisseurs et logistique cadrés", "Les leviers de conversion prioritaires"],
  },
  {
    emoji: "legal",
    domain: "Juridique",
    promise: "Tu repars avec une activité sécurisée avant de grandir.",
    outcomes: ["Le bon statut et la bonne fiscalité", "Contrats et CGV prêts", "Ta marque protégée"],
  },
  {
    emoji: "mind",
    domain: "Performance mentale",
    promise: "Tu repars avec une routine qui tient le rythme.",
    outcomes: ["Une méthode de concentration", "Une gestion de l'énergie durable", "Décider vite et sereinement"],
  },
  {
    emoji: "business",
    domain: "Entrepreneuriat",
    promise: "Tu repars avec une offre, un prix et un premier plan de vente.",
    outcomes: ["Une offre irrésistible", "Tes premières ventes planifiées", "Une organisation qui libère du temps"],
  },
];
