import type { Metadata } from "next";
import { site } from "@/content/site";
import { DraftNotice } from "../notice";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

export default function Confidentialite() {
  return (
    <>
      <p className="eyebrow text-emerald">Informations légales</p>
      <h1 className="mt-6">Politique de confidentialité</h1>
      <DraftNotice />
      <h2>Données collectées</h2>
      <p>
        Via le formulaire de réservation : prénom, nom, e-mail, téléphone, ville, profil professionnel et description de
        votre objectif. Aucune donnée bancaire n&apos;est collectée sur ce site.
      </p>
      <h2>Finalités et base légale</h2>
      <ul>
        <li>Traiter votre demande et organiser votre séjour (mesures précontractuelles et exécution du contrat).</li>
        <li>Vous informer des éditions suivantes, si vous y avez consenti.</li>
      </ul>
      <h2>Durée de conservation</h2>
      <p>Trois ans à compter du dernier contact pour les prospects ; durée légale applicable pour les clients.</p>
      <h2>Destinataires</h2>
      <p>L&apos;équipe {site.name} et ses sous-traitants techniques : [hébergeur, outil CRM, outil d&apos;e-mailing].</p>
      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition et de portabilité. Écrivez à{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également saisir la CNIL (www.cnil.fr).
      </p>
      <h2>Cookies</h2>
      <p>Ce site n&apos;utilise pas de cookie publicitaire. [À compléter si un outil de mesure d&apos;audience est ajouté.]</p>
    </>
  );
}
