import { cn } from "@/lib/utils";
import { Reveal, RevealText } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "ink",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "ink" | "ivory";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow flex items-center gap-3",
              align === "center" && "justify-center",
              tone === "ivory" ? "text-ivory/70" : "text-bordeaux",
            )}
          >
            <span className="h-px w-8 bg-current opacity-60" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Tag
        className={cn(
          "font-display mt-6 text-[2.5rem] font-light leading-[1.04] tracking-[-0.02em] text-balance md:text-6xl lg:text-[4.25rem]",
          tone === "ivory" ? "text-ivory" : "text-ink",
        )}
      >
        <RevealText text={title} />
      </Tag>
      {intro && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-7 text-[1.0625rem] leading-relaxed md:text-lg",
              align === "center" && "mx-auto",
              "max-w-2xl",
              tone === "ivory" ? "text-ivory/75" : "text-muted",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
