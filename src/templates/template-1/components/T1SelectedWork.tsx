"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { QLOAX_PROJECTS } from "@/data/qloaxData";
import { ArrowUpRight } from "lucide-react";

export default function T1SelectedWork() {
  return (
    <section id="work" className="relative bg-[#ffffff] text-[#000000] py-24 md:py-36 border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#e5e5e5]">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#14213d] uppercase tracking-widest font-bold">
              // SELECTED CASE STUDIES
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight uppercase text-[#000000]">
              ENGINEERED WORK.
            </h2>
          </div>
          <p className="text-[#14213d]/70 text-sm md:text-base max-w-md">
            Production-grade platforms built for real-world enterprise infrastructure.
          </p>
        </div>

        {/* Case Study Cards (Large Case Study Layouts) */}
        <div className="space-y-32">
          {QLOAX_PROJECTS.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 group"
              >
                {/* Image Showcase Container */}
                <div
                  className="relative w-full h-[50vh] sm:h-[65vh] rounded-3xl overflow-hidden bg-neutral-100 border border-[#e5e5e5] shadow-xl cursor-pointer"
                  data-cursor="explore"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Top Bar */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                    <span className="font-mono text-sm font-bold text-[#14213d] bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#e5e5e5] shadow-xs">
                      CASE {project.number} / 06
                    </span>
                    <span className="font-mono text-xs text-[#14213d]/80 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#e5e5e5] shadow-xs">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs text-[#fca311] uppercase tracking-widest block mb-1 font-bold">
                        {project.category}
                      </span>
                      <h3 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-white bg-[#14213d] px-4 py-2 rounded-full font-bold group-hover:bg-[#000000] transition-colors shadow-md">
                      VIEW CASE STUDY
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Case Study Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-[#e5e5e5] p-8 rounded-2xl font-sans shadow-md">
                  
                  {/* Problem & Engineering */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#14213d] uppercase tracking-wider block font-bold">
                      SYSTEM & CHALLENGE
                    </span>
                    <p className="text-xs text-[#000000] font-mono font-medium">
                      {project.system}
                    </p>
                    <p className="text-xs text-[#14213d]/70 leading-relaxed pt-1">
                      {project.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#14213d] uppercase tracking-wider block font-bold">
                      ENGINEERING SOLUTION
                    </span>
                    <p className="text-xs text-[#14213d]/80 leading-relaxed">
                      {project.engineering}
                    </p>
                  </div>

                  {/* Outcome & Tags */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-[#14213d] uppercase tracking-wider block font-bold">
                        OPERATIONAL OUTCOME
                      </span>
                      <p className="text-xs text-[#000000] font-semibold leading-relaxed">
                        {project.outcome}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#e5e5e5]/60 border border-[#e5e5e5] rounded text-[#14213d]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
