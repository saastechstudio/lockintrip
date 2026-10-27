"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import type { IntroScene } from "./intro/scene";

export const INTRO_KEY = "lockin-intro-seen";

/** Fin de la scène 3D, début de la carte logo, fin totale (s). */
const T_SCENE = 3.75;
const T_END = 4.95;

const clamp = (x: number) => Math.min(Math.max(x, 0), 1);
const range = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (x: number) => 1 - Math.pow(1 - x, 4);

/**
 * Intro cinématique WebGL (≈ 5 s) : livre en cuir bordeaux révélé par un faisceau de lumière,
 * ouverture, pages qui s'envolent, plongée dans la lumière, puis carte logo sur beige Tulum.
 * Une fois par session, passable, ignorée si les animations sont réduites ou si WebGL est indisponible.
 * `?intro-capture` expose `window.__introSeek(t)` pour un rendu image par image.
 */
export function BookIntro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen" || reduce) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const capture = new URLSearchParams(location.search).has("intro-capture");
    let scene: IntroScene | null = null;
    let raf = 0;
    let cancelled = false;
    const onResize = () => scene?.resize();

    const paintCard = (t: number) => {
      const card = range(t, T_SCENE - 0.05, T_SCENE + 0.05);
      const m = ease(range(t, 3.8, 4.35));
      const w = ease(range(t, 3.95, 4.55));
      const r = ease(range(t, 4.1, 4.6));
      if (cardRef.current) cardRef.current.style.opacity = String(card);
      if (markRef.current) {
        markRef.current.style.opacity = String(m);
        markRef.current.style.transform = `translateY(${(1 - m) * 14}px) scale(${0.92 + 0.08 * m})`;
        markRef.current.style.filter = `blur(${(1 - m) * 8}px)`;
      }
      if (wordRef.current) {
        wordRef.current.style.opacity = String(w);
        wordRef.current.style.letterSpacing = `${0.7 - 0.36 * w}em`;
        wordRef.current.style.filter = `blur(${(1 - w) * 10}px)`;
      }
      if (subRef.current) {
        subRef.current.style.opacity = String(w);
        subRef.current.style.letterSpacing = `${1 - 0.38 * w}em`;
      }
      if (ruleRef.current) ruleRef.current.style.transform = `scaleX(${r})`;
    };

    (async () => {
      try {
        const [{ createIntroScene }] = await Promise.all([import("./intro/scene"), document.fonts?.ready]);
        if (cancelled || !canvasRef.current) return;
        const fontFamily = getComputedStyle(document.body).fontFamily || "sans-serif";
        scene = createIntroScene(canvasRef.current, { mobile: window.innerWidth < 768, fontFamily });
        window.addEventListener("resize", onResize);

        if (capture) {
          (window as unknown as { __introSeek: (t: number) => void }).__introSeek = (t: number) => {
            scene?.render(Math.min(t, T_SCENE));
            paintCard(t);
          };
          return;
        }

        scene.render(0);
        const t0 = performance.now();
        const loop = (now: number) => {
          const t = (now - t0) / 1000;
          if (t < T_SCENE + 0.1) scene?.render(t);
          paintCard(t);
          if (t >= T_END) {
            setDone(true);
            return;
          }
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      } catch (error) {
        console.warn("[intro] WebGL indisponible, intro ignorée", error);
        setDone(true);
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      scene?.dispose();
    };
  }, [reduce]);

  useEffect(() => {
    if (!done) return;
    document.documentElement.style.overflow = "";
    document.documentElement.dataset.intro = "seen";
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* stockage indisponible : l'intro se rejouera, sans conséquence */
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          data-book-intro
          className="fixed inset-0 z-[100] overflow-hidden bg-[#0e0507]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />

          {/* Carte finale : logo sur beige Tulum */}
          <div ref={cardRef} aria-hidden className="absolute inset-0 grid place-items-center bg-[#f2eadf] opacity-0">
            <div className="flex flex-col items-center">
              <div ref={markRef} className="opacity-0">
                <LogoMark className="size-16 text-bordeaux md:size-20" />
              </div>
              <div ref={wordRef} className="mt-7 pl-[0.34em] text-[1.9rem] font-medium leading-none text-ink opacity-0 md:text-[2.6rem]">
                LOCKIN
              </div>
              <div ref={subRef} className="mt-3 pl-[0.62em] text-[0.95rem] leading-none text-ink/70 opacity-0 md:text-[1.15rem]">
                TRIP
              </div>
              <span ref={ruleRef} className="mt-8 block h-px w-24 origin-center scale-x-0 bg-bordeaux/70" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDone(true)}
            aria-label="Passer l'introduction"
            className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full border border-white/15 text-white/60 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
