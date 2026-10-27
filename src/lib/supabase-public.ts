/**
 * Accès public au projet Supabase « lockintrip ».
 * L'URL et la clé publishable sont faites pour être exposées : la table des réservations
 * est protégée par RLS, et le paiement passe par des Edge Functions (clé Stripe côté Supabase).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://shewnuknybqjlypyzlii.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_L0Ny-3THhw3s7uQbEuC59Q_4dSPfSQf";

export const functionUrl = (name: string) => `${SUPABASE_URL}/functions/v1/${name}`;

export const supabaseHeaders = {
  apikey: SUPABASE_PUBLISHABLE_KEY,
  "Content-Type": "application/json",
};
