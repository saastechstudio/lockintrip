// Crée la réservation (statut « pending ») puis une session Stripe Checkout pour le montant total.
// Une facture Stripe est générée et envoyée par e-mail au client après paiement.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { allowedOrigin, cors, db, json, OFFERS, SESSIONS, stripe, type OfferId, type SessionId } from "../_shared/shared.ts";

const PROFILES = [
  "Entrepreneur", "Freelance", "Créateur·rice de contenu", "Porteur·se de projet", "Étudiant·e",
  "Sportif·ve", "Digital nomad", "En reconversion", "Salarié·e", "Autre",
];

type Input = {
  offer: OfferId; session: SessionId; firstName: string; lastName: string; email: string;
  phone: string; city: string; profile: string; goal: string; consent: boolean; website?: string;
};

function validate(b: Record<string, unknown>): Input | string {
  const s = (k: string, min: number, max: number) => {
    const v = typeof b[k] === "string" ? (b[k] as string).trim() : "";
    return v.length >= min && v.length <= max ? v : null;
  };
  if (!(typeof b.offer === "string" && b.offer in OFFERS)) return "offer";
  if (!(typeof b.session === "string" && b.session in SESSIONS)) return "session";
  const firstName = s("firstName", 2, 60), lastName = s("lastName", 2, 60), city = s("city", 2, 80);
  const email = s("email", 5, 120), phone = s("phone", 8, 24), goal = s("goal", 10, 1200);
  if (!firstName || !lastName || !city || !goal) return "fields";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "email";
  if (!phone || !/^[+\d][\d\s().-]+$/.test(phone)) return "phone";
  if (typeof b.profile !== "string" || !PROFILES.includes(b.profile)) return "profile";
  if (b.consent !== true) return "consent";
  return {
    offer: b.offer as OfferId, session: b.session as SessionId, firstName, lastName,
    email: email.toLowerCase(), phone, city, profile: b.profile, goal, consent: true,
    website: typeof b.website === "string" ? b.website : "",
  };
}

Deno.serve(async (req) => {
  const origin = allowedOrigin(req);
  const headers = cors(origin);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, headers);
  if (!origin) return json({ ok: false, error: "origin_not_allowed" }, 403, headers);

  const client = stripe();
  if (!client) return json({ ok: false, error: "not_configured" }, 503, headers);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400, headers);
  }
  const input = validate(body);
  if (typeof input === "string") return json({ ok: false, error: "invalid_payload", field: input }, 422, headers);
  if (input.website) return json({ ok: false, error: "rejected" }, 400, headers);

  const offer = OFFERS[input.offer];
  const session = SESSIONS[input.session];
  const supabase = db();

  // Capacité : paiements validés + paiements en cours (< 35 min).
  const since = new Date(Date.now() - 35 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from("reservations")
    .select("id", { count: "exact", head: true })
    .eq("session", input.session)
    .or(`status.eq.paid,and(status.eq.pending,created_at.gte.${since})`);
  if (countError) {
    console.error("count", countError);
    return json({ ok: false, error: "db_error" }, 500, headers);
  }
  if ((count ?? 0) >= session.capacity) return json({ ok: false, error: "session_full" }, 409, headers);

  const { data: reservation, error } = await supabase
    .from("reservations")
    .insert({
      offer: input.offer, session: input.session, first_name: input.firstName, last_name: input.lastName,
      email: input.email, phone: input.phone, city: input.city, profile: input.profile, goal: input.goal,
      amount_eur: offer.price,
    })
    .select("id")
    .single();
  if (error || !reservation) {
    console.error("insert", error);
    return json({ ok: false, error: "db_error" }, 500, headers);
  }

  const site = Deno.env.get("SITE_URL") ?? origin;
  try {
    const checkout = await client.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      customer_email: input.email,
      client_reference_id: reservation.id,
      metadata: { reservation_id: reservation.id, offer: input.offer, session: input.session },
      payment_intent_data: { metadata: { reservation_id: reservation.id } },
      billing_address_collection: "required",
      tax_id_collection: { enabled: true },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `LOCKIN TRIP — ${offer.name} · ${session.label} (${session.dates}) · Phuket`,
          metadata: { reservation_id: reservation.id },
          footer: "Merci pour ta confiance. Contact : contact@lockintrip.com",
        },
      },
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: offer.price * 100,
          product_data: { name: `LOCKIN TRIP — ${offer.name}`, description: `${session.label} · ${session.dates} · Phuket` },
        },
      }],
      success_url: `${site}/reserver/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/reserver?offre=${input.offer}&session=${input.session}&annule=1`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });
    await supabase.from("reservations").update({ stripe_checkout_session_id: checkout.id }).eq("id", reservation.id);
    return json({ ok: true, url: checkout.url }, 200, headers);
  } catch (e) {
    console.error("stripe", e);
    await supabase.from("reservations").update({ status: "cancelled" }).eq("id", reservation.id);
    return json({ ok: false, error: "checkout_failed" }, 502, headers);
  }
});
