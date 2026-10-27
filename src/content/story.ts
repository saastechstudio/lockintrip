/**
 * Textes de la page d'accueil orientés transformation : ce que le participant devient,
 * pas seulement ce qu'il fait. Les faits (horaires, inclusions) restent ceux du programme réel.
 */

export const hero = {
  /** Titre affiché. Variantes testables : remplacer `title` par l'une des `alternatives`. */
  title: "Une semaine qui peut changer les cinq prochaines années.",
  alternatives: [
    "L'environnement dans lequel tu évolues détermine la vitesse à laquelle tu avances.",
    "7 jours à Phuket avec 20 personnes qui refusent de rester au même niveau.",
  ],
  intro:
    "Sept jours à Phuket avec vingt personnes ambitieuses, des experts qui pratiquent ce qu'ils enseignent et un cadre pensé pour décider, agir et repartir avec un plan.",
  badges: [
    { icon: "flame", label: "Édition fondatrice 2027" },
    { icon: "star", label: "Places limitées" },
    { icon: "palm", label: "Phuket, Thaïlande" },
    { icon: "check", label: "Départ confirmé" },
  ] as const,
};

export type Transformation = {
  title: string;
  body: string;
  how: string;
};

/** Ce que le participant vient chercher. `how` rattache chaque promesse à un moment concret du programme. */
export const transformations: Transformation[] = [
  {
    title: "Accélérer tes décisions",
    body: "Les questions que tu repousses depuis des mois, tu les poses enfin à des gens qui sont déjà passés par là.",
    how: "Masterclass chaque matin et échanges directs avec les experts",
  },
  {
    title: "Construire un réseau qui compte",
    body: "Vingt personnes qui avancent, une semaine ensemble. Ce sont souvent elles qui ouvrent les prochaines portes.",
    how: "20 participants par session, aux parcours complémentaires",
  },
  {
    title: "Sortir de l'isolement",
    body: "Fini de tout porter seul. Ici, chacun comprend ce que tu construis, et te dit franchement ce qu'il en pense.",
    how: "Travail en groupe sur ton projet réel",
  },
  {
    title: "Retrouver une énergie élevée",
    body: "Soleil, sport, sommeil, bonne cuisine. Le corps suit, et la tête suit le corps.",
    how: "Une activité sportive au choix chaque après-midi",
  },
  {
    title: "Passer à l'action",
    body: "Pas de grand discours. Tu avances sur ton projet pendant la semaine, sous le regard du groupe.",
    how: "Ateliers pratiques et objectifs fixés dès le premier jour",
  },
  {
    title: "Repartir avec un plan concret",
    body: "Tu ne rentres pas avec des notes éparpillées, mais avec les prochaines étapes, écrites et datées.",
    how: "Entretiens individuels d'entrée et de sortie",
  },
];

export type DayMoment = {
  moment: string;
  time: string;
  title: string;
  body: string;
  src: string;
  alt: string;
};

/** Le récit d'une journée, calé sur le vrai programme. */
export const day: DayMoment[] = [
  {
    moment: "Le matin",
    time: "7 h – 12 h",
    title: "Tu travailles sur ce qui compte vraiment.",
    body: "Petit-déjeuner à l'hôtel, puis masterclass et travail en groupe. Deux heures d'attention totale, loin des notifications et des urgences.",
    src: "/images/hotel/salle-masterclass.jpg",
    alt: "Salle de masterclass lumineuse de l'hôtel",
  },
  {
    moment: "Le midi",
    time: "12 h",
    title: "Les meilleures idées arrivent à table.",
    body: "Déjeuner au restaurant avec le groupe. Les conversations du matin continuent, les liens se créent.",
    src: "/images/phuket/rawai-plage.jpg",
    alt: "Plage de Rawai bordée de bateaux longtail",
  },
  {
    moment: "L'après-midi",
    time: "15 h – 17 h",
    title: "Tu bouges, tu te dépasses.",
    body: "Muay thaï, padel, golf, fitness, yoga... Une activité au choix, tous niveaux. Le sport fait ce que les réunions ne font jamais : il rapproche.",
    src: "https://images.unsplash.com/photo-1729673517080-44353fa68fe0?ixid=M3wxMTE1NTMwfDB8MXxhbGx8fHx8fHx8fHwxNzkzMTQwMjg2fA",
    alt: "Deux combattants à l'entraînement de muay thaï dans un camp de Rawai",
  },
  {
    moment: "Le soir",
    time: "À partir de 17 h",
    title: "Le soleil se couche, les discussions continuent.",
    body: "Temps libre pour tous. Un coucher de soleil sur la mer d'Andaman, un dîner improvisé, une idée qui prend forme.",
    src: "/images/phuket/nai-harn-soir.jpg",
    alt: "Coucher de soleil sur la plage de Nai Harn",
  },
];

