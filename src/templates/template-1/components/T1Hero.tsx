"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import HeroFrameSequence from "@/components/hero/HeroFrameSequence";

export default function T1Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Bohdan style scroll choreography transforms
  const textY = useTransform(scrollYProgress, [0, 0.85], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 0.96]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#030303] text-white min-h-[450vh]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-32 pb-12 overflow-hidden">
        
        {/* 1. Cinematic Scroll-Controlled Canvas Background */}
        <HeroFrameSequence
          scrollYProgress={scrollYProgress}
          totalFrames={159}
          imageFolderPath="/frames/hero"
          prefix="ezgif-frame-"
          padding={3}
          extension=".jpg"
          preloadMode="progressive"
          frameLerp={0.12}
        />

        {/* 2. Existing Overlays (Radial Gradient & Glow without Grid Squares) */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(196,0,36,0.18),rgba(3,3,3,0.65))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/70" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C40024]/10 rounded-full blur-[140px]" />
        </div>

        {/* 3. Existing Hero Main Content */}
        <motion.div
          style={{ y: textY, opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto space-y-8"
        >
          {/* Tech Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full font-mono text-xs text-neutral-300"
          >
            <Sparkles size={12} className="text-[#C40024]" />
            <span>NEXT-GENERATION ENTERPRISE SYSTEMS</span>
          </motion.div>

          {/* Oversized Bohdan Typography */}
          <div className="space-y-2">
            <motion.div
              initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 40 }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block font-mono text-xs md:text-sm text-[#C40024] tracking-widest uppercase mb-1">
                [ COMPANY / QLOAX ]
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none uppercase"
            >
              ENGINEERING
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                INTELLIGENCE.
              </span>
            </motion.h1>
          </div>

          {/* Supporting Tagline & Actions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="md:col-span-6 font-sans text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow"
            >
              Empowering Industry through AI, automation, data engineering, and high-availability enterprise systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="md:col-span-6 flex flex-wrap items-center md:justify-end gap-4"
            >
              <MagneticButton
                dataCursor="explore"
                onClick={() => {
                  document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-[#C40024] hover:bg-[#E0002A] text-white text-sm font-semibold rounded-full tracking-wider uppercase transition-all shadow-lg shadow-[#C40024]/20"
              >
                EXPLORE QLOAX
              </MagneticButton>

              <MagneticButton
                dataCursor="view"
                onClick={() => {
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/15 text-white text-sm font-semibold rounded-full tracking-wider uppercase transition-all"
              >
                VIEW OUR WORK
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* 4. Existing Footer Indicators */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between font-mono text-xs text-neutral-400 border-t border-white/10 pt-6">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">LATITUDE:</span>
            <span>28.6139° N, 77.2090° E</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={14} className="animate-bounce text-[#C40024]" />
          </div>
        </div>

      </div>
    </section>
  );
}
