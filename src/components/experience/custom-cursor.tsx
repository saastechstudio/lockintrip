"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Curseur sur mesure (souris uniquement) : un point et un anneau qui suit avec inertie,
 * s'agrandit sur les éléments interactifs et affiche l'intention (`data-cursor="Réserver"`).
 * Les éléments `data-magnetic` sont légèrement attirés par le pointeur.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });

  useEffect(() => {
    const ok = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
    if (!ok) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    let magnet: HTMLElement | null = null;

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      const field = el?.closest("input, textarea, select");
      setHidden(!!field);
      const target = el?.closest<HTMLElement>("a, button, [data-cursor], summary, label");
      setActive(!!target && !field);
      setLabel(target?.dataset.cursor ?? "");

      const m = el?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        m.style.transition = "transform 0.25s cubic-bezier(0.22,1,0.36,1)";
        m.style.transform = `translate(${dx * 0.22}px, ${dy * 0.3}px)`;
      }
    };
    const leave = () => {
      setHidden(true);
      release();
    };
    const enter = () => setHidden(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      release();
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[110]">
      <motion.span
        className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory mix-blend-difference"
        style={{ x, y }}
        animate={{ opacity: hidden || active ? 0 : 1 }}
      />
      <motion.span
        className="absolute left-0 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ width: active ? (label ? 92 : 58) : 34, height: active ? (label ? 92 : 58) : 34, opacity: hidden ? 0 : active ? 0.9 : 0.55 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />
      <AnimatePresence>
        {label && !hidden && (
          <motion.span
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[0.66rem] font-medium uppercase tracking-[0.2em] text-ivory mix-blend-difference"
            style={{ x: rx, y: ry }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
