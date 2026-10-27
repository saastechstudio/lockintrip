import { cn } from "@/lib/utils";

/**
 * Ombres de palmes projetées, générées de façon déterministe (aucune image).
 * Rendu côté serveur ; l'animation de balancement est du CSS pur.
 */

type Pt = { x: number; y: number };

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const bez = (p0: Pt, p1: Pt, p2: Pt, t: number): Pt => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
});

const tangent = (p0: Pt, p1: Pt, p2: Pt, t: number) => {
  const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
  const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
  return Math.atan2(dy, dx);
};

const r1 = (n: number) => Math.round(n * 10) / 10;

function frond(origin: Pt, angle: number, length: number, bend: number, rand: () => number) {
  const end: Pt = { x: origin.x + Math.cos(angle) * length, y: origin.y + Math.sin(angle) * length };
  const mid: Pt = {
    x: origin.x + Math.cos(angle) * length * 0.5 + Math.cos(angle + Math.PI / 2) * bend,
    y: origin.y + Math.sin(angle) * length * 0.5 + Math.sin(angle + Math.PI / 2) * bend,
  };
  const paths: string[] = [`M${r1(origin.x)} ${r1(origin.y)} Q${r1(mid.x)} ${r1(mid.y)} ${r1(end.x)} ${r1(end.y)}`];
  const count = 34;
  for (let i = 3; i < count; i++) {
    const t = i / count;
    const base = bez(origin, mid, end, t);
    const dir = tangent(origin, mid, end, t);
    const size = length * 0.42 * Math.sin(Math.PI * (0.15 + t * 0.85)) * (0.8 + rand() * 0.35);
    for (const side of [-1, 1]) {
      const a = dir + side * (0.95 - t * 0.35) + (rand() - 0.5) * 0.18 + 0.25;
      const tip: Pt = { x: base.x + Math.cos(a) * size, y: base.y + Math.sin(a) * size };
      const w = size * 0.075;
      const perp = a + Math.PI / 2;
      const c1: Pt = {
        x: (base.x + tip.x) / 2 + Math.cos(perp) * w,
        y: (base.y + tip.y) / 2 + Math.sin(perp) * w,
      };
      const c2: Pt = {
        x: (base.x + tip.x) / 2 - Math.cos(perp) * w,
        y: (base.y + tip.y) / 2 - Math.sin(perp) * w,
      };
      paths.push(
        `M${r1(base.x)} ${r1(base.y)} Q${r1(c1.x)} ${r1(c1.y)} ${r1(tip.x)} ${r1(tip.y)} Q${r1(c2.x)} ${r1(c2.y)} ${r1(base.x)} ${r1(base.y)}Z`,
      );
    }
  }
  return paths.join(" ");
}

function buildCrown(seed: number, origin: Pt, fronds: number, spread: [number, number], length: number) {
  const rand = rng(seed);
  const out: string[] = [];
  for (let i = 0; i < fronds; i++) {
    const angle = spread[0] + ((spread[1] - spread[0]) * (i + rand() * 0.6)) / fronds;
    out.push(frond(origin, angle, length * (0.75 + rand() * 0.35), (rand() - 0.5) * length * 0.35, rand));
  }
  return out.join(" ");
}

export function PalmShadows({
  className,
  seed = 7,
  tone = "#2b1d18",
  opacity = 0.22,
  blur = 5,
  animated = true,
}: {
  className?: string;
  seed?: number;
  tone?: string;
  opacity?: number;
  blur?: number;
  animated?: boolean;
}) {
  const crownA = buildCrown(seed, { x: 1080, y: -60 }, 7, [1.75, 3.35], 640);
  const crownB = buildCrown(seed + 13, { x: -40, y: 980 }, 5, [-1.35, 0.05], 520);
  const id = `palm-blur-${seed}`;

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply", className)}
      style={{ opacity }}
    >
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      <g filter={`url(#${id})`} fill={tone} stroke={tone} strokeWidth={3}>
        <g className={animated ? "origin-top-right animate-sway" : undefined}>
          <path d={crownA} />
        </g>
        <g className={animated ? "origin-bottom-left animate-sway [animation-delay:-4s]" : undefined}>
          <path d={crownB} opacity={0.75} />
        </g>
      </g>
    </svg>
  );
}
