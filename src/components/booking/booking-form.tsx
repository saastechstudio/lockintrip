"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { offers, type OfferId } from "@/content/offers";
import type { Session, SessionId } from "@/content/sessions";
import { site } from "@/content/site";
import { functionUrl, supabaseHeaders } from "@/lib/supabase-public";
import { profiles, reservationSchema, type ReservationInput } from "@/lib/reservation-schema";
import { cn, formatDay, formatPrice } from "@/lib/utils";

type FormValues = Omit<ReservationInput, "consent" | "profile"> & { consent: boolean; profile: ReservationInput["profile"] | "" };

const steps = [
  "Tu choisis ta formule et ta session.",
  "Tu règles ta place sur la page sécurisée Stripe.",
  "Tu reçois ta confirmation et ta facture par e-mail.",
];

const errorMessages: Record<string, string> = {
  session_full: "Cette session vient d'être complétée. Choisis une autre session.",
  not_configured: `Le paiement en ligne ouvre très bientôt. Écris-nous sur WhatsApp (${site.whatsapp.display}) ou à ${site.email} pour réserver dès maintenant.`,
  invalid_payload: "Certaines informations sont invalides. Vérifie le formulaire.",
  default: `Le paiement n'a pas pu démarrer. Réessaie, ou écris-nous à ${site.email}.`,
};

