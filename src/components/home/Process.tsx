"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { PROCESS } from "@/content/site";
import { EASE } from "@/lib/motion";
import ProcessSketch from "@/components/iso/ProcessSketch";

/**
 * Desktop: a sticky panel where scroll moves the active step from Discover to Support.
 * Mobile and reduced motion: a plain vertical timeline with every step visible.
 */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = PROCESS.steps.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.floor(v * n))));

  const step = PROCESS.steps[active];

  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-line bg-paper">
      {/* Desktop, scroll-driven */}
      <div ref={ref} className={`relative hidden ${reduce ? "" : "lg:block"} lg:h-[320vh]`}>
        <div className="sticky top-0 flex h-screen flex-col justify-center">
          <div className="container-site">
            <p className="eyebrow">How we work</p>
            <h2 id="process-title" className="h-section mt-5 max-w-4xl">
              {PROCESS.title}
            </h2>

            <ol className="mt-14 grid grid-cols-5 gap-4" aria-label="Process steps">
              {PROCESS.steps.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={s.index} aria-current={on ? "step" : undefined} className="relative pt-5">
                    <span className="absolute left-0 top-0 h-px w-full bg-line" />
                    <motion.span
                      className="absolute left-0 top-0 h-0.5 w-full origin-left bg-blue"
                      initial={false}
                      animate={{ scaleX: done || on ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                    <span className={`font-mono text-[11px] transition-colors ${on ? "text-blue" : "text-mute"}`}>{s.index}</span>
                    <span
                      className={`mt-2 block font-display text-2xl font-medium tracking-tight transition-colors duration-500 xl:text-3xl ${
                        on ? "text-ink" : done ? "text-navy/60" : "text-navy/30"
                      }`}
                    >
                      {s.title}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 grid grid-cols-12 items-center gap-8">
              <div className="col-span-7">
                <div className="min-h-[8.5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={step.index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="font-display text-[clamp(1.5rem,2.4vw,2.3rem)] font-medium leading-[1.15] tracking-tight text-ink"
                    >
                      {step.body}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <p className="mt-8 max-w-xl border-l-2 border-amber pl-4 text-base leading-relaxed text-navy/80">{PROCESS.support}</p>
              </div>

              {/* A sketch for the active step, drawn in the figures' isometric line style */}
              <div className="col-span-5 col-start-8 max-h-[42vh]">
                <div className="mx-auto w-full max-w-[26rem]">
                  <ProcessSketch step={active} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and reduced motion */}
      <div className={`container-site py-24 ${reduce ? "" : "lg:hidden"}`}>
        <Reveal>
          <p className="eyebrow">How we work</p>
          <h2 className="h-section mt-5" aria-hidden={!reduce}>
            {PROCESS.title}
          </h2>
        </Reveal>
        <ol className="mt-12 border-l border-line">
          {PROCESS.steps.map((s, i) => (
            <Reveal as="li" key={s.index} delay={i * 0.05} className="relative pb-10 pl-6 last:pb-0">
              <span aria-hidden className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 bg-blue" />
              <span className="font-mono text-[11px] text-mute">{s.index}</span>
              <h3 className="mt-1 font-display text-2xl font-medium tracking-tight text-ink">{s.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-navy/80">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-12 border-l-2 border-amber pl-4 text-base leading-relaxed text-navy/80">{PROCESS.support}</p>
      </div>
    </section>
  );
}
