"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Expand, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { hotelHighlights, hotelPhotos } from "@/content/hotel";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const layout = [
  "md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto",
  "md:col-span-5 aspect-[3/2]",
  "md:col-span-5 aspect-[3/2]",
  "md:col-span-6 aspect-[16/10]",
  "md:col-span-6 aspect-[16/10]",
];

export function Hotel() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const count = hotelPhotos.length;
  const go = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <section id="hotel" className="relative bg-ink py-28 text-ivory md:py-40">
      <div className="container-lux">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              tone="ivory"
              eyebrow="Ton lieu de vie"
              title="Sept jours dans un cadre qui élève."
              intro="Un hôtel contemporain au milieu de la végétation : une longue piscine bordée de palmiers, des chambres lumineuses aux murs de béton ciré, des salles de bain en pierre. Le calme nécessaire pour penser, l'espace pour se retrouver."
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <ul className="grid gap-3 rounded-[20px] border border-ivory/10 bg-ivory/[0.04] p-7">
              {hotelHighlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[0.9375rem] text-ivory/85">
                  <Check className="size-4 shrink-0 text-pierre" strokeWidth={1.6} />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-12 md:gap-4">
          {hotelPhotos.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 0.08} className={cn("relative", layout[i])}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Agrandir : ${p.caption}`}
                className="group absolute inset-0 overflow-hidden rounded-[18px] text-left"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                  quality={88}
                  className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.045]"
                  priority={i === 0}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="absolute bottom-5 left-5 flex items-center gap-3">
                  <span className="font-display text-xl font-light text-ivory md:text-2xl">{p.caption}</span>
                </span>
                <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-[12px] bg-ivory/15 text-ivory opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" strokeWidth={1.5} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ivory/40">Photos de l&apos;hôtel. Attribution des chambres à l&apos;arrivée.</p>
      </div>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <AnimatePresence>
          {open && index !== null && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div className="fixed inset-0 z-[60] bg-[#120d0c]/95" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[61] flex flex-col items-center justify-center p-4 md:p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Dialog.Title className="sr-only">{hotelPhotos[index].caption}</Dialog.Title>
                  <Dialog.Description className="sr-only">{hotelPhotos[index].alt}</Dialog.Description>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      className="relative w-full max-w-6xl"
                      style={{ aspectRatio: `${hotelPhotos[index].width} / ${hotelPhotos[index].height}`, maxHeight: "78vh" }}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image src={hotelPhotos[index].src} alt={hotelPhotos[index].alt} fill sizes="(min-width: 1200px) 1200px, 100vw" quality={90} className="rounded-[14px] object-contain" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="mt-6 flex w-full max-w-6xl items-center justify-between text-ivory">
                    <p className="font-display text-xl font-light">
                      {hotelPhotos[index].caption}
                      <span className="ml-3 text-sm text-ivory/45">
                        {index + 1} / {count}
                      </span>
                    </p>
                    <div className="flex gap-2">
                      <button onClick={() => go(-1)} aria-label="Photo précédente" className="grid size-11 place-items-center rounded-[12px] border border-ivory/20 hover:bg-ivory/10">
                        <ArrowLeft className="size-4" />
                      </button>
                      <button onClick={() => go(1)} aria-label="Photo suivante" className="grid size-11 place-items-center rounded-[12px] border border-ivory/20 hover:bg-ivory/10">
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                  <Dialog.Close aria-label="Fermer" className="absolute right-4 top-4 grid size-11 place-items-center rounded-[12px] text-ivory hover:bg-ivory/10">
                    <X className="size-5" />
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
