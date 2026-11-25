"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/content/site";

/**
 * The outlined "QLOAX." moment carried over from the previous hero.
 * As it crosses the viewport, a solid navy fill wipes across the outline.
 */
export default function BrandBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(scrollYProgress, [0.2, 0.6], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-4%"]);

  const word = (
    <>
      QLOAX<span className="text-amber [-webkit-text-stroke:0]">.</span>
    </>
  );

  return (
    <div ref={ref} aria-hidden className="overflow-hidden border-y border-line bg-mist py-10 md:py-16">
      <motion.div style={{ x }} className="relative mx-auto w-max select-none">
        <p
          className="font-display text-[clamp(5rem,22vw,22rem)] font-medium leading-[0.8] tracking-tighter text-transparent"
          style={{ WebkitTextStroke: "2px #2a2a2a" }}
        >
          {word}
        </p>
        <motion.p
          style={{ clipPath: reduce ? "inset(0 0 0 0)" : clip }}
          className="absolute inset-0 font-display text-[clamp(5rem,22vw,22rem)] font-medium leading-[0.8] tracking-tighter text-navy"
        >
          {word}
        </motion.p>
      </motion.div>
      <p className="container-site mt-6 text-right font-mono text-[11px] uppercase tracking-label text-mute">{SITE.motto}</p>
    </div>
  );
}
