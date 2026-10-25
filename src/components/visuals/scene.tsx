import Image from "next/image";
import { cn } from "@/lib/utils";
import { PalmShadows } from "./palm-shadows";
import { WaterSurface } from "./water-surface";

export type SceneVariant = "water" | "plaster" | "courtyard" | "dusk" | "stone" | "architecture";

/**
 * Visuel éditorial. Affiche la photo si `src` est fourni, sinon une composition
 * d'ambiance générée dans la palette de la marque.
 */
export function Scene({
  variant = "plaster",
  src,
  alt = "",
  priority,
  sizes = "100vw",
  seed,
  className,
  children,
}: {
  variant?: SceneVariant;
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  seed?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("grain relative isolate overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} className="absolute inset-0">
          <Ambient variant={variant} seed={seed} />
        </div>
      )}
      {children}
    </div>
  );
}

function Travertine({ tint = "#e3d8ca" }: { tint?: string }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: tint }} />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: "url(/textures/plaster.svg)", backgroundSize: "600px 600px", opacity: 0.55 }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: "url(/textures/travertine.svg)", backgroundSize: "900px 600px", opacity: 0.35 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(90% 70% at 75% 15%, rgba(255,244,228,0.55), transparent 60%)" }}
      />
    </>
  );
}

function Concrete({ tint = "#b3ada4" }: { tint?: string }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: tint }} />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: "url(/textures/concrete.svg)", backgroundSize: "520px 520px", opacity: 0.55 }}
      />
    </>
  );
}

/** Ombres de pergola projetées sur un mur de béton : lignes nettes, lumière rasante. */
function PergolaLight() {
  return (
    <div
      className="absolute -inset-[20%] rotate-[-24deg] mix-blend-multiply blur-[3px]"
      style={{
        background:
          "repeating-linear-gradient(90deg, rgba(40,28,24,0.32) 0 34px, rgba(40,28,24,0) 34px 86px)",
        maskImage: "linear-gradient(180deg, transparent 0%, black 35%, black 75%, transparent 100%)",
      }}
    />
  );
}

function Ambient({ variant, seed = 7 }: { variant: SceneVariant; seed?: number }) {
  switch (variant) {
    case "water":
      return (
        <>
          <WaterSurface />
          <PalmShadows seed={seed} tone="#140e0c" opacity={0.3} blur={7} />
        </>
      );
    case "courtyard":
      return (
        <>
          <div className="absolute inset-x-0 top-0 h-[58%]">
            <Travertine />
            <PalmShadows seed={seed} opacity={0.22} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[42%] border-t-[10px] border-[#d6c8b8]">
            <WaterSurface />
          </div>
        </>
      );
    case "dusk":
      return (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #bfae9e 0%, #d9b493 26%, #c98f6c 42%, #8b3a3a 50%, #5a3a35 56%, #3a2c29 70%, #1f1a19 100%)",
            }}
          />
          <div
            className="absolute left-1/2 top-[44%] size-[24vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(255,222,184,0.9), rgba(255,190,150,0) 70%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 top-[53%] overflow-hidden opacity-60">
            <WaterSurface intensity={0.6} className="mix-blend-soft-light" />
          </div>
          <PalmShadows seed={seed} tone="#120d0c" opacity={0.6} blur={1.5} />
        </>
      );
    case "stone":
      return (
        <>
          <Concrete />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/25" />
          <PalmShadows seed={seed} opacity={0.26} />
        </>
      );
    case "architecture":
      return (
        <>
          <Concrete tint="#bcb5ab" />
          <PergolaLight />
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(255,236,214,0.35), transparent 55%)" }} />
        </>
      );
    default:
      return (
        <>
          <Travertine />
          <PalmShadows seed={seed} />
        </>
      );
  }
}
