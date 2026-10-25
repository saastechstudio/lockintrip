/**
 * Activités des après-midi et excursion de fin de séjour.
 *
 * ⚠️ Droits des photos : vérifier que chaque image est libre d'usage commercial
 * (photos prises par l'équipe ou licence achetée). Remplacer les fichiers de
 * /public/images/activites/ par des versions haute définition (2 000 px et plus).
 */
export const activities = [
  "Football",
  "Pilates",
  "Yoga",
  "Padel",
  "Pickleball",
  "Golf",
  "Randonnée",
  "Muay thaï",
  "Fitness",
];

/** Sans `src`, la carte s'affiche en version typographique (fond bordeaux). */
export type ActivityPhoto = { src?: string; alt: string; caption: string; width: number; height: number };

export const activityPhotos: ActivityPhoto[] = [
  { src: "/images/activites/fitness.jpg", alt: "Salle de fitness équipée de racks et d'haltères", caption: "Fitness", width: 474, height: 632 },
  { src: "/images/activites/pickleball.jpg", alt: "Terrains de pickleball au milieu de la végétation, à la tombée du jour", caption: "Padel & pickleball", width: 675, height: 900 },
  // Ajouter ici une vraie photo de randonnée à Phuket (ex. point de vue de Karon ou du Big Buddha) :
  // src: "/images/activites/randonnee.jpg"
  { alt: "Muay thaï, yoga, pilates, golf, randonnée et football", caption: "Et aussi", width: 4, height: 5 },
];

export const excursion = {
  src: "/images/activites/excursion.jpg",
  alt: "Bateau longtail glissant entre des falaises calcaires sur une eau turquoise",
  width: 880,
  height: 587,
  eyebrow: "Fin de séjour",
  title: "Une excursion magique pour clôturer la semaine.",
  body: "Le dernier jour, on prend la mer. Bateau traditionnel, falaises calcaires, eaux turquoise : une journée pour souffler, célébrer le chemin parcouru et graver la semaine dans les mémoires, ensemble.",
  points: ["Incluse dans les deux formules", "Avec tout le groupe", "Le souvenir qui scelle les liens"],
};
