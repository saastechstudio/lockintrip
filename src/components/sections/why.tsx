import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/visuals/scene";
import { media } from "@/content/media";
import { SectionHeading } from "./section-heading";

const principles = [
  {
    n: "01",
    title: "Les bonnes personnes accélèrent les projets.",
    body: "Une conversation avec quelqu'un qui a déjà franchi l'étape qui vous bloque fait gagner des mois. À LOCKIN TRIP, ces conversations ont lieu au petit-déjeuner.",
  },
  {
    n: "02",
    title: "Le bon environnement rend la discipline naturelle.",
    body: "Loin des notifications, des urgences et des habitudes, l'attention revient. Le cadre est pensé pour que travailler, bouger et réfléchir deviennent faciles.",
  },
  {
    n: "03",
    title: "Les meilleures idées naissent des rencontres.",
    body: "Une marque et un juriste, une créatrice et un développeur : les associations improbables d'une semaine deviennent souvent les projets de l'année suivante.",
  },
];

export function Why() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="container-lux">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Pourquoi" title="Ton environnement influence tes résultats." />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-xl text-[1.0625rem] leading-relaxed text-muted md:text-lg">
                Les objectifs qui comptent vraiment sont rarement les plus urgents. Alors ils attendent, d&apos;une
                année sur l&apos;autre, coincés entre les obligations. Le problème n&apos;est presque jamais le talent ou
                la motivation. C&apos;est le contexte.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-display mt-10 max-w-xl border-l border-emerald/40 pl-6 text-2xl font-light italic leading-snug text-ink md:text-[1.75rem]">
                La plupart des projets ne manquent pas d&apos;idées. Ils manquent d&apos;un cadre, et des bonnes personnes
                autour de la table.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <Scene
              variant="courtyard"
              src={media.why.src}
              alt={media.why.alt}
              seed={21}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-[2rem]"
            >
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-ivory/80 p-5 backdrop-blur-md">
                <p className="eyebrow text-emerald">Le principe</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Sept jours où tout, du réveil au dîner, est organisé autour d&apos;une seule question : qu&apos;est-ce
                  qui fera avancer votre projet aujourd&apos;hui ?
                </p>
              </div>
            </Scene>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-[2rem] bg-ink/10 md:mt-32 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1} className="bg-ivory p-8 md:p-10">
              <p className="font-display text-sm text-emerald">{p.n}</p>
              <h3 className="font-display mt-8 text-2xl font-light leading-tight text-ink">{p.title}</h3>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
