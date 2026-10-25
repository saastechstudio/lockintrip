import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { editionYear } from "@/content/sessions";
import { getSessions } from "@/lib/seats";
import { cn, formatDay } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

export async function Edition() {
  const sessions = await getSessions();
  const totalCapacity = sessions.reduce((n, s) => n + s.capacity, 0);
  const totalTaken = sessions.reduce((n, s) => n + Math.min(s.taken, s.capacity), 0);
  const remaining = totalCapacity - totalTaken;

  return (
    <section id="edition" className="relative overflow-hidden bg-bordeaux-deep py-28 text-ivory md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(circle, #8b3a3a, transparent 65%)" }}
      />
      <div className="container-lux relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              tone="ivory"
              eyebrow="Rareté"
              title={`Édition fondatrice ${editionYear}.`}
              intro={`Seulement ${totalCapacity} places disponibles. Trois sessions de vingt personnes, pas une de plus : au-delà, on ne se connaît plus vraiment.`}
            />
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="rounded-[20px] border border-ivory/12 bg-ivory/[0.05] p-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow text-ivory/50">Places restantes</p>
                  <p className="font-display mt-3 text-8xl font-light leading-none tracking-[-0.04em] tabular-nums">
                    <CountUp to={remaining} />
                  </p>
                </div>
                <p className="pb-2 text-right text-sm text-ivory/55">
                  sur {totalCapacity}
                  <br />
                  places
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2" role="img" aria-label={`${totalTaken} places réservées sur ${totalCapacity}`}>
                {sessions.map((s) => (
                  <div key={s.id} className="grid grid-cols-10 gap-[3px]">
                    {Array.from({ length: s.capacity }).map((_, k) => (
                      <span key={k} className={cn("h-4 rounded-[2px]", k < s.taken ? "bg-pierre" : "bg-ivory/15")} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[0.7rem] text-ivory/45">
                {sessions.map((s) => (
                  <span key={s.id}>{s.label}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {sessions.map((s, i) => {
            const left = s.capacity - s.taken;
            const full = left <= 0;
            const pct = Math.round((s.taken / s.capacity) * 100);
            return (
              <Reveal key={s.id} delay={i * 0.1}>
                <article className="card-lux group flex h-full flex-col p-8 text-ink">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-bordeaux">{s.label}</p>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium",
                        full ? "bg-terracotta/15 text-terracotta" : "bg-bordeaux/10 text-bordeaux",
                      )}
                    >
                      {!full && <span className="size-1.5 rounded-full bg-bordeaux" />}
                      {full ? "Complet" : "Ouverte"}
                    </span>
                  </div>
                  <p className="font-display mt-8 text-[2rem] font-light leading-tight">
                    {formatDay(s.start)}
                    <span className="mx-3 text-concrete">→</span>
                    {formatDay(s.end)}
                  </p>
                  <p className="mt-1 text-sm text-muted">{editionYear} · 7 nuits · Phuket</p>

                  <div className="mt-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">{s.capacity} places</span>
                      <span className="font-medium">{full ? "0 restante" : `${left} restantes`}</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                      <div className="h-full rounded-full bg-bordeaux" style={{ width: `${Math.max(pct, 2)}%` }} />
                    </div>
                  </div>

                  <Button asChild variant={i === 0 ? "primary" : "outline"} className="mt-10 w-full">
                    <Link href={full ? "/reserver" : `/reserver?session=${s.id}`}>
                      {full ? "Liste d'attente" : "Réserver cette session"}
                      <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </Button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
