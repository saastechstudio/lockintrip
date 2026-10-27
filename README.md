# LOCKIN TRIP

Site officiel de LOCKIN TRIP — *L'accélérateur d'objectifs de vie.*

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · composants shadcn/ui (Radix) · Framer Motion · Lucide · React Hook Form + Zod.

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build      # build de production (types + lint inclus)
```

## Paiement (Stripe via Supabase)

Le paiement total se fait en ligne à la réservation. Aucune clé secrète n'est stockée dans le site :

1. Le formulaire `/reserver` appelle l'Edge Function Supabase `create-checkout`, qui enregistre la réservation
   (table `reservations`, statut `pending`) et ouvre une page de paiement Stripe Checkout.
2. Stripe appelle l'Edge Function `stripe-webhook`, qui passe la réservation en `paid`.
3. Le client revient sur `/reserver/confirmation`, qui lit le statut via `checkout-status`.
4. Stripe génère la facture et l'envoie par e-mail au client.

Le compteur de places du site lit les réservations payées (rafraîchi toutes les 60 s).
Code des fonctions : `supabase/functions/`. Les prix et dates y sont dupliqués dans `_shared/shared.ts` :
à mettre à jour avec `src/content/` en cas de changement, puis redéployer.

### Mise en service

Dans Supabase → Project Settings → Edge Functions → Secrets :

| Secret | Valeur |
| --- | --- |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_live_…`, ou `sk_test_…` pour tester) |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature du webhook (`whsec_…`, étape suivante) |
| `SITE_URL` | URL publique du site, ex. `https://lockintrip.com` (retour après paiement) |
| `RESERVATION_WEBHOOK_URL` | Facultatif : notification de l'équipe à chaque paiement (Zapier, Make, Slack…) |

Dans Stripe → Développeurs → Webhooks → Ajouter un endpoint :
- URL : `https://shewnuknybqjlypyzlii.supabase.co/functions/v1/stripe-webhook`
- Événements : `checkout.session.completed`, `checkout.session.async_payment_succeeded`,
  `checkout.session.async_payment_failed`, `checkout.session.expired`

Dans Stripe → Paramètres :
- **Factures** : renseigner raison sociale, adresse, SIRET, numéro de TVA et mentions légales.
- **E-mails clients** : activer l'envoi des reçus et des factures pour les paiements réussis.

## Variables d'environnement (site)

Aucune n'est obligatoire. `NEXT_PUBLIC_SITE_URL` sert au SEO ; voir `.env.example`.

## Modifier le contenu

Tout le texte est dans `src/content/` — aucun composant à toucher :

| Fichier | Contenu |
| --- | --- |
| `site.ts` | Nom, accroche, e-mail, réseaux sociaux, menu |
| `offers.ts` | Formules et prix |
| `sessions.ts` | Dates et places (`taken` alimente le compteur) |
| `experts.ts` | Experts (nom, rôle, photo à renseigner) |
| `concept.ts` | Les 6 piliers, la journée type et les freins de la section « constat » |
| `goals.ts` | Les 6 objectifs (chaque carte pré-remplit le formulaire de réservation) |
| `faq.ts` | Questions fréquentes |
| `media.ts` | Photos et vidéo du hero |

## Parcours de conversion

- Appels à réserver dans le hero, le constat, chaque carte objectif, les tarifs, chaque session et le CTA final.
- Barre de réservation persistante (places restantes, prix d'appel) visible après le hero, masquée au CTA final.
- Liens profonds vers `/reserver` : `?offre=explorer|all-inclusive`, `?session=s1|s2|s3`, `?objectif=lancer|developper|revenus|discipline|reseau|direction`.
- Réassurance sous les tarifs : paiement en plusieurs fois, réponse sous 48 h, aucun paiement à la demande.

## Photos

Tant qu'aucune photo n'est fournie, le site affiche des visuels d'ambiance générés (eau vert sauge aux reflets animés, enduit à la chaux et ombres de palmes). Déposez vos fichiers dans `public/images/` (ou `public/videos/` pour le hero) et renseignez les chemins dans `src/content/media.ts`.

## Structure

```
src/
  app/            routes, layout, SEO (sitemap, robots, OG image, manifest), API réservation
  components/
    layout/       header, footer, logo
    sections/     sections de la page d'accueil
    booking/      formulaire de réservation
    visuals/      visuels générés (eau, palmes, scènes)
    motion/       animations d'apparition
    ui/           primitives (button, accordion, input…)
  content/        tout le contenu éditable
  lib/            utilitaires, schéma Zod, JSON-LD
```

## Avant la mise en ligne

- Compléter les pages légales (mentions entre crochets) et les faire valider ; vendre un forfait vol + hôtel suppose une immatriculation Atout France.
- Ajouter les secrets Stripe dans Supabase et créer le webhook Stripe (voir « Paiement »).
- Ajouter les vraies photos et les noms des experts.
