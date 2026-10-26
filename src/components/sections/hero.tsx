"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/visuals/scene";
import { media } from "@/content/media";
import { site } from "@/content/site";

const badges = ["Hôtel inclus", "Déjeuners inclus", "Activités incluses", "Excursion incluse", "Transports inclus", "Communauté privée"];
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Ouverture : texte à gauche, photo dans un cadre à droite.
 * La photo est affichée à environ sa taille réelle (jamais plein écran) pour rester nette ;
 * ne pas l'agrandir tant qu'une version haute définition n'est pas fournie (voir content/media.ts).
 */
export function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.3, ease, delay },
        };

  return (
    <section className="relative isolate overflow-hidden bg-[#1a0c0f] text-ivory">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 85% 20%, rgba(139,58,58,0.35), transparent 70%), radial-gradient(50% 60% at 0% 100%, rgba(107,31,43,0.45), transparent 70%)",
        }}
      />
      <div aria-hidden className="tex-concrete absolute inset-0 -z-10 opacity-[0.07] mix-blend-screen" />

      <div className="container-lux grid min-h-[100svh] items-center gap-10 pb-28 pt-32 lg:grid-cols-12 lg:gap-12 lg:pb-32">
        <div className="lg:col-span-6">
          <motion.p {...enter(0.2)} className="eyebrow flex items-center gap-3 text-ivory/80">
            <span className="size-1.5 rounded-full bg-pierre" />
            {site.edition}
          </motion.p>

          <h1 className="mt-6">
            <motion.span
              {...(reduce
                ? {}
                : { initial: { opacity: 0, y: 40, filter: "blur(10px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 1.6, ease, delay: 0.35 } })}
              className="font-display block text-[clamp(3.6rem,10vw,8.5rem)] font-light leading-[0.88] tracking-[-0.035em]"
            >
              LOCKIN
              <br />
              TRIP
            </motion.span>
            <motion.span {...enter(0.6)} className="font-display mt-5 block text-2xl font-light italic text-ivory/90 md:text-[2.2rem]">
              {site.tagline}
            </motion.span>
          </h1>

          <motion.p {...enter(0.8)} className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-ivory/80 md:text-[1.0625rem]">
            {site.description}
          </motion.p>

          <motion.div {...enter(0.95)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="light">
              <Link href="/reserver">
                Réserver ma place
                <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="#concept">
                Découvrir l&apos;expérience
                <ArrowDown className="transition-transform duration-500 group-hover/btn:translate-y-0.5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div {...enter(0.5)} className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-ivory/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] sm:aspect-[5/4]">
            <div className="absolute inset-0 animate-kenburns">
              <Scene
                variant="water"
                src={media.hero.poster.src}
                alt={media.hero.poster.alt}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-full w-full"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#180c0e]/35 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      <motion.ul
        {...enter(1.15)}
        className="container-lux absolute inset-x-0 bottom-0 flex flex-wrap gap-x-6 gap-y-3 border-t border-ivory/15 py-6"
        style={{ left: 0, right: 0 }}
      >
        {badges.map((b) => (
          <li key={b} className="flex items-center gap-2 text-[0.8125rem] text-ivory/80">
            <Check className="size-3.5 text-pierre" strokeWidth={2} />
            {b}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
