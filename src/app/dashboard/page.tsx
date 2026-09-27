"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Eye, CheckCircle2, ArrowRight, X } from "lucide-react";

interface TemplateInfo {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  route: string;
  keyFeatures: string[];
  visualTheme: string;
}

const TEMPLATES: TemplateInfo[] = [
  {
    id: "template-1",
    number: "Template 01",
    name: "Cinematic Engineering",
    tagline: "Inspired by Bohdan.design interaction quality & continuous motion",
    description:
      "A high-impact cinematic experience featuring oversized typography reveals, pinned horizontal scroll showcases, scale-masked project reveals, magnetic custom cursor, and continuous section transformations.",
    route: "/templates/template-1",
    keyFeatures: [
      "Bohdan-style visual movement & cursor interactions",
      "Interactive capabilities transformation engine",
      "Scroll-driven video & image clip mask reveals",
      "Sticky split editorial project case studies",
    ],
    visualTheme: "Ultra-Dark Cinematic & Oversized Typography",
  },
  {
    id: "template-2",
    number: "Template 02",
    name: "Intelligent Systems",
    tagline: "Architecture-focused digital ecosystem with node visualization",
    description:
      "A technical intelligence experience built around an interactive node network diagram, system data-flow visualizer, editorial grid layouts, and structured Problem-Engineering-Outcome matrixes.",
    route: "/templates/template-2",
    keyFeatures: [
      "Interactive SVG system architecture diagram",
      "Live data flow signal node highlights",
      "Editorial product grid compositions",
      "Technical HUD elements & line grids",
    ],
    visualTheme: "Technical Minimalist & Node Architecture",
  },
  {
    id: "template-3",
    number: "Template 03",
    name: "Future of Industry",
    tagline: "Industrial technology visual story with camera movement",
    description:
      "An industrial engineering showcase featuring vertical scroll-driven narrative stages, red precision gridlines, heavy industrial photography transformations, and future-facing product choreography.",
    route: "/templates/template-3",
    keyFeatures: [
      "6-Stage industrial transformation story",
      "Parallax camera depth scroll movement",
      "Industrial technology product ecosystem",
      "Red precision technical line accents",
    ],
    visualTheme: "Industrial Future & Machine Precision",
  },
];

export default function DashboardPage() {
  const [activeTemplate, setActiveTemplate] = useState<string>("template-1");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateInfo | null>(null);

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-200 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Simple Header */}
        <header className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#C40024] rounded-full"></span>
              <h1 className="text-xl font-bold text-white tracking-wide uppercase">
                QLOAX Website Builder
              </h1>
            </div>
            <p className="text-sm text-neutral-400 mt-1">
              Internal Template Selector & Administrative Workspace
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded text-xs text-neutral-300">
            <span className="text-neutral-500">Active Selection:</span>
            <span className="font-semibold text-white">
              {TEMPLATES.find((t) => t.id === activeTemplate)?.name}
            </span>
          </div>
        </header>

        {/* Info Banner */}
        <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded text-xs text-neutral-400 space-y-1">
          <p className="font-medium text-neutral-300">
            System Notice:
          </p>
          <p>
            The dashboard is an administrative template switcher. Each website concept below is a completely independent architectural build with its own layout, hero, typography, motion system, and interactive components.
          </p>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMPLATES.map((tmpl) => {
            const isActive = activeTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                className={`flex flex-col justify-between bg-neutral-900 border rounded-lg p-6 transition-all duration-200 ${
                  isActive
                    ? "border-[#C40024] ring-1 ring-[#C40024]/40"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      {tmpl.number}
                    </span>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                        <CheckCircle2 size={12} />
                        Active
                      </span>
                    ) : (
                      <button
                        onClick={() => setActiveTemplate(tmpl.id)}
                        className="text-[11px] text-neutral-400 hover:text-white underline underline-offset-4"
                      >
                        Set Active
                      </button>
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white tracking-tight">
                      {tmpl.name}
                    </h2>
                    <p className="text-xs text-[#C40024] font-medium mt-0.5">
                      {tmpl.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {tmpl.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">
                      Highlights:
                    </span>
                    <ul className="space-y-1">
                      {tmpl.keyFeatures.map((feat, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-neutral-300 flex items-start gap-1.5"
                        >
                          <span className="text-[#C40024] font-bold">•</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between gap-3 mt-6">
                  <button
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 transition-colors"
                  >
                    <Eye size={14} />
                    Preview
                  </button>

                  <Link
                    href={tmpl.route}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#C40024] hover:bg-[#E0002A] text-white rounded transition-colors"
                  >
                    Open
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Footer */}
        <footer className="pt-8 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>QLOAX Internal Engineering Portal</span>
          <span>Positioning: "ENGINEERING Intelligence, Empowering Industry."</span>
        </footer>

      </div>

      {/* Modal Live Preview */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="px-4 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400">
                  Preview Mode:
                </span>
                <span className="text-sm font-semibold text-white">
                  {previewTemplate.name}
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  ({previewTemplate.route})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={previewTemplate.route}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-[#C40024] hover:text-[#E0002A] font-medium"
                >
                  Open Full Screen
                  <ExternalLink size={12} />
                </Link>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1 text-neutral-400 hover:text-white rounded bg-neutral-800"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Iframe View */}
            <div className="flex-1 bg-black relative">
              <iframe
                src={previewTemplate.route}
                className="w-full h-full border-none"
                title={`Preview ${previewTemplate.name}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
