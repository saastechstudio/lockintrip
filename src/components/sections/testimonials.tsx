import { Reveal } from "@/components/motion/reveal";
import { showTestimonials, testimonials } from "@/content/testimonials";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  if (!showTestimonials) return null;
  return (
    <section className="relative py-28 md:py-40">
      <div className="container-lux">
        <SectionHeading eyebrow="Ils en parlent" title="Une semaine, puis une autre trajectoire." intro="Des profils différents, un même déclic : le bon environnement change la vitesse à laquelle on avance." />
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.1}>
              <figure className="flex h-full flex-col justify-between rounded-[2rem] border border-ink/[0.07] bg-white/50 p-8 md:p-11">
                <blockquote className="font-display text-xl font-light leading-[1.45] text-ink md:text-[1.45rem]">
                  <span aria-hidden className="mr-1 text-emerald">“</span>
                  {t.quote}
                  <span aria-hidden className="ml-1 text-emerald">”</span>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-mist font-display text-emerald">{t.name.charAt(0)}</span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{t.name}</span>
                    <span className="block text-xs text-muted">
                      {t.role} · {t.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
