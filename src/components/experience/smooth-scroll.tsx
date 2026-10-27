"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Défilement fluide (Lenis) sur tout le site. Suspendu tant que l'intro est à l'écran,
 * désactivé si l'utilisateur réduit les animations.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -96 }, autoRaf: true });
    const sync = () => {
      const introPlaying = !!document.querySelector("[data-book-intro]") && document.documentElement.dataset.intro !== "seen";
      if (introPlaying) lenis.stop();
      else lenis.start();
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
    return () => {
      mo.disconnect();
      lenis.destroy();
    };
  }, []);
  return null;
}
