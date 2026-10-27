import type { ImageLoaderProps } from "next/image";

/**
 * Loader next/image pour les photos Unsplash : l'image est servie directement par le CDN
 * Unsplash (lien direct exigé par les règles de l'API), à la largeur demandée par le navigateur.
 */
export function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