export type Sport = { name: string; promise: string; body: string; src?: string; alt?: string };

export const sports: Sport[] = [
  {
    name: "Muay thaï",
    promise: "Sortir de ta zone de confort",
    body: "Dans le pays qui l'a vu naître. Un entraînement qui remet les idées en place, même pour un grand débutant.",
    src: "https://images.unsplash.com/photo-1729673517102-68967c4e96b5?ixid=M3wxMTE1NTMwfDB8MXxhbGx8fHx8fHx8fHwxNzkzMTQwMjg2fA",
    alt: "Coup de pied de muay thaï sur le ring d'un camp de Rawai",
  },
  {
    name: "Padel",
    promise: "Créer des liens, naturellement",
    body: "Quatre joueurs, un terrain, des fous rires. Le moyen le plus simple de connaître quelqu'un en une heure.",
  },
  {
    name: "Fitness",
    promise: "Retrouver ton énergie",
    body: "Une séance pour lancer la fin de journée et retrouver le niveau d'énergie qui va avec tes ambitions.",
  },
  {
    name: "Golf",
    promise: "Construire des relations autrement",
    body: "Le parcours idéal pour parler projets sans regarder l'heure, entre deux coups.",
  },
];

/** Autres activités proposées l'après-midi. */
export const otherSports = ["Yoga", "Pilates", "Pickleball", "Football", "Randonnée"];

/**
 * Témoignages. N'ajouter que des retours réels de participants, avec leur accord écrit.
 * Tant que la liste est vide, la section affiche le mur de l'édition fondatrice à la place.
 */
export type Testimonial = { name: string; activity: string; city: string; photo?: string; quote: string; result: string };
export const testimonials: Testimonial[] = [];

/**
 * Prix fondateur. Renseigner `nextIncrease` uniquement quand la hausse est décidée,
 * par exemple : { date: "2027-01-15", label: "Les tarifs augmentent le 15 janvier" }.
 */
export const founderPricing = {
  label: "Prix fondateur",
  note: "Tarif réservé à l'édition fondatrice.",
  nextIncrease: undefined as { date: string; label: string } | undefined,
};

/** Qualification : aide le bon visiteur à se reconnaître, et le mauvais à passer son chemin. */
export const forWho = {
  yes: [
    "Tu as un projet, une activité ou une ambition, et tu veux accélérer.",
    "Tu sens que ton entourage actuel ne te tire pas assez vers le haut.",
    "Tu es prêt à travailler le matin et à te dépasser l'après-midi.",
    "Tu veux repartir avec un plan, pas seulement des souvenirs.",
    "Tu aimes rencontrer des gens qui ne pensent pas comme toi.",
  ],
  no: [
    "Tu cherches des vacances au bord de la piscine, sans rien faire.",
    "Tu attends une formule magique sans passer à l'action.",
    "Tu n'as pas envie de partager ton projet avec le groupe.",
    "Tu préfères rester dans ta zone de confort.",
  ],
};

/** Avant / après, sans promesse chiffrée : ce que change l'environnement. */
export const comparison = [
  { topic: "Tes décisions", alone: "Tu tournes en rond pendant des semaines.", with: "Tu les confrontes aux experts et au groupe." },
  { topic: "Ton entourage", alone: "Peu de gens comprennent ce que tu construis.", with: "Vingt personnes qui avancent, comme toi." },
  { topic: "Ton énergie", alone: "Écrans, fatigue, routine.", with: "Soleil, sport, rythme sain." },
  { topic: "Ton plan", alone: "Des idées éparpillées dans des notes.", with: "Des prochaines étapes écrites et datées." },
];
