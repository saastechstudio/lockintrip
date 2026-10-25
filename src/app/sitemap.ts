import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/reserver`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...site.legal.map((l) => ({ url: `${site.url}${l.href}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
