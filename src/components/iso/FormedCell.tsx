"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { ISO, isoGrid, makeIso, type Pt } from "./iso";

const W = 640;
const H = 640;
const EDGE = 190;
const O: Pt = [320, 330];
const iso = makeIso(O, EDGE);
const c = iso.cube(0, 0, 0);
const [, c1, c2, c3, , , c6, c7] = c.corners;
const GRID = isoGrid(W, H, EDGE / 4, O, 0.62, 12);

/** Inner hexagon on the front corner, as drawn in the PDF's Fig. 02. */
const hex = (() => {
  const r = EDGE * 0.42;
  const dx = r * Math.cos(Math.PI / 6);
  const [x, y] = c6;
  return iso.pts([
    [x, y - r],
    [x + dx, y - r / 2],
    [x + dx, y + r / 2],
    [x, y + r],
    [x - dx, y + r / 2],
    [x - dx, y - r / 2],
  ]);
})();

/** The four pins and their meanings, positioned as in the PDF (p.2). */
const PINS: {
  id: string;
  label: string;
  from: Pt;
  to: Pt;
  text: Pt;
  anchor: "start" | "middle" | "end";
  /** Where the label floats before the cell forms. */
  chaos: { x: number; y: number; r: number };
}[] = [
  { id: "problems", label: "Problems", from: c7, to: [c7[0], c7[1] - 86], text: [c7[0] + 4, c7[1] - 108], anchor: "middle", chaos: { x: -150, y: 70, r: -14 } },
  { id: "workload", label: "Workload", from: c3, to: [c3[0] + 78, c3[1]], text: [c3[0] + 30, c3[1] + 44], anchor: "start", chaos: { x: -120, y: -150, r: 11 } },
  { id: "technology", label: "Technology", from: c2, to: [c2[0], c2[1] + 72], text: [c2[0] - 2, c2[1] + 112], anchor: "middle", chaos: { x: 140, y: -190, r: 9 } },
  { id: "chaos", label: "Chaos", from: c1, to: [c1[0] - 78, c1[1]], text: [c1[0] - 60, c1[1] - 22], anchor: "end", chaos: { x: 170, y: 120, r: -18 } },
];

function Pin({ pin, progress, i, active, onHover }: { pin: (typeof PINS)[number]; progress: MotionValue<number>; i: number; active: boolean; onHover: (id: string | null) => void }) {
  const start = 0.56 + i * 0.04;
  const draw = useTransform(progress, [start, start + 0.14], [0, 1]);
  const dot = useTransform(progress, [start + 0.1, start + 0.16], [0, 1]);
  // Labels drift in chaos first, then settle onto their pins as the cell forms.
  const settle = useTransform(progress, [0.5, 0.82], [0, 1]);
  const lx = useTransform(settle, (t) => pin.chaos.x * (1 - t));
  const ly = useTransform(settle, (t) => pin.chaos.y * (1 - t));
  const lr = useTransform(settle, (t) => pin.chaos.r * (1 - t));
  const lo = useTransform(progress, [0, 0.12, 0.82], [0, 0.55, 1]);

  return (
    <g
      className="cursor-pointer"
      onPointerEnter={() => onHover(pin.id)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(pin.id)}
      onBlur={() => onHover(null)}
    >
      <motion.path d={iso.line(pin.from, pin.to)} stroke={ISO.node} strokeWidth={active ? 3 : 2} style={{ pathLength: draw }} />
      <motion.g style={{ scale: dot, transformOrigin: `${pin.to[0]}px ${pin.to[1]}px` }}>
        <circle cx={pin.to[0]} cy={pin.to[1]} r={active ? 13 : 10} fill="none" stroke={ISO.wire} strokeOpacity={0.6} strokeWidth={1.2} style={{ transition: "r .35s" }} />
        <circle cx={pin.to[0]} cy={pin.to[1]} r={5} fill={ISO.node} />
      </motion.g>
      <motion.text
        x={pin.text[0]}
        y={pin.text[1]}
        textAnchor={pin.anchor}
        fontFamily="Caveat, 'Segoe Print', cursive"
        fontSize={active ? 34 : 30}
        fill={active ? "#2a2a2a" : ISO.node}
        style={{ x: lx, y: ly, rotate: lr, opacity: lo, transformBox: "fill-box", transformOrigin: "center", transition: "font-size .3s, fill .3s" }}
      >
        {pin.label}
      </motion.text>
      <circle cx={pin.to[0]} cy={pin.to[1]} r={30} fill="transparent" />
    </g>
  );
}

