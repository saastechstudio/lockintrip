import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { editionYear, sessions, totalCapacity, totalTaken } from "@/content/sessions";
import { cn, formatDay } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export function Edition() {
  const remaining = totalCapacity - totalTaken;
  const ratio = totalTaken / totalCapacity;
  const circumference = 2 * Math.PI * 54;

  return (
    <section id="edition" className="relative bg-sand/50 py-28 md:py-40">
      <div className="container-lux">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={`Édition Phuket ${editionYear}`}
              title={`${totalCapacity} places seulement.`}
              intro="Trois sessions consécutives de vingt participants. Un format volontairement restreint, pour que chacun soit connu, suivi et entouré."
            />
          </div>
          <Reveal delay={0.15} className="flex items-center gap-8 lg:col-span-5 lg:justify-end">
            <div className="relative size-36">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink/10" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - Math.max(ratio, 0.004))}
                  className="text-emerald"
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="font-display text-5xl font-light leading-none text-ink">{remaining}</p>
                  <p className="eyebrow mt-2 text-[0.55rem] text-muted">disponibles</p>
                </div>
              </div>
            </div>
            <p className="max-w-[14rem] text-sm leading-relaxed text-muted">
              Places restantes sur l&apos;édition fondatrice. Les places sont attribuées après un court échange.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {sessions.map((s, i) => {
            const left = s.capacity - s.taken;
            const full = left <= 0;
            return (
              <Reveal key={s.id} delay={i * 0.1}>
                <article className="group flex h-full flex-col rounded-[1.75rem] bg-ivory p-8 transition-shadow duration-700 hover:shadow-[0_30px_60px_-35px_rgba(23,22,18,0.4)]">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-emerald">{s.label}</p>
                    <p className={cn("text-xs", full ? "text-clay" : "text-muted")}>
                      {full ? "Complet" : `${left} / ${s.capacity} places`}
                    </p>
                  </div>
                  <p className="font-display mt-8 text-[2rem] font-light leading-tight text-ink">
                    {formatDay(s.start)}
                    <span className="mx-3 text-stone">→</span>
                    {formatDay(s.end)}
                  </p>
                  <p className="mt-1 text-sm text-muted">{editionYear} · 7 nuits</p>

                  <div className="mt-8 grid grid-cols-10 gap-1.5" role="img" aria-label={`${s.taken} places réservées sur ${s.capacity}`}>
                    {Array.from({ length: s.capacity }).map((_, k) => (
                      <span
                        key={k}
                        className={cn("aspect-square rounded-full", k < s.taken ? "bg-emerald" : "border border-ink/15")}
                      />
                    ))}
                  </div>

                  <Link
                    href={full ? "/reserver" : `/reserver?session=${s.id}`}
                    className="mt-10 inline-flex items-center gap-2 border-t border-ink/10 pt-6 text-sm font-medium text-ink transition-colors hover:text-emerald"
                  >
                    {full ? "Rejoindre la liste d'attente" : "Réserver cette session"}
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
