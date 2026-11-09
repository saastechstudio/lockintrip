import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { LogoMark } from "@/components/layout/logo";
import { experts } from "@/content/experts";
import { SectionHeading } from "./section-heading";

export function Experts() {
  return (
    <section id="experts" className="relative bg-bordeaux py-28 text-ivory md:py-40">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="ivory"
            eyebrow="Les experts"
            title="Apprendre de ceux qui sont déjà passés par là"
            intro="Chaque intervenant exerce dans son domaine et transmet ce qu'il pratique. Tu travailles avec eux en masterclass, en atelier et en entretien individuel."
          />
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {experts.map((e, i) => {
            return (
              <Reveal key={e.domain} delay={(i % 3) * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-[16px] bg-ivory text-ink">
                  <div className="relative aspect-[5/4] overflow-hidden glass-frame">
                    {e.photo ? (
                      <Image
                        src={e.photo}
                        alt={e.name ? `${e.name}, ${e.domain}` : e.domain}
                        fill
                        quality={90}
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-pierre-soft text-concrete">
                        <LogoMark className="size-12" />
                      </div>
                    )}
                    {e.photo && <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />}
                    <span className="absolute left-5 top-5 rounded-[6px] bg-ivory px-2 py-1 text-xs font-medium text-ink">
                      {e.domain}
                    </span>
                    <div className={e.photo ? "absolute bottom-5 left-5 right-5 text-ivory" : "absolute bottom-5 left-5 right-5 text-ink"}>
                      <p className="text-sm font-medium">{e.name ?? "Intervenant confirmé"}</p>
                      <p className={e.photo ? "text-xs text-ivory/75" : "text-xs text-muted"}>{e.role ?? "Annonce prochainement"}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <p className="font-display text-[1.45rem] font-light leading-snug text-ink">{e.promise}</p>
                    <ul className="mt-6 space-y-2.5">
                      {e.outcomes.map((t) => (
                        <li key={t} className="flex items-start gap-3 text-sm text-ink-soft">
                          <span className="mt-2 h-px w-4 shrink-0 bg-bordeaux/70" />
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
