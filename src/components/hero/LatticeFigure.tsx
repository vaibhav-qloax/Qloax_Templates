"use client";

import { useEffect, useRef } from "react";
import { renderLatticeSvg } from "./latticeSvg";

// Pure geometry markup; rendered once per module.
const SVG = renderLatticeSvg().replace('preserveAspectRatio="xMidYMid slice"', 'preserveAspectRatio="xMaxYMid slice"');

/** How far (viewBox units) the cursor's influence reaches, and how high a cube can lift. */
const RADIUS = 380;
const MAX_LIFT = 60;
/** When the landing build has finished and the dot labels get introduced. */
const LABELS_IN_MS = 2600;
const LABELS_OUT_MS = 5600;

/**
 * "Fig. 01 · Latent lattice", drawn in code and interactive.
 * 1. Landing: the lattice builds layer by layer, lines draw, pins pop, floating cubes arrive.
 * 2. The four pins briefly show their meanings (Problems, Workload, Technology, Chaos), then hide.
 * 3. Afterwards: cubes near the cursor lift one by one; hovering or tapping a pin reveals its label.
 */
export default function LatticeFigure({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const svg = root?.querySelector("svg");
    if (!root || !svg) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const timers: number[] = [];

    // Landing: start the build, then introduce and retire the pin labels.
    root.classList.add("is-building");
    timers.push(window.setTimeout(() => root.classList.add("show-labels"), reduce ? 0 : LABELS_IN_MS));
    timers.push(window.setTimeout(() => root.classList.remove("show-labels"), reduce ? 2500 : LABELS_OUT_MS));
    timers.push(window.setTimeout(() => root.classList.add("is-built"), reduce ? 0 : 2400));
    // One ripple through the finished stack, then hand over to the mouse.
    if (!reduce) {
      timers.push(window.setTimeout(() => root.classList.add("is-wave"), 2700));
      timers.push(window.setTimeout(() => root.classList.remove("is-wave"), 4600));
    }

    // Pins: hover (mouse) or tap (touch) toggles the label.
    const nodes = Array.from(svg.querySelectorAll<SVGGElement>(".lt-node"));
    const offs: (() => void)[] = [];
    nodes.forEach((node) => {
      const on = () => {
        root.classList.remove("show-labels");
        node.classList.add("is-active");
      };
      const off = () => node.classList.remove("is-active");
      const toggle = (e: Event) => {
        if (fine) return;
        e.preventDefault();
        const was = node.classList.contains("is-active");
        nodes.forEach((n) => n.classList.remove("is-active"));
        if (!was) on();
      };
      node.addEventListener("pointerenter", on);
      node.addEventListener("pointerleave", off);
      node.addEventListener("pointerdown", toggle);
      offs.push(() => {
        node.removeEventListener("pointerenter", on);
        node.removeEventListener("pointerleave", off);
        node.removeEventListener("pointerdown", toggle);
      });
    });

    // Cubes: each one lifts by its own distance from the cursor.
    const cubes = Array.from(svg.querySelectorAll<SVGGElement>(".lt-cube")).map((el) => ({
      el,
      x: Number(el.dataset.cx),
      y: Number(el.dataset.cy),
    }));
    let raf = 0;
    let pointer: { x: number; y: number } | null = null;

    // Dragging: the grabbed cube follows the pointer; on release it springs back home.
    let drag: {
      el: SVGGElement;
      id: number;
      start: { x: number; y: number };
      parent: Node;
      next: Node | null;
    } | null = null;
    const toView = (e: PointerEvent) => {
      const ctm = svg.getScreenCTM();
      return ctm ? new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()) : null;
    };

    const apply = () => {
      raf = 0;
      let hot: SVGGElement | null = null;
      let best = Infinity;
      for (const c of cubes) {
        if (drag && c.el === drag.el) continue;
        let lift = 0;
        if (pointer) {
          const d = Math.hypot(c.x - pointer.x, c.y - pointer.y);
          const t = Math.max(0, 1 - d / RADIUS);
          lift = MAX_LIFT * Math.pow(t, 1.4);
          if (d < 90 && d < best) {
            best = d;
            hot = c.el;
          }
        }
        c.el.style.transform = lift ? `translateY(${-lift.toFixed(1)}px)` : "";
        c.el.classList.toggle("is-hot", c.el === hot);
      }
    };

    const onMove = (e: PointerEvent) => {
      // Any mouse or pen; touch has no hover, so it is skipped.
      if (e.pointerType === "touch" || !root.classList.contains("is-built")) return;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      pointer = { x: p.x, y: p.y };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      pointer = null;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0 || !root.classList.contains("is-built")) return;
      const el = (e.target as Element).closest<SVGGElement>(".lt-cube");
      const start = toView(e);
      if (!el || !start) return;
      e.preventDefault();
      // Bring the cube to the front while it is held; remember where it lived in the stack.
      drag = { el, id: e.pointerId, start: { x: start.x, y: start.y }, parent: el.parentNode!, next: el.nextSibling };
      svg.appendChild(el);
      el.classList.add("is-dragging");
      root.classList.add("is-grabbing");
      svg.setPointerCapture(e.pointerId);
    };
    const onDrag = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const p = toView(e);
      if (!p) return;
      drag.el.style.transform = `translate(${(p.x - drag.start.x).toFixed(1)}px, ${(p.y - drag.start.y).toFixed(1)}px)`;
    };
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const { el, parent, next } = drag;
      drag = null;
      root.classList.remove("is-grabbing");
      el.classList.remove("is-dragging");
      el.classList.add("is-returning");
      el.style.transform = "";
      if (svg.hasPointerCapture(e.pointerId)) svg.releasePointerCapture(e.pointerId);
      // Once home, put it back in its original paint order.
      window.setTimeout(() => {
        el.classList.remove("is-returning");
        if (next && next.parentNode === parent) parent.insertBefore(el, next);
        else parent.appendChild(el);
        if (!raf) raf = requestAnimationFrame(apply);
      }, 750);
    };

    // Hover lift and dragging stay on for every mouse or pen user.
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    svg.addEventListener("pointerdown", onDown);
    svg.addEventListener("pointermove", onDrag);
    svg.addEventListener("pointerup", onUp);
    svg.addEventListener("pointercancel", onUp);

    return () => {
      timers.forEach(clearTimeout);
      offs.forEach((f) => f());
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      svg.removeEventListener("pointerdown", onDown);
      svg.removeEventListener("pointermove", onDrag);
      svg.removeEventListener("pointerup", onUp);
      svg.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return <div ref={ref} className={`lattice-figure ${className}`} dangerouslySetInnerHTML={{ __html: SVG }} />;
}
