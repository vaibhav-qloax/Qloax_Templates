/**
 * Renders "Fig. 01 · Latent lattice" as an SVG string from latticeGeometry.
 * Each cube is a separate <g class="lt-cube"> with three faces, so it can be animated alone.
 */
import {
  COLORS as C,
  CONNECTORS,
  DOTS,
  ENVELOPE,
  FLOATING,
  LABELS,
  LIVE,
  STACK,
  UNFORMED,
  VIEW,
  type CubeFaces,
  type WireCube,
} from "./latticeGeometry";

const UNIT = 137.8 / 3;
const DX = UNIT * Math.cos(Math.PI / 6);

/** Deterministic pseudo-random generator so the background grid is identical on every render. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

/** Sparse isometric background grid aligned to the lattice (same unit and angles as the cubes). */
function backgroundGrid(): string {
  const r = rng(26);
  const ox = 1955;
  const oy = 760;
  const segs: string[] = [];
  for (let col = -40; col <= 22; col++) {
    const x = ox + col * DX;
    if (x < -10 || x > VIEW.w + 10) continue;
    for (let row = -20; row <= 36; row++) {
      const y = oy + row * UNIT + (col % 2 ? UNIT / 2 : 0);
      if (y < -40 || y > VIEW.h + 40) continue;
      // three edge families leaving this lattice point: vertical, down-right, down-left
      if (r() < 0.78) segs.push(`M${x.toFixed(1)},${y.toFixed(1)}v${(UNIT * (r() < 0.3 ? 2 : 1)).toFixed(1)}`);
      if (r() < 0.72) {
        const n = r() < 0.3 ? 2 : 1;
        segs.push(`M${x.toFixed(1)},${y.toFixed(1)}l${(DX * n).toFixed(1)},${((UNIT / 2) * n).toFixed(1)}`);
      }
      if (r() < 0.72) {
        const n = r() < 0.3 ? 2 : 1;
        segs.push(`M${x.toFixed(1)},${y.toFixed(1)}l${(-DX * n).toFixed(1)},${((UNIT / 2) * n).toFixed(1)}`);
      }
    }
  }
  return `<path class="lt-grid" d="${segs.join("")}" fill="none" stroke="${C.grid}" stroke-width="1.1" opacity="0.6" mask="url(#lt-grid-mask)"/>`;
}

