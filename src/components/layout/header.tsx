"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = overHero && !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[84rem] items-center justify-between rounded-[18px] px-4 transition-all duration-700 ease-[var(--ease-lux)] md:h-[4.25rem] md:px-6",
          light
            ? "bg-transparent"
            : "border border-concrete/30 bg-ivory/80 shadow-[0_12px_40px_-26px_rgba(60,45,35,0.35)] backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <Logo tone={light ? "ivory" : "ink"} />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative text-[0.8125rem] tracking-[0.06em] transition-colors duration-500 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-500 hover:after:w-full",
                    light ? "text-ivory/85 hover:text-ivory" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant={light ? "light" : "primary"} className="hidden sm:inline-flex">
            <Link href="/reserver">
              Réserver
              <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                aria-label="Ouvrir le menu"
                className={cn(
                  "grid size-10 place-items-center rounded-full transition-colors lg:hidden",
                  light ? "text-ivory hover:bg-ivory/10" : "text-ink hover:bg-ink/5",
                )}
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      className="fixed inset-x-3 top-3 z-50 rounded-[20px] bg-ivory p-6 shadow-2xl"
                      initial={{ opacity: 0, y: -16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex items-center justify-between">
                        <Logo />
                        <Dialog.Close aria-label="Fermer le menu" className="grid size-10 place-items-center rounded-full hover:bg-ink/5">
                          <X className="size-5" strokeWidth={1.5} />
                        </Dialog.Close>
                      </div>
                      <Dialog.Title className="sr-only">Menu</Dialog.Title>
                      <Dialog.Description className="sr-only">Navigation du site LOCKIN TRIP</Dialog.Description>
                      <nav className="mt-10">
                        <ul className="space-y-1">
                          {site.nav.map((item, i) => (
                            <motion.li
                              key={item.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                            >
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="font-display block py-2 text-4xl font-light text-ink"
                              >
                                {item.label}
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      </nav>
                      <Button asChild size="lg" className="mt-10 w-full">
                        <Link href="/reserver" onClick={() => setOpen(false)}>
                          Réserver ma place <ArrowUpRight />
                        </Link>
                      </Button>
                      <p className="eyebrow mt-6 text-center text-muted">{site.edition}</p>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
