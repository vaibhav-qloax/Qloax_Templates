"use client";

import Image from "next/image";
import { QLOAX_PRODUCTS } from "@/data/qloaxData";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T3ProductEcosystem() {
  return (
    <section id="ecosystem" className="bg-[#050505] text-white py-24 border-t border-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
          <div>
            <span className="font-mono text-xs text-[#C40024] uppercase tracking-widest block mb-2">
              // FUTURE PRODUCT ECOSYSTEM
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
              INDUSTRIAL PRODUCTS
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-md">
            Next-generation software engines architected for edge computation and high-durability infrastructure.
          </p>
        </div>

        {/* 3 Large Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {QLOAX_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#080808] border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C40024] transition-all group"
            >
              {/* Product Image */}
              <div className="relative h-64 w-full bg-neutral-900 overflow-hidden" data-cursor="open">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded font-mono text-xs text-white border border-white/10">
                  PRODUCT NO. {prod.number}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-[#C40024] uppercase tracking-widest block">
                    {prod.category}
                  </span>
                  <h3 className="font-display font-black text-3xl uppercase text-white tracking-tight">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-mono text-neutral-300">
                    "{prod.tagline}"
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {prod.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                      SYSTEM CAPABILITIES
                    </span>
                    <ul className="space-y-1 font-mono text-xs text-neutral-300">
                      {prod.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <ShieldCheck size={12} className="text-[#C40024]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <MagneticButton
                    dataCursor="open"
                    className="w-full py-3 bg-[#C40024] hover:bg-[#E0002A] text-white font-bold text-xs uppercase tracking-wider rounded inline-flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#C40024]/20"
                  >
                    DEPLOY PLATFORM
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
