"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { media } from "@/content/media";
import { startingPrice } from "@/content/offers";
import { hero } from "@/content/story";
import { formatPrice } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Ouverture : la promesse, le prix, les places restantes et des photos du sud de Phuket. */
export function Hero({ taken, capacity }: { taken: number; capacity: number }) {
  const reduce = useReducedMotion();
  const remaining = Math.max(capacity - taken, 0);
  const pct = capacity ? Math.round((taken / capacity) * 100) : 0;

  // Une seule entrée au chargement : fondu et légère montée, petit décalage.
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease, delay } };

  return (
    <section className="relative isolate overflow-hidden bg-[#1a0c0f] text-ivory">

      <div className="container-lux grid min-h-[100svh] items-center gap-14 pb-20 pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="lg:col-span-6">
          <motion.p {...enter(0)} className="text-sm text-ivory/70">
            {hero.meta}
          </motion.p>

          <h1 className="font-display mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.04] tracking-[-0.02em] text-balance">
            <motion.span className="block" {...enter(0.05)}>
              {hero.title}
            </motion.span>
          </h1>

          <motion.p {...enter(0.1)} className="mt-7 max-w-xl text-[1rem] leading-relaxed text-ivory/80 md:text-[1.0625rem]">
            {hero.intro}
          </motion.p>

          <motion.div {...enter(0.1)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="light">
              <Link href="/reserver">
                Je réserve ma place
                <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="#transformation">
                Découvrir l&apos;expérience
                <ArrowDown />
              </Link>
            </Button>
          </motion.div>

          <motion.p {...enter(0.1)} className="mt-5 text-sm text-ivory/70">
            <span className="font-medium text-ivory">Dès {formatPrice(startingPrice)}</span> · hôtel, petits-déjeuners, déjeuners, activités, transports et assurance voyage compris · payable en 4 fois
          </motion.p>

          <motion.div {...enter(0.1)} className="mt-8 max-w-md">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ivory/85">
                <span className="font-display text-2xl tabular-nums text-ivory">{remaining}</span> places restantes sur {capacity}
              </span>
              <span className="text-ivory/55">{taken > 0 ? `${taken} déjà réservées` : "Inscriptions ouvertes"}</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-ivory/12">
              <motion.div
                className="h-full rounded-full bg-pierre"
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${Math.max(pct, 3)}%` }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
              />
            </div>
            <p className="mt-3 text-xs text-ivory/55">3 sessions de 20 personnes · suivi personnalisé · mars – avril 2027</p>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6">
          {media.hero.video ? (
            <motion.div {...enter(0.1)} className="relative aspect-[4/5] overflow-hidden rounded-[22px] sm:aspect-[5/4]">
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
               
                {...enter(0.1)}
                className="absolute left-0 top-0 h-[72%] w-[74%] overflow-hidden rounded-[20px] border border-ivory/10 "
              >
                <Image src={media.hero.poster.src!} alt={media.hero.poster.alt} fill priority sizes="(min-width: 1024px) 30vw, 70vw" className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-[6px] bg-ink/60 px-2 py-1 text-xs text-ivory/90">
                  Ya Nui · sud de Phuket
                </figcaption>
              </motion.figure>
              <motion.figure
               
                {...enter(0.1)}
                className="absolute bottom-0 right-0 h-[52%] w-[56%] overflow-hidden rounded-[20px] border border-ivory/15 "
              >
                <Image src="/images/activites/catamaran.jpg" alt="Catamaran sur la mer d'Andaman" fill sizes="(min-width: 1024px) 22vw, 55vw" className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 rounded-[6px] bg-ink/60 px-2 py-1 text-xs text-ivory/90">
                  La soirée de clôture
                </figcaption>
              </motion.figure>
              <motion.figure
                {...enter(0.1)}
                className="absolute right-[6%] top-[6%] hidden h-[30%] w-[26%] overflow-hidden rounded-[16px] border border-ivory/15  sm:block"
              >
                <Image src="/images/phuket/nai-harn-coucher.jpg" alt="Coucher de soleil sur Nai Harn" fill sizes="15vw" className="object-cover" />
              </motion.figure>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
