"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { INDUSTRIES } from "@/content/site";
import { getProject, projectHref, type Project } from "@/content/projects";
import { EASE } from "@/lib/motion";

export default function Industries() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const ind = INDUSTRIES[active];
  const related = ind.projects.map(getProject).filter((p): p is Project => Boolean(p));
  const visual = related.find((p) => p.cover)?.cover;

  return (
    <section id="industries" aria-labelledby="industries-title" className="border-t border-line bg-mist py-24 md:py-36">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">Industries</p>
          <h2 id="industries-title" className="h-section mt-5">
            We build for
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <ul className="lg:col-span-6">
            {INDUSTRIES.map((x, i) => {
              const on = i === active;
              return (
                <li key={x.id} className="border-t border-line last:border-b">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-center justify-between py-5 text-left"
                  >
                    <span
                      className={`font-display text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-none tracking-tighter transition-[color,transform] duration-500 ease-out ${
                        on ? "translate-x-3 text-ink" : "text-navy/35 group-hover:text-navy/70"
                      }`}
                    >
                      {x.name}
                    </span>
                    <span className={`font-mono text-[11px] transition-colors ${on ? "text-pink" : "text-mute"}`}>
                      0{i + 1}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-6" aria-live="polite">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-paper shadow-xl shadow-navy/[0.06]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={visual?.src ?? "fallback"}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -24 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {visual ? (
                      <Image src={visual.src} alt={visual.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover object-left-top" />
                    ) : (
                      <Image src="/brand/fig-04-next-cell.jpg" alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="brand-figure object-cover object-[75%_50%]" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={ind.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mt-6"
                >
                  <p className="eyebrow">{ind.name}</p>
                  {related.length ? (
                    <ul className="mt-3 divide-y divide-line border-y border-line">
                      {related.map((p) => {
                        const href = projectHref(p);
                        const inner = (
                          <>
                            <span className="font-display text-lg font-medium tracking-tight text-ink">{p.title}</span>
                            <span className="text-sm text-mute">{p.summary}</span>
                          </>
                        );
                        return (
                          <li key={p.slug}>
                            {href ? (
                              <Link href={href} className="group flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                                {inner}
                                <ArrowUpRight aria-hidden size={14} className="hidden text-navy sm:block" />
                              </Link>
                            ) : (
                              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">{inner}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="mt-3 max-w-md text-base leading-relaxed text-navy/80">
                      Talk to us about the workflow you want to digitise.{" "}
                      <Link href="/#contact" className="link-underline text-blue">
                        Let&apos;s map your process
                      </Link>
                      .
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
