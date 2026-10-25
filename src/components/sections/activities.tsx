import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { activities, activityPhotos, excursion } from "@/content/activities";
import { SectionHeading } from "./section-heading";

export function Activities() {
  return (
    <section id="activites" className="tex-travertine relative bg-pierre/55 py-28 md:py-40">
      <div className="container-lux">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Les après-midi"
              title="Bouger, découvrir, se dépasser."
              intro="Chaque après-midi, tu choisis ton activité. Elles sont pensées pour tout le monde, quel que soit ton niveau : même grand débutant, c'est l'occasion parfaite de découvrir un nouveau sport."
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <ul className="flex flex-wrap gap-2">
              {activities.map((a) => (
                <li key={a} className="rounded-[12px] border border-concrete/45 bg-ivory/80 px-4 py-2.5 text-sm text-ink">
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 text-sm text-bordeaux">
              <Sparkles className="size-4" strokeWidth={1.5} />
              Tous niveaux · même débutant · à la carte
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {activityPhotos.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.08} className={i === 2 ? "col-span-2 md:col-span-1" : ""}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-[18px]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <figcaption className="font-display absolute bottom-5 left-5 text-xl font-light text-ivory md:text-2xl">{p.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 md:mt-6">
          <article className="grid overflow-hidden rounded-[20px] bg-bordeaux text-ivory md:grid-cols-2">
            <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[26rem]">
              <Image src={excursion.src} alt={excursion.alt} fill sizes="(min-width: 768px) 50vw, 100vw" quality={90} className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="eyebrow text-pierre">{excursion.eyebrow}</p>
              <h3 className="font-display mt-5 text-3xl font-light leading-tight md:text-[2.6rem]">{excursion.title}</h3>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ivory/75">{excursion.body}</p>
              <ul className="mt-8 grid gap-2.5">
                {excursion.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-sm text-ivory/90">
                    <span className="h-px w-5 bg-pierre/70" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
