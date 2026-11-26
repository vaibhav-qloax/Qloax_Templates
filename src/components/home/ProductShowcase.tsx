"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import ProjectCard from "./ProjectCard";
import { PROJECTS, type Project } from "@/content/projects";

const PER_GROUP = 3;
const GROUPS = Math.ceil(PROJECTS.length / PER_GROUP);

/** Scroll windows for one card, generalised from the original 3 + 3 replacement logic. */
function windowFor(idx: number) {
  const g = Math.floor(idx / PER_GROUP);
  const c = idx % PER_GROUP;
  const span = 1 / GROUPS;
  const start = g * span;
  const enterStart = g === 0 ? 0 : start - span * 0.15 + c * 0.03;
  const enterEnd = g === 0 ? 0.06 : enterStart + span * 0.3;
  const last = g === GROUPS - 1;
  const exitStart = last ? 0.97 : start + span * 0.6 + c * 0.03;
  const exitEnd = last ? 1 : exitStart + span * 0.3;
  return { enterStart, enterEnd, exitStart, exitEnd, col: GROUPS > 1 && last && PROJECTS.length % PER_GROUP === 1 ? 2 : c + 1 };
}

function ShowcaseCard({ project, idx, progress }: { project: Project; idx: number; progress: MotionValue<number> }) {
  const w = windowFor(idx);
  const range = [w.enterStart, w.enterEnd, w.exitStart, w.exitEnd];
  const y = useTransform(progress, range, [180, 0, 0, -180]);
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const scale = useTransform(progress, range, [0.9, 1, 1, 0.9]);
  return (
    <motion.div
      style={{ gridColumnStart: w.col, gridRowStart: 1, y, opacity, scale }}
      className="relative z-30 transform-gpu will-change-transform"
    >
      <ProjectCard project={project} priority={idx < 3} />
    </motion.div>
  );
}

/**
 * The original "product ecosystem" showcase: cards enter and are replaced in place as you scroll.
 * Phones and reduced-motion users get the same cards stacked.
 */
export default function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textX = useTransform(scrollYProgress, [0, 1], ["35%", "-165%"]);

  return (
    <section id="work" aria-labelledby="showcase-title" className="relative border-t border-line bg-paper">
      {/* Desktop: sticky scroll showcase */}
      <div ref={ref} className={`relative hidden min-h-[520vh] ${reduce ? "" : "lg:block"}`}>
        <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-8 pt-24 md:px-12">
          <div className="relative z-40 mx-auto flex w-full max-w-7xl items-center justify-between font-mono text-xs text-navy/70">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
              <h2 id="showcase-title" className="font-medium uppercase tracking-widest text-navy">
                // The portfolio · What we&apos;ve built
              </h2>
            </div>
            <span className="hidden font-medium text-navy/60 sm:block">SCROLL TO ADVANCE SHOWCASE</span>
          </div>

          <div aria-hidden className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 select-none overflow-hidden">
            <motion.p
              style={{ x: textX }}
              className="whitespace-nowrap font-display text-[20vw] font-semibold uppercase leading-none tracking-tighter text-navy opacity-[0.07] sm:text-[24vw]"
            >
              WHAT WE&apos;VE BUILT • PORTFOLIO
            </motion.p>
          </div>

          <div className="relative z-30 mx-auto my-auto w-full max-w-7xl">
            <div className="relative grid grid-cols-3 gap-6 lg:gap-8">
              {PROJECTS.map((p, idx) => (
                <ShowcaseCard key={p.slug} project={p} idx={idx} progress={scrollYProgress} />
              ))}
            </div>
          </div>

          <div className="relative z-40 mx-auto flex w-full max-w-7xl items-center justify-between border-t border-line bg-paper/90 pt-3 font-mono text-xs text-navy/70 backdrop-blur-md">
            <span>PROGRESS THROUGH PORTFOLIO · {PROJECTS.length} ENTRIES</span>
            <div className="h-1 w-36 overflow-hidden rounded-full bg-line">
              <motion.div className="h-full bg-navy" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and reduced motion: stacked cards */}
      <div className={`container-site py-20 ${reduce ? "" : "lg:hidden"}`}>
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-navy">The portfolio</p>
          <p className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-ink">What we&apos;ve built</p>
        </Reveal>
        <PhoneCarousel />
      </div>
    </section>
  );
}

/**
 * Phones: a swipeable, snapping row of the same cards with a position counter.
 * Tablets: a two-column grid.
 */
function PhoneCarousel() {
  const [index, setIndex] = useState(0);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setIndex(Math.min(PROJECTS.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + 16))));
  };

  return (
    <>
      <div
        onScroll={onScroll}
        className="-mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        aria-label="Portfolio"
      >
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.05} className="w-[84vw] max-w-[22rem] shrink-0 snap-center sm:w-auto sm:max-w-none">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      {/* Position and swipe hint (phones only) */}
      <div className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-label text-mute sm:hidden">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
        <span className="flex items-center gap-1.5">
          {PROJECTS.map((p, i) => (
            <span key={p.slug} className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-navy" : "w-1.5 bg-line"}`} />
          ))}
        </span>
        <span>Swipe →</span>
      </div>
    </>
  );
}
