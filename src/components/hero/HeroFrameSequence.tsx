"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";

export interface HeroFrameSequenceProps {
  scrollYProgress: MotionValue<number>;
  totalFrames?: number;
  imageFolderPath?: string;
  prefix?: string;
  padding?: number;
  extension?: string;
  preloadMode?: "progressive" | "all";
  frameLerp?: number;
  debug?: boolean;
}

export default function HeroFrameSequence({
  scrollYProgress,
  totalFrames = 159,
  imageFolderPath = "/frames/hero",
  prefix = "ezgif-frame-",
  padding = 3,
  extension = ".jpg",
  preloadMode = "progressive",
  frameLerp = 0.12,
  debug = false,
}: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedFramesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);
  const [debugState, setDebugState] = useState({ frame: 1, progress: 0, loaded: 0 });

  // Format frame filename: ezgif-frame-001.jpg
  const getFrameUrl = (frameIndex: number) => {
    const paddedIndex = String(frameIndex).padStart(padding, "0");
    return `${imageFolderPath}/${prefix}${paddedIndex}${extension}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isUnmounted = false;

    // Reduced Motion check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // High-DPI Canvas Resizing
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render single frame to canvas with object-fit: cover
    const renderFrameToCanvas = (frameNum: number) => {
      if (!canvas || !ctx) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Find target frame or closest loaded frame
      let img = loadedFramesRef.current.get(frameNum);
      if (!img) {
        // Find nearest loaded fallback frame
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

      // Object-fit: cover math
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const scale = Math.max(width / imgWidth, height / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    // Single Frame Loader helper
    const loadFrame = (frameIndex: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (loadedFramesRef.current.has(frameIndex)) {
          resolve(loadedFramesRef.current.get(frameIndex)!);
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(frameIndex);
        img.onload = () => {
          if (!isUnmounted) {
            loadedFramesRef.current.set(frameIndex, img);
            if (debug) {
              setDebugState((prev) => ({
                ...prev,
                loaded: loadedFramesRef.current.size,
              }));
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          reject();
        };
      });
    };

    // 1. Synchronously load Frame 1 first for immediate background readiness
    loadFrame(1).then(() => {
      renderFrameToCanvas(1);
    });

    // 2. Preload Queue / Strategy (Deferred slightly so it never lags the landing video)
    const preloadQueue = () => {
      if (preloadMode === "all") {
        for (let i = 1; i <= totalFrames; i++) {
          loadFrame(i);
        }
      } else {
        const center = Math.round(targetFrameRef.current);
        const radius = 25;
        for (let offset = 0; offset <= radius; offset++) {
          const forward = center + offset;
          const backward = center - offset;
          if (forward <= totalFrames && !loadedFramesRef.current.has(forward)) {
            loadFrame(forward);
          }
          if (backward >= 1 && !loadedFramesRef.current.has(backward)) {
            loadFrame(backward);
          }
        }
      }
    };

    // Defer heavy multi-frame loading so video splash playback has 100% CPU & GPU priority
    const preloadTimer = setTimeout(() => {
      if (!isUnmounted) {
        preloadQueue();
      }
    }, 2000);

    // 3. Listen to scroll progress
    const unsubscribeScroll = scrollYProgress.on("change", (progress) => {
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const target = Math.round(clampedProgress * (totalFrames - 1)) + 1;
      targetFrameRef.current = target;

      if (prefersReducedMotion) {
        currentFrameRef.current = target;
        renderFrameToCanvas(target);
      }

      if (preloadMode === "progressive") {
        preloadQueue();
      }
    });

    // 4. Centralized Animation Loop
    const tick = () => {
      if (!prefersReducedMotion) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.01) {
          currentFrameRef.current += diff * frameLerp;
          const roundedFrame = Math.round(currentFrameRef.current);
          renderFrameToCanvas(roundedFrame);

          if (debug) {
            setDebugState({
              frame: roundedFrame,
              progress: Math.round(scrollYProgress.get() * 100),
              loaded: loadedFramesRef.current.size,
            });
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isUnmounted = true;
      clearTimeout(preloadTimer);
      window.removeEventListener("resize", resizeCanvas);
      unsubscribeScroll();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scrollYProgress, totalFrames, imageFolderPath, prefix, padding, extension, preloadMode, frameLerp, debug]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Development Debug Overlay */}
      {debug && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-emerald-400 font-mono text-xs p-3 rounded border border-emerald-500/40 space-y-1">
          <div>Frame: {debugState.frame} / {totalFrames}</div>
          <div>Progress: {debugState.progress}%</div>
          <div>Loaded: {debugState.loaded} / {totalFrames}</div>
        </div>
      )}
    </>
  );
}
