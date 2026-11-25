"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/·<>";

/**
 * Text that decodes from random glyphs into its real value, left to right.
 * Screen readers always get the real text.
 */
export default function ScrambleText({
  text,
  delay = 0,
  duration = 0.9,
  className,
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setShown(text);
      return;
    }
    let raf = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / (duration * 1000));
        const settled = Math.floor(p * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < settled || ch === " ") out += ch;
          else if (i < settled + 6) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setShown(out);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, duration, reduce]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown || " "}</span>
    </span>
  );
}
