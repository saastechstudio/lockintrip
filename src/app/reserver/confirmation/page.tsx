import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOffer, type OfferId } from "@/content/offers";
import { editionYear, sessions } from "@/content/sessions";
import { site } from "@/content/site";
import { functionUrl, supabaseHeaders } from "@/lib/supabase-public";
import { formatDay, formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Confirmation", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ConfirmationPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let paid = false;
  let firstName: string | null = null;
  let offerId: OfferId | undefined;
  let sessionId: string | undefined;

  if (session_id) {
    try {
      const res = await fetch(`${functionUrl("checkout-status")}?session_id=${encodeURIComponent(session_id)}`, {
        headers: supabaseHeaders,
        cache: "no-store",
      });
      const data = (await res.json()) as { ok?: boolean; paid?: boolean; firstName?: string | null; offer?: string; session?: string };
      if (data.ok) {
        paid = Boolean(data.paid);
        firstName = data.firstName ?? null;
        offerId = (data.offer ?? undefined) as OfferId | undefined;
        sessionId = data.session ?? undefined;
      }
    } catch (error) {
      console.error("[confirmation] statut de paiement indisponible", error);
    }
  }

  const offer = offerId ? getOffer(offerId) : undefined;
  const session = sessions.find((s) => s.id === sessionId);

  return (
    <section className="tex-travertine relative min-h-[80svh] bg-pierre/45 pb-28 pt-40">
      <div className="container-lux">
        <div className="card-lux mx-auto max-w-2xl p-10 text-center md:p-16">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-bordeaux text-ivory">
            {paid ? <Check className="size-7" strokeWidth={1.5} /> : <Clock className="size-7" strokeWidth={1.5} />}
          </span>
          <h1 className="font-display mt-8 text-4xl font-light text-ink md:text-5xl">
            {paid ? `Bienvenue dans le cercle${firstName ? `, ${firstName}` : ""}.` : "Paiement en cours de validation."}
          </h1>
          {offer && session && (
            <p className="mt-5 text-ink-soft">
              {offer.name} · {session.label} · {formatDay(session.start)} → {formatDay(session.end)} {editionYear} ·{" "}
              {formatPrice(offer.price)}
            </p>
          )}
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
            {paid
              ? "Ta place est confirmée. Ta facture et ton reçu arrivent par e-mail, puis l'invitation au groupe privé avant le séjour."
              : "Ta banque confirme le paiement. Tu recevras un e-mail dès qu'il sera validé ; si besoin, contacte-nous."}
          </p>
          <p className="mt-6 text-sm text-muted">
            Une question ?{" "}
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">WhatsApp</a>{" "}
            ou <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">{site.email}</a>
          </p>
          <Button asChild variant="outline" className="mt-10">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
