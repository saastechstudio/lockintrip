import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/booking-form";
import { SectionHeading } from "@/components/sections/section-heading";
import type { OfferId } from "@/content/offers";
import type { SessionId } from "@/content/sessions";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Réserver ma place",
  description: `Déposez votre demande pour l'édition fondatrice de ${site.name} à Phuket. 60 places, réponse sous 48 h.`,
  alternates: { canonical: "/reserver" },
};

const offerIds: OfferId[] = ["explorer", "all-inclusive"];
const sessionIds: SessionId[] = ["s1", "s2", "s3"];

export default async function ReserverPage({
  searchParams,
}: {
  searchParams: Promise<{ offre?: string; session?: string }>;
}) {
  const { offre, session } = await searchParams;
  const defaultOffer = offerIds.find((o) => o === offre);
  const defaultSession = sessionIds.find((s) => s === session);

  return (
    <section className="relative bg-linen pb-28 pt-36 md:pb-36 md:pt-44">
      <div className="container-lux">
        <SectionHeading
          as="h1"
          eyebrow={site.edition}
          title="Réserver ma place."
          intro="Pour garantir la qualité de chaque groupe, les places sont attribuées après un court échange. Déposez votre demande : nous vous recontactons sous 48 heures."
        />
        <div className="mt-16 md:mt-20">
          <BookingForm defaultOffer={defaultOffer} defaultSession={defaultSession} />
        </div>
      </div>
    </section>
  );
}
