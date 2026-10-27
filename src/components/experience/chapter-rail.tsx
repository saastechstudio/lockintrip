"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Les sections deviennent les chapitres d'un livre (dans la continuité de l'intro). */
export const chapters = [
  { id: "probleme", n: "I", label: "Le constat" },
  { id: "manifeste", n: "II", label: "Le manifeste" },
  { id: "transformation", n: "III", label: "La transformation" },
  { id: "pour-qui", n: "IV", label: "Pour qui" },
  { id: "journee", n: "V", label: "Une journée" },
  { id: "phuket", n: "VI", label: "Le cadre" },
  { id: "objectifs", n: "VII", label: "Tes objectifs" },
  { id: "experts", n: "VIII", label: "Les experts" },
  { id: "sport", n: "IX", label: "Le sport" },
  { id: "hotel", n: "X", label: "L'hôtel" },
  { id: "cercle", n: "XI", label: "Le cercle" },
  { id: "tarifs", n: "XII", label: "Les tarifs" },
  { id: "faq", n: "XIII", label: "Questions" },
];

/** Fil de chapitres fixé à droite (grand écran) : position dans le récit et navigation. */
export function ChapterRail() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      const end = document.getElementById("final")?.getBoundingClientRect().top ?? Infinity;
      setVisible(window.scrollY > window.innerHeight * 0.7 && end > window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.nav
      aria-label="Chapitres"
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 mix-blend-difference xl:block"
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: "none" }}
    >
      <div className="absolute right-[5px] top-0 h-full w-px bg-ivory/20">
        <motion.div className="h-full w-full origin-top bg-ivory" style={{ scaleY: progress }} />
      </div>
      <ul className="relative flex flex-col gap-2.5">
        {chapters.map((c) => {
          const on = active === c.id;
          return (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-label={c.label} className="group pointer-events-none flex items-center justify-end gap-3 text-ivory">
                <span
                  className={cn(
                    "whitespace-nowrap text-[0.68rem] uppercase tracking-[0.22em] transition-all duration-500",
                    on ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70",
                  )}
                >
                  <span className="font-display mr-2 normal-case tracking-normal">{c.n}</span>
                  {c.label}
                </span>
                <span className={cn(visible ? "pointer-events-auto" : "pointer-events-none", "block size-[11px] cursor-pointer rounded-full outline outline-[7px] outline-transparent border border-ivory transition-all duration-500", on ? "scale-100 bg-ivory" : "scale-[0.55] bg-transparent")} />
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
