"use client";

import { motion } from "framer-motion";
import { QLOAX_CAPABILITIES } from "@/data/qloaxData";
import { CheckCircle2 } from "lucide-react";

export default function T2CapabilitiesGrid() {
  return (
    <section id="architecture" className="bg-[#F8FAFC] text-slate-900 py-24 border-b border-slate-200/80 font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200"
        >
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#2563EB] uppercase tracking-widest block font-bold">
              // SCALABLE CAPABILITY ARCHITECTURE
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-900 uppercase">
              TECHNICAL CAPABILITIES
            </h2>
          </div>
          <p className="text-slate-600 text-sm font-sans max-w-md">
            Enterprise security, high frame-rate client performance, and resilient offline synchronization.
          </p>
        </motion.div>

        {/* Structured Grid Cards - White Crystal Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QLOAX_CAPABILITIES.map((cap, index) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="bg-white border border-slate-200/90 p-8 rounded-2xl space-y-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:border-[#2563EB] hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                  <span>MODULE {cap.number}</span>
                  <span className="text-[#2563EB] font-bold">ENTERPRISE GRADE</span>
                </div>

                <h3 className="font-display font-bold text-xl uppercase tracking-tight text-slate-900 group-hover:text-[#2563EB] transition-colors">
                  {cap.title}
                </h3>

                <p className="text-xs font-mono text-slate-500">
                  "{cap.tagline}"
                </p>

                <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                  {cap.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <span className="font-mono text-[10px] text-[#2563EB] uppercase tracking-widest font-bold block">
                    FEATURE SPECIFICATIONS
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {cap.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#2563EB] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 font-mono text-[10px]">
                {cap.techStack.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
