/**
 * Photos de l'hôtel (étalonnées pour la charte, dans /public/images/hotel).
 * Les légendes décrivent ce que montre la photo : ne pas y ajouter de promesse
 * (vue mer, taille de piscine...) qui ne serait pas vérifiée.
 */
export type HotelPhoto = { src: string; alt: string; caption: string; width: number; height: number };

export const hotelPhotos: HotelPhoto[] = [
  { src: "/images/hotel/piscine-facade.jpg", alt: "Longue piscine bordée de palmiers devant la façade blanche de l'hôtel", caption: "La piscine", width: 1206, height: 791 },
  { src: "/images/hotel/piscine-jardin.jpg", alt: "Piscine à débordement longeant un jardin tropical et ses transats", caption: "Le jardin tropical", width: 1206, height: 796 },
  { src: "/images/hotel/chambre-jardin.jpg", alt: "Chambre lumineuse aux murs de béton ciré, ouverte sur la piscine et la végétation", caption: "Chambre côté piscine", width: 1206, height: 786 },
  { src: "/images/hotel/chambre-balcon.jpg", alt: "Chambre contemporaine avec banquette et balcon donnant sur les arbres", caption: "Chambre avec balcon", width: 1206, height: 779 },
  { src: "/images/hotel/salle-de-bain.jpg", alt: "Salle de bain avec baignoire en pierre et vasque posée", caption: "Salle de bain en pierre", width: 1206, height: 779 },
];

export const hotelHighlights = [
  "7 nuits en chambre partagée",
  "Petit-déjeuner et déjeuner chaque jour",
  "Piscine et jardin tropical",
  "Espaces calmes pour travailler",
];
