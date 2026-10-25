import { NextResponse } from "next/server";
import { reservationSchema } from "@/lib/reservation-schema";

/**
 * Reçoit une demande de réservation, la valide côté serveur et la transmet
 * au webhook configuré (RESERVATION_WEBHOOK_URL : Zapier, Make, Slack, CRM...).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload", issues: parsed.error.issues }, { status: 422 });
  }

  // Champ piège rempli : on répond comme un succès sans rien transmettre.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { website: _honeypot, ...reservation } = parsed.data;
  void _honeypot;
  const payload = { ...reservation, receivedAt: new Date().toISOString(), source: "lockintrip.com" };

  const webhook = process.env.RESERVATION_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
    } catch (error) {
      console.error("[reservation] webhook failed", error);
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // En production, on refuse plutôt que de perdre une demande en silence.
    console.error("[reservation] RESERVATION_WEBHOOK_URL manquante : demande non transmise");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  } else {
    console.info("[reservation] (dev) demande reçue", { offer: payload.offer, session: payload.session });
  }

  return NextResponse.json({ ok: true });
}
