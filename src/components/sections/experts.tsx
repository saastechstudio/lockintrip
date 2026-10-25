import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { experts } from "@/content/experts";
import { SectionHeading } from "./section-heading";

export function Experts() {
  return (
    <section id="experts" className="relative py-28 md:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Les experts"
          title="Des praticiens, pas des conférenciers."
          intro="Chaque intervenant exerce dans son domaine et vient partager ce qui fonctionne aujourd'hui. Ils restent sur place plusieurs jours : masterclass le matin, entretiens individuels l'après-midi."
        />

        <div className="mt-20 grid gap-px overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-ink/[0.07] md:grid-cols-2 lg:grid-cols-3">
          {experts.map((e, i) => (
            <Reveal key={e.domain} delay={(i % 3) * 0.08} className="group relative flex flex-col bg-ivory p-8 transition-colors duration-700 hover:bg-white md:p-10">
              <div className="flex items-center justify-between gap-6">
                <p className="font-display text-sm text-stone">{String(i + 1).padStart(2, "0")}</p>
                <span className="h-px w-10 bg-ink/15 transition-all duration-700 group-hover:w-16 group-hover:bg-emerald" />
              </div>
              <h3 className="font-display mt-12 text-[2rem] font-light leading-[1.05] tracking-[-0.01em] text-ink">{e.domain}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{e.focus}</p>
              <ul className="mt-8 space-y-2.5">
                {e.takeaways.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm text-ink-soft">
                    <span className="h-px w-4 bg-emerald/60" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex items-center gap-4 border-t border-ink/[0.08] pt-6">
                {e.photo ? (
                  <Image src={e.photo} alt={e.name ?? e.domain} width={48} height={48} className="size-12 rounded-full object-cover" />
                ) : (
                  <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-sand to-limestone font-display text-lg text-clay">
                    {e.name ? e.name.charAt(0) : "·"}
                  </span>
                )}
                <div>
                  <p className="text-sm font-medium text-ink">{e.name ?? "Intervenant confirmé"}</p>
                  <p className="text-xs text-muted">{e.role ?? "Annonce prochainement"}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
