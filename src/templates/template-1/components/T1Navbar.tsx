"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T1Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#030303]/85 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/templates/template-1" className="flex items-center gap-3 group">
          <span className="w-2.5 h-2.5 bg-[#C40024] rounded-full group-hover:scale-125 transition-transform" />
          <span className="font-display font-extrabold tracking-tighter text-xl text-white">
            QLOAX
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400 border border-white/10 px-2 py-0.5 rounded">
            CINEMATIC v1.0
          </span>
        </Link>

        {/* Status / Live System Info (Bohdan style) */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-neutral-300">SYSTEM OPERATIONAL</span>
          </div>
          <span className="text-neutral-700">/</span>
          <span className="text-neutral-400">{time || "12:00:00 UTC"}</span>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-6 text-xs font-mono tracking-wider text-neutral-300">
          <a href="#capabilities" className="hover:text-white transition-colors hidden sm:block">
            CAPABILITIES
          </a>
          <a href="#products" className="hover:text-white transition-colors hidden sm:block">
            PRODUCTS
          </a>
          <a href="#work" className="hover:text-white transition-colors hidden sm:block">
            WORK
          </a>

          <MagneticButton
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C40024] hover:bg-[#E0002A] text-white font-sans text-xs font-semibold rounded-full transition-all duration-200"
            dataCursor="open"
            onClick={() => {
              const element = document.getElementById("contact");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            LET'S TALK
            <ArrowUpRight size={14} />
          </MagneticButton>
        </nav>

      </div>
    </header>
  );
}
