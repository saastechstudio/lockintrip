"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const text =
  "Nous croyons que l'environnement façonne l'ambition. Que les bonnes décisions se prennent loin du bruit. Qu'une semaine bien entourée peut valoir des mois passés seul. Lockin Trip n'est pas un voyage. C'est un cercle. Et il commence par un choix : le tien.";
const highlight = new Set(["cercle.", "tien."]);

function Word({ word, progress, from, to }: { word: string; progress: MotionValue<number>; from: number; to: number }) {
  const opacity = useTransform(progress, [from, to], [0.12, 1]);
  const y = useTransform(progress, [from, to], [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className={cn("inline-block", highlight.has(word) && "italic text-pierre")}>
      {word}&nbsp;
    </motion.span>
  );
}

/** Le manifeste : le texte s'écrit mot à mot au rythme du défilement. */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = text.split(" ");
  const line = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <section id="manifeste" ref={ref} className={cn("relative bg-bordeaux-deep text-ivory", reduce ? "py-32" : "h-[260vh]")}>
      <div className={cn("flex items-center", reduce ? "" : "sticky top-0 h-[100svh]")}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(55% 60% at 50% 50%, rgba(139,58,58,0.45), transparent 70%)" }}
        />
        <div className="container-lux relative">
          <p className="eyebrow flex items-center gap-3 text-pierre">
            <span className="h-px w-8 bg-current opacity-60" />
            Le manifeste
          </p>
          <p className="font-display mt-10 max-w-5xl text-[clamp(1.9rem,4.4vw,4rem)] font-light leading-[1.15] tracking-[-0.015em]">
            <span className="sr-only">{text}</span>
            <span aria-hidden>
              {words.map((w, i) =>
                reduce ? (
                  <span key={i} className={cn(highlight.has(w) && "italic text-pierre")}>{w} </span>
                ) : (
                  <Word key={i} word={w} progress={scrollYProgress} from={(i / words.length) * 0.8} to={(i / words.length) * 0.8 + 0.08} />
                ),
              )}
            </span>
          </p>
          <div className="mt-12 flex items-center gap-4 text-sm text-ivory/60">
            <motion.span className="block h-px w-24 origin-left bg-pierre" style={{ scaleX: reduce ? 1 : line }} />
            Le cercle Lockin Trip
          </div>
        </div>
      </div>
    </section>
  );
}
