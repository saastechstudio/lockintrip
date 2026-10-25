"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startingPrice } from "@/content/offers";
import { totalCapacity, totalTaken } from "@/content/sessions";
import { formatPrice } from "@/lib/utils";

/** Barre de réservation flottante : visible après le hero, masquée sur le CTA final et le footer. */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const end = document.getElementById("final");
    let pastHero = false;
    let nearEnd = false;
    const update = () => setVisible(pastHero && !nearEnd);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.85;
      update();
    };
    const io = end
      ? new IntersectionObserver(([entry]) => {
          nearEnd = entry.isIntersecting || entry.boundingClientRect.top < 0;
          update();
        })
      : null;
    if (end && io) io.observe(end);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const remaining = totalCapacity - totalTaken;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 md:inset-x-auto md:left-1/2 md:bottom-6 md:-translate-x-1/2"
        >
          <div className="flex items-center justify-between gap-4 rounded-full border border-ink/[0.06] bg-ivory/85 py-2 pl-5 pr-2 shadow-[0_20px_50px_-20px_rgba(23,22,18,0.45)] backdrop-blur-xl backdrop-saturate-150 md:gap-8 md:pl-7">
            <div className="min-w-0 leading-tight">
              <p className="flex items-center gap-2 truncate text-[0.8125rem] font-medium text-ink">
                <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald" />
                {remaining} places · Phuket 2027
              </p>
              <p className="truncate text-xs text-muted">Dès {formatPrice(startingPrice)}<span className="hidden sm:inline"> · en 3 ou 4 fois sans frais</span></p>
            </div>
            <Button asChild size="sm" variant="emerald" className="shrink-0">
              <Link href="/reserver">
                Réserver ma place
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
