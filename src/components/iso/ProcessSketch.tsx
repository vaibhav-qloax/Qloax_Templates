"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { makeIso, type Pt } from "./iso";

/**
 * Line sketches for the five "How we work" steps, in the same isometric language as the figures.
 * The active sketch draws itself in; switching steps crossfades to the next one.
 */
const W = 480;
const H = 360;
const INK = "#2a2a2a";
const BLUE = "#4b7be5";
const TINT = { top: "#dfe7fb", left: "#c3d3f6", right: "#9fb7ee" };

type El = { d?: string; poly?: string; circle?: [number, number, number]; dash?: boolean; accent?: boolean; fill?: string; w?: number };

function cubeEls(origin: Pt, edge: number, opts: { solid?: boolean; dashedHidden?: boolean } = {}): El[] {
  const iso = makeIso(origin, edge);
  const c = iso.cube(0, 0, 0);
  const els: El[] = [];
  if (opts.solid) {
    els.push({ poly: c.left, fill: TINT.left }, { poly: c.right, fill: TINT.right }, { poly: c.top, fill: TINT.top });
  }
  c.edges.forEach((d) => els.push({ d }));
  if (opts.dashedHidden) c.hidden.forEach((d) => els.push({ d, dash: true }));
  return els;
}

const line = (a: Pt, b: Pt) => `M${a[0]},${a[1]}L${b[0]},${b[1]}`;

const SKETCHES: El[][] = [
  // 01 Discover: scattered cells and a document, a lens looking at how they connect.
  [
    ...cubeEls([150, 150], 46),
    ...cubeEls([250, 250], 46, { solid: true }),
    ...cubeEls([120, 270], 38),
    { poly: "300,92 368,128 368,196 300,160", fill: "#f1f3f8" },
    { d: "M312,118L356,141M312,132L356,155M312,146L340,161" },
    { d: "M150,150C190,200 210,215 250,250", dash: true, accent: true },
    { d: "M120,270C170,275 200,262 250,250", dash: true, accent: true },
    { circle: [330, 210, 52], accent: true, w: 2.2 },
    { d: "M367,247L412,292", w: 4 },
  ],
  // 02 Design: one cell drawn as a blueprint with construction lines, dimensions and a pencil.
  [
    ...cubeEls([220, 185], 104, { dashedHidden: true }),
    { d: "M90,175L90,300M84,175L96,175M84,300L96,300", accent: true },
    { d: "M130,330L220,382M128,322L132,338M218,374L222,390", accent: true },
    { d: "M40,95L400,95M40,95L40,330", dash: true },
    { d: "M330,80L410,30L422,48L342,98Z", fill: "#f1f3f8" },
    { d: "M330,80L318,104L342,98", fill: INK },
  ],
  // 03 Build: delivered in phases — two cells placed, the third arriving from above.
  [
    { d: "M60,300L240,196L420,300L240,404Z", dash: true },
    ...cubeEls([200, 250], 80, { solid: true }),
    ...cubeEls([270, 290], 80, { solid: true }),
    ...cubeEls([235, 150], 80),
    { d: "M235,40L235,96M225,86L235,100L245,86", accent: true },
  ],
  // 04 Deploy: the cell set on its platform; data migrates in; checked and live.
  [
    { poly: "90,262 240,176 390,262 240,348", fill: "#f1f3f8" },
    { d: "M90,262L90,276L240,362L390,276L390,262" },
    ...cubeEls([240, 230], 92, { solid: true }),
    { d: "M20,170L120,170M108,160L122,170L108,180", dash: true, accent: true },
    { d: "M20,215L105,215M93,205L107,215L93,225", dash: true, accent: true },
    { circle: [380, 90, 26], accent: true, w: 2 },
    { d: "M368,90L377,100L394,80", accent: true, w: 2.4 },
  ],
  // 05 Support: the formed cell with an ongoing orbit of care around it.
  [
    ...cubeEls([240, 200], 96, { solid: true }),
    { d: "M60,215A180,70 0 1,0 420,215A180,70 0 1,0 60,215", dash: true, accent: true },
  ],
];

export default function ProcessSketch({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const els = SKETCHES[step] ?? SKETCHES[0];

  return (
    <div className="relative" aria-hidden>
      <svg viewBox={`0 0 ${W} ${H + 40}`} className="h-auto w-full overflow-visible">
        <AnimatePresence mode="wait">
          <motion.g key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            {els.map((e, i) => {
              const stroke = e.accent ? BLUE : INK;
              const common = {
                stroke,
                strokeWidth: e.w ?? 1.6,
                strokeLinecap: "round" as const,
                strokeLinejoin: "round" as const,
                strokeDasharray: e.dash ? "6 7" : undefined,
              };
              const draw = reduce
                ? {}
                : {
                    initial: { pathLength: 0, opacity: 0 },
                    animate: { pathLength: 1, opacity: 1 },
                    transition: { duration: 0.6, ease: "easeInOut" as const, delay: i * 0.022 },
                  };
              const fill = reduce
                ? {}
                : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.45, delay: 0.15 + i * 0.022 } };
              if (e.poly)
                return <motion.polygon key={i} points={e.poly} fill={e.fill ?? "none"} {...common} strokeWidth={1.2} {...fill} />;
              if (e.circle)
                return <motion.circle key={i} cx={e.circle[0]} cy={e.circle[1]} r={e.circle[2]} fill="#eef3fd" fillOpacity={0.6} {...common} {...draw} />;
              return <motion.path key={i} d={e.d} fill={e.fill ?? "none"} {...common} {...(e.dash ? fill : draw)} />;
            })}

            {/* Support: nodes travelling the orbit */}
            {step === 4 &&
              [0, 1, 2].map((n) => (
                <circle key={n} r={6} fill={BLUE} cx={reduce ? [60, 420, 240][n] : 0} cy={reduce ? [215, 215, 285][n] : 0}>
                  {!reduce && (
                    <animateMotion
                      dur="9s"
                      begin={`${-n * 3}s`}
                      repeatCount="indefinite"
                      path="M60,215A180,70 0 1,0 420,215A180,70 0 1,0 60,215"
                    />
                  )}
                </circle>
              ))}
          </motion.g>
        </AnimatePresence>
      </svg>
    </div>
  );
}
