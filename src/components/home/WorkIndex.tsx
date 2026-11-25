"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { PROJECTS, projectHref, type Project } from "@/content/projects";
import { EASE } from "@/lib/motion";

/**
 * Editorial index of all seven portfolio entries (PDF p.3).
 * Desktop: a screenshot preview follows the pointer over each row.
 * Touch and small screens: the screenshot sits inside the row instead.
 */
export default function WorkIndex() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<Project | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => setFinePointer(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  const onMove = (e: React.PointerEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line bg-white py-24 md:py-36">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">The portfolio</p>
            <h2 id="work-title" className="h-section mt-5">
              What we&apos;ve built
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-base leading-relaxed text-mute">
              Own products, client builds and a web service, each engineered around how the business actually works.
            </p>
          </Reveal>
        </div>

        <ol
          ref={listRef}
          className="relative mt-16 border-t border-ink"
          onPointerMove={finePointer ? onMove : undefined}
          onPointerLeave={() => setHovered(null)}
        >
          {PROJECTS.map((p, i) => (
            <Row key={p.slug} project={p} index={i} showThumb={!finePointer} onHover={finePointer ? setHovered : undefined} />
          ))}

          {/* Pointer-following preview */}
          {finePointer && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 w-[26rem]"
              style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            >
              <AnimatePresence mode="popLayout">
                {hovered?.cover && (
                  <motion.div
                    key={hovered.slug}
                    initial={{ opacity: 0, scale: 0.92, clipPath: "inset(10% 10% 10% 10%)" }}
                    animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden border border-line bg-white shadow-[0_24px_60px_-20px_rgba(11,16,32,0.35)]"
                  >
                    <Image
                      src={hovered.cover.src}
                      alt=""
                      width={hovered.cover.width}
                      height={hovered.cover.height}
                      sizes="26rem"
                      className="h-auto w-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </ol>
      </div>
    </section>
  );
}

function Row({
  project: p,
  index,
  showThumb,
  onHover,
}: {
  project: Project;
  index: number;
  showThumb: boolean;
  onHover?: (p: Project | null) => void;
}) {
  const href = projectHref(p);
  const content = (
    <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-7 md:py-9">
      <span className="col-span-2 font-mono text-[11px] text-mute md:col-span-1">{p.index}</span>
      <h3 className="col-span-10 font-display text-[clamp(1.6rem,3.6vw,3.25rem)] font-medium leading-[1.02] tracking-tighter text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-5">
        {p.title}
      </h3>
      <p className="col-span-10 col-start-3 text-base leading-snug text-navy/80 md:col-span-3 md:col-start-auto">{p.summary}</p>
      <div className="col-span-10 col-start-3 flex items-center justify-between gap-4 md:col-span-3 md:col-start-auto">
        <span className="font-mono text-[10px] uppercase tracking-label text-mute">{p.tags.join(" · ")}</span>
        {href && (
          <ArrowUpRight
            aria-hidden
            size={20}
            className="shrink-0 text-navy transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue"
          />
        )}
      </div>
      {showThumb && p.cover && (
        <div className="col-span-10 col-start-3 mt-3 overflow-hidden border border-line md:col-span-6 md:col-start-7">
          <Image
            src={p.cover.src}
            alt=""
            width={p.cover.width}
            height={p.cover.height}
            sizes="(min-width: 768px) 50vw, 85vw"
            className="h-auto w-full"
          />
        </div>
      )}
    </div>
  );

  return (
    <Reveal as="li" delay={index * 0.04} y={16} className="group relative border-b border-line">
      <span aria-hidden className="absolute bottom-[-1px] left-0 h-px w-0 bg-ink transition-[width] duration-700 ease-out group-hover:w-full" />
      {href ? (
        <Link
          href={href}
          className="block"
          onPointerEnter={() => onHover?.(p)}
          onFocus={() => onHover?.(null)}
          aria-label={`${p.title}: ${p.summary}. View case study`}
        >
          {content}
        </Link>
      ) : (
        <div onPointerEnter={() => onHover?.(null)}>{content}</div>
      )}
    </Reveal>
  );
}
