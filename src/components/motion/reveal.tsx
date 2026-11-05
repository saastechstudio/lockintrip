"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const duration = 0.45;

/** Apparition au défilement : un fondu court et une montée de quelques pixels. */
export function Reveal({
  delay = 0,
  y = 8,
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease, delay: Math.min(delay, 0.15) }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Titre : apparaît avec sa section, d'un seul bloc. */
export function RevealText({ text, className }: { text: string; className?: string; delay?: number }) {
  return <span className={className}>{text}</span>;
}

export function RevealItem({
  delay = 0,
  y = 8,
  className,
  children,
  ...props
}: HTMLMotionProps<"li"> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease, delay: Math.min(delay, 0.15) }}
      className={className}
      {...props}
    >
      {children}
    </motion.li>
  );
}
