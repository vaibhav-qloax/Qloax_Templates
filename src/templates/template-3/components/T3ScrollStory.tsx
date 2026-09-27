"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const INDUSTRY_STAGES = [
  {
    step: "01",
    stage: "INDUSTRY",
    subtitle: "Heavy Machine Telemetry & Edge Sensing",
    description: "Physical factory machinery meets digital telemetry. We connect sensors directly to secure cloud relays.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
  },
  {
    step: "02",
    stage: "DATA",
    subtitle: "High-Volume Streams & Sub-second Ingestion",
    description: "Multi-gigabit data pipelines process acoustic, thermal, and mechanical sensor flux without data drops.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
  },
  {
    step: "03",
    stage: "INTELLIGENCE",
    subtitle: "Neural Model Inference at the Edge",
    description: "Machine learning algorithms spot micro-anomalies in sub-milliseconds before physical failure occurs.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
  },
  {
    step: "04",
    stage: "AUTOMATION",
    subtitle: "Closed-Loop Closed-Feedback Control",
    description: "Automated corrective commands adjust PLC machine parameters in real-time with zero human intervention required.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600",
  },
  {
    step: "05",
    stage: "SYSTEMS",
    subtitle: "Unified Enterprise Multi-Facility Control Plane",
    description: "Disparate plant operations across continents synchronize under one high-availability QLOAX dashboard.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  },
  {
    step: "06",
    stage: "TRANSFORMATION",
    subtitle: "The Autonomous Industrial Future Realized",
    description: "Maximized yield, reduced maintenance downtime, and continuous operational intelligence.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600",
  },
];

export default function T3ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="story" ref={containerRef} className="relative bg-[#030303] text-white min-h-[450vh]">
      
      {/* Sticky Story Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between py-12 px-6 md:px-12 overflow-hidden">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center font-mono text-xs text-neutral-400 border-b border-neutral-800 pb-4 z-20">
          <span className="text-[#C40024] font-bold">
            [ INDUSTRIAL STORY TELLING ENGINE ]
          </span>
          <span>STAGE PROGRESSION 01 → 06</span>
        </div>

        {/* Story Stages Visual Transformation Stack */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-20">
          
          {/* Left Text Transformation */}
          <div className="lg:col-span-6 relative h-64 flex items-center">
            {INDUSTRY_STAGES.map((st, idx) => {
              const start = idx / INDUSTRY_STAGES.length;
              const end = (idx + 1) / INDUSTRY_STAGES.length;

              const opacity = useTransform(
                scrollYProgress,
                [start - 0.08, start, end - 0.08, end],
                [0, 1, 1, 0]
              );
              const x = useTransform(
                scrollYProgress,
                [start - 0.08, start, end],
                [-40, 0, 40]
              );

              return (
                <motion.div
                  key={st.step}
                  style={{ opacity, x }}
                  className="absolute inset-0 flex flex-col justify-center space-y-4"
                >
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="px-2.5 py-1 bg-[#C40024] text-white font-bold rounded">
                      STAGE {st.step}
                    </span>
                    <span className="text-neutral-400">/ 06</span>
                  </div>

                  <h3 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
                    {st.stage}
                  </h3>

                  <p className="font-mono text-sm text-[#C40024]">
                    {st.subtitle}
                  </p>

                  <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed max-w-md">
                    {st.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Image Visual Transformations */}
          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
            {INDUSTRY_STAGES.map((st, idx) => {
              const start = idx / INDUSTRY_STAGES.length;
              const end = (idx + 1) / INDUSTRY_STAGES.length;

              const opacity = useTransform(
                scrollYProgress,
                [start - 0.08, start, end - 0.08, end],
                [0, 1, 1, 0]
              );
              const scale = useTransform(
                scrollYProgress,
                [start - 0.08, start, end],
                [1.15, 1, 0.95]
              );

              return (
                <motion.div
                  key={st.step}
                  style={{ opacity, scale }}
                  className="absolute inset-0 transform-gpu will-change-transform"
                >
                  <Image
                    src={st.image}
                    alt={st.stage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === 0}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 font-mono text-xs text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                    STAGE {st.step}: {st.stage}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Scroll Progress Bar */}
        <div className="max-w-7xl mx-auto w-full font-mono text-xs text-neutral-500 border-t border-neutral-900 pt-4 flex justify-between items-center z-20">
          <span>SCROLL TO ADVANCE INDUSTRIAL STAGES</span>
          <div className="w-48 h-1 bg-neutral-900 rounded-full overflow-hidden">
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
