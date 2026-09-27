"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { QLOAX_PRODUCTS, QLOAX_PROJECTS } from "@/data/qloaxData";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Combine Products & Projects for the 1-by-1 replacement showcase
const ECOSYSTEM_ITEMS = [
  ...QLOAX_PRODUCTS.map((p) => ({
    id: p.id,
    number: p.number,
    title: p.name,
    subtitle: p.tagline,
    category: p.category,
    description: p.description,
    image: p.image,
    type: "PROPRIETARY PLATFORM",
    details: p.highlights,
  })),
  ...QLOAX_PROJECTS.slice(0, 3).map((pr) => ({
    id: pr.id,
    number: pr.number,
    title: pr.title,
    subtitle: pr.subtitle,
    category: pr.category,
    description: pr.engineering,
    image: pr.image,
    type: "CASE STUDY",
    details: pr.tags,
  })),
];

export default function T1Products() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fast & smooth horizontal text movement across the bottom
  const textX = useTransform(scrollYProgress, [0, 1], ["35%", "-165%"]);

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative bg-[#030303] text-white min-h-[500vh] border-t border-white/10"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-8 px-6 md:px-12">
        
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center z-40 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C40024] rounded-full animate-pulse" />
            <span className="text-[#C40024] font-bold uppercase tracking-widest">
              // PRODUCT ECOSYSTEM
            </span>
          </div>
          <span className="hidden sm:block text-neutral-400">
            SCROLL TO ADVANCE SHOWCASE
          </span>
        </div>

        {/* GIANT BOLD TEXT AT BOTTOM (Flat clean text - no glow layer z-10) */}
        <div className="absolute bottom-4 left-0 right-0 z-10 pointer-events-none overflow-hidden select-none">
          <motion.h2
            style={{ x: textX }}
            className="font-display font-black text-[20vw] sm:text-[24vw] tracking-tighter uppercase whitespace-nowrap text-[#C40024] opacity-90 leading-none"
          >
            PRODUCT ECOSYSTEM • SHOWCASE
          </motion.h2>
        </div>

        {/* PROJECT CARDS CONTAINER (Layered at z-30 IN FRONT OF TEXT - cards enter/exit at same place 1 by 1) */}
        <div className="max-w-7xl mx-auto w-full relative z-30 my-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {ECOSYSTEM_ITEMS.map((item, idx) => {
              // 3-column replacement logic:
              // Cards 0, 1, 2 are in Columns 1, 2, 3.
              // Cards 3, 4, 5 replace Cards 0, 1, 2 at the exact same grid positions!
              const colIndex = (idx % 3) + 1;
              const isFirstGroup = idx < 3;

              let enterStart = isFirstGroup ? 0.0 : 0.28 + (idx - 3) * 0.15;
              let enterEnd = isFirstGroup ? 0.16 : enterStart + 0.14;

              let exitStart = isFirstGroup ? 0.28 + idx * 0.15 : 0.82;
              let exitEnd = isFirstGroup ? exitStart + 0.14 : 0.96;

              // Y Motion: enters from 180px below -> stays at 0px -> exits -180px above
              const cardY = useTransform(
                scrollYProgress,
                [enterStart, enterEnd, exitStart, exitEnd],
                [180, 0, 0, -180]
              );

              // Opacity: fades in on enter -> visible -> fades out one by one on exit
              const cardOpacity = useTransform(
                scrollYProgress,
                [enterStart, enterEnd, exitStart, exitEnd],
                [0, 1, 1, 0]
              );

              // Scale: 0.9 -> 1.0 -> 0.9
              const cardScale = useTransform(
                scrollYProgress,
                [enterStart, enterEnd, exitStart, exitEnd],
                [0.9, 1, 1, 0.9]
              );

              return (
                <motion.div
                  key={item.id}
                  style={{
                    gridColumnStart: colIndex,
                    gridRowStart: 1,
                    y: cardY,
                    opacity: cardOpacity,
                    scale: cardScale,
                  }}
                  className="bg-[#090909]/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl space-y-4 hover:border-[#C40024] transition-colors duration-300 group flex flex-col justify-between relative z-30"
                  data-cursor="open"
                >
                  {/* Card Image */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[11px] text-white border border-white/15 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-[#C40024]" />
                      <span>{item.type}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[10px] text-neutral-300 border border-white/10">
                      NO. {item.number}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between font-sans">
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] text-[#C40024] uppercase tracking-wider block font-bold">
                        {item.category}
                      </span>
                      <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white group-hover:text-[#C40024] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-neutral-400 line-clamp-1">
                        "{item.subtitle}"
                      </p>
                      <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Tags & CTA */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                      <div className="flex flex-wrap gap-1">
                        {item.details.slice(0, 2).map((detail, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-neutral-400"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs text-[#C40024] font-bold group-hover:translate-x-1 transition-transform">
                        <span>EXPLORE</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar Footer */}
        <div className="max-w-7xl mx-auto w-full font-mono text-xs text-neutral-400 border-t border-white/10 pt-3 flex justify-between items-center z-40 relative bg-[#030303]/90 backdrop-blur-md">
          <span>PROGRESS THROUGH ECOSYSTEM</span>
          <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#C40024]"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
