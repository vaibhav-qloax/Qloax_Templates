/**
 * Geometry for "Fig. 01 · Latent lattice", the QLOAX cover figure, redrawn in code.
 * Measured from the PDF artwork (2765 × 1556 px). True isometric projection:
 * one cell = 137.8 px edge = 3 units, so one unit = 45.93 px.
 *
 * Every cube is its own object with three separate faces, so each box can be
 * styled or animated independently.
 */

export const VIEW = { w: 2765, h: 1556 };

type Pt = [number, number];

const CELL = 137.8;
const COS = Math.cos(Math.PI / 6); // 0.866
// Screen vectors for one cell along each axis.
const X: Pt = [-CELL * COS, CELL / 2]; // toward front-left
const Y: Pt = [CELL * COS, CELL / 2]; // toward front-right
const Z: Pt = [0, -CELL]; // up
/** Back corner of the 3×3×3 lattice at ground level. */
const BACK: Pt = [1955, 760];

const pt = (i: number, j: number, k: number, origin: Pt = BACK, scale = 1): Pt => [
  origin[0] + scale * (i * X[0] + j * Y[0] + k * Z[0]),
  origin[1] + scale * (i * X[1] + j * Y[1] + k * Z[1]),
];
const poly = (ps: Pt[]) => ps.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

export type CubeFaces = { id: string; top: string; left: string; right: string; depth: number };

/** A solid cube with origin at its back-bottom corner, in lattice or free space. */
function solid(id: string, i: number, j: number, k: number, origin: Pt = BACK, scale = 1): CubeFaces {
  const P = (a: number, b: number, c: number) => pt(i + a, j + b, k + c, origin, scale);
  return {
    id,
    top: poly([P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)]),
    left: poly([P(1, 0, 0), P(1, 1, 0), P(1, 1, 1), P(1, 0, 1)]), // faces front-left
    right: poly([P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)]), // faces front-right
    depth: i + j + k * 0.01,
  };
}

export type WireCube = {
  id: string;
  /** Hidden back faces, hatched. */
  backLeft: string;
  backRight: string;
  /** Visible front faces, lightly hatched. */
  frontLeft: string;
  frontRight: string;
  edges: string[];
  depth: number;
};

function wire(id: string, i: number, j: number, k: number, origin: Pt = BACK, scale = 1): WireCube {
  const P = (a: number, b: number, c: number) => pt(i + a, j + b, k + c, origin, scale);
  const seg = (a: Pt, b: Pt) => `M${a[0].toFixed(1)},${a[1].toFixed(1)}L${b[0].toFixed(1)},${b[1].toFixed(1)}`;
  const c = [P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0), P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)];
  return {
    id,
    backLeft: poly([c[0], c[3], c[7], c[4]]),
    backRight: poly([c[0], c[1], c[5], c[4]]),
    frontLeft: poly([c[1], c[2], c[6], c[5]]),
    frontRight: poly([c[3], c[2], c[6], c[7]]),
    edges: [
      seg(c[4], c[5]), seg(c[5], c[6]), seg(c[6], c[7]), seg(c[7], c[4]),
      seg(c[1], c[5]), seg(c[2], c[6]), seg(c[3], c[7]), seg(c[0], c[4]),
      seg(c[1], c[2]), seg(c[2], c[3]),
    ],
    depth: i + j + k * 0.01,
  };
}

/* ---------- Main lattice: column heights per cell (i = back→front, j = left→right) ---------- */
const HEIGHTS: number[][] = [
  [1, 1, 1],
  [1, 2, 2],
  [1, 2, 3],
];

export const STACK: CubeFaces[] = [];
HEIGHTS.forEach((row, i) =>
  row.forEach((h, j) => {
    for (let k = 0; k < h; k++) STACK.push(solid(`cell-${i}-${j}-${k}`, i, j, k));
  }),
);
STACK.sort((a, b) => a.depth - b.depth || 0);

