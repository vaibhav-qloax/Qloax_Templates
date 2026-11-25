"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const STORY_STAGES = [
  {
    step: "01",
    title: "INTELLIGENCE",
    subtitle: "Domain models trained on high-throughput enterprise telemetry.",
    detail: "We replace fragmented manual checks with continuous real-time neural inference.",
  },
  {
    step: "02",
    title: "DATA PIPELINES",
    subtitle: "Sub-second streaming architectures handling millions of records daily.",
    detail: "Zero-loss ingestion protocols connecting edge nodes to centralized analytics engines.",
  },
  {
    step: "03",
    title: "AUTOMATION",
    subtitle: "Self-healing enterprise workflows that eliminate operational latency.",
    detail: "Autonomous triggers, automated exception handling, and smart orchestration.",
  },
  {
    step: "04",
    title: "ENTERPRISE SYNC",
    subtitle: "Unifying mission-critical software ecosystems into a single control plane.",
    detail: "Bi-directional ERP, CRM, and IoT integration built for zero downtime.",
  },
];

export default function T1ContinuousStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative bg-[#ffffff] text-[#000000] min-h-[300vh] py-24 border-t border-[#e5e5e5]">
      {/* Sticky Full-Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden px-6">
        
        {/* Dynamic Background Navy Ambient Glow */}
        <div className="absolute w-[600px] h-[600px] bg-[#14213d]/[0.05] rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-5xl mx-auto w-full text-center space-y-12 relative z-10">
          <span className="font-mono text-xs text-[#14213d] font-bold tracking-widest uppercase block">
            // CONTINUOUS SYSTEM TRANSFORMATION
          </span>

          {/* Story Stages Stack */}
          <div className="relative h-64 flex items-center justify-center">
            {STORY_STAGES.map((stage, idx) => {
              const start = idx / STORY_STAGES.length;
              const end = (idx + 1) / STORY_STAGES.length;

              const opacity = useTransform(
                scrollYProgress,
                [start - 0.1, start, end - 0.1, end],
                [0, 1, 1, 0]
              );
              const scale = useTransform(
                scrollYProgress,
                [start - 0.1, start, end],
                [0.9, 1, 1.05]
              );
              const y = useTransform(
                scrollYProgress,
                [start - 0.1, start, end],
                [40, 0, -40]
              );

              return (
                <motion.div
                  key={stage.step}
                  style={{ opacity, scale, y }}
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
                >
                  <span className="font-mono text-xs text-[#14213d] border border-[#e5e5e5] px-3 py-1 rounded-full bg-[#e5e5e5]/50 shadow-xs font-semibold">
                    STAGE {stage.step} / 04
                  </span>
                  
                  <h3 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase text-[#000000]">
                    {stage.title}
                  </h3>

                  <p className="text-lg sm:text-2xl font-mono text-[#14213d] max-w-2xl font-semibold">
                    "{stage.subtitle}"
                  </p>

                  <p className="text-sm font-sans text-[#14213d]/70 max-w-lg leading-relaxed">
                    {stage.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="font-mono text-xs text-[#14213d]/60 pt-8 border-t border-[#e5e5e5] flex items-center justify-center gap-4">
            <span>SCROLL TO ADVANCE TRANSFORMATION</span>
            <div className="w-12 h-1 bg-[#e5e5e5] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#14213d]"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
