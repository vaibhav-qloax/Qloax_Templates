/**
 * Minimal isometric drawing kit shared by the QLOAX figures (Fig. 01, 02, 04).
 * True isometric: x runs to the front-left, y to the front-right, z up.
 */
export type Pt = [number, number];

const COS = Math.cos(Math.PI / 6);

export function makeIso(origin: Pt, edge: number) {
  const X: Pt = [-edge * COS, edge / 2];
  const Y: Pt = [edge * COS, edge / 2];
  const Z: Pt = [0, -edge];
  const p = (i: number, j: number, k: number): Pt => [
    origin[0] + i * X[0] + j * Y[0] + k * Z[0],
    origin[1] + i * X[1] + j * Y[1] + k * Z[1],
  ];
  const pts = (list: Pt[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const line = (a: Pt, b: Pt) => `M${a[0].toFixed(1)},${a[1].toFixed(1)}L${b[0].toFixed(1)},${b[1].toFixed(1)}`;

  /** Faces and edges of the unit cube whose back-bottom corner is lattice point (i, j, k). */
  const cube = (i: number, j: number, k: number, s = 1) => {
    const P = (a: number, b: number, c: number) => p(i + a * s, j + b * s, k + c * s);
    const c = [P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0), P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)];
    return {
      corners: c,
      top: pts([c[4], c[5], c[6], c[7]]),
      left: pts([c[1], c[2], c[6], c[5]]),
      right: pts([c[3], c[2], c[6], c[7]]),
      /** Visible silhouette edges plus the three edges meeting at the front-top corner. */
      edges: [
        line(c[4], c[5]), line(c[5], c[6]), line(c[6], c[7]), line(c[7], c[4]),
        line(c[5], c[1]), line(c[6], c[2]), line(c[7], c[3]),
        line(c[1], c[2]), line(c[2], c[3]),
      ],
      /** Hidden edges, drawn faintly on wire cells. */
      hidden: [line(c[0], c[1]), line(c[0], c[3]), line(c[0], c[4])],
    };
  };

  return { p, cube, pts, line, X, Y, Z };
}

/** Sparse isometric background grid as one path (deterministic). */
export function isoGrid(w: number, h: number, unit: number, origin: Pt, density = 0.7, seed = 7) {
  let s = seed >>> 0;
  const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const dx = unit * COS;
  const out: string[] = [];
  const cols = Math.ceil(w / dx) + 4;
  const rows = Math.ceil(h / unit) + 4;
  const c0 = Math.floor(-origin[0] / dx) - 2;
  const r0 = Math.floor(-origin[1] / unit) - 2;
  for (let c = c0; c < c0 + cols; c++) {
    const x = origin[0] + c * dx;
    for (let rr = r0; rr < r0 + rows; rr++) {
      const y = origin[1] + rr * unit + (Math.abs(c) % 2 ? unit / 2 : 0);
      if (r() < density) out.push(`M${x.toFixed(1)},${y.toFixed(1)}v${unit.toFixed(1)}`);
      if (r() < density) out.push(`M${x.toFixed(1)},${y.toFixed(1)}l${dx.toFixed(1)},${(unit / 2).toFixed(1)}`);
      if (r() < density) out.push(`M${x.toFixed(1)},${y.toFixed(1)}l${(-dx).toFixed(1)},${(unit / 2).toFixed(1)}`);
    }
  }
  return out.join("");
}

/** Palette shared with Fig. 01. */
export const ISO = {
  top: "#5b8df8",
  topLight: "#6f9cfb",
  left: "#1f5ad3",
  right: "#0f2a6e",
  wire: "#2a3a6a",
  node: "#4b7be5",
  amber: "#e4a800",
  grid: "#d3d8e6",
  hatch: "#45558a",
};
