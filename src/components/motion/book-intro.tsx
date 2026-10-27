"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";

export const INTRO_KEY = "lockin-intro-seen";

/** Durée totale de la séquence avant le fondu vers la landing (s). */
const TOTAL = 3.9;
const inOut = [0.65, 0, 0.35, 1] as const;
const out = [0.22, 1, 0.36, 1] as const;
const GOLD = "#dcc49a";

const portalImages = [
  { src: "/images/phuket/ya-nui.jpg", alt: "" },
  { src: "/images/hotel/piscine-facade.jpg", alt: "" },
  { src: "/images/phuket/phang-nga-james-bond.jpg", alt: "" },
  { src: "/images/activites/catamaran.jpg", alt: "" },
  { src: "/images/phuket/nai-harn-coucher.jpg", alt: "" },
];

const cards = ["/images/phuket/promthep.jpg", "/images/phuket/rawai-longtail.jpg", "/images/hotel/piscine-jardin.jpg"];

/** Texture cuir (bruit fractal) pour la couverture. */
const leather =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/**
 * Séquence d'ouverture cinématique (≈ 4 s) :
 * 1. un livre de cuir noir flotte dans l'obscurité ; 2. il s'ouvre sur un portail de lumière ;
 * 3. la caméra plonge dans le portail (traînées de particules) ; 4. une interface en verre se compose
 * et le logo apparaît avant le fondu vers la landing.
 * Une fois par session, passable, désactivée si l'utilisateur réduit les animations.
 */
