"use client";

import React from "react";
import { motion } from "framer-motion";

interface QloaxGeometricLogoProps {
  className?: string;
  size?: number;
  fixed?: boolean;
}

export default function QloaxGeometricLogo({
  className = "",
  size = 68,
  fixed = true,
}: QloaxGeometricLogoProps) {
  const content = (
    <div
      className={`select-none pointer-events-none group transition-opacity duration-300 ${
        fixed
          ? "fixed top-24 left-6 sm:left-10 lg:left-20 z-30 hidden md:block opacity-70 hover:opacity-100"
          : ""
      } ${className}`}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 174 120"
        style={{ width: size, height: (size * 120) / 174 }}
        className="transform-gpu filter drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <g
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* OUTER SHAPE */}
          <line x1="76" y1="11" x2="41" y2="32" />
          <line x1="76" y1="11" x2="111" y2="32" />

          <line x1="41" y1="32" x2="41" y2="70" />
          <line x1="111" y1="32" x2="111" y2="70" />

          <line x1="41" y1="70" x2="76" y2="91" />
          <line x1="111" y1="70" x2="76" y2="91" />

          {/* MAIN VERTICAL */}
          <line x1="76" y1="11" x2="76" y2="91" />

          {/* INNER CUBE */}
          <line x1="76" y1="31" x2="57" y2="43" />
          <line x1="76" y1="31" x2="95" y2="43" />

          <line x1="57" y1="43" x2="57" y2="66" />
          <line x1="95" y1="43" x2="95" y2="66" />

          <line x1="57" y1="66" x2="76" y2="77" />
          <line x1="95" y1="66" x2="76" y2="77" />

          {/* OUTER TO INNER */}
          <line x1="41" y1="32" x2="57" y2="43" />
          <line x1="111" y1="32" x2="95" y2="43" />

          <line x1="41" y1="70" x2="57" y2="66" />
          <line x1="111" y1="70" x2="95" y2="66" />

          <line x1="76" y1="91" x2="76" y2="77" />

          {/* CENTER GEOMETRY */}
          <line x1="57" y1="43" x2="76" y2="55" />
          <line x1="95" y1="43" x2="76" y2="55" />

          <line x1="57" y1="66" x2="76" y2="55" />
          <line x1="95" y1="66" x2="76" y2="55" />

          {/* TOP DOT CONNECTOR */}
          <line x1="92" y1="21" x2="92" y2="11" />

          {/* RIGHT DOT CONNECTOR */}
          <line x1="111" y1="50" x2="120" y2="50" />

          {/* LEFT DOT CONNECTOR */}
          <line x1="32" y1="67" x2="41" y2="67" />

          {/* BOTTOM DOT CONNECTOR */}
          <line x1="66" y1="86" x2="66" y2="97" />
        </g>

        {/* ALL 100% WHITE DOTS - NO RED */}
        <circle cx="92" cy="11" r="2.5" fill="#FFFFFF" />
        <circle cx="120" cy="50" r="2.5" fill="#FFFFFF" />
        <circle cx="32" cy="67" r="2.5" fill="#FFFFFF" />
        <circle cx="66" cy="97" r="2.5" fill="#FFFFFF" />
      </motion.svg>
    </div>
  );

  return content;
}

