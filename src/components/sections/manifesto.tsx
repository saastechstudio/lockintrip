import { Reveal } from "@/components/motion/reveal";

const sentences = [
  "Nous croyons que l'environnement façonne l'ambition.",
  "Que les bonnes décisions se prennent loin du bruit.",
  "Qu'une semaine bien entourée peut valoir des mois passés seul.",
  "Lockin Trip n'est pas un voyage. C'est un cercle.",
];

/** Le manifeste, lu d'un trait. La dernière phrase porte l'accent. */
export function Manifesto() {
  return (
    <section id="manifeste" className="relative bg-bordeaux-deep py-28 text-ivory md:py-40">
      <div className="container-lux">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-pierre">
            <span className="h-px w-8 bg-current opacity-60" />
            Le manifeste
          </p>
          <p className="font-display mt-10 max-w-5xl text-[clamp(1.9rem,4.2vw,3.75rem)] font-light leading-[1.15] tracking-[-0.015em]">
            {sentences.join(" ")} <span className="text-pierre">Et il commence par un choix : le tien.</span>
          </p>
          <p className="mt-12 flex items-center gap-4 text-sm text-ivory/60">
            <span className="block h-px w-24 bg-pierre" />
            Le cercle Lockin Trip
          </p>
        </Reveal>
      </div>
    </section>
  );
}