/** Unformed (wire, hatched) cells sitting on the single-height columns. */
export const UNFORMED: WireCube[] = [
  wire("unformed-0-0", 0, 0, 1),
  wire("unformed-0-1", 0, 1, 1),
  wire("unformed-0-2", 0, 2, 1),
  wire("unformed-1-0", 1, 0, 1),
  wire("unformed-2-0", 2, 0, 1),
];

/** Outer 3×3×3 envelope: back edges and the two side verticals. */
export const ENVELOPE = [
  [pt(3, 0, 3), pt(0, 0, 3), pt(0, 3, 3)],
  [pt(3, 0, 0), pt(3, 0, 3)],
  [pt(0, 3, 0), pt(0, 3, 3)],
].map((line) => "M" + line.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L"));

/* ---------- Free cubes around the lattice (unit = 1/3 cell) ---------- */
const UNIT = 1 / 3;
/** Free cube placed by its top vertex (the back corner of its top face). */
function freeSolid(id: string, top: Pt, units: number): CubeFaces {
  const s = UNIT * units;
  const origin: Pt = [top[0] - s * Z[0], top[1] - s * Z[1]];
  return solid(id, 0, 0, 0, origin, s);
}
function freeWire(id: string, top: Pt, units: number): WireCube {
  const s = UNIT * units;
  const origin: Pt = [top[0] - s * Z[0], top[1] - s * Z[1]];
  return wire(id, 0, 0, 0, origin, s);
}

export const FLOATING = {
  small: freeSolid("float-top", [2394, 370], 1),
  live: freeSolid("float-live", [2514, 623], 2),
  pairLeft: freeSolid("float-pair-left", [2434, 1083], 1),
  pairRight: freeSolid("float-pair-right", [2514, 1083], 1),
  wireLeft: freeWire("float-wire-left", [2434, 990], 1),
  wireRight: freeWire("float-wire-right", [2633, 968], 1),
};

/** Amber "LIVE" marker at the front vertex of the live cube's top face. */
export const LIVE = { dot: [2514, 714] as Pt, label: [2608, 627] as Pt, leaderEnd: [2600, 637] as Pt };

/* ---------- Connector nodes ---------- */
const lc = pt(3, 0, 0);
const rc = pt(0, 3, 0);
const fc = pt(3, 3, 0);
const tc = pt(0, 3, 3);
/** Connector labels are the meanings given to the same four pins in the PDF's Fig. 02 (p.2). */
export const CONNECTORS: { id: string; from: Pt; to: Pt; label: string; labelAt: Pt; anchor: "start" | "middle" | "end" }[] = [
  { id: "node-left", from: lc, to: [1486, lc[1]], label: "Chaos", labelAt: [-6, 70], anchor: "end" },
  { id: "node-right", from: rc, to: [2434, rc[1]], label: "Workload", labelAt: [16, -30], anchor: "start" },
  { id: "node-bottom", from: fc, to: [fc[0], 1248], label: "Technology", labelAt: [0, 72], anchor: "middle" },
  { id: "node-top", from: tc, to: [tc[0], 452], label: "Problems", labelAt: [-22, -36], anchor: "end" },
];

export const DOTS: Pt[] = [
  [1476, 484],
  [1636, 529],
  [1836, 506],
  [1915, 1060],
  [1556, 1129],
];

export const LABELS = {
  fig: { x: 2655, y: 110, text: "FIG. 01" },
  caption: { x: 2655, y: 140, text: "LATENT LATTICE · 30° / 90° / 150°" },
  scale: { x1: 2256, x2: 2655, y: 1445, ticks: 10, text: "1 CELL = 3 UNITS · 27 CELLS · 11 FORMED", textY: 1476 },
};

export const COLORS = {
  bg: "#f5f6fb",
  glow: "#e6eaf7",
  grid: "#cfd5e6",
  top: "#5689f6",
  topLight: "#6b98fa",
  left: "#1d59d1",
  leftDark: "#1a50c0",
  right: "#0e276a",
  rightLight: "#14317e",
  seam: "rgba(255,255,255,0.35)",
  wire: "#2a3a6a",
  hatch: "#45558a",
  node: "#366ae6",
  amber: "#f4b54d",
  label: "#3d4150",
  caption: "#8b8f9b",
  dot: "#4a5470",
};