export function BookIntro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen" || reduce) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), TOTAL * 1000);
    return () => clearTimeout(t);
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

  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    return runParticles(canvas, ctx);
  }, [done]);

  const skip = () => setDone(true);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          data-book-intro
          className="fixed inset-0 z-[100] overflow-hidden bg-[#050505]"
          exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: out }}
        >
          {/* Lumière d'ambiance */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(45% 45% at 50% 46%, rgba(220,196,154,0.16), transparent 70%)" }}
            animate={{ opacity: [0.4, 1, 1, 0.2] }}
            transition={{ duration: TOTAL, times: [0, 0.3, 0.6, 1] }}
          />

          {/* SCÈNE 1-3 : le livre, le portail, la plongée */}
          <div className="absolute inset-0 grid place-items-center [perspective:1800px]">
            <motion.div
              className="relative aspect-[3/2] w-[min(92vw,50rem)] [transform-style:preserve-3d]"
              style={{ transformOrigin: "75% 50%", x: "-25%" }}
              initial={{ opacity: 0, y: 40, rotateX: 14, rotateY: -22, scale: 0.92, filter: "blur(10px)" }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                y: [40, 0, 0, 0, 0],
                rotateX: [14, 8, 0, 0, 0],
                rotateY: [-22, -12, 0, 0, 0],
                scale: [0.92, 1, 1.04, 2.6, 26],
                filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(2px)", "blur(12px)"],
              }}
              transition={{ duration: 2.9, times: [0, 0.31, 0.62, 0.8, 1], ease: [out, inOut, inOut, [0.7, 0, 0.9, 0.3]] }}
            >
              {/* Reflet au sol */}
              <div
                aria-hidden
                className="absolute -bottom-[34%] left-1/2 h-[24%] w-[46%] rounded-[50%] opacity-60 blur-2xl"
                style={{ background: "radial-gradient(closest-side, rgba(220,196,154,0.35), transparent)" }}
              />

              {/* Intérieur du livre (moitié droite) : le portail */}
              <div className="absolute inset-y-0 right-0 w-1/2 overflow-visible">
                <div className="absolute inset-0 overflow-hidden rounded-r-[8px] bg-[#0b0b0b] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.95)]">
                  <div className="absolute inset-[5%] rounded-[4px] border border-[#dcc49a]/20" />
                </div>
                {/* Rayons */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 size-[190%] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
                  style={{
                    background:
                      "repeating-conic-gradient(from 0deg, rgba(255,240,214,0.13) 0deg 1.2deg, transparent 1.2deg 11deg)",
                    maskImage: "radial-gradient(closest-side, black 18%, transparent 62%)",
                  }}
                  initial={{ opacity: 0, rotate: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 0, 0.9, 0.7, 0], rotate: 40, scale: [0.4, 0.4, 1, 1.1, 1.2] }}
                  transition={{ duration: 2.9, times: [0, 0.38, 0.62, 0.85, 1], ease: "easeOut" }}
                />
                {/* Portail lumineux */}
                <motion.div
                  className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
                  style={{ boxShadow: "0 0 60px 18px rgba(255,236,204,0.55), 0 0 160px 60px rgba(220,196,154,0.35)" }}
                  initial={{ opacity: 0, scale: 0.1 }}
                  animate={{ opacity: [0, 0, 1, 1], scale: [0.1, 0.1, 1, 1.06] }}
                  transition={{ duration: 2.9, times: [0, 0.4, 0.66, 1], ease: out }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle,#fffaf0_0%,#f3e3c4_45%,#c9a86e_100%)]" />
                  {portalImages.map((img, i) => (
                    <motion.div
                      key={img.src}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.25 }}
                      animate={{ opacity: [0, 0.95, 0.95, 0], scale: [1.25, 1.1, 1.05, 1] }}
                      transition={{ duration: 0.5, delay: 1.3 + i * 0.22, times: [0, 0.25, 0.75, 1] }}
                    >
                      <Image src={img.src} alt={img.alt} fill sizes="320px" priority={i === 0} className="object-cover" />
                    </motion.div>
                  ))}
                  <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,rgba(255,244,222,0.85)_75%,#fff6e6_100%)] mix-blend-screen" />
                </motion.div>
              </div>

              {/* Couverture : recto cuir noir, verso doublure */}
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 [transform-style:preserve-3d]"
                style={{ transformOrigin: "left center" }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: [0, 0, -168] }}
                transition={{ duration: 2.0, times: [0, 0.45, 1], ease: inOut }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-r-[8px] bg-[#0d0d0d] shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] [backface-visibility:hidden]">
                  <div className="absolute inset-0 opacity-[0.16] mix-blend-overlay" style={{ backgroundImage: leather, backgroundSize: "240px" }} />
                  <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_20%,rgba(255,255,255,0.09),transparent_60%)]" />
                  <div className="absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-[6%] rounded-[3px] border border-[#dcc49a]/45" />
                  <div className="absolute inset-[7.5%] rounded-[2px] border border-[#dcc49a]/15" />
                  {/* Coins dorés */}
                  {["right-[4%] top-[4%] border-r border-t", "bottom-[4%] right-[4%] border-b border-r"].map((c) => (
                    <span key={c} className={`absolute size-[10%] border-[#dcc49a]/70 ${c}`} />
                  ))}
                  {/* Logo embossé */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-[6%]">
                    <LogoMark className="size-[18%] text-[#dcc49a] drop-shadow-[0_1px_0_rgba(0,0,0,0.9)]" />
                    <p
                      className="font-display text-[clamp(1rem,3.2vw,2rem)] font-light tracking-[0.06em] text-transparent [background-clip:text] [-webkit-background-clip:text]"
                      style={{
                        backgroundImage: "linear-gradient(115deg,#8f7448 0%,#f4e3c1 38%,#b8955f 52%,#f7ead0 70%,#9c7d4d 100%)",
                        filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.9)) drop-shadow(0 -1px 0 rgba(255,255,255,0.08))",
                      }}
                    >
                      LockinTrip
                    </p>
                  </div>
                  {/* Reflet qui balaie le cuir */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                    initial={{ x: "-120%" }}
                    animate={{ x: "260%" }}
                    transition={{ duration: 1.1, delay: 0.25, ease: inOut }}
                  />
                </div>
                <div className="absolute inset-0 rounded-l-[8px] bg-[#111] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="absolute inset-[6%] rounded-[3px] border border-[#dcc49a]/25" />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Particules, rayons et traînées lumineuses */}
          <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />

          {/* Éclair au cœur de la plongée */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#fff6e6]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.55, 0] }}
            transition={{ duration: 3.2, times: [0, 0.76, 0.8, 0.9] }}
          />

          {/* SCÈNE 4 : l'interface en verre se compose */}
          <IntroInterface />

          <button
            type="button"
            onClick={skip}
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

const glass =
  "border border-white/[0.14] bg-white/[0.06] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl";

function Materialize({ delay, className, children }: { delay: number; className?: string; children?: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, scale: 1.08, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, ease: out }}
    >
      {children}
    </motion.div>
  );
}

const line = (w: string, o = "bg-white/25") => <span className={`block h-[3px] rounded-full ${o}`} style={{ width: w }} />;

function IntroInterface() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center px-5 pt-6 md:px-10">
      <Materialize delay={2.9} className={`flex h-12 w-full max-w-5xl items-center justify-between rounded-full px-5 ${glass}`}>
        <LogoMark className="size-6 text-[#dcc49a]" />
        <span className="hidden items-center gap-6 md:flex">
          {["2.5rem", "3rem", "2.2rem", "2.8rem"].map((w) => line(w))}
        </span>
        <span className="h-7 w-20 rounded-full" style={{ background: `linear-gradient(120deg,#b8955f,${GOLD},#f4e3c1)` }} />
      </Materialize>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-10">
        <motion.p
          className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-light leading-none tracking-[0.02em] text-transparent [background-clip:text] [-webkit-background-clip:text]"
          style={{ backgroundImage: "linear-gradient(110deg,#a88a5a 0%,#fbf1dd 30%,#d9bf8f 48%,#fff8ea 62%,#b89764 100%)", backgroundSize: "220% 100%" }}
          initial={{ opacity: 0, scale: 0.94, letterSpacing: "0.2em", filter: "blur(16px)", backgroundPosition: "100% 0%" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0.02em", filter: "blur(0px)", backgroundPosition: "0% 0%" }}
          transition={{ duration: 1, delay: 3.05, ease: out }}
        >
          LockinTrip
        </motion.p>

        <Materialize delay={3.15} className={`flex h-14 w-full max-w-2xl items-center gap-3 rounded-full pl-6 pr-2 md:h-16 ${glass}`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`flex flex-1 flex-col gap-2 ${i > 0 ? "border-l border-white/10 pl-4" : ""} ${i === 2 ? "hidden sm:flex" : ""}`}>
              {line("40%", "bg-[#dcc49a]/60")}
              {line("70%")}
            </span>
          ))}
          <span className="grid size-10 place-items-center rounded-full md:size-12" style={{ background: `linear-gradient(135deg,#f4e3c1,${GOLD},#b8955f)` }}>
            <Search className="size-4 text-black/80" strokeWidth={1.8} />
          </span>
        </Materialize>

        <div className="grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {cards.map((src, i) => (
            <Materialize key={src} delay={3.25 + i * 0.08} className={`overflow-hidden rounded-[18px] ${glass} ${i === 2 ? "hidden md:block" : ""}`}>
              <div className="relative aspect-[16/10]">
                <Image src={src} alt="" fill sizes="260px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2 p-4">
                {line("55%", "bg-white/40")}
                {line("35%", "bg-[#dcc49a]/60")}
              </div>
            </Materialize>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Particules sur canvas : poussière en profondeur de champ, gerbe dorée qui sort du portail (1–2,4 s),
 * puis traînées en hyper-vitesse pendant la plongée (1,9–3,3 s). Retourne la fonction d'arrêt.
 */
