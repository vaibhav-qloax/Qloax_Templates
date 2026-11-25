"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE } from "@/lib/motion";

type Line = { text: string; className?: string; after?: ReactNode };

/**
 * Headline reveal: every word rises out of its own mask with a slight tilt and blur clearing.
 * Words keep their natural wrapping; the heading text stays intact for assistive tech.
 */
export function MaskedWords({
  lines,
  as: Tag = "h1",
  className,
  delay = 0,
  stagger = 0.075,
}: {
  lines: Line[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <span key={li} className={`relative block ${line.className ?? ""}`}>
          {line.text.split(" ").map((word, wi) => {
            const i = n++;
            return (
              <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom last:mr-0">
                <motion.span
                  className="inline-block origin-bottom-left will-change-transform"
                  initial={reduce ? false : { y: "110%", rotate: 6, filter: "blur(8px)" }}
                  animate={{ y: "0%", rotate: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.05, ease: EASE, delay: delay + i * stagger }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
          {line.after}
        </span>
      ))}
    </Tag>
  );
}

/** Body copy that arrives word by word, fading and un-blurring. */
export function SoftWords({
  text,
  className,
  delay = 0,
  stagger = 0.018,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <p className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <motion.span
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>{" "}
        </span>
      ))}
    </p>
  );
}
