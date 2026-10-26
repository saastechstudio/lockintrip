// Code partagé des Edge Functions LOCKIN TRIP.
// ⚠️ Prix et sessions dupliqués depuis src/content/offers.ts et src/content/sessions.ts :
// toute modification de prix ou de dates doit être reportée ici, puis les fonctions redéployées.
import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

export const OFFERS = {
  explorer: { name: "Explorer", price: 1990 },
  "all-inclusive": { name: "All Inclusive", price: 2590 },
} as const;

export const SESSIONS = {
  s1: { label: "Session 1", dates: "14 mars → 21 mars 2027", capacity: 20 },
  s2: { label: "Session 2", dates: "21 mars → 28 mars 2027", capacity: 20 },
  s3: { label: "Session 3", dates: "28 mars → 4 avril 2027", capacity: 20 },
} as const;

export type OfferId = keyof typeof OFFERS;
export type SessionId = keyof typeof SESSIONS;

export function stripe(): Stripe | null {
  const key = Deno.env.get("STRIPE_SECRET_KEY");
  if (!key) return null;
  return new Stripe(key, { httpClient: Stripe.createFetchHttpClient(), appInfo: { name: "lockintrip" } });
}

export const cryptoProvider = Stripe.createSubtleCryptoProvider();

/** Client service_role (variables injectées automatiquement par Supabase). */
export function db() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const DEFAULT_ORIGINS = ["http://localhost:3000", "http://localhost:3100"];

/** Origines autorisées : SITE_URL + ALLOWED_ORIGINS (séparées par des virgules) + déploiements Vercel du projet. */
export function allowedOrigin(req: Request): string | null {
  const origin = req.headers.get("origin");
  if (!origin) return null;
  const list = [
    ...DEFAULT_ORIGINS,
    ...(Deno.env.get("SITE_URL") ? [Deno.env.get("SITE_URL")!] : []),
    ...(Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
  ];
  if (list.includes(origin)) return origin;
  if (/^https:\/\/lockintrip[a-z0-9-]*\.vercel\.app$/.test(origin)) return origin;
  if (/^https:\/\/lockintrip[a-z0-9-]*\.onrender\.com$/.test(origin)) return origin;
  return null;
}

export function cors(origin: string | null): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin ?? "null",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    Vary: "Origin",
  };
}

export function json(body: unknown, status: number, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
