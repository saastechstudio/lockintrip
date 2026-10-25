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

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, Open Graph) |
| `RESERVATION_WEBHOOK_URL` | Reçoit chaque demande de réservation en JSON (Zapier, Make, Slack, CRM). **Obligatoire en production** : sans elle, l'API répond 503 au lieu de perdre la demande. |

## Modifier le contenu

Tout le texte est dans `src/content/` — aucun composant à toucher :

| Fichier | Contenu |
| --- | --- |
| `site.ts` | Nom, accroche, e-mail, réseaux sociaux, menu |
| `offers.ts` | Formules et prix |
| `sessions.ts` | Dates et places (`taken` alimente le compteur) |
| `experts.ts` | Experts (nom, rôle, photo à renseigner) |
| `concept.ts` | Les 8 piliers et la journée type |
| `faq.ts` | Questions fréquentes |
| `testimonials.ts` | Témoignages — **fictifs, à remplacer avant la mise en ligne** |
| `media.ts` | Photos et vidéo du hero |

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

- Remplacer les témoignages fictifs (ou `showTestimonials = false`).
- Compléter les pages légales (mentions entre crochets) et les faire valider ; vendre un forfait vol + hôtel suppose une immatriculation Atout France.
- Configurer `RESERVATION_WEBHOOK_URL`.
- Ajouter les vraies photos et les noms des experts.
