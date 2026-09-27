"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Maximize2, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import LiquidEther from "@/components/shared/LiquidEther";

interface TemplateInfo {
  id: string;
  number: string;
  name: string;
  route: string;
}

const TEMPLATES: TemplateInfo[] = [
  {
    id: "template-1",
    number: "Template 01",
    name: "Cinematic Engineering",
    route: "/templates/template-1",
  },
  {
    id: "template-2",
    number: "Template 02",
    name: "Intelligent Systems",
    route: "/templates/template-2",
  },
  {
    id: "template-3",
    number: "Template 03",
    name: "Future of Industry",
    route: "/templates/template-3",
  },
];

export default function DashboardPage() {
  const [activeTemplate, setActiveTemplate] = useState<string>("template-1");

  return (
    <div className="relative min-h-screen bg-[#050508] text-white font-sans overflow-x-hidden">
      {/* Background Liquid Ether WebGL Fluid Simulation */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-auto">
        <LiquidEther
          colors={["#5227FF", "#FF007A", "#00F0FF", "#B19EEF"]}
          mouseForce={28}
          cursorSize={120}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          resolution={0.5}
          BFECC={true}
        />
      </div>

      {/* Atmospheric Subtle Overlay Grid */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 space-y-6 sm:space-y-8">
        
        {/* Sleek Bright Header */}
        <header className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_8px_32px_0_rgba(82,39,255,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F0FF]"></span>
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-400">
                QLOAX TEMPLATE HUB
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 pl-5 sm:pl-6">
              Interactive Website Showcase & Preview Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md self-start md:self-auto">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
            <span className="text-xs text-neutral-400">Active:</span>
            <span className="text-xs font-semibold text-cyan-300">
              {TEMPLATES.find((t) => t.id === activeTemplate)?.name}
            </span>
          </div>
        </header>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {TEMPLATES.map((tmpl) => {
            const isActive = activeTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                className={`group relative flex flex-col justify-between bg-black/50 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(82,39,255,0.3)] ${
                  isActive
                    ? "border-cyan-400/80 ring-2 ring-cyan-400/30 shadow-[0_0_30px_rgba(0,240,255,0.25)]"
                    : "border-white/10 hover:border-purple-500/60"
                }`}
              >
                {/* Card Header Bar */}
                <div className="p-3.5 sm:p-4 bg-white/5 border-b border-white/10 flex items-center justify-between z-10 gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider shrink-0">
                      {tmpl.number}
                    </span>
                    <span className="text-white/30 shrink-0">•</span>
                    <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                      {tmpl.name}
                    </h2>
                  </div>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-cyan-300 bg-cyan-500/20 border border-cyan-400/40 px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.3)] shrink-0">
                      <CheckCircle2 size={12} />
                      Active
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveTemplate(tmpl.id)}
                      className="text-[10px] sm:text-[11px] text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 transition-colors shrink-0"
                    >
                      Set Active
                    </button>
                  )}
                </div>

                {/* Live Website Homepage Preview Container */}
                <div className="relative w-full aspect-[16/10] bg-black overflow-hidden group/preview">
                  {/* Scaled Live Webpage inside Card */}
                  <div className="absolute inset-0 w-[250%] h-[250%] origin-top-left transform scale-[0.4] pointer-events-none select-none">
                    <iframe
                      src={tmpl.route}
                      className="w-full h-full border-0 pointer-events-none"
                      title={tmpl.name}
                      loading="lazy"
                    />
                  </div>

                  {/* Hover Overlay Button to Open Full Screen in New Tab */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <Link
                      href={tmpl.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <Maximize2 size={14} />
                      Full Screen Preview
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3.5 sm:p-4 bg-white/5 border-t border-white/10 flex items-center gap-2.5 sm:gap-3">
                  <Link
                    href={tmpl.route}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-cyan-500/20 hover:border-cyan-400/50 text-white border border-white/15 transition-all duration-200"
                  >
                    <Maximize2 size={13} className="text-cyan-400 shrink-0" />
                    <span className="truncate">Full Screen Preview</span>
                    <ExternalLink size={11} className="text-neutral-400 shrink-0 hidden xs:inline" />
                  </Link>

                  <Link
                    href={tmpl.route}
                    className="inline-flex items-center justify-center p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                    title="Navigate to Template Page"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Footer */}
        <footer className="pt-6 border-t border-white/10 text-xs text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <span className="font-mono text-neutral-400">QLOAX Website Engine</span>
          <span className="text-cyan-400/80 font-medium">Liquid Ether Fluid Dynamics Integration</span>
        </footer>

      </div>
    </div>
  );
}