function runParticles(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0;
  let H = 0;
  const resize = () => {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 64;
  const s = sprite.getContext("2d")!;
  const g = s.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,248,232,1)");
  g.addColorStop(0.25, "rgba(236,214,172,0.6)");
  g.addColorStop(1, "rgba(220,196,154,0)");
  s.fillStyle = g;
  s.fillRect(0, 0, 64, 64);

  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const dust = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: rand(1, 9), a: rand(0.03, 0.18), vx: rand(-6, 6), vy: rand(-10, -2) }));
  const sparks: { x: number; y: number; vx: number; vy: number; life: number; age: number; r: number }[] = [];
  const stars = Array.from({ length: 520 }, () => ({ x: rand(-1, 1), y: rand(-1, 1), z: rand(0.05, 1), pz: 0 }));
  stars.forEach((st) => (st.pz = st.z));

  const t0 = performance.now();
  let last = t0;
  let raf = 0;
  const smooth = (a: number, b: number, t: number) => {
    const x = Math.min(Math.max((t - a) / (b - a), 0), 1);
    return x * x * (3 - 2 * x);
  };

  const frame = (now: number) => {
    const t = (now - t0) / 1000;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    const cx = W / 2;
    const cy = H / 2;

    // Poussière floue (profondeur de champ)
    const dustAlpha = 1 - smooth(2.0, 2.6, t);
    for (const d of dust) {
      d.x += (d.vx * dt) / W;
      d.y += (d.vy * dt) / H;
      if (d.y < -0.05) d.y = 1.05;
      ctx.globalAlpha = d.a * dustAlpha;
      ctx.drawImage(sprite, d.x * W - d.r * 3, d.y * H - d.r * 3, d.r * 6, d.r * 6);
    }

    // Gerbe de particules qui s'échappe du portail
    if (t > 1.05 && t < 2.4) {
      for (let i = 0; i < 9; i++) {
        const a = rand(0, Math.PI * 2);
        const v = rand(30, 220);
        sparks.push({ x: cx + Math.cos(a) * 20, y: cy + Math.sin(a) * 20, vx: Math.cos(a) * v, vy: Math.sin(a) * v - rand(10, 60), life: rand(0.8, 1.6), age: 0, r: rand(0.6, 2.4) });
      }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.age += dt;
      if (p.age > p.life) {
        sparks.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.985;
      p.vy *= 0.985;
      const life = 1 - p.age / p.life;
      ctx.globalAlpha = life * 0.9;
      const r = p.r * 4;
      ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2);
    }

    // Hyper-vitesse : traînées dorées vers la caméra
    const warpIn = smooth(2.3, 2.65, t);
    const warpOut = 1 - smooth(3.0, 3.5, t);
    const speed = 2.6 * warpIn * warpOut;
    if (speed > 0.001) {
      const f = Math.min(W, H) * 0.55;
      ctx.lineCap = "round";
      for (const st of stars) {
        st.pz = st.z;
        st.z -= speed * dt;
        if (st.z <= 0.02) {
          st.z = 1;
          st.pz = 1;
          st.x = rand(-1, 1);
          st.y = rand(-1, 1);
        }
        const x1 = cx + (st.x / st.pz) * f;
        const y1 = cy + (st.y / st.pz) * f;
        const x2 = cx + (st.x / st.z) * f;
        const y2 = cy + (st.y / st.z) * f;
        const k = 1 - st.z;
        ctx.globalAlpha = Math.min(1, k * 1.4) * warpIn * warpOut;
        ctx.strokeStyle = k > 0.75 ? "rgba(255,250,240,1)" : "rgba(226,203,160,1)";
        ctx.lineWidth = 0.4 + k * 2.2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    if (t < TOTAL + 1) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}
