import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { otherSports, sports } from "@/content/story";
import { SectionHeading } from "./section-heading";

/** Le sport comme expérience : chaque activité porte ce qu'elle t'apporte. */
export function Sports() {
  return (
    <section id="sport" className="relative overflow-hidden bg-[#1a0c0f] py-28 text-ivory md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 size-[36rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #8b3a3a, transparent 65%)" }}
      />
      <div className="container-lux relative">
        <SectionHeading
          tone="ivory"
          eyebrow="Les après-midi"
          title="Le corps d'abord. Le reste suit."
          intro="Chaque après-midi, une activité au choix. Tous niveaux, même grand débutant : c'est souvent là que les vraies rencontres se font."
        />

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          {sports.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 0.1}>
              <article className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[22px] border border-ivory/10 bg-gradient-to-br from-bordeaux/60 via-[#2a1216] to-[#160a0c] p-8 transition-[transform,border-color] duration-700 ease-[var(--ease-lux)] hover:-translate-y-1 hover:border-ivory/25 md:min-h-[26rem] md:p-10">
                {s.src ? (
                  <>
                    <Image
                      src={s.src}
                      alt={s.alt ?? ""}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover opacity-55 transition-[transform,opacity] duration-[1.6s] ease-[var(--ease-lux)] group-hover:scale-[1.05] group-hover:opacity-70"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#160a0c] via-[#160a0c]/50 to-transparent" />
                  </>
                ) : (
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -right-4 -top-8 select-none text-[9rem] font-light leading-none text-ivory/[0.05] transition-transform duration-[1.6s] ease-[var(--ease-lux)] group-hover:-translate-x-3 md:text-[12rem]"
                  >
                    {s.name}
                  </span>
                )}
                <div className="relative">
                  <p className="eyebrow text-pierre">{s.name}</p>
                  <h3 className="font-display mt-4 text-[2.2rem] font-light leading-[1.05] md:text-[2.8rem]">{s.promise}</h3>
                  <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ivory/70">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-ivory/55">Et aussi</span>
          {otherSports.map((a) => (
            <span key={a} className="rounded-full border border-ivory/15 px-4 py-2 text-sm text-ivory/85 transition-colors hover:border-pierre/60">
              {a}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
