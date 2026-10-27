export type Goal = {
  id: string;
  icon: "rocket" | "growth" | "income" | "discipline" | "network" | "direction";
  title: string;
  body: string;
  stat: string;
};

/** Les objectifs proposés. Cliquer sur une carte ouvre la réservation avec l'objectif pré-rempli. */
export const goals: Goal[] = [
  { id: "lancer", icon: "rocket", title: "Lancer un projet", body: "Passer de l'idée au premier client, avec une offre claire et un plan de lancement.", stat: "De l'idée au lancement" },
  { id: "developper", icon: "growth", title: "Développer une activité", body: "Structurer ce qui fonctionne déjà pour franchir le palier suivant.", stat: "Du palier au suivant" },
  { id: "revenus", icon: "income", title: "Améliorer ses revenus", body: "Revoir son positionnement, ses prix et ses sources de revenus.", stat: "Positionnement et pricing" },
  { id: "discipline", icon: "discipline", title: "Gagner en discipline", body: "Installer des routines de focus et d'énergie qui tiennent dans la durée.", stat: "Focus, énergie, constance" },
  { id: "reseau", icon: "network", title: "Développer son réseau", body: "Rencontrer des personnes qui ouvrent des portes, et rester en lien après.", stat: "Des liens qui comptent" },
  { id: "direction", icon: "direction", title: "Clarifier sa direction", body: "Prendre du recul pour choisir, enfin, le cap des prochaines années.", stat: "Un cap pour les années à venir" },
];

export const findGoal = (id?: string) => goals.find((g) => g.id === id);
