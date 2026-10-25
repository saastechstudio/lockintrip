/**
 * ⚠️ TÉMOIGNAGES FICTIFS — à remplacer avant mise en ligne.
 * En France, publier de faux avis clients est une pratique commerciale trompeuse
 * (art. L121-4 du Code de la consommation). Remplacez-les par de vrais retours
 * (participants d'un pilote, bêta-testeurs, experts) ou masquez la section
 * en passant `showTestimonials` à false.
 */
export const showTestimonials = true;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "J'avais repoussé la refonte de mon offre pendant dix-huit mois. Je l'ai bouclée en quatre jours, entre deux sessions avec l'experte marketing. Le reste de l'année a changé de trajectoire.",
    name: "Thomas R.",
    role: "Fondateur d'une agence de conseil",
    location: "Lyon",
  },
  {
    quote:
      "Ce qui m'a frappée, c'est le niveau du groupe. Personne n'était là pour faire des photos. On parlait chiffres, clients, blocages réels. J'en suis repartie avec deux collaborations.",
    name: "Inès M.",
    role: "Créatrice de contenu",
    location: "Paris",
  },
  {
    quote:
      "Freelance depuis six ans, je travaillais seul. Une semaine m'a suffi pour remonter mes tarifs et structurer une offre récurrente. Le cadre fait la moitié du travail.",
    name: "Julien D.",
    role: "Développeur freelance",
    location: "Bordeaux",
  },
  {
    quote:
      "Je suis arrivé avec une idée et un fichier Excel. Je suis reparti avec un statut, des CGV, un prototype et trois personnes qui me relancent chaque mois.",
    name: "Karim B.",
    role: "Porteur de projet e-commerce",
    location: "Marseille",
  },
];
