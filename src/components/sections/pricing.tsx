import Link from "next/link";
import { ArrowUpRight, Check, CreditCard, PhoneCall, Plane, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { offers } from "@/content/offers";
import { cn, formatPrice } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function Pricing() {
  return (
    <section id="tarifs" className="tex-concrete relative bg-[#ece8e2] py-28 md:py-40">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Investir en toi"
          title="Une semaine. Tout est prévu."
          intro="Deux formules, le même programme intensif. Tu choisis simplement si l'on s'occupe aussi du voyage."
        />

        <div className="mx-auto mt-20 grid max-w-5xl gap-5 lg:grid-cols-2">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.12} className="h-full min-w-0">
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[20px] p-8 md:p-11",
                  o.featured
                    ? "bg-bordeaux text-ivory shadow-[0_40px_80px_-40px_rgba(82,22,32,0.7)]"
                    : "card-lux text-ink",
                )}
              >
                {o.featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-40 blur-3xl"
                    style={{ background: "radial-gradient(circle, #d6c8b8, transparent 70%)" }}
                  />
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className={cn("eyebrow", o.featured ? "text-pierre" : "text-bordeaux")}>Offre</p>
                    <h3 className="font-display mt-3 text-4xl font-light">{o.name}</h3>
                  </div>
                  {o.badge && (
                    <span className="rounded-full bg-pierre px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink">
                      {o.badge}
                    </span>
                  )}
                </div>

                <p className={cn("relative mt-4 text-[0.9375rem]", o.featured ? "text-ivory/70" : "text-muted")}>{o.pitch}</p>

                <div className="relative mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-6xl font-light tracking-[-0.03em] sm:text-7xl">{formatPrice(o.price)}</span>
                  <span className={cn("text-sm", o.featured ? "text-ivory/55" : "text-muted")}>TTC / personne</span>
                </div>
                <p className={cn("relative mt-2 text-xs", o.featured ? "text-ivory/55" : "text-muted")}>
                  Soit {formatPrice(Math.round(o.price / 7))} par jour · payable en 3 ou 4 fois sans frais
                </p>

                <div className={cn("relative my-9 h-px", o.featured ? "bg-ivory/15" : "bg-ink/10")} />

                <ul className="relative grid flex-1 content-start gap-3.5">
                  {o.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                      {item.startsWith("Vol") ? (
                        <Plane className={cn("mt-0.5 size-4 shrink-0", o.featured ? "text-pierre" : "text-bordeaux")} strokeWidth={1.5} />
                      ) : (
                        <Check className={cn("mt-0.5 size-4 shrink-0", o.featured ? "text-pierre" : "text-bordeaux")} strokeWidth={1.8} />
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
                    <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-muted">
            <li className="flex items-center gap-2.5"><CreditCard className="size-4 text-bordeaux" strokeWidth={1.5} />Paiement en 3 ou 4 fois sans frais</li>
            <li className="flex items-center gap-2.5"><PhoneCall className="size-4 text-bordeaux" strokeWidth={1.5} />Réponse personnelle sous 48 h</li>
            <li className="flex items-center gap-2.5"><ShieldCheck className="size-4 text-bordeaux" strokeWidth={1.5} />Aucun paiement pour déposer ta demande</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
