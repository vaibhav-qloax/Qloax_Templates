"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  as?: "div" | "li" | "p" | "span";
};

/** Fade and rise into view once. Content is never hidden when motion is reduced. */
export default function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.base, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
