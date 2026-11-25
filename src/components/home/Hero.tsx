"use client";

import { useEffect, useRef } from "react";
import LatticeFigure from "@/components/hero/LatticeFigure";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import LineReveal from "@/components/motion/LineReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import { CAPABILITIES, CONTACT, HERO } from "@/content/site";
import { EASE } from "@/lib/motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll: the figure drifts and the copy lifts away as the page moves on.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const figureY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  // Pointer: a few pixels of parallax on the figure, desktop pointers only.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * -18);
      py.set((e.clientY / window.innerHeight - 0.5) * -12);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay } };

  return (
    <section ref={ref} aria-label="Introduction" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper">
      {/* 1. Background establishes: the PDF cover figure (Fig. 01, latent lattice). */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ y: figureY }}
        initial={reduce ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <motion.div className="absolute inset-[-2%]" style={{ x: sx, y: sy }}>
          <LatticeFigure className="h-full w-full opacity-40 md:opacity-100" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent md:via-paper/40" />
      </motion.div>

      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="container-site pointer-events-none relative z-10 flex flex-1 flex-col justify-center pb-16 pt-32">
        {/* 2. Eyebrow */}
        <motion.p className="eyebrow flex items-center gap-3" {...enter(0.25)}>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber" />
          {HERO.eyebrow}
        </motion.p>

        {/* 3. Headline */}
        <LineReveal
          as="h1"
          trigger="mount"
          delay={0.35}
          lines={HERO.headline}
          className="mt-6 max-w-5xl font-display text-[clamp(2.35rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-tighter text-ink"
        />

        {/* 4. Supporting text */}
        <motion.p className="mt-8 max-w-xl text-base leading-relaxed text-navy/80 md:text-lg" {...enter(0.7)}>
          {HERO.body}
        </motion.p>

        {/* 5. Calls to action */}
        <motion.div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" {...enter(0.85)}>
          <MagneticButton
            dataCursor="explore"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })}
            className="group inline-flex items-center gap-3 rounded-full bg-navy px-7 py-4 font-mono text-xs uppercase tracking-label text-white shadow-lg shadow-navy/20 transition-colors hover:bg-blue"
          >
            See the work
            <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </MagneticButton>
          <Link href="/#contact" className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-navy">
            Let&apos;s map your process <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </motion.div>

      {/* Capability index along the bottom edge. */}
      <motion.div className="container-site relative z-10 pb-6" {...enter(1)}>
        <ul className="grid grid-cols-2 border-t border-line pt-4 md:grid-cols-5">
          {CAPABILITIES.map((c) => (
            <li key={c.id} className="py-1.5">
              <a href="#capabilities" className="flex items-baseline gap-2 text-sm text-navy">
                <span className="font-mono text-[10px] text-mute">{c.index}</span>
                <span className="link-underline">{c.title}</span>
              </a>
            </li>
          ))}
          <li className="hidden py-1.5 text-right font-mono text-[11px] uppercase tracking-label text-mute md:block">{CONTACT.office}</li>
        </ul>
      </motion.div>
    </section>
  );
}
