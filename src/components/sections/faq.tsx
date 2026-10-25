import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { faq } from "@/content/faq";
import { site } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Faq() {
  return (
    <section id="faq" className="tex-travertine relative bg-pierre/55 py-28 md:py-40">
      <div className="container-lux grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow="FAQ" title="Questions fréquentes." />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                Une question qui n&apos;apparaît pas ici ? Écrivez-nous à{" "}
                <a href={`mailto:${site.email}`} className="text-ink underline decoration-bordeaux/40 underline-offset-4 hover:decoration-bordeaux">
                  {site.email}
                </a>{" "}
                ou{" "}
                <Link href="/reserver" className="text-ink underline decoration-bordeaux/40 underline-offset-4 hover:decoration-bordeaux">
                  déposez une demande
                </Link>
                , nous vous rappelons.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="space-y-14 lg:col-span-8">
          {faq.map((group) => (
            <Reveal key={group.title}>
              <h3 className="eyebrow text-bordeaux">{group.title}</h3>
              <Accordion type="single" collapsible className="mt-4 border-t border-ink/10">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
