import { Dumbbell, Globe2, Sparkles, Sun, Leaf } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Scene, type SceneVariant } from "@/components/visuals/scene";
import { media } from "@/content/media";
import { SectionHeading } from "./section-heading";

const reasons = [
  { icon: Sun, title: "Climat", body: "31 °C en mars, saison sèche, mer d'Andaman à 29 °C. Le corps se détend, l'esprit suit." },
  { icon: Leaf, title: "Qualité de vie", body: "Cuisine fraîche, massages, nature omniprésente : récupérer devient facile." },
  { icon: Sparkles, title: "Inspiration", body: "Falaises calcaires, lagons, levers de soleil. Un décor qui élargit la perspective." },
  { icon: Dumbbell, title: "Sport", body: "Berceau du muay thaï, spots de natation et de randonnée, salles de niveau international." },
  { icon: Globe2, title: "Énergie internationale", body: "Entrepreneurs, nomades et créateurs du monde entier y vivent et y construisent." },
];

const mosaic: { variant: SceneVariant; className: string; seed: number }[] = [
  { variant: "dusk", className: "col-span-2 aspect-[16/10]", seed: 5 },
  { variant: "courtyard", className: "aspect-[4/5]", seed: 31 },
  { variant: "water", className: "aspect-[4/5]", seed: 12 },
  { variant: "stone", className: "col-span-2 aspect-[2/1]", seed: 44 },
];

export function Phuket() {
  return (
    <section id="experience" className="relative overflow-hidden bg-emerald-deep text-ivory">
      <Scene variant="dusk" seed={9} src={media.final.src} alt="" className="absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep via-emerald-deep/90 to-emerald-deep" />

      <div className="container-lux relative py-28 md:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="ivory"
              eyebrow="L'expérience · Phuket"
              title="Un cadre qui change la façon de penser."
              intro="Phuket réunit ce qu'il faut pour une semaine d'exception : la lumière, la mer, le calme et une scène internationale d'entrepreneurs. Assez loin pour couper, assez vivant pour inspirer."
            />
            <ul className="mt-14 space-y-7">
              {reasons.map((r, i) => (
                <RevealItem key={r.title} delay={i * 0.06} className="flex gap-5">
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-ivory/20 text-glow">
                      <r.icon className="size-4" strokeWidth={1.4} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-light">{r.title}</h3>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ivory/65">{r.body}</p>
                    </div>
                </RevealItem>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:col-span-7">
            {mosaic.map((m, i) => (
              <Reveal key={i} delay={i * 0.1} className={m.className}>
                <Scene
                  variant={m.variant}
                  seed={m.seed}
                  src={media.phuket[i]?.src}
                  alt={media.phuket[i]?.alt}
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="h-full min-h-48 w-full rounded-[1.5rem]"
                >
                  {media.phuket[i]?.src && (
                    <p className="absolute bottom-4 left-4 rounded-full bg-ink/25 px-3 py-1.5 text-[0.7rem] tracking-wide text-ivory/90 backdrop-blur-md">
                      {media.phuket[i].alt}
                    </p>
                  )}
                </Scene>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
