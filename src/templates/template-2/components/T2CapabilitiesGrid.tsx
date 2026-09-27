"use client";

import { QLOAX_CAPABILITIES } from "@/data/qloaxData";
import { CheckCircle2, Cpu, Smartphone, Layers, ShieldCheck, Database } from "lucide-react";

export default function T2CapabilitiesGrid() {
  return (
    <section id="architecture" className="bg-[#090D16] text-[#F1F5F9] py-24 border-b border-[#1E293B] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1E293B]">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest block">
              // SCALABLE CAPABILITY ARCHITECTURE
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#F1F5F9] uppercase">
              TECHNICAL CAPABILITIES
            </h2>
          </div>
          <p className="text-slate-400 text-sm font-sans max-w-md">
            Architected for enterprise security, high frame-rate client performance, and resilient offline synchronization.
          </p>
        </div>

        {/* Structured Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QLOAX_CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              className="bg-[#131D31] border border-[#1E293B] p-8 rounded-xl space-y-6 flex flex-col justify-between hover:border-[#3B82F6] transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>MODULE {cap.number}</span>
                  <span className="text-[#3B82F6] font-bold">ENTERPRISE GRADE</span>
                </div>

                <h3 className="font-display font-bold text-xl uppercase tracking-tight text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  {cap.title}
                </h3>

                <p className="text-xs font-mono text-slate-300">
                  "{cap.tagline}"
                </p>

                <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                  {cap.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-[#1E293B]">
                  <span className="font-mono text-[10px] text-[#3B82F6] uppercase tracking-widest font-semibold block">
                    FEATURE SPECIFICATIONS
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {cap.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#3B82F6] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex flex-wrap gap-1.5 font-mono text-[10px]">
                {cap.techStack.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[#090D16] border border-[#1E293B] text-slate-300 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