/**
 * Fig. 02 · One cell, fully formed. Scroll progress (0→1) assembles the cell:
 * wireframe traces in, faces slide together and fill, pins draw out, labels settle.
 */
export default function FormedCell({ progress }: { progress: MotionValue<number> }) {
  const [hover, setHover] = useState<string | null>(null);
  const [formed, setFormed] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setFormed(v > 0.62));

  const edges = useTransform(progress, [0.04, 0.34], [0, 1]);
  const leftO = useTransform(progress, [0.28, 0.44], [0, 1]);
  const leftX = useTransform(progress, [0.28, 0.44], [-46, 0]);
  const leftY = useTransform(progress, [0.28, 0.44], [26, 0]);
  const rightO = useTransform(progress, [0.34, 0.5], [0, 1]);
  const rightX = useTransform(progress, [0.34, 0.5], [46, 0]);
  const rightY = useTransform(progress, [0.34, 0.5], [26, 0]);
  const topO = useTransform(progress, [0.4, 0.56], [0, 1]);
  const topY = useTransform(progress, [0.4, 0.56], [-52, 0]);
  const hexO = useTransform(progress, [0.54, 0.66], [0, 0.55]);
  const wireO = useTransform(progress, [0.44, 0.6], [1, 0.25]);
  const glow = useTransform(progress, [0.5, 0.8], [0, 1]);

  return (
    <figure className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Fig. 02: one cell, fully formed. Four pins mark Problems, Workload, Technology and Chaos.">
        <defs>
          <radialGradient id="fc-glow" cx="0.5" cy="0.52" r="0.5">
            <stop offset="0" stopColor="#dfe7fb" />
            <stop offset="1" stopColor="#dfe7fb" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fc-fade" cx="0.5" cy="0.5" r="0.55">
            <stop offset="0.35" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="fc-mask">
            <rect width={W} height={H} fill="url(#fc-fade)" />
          </mask>
          <linearGradient id="fc-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={ISO.topLight} />
            <stop offset="1" stopColor={ISO.top} />
          </linearGradient>
        </defs>

        <path d={GRID} stroke={ISO.grid} strokeWidth={1} fill="none" mask="url(#fc-mask)" />
        <motion.circle cx={O[0]} cy={O[1]} r={250} fill="url(#fc-glow)" style={{ opacity: glow }} />

        {/* Faces assemble from three directions */}
        <motion.polygon points={c.left} fill={ISO.left} style={{ opacity: leftO, x: leftX, y: leftY }} />
        <motion.polygon points={c.right} fill={ISO.right} style={{ opacity: rightO, x: rightX, y: rightY }} />
        <motion.polygon points={c.top} fill="url(#fc-top)" style={{ opacity: topO, y: topY }} />
        <motion.polygon points={hex} fill="none" stroke="#c9d6fb" strokeWidth={1.4} style={{ opacity: hexO }} />
        <motion.path d={`M${c6[0]},${c6[1]}V${c6[1] + EDGE * 0.42}`} stroke="#c9d6fb" strokeWidth={1.4} style={{ opacity: hexO }} />

        {/* Wireframe traces first, then fades back once the faces are on */}
        <motion.g style={{ opacity: wireO }}>
          {[...c.edges, ...c.hidden].map((d, i) => (
            <motion.path key={i} d={d} stroke={ISO.wire} strokeWidth={1.6} strokeDasharray={i >= c.edges.length ? "5 6" : undefined} fill="none" style={{ pathLength: edges }} />
          ))}
        </motion.g>

        {PINS.map((pin, i) => (
          <Pin key={pin.id} pin={pin} i={i} progress={progress} active={hover === pin.id} onHover={setHover} />
        ))}
      </svg>

      <figcaption className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-label text-mute">
        <span>Fig. 02 · One cell</span>
        <span className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${formed ? "bg-blue" : "bg-line"}`} />
          <span className={`transition-colors duration-500 ${formed ? "text-ink" : ""}`}>{formed ? "Fully formed" : "Unformed"}</span>
        </span>
      </figcaption>
    </figure>
  );
}
