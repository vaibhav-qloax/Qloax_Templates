"use client";

import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T3CTA() {
  return (
    <section id="contact" className="bg-[#030303] text-white py-32 border-t border-neutral-900 font-sans relative overflow-hidden">
      
      {/* Background Reticle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(196,0,36,0.15),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-12">
        
        <div className="space-y-4 max-w-4xl mx-auto">
          <span className="font-mono text-xs text-[#C40024] uppercase tracking-widest block">
            // INDUSTRIAL INITIATION
          </span>

          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-none">
            ENGINEERING
            <br />
            <span className="text-[#C40024]">WHAT COMES NEXT.</span>
          </h2>

          <p className="text-neutral-400 font-mono text-sm sm:text-base max-w-2xl mx-auto pt-2">
            QLOAX — "ENGINEERING Intelligence, Empowering Industry."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 font-mono text-xs">
          <MagneticButton
            dataCursor="open"
            className="w-full sm:w-auto px-8 py-5 bg-[#C40024] hover:bg-[#E0002A] text-white font-bold uppercase rounded tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#C40024]/30"
          >
            DISCUSS INDUSTRIAL SYSTEM BUILD
            <ArrowUpRight size={16} />
          </MagneticButton>

          <MagneticButton
            dataCursor="open"
            className="w-full sm:w-auto px-8 py-5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold uppercase rounded border border-neutral-800 inline-flex items-center justify-center gap-2 transition-all"
          >
            REQUEST DISCOVERY WORKSHOP
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
