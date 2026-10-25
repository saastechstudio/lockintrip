import Image from "next/image";
import { Bot, Brain, Megaphone, Rocket, Scale, ShoppingBag, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Scene, type SceneVariant } from "@/components/visuals/scene";
import { experts, type Expert } from "@/content/experts";
import { SectionHeading } from "./section-heading";

const icons: Record<Expert["emoji"], LucideIcon> = {
  ai: Bot,
  marketing: Megaphone,
  ecommerce: ShoppingBag,
  legal: Scale,
  mind: Brain,
  business: Rocket,
};

const portraitTones: SceneVariant[] = ["plaster", "water", "stone", "courtyard", "plaster", "water"];

export function Experts() {
  return (
    <section id="experts" className="relative bg-linen py-28 md:py-40">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Les experts"
            title="Apprendre de ceux qui sont déjà passés par là."
            intro="Des praticiens qui ont construit, vendu, échoué et recommencé. Ce qui compte n'est pas leur CV, c'est ce que tu sais faire en repartant."
          />
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {experts.map((e, i) => {
            const Icon = icons[e.emoji];
            return (
              <Reveal key={e.domain} delay={(i % 3) * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-ivory transition-shadow duration-700 hover:shadow-[0_40px_70px_-40px_rgba(23,22,18,0.45)]">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    {e.photo ? (
                      <Image
                        src={e.photo}
                        alt={e.name ? `${e.name}, ${e.domain}` : e.domain}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <Scene variant={portraitTones[i % portraitTones.length]} seed={60 + i * 7} className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.04]" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/55 to-transparent" />
                    <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-ivory/85 px-3.5 py-2 text-xs font-medium text-ink backdrop-blur-md">
                      <Icon className="size-3.5 text-emerald" strokeWidth={1.6} />
                      {e.domain}
                    </span>
                    <div className="absolute bottom-5 left-5 right-5 text-ivory">
                      <p className="text-sm font-medium">{e.name ?? "Intervenant confirmé"}</p>
                      <p className="text-xs text-ivory/75">{e.role ?? "Annonce prochainement"}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <p className="font-display text-[1.45rem] font-light leading-snug text-ink">{e.promise}</p>
                    <ul className="mt-6 space-y-2.5">
                      {e.outcomes.map((t) => (
                        <li key={t} className="flex items-start gap-3 text-sm text-ink-soft">
                          <span className="mt-2 h-px w-4 shrink-0 bg-emerald/70" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
