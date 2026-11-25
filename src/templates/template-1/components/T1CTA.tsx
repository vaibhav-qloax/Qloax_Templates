"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Users } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T1CTA() {
  return (
    <section id="contact" className="relative bg-[#ffffff] text-[#000000] py-32 border-t border-[#e5e5e5] overflow-hidden">
      
      {/* Navy Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#14213d]/[0.05] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-12">
        
        <div className="space-y-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-[#14213d] uppercase tracking-widest block font-bold"
          >
            // INITIATE ENGAGEMENT
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-none text-[#000000]"
          >
            FORGING THE FUTURE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14213d] via-[#14213d] to-[#000000]">
              OF INTELLIGENT ENTERPRISE.
            </span>
          </motion.h2>

          <p className="text-[#14213d]/70 font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to deploy enterprise AI, stream-line data architecture, or integrate custom intelligent automation into your operations?
          </p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <MagneticButton
            dataCursor="open"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#14213d] hover:bg-[#000000] text-white font-bold text-sm uppercase rounded-full tracking-wider transition-all shadow-xl shadow-[#14213d]/20"
          >
            <Calendar size={18} />
            BOOK A FREE STRATEGY CALL
            <ArrowUpRight size={18} />
          </MagneticButton>

          <MagneticButton
            dataCursor="open"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#e5e5e5]/80 hover:bg-[#ffffff] border border-[#e5e5e5] text-[#14213d] font-bold text-sm uppercase rounded-full tracking-wider transition-all shadow-xs"
          >
            <Users size={18} />
            GET A DEDICATED TEAM
            <ArrowUpRight size={18} />
          </MagneticButton>
        </motion.div>

        {/* Direct Contact Info */}
        <div className="pt-12 border-t border-[#e5e5e5] max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#14213d]/70 gap-4">
          <div>
            <span className="text-[#14213d]/50 block">DIRECT INQUIRIES:</span>
            <a href="mailto:engineering@qloax.com" className="text-[#14213d] font-bold hover:text-[#000000] transition-colors">
              engineering@qloax.com
            </a>
          </div>

          <div>
            <span className="text-[#14213d]/50 block">RESPONSE TIME:</span>
            <span className="text-[#14213d] font-bold">UNDER 4 HOURS</span>
          </div>

          <div>
            <span className="text-[#14213d]/50 block">HEADQUARTERS:</span>
            <span className="text-[#14213d] font-bold">GLOBAL / HYBRID</span>
          </div>
        </div>

      </div>
    </section>
  );
}
