"use client";

import Image, { type ImageProps } from "next/image";
import { unsplashLoader } from "@/lib/unsplash";

/**
 * `next/image` qui sert les photos Unsplash en lien direct depuis leur CDN (règle de l'API Unsplash),
 * et les photos locales par l'optimiseur Next habituel.
 */
export function Photo({ alt, ...props }: ImageProps) {
  const isUnsplash = typeof props.src === "string" && props.src.startsWith("https://images.unsplash.com/");
  return <Image alt={alt} {...props} loader={isUnsplash ? unsplashLoader : undefined} />;
}
