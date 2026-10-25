import { cn } from "@/lib/utils";
import { PalmShadows } from "./palm-shadows";

/**
 * Hero cinématographique généré : coucher de soleil sur la mer d'Andaman vu depuis
 * le bord d'une piscine à débordement. Tout est en CSS/SVG, animé en douceur
 * (zoom lent, scintillement du reflet, palmes au vent). Remplacé par une photo
 * ou une vidéo dès qu'elles sont renseignées dans `content/media.ts`.
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden bg-[#2a1416]", className)}>
      <div className="absolute inset-0 animate-kenburns">
        {/* Ciel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #2b1620 0%, #4a1d27 18%, #7a2d33 34%, #b4553f 46%, #e08a55 54%, #f3b675 58.5%, #f7cf92 60%)",
          }}
        />
        {/* Halo du soleil */}
        <div
          className="absolute left-[62%] top-[58%] size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,214,150,0.55) 0%, rgba(240,140,80,0.25) 30%, transparent 62%)" }}
        />
        {/* Soleil */}
        <div
          className="absolute left-[62%] top-[56.5%] size-[11vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, #fff3d6 0%, #ffd99a 55%, #f6b56e 100%)",
            boxShadow: "0 0 80px 30px rgba(255,200,130,0.55)",
          }}
        />
        {/* Nuages étirés */}
        <div
          className="absolute inset-x-0 top-[30%] h-[22%] opacity-60 mix-blend-soft-light"
          style={{
            background:
              "repeating-linear-gradient(178deg, transparent 0 18px, rgba(255,210,170,0.35) 18px 22px, transparent 22px 46px)",
            filter: "blur(6px)",
            maskImage: "linear-gradient(90deg, transparent, black 25%, black 75%, transparent)",
          }}
        />

        {/* Îles karstiques de Phang Nga */}
        <svg className="absolute inset-x-0 top-[50%] h-[10.5%] w-full" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice">
          <path
            d="M0 100 L0 78 C40 70 60 40 85 38 C105 36 112 62 130 70 L160 74 C175 50 190 20 210 18 C228 16 238 52 250 70 L300 82 L380 84 C395 64 405 46 420 47 C436 48 444 70 455 80 L520 86 L760 86 C780 60 792 30 812 28 C834 26 846 58 858 72 C870 62 884 50 898 52 C915 55 925 74 940 80 L1000 82 L1000 100 Z"
            fill="#5c2a2e"
            opacity="0.78"
          />
          <path
            d="M0 100 L0 90 L120 88 C140 72 150 58 166 60 C184 62 190 82 204 90 L600 92 C615 80 630 70 646 72 C664 74 672 88 686 93 L1000 92 L1000 100 Z"
            fill="#3d1c21"
            opacity="0.9"
          />
        </svg>

        {/* Mer */}
        <div
          className="absolute inset-x-0 bottom-0 top-[60%]"
          style={{ background: "linear-gradient(180deg, #c97a55 0%, #8a3f38 14%, #4a2026 45%, #24121a 100%)" }}
        />
        {/* Reflet du soleil qui scintille */}
        <div
          className="absolute left-[62%] top-[60%] h-[30%] w-[46vmin] -translate-x-1/2 animate-shimmer mix-blend-screen"
          style={{
            background:
              "repeating-linear-gradient(180deg, rgba(255,222,160,0.95) 0 2px, transparent 2px 7px, rgba(255,200,140,0.6) 7px 8px, transparent 8px 13px)",
            backgroundSize: "100% 26px",
            maskImage: "radial-gradient(50% 100% at 50% 0%, black 20%, transparent 80%)",
            filter: "blur(0.6px)",
          }}
        />
        {/* Ondulations de surface */}
        <div className="absolute inset-x-0 bottom-0 top-[60%] overflow-hidden [perspective:600px]">
          <div
            className="absolute -inset-x-1/2 top-0 h-[400%] animate-drift mix-blend-soft-light"
            style={
              {
                "--tile": "420px",
                backgroundImage: "url(/textures/caustics.svg)",
                backgroundSize: "420px 420px",
                transform: "rotateX(74deg)",
                transformOrigin: "top",
                opacity: 0.28,
              } as React.CSSProperties
            }
          />
        </div>

        {/* Bord de la piscine à débordement (béton) et lame d'eau */}
        <div className="absolute inset-x-0 bottom-0 h-[17%]">
          <div
            className="absolute inset-x-0 top-0 h-[24%]"
            style={{ background: "linear-gradient(180deg, rgba(255,205,150,0.85), rgba(170,90,70,0.6))" }}
          />
          <div
            className="absolute inset-x-0 top-[24%] bottom-0"
            style={{ background: "linear-gradient(180deg, #4d3632 0%, #2d211f 100%)" }}
          />
          <div
            className="absolute inset-x-0 top-[24%] bottom-0 mix-blend-overlay"
            style={{ backgroundImage: "url(/textures/concrete.svg)", backgroundSize: "420px 420px", opacity: 0.9 }}
          />
        </div>
      </div>

      {/* Palmes en contre-jour, au vent */}
      <PalmShadows seed={3} tone="#120708" opacity={0.78} blur={0.8} className="mix-blend-normal" />

      {/* Lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0b0d]/75 via-[#1a0b0d]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#140809]/80 to-transparent" />
    </div>
  );
}
