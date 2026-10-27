import type { Metadata } from "next";
import { photoCredits } from "@/content/photo-credits";

export const metadata: Metadata = { title: "Crédits photos", alternates: { canonical: "/credits-photos" } };

export default function CreditsPhotos() {
  return (
    <>
      <p className="eyebrow text-bordeaux">Informations légales</p>
      <h1 className="mt-6">Crédits photos</h1>
      <p>
        Certaines photos de Phuket proviennent de Wikimedia Commons et sont utilisées selon leur licence. Elles ont été
        redimensionnées pour le site.
      </p>
      <ul>
        {photoCredits.map((c) => (
          <li key={c.file}>
            <a href={c.source} target="_blank" rel="noopener noreferrer">{c.title}</a>, par {c.author || "auteur inconnu"} ·{" "}
            {c.licenseUrl ? (
              <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">{c.license}</a>
            ) : (
              c.license
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
