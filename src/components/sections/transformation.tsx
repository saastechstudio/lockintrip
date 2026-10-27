import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { transformations } from "@/content/story";
import { SectionHeading } from "./section-heading";

/** Ce que le participant devient : six bénéfices, chacun relié à un moment réel du programme. */
export function Transformation() {
  return (
    <section id="transformation" className="tex-travertine relative bg-pierre/55 py-28 md:py-40">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Ce que tu viens chercher"
            title="Tu ne viens pas suivre un programme. Tu viens changer de rythme."
            intro="Pendant sept jours, tout est organisé pour une seule chose : t'aider à avancer, entouré des bonnes personnes."
          />
          <Reveal delay={0.2} className="flex gap-10 lg:max-w-sm">
            {[
              ["7", "jours pour accélérer"],
              ["20", "personnes ambitieuses"],
              ["6", "domaines d'expertise"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-5xl font-light text-ink">{n}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <ol className="mt-20 grid gap-px overflow-hidden rounded-[22px] bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {transformations.map((t, i) => (
            <RevealItem
              key={t.title}
              delay={(i % 3) * 0.08}
              className="group relative flex flex-col bg-ivory p-8 transition-colors duration-700 ease-[var(--ease-lux)] hover:bg-[#fbf9f5] md:p-10"
            >
              <span className="font-display text-sm text-bordeaux/70">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-8 text-[1.9rem] font-light leading-[1.08] text-ink transition-transform duration-700 ease-[var(--ease-lux)] group-hover:-translate-y-1">
                {t.title}
              </h3>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">{t.body}</p>
              <p className="mt-8 flex items-start gap-3 border-t border-concrete/30 pt-5 text-[0.8125rem] text-ink-soft">
                <span className="mt-2 h-px w-5 shrink-0 bg-bordeaux transition-all duration-700 group-hover:w-9" />
                {t.how}
              </p>
            </RevealItem>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[20px] bg-bordeaux p-8 text-ivory md:flex-row md:items-center md:p-10">
          <p className="font-display max-w-2xl text-2xl font-light leading-snug md:text-[2rem]">
            Dans un an, tu seras quelque part. La seule question : avec qui as-tu choisi d&apos;avancer ?
          </p>
          <Button asChild size="lg" variant="light" className="shrink-0">
            <Link href="/reserver">
              Rejoindre l&apos;édition fondatrice
              <ArrowUpRight className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
