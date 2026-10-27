import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const photos = [
  { src: "/images/phuket/rawai-longtail.jpg", alt: "Bateau longtail sur l'eau turquoise de Rawai", caption: "Rawai Beach", className: "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto" },
  { src: "/images/phuket/promthep.jpg", alt: "Palmiers et mer turquoise au cap de Promthep", caption: "Cap de Promthep", className: "aspect-[4/3]" },
  { src: "/images/phuket/nai-harn-silhouettes.jpg", alt: "Silhouettes sur la plage de Nai Harn au coucher du soleil", caption: "Nai Harn au coucher du soleil", className: "aspect-[4/3]" },
  { src: "/images/phuket/phang-nga-rocher.jpg", alt: "Lagon émeraude et rocher calcaire dans la baie de Phang Nga", caption: "Baie de Phang Nga", className: "aspect-[4/3]" },
  { src: "/images/phuket/rawai-bateaux.jpg", alt: "Bateaux de pêcheurs posés sur la plage de Rawai", caption: "Les pêcheurs de Rawai", className: "aspect-[4/3]" },
];

/** Le cadre : Rawai et le sud de Phuket, en images. */
export function SouthPhuket() {
  return (
    <section id="phuket" className="relative bg-ivory pb-28 md:pb-40">
      <div className="container-lux">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Le cadre"
              title="Rawai et le sud de Phuket."
              intro="Des bateaux de pêcheurs sur une eau turquoise, des criques cachées, des couchers de soleil qui arrêtent les conversations. Le décor parfait pour prendre du recul et voir plus grand."
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-[0.9375rem] leading-relaxed text-muted">
              31 °C en mars, saison sèche, mer à 29 °C. Loin du quotidien, l&apos;attention revient sur l&apos;essentiel.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.06} className={p.className}>
              <figure className="group relative h-full min-h-40 overflow-hidden rounded-[18px]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/25 px-3 py-1 text-[0.7rem] text-ivory/95 backdrop-blur-md md:bottom-4 md:left-4">
                  {p.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
