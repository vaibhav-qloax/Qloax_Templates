"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import NextCell from "@/components/iso/NextCell";
import { isoGrid } from "@/components/iso/iso";
import { CONTACT, CTA as COPY, SITE } from "@/content/site";

// Full-width isometric grid behind the whole section, as on the PDF page.
const UNIT = 40;
const GRID_ORIGIN: [number, number] = [1040, 330];
const SECTION_GRID = isoGrid(1440, 810, UNIT, GRID_ORIGIN, 0.72, 18);

/** Light pulses: how many travel at once and how long each journey (plus rest) takes. */
const PULSES = [
  { dur: 9, delay: 0.4, from: "top" },
  { dur: 11, delay: 1.8, from: "right" },
  { dur: 10, delay: 3.3, from: "bottom" },
  { dur: 12, delay: 4.6, from: "topLeft" },
  { dur: 10.5, delay: 6.0, from: "topRight" },
  { dur: 11.5, delay: 7.4, from: "bottomLeft" },
  { dur: 9.5, delay: 8.8, from: "bottomRight" },
  { dur: 12.5, delay: 10.2, from: "right" },
] as const;
type Side = (typeof PULSES)[number]["from"];

/** A start point on the given edge of the 1440 x 810 view. */
function startOn(side: Side, rnd: () => number): [number, number] {
  switch (side) {
    case "top":
      return [300 + rnd() * 900, 30];
    case "bottom":
      return [300 + rnd() * 900, 780];
    case "right":
      return [1410, 140 + rnd() * 520];
    case "topRight":
      return [1100 + rnd() * 300, 40 + rnd() * 120];
    case "bottomRight":
      return [1100 + rnd() * 300, 680 + rnd() * 100];
    case "topLeft":
      return [30 + rnd() * 260, 30];
    case "bottomLeft":
      return [30 + rnd() * 260, 780];
  }
}
/** Share of each cycle spent travelling; the rest is a quiet pause. */
const TRAVEL = 0.7;

/**
 * Route a pulse along the grid's own edges (vertical and +/-30 degrees) from a start node
 * to the button, greedily stepping toward it with a little seeded wandering.
 */
function routeTo(target: [number, number], seed: number, from: Side | [number, number]): string {
  let s = seed >>> 0;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const dx = UNIT * Math.cos(Math.PI / 6);
  const snap = (x: number, y: number): [number, number] => {
    const c = Math.round((x - GRID_ORIGIN[0]) / dx);
    const off = Math.abs(c) % 2 ? UNIT / 2 : 0;
    const r = Math.round((y - GRID_ORIGIN[1] - off) / UNIT);
    return [GRID_ORIGIN[0] + c * dx, GRID_ORIGIN[1] + r * UNIT + off];
  };
  const start = typeof from === "string" ? startOn(from, rnd) : from;
  let [x, y] = snap(start[0], start[1]);
  const moves: [number, number][] = [
    [0, UNIT], [0, -UNIT], [dx, UNIT / 2], [dx, -UNIT / 2], [-dx, UNIT / 2], [-dx, -UNIT / 2],
  ];
  const pts: [number, number][] = [[x, y]];
  for (let n = 0; n < 160; n++) {
    if (Math.hypot(target[0] - x, target[1] - y) < UNIT * 0.9) break;
    let best = moves[0];
    let bestScore = Infinity;
    for (const m of moves) {
      const score = Math.hypot(target[0] - (x + m[0]), target[1] - (y + m[1])) + rnd() * UNIT * 0.9;
      if (score < bestScore) {
        bestScore = score;
        best = m;
      }
    }
    x += best[0];
    y += best[1];
    pts.push([x, y]);
  }
  pts.push(target);
  return "M" + pts.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join("L");
}

const MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Let's map our process")}`;

/**
 * Closing section, laid out like the PDF's last page (p.18):
 * eyebrow, two-line headline, body, a vertical contact list and the motto on the left;
 * Fig. 04 on the right. Faint lines of light travel the background grid from every side
 * toward the "Start the conversation" button, which rings softly as each arrives.
 */
