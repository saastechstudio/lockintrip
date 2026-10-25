import Link from "next/link";
import { ArrowUpRight, Check, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { offers } from "@/content/offers";
import { cn, formatPrice } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function Pricing() {
  return (
    <section id="tarifs" className="relative py-28 md:py-40">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Ce qui est inclus"
          title="Une semaine. Tout est prévu."
          intro="Deux formules, un même programme. Vous choisissez simplement si nous nous occupons aussi du voyage."
        />

        <div className="mx-auto mt-20 grid max-w-5xl gap-5 lg:grid-cols-2">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.12} className="h-full min-w-0">
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 md:p-11",
                  o.featured
                    ? "bg-emerald-deep text-ivory shadow-[0_50px_100px_-40px_rgba(28,58,49,0.75)]"
                    : "border border-ink/[0.08] bg-white/60 text-ink",
                )}
              >
                {o.featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-40 blur-3xl"
                    style={{ background: "radial-gradient(circle, #d8b783, transparent 70%)" }}
                  />
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className={cn("eyebrow", o.featured ? "text-glow" : "text-emerald")}>Offre</p>
                    <h3 className="font-display mt-3 text-4xl font-light">{o.name}</h3>
                  </div>
                  {o.badge && (
                    <span className="rounded-full bg-glow px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink">
                      {o.badge}
                    </span>
                  )}
                </div>

                <p className={cn("relative mt-4 text-[0.9375rem]", o.featured ? "text-ivory/70" : "text-muted")}>{o.pitch}</p>

                <div className="relative mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-6xl font-light tracking-[-0.03em] sm:text-7xl">{formatPrice(o.price)}</span>
                  <span className={cn("text-sm", o.featured ? "text-ivory/55" : "text-muted")}>TTC / personne</span>
                </div>
                <p className={cn("relative mt-2 text-xs", o.featured ? "text-ivory/50" : "text-muted")}>
                  Paiement possible en 3 ou 4 fois sans frais
                </p>

                <div className={cn("relative my-9 h-px", o.featured ? "bg-ivory/15" : "bg-ink/10")} />

                <ul className="relative grid flex-1 content-start gap-3.5">
                  {o.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                      {item.startsWith("Vol") ? (
                        <Plane className={cn("mt-0.5 size-4 shrink-0", o.featured ? "text-glow" : "text-emerald")} strokeWidth={1.5} />
                      ) : (
                        <Check className={cn("mt-0.5 size-4 shrink-0", o.featured ? "text-glow" : "text-emerald")} strokeWidth={1.8} />
                      )}
                      <span className={o.featured ? "text-ivory/90" : "text-ink-soft"}>{item}</span>
                    </li>
                  ))}
                </ul>

                {o.note && (
                  <p className="relative mt-8 inline-flex w-fit rounded-full border border-ink/10 px-3.5 py-1.5 text-xs text-muted">{o.note}</p>
                )}

                <Button asChild size="lg" variant={o.featured ? "light" : "primary"} className="relative mt-10 w-full">
                  <Link href={`/reserver?offre=${o.id}`}>
                    Choisir {o.name}
                    <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
