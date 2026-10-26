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
  // Ajouter ici des photos de padel, muay thaï, yoga... (une entrée avec `src`) ; sans `src`, la carte liste les activités.
  { alt: "Liste des activités proposées", caption: "Et aussi", width: 4, height: 5 },
];

export const excursion = {
  src: "/images/activites/excursion.jpg",
  alt: "Bateau longtail glissant entre des falaises calcaires sur une eau turquoise",
  width: 880,
  height: 587,
  eyebrow: "Pendant la semaine",
  title: "Une excursion magique au cœur de la semaine.",
  body: "Au cours du séjour, tout le groupe part en excursion pour découvrir la région et faire une vraie pause, ensemble.",
  points: ["Incluse dans les deux formules", "Avec tout le groupe", "Transport compris"],
};

export const soiree = {
  src: "/images/activites/catamaran.jpg",
  alt: "Catamaran blanc vu du ciel sur une mer bleu profond, avec une plateforme de baignade flottante",
  width: 1088,
  height: 765,
  eyebrow: "Soirée de clôture",
  title: "La soirée de clôture se déroule à bord d'un magnifique catamaran.",
  body: "Pour clore le séjour, tout le groupe se retrouve sur l'eau. Un cadre à part pour partager la semaine et se dire au revoir ensemble.",
};
