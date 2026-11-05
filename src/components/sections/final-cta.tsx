import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Scene } from "@/components/visuals/scene";
import { media } from "@/content/media";
import { totalCapacity } from "@/content/sessions";

export function FinalCta() {
  return (
    <section id="final" className="relative px-3 pb-3 md:px-5 md:pb-5">
      <Scene variant="dusk" seed={17} src={media.final.src} alt={media.final.alt} className="min-h-[88svh] rounded-[20px] md:rounded-[24px]">
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
        <div className="relative z-10 flex min-h-[88svh] flex-col items-center justify-end px-6 pb-16 text-center text-ivory md:pb-24">
          <Reveal>
            <p className="eyebrow text-ivory/75">Édition fondatrice · Phuket 2027</p>
          </Reveal>
          <h2 className="font-display mt-8 max-w-5xl text-[2.6rem] font-light leading-[1.02] tracking-[-0.025em] text-balance md:text-7xl lg:text-[5.5rem]">
            Dans un an, tu repenseras à cette semaine
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl">
              Soit comme celle où tout a commencé, soit comme celle que tu as laissé passer. Rejoins les membres
              fondateurs et entoure-toi de personnes qui avancent dans la même direction que toi.
            </p>
            <p className="mt-6 text-sm text-pierre">{totalCapacity} places</p>
          </Reveal>
          <Reveal delay={0.45}>
            <Button asChild size="lg" variant="light" className="mt-10">
              <Link href="/reserver">
                Rejoindre l&apos;édition fondatrice
                <ArrowUpRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </Scene>
    </section>
  );
}
