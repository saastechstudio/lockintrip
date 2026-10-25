import type { Metadata } from "next";
import { offers } from "@/content/offers";
import { formatPrice } from "@/lib/utils";
import { DraftNotice } from "../notice";

export const metadata: Metadata = { title: "Conditions générales de vente", alternates: { canonical: "/cgv" } };

export default function Cgv() {
  return (
    <>
      <p className="eyebrow text-bordeaux">Informations légales</p>
      <h1 className="mt-6">Conditions générales de vente</h1>
      <DraftNotice />
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent la vente des séjours LOCKIN TRIP. Elles s&apos;appliquent conformément aux
        dispositions du Code du tourisme relatives aux forfaits touristiques (articles L211-1 et suivants).
      </p>
      <h2>2. Formules et prix</h2>
      <ul>
        {offers.map((o) => (
          <li key={o.id}>
            {o.name} : {formatPrice(o.price)} TTC par personne. {o.excludes?.join(", ") ?? ""}
          </li>
        ))}
      </ul>
      <p>Les prix incluent les prestations listées sur la page Tarifs du site au jour de la réservation.</p>
      <h2>3. Réservation et paiement</h2>
      <p>
        Le prix total est réglé en ligne au moment de la réservation, par l&apos;intermédiaire du prestataire de paiement
        sécurisé Stripe. La réservation est ferme dès la validation du paiement ; une facture est adressée par e-mail.
      </p>
      <h2>4. Annulation et report</h2>
      <p>[Barème d&apos;annulation par le participant selon la date, conditions de report, annulation par l&apos;organisateur.]</p>
      <h2>5. Responsabilité et assurances</h2>
      <p>[Garantie financière, responsabilité de plein droit, assurances recommandées : annulation, rapatriement.]</p>
      <h2>6. Formalités</h2>
      <p>Chaque participant est responsable de la validité de ses documents de voyage (passeport, conditions d&apos;entrée).</p>
      <h2>7. Réclamations et médiation</h2>
      <p>[Adresse de réclamation, médiateur du tourisme et du voyage — www.mtv.travel.]</p>
    </>
  );
}
