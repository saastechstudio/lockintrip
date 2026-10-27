"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startingPrice } from "@/content/offers";
import { site } from "@/content/site";
import { formatPrice } from "@/lib/utils";

/** Barre de réservation flottante : visible après le hero, masquée sur le CTA final et le footer. */
export function StickyCta({ remaining }: { remaining: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const end = document.getElementById("final");
    let pastHero = false;
    let nearEnd = false;
    const update = () => setVisible(pastHero && !nearEnd);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.6;
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
          <div className="flex items-center justify-between gap-4 rounded-[18px] border border-concrete/40 bg-ivory/90 py-2 pl-5 pr-2 shadow-[0_20px_50px_-24px_rgba(60,45,35,0.45)] backdrop-blur-xl backdrop-saturate-150 md:gap-8 md:pl-7">
            <div className="min-w-0 leading-tight">
              <p className="flex items-center gap-2 truncate text-[0.8125rem] font-medium text-ink">
                <span className="size-1.5 shrink-0 rounded-full bg-bordeaux" />
                {remaining} places restantes<span className="hidden sm:inline"> · Phuket 2027</span>
              </p>
              <p className="truncate text-xs text-muted"><span className="hidden sm:inline">Prix fondateur </span>dès {formatPrice(startingPrice)}<span className="hidden sm:inline"> · en 4 fois</span><span className="hidden sm:inline"> · paiement sécurisé</span></p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Poser une question sur WhatsApp"
              className="grid size-10 place-items-center rounded-[12px] border border-concrete/45 text-bordeaux transition-colors hover:border-bordeaux hover:bg-bordeaux hover:text-ivory"
            >
              <MessageCircle className="size-[18px]" strokeWidth={1.6} />
            </a>
            <Button asChild size="sm" className="shrink-0" data-magnetic data-cursor="Réserver">
              <Link href="/reserver">
                <span className="sm:hidden">Réserver</span>
                <span className="hidden sm:inline">Je participe à Phuket 2027</span>
                <ArrowUpRight />
              </Link>
            </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
