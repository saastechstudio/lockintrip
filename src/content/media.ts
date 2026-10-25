/**
 * Emplacements photo / vidéo du site.
 *
 * Tant qu'un `src` est vide, le site affiche un visuel d'ambiance généré
 * (eau sauge, enduit et ombres de palmes) dans la palette de la marque.
 * Déposez vos fichiers dans /public/images ou /public/videos et renseignez le chemin,
 * par exemple : src: "/images/hero.jpg". Formats conseillés : JPG/AVIF 2400 px de large.
 */
export type MediaSlot = {
  src?: string;
  alt: string;
};

export const media = {
  hero: {
    video: undefined as string | undefined, // ex. "/videos/hero.mp4" (muet, en boucle, < 8 Mo)
    poster: { src: undefined, alt: "Piscine d'une villa à Phuket au lever du jour" } as MediaSlot,
  },
  why: { src: undefined, alt: "Deux participants échangent au bord de la piscine" } as MediaSlot,
  phuket: [
    { src: undefined, alt: "Plage de Phuket au coucher du soleil" },
    { src: undefined, alt: "Patio de la villa entre murs de pierre et cocotiers" },
    { src: undefined, alt: "Séance de sport au lever du soleil" },
    { src: undefined, alt: "Dîner en terrasse face à la mer d'Andaman" },
  ] as MediaSlot[],
  final: { src: undefined, alt: "Coucher de soleil sur la mer d'Andaman, Phuket" } as MediaSlot,
};