/** Average of the points in "x,y x,y ..." strings: the cube's centre for mouse distance. */
function centre(...polys: string[]): [number, number] {
  const pts = polys.join(" ").trim().split(/\s+/).map((p) => p.split(",").map(Number));
  return [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
}

/**
 * Three nested layers per cube so effects never fight over one transform:
 * outer .lt-cube = mouse lift (set from JS), .lt-build = landing animation, .lt-bob = idle float.
 */
function waveDelay(id: string): number {
  const m = id.match(/^(?:cell|unformed)-(\d)-(\d)(?:-(\d))?$/);
  return m ? (+m[1] + +m[2]) * 0.09 + (m[3] ? +m[3] * 0.05 : 0.05) : 0;
}

function solid(c: CubeFaces, delay: number, extraClass = "", inner = ""): string {
  const [cx, cy] = centre(c.top, c.left, c.right);
  return (
    `<g class="lt-cube ${extraClass}" id="${c.id}" data-cx="${cx.toFixed(0)}" data-cy="${cy.toFixed(0)}">` +
    `<g class="lt-build" style="--d:${delay.toFixed(2)}s"><g class="lt-bob" style="--w:${waveDelay(c.id).toFixed(2)}s">` +
    `<polygon class="lt-left" points="${c.left}" fill="url(#lt-left)"/>` +
    `<polygon class="lt-right" points="${c.right}" fill="url(#lt-right)"/>` +
    `<polygon class="lt-top" points="${c.top}" fill="url(#lt-top)"/>` +
    `<path d="M${c.top.split(" ")[2]}L${c.left.split(" ")[1]}" stroke="${C.seam}" stroke-width="1"/>` +
    `<polygon points="${c.top}" fill="none" stroke="${C.right}" stroke-opacity="0.35" stroke-width="1"/>` +
    inner +
    `</g></g></g>`
  );
}

function wire(w: WireCube, delay: number, extraClass = ""): string {
  const leftColumn = /-\d-0$/.test(w.id);
  const [cx, cy] = centre(w.frontLeft, w.backRight);
  return (
    `<g class="lt-cube lt-wire ${extraClass}" id="${w.id}" data-cx="${cx.toFixed(0)}" data-cy="${cy.toFixed(0)}">` +
    `<g class="lt-build" style="--d:${delay.toFixed(2)}s"><g class="lt-bob" style="--w:${waveDelay(w.id).toFixed(2)}s">` +
    `<g class="lt-hatch">` +
    `<polygon points="${w.backLeft}" fill="url(#lt-hatch-d)" opacity="0.75"/>` +
    `<polygon points="${w.backRight}" fill="url(#lt-hatch-d)" opacity="0.75"/>` +
    `<polygon points="${w.frontLeft}" fill="url(#lt-hatch-${leftColumn ? "v" : "d"})" opacity="${leftColumn ? 0.85 : 0.45}"/>` +
    `</g>` +
    w.edges.map((e) => `<path class="lt-edge" pathLength="1" d="${e}" fill="none" stroke="${C.wire}" stroke-width="1.5" stroke-linecap="round"/>`).join("") +
    `</g></g></g>`
  );
}

/** Landing order: layer by layer from the ground up, back to front within a layer. */
function buildDelay(id: string): number {
  const m = id.match(/^(cell|unformed)-(\d)-(\d)(?:-(\d))?$/);
  if (!m) return 0;
  const i = +m[2];
  const j = +m[3];
  const k = m[1] === "cell" ? +m[4] : 1;
  const wireShift = m[1] === "unformed" ? 0.12 : 0;
  return 0.25 + k * 0.5 + (i + j) * 0.07 + wireShift;
}

export function renderLatticeSvg(): string {
  const defs = `
<defs>
  <radialGradient id="lt-bg" cx="0.7" cy="0.48" r="0.55">
    <stop offset="0" stop-color="${C.glow}"/>
    <stop offset="1" stop-color="${C.bg}"/>
  </radialGradient>
  <radialGradient id="lt-grid-fade" cx="0.72" cy="0.5" r="0.62">
    <stop offset="0" stop-color="#fff" stop-opacity="1"/>
    <stop offset="0.75" stop-color="#fff" stop-opacity="0.7"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0.15"/>
  </radialGradient>
  <mask id="lt-grid-mask"><rect width="${VIEW.w}" height="${VIEW.h}" fill="url(#lt-grid-fade)"/></mask>
  <linearGradient id="lt-top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.topLight}"/><stop offset="1" stop-color="${C.top}"/></linearGradient>
  <linearGradient id="lt-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.left}"/><stop offset="1" stop-color="${C.leftDark}"/></linearGradient>
  <linearGradient id="lt-right" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.rightLight}"/><stop offset="1" stop-color="${C.right}"/></linearGradient>
  <pattern id="lt-hatch-v" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0,0V7" stroke="${C.hatch}" stroke-width="1.1"/></pattern>
  <pattern id="lt-hatch-d" width="7.5" height="7.5" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)"><path d="M0,0V7.5" stroke="${C.hatch}" stroke-width="1.1"/></pattern>
  <radialGradient id="lt-amber"><stop offset="0" stop-color="${C.amber}" stop-opacity="0.9"/><stop offset="0.35" stop-color="${C.amber}" stop-opacity="0.45"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>
</defs>`;

  const bg = `<rect width="${VIEW.w}" height="${VIEW.h}" fill="url(#lt-bg)"/>` + backgroundGrid();

  const envelope = `<path class="lt-envelope" pathLength="1" d="${ENVELOPE.join("")}" fill="none" stroke="#56648c" stroke-width="1.3" opacity="0.9"/>`;

  const connectors = CONNECTORS.map((c) => {
    const lx = c.to[0] + c.labelAt[0];
    const ly = c.to[1] + c.labelAt[1];
    return (
      `<g class="lt-node" id="${c.id}" data-label="${c.label}">` +
      `<path class="lt-link" pathLength="1" d="M${c.from[0].toFixed(1)},${c.from[1].toFixed(1)}L${c.to[0]},${c.to[1]}" stroke="${C.node}" stroke-width="3"/>` +
      `<g class="lt-pin">` +
      `<circle class="lt-ring" cx="${c.to[0]}" cy="${c.to[1]}" r="16" fill="none" stroke="#56648c" stroke-width="1.2" opacity="0.9"/>` +
      `<circle class="lt-dot" cx="${c.to[0]}" cy="${c.to[1]}" r="8.5" fill="${C.node}"/>` +
      `</g>` +
      `<text class="lt-label" x="${lx}" y="${ly}" text-anchor="${c.anchor}" font-family="Caveat, 'Segoe Print', cursive" font-size="58" fill="${C.node}">${c.label}</text>` +
      `<circle class="lt-hit" cx="${c.to[0]}" cy="${c.to[1]}" r="46" fill="transparent"/>` +
      `</g>`
    );
  }).join("");

  const dots = DOTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="${C.dot}"/>`).join("");

  // Painter's order: back to front, bottom to top. Wire cells are drawn in the same pass.
  const items = [
    ...STACK.map((c) => ({ depth: c.depth, kind: "solid" as const, c })),
    ...UNFORMED.map((w) => ({ depth: w.depth, kind: "wire" as const, w })),
  ].sort((a, b) => a.depth - b.depth);
  const stack = items
    .map((it) => (it.kind === "solid" ? solid(it.c, buildDelay(it.c.id)) : wire(it.w, buildDelay(it.w.id))))
    .join("");

  const liveMarker =
    `<g class="lt-live">` +
    `<circle cx="${LIVE.dot[0]}" cy="${LIVE.dot[1]}" r="34" fill="url(#lt-amber)" class="lt-pulse"/>` +
    `<circle cx="${LIVE.dot[0]}" cy="${LIVE.dot[1]}" r="7" fill="${C.amber}"/>` +
    `<path d="M${LIVE.dot[0]},${LIVE.dot[1]}L${LIVE.leaderEnd[0]},${LIVE.leaderEnd[1]}" stroke="#9a8a6a" stroke-width="1.4"/>` +
    `<text x="${LIVE.label[0]}" y="${LIVE.label[1]}" font-family="JetBrains Mono, ui-monospace, monospace" font-size="17" letter-spacing="2" fill="#8c6c34">LIVE</text>` +
    `</g>`;

  const floating =
    solid(FLOATING.small, 2.0, "lt-float") +
    wire(FLOATING.wireLeft, 2.1, "lt-float") +
    wire(FLOATING.wireRight, 2.15, "lt-float") +
    solid(FLOATING.pairLeft, 2.2, "lt-float") +
    solid(FLOATING.pairRight, 2.27, "lt-float") +
    solid(FLOATING.live, 2.35, "lt-float lt-live-cube", liveMarker);

  const s = LABELS.scale;
  const tickStep = (s.x2 - s.x1) / s.ticks;
  const ticks = Array.from({ length: s.ticks + 1 }, (_, i) => {
    const x = s.x1 + i * tickStep;
    const h = i === 0 || i === s.ticks || i === s.ticks / 2 ? 9 : 4.5;
    return `M${x.toFixed(1)},${s.y}v${-h}`;
  }).join("");
  const labels =
    `<g class="lt-labels" font-family="JetBrains Mono, ui-monospace, monospace" text-anchor="end">` +
    `<text x="${LABELS.fig.x}" y="${LABELS.fig.y}" font-size="19.5" letter-spacing="1.5" fill="${C.label}">${LABELS.fig.text}</text>` +
    `<text x="${LABELS.caption.x}" y="${LABELS.caption.y}" font-size="14.5" letter-spacing="2.4" fill="${C.caption}">${LABELS.caption.text}</text>` +
    `<path d="M${s.x1},${s.y}H${s.x2}${ticks}" stroke="${C.caption}" stroke-width="1.5" fill="none"/>` +
    `<text x="${s.x2}" y="${s.textY}" font-size="14.5" letter-spacing="2.4" fill="${C.caption}">${s.text}</text>` +
    `</g>`;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW.w} ${VIEW.h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Fig. 01, latent lattice: an isometric lattice of cubes, eleven formed">` +
    defs +
    bg +
    dots +
    envelope +
    connectors +
    stack +
    floating +
    labels +
    `</svg>`
  );
}
