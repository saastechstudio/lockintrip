import Link from "next/link";
import { ArrowUpRight, Compass, Flame, type LucideIcon, Rocket, TrendingUp, Users, Wallet } from "lucide-react";
import { RevealItem } from "@/components/motion/reveal";
import { goals, type Goal } from "@/content/goals";
import { SectionHeading } from "./section-heading";

const icons: Record<Goal["icon"], LucideIcon> = {
  rocket: Rocket,
  growth: TrendingUp,
  income: Wallet,
  discipline: Flame,
  network: Users,
  direction: Compass,
};

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
                  className="group flex h-full flex-col gap-16 rounded-[16px] glass-red p-8 transition-colors duration-150 hover:!border-white/45"
                >
                  <div className="flex items-center justify-between text-muted">
                    <Icon className="size-[18px]" strokeWidth={1.5} />
                    <ArrowUpRight className="size-[18px] transition-colors duration-150 group-hover:text-ink" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="eyebrow text-muted">{g.stat}</p>
                    <h3 className="font-display mt-3 text-[2rem] font-light leading-[1.05] text-ink">{g.title}</h3>
                    <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-muted">{g.body}</p>
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
