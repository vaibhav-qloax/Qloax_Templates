"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** Access the active Lenis instance (null on touch, reduced motion or before mount). */
export const getLenis = () => instance;

/**
 * Smooth wheel scrolling on desktop only. Touch devices and reduced-motion users
 * keep native scrolling. No scroll hijacking: Lenis only smooths the wheel.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -80 },
    });
    instance = lenis;

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, []);

  // New page: start at the top unless a hash is targeted.
  useEffect(() => {
    if (!window.location.hash) instance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
