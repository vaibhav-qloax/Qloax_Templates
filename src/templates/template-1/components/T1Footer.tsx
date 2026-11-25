"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function T1Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#ffffff] text-[#14213d]/70 py-12 border-t border-[#e5e5e5] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Tagline */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 bg-[#fca311] rounded-full" />
            <span className="font-display font-extrabold text-base tracking-tighter text-[#000000]">
              QLOAX
            </span>
          </div>
          <p className="text-[#14213d]/60 text-[11px]">
            "ENGINEERING Intelligence, Empowering Industry."
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex items-center gap-6 text-[#14213d]/70">
          <a href="#capabilities" className="hover:text-[#000000] transition-colors">
            CAPABILITIES
          </a>
          <a href="#products" className="hover:text-[#000000] transition-colors">
            PRODUCTS
          </a>
          <a href="#work" className="hover:text-[#000000] transition-colors">
            WORK
          </a>
          <a href="#contact" className="hover:text-[#000000] transition-colors">
            CONTACT
          </a>
        </div>

        {/* Right: Back to top & copyright */}
        <div className="flex items-center gap-4 text-[#14213d]/50">
          <span>© {new Date().getFullYear()} QLOAX. ALL RIGHTS RESERVED.</span>
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-white hover:bg-[#14213d] hover:text-white text-[#14213d] border border-[#e5e5e5] rounded-full transition-colors shadow-xs"
            title="Back to Top"
            data-cursor="hover"
          >
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
