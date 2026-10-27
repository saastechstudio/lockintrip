import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { comparison, forWho } from "@/content/story";
import { SectionHeading } from "./section-heading";

/** Qualification et comparatif « seul / avec Lockin Trip ». */
export function ForWho() {
  return (
    <section id="pour-qui" className="relative bg-ivory py-28 md:py-40">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Pour qui ?"
          title="Lockin Trip n'est pas fait pour tout le monde."
          intro="Vingt places par session, c'est peu. Nous préférons réunir les bonnes personnes plutôt que de remplir à tout prix."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[22px] bg-bordeaux p-8 text-ivory md:p-10">
              <p className="eyebrow text-pierre">C&apos;est pour toi si</p>
              <ul className="mt-7 space-y-4">
                {forWho.yes.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.98rem] leading-relaxed">
                    <Check className="mt-1 size-4 shrink-0 text-pierre" strokeWidth={2} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-lux h-full p-8 md:p-10">
              <p className="eyebrow text-concrete-deep">Ce n&apos;est pas pour toi si</p>
              <ul className="mt-7 space-y-4">
                {forWho.no.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.98rem] leading-relaxed text-muted">
                    <X className="mt-1 size-4 shrink-0 text-concrete" strokeWidth={2} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <div className="overflow-hidden rounded-[22px] border border-concrete/35">
            <div className="grid grid-cols-[1fr_1fr] bg-ink text-ivory md:grid-cols-[0.8fr_1fr_1fr]">
              <span className="hidden p-5 md:block" />
              <p className="eyebrow p-5 text-ivory/55">Seul</p>
              <p className="eyebrow bg-bordeaux p-5 text-pierre">Avec Lockin Trip</p>
            </div>
            {comparison.map((c) => (
              <div key={c.topic} className="grid grid-cols-[1fr_1fr] border-t border-concrete/30 md:grid-cols-[0.8fr_1fr_1fr]">
                <p className="font-display col-span-2 bg-pierre/25 px-5 pt-4 text-lg font-light text-ink md:col-span-1 md:bg-transparent md:p-5 md:text-xl">{c.topic}</p>
                <p className="p-5 text-[0.9375rem] text-muted">{c.alone}</p>
                <p className="bg-bordeaux/[0.06] p-5 text-[0.9375rem] font-medium text-ink">{c.with}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <Button asChild size="lg">
            <Link href="/reserver">
              Je me reconnais, je réserve
              <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
          <p className="text-sm text-muted">Un doute ? Pose ta question sur WhatsApp avant de réserver.</p>
        </Reveal>
      </div>
    </section>
  );
}
