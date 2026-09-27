"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Layers, ShieldCheck, Zap, Code2 } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import GradientBlinds from "@/components/shared/GradientBlinds";

const TECH_BADGES = [
  "React Native",
  "Expo Framework",
  "TypeScript",
  "Scalable UI Architectures",
  "Next.js App Router",
  "State Management & Offline-First",
];

export default function T2Hero() {
  return (
    <section className="relative bg-[#090D16] text-[#F1F5F9] pt-36 pb-24 border-b border-[#1E293B] overflow-hidden font-sans">
      
      {/* Dynamic GradientBlinds WebGL Background - Matched to Template 2 Palette */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <GradientBlinds
          gradientColors={['#090D16', '#1E40AF', '#3B82F6', '#131D31', '#090D16']}
          angle={-15}
          noise={0.15}
          blindCount={20}
          blindMinWidth={45}
          spotlightRadius={0.65}
          spotlightSoftness={0.85}
          spotlightOpacity={0.8}
          mouseDampening={0.12}
          distortAmount={1.5}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* 1px Subtle Grid Structure */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none z-0" />

      {/* Subtle Indigo Glow behind hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Category Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#131D31] border border-[#1E293B] rounded-full text-xs font-mono text-[#3B82F6]"
        >
          <Smartphone size={14} />
          <span>MOBILE & FRONTEND ENGINEERING SPECIALIST</span>
        </motion.div>

        {/* Massive Editorial Section Heading */}
        <div className="space-y-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[1.05] text-[#F1F5F9]"
          >
            SCALABLE <span className="text-[#3B82F6]">UI ARCHITECTURES</span> & MOBILE SYSTEMS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed max-w-3xl"
          >
            Architecting production-grade React Native, Expo, and enterprise frontend web applications engineered for ultra-fast performance, offline durability, and modular design systems.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs"
        >
          <MagneticButton
            dataCursor="open"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-sans font-bold text-sm rounded-lg transition-all shadow-lg shadow-[#3B82F6]/25 inline-flex items-center gap-2"
          >
            EXPLORE FEATURED CASE STUDIES
            <ArrowRight size={16} />
          </MagneticButton>

          <a
            href="#contact"
            className="px-6 py-4 bg-[#131D31] hover:bg-[#1E293B] border border-[#1E293B] text-[#F1F5F9] font-sans font-semibold text-sm rounded-lg transition-colors"
          >
            GET IN TOUCH
          </a>
        </motion.div>

        {/* Tech Stack Badges List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-8 border-t border-[#1E293B] flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400"
        >
          <span className="text-[#3B82F6] font-bold mr-2 uppercase tracking-wider text-[11px]">
            CORE SPECIALIZATIONS:
          </span>
          {TECH_BADGES.map((badge, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-[#131D31] border border-[#1E293B] text-slate-200 rounded font-sans text-xs"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Metric Highlight Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#131D31] border border-[#1E293B] p-6 rounded-xl space-y-1">
            <span className="font-mono text-xs text-slate-400">MODULAR COMPONENT LIBRARY</span>
            <div className="text-3xl font-bold font-display text-[#3B82F6]">120+ Components</div>
            <p className="text-xs text-slate-400">Design system tokens & reusable primitives</p>
          </div>

          <div className="bg-[#131D31] border border-[#1E293B] p-6 rounded-xl space-y-1">
            <span className="font-mono text-xs text-slate-400">CROSS-PLATFORM DEPLOYMENT</span>
            <div className="text-3xl font-bold font-display text-[#3B82F6]">iOS, Android & Web</div>
            <p className="text-xs text-slate-400">Single codebase Expo & Next.js integration</p>
          </div>

          <div className="bg-[#131D31] border border-[#1E293B] p-6 rounded-xl space-y-1">
            <span className="font-mono text-xs text-slate-400">PERFORMANCE TARGET</span>
            <div className="text-3xl font-bold font-display text-[#3B82F6]">60 FPS Fluid UI</div>
            <p className="text-xs text-slate-400">Sub-100ms render pipeline optimization</p>
          </div>
        </div>

      </div>
    </section>
  );
}
