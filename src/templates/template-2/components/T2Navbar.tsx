"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import QloaxGeometricLogo from "@/components/shared/QloaxGeometricLogo";

export default function T2Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090D16]/85 backdrop-blur-xl border-b border-white/10 py-3 sm:py-3.5 font-sans text-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand logo */}
        <Link href="/templates/template-2" className="flex items-center group">
          <QloaxGeometricLogo fixed={false} size={38} className="opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all drop-shadow-md" />
        </Link>

        {/* Platform Status */}
        <div className="hidden lg:flex items-center gap-4 bg-[#131D31]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse" />
            <span className="text-[#F1F5F9] font-medium">ENTERPRISE SLATE v2.0</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">REACT NATIVE & EXPO SPECIALIST</span>
        </div>

        {/* Nav actions */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
          <a href="#projects" className="hover:text-cyan-400 text-slate-300 transition-colors hidden sm:block font-medium">
            01 // PROJECTS
          </a>
          <a href="#architecture" className="hover:text-cyan-400 text-slate-300 transition-colors hidden sm:block font-medium">
            02 // ARCHITECTURE
          </a>
          <a href="#contact" className="hover:text-cyan-400 text-slate-300 transition-colors hidden sm:block font-medium">
            03 // CONTACT
          </a>

          <MagneticButton
            dataCursor="open"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-3.5 sm:px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-sans font-semibold text-xs rounded-lg transition-all inline-flex items-center gap-1.5 shadow-lg shadow-[#3B82F6]/30"
          >
            <span className="hidden xs:inline">START PROJECT</span>
            <span className="xs:hidden">CONTACT</span>
            <ArrowUpRight size={14} />
          </MagneticButton>
        </div>

      </div>
    </header>
  );
}
