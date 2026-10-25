import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "ivory" }) {
  return (
    <Link
      href="/"
      aria-label="LOCKIN TRIP — accueil"
      className={cn(
        "group inline-flex items-center gap-3 transition-colors duration-500",
        tone === "ivory" ? "text-ivory" : "text-ink",
        className,
      )}
    >
      <LogoMark className="size-7" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-medium tracking-[0.34em]">LOCKIN</span>
        <span className="mt-1 text-[0.58rem] tracking-[0.62em] opacity-70">TRIP</span>
      </span>
    </Link>
  );
}

/** Monogramme : un arc (le cadre, l'horizon) qui se referme sur un point (l'objectif). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path d="M6 26V14a10 10 0 0 1 20 0v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11 26V15a5 5 0 0 1 10 0v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".55" />
      <circle cx="16" cy="21.5" r="1.6" fill="currentColor" />
      <path d="M3 26h26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
