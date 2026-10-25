export type Pillar = {
  icon: "masterclass" | "workshop" | "experts" | "network" | "sport" | "one-on-one" | "excursion" | "community";
  title: string;
  body: string;
};

export const pillars: Pillar[] = [
  {
    icon: "masterclass",
    title: "Masterclass",
    body: "Chaque matin, une session dense avec un expert qui pratique ce qu'il enseigne. Des méthodes, pas des slogans.",
  },
  {
    icon: "workshop",
    title: "Ateliers collaboratifs",
    body: "Travail en petits groupes sur vos projets réels. Vous repartez avec des décisions prises, pas des notes.",
  },
  {
    icon: "experts",
    title: "Experts",
    body: "IA, marketing, e-commerce, juridique, performance mentale : des intervenants disponibles toute la semaine.",
  },
  {
    icon: "network",
    title: "Réseau",
    body: "Vingt participants par session, sélectionnés pour la complémentarité de leurs parcours.",
  },
  {
    icon: "sport",
    title: "Activités sportives",
    body: "Muay thaï, yoga, natation au lever du jour. Un corps en mouvement pense plus clairement.",
  },
  {
    icon: "one-on-one",
    title: "Entretiens individuels",
    body: "Des créneaux privés avec les experts pour débloquer ce qui vous freine, sur votre cas précis.",
  },
  {
    icon: "excursion",
    title: "Excursion",
    body: "Une journée en mer dans la baie de Phang Nga. Prendre de la hauteur, au sens propre.",
  },
  {
    icon: "community",
    title: "Communauté",
    body: "L'accès à vie au cercle privé des anciens : rencontres, entraide et opportunités après le séjour.",
  },
];

export const rhythm = [
  { time: "06:30", label: "Mouvement", detail: "Sport au lever du soleil" },
  { time: "09:00", label: "Masterclass", detail: "Session expert" },
  { time: "12:30", label: "Déjeuner", detail: "Table partagée" },
  { time: "14:30", label: "Atelier", detail: "Travail sur vos projets" },
  { time: "17:30", label: "Entretiens", detail: "Créneaux individuels" },
  { time: "20:00", label: "Soirée", detail: "Libre ou en groupe" },
];
