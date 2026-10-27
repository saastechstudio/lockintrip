import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/visuals/scene";

export default function NotFound() {
  return (
    <Scene variant="plaster" seed={88} className="min-h-[100svh]">
      <div className="container-lux relative flex min-h-[100svh] flex-col items-start justify-center py-32">
        <p className="eyebrow text-bordeaux">Erreur 404</p>
        <h1 className="font-display mt-6 max-w-2xl text-5xl font-light leading-tight text-ink md:text-7xl">
          Cette page s&apos;est perdue entre deux palmiers.
        </h1>
        <Button asChild size="lg" className="mt-10">
          <Link href="/">Revenir à l&apos;accueil</Link>
        </Button>
      </div>
    </Scene>
  );
}
