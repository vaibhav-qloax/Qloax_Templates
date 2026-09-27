"use client";

import { motion } from "framer-motion";

const UPPER_WORDS = [
  "AI",
  "STRATEGY",
  "DESIGN",
  "INNOVATION",
  "ARCHITECTURE",
  "ENGINEERING",
  "INTELLIGENCE",
  "AUTOMATION",
];

const LOWER_WORDS = [
  "SOFTWARE",
  "CREATIVE",
  "CODE",
  "SYSTEMS",
  "PERFORMANCE",
  "HIGH-AVAILABILITY",
  "COMPUTING",
  "MISSION-CRITICAL",
];

export default function T3WorkStory() {
  return (
    <section
      id="capabilities"
      className="relative bg-[#030303] text-white py-20 md:py-28 font-sans overflow-hidden select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF3811]/[0.05] rounded-full blur-[160px] pointer-events-none" />

      {/* Slanted Full-Bleed Infinite Marquee Ribbon */}
      <div className="relative w-[120vw] -ml-[10vw] -rotate-[2.2deg] border-y-[4px] md:border-y-[5px] border-[#FF3811] bg-[#000000] py-6 md:py-9 shadow-[0_0_50px_rgba(255,56,17,0.12)] overflow-hidden">
        
        {/* UPPER LINE: Orange-Red, Moving towards RIGHT (Slower & refined scale) */}
        <div className="flex overflow-hidden py-1">
          <motion.div
            className="flex items-center shrink-0 gap-5 md:gap-8 font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight uppercase text-[#FF3811] leading-none"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 52,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={`upper-${i}`} className="flex items-center gap-5 md:gap-8 whitespace-nowrap">
                {UPPER_WORDS.map((word, wIdx) => (
                  <span key={wIdx} className="flex items-center gap-5 md:gap-8">
                    <span>{word}</span>
                    <span className="text-[#FF3811] text-xl md:text-2xl lg:text-3xl select-none leading-none">
                      •
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>

        {/* LOWER LINE: Solid Pure White, Moving towards LEFT (Slower & refined scale) */}
        <div className="flex overflow-hidden py-1 mt-1 md:mt-2">
          <motion.div
            className="flex items-center shrink-0 gap-5 md:gap-8 font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight uppercase text-white leading-none"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 48,
            }}
          >
            {[...Array(4)].map((_, i) => (
              <span key={`lower-${i}`} className="flex items-center gap-5 md:gap-8 whitespace-nowrap">
                {LOWER_WORDS.map((word, wIdx) => (
                  <span key={wIdx} className="flex items-center gap-5 md:gap-8">
                    <span>{word}</span>
                    <span className="text-white text-xl md:text-2xl lg:text-3xl select-none leading-none">
                      •
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
