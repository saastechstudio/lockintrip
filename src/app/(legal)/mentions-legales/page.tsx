import type { Metadata } from "next";
import { site } from "@/content/site";
import { DraftNotice } from "../notice";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function MentionsLegales() {
  return (
    <>
      <p className="eyebrow text-bordeaux">Informations légales</p>
      <h1 className="mt-6">Mentions légales</h1>
      <DraftNotice />
      <h2>Éditeur du site</h2>
      <p>
        {site.name} — [forme juridique] au capital de [montant] €, immatriculée au RCS de [ville] sous le numéro [SIREN].
        Siège social : [adresse]. TVA intracommunautaire : [numéro].
      </p>
      <p>Directeur de la publication : [nom, prénom]. Contact : <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>Immatriculation tourisme</h2>
      <p>
        L&apos;organisation de séjours incluant transport et hébergement relève de l&apos;immatriculation au registre des
        opérateurs de voyages et de séjours (Atout France) : [numéro IM]. Garantie financière : [organisme]. Assurance
        responsabilité civile professionnelle : [assureur, numéro de contrat].
      </p>
      <h2>Hébergement</h2>
      <p>[Hébergeur — ex. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis].</p>
      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, visuels, logo, marque) est la propriété exclusive de {site.name} ou
        de ses partenaires, à l&apos;exception des photos tierces publiées sous leur propre licence (voir les crédits photos). Toute reproduction sans autorisation préalable est interdite.
      </p>
    </>
  );
}
