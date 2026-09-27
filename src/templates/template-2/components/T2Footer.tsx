"use client";

import Link from "next/link";
import { ArrowUp, Cpu } from "lucide-react";

export default function T2Footer() {
  return (
    <footer className="bg-[#090D16] text-slate-400 py-10 font-mono text-xs border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-[#131D31] border border-[#1E293B] flex items-center justify-center rounded">
            <Cpu size={12} className="text-[#3B82F6]" />
          </div>
          <span className="text-[#F1F5F9] font-bold font-sans">QLOAX MOBILE & FRONTEND ARCHITECTURE</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">TEMPLATE 02 (ENTERPRISE SLATE)</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            DASHBOARD
          </Link>
          <a href="#projects" className="hover:text-white transition-colors">
            PROJECTS
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            ARCHITECTURE
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            CONTACT
          </a>
        </div>

        <div className="flex items-center gap-4 text-slate-500">
          <span>© {new Date().getFullYear()} QLOAX. ALL RIGHTS RESERVED.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 bg-[#131D31] hover:bg-[#3B82F6] hover:text-white text-slate-300 rounded border border-[#1E293B] transition-colors"
          >
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
