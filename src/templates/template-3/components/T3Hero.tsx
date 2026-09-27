"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Flame } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T3Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#030303] text-white flex flex-col justify-between pt-36 pb-16 overflow-hidden"
    >
      {/* Background Video with Parallax & Red Technical Gridlines */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />
        
        {/* Existing Subtle Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent pointer-events-none z-[1]" />
        
        {/* Bottom Blur Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 45%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 45%)",
          }}
        />

        {/* Red Technical Reticle Lines */}
        <div className="absolute inset-0 border-[20px] border-transparent pointer-events-none z-[1]">
          <div className="w-full h-full border border-[#C40024]/20 relative">
            <span className="absolute top-2 left-2 font-mono text-[10px] text-[#C40024]">
              [ SYS.REF.03 / CAMERA_LENS_ZOOM ]
            </span>
            <span className="absolute bottom-2 right-2 font-mono text-[10px] text-[#C40024]">
              [ INDUSTRIAL_VISION_ACTIVE ]
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto space-y-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C40024]/10 border border-[#C40024]/40 rounded font-mono text-xs text-[#C40024]"
        >
          <Flame size={14} className="animate-pulse" />
          <span>TEMPLATE 03 // FUTURE OF INDUSTRY</span>
        </motion.div>

        {/* Industrial Typography */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter uppercase leading-none"
          >
            FORGING
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#C40024]">
              WHAT'S NEXT.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-sans text-neutral-300 text-lg sm:text-2xl max-w-2xl font-light leading-relaxed"
          >
            Intelligent technology for the systems, products, and operational infrastructure of tomorrow.
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs"
        >
          <MagneticButton
            dataCursor="explore"
            onClick={() => {
              document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-[#C40024] hover:bg-[#E0002A] text-white font-bold uppercase tracking-wider rounded transition-colors shadow-lg shadow-[#C40024]/30"
          >
            BEGIN INDUSTRIAL STORY
          </MagneticButton>

          <a
            href="#ecosystem"
            className="liquid-glass px-6 py-4 border border-white/10 hover:border-white/30 text-white font-bold uppercase tracking-wider rounded transition-colors"
          >
            VIEW PRODUCTS
          </a>
        </motion.div>

      </motion.div>

      {/* Footer Details */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center font-mono text-xs text-neutral-400 border-t border-neutral-900 pt-6">
        <span>FACTORY FLOOR & CLOUD TELEMETRY READY</span>
        <div className="flex items-center gap-2">
          <span>SCROLL DOWN</span>
          <ArrowDown size={14} className="text-[#C40024] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
