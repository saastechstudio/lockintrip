import { z } from "zod";

export const profiles = [
  "Entrepreneur",
  "Freelance",
  "Créateur·rice de contenu",
  "Porteur·se de projet",
  "Étudiant·e",
  "Sportif·ve",
  "Digital nomad",
  "En reconversion",
  "Salarié·e",
  "Autre",
] as const;

export const reservationSchema = z.object({
  offer: z.enum(["explorer", "all-inclusive"], { message: "Choisis une formule." }),
  session: z.enum(["s1", "s2", "s3"], { message: "Choisis une session." }),
  firstName: z.string().trim().min(2, "Indique ton prénom.").max(60),
  lastName: z.string().trim().min(2, "Indique ton nom.").max(60),
  email: z.email("Adresse e-mail invalide.").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "Numéro de téléphone invalide.")
    .max(24)
    .regex(/^[+\d][\d\s().-]+$/, "Numéro de téléphone invalide."),
  city: z.string().trim().min(2, "Indique ta ville.").max(80),
  profile: z.enum(profiles, { message: "Sélectionne ton profil." }),
  goal: z
    .string()
    .trim()
    .min(10, "Dis-nous en quelques mots ce que tu veux accélérer.")
    .max(1200, "1 200 caractères maximum."),
  consent: z.literal(true, { message: "Ton accord est nécessaire pour traiter la demande." }),
  // Champ piège anti-spam : doit rester vide.
  website: z.string().max(0).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
