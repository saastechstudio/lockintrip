import Image from "next/image";
import { cn } from "@/lib/utils";
import { PalmShadows } from "./palm-shadows";
import { WaterSurface } from "./water-surface";

export type SceneVariant = "water" | "plaster" | "courtyard" | "dusk" | "stone";

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

function Plaster({ tint = "#e7dccb" }: { tint?: string }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: tint }} />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: "url(/textures/plaster.svg)", backgroundSize: "600px 600px", opacity: 0.85 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(90% 70% at 75% 15%, rgba(255,240,210,0.55), transparent 60%)" }}
      />
    </>
  );
}

function Ambient({ variant, seed = 7 }: { variant: SceneVariant; seed?: number }) {
  switch (variant) {
    case "water":
      return (
        <>
          <WaterSurface />
          <PalmShadows seed={seed} tone="#0f2019" opacity={0.28} blur={7} />
        </>
      );
    case "courtyard":
      return (
        <>
          <div className="absolute inset-x-0 top-0 h-[58%]">
            <Plaster />
            <PalmShadows seed={seed} opacity={0.24} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[42%] border-t-[10px] border-[#d8ccb6]">
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
                "linear-gradient(180deg, #c9b79b 0%, #e2c39a 28%, #d9a979 44%, #8f8a78 52%, #4f6a61 60%, #2a4038 100%)",
            }}
          />
          <div
            className="absolute left-1/2 top-[40%] size-[22vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(255,226,170,0.95), rgba(255,200,140,0) 70%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 top-[52%] overflow-hidden opacity-70">
            <WaterSurface intensity={0.6} className="mix-blend-soft-light" />
          </div>
          <PalmShadows seed={seed} tone="#141a14" opacity={0.55} blur={1.5} />
        </>
      );
    case "stone":
      return (
        <>
          <Plaster tint="#b9ae9c" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/30" />
          <PalmShadows seed={seed} opacity={0.3} />
        </>
      );
    default:
      return (
        <>
          <Plaster />
          <PalmShadows seed={seed} />
        </>
      );
  }
}
