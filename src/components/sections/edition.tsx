import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, MessageCircle, Quote, ShieldCheck } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { startingPrice } from "@/content/offers";
import { editionYear, type Session } from "@/content/sessions";
import { site } from "@/content/site";
import { founderPricing, testimonials } from "@/content/story";
import { cn, formatDay, formatPrice } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

/**
 * Rareté et preuve : mur des 60 places (remplies au fil des paiements réels),
 * sessions avec jauge, prix fondateur. Les témoignages s'affichent dès qu'il y en a de réels.
 */
export function Edition({ sessions }: { sessions: Session[] }) {
  const totalCapacity = sessions.reduce((n, s) => n + s.capacity, 0);
  const totalTaken = sessions.reduce((n, s) => n + Math.min(s.taken, s.capacity), 0);
  const remaining = totalCapacity - totalTaken;
  const pct = totalCapacity ? Math.round((totalTaken / totalCapacity) * 100) : 0;

  return (
    <section id="edition" className="relative overflow-hidden bg-bordeaux-deep py-28 text-ivory md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(circle, #8b3a3a, transparent 65%)" }}
      />
      <div className="container-lux relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              tone="ivory"
              eyebrow={`Édition fondatrice ${editionYear}`}
              title="60 places. Pas une de plus."
              intro="Trois sessions de 20 personnes, pas plus. Ce format permet un vrai suivi personnalisé de chaque participant qui veut passer au niveau supérieur dans sa vie. Tu es encadré et accompagné à chaque étape du séjour, en dehors des temps libres. Les membres fondateurs forment le premier cercle Lockin Trip."
            />
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full bg-pierre px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink">
                {founderPricing.label} · dès {formatPrice(startingPrice)}
              </span>
              {founderPricing.nextIncrease && (
                <span className="rounded-full border border-pierre/50 px-4 py-2 text-[0.75rem] text-pierre">
                  {founderPricing.nextIncrease.label}
                </span>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="rounded-[22px] border border-ivory/12 bg-ivory/[0.05] p-7 md:p-9">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow text-ivory/55">Places restantes</p>
                  <p className="font-display mt-3 text-8xl font-light leading-none tracking-[-0.04em] tabular-nums">
                    <CountUp to={remaining} />
                  </p>
                </div>
                <div className="pb-2 text-right text-sm text-ivory/60">
                  {totalTaken > 0 && (
                    <p>
                      <span className="text-ivory">{totalTaken}</span> déjà réservées
                    </p>
                  )}
                  <p>sur {totalCapacity} places</p>
                </div>
              </div>

              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-ivory/12">
                <div className="h-full rounded-full bg-pierre" style={{ width: `${Math.max(pct, 2)}%` }} />
              </div>

              <p className="eyebrow mt-8 text-ivory/45">Le mur de l&apos;édition fondatrice</p>
              <div className="mt-4 grid grid-cols-3 gap-3" role="img" aria-label={`${totalTaken} places réservées sur ${totalCapacity}`}>
                {sessions.map((s) => (
                  <div key={s.id}>
                    <div className="grid grid-cols-5 gap-1.5">
                      {Array.from({ length: s.capacity }).map((_, k) => (
                        <span
                          key={k}
                          className={cn(
                            "aspect-square rounded-full border transition-colors",
                            k < s.taken ? "border-pierre bg-pierre" : "border-ivory/20 bg-transparent",
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-[0.7rem] text-ivory/50">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-ivory/50">Chaque place pleine est un membre fondateur. Compteur mis à jour automatiquement.</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {sessions.map((s, i) => {
            const left = s.capacity - s.taken;
            const full = left <= 0;
            const p = Math.round((s.taken / s.capacity) * 100);
            return (
              <Reveal key={s.id} delay={i * 0.1}>
                <article className="card-lux group flex h-full flex-col p-8 text-ink transition-transform duration-700 ease-[var(--ease-lux)] hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-bordeaux">{s.label}</p>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium",
                        full ? "bg-terracotta/15 text-terracotta" : "bg-bordeaux/10 text-bordeaux",
                      )}
                    >
                      {!full && <span className="size-1.5 animate-pulse rounded-full bg-bordeaux" />}
                      {full ? "Complet" : left <= 5 ? "Dernières places" : "Inscriptions ouvertes"}
                    </span>
                  </div>
                  <p className="font-display mt-8 text-[2rem] font-light leading-tight">
                    {formatDay(s.start)}
                    <span className="mx-3 text-concrete">→</span>
                    {formatDay(s.end)}
                  </p>
                  <p className="mt-1 text-sm text-muted">{editionYear} · 7 nuits · Phuket</p>

                  <div className="mt-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">{s.taken > 0 ? `${s.taken} réservées` : `${s.capacity} places`}</span>
                      <span className="font-medium">{full ? "0 restante" : `${left} restantes`}</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                      <div className="h-full rounded-full bg-bordeaux" style={{ width: `${Math.max(p, 2)}%` }} />
                    </div>
                  </div>

                  <Button asChild variant={i === 0 ? "primary" : "outline"} className="mt-10 w-full">
                    <Link href={full ? "/reserver" : `/reserver?session=${s.id}`}>
                      {full ? "Liste d'attente" : "Réserver cette session"}
                      <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>

        {testimonials.length > 0 && (
          <div className="mt-24">
            <p className="eyebrow text-pierre">Ils l&apos;ont vécu</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <Reveal key={t.name}>
                  <figure className="flex h-full flex-col rounded-[20px] bg-ivory p-8 text-ink">
                    <Quote className="size-6 text-bordeaux" strokeWidth={1.3} />
                    <p className="font-display mt-5 text-xl font-light leading-snug text-bordeaux">{t.result}</p>
                    <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">{t.quote}</blockquote>
                    <figcaption className="mt-7 flex items-center gap-3 border-t border-ink/10 pt-5">
                      {t.photo && <Image src={t.photo} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />}
                      <span className="text-sm">
                        <span className="font-medium">{t.name}</span>
                        <span className="block text-muted">
                          {t.activity} · {t.city}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        <Reveal delay={0.1}>
          <ul className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-ivory/70">
            <li className="flex items-center gap-2.5"><Lock className="size-4 text-pierre" strokeWidth={1.5} />Paiement sécurisé par Stripe</li>
            <li className="flex items-center gap-2.5"><ShieldCheck className="size-4 text-pierre" strokeWidth={1.5} />Facture envoyée par e-mail</li>
            <li>
              <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 underline-offset-4 hover:text-ivory hover:underline">
                <MessageCircle className="size-4 text-pierre" strokeWidth={1.5} />
                Parler à l&apos;équipe avant de réserver
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
