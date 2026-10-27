// Webhook Stripe → met à jour le statut des réservations.
// Événements à activer dans Stripe : checkout.session.completed, checkout.session.async_payment_succeeded,
// checkout.session.async_payment_failed, checkout.session.expired.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { cryptoProvider, db, json, stripe } from "../_shared/shared.ts";

Deno.serve(async (req) => {
  const client = stripe();
  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const signature = req.headers.get("stripe-signature");
  if (!client || !secret) return json({ error: "not_configured" }, 503);
  if (!signature) return json({ error: "missing_signature" }, 400);

  let event;
  try {
    event = await client.webhooks.constructEventAsync(await req.text(), signature, secret, undefined, cryptoProvider);
  } catch (e) {
    console.error("signature", e);
    return json({ error: "invalid_signature" }, 400);
  }

  // deno-lint-ignore no-explicit-any
  const session = event.data.object as any;
  const reservationId: string | undefined = session.metadata?.reservation_id ?? session.client_reference_id;
  if (!reservationId) return json({ received: true }, 200);
  const supabase = db();

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      if (session.payment_status !== "paid") break; // paiement différé : on attend async_payment_succeeded
      const pi = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
      const { error } = await supabase
        .from("reservations")
        .update({ status: "paid", paid_at: new Date().toISOString(), stripe_payment_intent_id: pi ?? null })
        .eq("id", reservationId);
      if (error) {
        console.error("update", error);
        return json({ error: "db_error" }, 500); // Stripe réessaiera
      }
      await notifyTeam(reservationId);
      break;
    }
    case "checkout.session.async_payment_failed":
      await supabase.from("reservations").update({ status: "cancelled" }).eq("id", reservationId);
      break;
    case "checkout.session.expired":
      await supabase.from("reservations").update({ status: "expired" }).eq("id", reservationId).eq("status", "pending");
      break;
  }
  return json({ received: true }, 200);
});

/** Notification facultative de l'équipe (Zapier, Make, Slack...) via le secret RESERVATION_WEBHOOK_URL. */
async function notifyTeam(reservationId: string) {
  const url = Deno.env.get("RESERVATION_WEBHOOK_URL");
  if (!url) return;
  try {
    const { data } = await db().from("reservations").select("*").eq("id", reservationId).single();
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "reservation.paid", reservation: data }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (e) {
    console.error("notify", e);
  }
}
