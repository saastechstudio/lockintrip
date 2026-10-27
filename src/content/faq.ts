export type FaqGroup = { title: string; items: { q: string; a: string }[] };

export const faq: FaqGroup[] = [
  {
    title: "Avant de réserver",
    items: [
      {
        q: "Puis-je venir seul ?",
        a: "Oui. Les masterclass, le travail en groupe et les activités de l'après-midi permettent de faire connaissance avec le groupe dès les premiers jours.",
      },
      {
        q: "Faut-il être entrepreneur ?",
        a: "Non. Freelances, créateurs, étudiants, sportifs, salariés en reconversion ou porteurs d'idée : le point commun n'est pas le statut, c'est l'envie d'avancer sur un objectif précis. Le programme s'adapte à ton étape.",
      },
      {
        q: "Quel niveau est nécessaire pour participer ?",
        a: "Aucun prérequis. Tu as besoin d'un objectif — même encore flou — et de l'envie de t'engager pendant une semaine. L'entretien d'entrée sert justement à clarifier ce que tu veux accomplir et à adapter ton parcours.",
      },
      {
        q: "Faut-il être sportif ?",
        a: "Non. Chaque après-midi, de 15 h à 17 h, tu choisis ton activité (football, pilates, yoga, padel, pickleball, golf, randonnée, muay thaï, fitness). Elles sont ouvertes à tous les niveaux, même grand débutant : c'est l'occasion de découvrir un sport.",
      },
      {
        q: "À qui s'adresse l'expérience ?",
        a: "Aux personnes ambitieuses de 22 à 45 ans qui veulent accélérer : lancer, développer, gagner en revenus, en discipline ou en clarté. Les profils variés font la richesse du groupe.",
      },
    ],
  },
  {
    title: "Ce qui est inclus",
    items: [
      {
        q: "Comment se déroule une journée ?",
        a: "Petit-déjeuner à l'hôtel de 7 h à 9 h. Masterclass et travail en groupe de 10 h à 12 h. Déjeuner au restaurant à midi. Activité au choix de 15 h à 17 h. À partir de 17 h, le temps est libre pour tous.",
      },
      {
        q: "Suis-je accompagné pendant le séjour ?",
        a: "Oui. Chaque session réunit 20 personnes, ce qui permet un vrai suivi personnalisé de chaque participant. Tu es encadré et accompagné à chaque étape du séjour, en dehors des temps libres.",
      },
      {
        q: "L'assurance voyage est-elle incluse ?",
        a: "Oui. L'assurance voyage est incluse dans le tarif, quelle que soit la formule choisie.",
      },
      {
        q: "Les transports sont-ils compris ?",
        a: "Oui. Le transport de l'aéroport à l'hôtel et tous les déplacements du séjour sont compris, y compris pour l'excursion.",
      },
      {
        q: "Que se passe-t-il à la fin du séjour ?",
        a: "Une excursion est prévue pendant la semaine, et la soirée de clôture a lieu à bord d'un catamaran. D'autres surprises sont incluses.",
      },
      {
        q: "Les repas sont-ils inclus ?",
        a: "Le petit-déjeuner (de 7 h à 9 h, à l'hôtel) et le déjeuner (à midi, au restaurant) sont inclus. À partir de 17 h, le temps est libre pour tous : les dîners ne sont pas compris.",
      },
      {
        q: "Les vols sont-ils inclus ?",
        a: "Le vol aller-retour depuis la France est inclus dans la formule Explorer + vol. Avec la formule Explorer, tu réserves ton vol toi-même. Dans les deux formules, le transport de l'aéroport à l'hôtel et pour tous les déplacements du séjour est compris.",
      },
      {
        q: "Comment se déroule l'hébergement ?",
        a: "Les participants d'une session logent dans le même hôtel, en chambre partagée, pendant 6 nuits (7 jours sur place). Le petit-déjeuner est servi à l'hôtel.",
      },
      {
        q: "Que contient le plan d'action personnalisé ?",
        a: "Construit lors de l'entretien de sortie, il reprend ton objectif, les décisions prises pendant la semaine et les prochaines étapes. La communauté privée t'accompagne ensuite.",
      },
    ],
  },
  {
    title: "Paiement et réservation",
    items: [
      {
        q: "Comment se passe le paiement ?",
        a: "Directement en ligne au moment de la réservation, par carte bancaire, Apple Pay ou Google Pay, sur la page sécurisée de Stripe. Tu peux aussi régler en 3 ou 4 fois avec Klarna, directement sur cette page. Ta place est confirmée dès le paiement validé et ta facture t'est envoyée automatiquement par e-mail.",
      },
      {
        q: "Comment se passe la réservation ?",
        a: "Tu choisis ta formule et ta session, tu remplis tes informations en deux minutes, puis tu règles ta place en ligne. Tu reçois immédiatement ta confirmation et ta facture, puis l'invitation au groupe privé avant le séjour.",
      },
      {
        q: "Mon entreprise peut-elle prendre en charge le séjour ?",
        a: "Oui. Au moment du paiement, tu peux indiquer le nom et le numéro de TVA de ta société : la facture est établie à son nom. Rapproche-toi de ton expert-comptable pour son traitement.",
      },
      {
        q: "Et si je dois annuler ?",
        a: "Un report sur une autre session ou une édition suivante est possible selon les disponibilités. Les conditions détaillées figurent dans les CGV ; une assurance annulation est recommandée.",
      },
    ],
  },
];
