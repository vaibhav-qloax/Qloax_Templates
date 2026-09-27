"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldAlert } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import QloaxGeometricLogo from "@/components/shared/QloaxGeometricLogo";

export default function T3Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-transparent py-5 font-mono text-xs pointer-events-none">
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 flex items-center justify-between pointer-events-auto">
        
        {/* Brand: Pure Geometric Vector Logo */}
        <Link href="/templates/template-3" className="flex items-center group">
          <QloaxGeometricLogo fixed={false} size={48} className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all drop-shadow-md" />
        </Link>

        {/* Industrial Mode Meter */}
        <div className="hidden md:flex items-center gap-4 text-neutral-300 drop-shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-[#C40024]" />
            <span className="text-white font-medium">MODE: INDUSTRIAL FUTURE</span>
          </div>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-400">OPERATIONAL SCALE: UNLIMITED</span>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-6">
          <a href="#story" className="hover:text-white text-neutral-300 transition-colors hidden sm:block drop-shadow-sm">
            // STORY
          </a>
          <a href="#ecosystem" className="hover:text-white text-neutral-300 transition-colors hidden sm:block drop-shadow-sm">
            // ECOSYSTEM
          </a>

          <MagneticButton
            dataCursor="open"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-2.5 bg-[#C40024] hover:bg-[#E0002A] text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1.5 shadow-lg shadow-[#C40024]/40"
          >
            FORGE FUTURE
            <ArrowUpRight size={14} />
          </MagneticButton>
        </div>

      </div>
    </header>
  );
}
