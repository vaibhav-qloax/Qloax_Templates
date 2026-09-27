"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function T1Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030303] text-white py-12 border-t border-white/10 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Tagline */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 bg-[#C40024] rounded-full" />
            <span className="font-display font-extrabold text-base tracking-tighter">
              QLOAX
            </span>
          </div>
          <p className="text-neutral-500 text-[11px]">
            "ENGINEERING Intelligence, Empowering Industry."
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex items-center gap-6 text-neutral-400">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            TEMPLATE DASHBOARD
          </Link>
          <a href="#capabilities" className="hover:text-white transition-colors">
            CAPABILITIES
          </a>
          <a href="#products" className="hover:text-white transition-colors">
            PRODUCTS
          </a>
          <a href="#work" className="hover:text-white transition-colors">
            WORK
          </a>
        </div>

        {/* Right: Back to top & copyright */}
        <div className="flex items-center gap-4 text-neutral-500">
          <span>© {new Date().getFullYear()} QLOAX. ALL RIGHTS RESERVED.</span>
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-white/5 hover:bg-[#C40024] text-white rounded-full transition-colors"
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
