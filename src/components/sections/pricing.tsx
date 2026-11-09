import Link from "next/link";
import { ArrowUpRight, CalendarClock, Check, FileText, Lock, MessageCircle, Plane, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { offers } from "@/content/offers";
import { cn, formatInstallment, formatPrice } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function Pricing({ remaining }: { remaining: number }) {
  return (
    <section id="tarifs" className="tex-concrete relative bg-bordeaux py-28 md:py-40">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Prix fondateur"
          title="Deux formules, le même programme"
          intro="Tu choisis simplement si l'on s'occupe aussi de ton vol. Le tarif fondateur est réservé à cette première édition."
        />

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <p className="flex items-center gap-2.5 rounded-[10px] glass-red px-4 py-2 text-sm text-ink">
            <span className="size-1.5 rounded-full bg-bordeaux" />
            <strong className="font-medium tabular-nums text-accent">{remaining} places</strong> disponibles au prix fondateur
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.12} className="h-full min-w-0">
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[20px] p-8 md:p-11",
                  o.featured
                    ? "glass-frame bg-bordeaux-deep text-ivory"
                    : "glass-light text-ink",
                )}
              >
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className={cn("eyebrow", o.featured ? "text-pierre" : "text-accent")}>Offre</p>
                    <h3 className="font-display mt-3 text-4xl font-light">{o.name}</h3>
                  </div>
                  {o.badge && (
                    <span className="rounded-[6px] bg-pierre px-2 py-1 text-xs font-medium text-ink">
                      {o.badge}
                    </span>
                  )}
                </div>

                <p className={cn("relative mt-4 text-[0.9375rem]", o.featured ? "text-ivory/70" : "text-muted")}>{o.pitch}</p>

                <div className="relative mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-6xl font-light tabular-nums tracking-[-0.03em] sm:text-7xl">{formatPrice(o.price)}</span>
                  <span className={cn("text-sm", o.featured ? "text-ivory/55" : "text-muted")}>TTC / personne</span>
                </div>
                <p className={cn("relative mt-2 text-xs", o.featured ? "text-ivory/55" : "text-muted")}>
                  Soit {formatPrice(Math.round(o.price / 7))} par jour · ou 4 × {formatInstallment(o.price, 4)} avec Klarna
                </p>

                <div className={cn("relative my-9 h-px", o.featured ? "bg-ivory/15" : "bg-ink/10")} />

                <ul className="relative grid flex-1 content-start gap-3.5">
                  {o.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                      {item.startsWith("Vol") ? (
                        <Plane className={cn("mt-0.5 size-4 shrink-0", o.featured ? "text-pierre" : "text-accent")} strokeWidth={1.5} />
                      ) : (
                        <Check className={cn("mt-0.5 size-4 shrink-0", o.featured ? "text-pierre" : "text-accent")} strokeWidth={1.8} />
                      )}
                      <span className={o.featured ? "text-ivory/90" : "text-ink-soft"}>{item}</span>
                    </li>
                  ))}
                </ul>

                {o.excludes && (
                  <ul className="relative mt-3.5 grid gap-3.5">
                    {o.excludes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-concrete">
                        <X className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <Button asChild size="lg" variant={o.featured ? "light" : "primary"} className="relative mt-10 w-full">
                  <Link href={`/reserver?offre=${o.id}`}>
                    {o.cta}
                    <ArrowUpRight />
                  </Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-muted">
            <li className="flex items-center gap-2.5"><Lock className="size-4 text-muted" strokeWidth={1.5} />Paiement sécurisé par Stripe</li>
            <li className="flex items-center gap-2.5"><CalendarClock className="size-4 text-muted" strokeWidth={1.5} />En 3 ou 4 fois avec Klarna</li>
            <li className="flex items-center gap-2.5"><ShieldCheck className="size-4 text-muted" strokeWidth={1.5} />Assurance voyage incluse</li>
            <li className="flex items-center gap-2.5"><FileText className="size-4 text-muted" strokeWidth={1.5} />Facture envoyée par e-mail</li>
            <li className="flex items-center gap-2.5"><MessageCircle className="size-4 text-muted" strokeWidth={1.5} />Une question ? On répond sur WhatsApp</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