export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [routes, setRoutes] = useState<string[]>([]);
  const [taps, setTaps] = useState<{ id: number; d: string }[]>([]);
  const targetRef = useRef<[number, number] | null>(null);
  const tapId = useRef(0);

  // Route the pulses to wherever the button sits, and give it a soft ring on each arrival.
  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const button = buttonRef.current;
    if (!section || !svg || !button) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const compute = () => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const b = button.getBoundingClientRect();
      const pt = new DOMPoint(b.right - 4, b.top + b.height / 2).matrixTransform(ctm.inverse());
      targetRef.current = [pt.x, pt.y];
      setRoutes(PULSES.map((pl, i) => routeTo([pt.x, pt.y], 101 + i * 37, pl.from)));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(section);

    const timers: number[] = [];
    const ping = () => {
      button.classList.remove("cta-charged");
      void button.offsetWidth;
      button.classList.add("cta-charged");
    };
    PULSES.forEach(({ dur, delay }) => {
      timers.push(
        window.setTimeout(() => {
          ping();
          timers.push(window.setInterval(ping, dur * 1000));
        }, (delay + dur * TRAVEL) * 1000),
      );
    });

    // Tap or click anywhere on the background: a new line starts there and runs to the button.
    const onTap = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, textarea, select")) return;
      const target = targetRef.current;
      const ctm = svg.getScreenCTM();
      if (!target || !ctm) return;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      const id = ++tapId.current;
      setTaps((list) => [...list.slice(-5), { id, d: routeTo(target, 7 + id * 53, [p.x, p.y]) }]);
      timers.push(window.setTimeout(ping, 2600));
      timers.push(window.setTimeout(() => setTaps((list) => list.filter((t) => t.id !== id)), 3200));
    };
    section.addEventListener("pointerdown", onTap);

    return () => {
      section.removeEventListener("pointerdown", onTap);
      ro.disconnect();
      timers.forEach((t) => {
        clearTimeout(t);
        clearInterval(t);
      });
    };
  }, []);

  const rows = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
    { label: "Web", value: CONTACT.web, href: "https://www.qloax.com" },
    { label: "Office", value: CONTACT.office },
  ];

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line bg-paper">
      <svg ref={svgRef} aria-hidden className="absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="cta-glow" cx="0.72" cy="0.45" r="0.32">
            <stop offset="0" stopColor="#e4e8f8" />
            <stop offset="1" stopColor="#e4e8f8" stopOpacity="0" />
          </radialGradient>
          {/* Strongest at the top-right, fading toward the left, as on the PDF page. */}
          <linearGradient id="cta-fade" x1="1" y1="0" x2="0.05" y2="0.75">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cta-tint" x1="1" y1="0" x2="0.05" y2="0.75">
            <stop offset="0" stopColor="#e3e8f7" />
            <stop offset="0.6" stopColor="#e3e8f7" stopOpacity="0.4" />
            <stop offset="1" stopColor="#e3e8f7" stopOpacity="0" />
          </linearGradient>
          <mask id="cta-mask">
            <rect width="1440" height="810" fill="url(#cta-fade)" />
          </mask>
        </defs>
        <rect width="1440" height="810" fill="url(#cta-tint)" />
        <rect width="1440" height="810" fill="url(#cta-glow)" />
        <path d={SECTION_GRID} stroke="#d3d9e8" strokeWidth={1} fill="none" mask="url(#cta-mask)" />

        {/* Pulses of light travelling the grid toward the button */}
        <g className="cta-flow">
          {routes.map((d, i) => (
            <g key={i} style={{ ["--dur" as string]: `${PULSES[i].dur}s`, ["--delay" as string]: `${PULSES[i].delay}s` }}>
              <path className="cta-trail" d={d} pathLength={1000} />
            </g>
          ))}
          {taps.map((t) => (
            <path key={t.id} className="cta-tap" d={t.d} pathLength={1000} />
          ))}
        </g>
      </svg>
      <div className="container-site grid grid-cols-1 items-center lg:grid-cols-2">
        <div className="py-20 md:pl-8 lg:py-24 lg:pl-14 xl:pl-20">
          <p className="font-mono text-[13px] font-medium uppercase tracking-[0.24em] text-blue">{COPY.eyebrow}</p>

          <span id="contact-title" className="sr-only">
            {COPY.headline.join(" ")}
          </span>
          <LineReveal
            as="h2"
            lines={COPY.headline}
            className="mt-10 font-display text-[clamp(2.75rem,4.6vw,4.4rem)] font-medium leading-[1.12] tracking-tight text-ink"
          />

          <Reveal className="mt-8 max-w-xl" delay={0.1}>
            <p className="text-xl leading-snug text-navy/80 md:text-[1.4rem]">{COPY.body}</p>
          </Reveal>

          <Reveal className="mt-10" delay={0.2}>
            <a
              ref={buttonRef}
              href={MAILTO}
              className="group relative inline-flex items-center gap-4 rounded-full bg-ink py-2 pl-7 pr-2 text-base font-medium text-white shadow-lg shadow-ink/15 transition-colors duration-300 hover:bg-blue"
            >
              Start the conversation
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-white/20">
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>

          <Reveal className="mt-14" delay={0.3}>
            <dl className="space-y-3">
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[6.5rem_1fr] items-baseline">
                  <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-blue">{r.label}</dt>
                  <dd className="text-lg text-ink">
                    {r.href ? (
                      <a href={r.href} className="link-underline">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <p className="mt-14 font-mono text-[12px] font-medium uppercase tracking-[0.3em] text-blue">{SITE.motto}</p>
        </div>

        <div className="pb-16 lg:pb-0">
          <NextCell />
        </div>
      </div>
    </section>
  );
}
