import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/booking-form";
import { SectionHeading } from "@/components/sections/section-heading";
import type { OfferId } from "@/content/offers";
import type { SessionId } from "@/content/sessions";
import { getSessions } from "@/lib/seats";
import { site } from "@/content/site";
import { findGoal } from "@/content/goals";

export const metadata: Metadata = {
  title: "Réserver ma place",
  description: `Réserve ta place pour l'édition fondatrice de ${site.name} à Phuket. 60 places, paiement sécurisé.`,
  alternates: { canonical: "/reserver" },
};

const offerIds: OfferId[] = ["explorer", "all-inclusive"];
const sessionIds: SessionId[] = ["s1", "s2", "s3"];

export default async function ReserverPage({
  searchParams,
}: {
  searchParams: Promise<{ offre?: string; session?: string; objectif?: string; annule?: string }>;
}) {
  const { offre, session, objectif, annule } = await searchParams;
  const sessions = await getSessions();
  const goal = findGoal(objectif);
  const defaultOffer = offerIds.find((o) => o === offre);
  const defaultSession = sessionIds.find((s) => s === session);

  return (
    <section className="relative bg-pierre/45 tex-travertine pb-28 pt-36 md:pb-36 md:pt-44">
      <div className="container-lux">
        <SectionHeading
          as="h1"
          eyebrow={site.edition}
          title="Réserver ma place."
          intro="Choisis ta formule et ta session, renseigne tes informations, puis règle ta place en ligne en toute sécurité. Ta place est confirmée dès le paiement validé, facture à l'appui."
        />
        <div className="mt-16 md:mt-20">
          <BookingForm sessions={sessions} cancelled={annule === "1"} defaultOffer={defaultOffer} defaultSession={defaultSession} defaultGoal={goal ? `Mon objectif : ${goal.title.toLowerCase()}. ` : undefined} />
        </div>
      </div>
    </section>
  );
}
