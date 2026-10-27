/**
 * Emplacements photo / vidéo du site.
 *
 * Tant qu'un `src` est vide, le site affiche un visuel d'ambiance généré
 * (béton ciré, travertin, eau de bassin, ombres de palmes) dans la palette de la marque.
 * Déposez vos fichiers dans /public/images ou /public/videos et renseignez le chemin,
 * par exemple : src: "/images/hero.jpg". Formats conseillés : JPG/AVIF 2400 px de large.
 *
 * DIRECTION PHOTO — un club privé, pas un séminaire.
 * À rechercher : villas contemporaines en béton et pierre, lumière rasante, piscines
 * à débordement, coworking haut de gamme, conversations naturelles entre participants,
 * muay thaï en salle épurée, padel, fitness au lever du jour, couchers de soleil,
 * architecture béton moderne. Peu de personnes par image, cadrages larges, tons chauds
 * et désaturés, grain léger.
 * À éviter : poignées de main en costume, sourires posés face caméra, open spaces
 * génériques, écrans d'ordinateur en gros plan, couleurs saturées, banques d'images.
 */
export type MediaSlot = {
  src?: string;
  alt: string;
};

export const media = {
  hero: {
    video: undefined as string | undefined, // ex. "/videos/hero.mp4" (muet, en boucle, < 8 Mo)
    poster: { src: "/images/phuket/ya-nui.jpg", alt: "Crique de Ya Nui, au sud de Phuket, vue depuis la colline" } as MediaSlot,
  },
  why: { src: "/images/lagon-phi-phi.jpg", alt: "Lagon turquoise entre des falaises karstiques couvertes de jungle" } as MediaSlot,
  final: { src: "/images/phuket/nai-harn-coucher.jpg", alt: "Coucher de soleil sur la plage de Nai Harn, Phuket" } as MediaSlot,
};
