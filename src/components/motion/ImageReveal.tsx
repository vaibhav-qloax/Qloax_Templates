"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, VIEWPORT } from "@/lib/motion";

/**
 * Opens an image from a slight inset while the image settles from a small zoom.
 * The image is never fully hidden, so screenshots and slow devices still show it.
 */
export default function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`overflow-hidden rounded-2xl ${className ?? ""}`}
      initial={reduce ? false : { clipPath: "inset(6% 6% 6% 6%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
