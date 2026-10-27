"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ease = [0.65, 0, 0.35, 1] as const;
const out = [0.22, 1, 0.36, 1] as const;
export const INTRO_KEY = "lockin-intro-seen";

/**
 * Introduction « livre qui s'ouvre » : la couverture pivote sur sa reliure, révèle la première page,
 * puis le livre plonge vers la landing. Une fois par session, passable, désactivée si l'utilisateur
 * réduit les animations. Le script de `layout.tsx` masque l'overlay avant le premier rendu si déjà vue.
 */
export function BookIntro() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen" || reduce) {
      setStage(3);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = [setTimeout(() => setStage(1), 1100), setTimeout(() => setStage(2), 3100), setTimeout(() => setStage(3), 4200)];
    return () => t.forEach(clearTimeout);
  }, [reduce]);

  useEffect(() => {
    if (stage !== 3) return;
    document.documentElement.style.overflow = "";
    document.documentElement.dataset.intro = "seen";
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* stockage indisponible : l'intro se rejouera, sans conséquence */
    }
  }, [stage]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          key="intro"
          data-book-intro
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#140809]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: out }}
          onClick={() => setStage(3)}
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(55% 55% at 50% 50%, rgba(139,58,58,0.35), transparent 70%)" }}
          />

          <motion.div
            className="relative aspect-[3/2] w-[min(96vw,52rem)] [perspective:2400px]"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={
              stage === 2
                ? { opacity: 0, scale: 5, y: 0 }
                : { opacity: 1, scale: 1, y: 0, x: stage === 0 ? "-25%" : "0%" }
            }
            transition={stage === 2 ? { duration: 1.2, ease: [0.7, 0, 0.84, 0] } : { duration: stage === 0 ? 1.1 : 1.6, ease: stage === 0 ? out : ease }}
          >
            {/* Page de droite (sous la couverture) */}
            <div className="absolute inset-y-0 right-0 flex w-1/2 flex-col justify-between overflow-hidden rounded-r-[10px] bg-[#f4efe7] p-[6%] text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/15 to-transparent" />
              <div className="pointer-events-none absolute inset-y-[2%] -right-[3px] w-[3px] rounded-r bg-[repeating-linear-gradient(180deg,#e6ddd0_0_2px,#cfc4b5_2px_3px)]" />
              <motion.p
                className="eyebrow text-bordeaux"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 1 ? 1 : 0 }}
                transition={{ duration: 0.8, delay: stage >= 1 ? 0.9 : 0 }}
              >
                Chapitre I · Phuket
              </motion.p>
              <motion.p
                className="font-display text-[clamp(1.1rem,3.2vw,2.4rem)] font-light leading-[1.08] tracking-[-0.02em]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 12 }}
                transition={{ duration: 1, ease: out, delay: stage >= 1 ? 1.05 : 0 }}
              >
                Une semaine qui peut changer les cinq prochaines années.
              </motion.p>
              <motion.p
                className="text-[clamp(0.55rem,1.1vw,0.75rem)] text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 1 ? 1 : 0 }}
                transition={{ duration: 0.8, delay: stage >= 1 ? 1.3 : 0 }}
              >
                Édition fondatrice · Mars 2027
              </motion.p>
            </div>

            {/* Couverture : recto (couverture) et verso (page de gauche) */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 [transform-style:preserve-3d]"
              style={{ transformOrigin: "left center" }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: stage >= 1 ? -180 : 0 }}
              transition={{ duration: 1.6, ease }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-r-[10px] bg-bordeaux-deep text-ivory shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] [backface-visibility:hidden]">
                <div className="tex-concrete absolute inset-0 opacity-30 mix-blend-overlay" />
                <div className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
                <div className="absolute inset-[6%] rounded-[4px] border border-pierre/30" />
                <p className="eyebrow relative text-[clamp(0.45rem,1vw,0.6875rem)] text-pierre/80">Édition fondatrice 2027</p>
                <p className="font-display relative mt-[6%] text-center text-[clamp(1.6rem,5vw,3.6rem)] font-light leading-[0.9] tracking-[0.12em]">
                  LOCKIN
                  <br />
                  TRIP
                </p>
                <span className="relative mt-[6%] h-px w-[18%] bg-pierre/60" />
                <p className="font-display relative mt-[5%] text-[clamp(0.6rem,1.4vw,0.95rem)] italic text-ivory/75">
                  L&apos;accélérateur d&apos;objectifs de vie
                </p>
              </div>
              <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-l-[10px] bg-[#efe8de] p-[6%] text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/15 to-transparent" />
                <p className="font-display text-[clamp(0.9rem,2.4vw,1.6rem)] font-light text-bordeaux">LT</p>
                <p className="font-display text-[clamp(0.8rem,1.9vw,1.3rem)] font-light italic leading-snug text-ink-soft">
                  «&nbsp;Parfois, changer d&apos;environnement est la première étape pour changer de trajectoire.&nbsp;»
                </p>
                <p className="text-[clamp(0.55rem,1.1vw,0.75rem)] text-muted">7 jours · 20 personnes · Phuket</p>
              </div>
            </motion.div>
          </motion.div>

          <button
            type="button"
            onClick={() => setStage(3)}
            className="absolute bottom-8 right-8 text-[0.7rem] uppercase tracking-[0.24em] text-ivory/50 transition-colors hover:text-ivory"
          >
            Passer
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