export function BookingForm({
  sessions,
  cancelled,
  defaultOffer,
  defaultSession,
  defaultGoal,
}: {
  sessions: Session[];
  cancelled?: boolean;
  defaultOffer?: OfferId;
  defaultSession?: SessionId;
  defaultGoal?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const firstOpen = sessions.find((s) => s.taken < s.capacity)?.id ?? "s1";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // Le resolver garantit la conformité au schéma ; les valeurs par défaut du formulaire restent partielles.
    resolver: zodResolver(reservationSchema) as never,
    defaultValues: {
      offer: defaultOffer ?? "all-inclusive",
      session: defaultSession ?? firstOpen,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      profile: "",
      goal: defaultGoal ?? "",
      consent: false,
      website: "",
    },
  });

  const offerId = useWatch({ control, name: "offer" });
  const sessionId = useWatch({ control, name: "session" });
  const offer = offers.find((o) => o.id === offerId) ?? offers[0];
  const session = sessions.find((s) => s.id === sessionId) ?? sessions[0];

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      const res = await fetch(functionUrl("create-checkout"), {
        method: "POST",
        headers: supabaseHeaders,
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(errorMessages[data.error ?? ""] ?? errorMessages.default);
    } catch {
      setError(errorMessages.default);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {cancelled && (
        <p role="status" className="card-lux p-5 text-sm text-ink-soft lg:col-span-12">
          Le paiement a été interrompu, rien n&apos;a été débité. Tu peux reprendre ta réservation ci-dessous.
        </p>
      )}
      <div className="space-y-12 lg:col-span-7">
        <fieldset>
          <legend className="font-display text-2xl font-light text-ink">1. Ta formule</legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup">
            {offers.map((o) => (
              <ChoiceCard key={o.id} checked={offerId === o.id} onSelect={() => setValue("offer", o.id, { shouldValidate: true })}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-xl text-ink">{o.name}</span>
                  {o.badge && <span className="rounded-full bg-pierre/80 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-ink">{o.badge}</span>}
                </div>
                <span className="font-display mt-2 block text-3xl font-light text-ink">{formatPrice(o.price)}</span>
                <span className="mt-1 block text-xs text-muted">{o.excludes?.[0] ?? "Vol et transferts inclus"}</span>
              </ChoiceCard>
            ))}
          </div>
          <input type="hidden" {...register("offer")} />
          <FieldError message={errors.offer?.message} />
        </fieldset>

        <fieldset>
          <legend className="font-display text-2xl font-light text-ink">2. Ta session</legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-3" role="radiogroup">
            {sessions.map((s) => {
              const left = s.capacity - s.taken;
              return (
                <ChoiceCard
                  key={s.id}
                  checked={sessionId === s.id}
                  disabled={left <= 0}
                  onSelect={() => setValue("session", s.id, { shouldValidate: true })}
                >
                  <span className="eyebrow text-bordeaux">{s.label}</span>
                  <span className="font-display mt-2 block text-lg leading-tight text-ink">
                    {formatDay(s.start)} → {formatDay(s.end)}
                  </span>
                  <span className="mt-1 block text-xs text-muted">{left > 0 ? `${left} places disponibles` : "Complet"}</span>
                </ChoiceCard>
              );
            })}
          </div>
          <input type="hidden" {...register("session")} />
          <FieldError message={errors.session?.message} />
        </fieldset>

        <fieldset>
          <legend className="font-display text-2xl font-light text-ink">3. Toi</legend>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field id="firstName" label="Prénom" error={errors.firstName?.message}>
              <Input id="firstName" autoComplete="given-name" aria-invalid={!!errors.firstName} {...register("firstName")} />
            </Field>
            <Field id="lastName" label="Nom" error={errors.lastName?.message}>
              <Input id="lastName" autoComplete="family-name" aria-invalid={!!errors.lastName} {...register("lastName")} />
            </Field>
            <Field id="email" label="E-mail" error={errors.email?.message}>
              <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            </Field>
            <Field id="phone" label="Téléphone" error={errors.phone?.message}>
              <Input id="phone" type="tel" autoComplete="tel" placeholder="+33 6 12 34 56 78" aria-invalid={!!errors.phone} {...register("phone")} />
            </Field>
            <Field id="city" label="Ville" error={errors.city?.message}>
              <Input id="city" autoComplete="address-level2" aria-invalid={!!errors.city} {...register("city")} />
            </Field>
            <Field id="profile" label="Profil" error={errors.profile?.message}>
              <div className="relative">
                <Select id="profile" aria-invalid={!!errors.profile} {...register("profile")}>
                  <option value="" disabled>
                    Sélectionner
                  </option>
                  {profiles.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
                <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">▾</span>
              </div>
            </Field>
            <Field id="goal" label="L'objectif que tu veux accélérer" error={errors.goal?.message} className="sm:col-span-2">
              <Textarea
                id="goal"
                placeholder="Où en es-tu aujourd'hui, et à quoi ressemblerait une semaine réussie pour toi ?"
                aria-invalid={!!errors.goal}
                {...register("goal")}
              />
            </Field>
          </div>

          <div className="absolute -left-[9999px]" aria-hidden>
            <label htmlFor="website">Ne pas remplir</label>
            <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
            <input type="checkbox" className="mt-1 size-4 accent-[var(--color-bordeaux)]" {...register("consent")} />
            <span>
              J&apos;accepte que mes informations soient utilisées pour traiter ma demande, conformément à la{" "}
              <Link href="/confidentialite" className="text-ink underline underline-offset-4" target="_blank">
                politique de confidentialité
              </Link>
              .
            </span>
          </label>
          <FieldError message={errors.consent?.message} />
        </fieldset>
      </div>

      <aside className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[20px] bg-bordeaux p-8 text-ivory md:p-10">
            <p className="eyebrow text-pierre">Ta sélection</p>
            <AnimatePresence mode="wait">
              <motion.div key={`${offer.id}-${session.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                <p className="font-display mt-5 text-3xl font-light">{offer.name}</p>
                <p className="mt-1 text-sm text-ivory/65">
                  {session.label} · {formatDay(session.start)} → {formatDay(session.end)} · Phuket
                </p>
                <p className="font-display mt-8 text-6xl font-light tracking-[-0.03em]">{formatPrice(offer.price)}</p>
                <p className="mt-1 text-xs text-ivory/55">TTC par personne · facture envoyée par e-mail</p>
              </motion.div>
            </AnimatePresence>
            <div className="my-8 h-px bg-ivory/15" />
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4 text-sm text-ivory/80">
                  <span className="font-display text-pierre">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <Button type="submit" size="lg" variant="light" disabled={isSubmitting} className="mt-10 w-full">
              {isSubmitting ? <Loader2 className="animate-spin" /> : null}
              {isSubmitting ? "Redirection vers le paiement" : `Payer ${formatPrice(offer.price)}`}
              {!isSubmitting && <ArrowRight className="transition-transform duration-500 group-hover/btn:translate-x-0.5" />}
            </Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-ivory/55">
              <Lock className="size-3" /> Paiement sécurisé par Stripe · carte, Apple Pay, Google Pay · en 3 ou 4 fois avec Klarna
            </p>
            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-ivory/10 p-3 text-center text-sm text-ivory">
                {error}
              </p>
            )}
          </div>
        </div>
      </aside>
    </form>
  );
}

function ChoiceCard({
  checked,
  disabled,
  onSelect,
  children,
}: {
  checked: boolean;
  disabled?: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "relative rounded-2xl border p-5 text-left transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-40",
        checked
          ? "border-bordeaux bg-white shadow-[0_20px_40px_-25px_rgba(107,31,43,0.35)] ring-4 ring-bordeaux/10"
          : "border-ink/10 bg-white/50 hover:border-ink/25",
      )}
    >
      <span
        className={cn(
          "absolute right-4 top-4 grid size-5 place-items-center rounded-full border transition-colors",
          checked ? "border-bordeaux bg-bordeaux text-ivory" : "border-ink/20",
        )}
      >
        {checked && <Check className="size-3" strokeWidth={2.5} />}
      </span>
      <div className="pr-6">{children}</div>
    </button>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-2 text-xs text-red-800">
      {message}
    </p>
  );
}
