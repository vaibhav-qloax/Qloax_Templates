"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function T3Footer() {
  return (
    <footer className="bg-[#030303] text-neutral-400 py-12 font-mono text-xs border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-2.5 h-2.5 bg-[#C40024] rotate-45" />
            <span className="text-white font-bold font-sans text-sm tracking-wider">
              QLOAX
            </span>
          </div>
          <p className="text-neutral-500 text-[11px]">
            ENGINEERING Intelligence, Empowering Industry.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hover:text-white transition-colors">
            DASHBOARD
          </Link>
          <a href="#story" className="hover:text-white transition-colors">
            STORY
          </a>
          <a href="#ecosystem" className="hover:text-white transition-colors">
            ECOSYSTEM
          </a>
        </div>

        <div className="flex items-center gap-4 text-neutral-500">
          <span>© {new Date().getFullYear()} QLOAX INC.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2.5 bg-neutral-900 hover:bg-[#C40024] text-white rounded transition-colors"
          >
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
