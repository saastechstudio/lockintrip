import { cn } from "@/lib/utils";

/**
 * Eau d'un bassin en pierre au crépuscule : tons minéraux chauds et reflets
 * lumineux en mouvement (CSS + textures SVG statiques, boucle sans couture).
 */
export function WaterSurface({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 15%, #a39b90 0%, #7d756c 35%, #554e48 68%, #2e2a28 100%)",
        }}
      />
      <div
        className="absolute left-0 top-0 h-[calc(100%+900px)] w-[calc(100%+900px)] animate-drift mix-blend-soft-light will-change-transform"
        style={
          {
            "--tile": "900px",
            backgroundImage: "url(/textures/caustics.svg)",
            backgroundSize: "900px 900px",
            opacity: 0.85 * intensity,
          } as React.CSSProperties
        }
      />
      <div
        className="absolute left-0 top-0 h-[calc(100%+700px)] w-[calc(100%+700px)] animate-drift-slow mix-blend-overlay will-change-transform"
        style={
          {
            "--tile": "700px",
            backgroundImage: "url(/textures/caustics-fine.svg)",
            backgroundSize: "700px 700px",
            opacity: 0.45 * intensity,
          } as React.CSSProperties
        }
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(107,31,43,0.10) 0%, rgba(29,29,29,0) 45%, rgba(29,29,29,0.4) 100%)" }}
      />
    </div>
  );
}
