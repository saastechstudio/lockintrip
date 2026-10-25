export const site = {
  name: "LOCKIN TRIP",
  shortName: "Lockin Trip",
  tagline: "L'accélérateur d'objectifs de vie.",
  description:
    "Une expérience immersive à Phuket réunissant experts, entrepreneurs et personnes ambitieuses dans un environnement conçu pour accélérer les projets qui comptent vraiment.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lockintrip.com",
  locale: "fr_FR",
  email: "contact@lockintrip.com",
  whatsapp: { display: "+33 6 52 57 76 96", href: "https://wa.me/33652577696" },
  edition: "Édition fondatrice · Phuket 2027",
  social: {
    instagram: "https://www.instagram.com/lockintrip",
    linkedin: "https://www.linkedin.com/company/lockintrip",
  },
  nav: [
    { label: "Concept", href: "/#concept" },
    { label: "Objectifs", href: "/#objectifs" },
    { label: "Experts", href: "/#experts" },
    { label: "L'hôtel", href: "/#hotel" },
    { label: "Tarifs", href: "/#tarifs" },
    { label: "FAQ", href: "/#faq" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGV", href: "/cgv" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],
} as const;
