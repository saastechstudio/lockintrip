"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, BadgeCheck, Flame, Palmtree, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { media } from "@/content/media";
import { hero } from "@/content/story";

const ease = [0.22, 1, 0.36, 1] as const;
const badgeIcons = { flame: Flame, star: Star, palm: Palmtree, check: BadgeCheck };

/**
 * Ouverture immersive : promesse de transformation, rareté chiffrée, et un collage
 * de moments Phuket (ou la vidéo de `media.hero.video` quand elle est fournie).
 * Les photos restent affichées près de leur taille réelle pour rester nettes.
 */
export function Hero({ taken, capacity }: { taken: number; capacity: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-28%"]);
  const remaining = Math.max(capacity - taken, 0);
  const pct = capacity ? Math.round((taken / capacity) * 100) : 0;

  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.2, ease, delay } };

  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.4, ease, delay } };

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#1a0c0f] text-ivory">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 85% 25%, rgba(139,58,58,0.38), transparent 70%), radial-gradient(50% 60% at 0% 100%, rgba(107,31,43,0.5), transparent 70%)",
        }}
      />
      <div aria-hidden className="tex-concrete absolute inset-0 -z-10 opacity-[0.07] mix-blend-screen" />

      <div className="container-lux grid min-h-[100svh] items-center gap-14 pb-20 pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="lg:col-span-6">
          <motion.ul {...enter(0.15)} className="flex flex-wrap gap-2">
            {hero.badges.map((b) => {
              const Icon = badgeIcons[b.icon];
              return (
                <li
                  key={b.label}
                  className="flex items-center gap-1.5 rounded-full border border-ivory/15 bg-ivory/[0.06] px-3 py-1.5 text-[0.75rem] text-ivory/85 backdrop-blur-sm"
                >
                  <Icon className="size-3.5 text-pierre" strokeWidth={1.6} />
                  {b.label}
                </li>
              );
            })}
          </motion.ul>

          <h1 className="font-display mt-9 text-[clamp(2.6rem,6.2vw,5.4rem)] font-light leading-[0.98] tracking-[-0.03em] text-balance">
            <motion.span
              className="block"
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, y: 36, filter: "blur(10px)" },
                    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                    transition: { duration: 1.5, ease, delay: 0.3 },
                  })}
            >
              {hero.title}
            </motion.span>
          </h1>

          <motion.p {...enter(0.6)} className="mt-7 max-w-xl text-[1rem] leading-relaxed text-ivory/80 md:text-[1.0625rem]">
            {hero.intro}
          </motion.p>

          <motion.div {...enter(0.75)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="light">
              <Link href="/reserver">
                Je réserve ma place
                <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="#transformation">
                Découvrir l&apos;expérience
                <ArrowDown className="transition-transform duration-500 group-hover/btn:translate-y-0.5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div {...enter(0.9)} className="mt-10 max-w-md">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ivory/85">
                <span className="font-display text-2xl text-ivory">{remaining}</span> places restantes sur {capacity}
              </span>
              <span className="text-ivory/55">{taken > 0 ? `${taken} déjà réservées` : "Inscriptions ouvertes"}</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-ivory/12">
              <motion.div
                className="h-full rounded-full bg-pierre"
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${Math.max(pct, 3)}%` }}
                transition={{ duration: 1.6, ease, delay: 1.1 }}
              />
            </div>
            <p className="mt-3 text-xs text-ivory/55">3 sessions de 20 personnes · mars – avril 2027 · paiement sécurisé</p>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6">
          {media.hero.video ? (
            <motion.div {...enter(0.4)} className="relative aspect-[4/5] overflow-hidden rounded-[22px] sm:aspect-[5/4]">
              <video
                className="absolute inset-0 size-full object-cover"
                src={media.hero.video}
                poster={media.hero.poster.src}
                autoPlay
                muted
                loop
                playsInline
              />
            </motion.div>
          ) : (
            <div className="relative mx-auto aspect-[1/1] w-full max-w-[34rem] sm:aspect-[6/5]">
              <motion.figure
                style={{ y: yBack }}
                {...fade(0.35)}
                className="absolute left-0 top-0 h-[72%] w-[74%] overflow-hidden rounded-[20px] border border-ivory/10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]"
              >
                <div className="absolute inset-0 animate-kenburns">
                  <Image src={media.hero.poster.src!} alt={media.hero.poster.alt} fill priority sizes="(min-width: 1024px) 30vw, 70vw" className="object-cover" />
                </div>
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/30 px-3 py-1 text-[0.7rem] text-ivory/90 backdrop-blur-md">
                  L&apos;excursion
                </figcaption>
              </motion.figure>
              <motion.figure
                style={{ y: yFront }}
                {...fade(0.55)}
                className="absolute bottom-0 right-0 h-[52%] w-[56%] overflow-hidden rounded-[20px] border border-ivory/15 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
              >
                <Image src="/images/activites/catamaran.jpg" alt="Catamaran sur la mer d'Andaman" fill sizes="(min-width: 1024px) 22vw, 55vw" className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/30 px-3 py-1 text-[0.7rem] text-ivory/90 backdrop-blur-md">
                  La soirée de clôture
                </figcaption>
              </motion.figure>
              <motion.figure
                {...fade(0.7)}
                className="absolute right-[6%] top-[6%] hidden h-[30%] w-[26%] overflow-hidden rounded-[16px] border border-ivory/15 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:block"
              >
                <Image src="/images/phuket-coucher-soleil.jpg" alt="Coucher de soleil à Phuket" fill sizes="15vw" className="object-cover" />
              </motion.figure>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
