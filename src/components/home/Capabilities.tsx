"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CAPABILITIES } from "@/content/site";
import { getProject, projectHref, type Project } from "@/content/projects";
import { EASE } from "@/lib/motion";

/** Original selector + dominant card layout, with the four PDF capabilities (p.2). */
export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const cap = CAPABILITIES[activeIndex];
  const related = cap.projects.map(getProject).filter((p): p is Project => Boolean(p));
  const total = String(CAPABILITIES.length).padStart(2, "0");

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = CAPABILITIES.length;
    const map: Record<string, number> = { ArrowDown: (i + 1) % n, ArrowRight: (i + 1) % n, ArrowUp: (i - 1 + n) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    setActiveIndex(map[e.key]);
    tabs.current[map[e.key]]?.focus();
  };

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="relative overflow-hidden border-t border-line bg-mist py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 top-0 w-px bg-line" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 space-y-4">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-navy">// Capabilities</span>
          <h2 id="cap-title" className="font-display text-4xl font-semibold uppercase tracking-tight text-ink sm:text-6xl">
            We digitise operations
          </h2>
          <p className="max-w-2xl text-base text-navy/70">For growing businesses: the ERP a factory runs on, the platform a school group runs on, and the compliance system a clinic needs under India&apos;s DPDP Act.</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div role="tablist" aria-orientation="vertical" aria-label="Capabilities" className="space-y-3 lg:col-span-5">
            {CAPABILITIES.map((c, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabs.current[idx] = el;
                  }}
                  role="tab"
                  id={`cap-tab-${c.id}`}
                  aria-selected={isActive}
                  aria-controls="cap-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => onKey(e, idx)}
                  data-cursor="hover"
                  className={`group flex w-full items-center justify-between rounded-xl border p-5 text-left transition-all duration-300 ${
                    isActive ? "border-navy bg-surface shadow-md ring-1 ring-navy/20" : "border-line bg-surface/60 hover:border-navy hover:bg-surface"
                  }`}
                >
                  <span className="space-y-1">
                    <span className="flex items-center gap-3">
                      <span className={`font-mono text-xs ${isActive ? "font-medium text-navy" : "text-navy/50"}`}>{c.index}</span>
                      <span className={`font-display text-lg font-medium uppercase tracking-tight ${isActive ? "text-navy" : "text-ink group-hover:text-navy"}`}>
                        {c.title}
                      </span>
                    </span>
                    <span className="block pl-7 text-xs text-navy/60">{c.body}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${isActive ? "translate-x-1 text-navy" : "text-navy/40 group-hover:translate-x-1 group-hover:text-navy"}`}
                  />
                </button>
              );
            })}
          </div>

          <div id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${cap.id}`} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={cap.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="space-y-6 overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-navy/[0.06]"
              >
                <div className="relative h-64 w-full overflow-hidden bg-mist sm:h-80" data-cursor="view">
                  <Image
                    src={cap.image.src}
                    alt={cap.image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-left-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded border border-line bg-surface/90 px-3 py-1 font-mono text-xs font-medium text-navy shadow-sm backdrop-blur-md">
                    CAPABILITY {cap.index} / {total}
                  </div>
                </div>

                <div className="space-y-6 p-8 pt-0">
                  <div>
                    <h3 className="font-display text-2xl font-medium uppercase tracking-tight text-ink">{cap.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/75">{cap.body}</p>
                  </div>

                  <div className="space-y-2 border-t border-line pt-4">
                    <span className="font-mono text-xs font-medium uppercase tracking-wider text-navy">Seen in our work</span>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {related.map((p) => {
                        const href = projectHref(p);
                        const inner = (
                          <>
                            <CheckCircle2 size={14} className="shrink-0 text-navy" />
                            <span>{p.title}</span>
                            {href && <ArrowUpRight size={12} className="text-navy/50" />}
                          </>
                        );
                        return href ? (
                          <Link key={p.slug} href={href} className="flex items-center gap-2 text-xs text-navy/90 hover:text-blue">
                            {inner}
                          </Link>
                        ) : (
                          <span key={p.slug} className="flex items-center gap-2 text-xs text-navy/90">
                            {inner}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
