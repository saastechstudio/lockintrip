"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/visuals/scene";
import { HeroScene } from "@/components/visuals/hero-scene";
import { media } from "@/content/media";
import { site } from "@/content/site";

const badges = ["Hôtel inclus", "Déjeuners inclus", "Activités incluses", "Excursion incluse", "Communauté privée"];
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.3, ease, delay },
        };

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[44rem] overflow-hidden bg-ink text-ivory">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {media.hero.poster.src || media.hero.video ? (
          <div className="absolute inset-0 animate-kenburns">
          <Scene src={media.hero.poster.src} alt={media.hero.poster.alt} priority className="h-full w-full">
            {media.hero.video && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={media.hero.video}
                poster={media.hero.poster.src}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden
              />
            )}
          </Scene>
          </div>
        ) : (
          <HeroScene />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,12,14,0.68)_0%,rgba(24,12,14,0.32)_48%,rgba(24,12,14,0.08)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#180c0e]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#180c0e]/45 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="container-lux relative z-10 flex h-full flex-col justify-end pb-10 pt-32 md:pb-14">
        <motion.p {...enter(0.2)} className="eyebrow flex items-center gap-3 text-ivory/80">
          <span className="size-1.5 rounded-full bg-pierre" />
          {site.edition}
        </motion.p>

        <h1 className="mt-6">
          <motion.span
            {...(reduce
              ? {}
              : { initial: { opacity: 0, y: 40, filter: "blur(10px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 1.6, ease, delay: 0.35 } })}
            className="font-display block text-[clamp(3.6rem,13vw,11.5rem)] font-light leading-[0.86] tracking-[-0.035em]"
          >
            LOCKIN TRIP
          </motion.span>
          <motion.span {...enter(0.6)} className="font-display mt-4 block text-2xl font-light italic text-ivory/90 md:mt-6 md:text-[2.4rem]">
            {site.tagline}
          </motion.span>
        </h1>

        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12 md:items-end">
          <motion.p {...enter(0.8)} className="max-w-xl text-[0.98rem] leading-relaxed text-ivory/80 md:col-span-6 md:text-[1.0625rem]">
            {site.description}
          </motion.p>
          <motion.div {...enter(0.95)} className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end">
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

        <motion.ul {...enter(1.15)} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-ivory/15 pt-6 md:mt-12">
          {badges.map((b) => (
            <li key={b} className="flex items-center gap-2 text-[0.8125rem] text-ivory/80">
              <Check className="size-3.5 text-pierre" strokeWidth={2} />
              {b}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
