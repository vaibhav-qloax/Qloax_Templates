"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { DURATION, EASE, STAGGER, VIEWPORT } from "@/lib/motion";

type Props = {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** "mount" plays immediately (hero); "view" waits for the viewport. */
  trigger?: "mount" | "view";
};

/**
 * Masked line reveal for headlines. Each line slides up from behind its own mask.
 * The full text stays in the DOM as one heading for screen readers and SEO.
 */
const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div } as const;

export default function LineReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  trigger = "view",
}: Props) {
  const reduce = useReducedMotion();
  // The parent watches the viewport; masked lines start fully clipped and can't detect it themselves.
  const MotionTag = TAGS[(typeof Tag === "string" && Tag in TAGS ? Tag : "h2") as keyof typeof TAGS];
  const trigger_ = trigger === "mount" ? { animate: "shown" } : { whileInView: "shown", viewport: VIEWPORT };

  return (
    <MotionTag className={className} initial={reduce ? false : "hidden"} {...trigger_}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block will-change-transform ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "105%" },
              shown: { y: "0%", transition: { duration: DURATION.slow, ease: EASE, delay: delay + i * STAGGER * 1.5 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
