"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Lock } from "lucide-react";
import type { Diagram as DiagramData } from "@/content/projects";
import { EASE } from "@/lib/motion";

/** Number of steps reached for a 0..1 progress value. */
function useReached(progress: MotionValue<number>, total: number) {
  const [reached, setReached] = useState(() => Math.round(progress.get() * total));
  useMotionValueEvent(progress, "change", (v) => {
    setReached(Math.max(0, Math.min(total, Math.floor(v * total + 0.35))));
  });
  return reached;
}

/** Progress that runs 0→1 once the element is in view. Used outside scroll-linked layouts. */
export function useInViewProgress(duration = 2.4) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, { duration, ease: "linear" });
    return () => controls.stop();
  }, [inView, reduce, progress, duration]);
  return { ref, progress };
}

export default function Diagram({ diagram, progress }: { diagram: DiagramData; progress: MotionValue<number> }) {
  switch (diagram.kind) {
    case "flow":
      return <Flow steps={diagram.steps} title={diagram.title} progress={progress} />;
    case "chain":
      return <Chain steps={diagram.steps} title={diagram.title} note={diagram.note} progress={progress} />;
    case "guardrails":
      return <Guardrails items={diagram.items} title={diagram.title} progress={progress} />;
    case "boundary":
      return <Boundary {...diagram} progress={progress} />;
  }
}

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="relative rounded-2xl border border-line bg-surface p-5 shadow-xl shadow-navy/[0.05] sm:p-8">
      <figcaption className="eyebrow mb-6 flex items-center justify-between">
        <span>{title}</span>
        <span aria-hidden className="h-1.5 w-1.5 bg-amber" />
      </figcaption>
      {children}
    </figure>
  );
}

function Flow({ steps, title, progress }: { steps: string[]; title: string; progress: MotionValue<number> }) {
  const reached = useReached(progress, steps.length);
  return (
    <Frame title={title}>
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {steps.map((s, i) => {
          const on = i < reached;
          const current = i === reached - 1;
          return (
            <li
              key={s}
              className={`relative flex items-center justify-between border px-4 py-4 transition-colors duration-500 ${
                on ? "border-blue bg-blue text-white" : "border-line bg-paper text-mute"
              }`}
            >
              <span className="font-display text-base font-medium tracking-tight sm:text-lg">{s}</span>
              <span className={`font-mono text-[10px] ${on ? "text-white/60" : "text-mute"}`}>0{i + 1}</span>
              {current && (
                <motion.span
                  layoutId={`flow-cursor-${title}`}
                  className="absolute -bottom-px left-0 h-0.5 w-full bg-amber"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-6 h-px w-full bg-line">
        <motion.div className="h-px origin-left bg-blue" style={{ scaleX: progress }} />
      </div>
    </Frame>
  );
}

function Chain({
  steps,
  title,
  note,
  progress,
}: {
  steps: string[];
  title: string;
  note: string;
  progress: MotionValue<number>;
}) {
  const reached = useReached(progress, steps.length);
  return (
    <Frame title={title}>
      <ol className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {steps.map((s, i) => {
          const locked = i < reached;
          return (
            <li key={s} className="flex flex-col items-stretch">
              <div
                className={`flex aspect-[3/4] flex-col justify-between border p-2 transition-colors duration-500 sm:p-3 ${
                  locked ? "border-blue bg-blue text-white" : "border-line bg-paper text-mute"
                }`}
              >
                <span className={`font-mono text-[10px] ${locked ? "text-white/70" : ""}`}>0{i + 1}</span>
                <Lock
                  aria-hidden
                  size={16}
                  className={`transition-all duration-500 ${locked ? "opacity-100" : "translate-y-1 opacity-0"}`}
                />
              </div>
              <span className={`mt-2 text-center font-display text-xs font-medium sm:text-sm ${locked ? "text-ink" : "text-mute"}`}>
                {s}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-sm text-mute">{note}</p>
      <p className="sr-only">
        {steps.join(", ")}. {note}
      </p>
    </Frame>
  );
}

function Guardrails({ items, title, progress }: { items: string[]; title: string; progress: MotionValue<number> }) {
  const reached = useReached(progress, items.length);
  return (
    <Frame title="AI guardrails">
      <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-label">
        <span className="border border-navy px-2 py-1 text-navy">Read-only AI</span>
        <span className="border border-navy px-2 py-1 text-navy">Human sign-off</span>
      </div>
      <p className="mt-6 font-display text-lg font-medium tracking-tight text-ink">{title}</p>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {items.map((item, i) => {
          const on = i < reached;
          return (
            <li key={item} className="grid grid-cols-[7.5rem_1fr] items-center gap-4 py-3">
              <span className={`font-mono text-[11px] uppercase tracking-label transition-colors duration-500 ${on ? "text-blue" : "text-mute"}`}>
                {item}
              </span>
              {/* Abstract bars, not data: the PDF names the fields, not their values. */}
              <span aria-hidden className="h-2 w-full bg-paper">
                <span
                  className="block h-2 origin-left bg-pink/80 transition-transform duration-700 ease-out"
                  style={{ transform: `scaleX(${on ? 0.35 + ((i * 37) % 50) / 100 : 0})` }}
                />
              </span>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}

function Boundary({
  title,
  inside,
  outside,
  ledger,
  progress,
}: {
  title: string;
  inside: string[];
  outside: string[];
  ledger: string;
  progress: MotionValue<number>;
}) {
  const reached = useReached(progress, 4);
  const show = (n: number) => (reached >= n ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2");
  return (
    <Frame title={title}>
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1.2fr_auto_1fr]">
        <div className={`border-2 border-dashed border-navy p-4 transition-all duration-700 ${show(1)}`}>
          <p className="font-mono text-[10px] uppercase tracking-label text-mute">Stays inside</p>
          <ul className="mt-3 space-y-2">
            {inside.map((x) => (
              <li key={x} className="bg-navy px-3 py-2.5 font-display text-sm font-medium text-white">
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden className={`flex justify-center transition-all duration-700 ${show(2)}`}>
          <span className="block h-8 w-px bg-blue sm:h-px sm:w-12" />
        </div>
        <div className={`transition-all duration-700 ${show(2)}`}>
          <p className="font-mono text-[10px] uppercase tracking-label text-mute">Only this leaves</p>
          <ul className="mt-3 space-y-2">
            {outside.map((x) => (
              <li key={x} className="border border-blue px-3 py-2.5 font-display text-sm font-medium text-blue">
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`mt-6 transition-all duration-700 ${show(3)}`}>
        <p className="font-mono text-[10px] uppercase tracking-label text-mute">{ledger}</p>
        <div aria-hidden className="mt-3 flex items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-1 items-center">
              <span
                className={`h-6 flex-1 border transition-colors duration-500 ${
                  reached >= 4 ? "border-navy bg-blue-soft" : "border-line bg-paper"
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              />
              {i < 5 && <span className="h-px w-2 bg-navy" />}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
