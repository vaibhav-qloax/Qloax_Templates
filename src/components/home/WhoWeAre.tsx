"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import FormedCell from "@/components/iso/FormedCell";
import { ABOUT } from "@/content/site";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {word}
    </motion.span>
  );
}

/**
 * Who we are: the PDF's positioning beside Fig. 02.
 * Desktop: the section pins while scroll assembles the cell from Problems, Workload,
 * Technology and Chaos into one formed system. Mobile: the cell plays once in view.
 */
export default function WhoWeAre() {
  const ref = useRef<HTMLElement>(null);
  const figRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Mobile / reduced motion: run 0→1 once the figure is in view.
  const once = useMotionValue(reduce ? 1 : 0);
  const inView = useInView(figRef, { once: true, amount: 0.4 });
  useEffect(() => {
    if (desktop || !inView) return;
    if (reduce) {
      once.set(1);
      return;
    }
    const a = animate(once, 1, { duration: 3, ease: [0.45, 0, 0.2, 1] });
    return () => a.stop();
  }, [desktop, inView, reduce, once]);

  const scrollDriven = desktop && !reduce;
  const progress = scrollDriven ? scrollYProgress : once;
  // Text is scroll-driven only on desktop; on phones it is always readable.
  const full = useMotionValue(1);
  const textProgress = scrollDriven ? scrollYProgress : full;
  const headProgress = useTransform(textProgress, [0, 0.45], [0, 1]);
  const bodyOpacity = useTransform(textProgress, [0.3, 0.5], [0, 1]);
  const bodyY = useTransform(textProgress, [0.3, 0.5], [24, 0]);

  const words = ABOUT.headline.flatMap((line, li) => line.split(" ").map((w) => ({ w, li })));

  return (
    <section ref={ref} id="about" aria-labelledby="about-title" className={`relative border-t border-line bg-paper ${reduce ? "" : "lg:h-[230vh]"}`}>
      <div className={`${reduce ? "" : "lg:sticky lg:top-0 lg:h-screen"} flex items-center py-24 lg:py-0`}>
        <div className="container-site grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-ink/40" />
              {ABOUT.eyebrow}
            </p>
            <h2 id="about-title" className="mt-6 font-display text-[clamp(2.5rem,5.6vw,5.4rem)] font-medium leading-[0.98] tracking-tighter text-ink">
              {ABOUT.headline.map((line, li) => (
                <span key={line} className="block">
                  {reduce
                    ? line
                    : words
                        .map((x, i) => ({ ...x, i }))
                        .filter((x) => x.li === li)
                        .map(({ w, i }) => (
                          <Word key={`${w}-${i}`} word={w} progress={headProgress} range={[i / words.length, Math.min(1, (i + 1.4) / words.length)]} />
                        ))}
                </span>
              ))}
            </h2>
            <motion.p style={reduce ? undefined : { opacity: bodyOpacity, y: bodyY }} className="mt-10 max-w-xl text-lg leading-relaxed text-navy/80">
              {ABOUT.body}
            </motion.p>
          </div>

          <div ref={figRef} className="lg:col-span-5 lg:col-start-8">
            {/* Technical drawing frame: corner marks instead of a card. */}
            <div className="relative p-6 sm:p-8">
              {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((pos) => (
                <span key={pos} aria-hidden className={`absolute h-5 w-5 border-ink/40 ${pos}`} />
              ))}
              <FormedCell progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
