"use client";

import { ISO, makeIso, type Pt } from "./iso";

/**
 * Fig. 04 · Next cell, unformed (PDF p.18), redrawn for the site.
 * A lattice cell: each visible face divided 3 × 3, a lavender wash, the amber marker,
 * and four pins labelled Solution, Growth, AI Enabled and Collaborate.
 * The background grid and glow live on the section so they span the full width.
 */
const W = 720;
const H = 640;
const EDGE = 150;
const iso = makeIso([380, 300], EDGE);
const cell = iso.cube(0, 0, 0);
const [c0, c1, c2, c3, c4, c5, c6, c7] = cell.corners;

/** Lattice lines on the three visible faces (thirds). */
const LATTICE = (() => {
  const P = iso.p;
  const seg = (a: Pt, b: Pt) => iso.line(a, b);
  const out: string[] = [];
  for (const t of [1 / 3, 2 / 3]) {
    // Left face (plane i = 1)
    out.push(seg(P(1, t, 0), P(1, t, 1)), seg(P(1, 0, t), P(1, 1, t)));
    // Right face (plane j = 1)
    out.push(seg(P(t, 1, 0), P(t, 1, 1)), seg(P(0, 1, t), P(1, 1, t)));
    // Top face (plane k = 1)
    out.push(seg(P(t, 0, 1), P(t, 1, 1)), seg(P(0, t, 1), P(1, t, 1)));
  }
  return out;
})();

const PIN = 58;
/** Labels hug their pins, placed as on the PDF page. */
const PINS: { label: string; from: Pt; to: Pt; text: Pt; anchor: "start" | "middle" | "end" }[] = [
  { label: "Solution", from: c7, to: [c7[0], c7[1] - PIN], text: [c7[0], c7[1] - PIN - 22], anchor: "middle" },
  { label: "Growth", from: c3, to: [c3[0] + PIN, c3[1]], text: [c3[0] + PIN - 8, c3[1] + 40], anchor: "start" },
  { label: "AI Enabled", from: c2, to: [c2[0], c2[1] + PIN], text: [c2[0], c2[1] + PIN + 42], anchor: "middle" },
  { label: "Collaborate", from: c1, to: [c1[0] - PIN, c1[1]], text: [c1[0] - PIN + 12, c1[1] - 22], anchor: "end" },
];

/** Static figure: no entrance, pulse or hover animation on the cube itself. */
export default function NextCell() {
  const silhouette = iso.pts([c1, c2, c3, c7, c4, c5]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Fig. 04: next cell, unformed. Four pins mark Solution, Growth, AI Enabled and Collaborate."
    >
      <defs>
        <radialGradient id="nc-amber">
          <stop offset="0" stopColor={ISO.amber} stopOpacity="0.9" />
          <stop offset="0.4" stopColor={ISO.amber} stopOpacity="0.35" />
          <stop offset="1" stopColor={ISO.amber} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nc-wash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6eafb" />
          <stop offset="1" stopColor="#d3daf6" />
        </linearGradient>
      </defs>

      <polygon points={silhouette} fill="url(#nc-wash)" opacity={0.85} />
      {LATTICE.map((d, i) => (
        <path key={i} d={d} stroke="#8b9bd0" strokeWidth={1} strokeOpacity={0.7} fill="none" />
      ))}
      <path d={iso.line(c0, c4)} stroke={ISO.wire} strokeOpacity={0.15} strokeWidth={1} />
      {cell.edges.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={ISO.wire} strokeWidth={1.5} strokeLinejoin="round" />
      ))}

      <circle cx={c6[0]} cy={c6[1]} r={30} fill="url(#nc-amber)" />
      <circle cx={c6[0]} cy={c6[1]} r={5} fill={ISO.amber} />

      {PINS.map((pin) => (
        <g key={pin.label}>
          <path d={iso.line(pin.from, pin.to)} stroke={ISO.wire} strokeWidth={1.4} />
          <circle cx={pin.to[0]} cy={pin.to[1]} r={8} fill="none" stroke={ISO.wire} strokeOpacity={0.55} strokeWidth={1.1} />
          <circle cx={pin.to[0]} cy={pin.to[1]} r={3.8} fill={ISO.node} />
          <text
            x={pin.text[0]}
            y={pin.text[1]}
            textAnchor={pin.anchor}
            fontFamily="Caveat, 'Segoe Print', cursive"
            fontWeight={400}
            fontSize={34}
            fill={ISO.node}
          >
            {pin.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
