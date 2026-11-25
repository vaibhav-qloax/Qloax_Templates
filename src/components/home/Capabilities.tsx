"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { CAPABILITIES } from "@/content/site";
import { getProject, projectHref, type Project } from "@/content/projects";
import { EASE } from "@/lib/motion";

/**
 * Capabilities (PDF p.2): four numbered rows on the left, a framed preview of the matching
 * project screen on the right. Hover (desktop), click or arrow keys switch the preview.
 */
export default function Capabilities() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const cap = CAPABILITIES[active];
  const related = cap.projects.map(getProject).filter((p): p is Project => Boolean(p));
  const total = String(CAPABILITIES.length).padStart(2, "0");

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = CAPABILITIES.length;
    const map: Record<string, number> = {
      ArrowDown: (i + 1) % n,
      ArrowRight: (i + 1) % n,
      ArrowUp: (i - 1 + n) % n,
      ArrowLeft: (i - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    setActive(map[e.key]);
    tabs.current[map[e.key]]?.focus();
  };

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="border-t border-line bg-mist py-24 md:py-32">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Capabilities</p>
            <h2 id="cap-title" className="h-section mt-5">
              We digitise operations
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-mute md:text-lg">
              For growing businesses: the ERP a factory runs on, the platform a school group runs on, and the compliance
              system a clinic needs under India&apos;s DPDP Act.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Numbered rows */}
          <div role="tablist" aria-orientation="vertical" aria-label="Capabilities" className="border-t border-line lg:col-span-5">
            {CAPABILITIES.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`cap-tab-${c.id}`}
                  aria-selected={on}
                  aria-controls="cap-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group relative block w-full border-b border-line py-6 pl-6 text-left"
                >
                  {/* Active marker grows down the left edge */}
                  <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line" />
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 w-0.5 origin-top bg-blue transition-[height] duration-500 ease-out ${on ? "h-full" : "h-0"}`}
                  />
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="flex items-baseline gap-4">
                      <span className={`font-mono text-[11px] transition-colors ${on ? "text-blue" : "text-mute"}`}>{c.index}</span>
                      <span
                        className={`font-display text-xl font-medium tracking-tight transition-colors duration-300 md:text-2xl ${
                          on ? "text-ink" : "text-navy/45 group-hover:text-navy/80"
                        }`}
                      >
                        {c.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      size={18}
                      className={`shrink-0 transition-all duration-300 ${on ? "translate-x-0 text-blue opacity-100" : "-translate-x-1 text-navy/40 opacity-0 group-hover:opacity-100"}`}
                    />
                  </span>
                  <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden">
                      <span className="block max-w-md pl-9 pt-3 text-base leading-relaxed text-navy/75">{c.body}</span>
                      {/* Phones: the screenshot opens inside the active row */}
                      <span className="relative mt-4 block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface lg:hidden">
                        <Image src={c.image.src} alt={c.image.alt} fill sizes="92vw" className="object-cover object-left-top" />
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Preview */}
          <div id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${cap.id}`} className="hidden lg:col-span-7 lg:block">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-ink/[0.06]">
                <div aria-hidden className="flex items-center gap-1.5 border-b border-line bg-mist px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="ml-3 font-mono text-[10px] uppercase tracking-label text-mute">
                    Capability {cap.index} / {total} · {cap.title}
                  </span>
                </div>
                <div className="relative aspect-[16/10] bg-surface">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={cap.id}
                      className="absolute inset-0"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      <Image
                        src={cap.image.src}
                        alt={cap.image.alt}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-left-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cap.id}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2"
                >
                  <span className="eyebrow">Seen in</span>
                  {related.map((p) => {
                    const href = projectHref(p);
                    return href ? (
                      <Link key={p.slug} href={href} className="link-underline inline-flex items-center gap-1 text-sm text-navy">
                        {p.title} <ArrowUpRight size={13} />
                      </Link>
                    ) : (
                      <span key={p.slug} className="text-sm text-mute">
                        {p.title}
                      </span>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
