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
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-white/25 bg-bordeaux-deep/70 px-4 py-4 shadow-[0_12px_30px_-12px_rgba(40,0,10,0.7)] backdrop-blur-md xl:block"
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: "none" }}
    >
      <div className="absolute right-[calc(1rem+5px)] top-4 h-[calc(100%-2rem)] w-px bg-ivory/20">
        <motion.div className="h-full w-full origin-top bg-ivory" style={{ scaleY: progress }} />
      </div>
      <ul className="relative flex flex-col gap-2.5">
        {chapters.map((c) => {
          const on = active === c.id;
          return (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-label={c.label} className="group pointer-events-none relative flex items-center justify-end text-ivory">
                <span
                  className={cn(
                    "glass-chip bg-bordeaux-deep/75 absolute right-full mr-4 whitespace-nowrap rounded-full px-3 py-1 text-[0.8125rem] text-ivory transition-[opacity,transform] duration-200",
                    on ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70",
                  )}
                >
                  <span className="font-display mr-2">{c.n}</span>
                  {c.label}
                </span>
                <span className={cn(visible ? "pointer-events-auto" : "pointer-events-none", "block size-[11px] cursor-pointer rounded-full outline outline-[7px] outline-transparent border border-ivory transition-[transform,background-color] duration-200", on ? "scale-100 bg-ivory" : "scale-[0.55] bg-transparent")} />
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
