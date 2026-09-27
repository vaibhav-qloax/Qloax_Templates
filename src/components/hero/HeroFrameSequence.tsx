"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue } from "framer-motion";

export interface HeroFrameSequenceProps {
  scrollYProgress: MotionValue<number>;
  totalFrames?: number;
  imageFolderPath?: string;
  prefix?: string;
  padding?: number;
  extension?: string;
  preloadMode?: "progressive" | "all";
  debug?: boolean;
}

export default function HeroFrameSequence({
  scrollYProgress,
  totalFrames = 159,
  imageFolderPath = "/frames/hero",
  prefix = "ezgif-frame-",
  padding = 3,
  extension = ".jpg",
  preloadMode = "all",
  debug = false,
}: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedFramesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const inFlightRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(false);

  const [debugState, setDebugState] = useState({ frame: 1, progress: 0, loaded: 0 });

  // Format frame URL
  const getFrameUrl = useCallback(
    (frameIndex: number) => {
      const paddedIndex = String(frameIndex).padStart(padding, "0");
      return `${imageFolderPath}/${prefix}${paddedIndex}${extension}`;
    },
    [imageFolderPath, prefix, padding, extension]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let isUnmounted = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Render single frame with dynamic responsive alignment (Right -> Middle -> Left on mobile scroll)
    const renderFrameToCanvas = (frameNum: number) => {
      if (!canvas || !ctx) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Find exact frame or nearest loaded fallback
      let img = loadedFramesRef.current.get(frameNum);
      if (!img) {
        let minDiff = Infinity;
        for (const [idx, cachedImg] of loadedFramesRef.current.entries()) {
          const diff = Math.abs(idx - frameNum);
          if (diff < minDiff) {
            minDiff = diff;
            img = cachedImg;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const scale = Math.max(width / imgWidth, height / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      // Dynamic horizontal focal alignment
      let alignX = 0.5; // Desktop default (Center)
      
      const isMobile = width < 768;
      if (isMobile) {
        // Calculate normalized frame progress [0, 1]
        const progress = Math.max(0, Math.min(1, (currentFrameRef.current - 1) / Math.max(1, totalFrames - 1)));
        
        // On Open (progress 0.0 -> 0.45): Show RIGHT side (alignX = 1.0)
        // On Scroll Middle (progress 0.45 -> 0.70): Pans smoothly to MIDDLE (alignX = 0.5)
        // On Scroll End (progress 0.70 -> 1.0): Pans smoothly to LEFT (alignX = 0.0)
        if (progress <= 0.5) {
          const t = progress / 0.5;
          // Smooth sine/cubic ease
          const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          alignX = 1.0 - ease * 0.5; // 1.0 -> 0.5
        } else {
          const t = (progress - 0.5) / 0.5;
          const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          alignX = 0.5 - ease * 0.5; // 0.5 -> 0.0
        }
      }

      const x = (width - drawWidth) * alignX;
      const y = (height - drawHeight) * 0.5;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    // High-DPI Canvas Resizing with Hardware Transform
    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";

      renderFrameToCanvas(Math.round(currentFrameRef.current));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Non-blocking async frame loader with background decode
    const loadFrame = (frameIndex: number): Promise<HTMLImageElement | null> => {
      if (loadedFramesRef.current.has(frameIndex)) {
        return Promise.resolve(loadedFramesRef.current.get(frameIndex)!);
      }
      if (inFlightRef.current.has(frameIndex)) {
        return Promise.resolve(null);
      }

      inFlightRef.current.add(frameIndex);

      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(frameIndex);

        const onFinish = async () => {
          if (isUnmounted) return;
          inFlightRef.current.delete(frameIndex);
          try {
            if ("decode" in img) {
              await img.decode();
            }
          } catch {
            // Ignore decode failures on older browsers
          }
          if (!isUnmounted) {
            loadedFramesRef.current.set(frameIndex, img);
            if (Math.round(currentFrameRef.current) === frameIndex) {
              renderFrameToCanvas(frameIndex);
            }
          }
          resolve(img);
        };

        img.onload = onFinish;
        img.onerror = () => {
          inFlightRef.current.delete(frameIndex);
          resolve(null);
        };
      });
    };

    // Preload Batch Controller (Chunked concurrent downloads to prevent network choke)
    const preloadAllBatches = async () => {
      // 1. Immediately load frame 1
      await loadFrame(1);
      renderFrameToCanvas(1);

      // 2. Load keyframes first (every 5th frame for fast responsiveness)
      const keyframes: number[] = [];
      for (let i = 1; i <= totalFrames; i += 5) {
        keyframes.push(i);
      }

      // Concurrently load keyframes in batches of 6
      const BATCH_SIZE = 6;
      for (let i = 0; i < keyframes.length; i += BATCH_SIZE) {
        if (isUnmounted) return;
        const batch = keyframes.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map((f) => loadFrame(f)));
      }

      // 3. Fill in all remaining intermediate frames sequentially in background
      for (let i = 1; i <= totalFrames; i += BATCH_SIZE) {
        if (isUnmounted) return;
        const batch = Array.from(
          { length: Math.min(BATCH_SIZE, totalFrames - i + 1) },
          (_, k) => i + k
        );
        await Promise.all(batch.map((f) => loadFrame(f)));
      }
    };

    preloadAllBatches();

    // Delta-time based 165Hz smooth animation loop
    const tick = (now: number) => {
      if (isUnmounted) return;

      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      if (!prefersReducedMotion) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        
        if (Math.abs(diff) > 0.005) {
          // Exponential decay lerp for true 165Hz fluid tracking
          const lerpFactor = 1 - Math.exp(-22 * dt);
          currentFrameRef.current += diff * lerpFactor;
          const roundedFrame = Math.max(1, Math.min(totalFrames, Math.round(currentFrameRef.current)));
          renderFrameToCanvas(roundedFrame);

          if (debug) {
            setDebugState({
              frame: roundedFrame,
              progress: Math.round(scrollYProgress.get() * 100),
              loaded: loadedFramesRef.current.size,
            });
          }

          rafIdRef.current = requestAnimationFrame(tick);
          return;
        } else {
          currentFrameRef.current = targetFrameRef.current;
          renderFrameToCanvas(Math.round(currentFrameRef.current));
        }
      }

      isRunningRef.current = false;
    };

    const startAnimationLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        lastTimeRef.current = performance.now();
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    // Listen to scroll progress smoothly
    const unsubscribeScroll = scrollYProgress.on("change", (progress) => {
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const target = clampedProgress * (totalFrames - 1) + 1;
      targetFrameRef.current = target;

      if (prefersReducedMotion) {
        currentFrameRef.current = target;
        renderFrameToCanvas(Math.round(target));
      } else {
        startAnimationLoop();
      }
    });

    return () => {
      isUnmounted = true;
      window.removeEventListener("resize", resizeCanvas);
      unsubscribeScroll();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scrollYProgress, totalFrames, getFrameUrl, debug]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transform-gpu will-change-transform"
      />

      {debug && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/90 text-emerald-400 font-mono text-xs p-3 rounded border border-emerald-500/40 space-y-1">
          <div>Frame: {debugState.frame} / {totalFrames}</div>
          <div>Progress: {debugState.progress}%</div>
          <div>Loaded: {debugState.loaded} / {totalFrames}</div>
        </div>
      )}
    </>
  );
}
