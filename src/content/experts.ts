/**
 * Intervenants. Renseignez `name`, `role` et `photo` (ex. "/images/experts/claire.jpg")
 * au fur et à mesure des confirmations. Un expert sans nom s'affiche comme
 * « Annonce prochainement » — la carte reste élégante en attendant.
 */
export type Expert = {
  domain: string;
  focus: string;
  takeaways: string[];
  name?: string;
  role?: string;
  photo?: string;
};

export const experts: Expert[] = [
  {
    domain: "Intelligence artificielle",
    focus: "Intégrer l'IA dans votre quotidien de travail et dans votre offre.",
    takeaways: ["Vos workflows automatisés", "Un assistant sur mesure", "Une veille qui tient en 20 min"],
  },
  {
    domain: "Marketing",
    focus: "Construire une acquisition qui fonctionne sans dépendre d'un seul canal.",
    takeaways: ["Positionnement clarifié", "Plan de contenu à 90 jours", "Tunnel d'acquisition chiffré"],
  },
  {
    domain: "E-commerce",
    focus: "Lancer, structurer ou faire passer un cap à une marque en ligne.",
    takeaways: ["Choix produit et marges", "Logistique et fournisseurs", "Leviers de conversion"],
  },
  {
    domain: "Juridique",
    focus: "Sécuriser votre activité avant qu'elle ne grandisse.",
    takeaways: ["Statut et fiscalité adaptés", "Contrats et CGV", "Protection de la marque"],
  },
  {
    domain: "Performance mentale",
    focus: "Tenir le rythme sans s'épuiser : focus, énergie, discipline.",
    takeaways: ["Routine de concentration", "Gestion de l'énergie", "Décider sous pression"],
  },
  {
    domain: "Entrepreneuriat",
    focus: "Passer de l'idée au premier chiffre d'affaires, ou du chiffre à l'échelle.",
    takeaways: ["Offre et pricing", "Premières ventes", "Organisation et délégation"],
  },
];
