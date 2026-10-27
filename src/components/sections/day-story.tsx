"use client";

import { useRef } from "react";
import Image from "next/image";
import { Photo } from "@/components/ui/photo";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Bus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { excursion, soiree } from "@/content/activities";
import { day, type DayMoment } from "@/content/story";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

function Moment({ m, index }: { m: DayMoment; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  // l'image s'ouvre comme un cadre de cinéma en entrant dans l'écran
  const clip = useTransform(scrollYProgress, [0.05, 0.4], reduce ? ["inset(0% 0% 0% 0% round 22px)", "inset(0% 0% 0% 0% round 22px)"] : ["inset(14% 12% 14% 12% round 22px)", "inset(0% 0% 0% 0% round 22px)"]);
  const flip = index % 2 === 1;

  return (
    <li ref={ref} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <Reveal className={cn("md:col-span-6", flip && "md:order-2")}>
        <motion.div style={{ clipPath: clip }} className="group relative mx-auto aspect-[4/3] max-w-lg overflow-hidden rounded-[22px]">
          <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
            <Photo
              src={m.src}
              alt={m.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.04]"
            />
          </motion.div>
          <span className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-ivory/85 px-3.5 py-1.5 text-xs font-medium text-ink backdrop-blur-md">
            {m.time}
          </span>
        </motion.div>
      </Reveal>
      <Reveal delay={0.12} className={cn("md:col-span-6", flip && "md:order-1")}>
        <p className="eyebrow flex items-center gap-3 text-bordeaux">
          <span className="font-display text-base normal-case tracking-normal text-bordeaux/70">{String(index + 1).padStart(2, "0")}</span>
          {m.moment}
        </p>
        <h3 className="font-display mt-5 text-[2.1rem] font-light leading-[1.08] text-ink md:text-[2.8rem]">{m.title}</h3>
        <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted">{m.body}</p>
      </Reveal>
    </li>
  );
}

/** Une journée racontée, du matin au soir, puis les moments forts de la semaine. */
export function DayStory() {
  return (
    <section id="journee" className="relative bg-ivory py-28 md:py-40">
      <div className="container-lux">
        <SectionHeading
          align="center"
          eyebrow="Une journée à Phuket"
          title="Projette ta journée."
          intro="Le réveil sous le soleil, une matinée de travail qui compte, un après-midi à te dépasser, un soir face à la mer. Puis on recommence, sept jours de suite."
        />

        <ol className="mt-20 space-y-20 md:mt-28 md:space-y-32">
          {day.map((m, i) => (
            <Moment key={m.moment} m={m} index={i} />
          ))}
        </ol>

        <div className="mt-24 space-y-4 md:mt-32 md:space-y-6">
          <Reveal>
            <article className="group grid overflow-hidden rounded-[22px] bg-bordeaux text-ivory md:grid-cols-2">
              <div className="relative aspect-[3/2] overflow-hidden md:aspect-auto md:min-h-[26rem]">
                <Image src={excursion.src} alt={excursion.alt} fill sizes="(min-width: 768px) 50vw, 100vw" quality={90} className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="eyebrow text-pierre">{excursion.eyebrow}</p>
                <h3 className="font-display mt-5 text-3xl font-light leading-tight md:text-[2.6rem]">{excursion.title}</h3>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ivory/75">{excursion.body}</p>
              </div>
            </article>
          </Reveal>
          <Reveal>
            <article className="card-lux group grid overflow-hidden md:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:order-1 md:p-12">
                <p className="eyebrow text-bordeaux">{soiree.eyebrow}</p>
                <h3 className="font-display mt-5 text-3xl font-light leading-tight text-ink md:text-[2.6rem]">{soiree.title}</h3>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{soiree.body}</p>
              </div>
              <div className="relative aspect-[3/2] overflow-hidden md:order-2 md:aspect-auto md:min-h-[24rem]">
                <Image src={soiree.src} alt={soiree.alt} fill sizes="(min-width: 768px) 50vw, 100vw" quality={88} className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.04]" />
              </div>
            </article>
          </Reveal>
          <Reveal>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-4 text-center text-sm text-muted">
              <Bus className="size-4 text-bordeaux" strokeWidth={1.5} />
              Transfert aéroport ↔ hôtel et tous les déplacements compris.
              <Sparkles className="size-4 text-bordeaux" strokeWidth={1.5} />
              D&apos;autres surprises t&apos;attendent sur place.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Button asChild size="lg">
            <Link href="/reserver">
              Je participe à Phuket 2027
              <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
