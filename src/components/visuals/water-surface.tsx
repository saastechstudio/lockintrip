import { cn } from "@/lib/utils";

/** Surface d'eau vert sauge avec reflets lumineux en mouvement (CSS + textures SVG statiques). */
export function WaterSurface({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 20%, #9db5a8 0%, #6f8f80 38%, #4d6c5f 72%, #33503f 100%)",
        }}
      />
      <div
        className="absolute left-0 top-0 h-[calc(100%+900px)] w-[calc(100%+900px)] animate-drift mix-blend-soft-light will-change-transform"
        style={
          {
            "--tile": "900px",
            backgroundImage: "url(/textures/caustics.svg)",
            backgroundSize: "900px 900px",
            opacity: 0.9 * intensity,
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
            opacity: 0.55 * intensity,
          } as React.CSSProperties
        }
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(247,243,236,0.10) 0%, rgba(23,22,18,0) 40%, rgba(23,22,18,0.35) 100%)" }}
      />
    </div>
  );
}
