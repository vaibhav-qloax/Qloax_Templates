"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T3Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-transparent backdrop-blur-sm border-b border-white/10 py-5 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/templates/template-3" className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#C40024] rotate-45" />
          <span className="font-display font-black text-xl text-white tracking-widest uppercase">
            QLOAX
          </span>
          <span className="text-[10px] text-[#C40024] border border-[#C40024]/40 px-2 py-0.5 rounded font-mono">
            INDUSTRY 4.0
          </span>
        </Link>

        {/* Industrial Mode Meter */}
        <div className="hidden md:flex items-center gap-4 text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-[#C40024]" />
            <span className="text-white">MODE: INDUSTRIAL FUTURE</span>
          </div>
          <span className="text-neutral-700">/</span>
          <span className="text-neutral-500">OPERATIONAL SCALE: UNLIMITED</span>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-6">
          <a href="#story" className="hover:text-white text-neutral-400 transition-colors hidden sm:block">
            // STORY
          </a>
          <a href="#ecosystem" className="hover:text-white text-neutral-400 transition-colors hidden sm:block">
            // ECOSYSTEM
          </a>

          <MagneticButton
            dataCursor="open"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-2.5 bg-[#C40024] hover:bg-[#E0002A] text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 shadow-md shadow-[#C40024]/30"
          >
            FORGE FUTURE
            <ArrowUpRight size={14} />
          </MagneticButton>
        </div>

      </div>
    </header>
  );
}
