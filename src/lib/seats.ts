import "server-only";
import { sessions as baseSessions, type Session, type SessionId } from "@/content/sessions";
import { SUPABASE_URL, supabaseHeaders } from "./supabase-public";

/**
 * Sessions avec le nombre de places payées (lu dans Supabase, rafraîchi toutes les 60 s).
 * La valeur `taken` de content/sessions.ts sert de minimum (ventes hors ligne) et de repli si Supabase est indisponible.
 */
export async function getSessions(): Promise<Session[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/seats_taken`, {
      method: "POST",
      headers: supabaseHeaders,
      body: "{}",
      next: { revalidate: 60, tags: ["seats"] },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as { session: SessionId; taken: number }[];
    const taken = Object.fromEntries(rows.map((r) => [r.session, Number(r.taken)]));
    return baseSessions.map((s) => ({ ...s, taken: Math.max(s.taken, taken[s.id] ?? 0) }));
  } catch (error) {
    console.error("[seats] lecture Supabase impossible", error);
    return baseSessions;
  }
}
