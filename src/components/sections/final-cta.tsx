import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { Scene } from "@/components/visuals/scene";
import { media } from "@/content/media";
import { totalCapacity } from "@/content/sessions";

export function FinalCta() {
  return (
    <section className="relative px-3 pb-3 md:px-5 md:pb-5">
      <Scene variant="dusk" seed={17} src={media.final.src} alt={media.final.alt} className="min-h-[88svh] rounded-[2rem] md:rounded-[2.5rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
        <div className="relative z-10 flex min-h-[88svh] flex-col items-center justify-end px-6 pb-16 text-center text-ivory md:pb-24">
          <Reveal>
            <p className="eyebrow text-ivory/75">Édition fondatrice · {totalCapacity} places uniquement</p>
          </Reveal>
          <h2 className="font-display mt-8 max-w-5xl text-[2.6rem] font-light leading-[1.02] tracking-[-0.025em] text-balance md:text-7xl lg:text-[5.5rem]">
            <RevealText text="Ne reporte pas une année de plus les objectifs qui comptent pour toi." />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-8 text-lg text-ivory/80 md:text-xl">Rejoins l&apos;édition fondatrice de Lockin Trip.</p>
          </Reveal>
          <Reveal delay={0.45}>
            <Button asChild size="lg" variant="light" className="mt-10">
              <Link href="/reserver">
                Réserver ma place
                <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </Scene>
    </section>
  );
}
