"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { PRINCIPLES } from "@/content/site";
import { EASE, VIEWPORT } from "@/lib/motion";

export default function Principles() {
  const reduce = useReducedMotion();
  return (
    <section id="why" aria-labelledby="why-title" className="bg-navy py-24 text-white md:py-36">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow text-white/60">Why QLOAX</p>
          <h2 id="why-title" className="mt-5 font-display text-[clamp(2.25rem,5.2vw,4.75rem)] font-medium leading-[0.98] tracking-tighter">
            What you can hold us to
          </h2>
        </Reveal>

        <ol className="mt-16">
          {PRINCIPLES.map((p, i) => (
            <li key={p.index} className="relative grid grid-cols-12 gap-x-4 gap-y-3 py-8 md:py-10">
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 h-px w-full origin-left bg-white/25"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.1, ease: EASE, delay: i * 0.08 }}
              />
              <span className="col-span-2 font-mono text-[11px] text-amber md:col-span-1">{p.index}</span>
              <Reveal className="col-span-10 md:col-span-5" delay={0.1 + i * 0.05}>
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.05] tracking-tighter">{p.title}</h3>
              </Reveal>
              <Reveal className="col-span-10 col-start-3 md:col-span-5 md:col-start-auto" delay={0.15 + i * 0.05}>
                <p className="text-base leading-relaxed text-white/75 md:text-lg">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
