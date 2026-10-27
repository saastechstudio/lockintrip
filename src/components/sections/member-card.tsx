"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";

const leather =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const foil = { backgroundImage: "linear-gradient(115deg,#a9a39a 0%,#f7f4ef 35%,#d6c8b8 52%,#fbf8f3 68%,#a9a39a 100%)" };

/**
 * « Le cercle » : la carte de membre fondateur, personnalisée avec le prénom du visiteur
 * et le numéro de la prochaine place (compteur réel). Inclinaison 3D et reflet qui suivent la souris.
 */
export function MemberCard({ taken, capacity }: { taken: number; capacity: number }) {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const next = Math.min(taken + 1, capacity);
  const number = String(next).padStart(3, "0");

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-14, 14]), { stiffness: 180, damping: 18 });
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 180, damping: 18 });
  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(py, [0, 1], ["0%", "100%"]);
  const sheen = useMotionTemplate`radial-gradient(60% 70% at ${sheenX} ${sheenY}, rgba(255,247,235,0.28), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <section id="cercle" className="relative overflow-hidden bg-bordeaux-deep py-28 text-ivory md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[46rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #8b3a3a, transparent 65%)" }}
      />
      <div className="container-lux relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="ivory"
            eyebrow="Le cercle"
            title="Ta place porte un numéro."
            intro="Les soixante premiers membres forment le cercle fondateur de Lockin Trip. Écris ton prénom : voici la carte qui t'attend."
          />
          <Reveal delay={0.2} className="mt-10 max-w-sm">
            <label htmlFor="member-name" className="eyebrow text-ivory/55">
              Ton prénom
            </label>
            <input
              id="member-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 18))}
              placeholder="Ton prénom"
              autoComplete="given-name"
              className="font-display mt-3 w-full border-b border-ivory/25 bg-transparent pb-3 text-3xl font-light text-ivory outline-none transition-colors placeholder:text-ivory/25 focus:border-pierre"
            />
            <Button asChild size="lg" variant="light" className="mt-10" data-magnetic data-cursor="Rejoindre">
              <Link href="/reserver">
                Réserver la place n° {number}
                <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="mx-auto max-w-[34rem] [perspective:1400px]" onPointerMove={onMove} onPointerLeave={onLeave}>
            <motion.div
              className="relative aspect-[1.586] w-full overflow-hidden rounded-[22px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)] [transform-style:preserve-3d]"
              style={{ rotateX, rotateY, background: "linear-gradient(135deg,#5c1723 0%,#3f0c15 55%,#2b0a10 100%)" }}
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: leather, backgroundSize: "220px" }} />
              <motion.div className="absolute inset-0" style={{ background: sheen }} />
              <div className="absolute inset-[5%] rounded-[12px] border border-pierre/30" />

              <div className="absolute inset-[9%] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <LogoMark className="size-9 text-pierre" />
                    <div className="leading-none">
                      <p className="text-[0.8rem] font-medium tracking-[0.34em] text-transparent [-webkit-background-clip:text] [background-clip:text]" style={foil}>
                        LOCKIN
                      </p>
                      <p className="mt-1 text-[0.55rem] tracking-[0.62em] text-pierre/70">TRIP</p>
                    </div>
                  </div>
                  <p className="eyebrow hidden text-[0.6rem] text-pierre/80 sm:block">Membre fondateur</p>
                </div>

                <p
                  className="font-display text-[clamp(1.8rem,5vw,3rem)] font-light leading-none text-transparent [-webkit-background-clip:text] [background-clip:text]"
                  style={foil}
                >
                  {name.trim() || "\u00a0"}
                </p>

                <div className="flex items-end justify-between text-pierre/85">
                  <div>
                    <p className="text-[0.55rem] uppercase tracking-[0.3em] text-pierre/55">Place</p>
                    <p className="font-display mt-1 whitespace-nowrap text-base tabular-nums sm:text-xl">
                      N° {number} <span className="text-pierre/50">/ {String(capacity).padStart(3, "0")}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.55rem] uppercase tracking-[0.3em] text-pierre/55">Édition fondatrice</p>
                    <p className="mt-1 whitespace-nowrap text-[0.62rem] tracking-[0.1em] sm:text-sm sm:tracking-[0.12em]">PHUKET · MARS 2027</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
