"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { QLOAX_PRODUCTS } from "@/data/qloaxData";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T2ProductsEditorial() {
  return (
    <section id="platforms" className="bg-[#090D16] text-[#F1F5F9] py-20 sm:py-24 border-b border-[#1E293B] font-sans relative overflow-hidden transition-colors duration-500">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1E293B]"
        >
          <div>
            <span className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest block mb-2 font-bold">
              // ENTERPRISE PLATFORMS & SUITES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#F1F5F9]">
              PROPRIETARY SOFTWARE
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-md">
            Production-ready software suites engineered with modern UI components and microservice integrations.
          </p>
        </motion.div>

        {/* Editorial Layout Compositions */}
        <div className="space-y-12 sm:space-y-16">
          {QLOAX_PRODUCTS.map((prod, idx) => {
            const isReverse = idx % 2 !== 0;

            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center bg-[#131D31]/90 border border-[#1E293B] p-5 sm:p-8 md:p-12 rounded-2xl hover:border-[#3B82F6] transition-all duration-300 group backdrop-blur-xl shadow-2xl"
              >
                {/* Text Column */}
                <div
                  className={`lg:col-span-5 space-y-5 sm:space-y-6 ${
                    isReverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#3B82F6] font-semibold uppercase tracking-widest block">
                      PLATFORM // 0{idx + 1}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#F1F5F9]">
                      {prod.name}
                    </h3>
                    <p className="font-mono text-xs text-slate-300">
                      "{prod.tagline}"
                    </p>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-light">
                    {prod.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[#1E293B] font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-widest text-[10px] block font-semibold">
                      KEY PLATFORM FEATURES:
                    </span>
                    <ul className="space-y-1.5 text-slate-300 font-sans text-xs sm:text-sm">
                      {prod.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <MagneticButton
                      dataCursor="open"
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-md shadow-[#3B82F6]/20 font-sans"
                    >
                      REQUEST PLATFORM DEMO
                      <ArrowUpRight size={14} />
                    </MagneticButton>
                  </div>
                </div>

                {/* Image Composition */}
                <div
                  className={`lg:col-span-7 relative h-56 sm:h-72 md:h-96 rounded-xl overflow-hidden bg-[#090D16] border border-[#1E293B] ${
                    isReverse ? "lg:order-1" : "lg:order-2"
                  }`}
                  data-cursor="open"
                >
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131D31] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#090D16]/90 backdrop-blur-md p-2.5 sm:p-3 rounded-lg font-mono text-xs text-slate-300 flex justify-between border border-[#1E293B] text-[11px] sm:text-xs">
                    <span>{prod.category}</span>
                    <span className="text-[#3B82F6] font-semibold">ENTERPRISE EDITION v4.2</span>
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
