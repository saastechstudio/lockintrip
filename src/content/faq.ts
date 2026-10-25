export type FaqGroup = { title: string; items: { q: string; a: string }[] };

export const faq: FaqGroup[] = [
  {
    title: "Avant de réserver",
    items: [
      {
        q: "Puis-je venir seul ?",
        a: "Oui, et c'est le cas de la grande majorité des participants. Le groupe privé avant séjour, le premier dîner et les ateliers en petits groupes sont pensés pour que personne ne reste seul plus de quelques heures. Tu arrives seul, tu repars avec un réseau.",
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
        a: "Non. Les activités de l'après-midi (football, pilates, yoga, padel, pickleball, golf, randonnée, muay thaï, fitness) sont ouvertes à tous les niveaux, même grand débutant. C'est l'occasion idéale de découvrir un sport, à ton rythme. Rien n'est obligatoire.",
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
        q: "Les repas sont-ils inclus ?",
        a: "Le petit-déjeuner et le déjeuner sont inclus chaque jour, dans les deux formules. Les dîners sont libres pour découvrir Phuket à ton rythme, avec plusieurs dîners de groupe organisés dans la semaine.",
      },
      {
        q: "Les vols sont-ils inclus ?",
        a: "Dans la formule All Inclusive, oui : vol aller-retour depuis la France, transferts aéroport et assistance voyage. Dans la formule Explorer, tu réserves ton vol toi-même — idéal si tu pars d'ailleurs, utilises des miles ou prolonges ton séjour en Asie.",
      },
      {
        q: "Comment se déroule l'hébergement ?",
        a: "Tous les participants d'une session logent dans le même hôtel de standing, à quelques minutes de la plage, avec piscine et espaces de travail. Les chambres sont partagées par deux, entre participants du même genre. Une chambre individuelle peut être proposée en option, selon disponibilités.",
      },
      {
        q: "Que contient le plan d'action personnalisé ?",
        a: "Construit lors de l'entretien de sortie, il reprend ton objectif, les décisions prises pendant la semaine et les étapes concrètes des 90 jours suivants. La communauté privée t'aide ensuite à t'y tenir.",
      },
    ],
  },
  {
    title: "Paiement et réservation",
    items: [
      {
        q: "Puis-je payer en plusieurs fois ?",
        a: "Oui, en 3 ou 4 fois sans frais. Ta place est bloquée dès le premier versement.",
      },
      {
        q: "Comment se passe la réservation ?",
        a: "Tu déposes ta demande en deux minutes. Nous t'appelons sous 48 h pour un échange de quinze minutes, puis ta place est confirmée par le premier paiement. Cette étape garantit un groupe engagé et complémentaire.",
      },
      {
        q: "Mon entreprise peut-elle prendre en charge le séjour ?",
        a: "Le programme ayant une forte dimension professionnelle, une facture au nom de ta société peut être émise. Rapproche-toi de ton expert-comptable pour son traitement.",
      },
      {
        q: "Et si je dois annuler ?",
        a: "Un report sur une autre session ou une édition suivante est possible selon les disponibilités. Les conditions détaillées figurent dans les CGV ; une assurance annulation est recommandée.",
      },
    ],
  },
];
