"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import HeroFrameSequence from "@/components/hero/HeroFrameSequence";

export default function T1Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Initial Hero Content (Active from 0.0 -> 0.55, fades/exits up at 0.55 -> 0.67)
  const hero1Y = useTransform(scrollYProgress, [0, 0.52, 0.66], ["0%", "0%", "-25%"]);
  const hero1Opacity = useTransform(scrollYProgress, [0, 0.52, 0.64], [1, 1, 0]);
  const hero1Scale = useTransform(scrollYProgress, [0, 0.52, 0.66], [1, 1, 0.92]);

  // Phase 2: Frame 115 (~0.72 progress) Big QLOAX Title (Enters at 0.63 -> 0.71, stays persistent through scroll with NO out animation)
  const qloaxOpacity = useTransform(
    scrollYProgress,
    [0.63, 0.71, 1],
    [0, 1, 1]
  );
  const qloaxScale = useTransform(
    scrollYProgress,
    [0.63, 0.71, 1],
    [0.88, 1, 1]
  );
  const qloaxY = useTransform(
    scrollYProgress,
    [0.63, 0.71, 1],
    [50, 0, 0]
  );

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
        />

        {/* 2. Overlays (Crisp right-side visibility with subtle minimal red atmospheric glow) */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {/* Subtle soft ambient red tint on background frames */}
          <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#C40024]/[0.06] rounded-full blur-[160px]" />
          {/* Horizontal contrast gradient: dark on left for text, clear on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/90 via-[#030303]/35 to-transparent w-full md:w-[65%]" />
          {/* Minimal top and bottom edge blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/50 via-transparent to-[#030303]/60" />
        </div>

        {/* 3. Phase 1: Initial Hero Main Content (Anchored flush to left side) */}
        <motion.div
          style={{ y: hero1Y, opacity: hero1Opacity, scale: hero1Scale }}
          className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 my-auto space-y-6 pointer-events-auto transform-gpu will-change-transform text-left"
        >
          <div className="max-w-3xl lg:max-w-4xl mr-auto ml-0 space-y-6">
            {/* Oversized Typography */}
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
                className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-none uppercase text-left"
              >
                ENGINEERING
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
                  INTELLIGENCE.
                </span>
              </motion.h1>
            </div>

            {/* Supporting Tagline & Actions (Left-aligned under text) */}
            <div className="space-y-6 max-w-xl pt-2 text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="font-sans text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow"
              >
                Empowering Industry through AI, automation, data engineering, and high-availability enterprise systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="flex flex-wrap items-center justify-start gap-4"
              >
                <MagneticButton
                  dataCursor="explore"
                  onClick={() => {
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-4 bg-[#C40024] hover:bg-[#E0002A] text-white text-sm font-semibold rounded-full tracking-wider uppercase transition-all shadow-lg shadow-[#C40024]/20"
                >
                  EXPLORE QLOAX
                </MagneticButton>

                <MagneticButton
                  dataCursor="view"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-4 bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/15 text-white text-sm font-semibold rounded-full tracking-wider uppercase transition-all"
                >
                  CONTACT US
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 4. Phase 2: ONLY Big Size QLOAX Text with Stroked Outline UI */}
        <motion.div
          style={{
            opacity: qloaxOpacity,
            scale: qloaxScale,
            y: qloaxY,
          }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6 text-center select-none transform-gpu will-change-transform"
        >
          {/* Big Stroked Outline QLOAX. (White stroked QL & AX, Red stroked O) */}
          <h2 className="font-display font-black text-7xl sm:text-9xl md:text-[16vw] lg:text-[21vw] tracking-tighter leading-none uppercase select-none">
            <span
              className="text-transparent transition-all"
              style={{
                WebkitTextStroke: "4.5px rgba(255, 255, 255, 0.98)",
              }}
            >
              QL
            </span>
            <span
              className="text-transparent inline-block transition-all filter drop-shadow-[0_0_35px_rgba(196,0,36,0.75)]"
              style={{
                WebkitTextStroke: "5.5px #C40024",
              }}
            >
              O
            </span>
            <span
              className="text-transparent transition-all"
              style={{
                WebkitTextStroke: "4.5px rgba(255, 255, 255, 0.98)",
              }}
            >
              AX
            </span>
            <span
              className="text-transparent inline-block transition-all filter drop-shadow-[0_0_25px_rgba(196,0,36,0.7)]"
              style={{
                WebkitTextStroke: "5.5px #C40024",
              }}
            >
              .
            </span>
          </h2>
        </motion.div>

        {/* 5. Footer Indicators */}
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 flex items-center justify-end font-mono text-xs text-neutral-400 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={14} className="animate-bounce text-[#C40024]" />
          </div>
        </div>

      </div>
    </section>
  );
}

