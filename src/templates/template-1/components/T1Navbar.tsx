"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

import QloaxGeometricLogo from "@/components/shared/QloaxGeometricLogo";

export default function T1Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#e5e5e5] py-3 shadow-[0_4px_20px_rgba(20,33,61,0.04)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 flex items-center justify-between">
        
        {/* Brand: Pure Geometric Vector Logo */}
        <Link href="/" className="flex items-center group">
          <QloaxGeometricLogo fixed={false} size={52} className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all" />
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6 text-xs font-mono tracking-wider text-[#14213d]">
          <a href="#capabilities" className="hover:text-[#000000] transition-colors hidden sm:block">
            CAPABILITIES
          </a>
          <a href="#products" className="hover:text-[#000000] transition-colors hidden sm:block">
            PRODUCTS
          </a>
          <a href="#work" className="hover:text-[#000000] transition-colors hidden sm:block">
            WORK
          </a>

          <MagneticButton
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#14213d] hover:bg-[#000000] text-white font-sans text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200"
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
