import Link from "next/link";
import { ArrowUpRight, Compass, Flame, type LucideIcon, Rocket, TrendingUp, Users, Wallet } from "lucide-react";
import { RevealItem } from "@/components/motion/reveal";
import { goals, type Goal } from "@/content/goals";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const icons: Record<Goal["icon"], LucideIcon> = {
  rocket: Rocket,
  growth: TrendingUp,
  income: Wallet,
  discipline: Flame,
  network: Users,
  direction: Compass,
};

/** Fonds en dégradés doux, tirés de la palette (eau, sable, brume) — un par carte. */
const tones = [
  "from-[#dfe8e3] to-[#c4d6cc]",
  "from-[#ede4d4] to-[#dccdb3]",
  "from-[#e2e8ea] to-[#c9d5d8]",
  "from-[#efe6d8] to-[#e2d2b8]",
  "from-[#dde7e1] to-[#bfd1c6]",
  "from-[#e6e9e8] to-[#cfd9da]",
];

export function Goals() {
  return (
    <section id="objectifs" className="relative py-28 md:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Ton objectif"
          title="Quels objectifs veux-tu accélérer ?"
          intro="Choisis celui qui compte le plus pour toi cette année. Le programme, les ateliers et ton plan d'action seront construits autour."
        />
        <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <RevealItem key={g.id} delay={(i % 3) * 0.08}>
                <Link
                  href={`/reserver?objectif=${g.id}`}
                  className={cn(
                    "group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-8 transition-all duration-700 ease-[var(--ease-lux)] hover:-translate-y-1 hover:shadow-[0_40px_70px_-40px_rgba(23,22,18,0.45)]",
                    tones[i % tones.length],
                  )}
                >
                  <Icon
                    aria-hidden
                    className="absolute -bottom-8 -right-8 size-56 text-ink/[0.045] transition-transform duration-1000 ease-[var(--ease-lux)] group-hover:-translate-y-2 group-hover:rotate-[-6deg]"
                    strokeWidth={0.8}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-ivory/70 text-emerald shadow-[0_8px_20px_-12px_rgba(23,22,18,0.4)] backdrop-blur">
                      <Icon className="size-6" strokeWidth={1.4} />
                    </span>
                    <span className="grid size-10 place-items-center rounded-full border border-ink/10 bg-ivory/40 text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory">
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="relative">
                    <p className="eyebrow text-ink/50">{g.stat}</p>
                    <h3 className="font-display mt-3 text-[2rem] font-light leading-[1.05] text-ink">{g.title}</h3>
                    <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-ink-soft/80">{g.body}</p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
