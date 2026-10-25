"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/visuals/scene";
import { problems } from "@/content/concept";
import { media } from "@/content/media";
import { SectionHeading } from "./section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

export function Problem() {
  const reduce = useReducedMotion();
  return (
    <section id="probleme" className="relative py-28 md:py-40">
      <div className="container-lux grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Le constat" title="Ton environnement influence tes résultats." />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-xl text-[1.0625rem] leading-relaxed text-muted md:text-lg">
              Beaucoup de personnes ont des ambitions.
              <br />
              Mais peu évoluent dans un environnement qui favorise réellement leur progression.
            </p>
          </Reveal>

          <ul className="mt-12 space-y-1" aria-label="Ce qui freine la progression">
            {problems.map((p, i) => (
              <li key={p} className="relative w-fit">
                <motion.span
                  className="font-display block text-4xl font-light leading-tight text-ink md:text-5xl"
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 0.32, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease, delay: i * 0.12 }}
                >
                  {p}.
                </motion.span>
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-[55%] h-px w-full origin-left bg-ink/60"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease, delay: 0.5 + i * 0.12 }}
                />
              </li>
            ))}
          </ul>

          <Reveal delay={0.4}>
            <p className="font-display mt-12 max-w-xl text-3xl font-light leading-snug text-emerald md:text-[2.4rem]">
              Lockin Trip a été créé pour changer cela.
            </p>
            <Button asChild size="lg" className="mt-10">
              <Link href="#concept">
                Voir comment
                <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-5">
          <Scene
            variant="courtyard"
            src={media.why.src}
            alt={media.why.alt}
            seed={21}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5] w-full rounded-[2rem] lg:sticky lg:top-28"
          >
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-ivory/85 p-6 backdrop-blur-md">
              <p className="eyebrow text-emerald">Avec Lockin Trip</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink-soft">
                {["Focus", "Entourage", "Réseau", "Clarté", "Méthode", "Énergie"].map((w) => (
                  <li key={w} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-emerald" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Scene>
        </Reveal>
      </div>
    </section>
  );
}
