"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { QLOAX_CAPABILITIES } from "@/data/qloaxData";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function T1Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCap = QLOAX_CAPABILITIES[activeIndex];

  return (
    <section id="capabilities" className="relative bg-[#050505] text-white py-24 md:py-36 border-t border-white/10 overflow-hidden">
      
      {/* Background line accent */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <span className="font-mono text-xs text-[#C40024] uppercase tracking-widest">
            // CORE CAPABILITIES
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight uppercase">
            INTELLIGENT SYSTEM ARCHITECTURE.
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base">
            We transform legacy complexity into self-optimizing, cloud-native enterprise intelligence.
          </p>
        </div>

        {/* Interactive Transformation System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {QLOAX_CAPABILITIES.map((cap, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? "bg-white/10 border-[#C40024] shadow-lg shadow-[#C40024]/10"
                      : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/8"
                  }`}
                  data-cursor="hover"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs ${
                          isActive ? "text-[#C40024] font-bold" : "text-neutral-400"
                        }`}
                      >
                        {cap.number}
                      </span>
                      <h3
                        className={`font-display font-bold text-lg uppercase tracking-tight ${
                          isActive ? "text-white" : "text-neutral-300 group-hover:text-white"
                        }`}
                      >
                        {cap.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 pl-7 font-sans">
                      {cap.tagline}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className={`transition-transform duration-300 ${
                      isActive
                        ? "text-[#C40024] translate-x-1"
                        : "text-neutral-400 group-hover:translate-x-1"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dominant Transformation Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#090909] border border-white/10 rounded-2xl overflow-hidden shadow-2xl space-y-6"
              >
                {/* Image Container with scale reveal */}
                <div
                  className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900"
                  data-cursor="view"
                >
                  <Image
                    src={activeCap.image}
                    alt={activeCap.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded font-mono text-xs text-neutral-300 border border-white/10">
                    CAPABILITY {activeCap.number} / 05
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 pt-0 space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                      {activeCap.title}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-2 leading-relaxed font-sans">
                      {activeCap.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="font-mono text-xs text-[#C40024] uppercase tracking-wider">
                      SYSTEM HIGHLIGHTS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeCap.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle2 size={14} className="text-[#C40024] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="text-neutral-400 uppercase text-[10px] tracking-wider mr-2">
                      TECH STACK:
                    </span>
                    {activeCap.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
