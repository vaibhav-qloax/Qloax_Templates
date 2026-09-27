"use client";

import Link from "next/link";
import { Terminal, ArrowUpRight, Cpu } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T2Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#090D16]/90 backdrop-blur-md border-b border-[#1E293B] py-4 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand logo Vercel / Linear style */}
        <Link href="/templates/template-2" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[#131D31] border border-[#1E293B] group-hover:border-[#3B82F6] flex items-center justify-center rounded-lg transition-colors">
            <Cpu size={16} className="text-[#3B82F6]" />
          </div>
          <div>
            <span className="font-extrabold text-base text-[#F1F5F9] tracking-tight block">
              QLOAX
            </span>
            <span className="text-[10px] text-slate-400 font-mono leading-none">
              ENTERPRISE PLATFORM
            </span>
          </div>
        </Link>

        {/* Platform Status */}
        <div className="hidden lg:flex items-center gap-4 bg-[#131D31] px-3.5 py-1.5 rounded-full border border-[#1E293B] font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse" />
            <span className="text-[#F1F5F9] font-medium">ENTERPRISE SLATE v2.0</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">REACT NATIVE & EXPO SPECIALIST</span>
        </div>

        {/* Nav actions */}
        <div className="flex items-center gap-6 font-mono">
          <a href="#projects" className="hover:text-white text-slate-400 transition-colors hidden sm:block">
            01 // PROJECTS
          </a>
          <a href="#architecture" className="hover:text-white text-slate-400 transition-colors hidden sm:block">
            02 // ARCHITECTURE
          </a>
          <a href="#contact" className="hover:text-white text-slate-400 transition-colors hidden sm:block">
            03 // CONTACT
          </a>

          <MagneticButton
            dataCursor="open"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-sans font-semibold text-xs rounded-lg transition-all inline-flex items-center gap-1.5 shadow-md shadow-[#3B82F6]/20"
          >
            START PROJECT
            <ArrowUpRight size={14} />
          </MagneticButton>
        </div>

      </div>
    </header>
  );
}
