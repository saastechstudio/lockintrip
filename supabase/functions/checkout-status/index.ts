// Statut d'un paiement pour la page de confirmation (aucune donnée sensible renvoyée).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { allowedOrigin, cors, json, stripe } from "../_shared/shared.ts";

Deno.serve(async (req) => {
  const headers = cors(allowedOrigin(req));
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  const id = new URL(req.url).searchParams.get("session_id");
  const client = stripe();
  if (!client) return json({ ok: false, error: "not_configured" }, 503, headers);
  if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id)) return json({ ok: false, error: "invalid_id" }, 400, headers);
  try {
    const s = await client.checkout.sessions.retrieve(id);
    return json({
      ok: true,
      paid: s.payment_status === "paid",
      firstName: s.customer_details?.name?.split(" ")[0] ?? null,
      offer: s.metadata?.offer ?? null,
      session: s.metadata?.session ?? null,
    }, 200, headers);
  } catch {
    return json({ ok: false, error: "not_found" }, 404, headers);
  }
});
