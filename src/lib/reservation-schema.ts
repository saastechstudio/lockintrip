import { z } from "zod";

export const profiles = [
  "Entrepreneur",
  "Freelance",
  "Créateur·rice de contenu",
  "Porteur·se de projet",
  "Cadre / salarié·e",
  "Autre",
] as const;

export const reservationSchema = z.object({
  offer: z.enum(["explorer", "all-inclusive"], { message: "Choisissez une formule." }),
  session: z.enum(["s1", "s2", "s3"], { message: "Choisissez une session." }),
  firstName: z.string().trim().min(2, "Indiquez votre prénom.").max(60),
  lastName: z.string().trim().min(2, "Indiquez votre nom.").max(60),
  email: z.email("Adresse e-mail invalide.").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "Numéro de téléphone invalide.")
    .max(24)
    .regex(/^[+\d][\d\s().-]+$/, "Numéro de téléphone invalide."),
  city: z.string().trim().min(2, "Indiquez votre ville.").max(80),
  profile: z.enum(profiles, { message: "Sélectionnez votre profil." }),
  goal: z
    .string()
    .trim()
    .min(30, "Décrivez votre objectif en quelques phrases (30 caractères minimum).")
    .max(1200, "1 200 caractères maximum."),
  consent: z.literal(true, { message: "Votre accord est nécessaire pour traiter la demande." }),
  // Champ piège anti-spam : doit rester vide.
  website: z.string().max(0).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
