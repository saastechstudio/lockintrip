import {
  CalendarCheck2,
  Compass,
  GraduationCap,
  type LucideIcon,
  MessagesSquare,
  Presentation,
  Sailboat,
  Users,
  Waves,
} from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { pillars, rhythm, type Pillar } from "@/content/concept";
import { SectionHeading } from "./section-heading";

const icons: Record<Pillar["icon"], LucideIcon> = {
  masterclass: Presentation,
  workshop: Compass,
  experts: GraduationCap,
  network: Users,
  sport: Waves,
  "one-on-one": MessagesSquare,
  excursion: Sailboat,
  community: CalendarCheck2,
};

export function Concept() {
  return (
    <section id="concept" className="relative bg-linen py-28 md:py-40">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Le concept"
            title="Une expérience conçue pour avancer."
            intro="Huit leviers, une seule semaine. Chaque moment du programme a une fonction précise : apprendre, décider, rencontrer, ou récupérer pour mieux repartir."
          />
          <Reveal delay={0.2} className="lg:max-w-xs">
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-display text-5xl font-light text-ink">7</span>
              <span className="ml-2 align-top">jours</span>
              <br />
              <span className="font-display text-5xl font-light text-ink">20</span>
              <span className="ml-2 align-top">participants par session</span>
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <RevealItem
                key={p.title}
                delay={(i % 4) * 0.08}
                className="group relative flex h-full flex-col rounded-[1.75rem] border border-ink/[0.06] bg-ivory p-7 transition-all duration-700 ease-[var(--ease-lux)] hover:-translate-y-1 hover:border-emerald/20 hover:shadow-[0_30px_60px_-30px_rgba(28,58,49,0.35)]"
              >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full bg-mist/70 text-emerald transition-colors duration-700 group-hover:bg-emerald group-hover:text-ivory">
                      <Icon className="size-5" strokeWidth={1.3} />
                    </span>
                    <span className="font-display text-xs text-stone">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-display mt-10 text-[1.6rem] font-light leading-tight text-ink">{p.title}</h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{p.body}</p>
              </RevealItem>
            );
          })}
        </ul>

        <Reveal className="mt-20 rounded-[2rem] bg-ivory p-8 md:p-12">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h3 className="font-display text-2xl font-light text-ink md:text-3xl">Une journée type</h3>
            <p className="text-sm text-muted">Rythme indicatif, ajusté selon les sessions.</p>
          </div>
          <ol className="mt-10 grid grid-cols-2 gap-y-8 md:grid-cols-6">
            {rhythm.map((r) => (
              <li key={r.time} className="relative border-t border-ink/10 pr-4 pt-5">
                <span className="absolute -top-[5px] left-0 size-[9px] rounded-full border border-emerald bg-ivory" />
                <p className="font-display text-lg text-emerald">{r.time}</p>
                <p className="mt-1 text-sm font-medium text-ink">{r.label}</p>
                <p className="text-sm text-muted">{r.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
