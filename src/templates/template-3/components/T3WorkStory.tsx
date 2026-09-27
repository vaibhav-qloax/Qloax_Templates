"use client";

import Image from "next/image";
import { QLOAX_PROJECTS } from "@/data/qloaxData";
import { ArrowUpRight } from "lucide-react";

export default function T3WorkStory() {
  return (
    <section className="bg-[#030303] text-white py-24 border-t border-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
          <div>
            <span className="font-mono text-xs text-[#C40024] uppercase tracking-widest block mb-2">
              // INDUSTRIAL CASE PORTFOLIO
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              DEPLOYED ENGINEERING
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-md">
            Production systems built for enterprise scaling across global operations.
          </p>
        </div>

        {/* 2 Column Industrial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {QLOAX_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#080808] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#C40024] transition-all space-y-6 p-8 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="relative h-60 w-full rounded-xl overflow-hidden bg-neutral-900" data-cursor="explore">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded font-mono text-xs text-white border border-white/10">
                    CASE {proj.number}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#C40024] uppercase tracking-wider block">
                    {proj.category}
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                    {proj.title}
                  </h3>
                  <p className="font-mono text-xs text-neutral-400">
                    {proj.subtitle}
                  </p>
                </div>

                <div className="space-y-2 pt-2 font-mono text-xs border-t border-neutral-800/80">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">ENGINEERING ARCHITECTURE:</span>
                    <p className="text-neutral-300 font-sans">{proj.engineering}</p>
                  </div>
                  <div className="pt-1">
                    <span className="text-[#C40024] block text-[10px] uppercase">OUTCOME:</span>
                    <p className="text-white font-sans font-medium">{proj.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between font-mono text-xs">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>

                <a href="#contact" className="text-[#C40024] hover:text-white font-bold inline-flex items-center gap-1">
                  CASE BRIEF
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
