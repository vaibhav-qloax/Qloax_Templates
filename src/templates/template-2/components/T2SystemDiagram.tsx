"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Touchpad } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  description: string;
}

const ECOSYSTEM_NODES: NodeData[] = [
  { id: "mobile", name: "REACT NATIVE & EXPO", category: "Cross-Platform Mobile", x: 15, y: 30, description: "Native iOS & Android components with offline SQLite & WatermelonDB sync." },
  { id: "ui", name: "UI SYSTEM", category: "Design Tokens & Primitives", x: 50, y: 20, description: "120+ modular component library built with Tailwind & Framer Motion." },
  { id: "web", name: "NEXT.JS APP ROUTER", category: "Web Admin Control Plane", x: 85, y: 30, description: "High-density web administrative portals & SSR dashboards." },
  { id: "api", name: "gRPC & REST GATEWAY", category: "Low-Latency Data Bus", x: 20, y: 70, description: "Sub-50ms HTTP/2 & gRPC microservice communication gateway." },
  { id: "anpr", name: "HARDWARE & ANPR", category: "IoT & Computer Vision", x: 40, y: 80, description: "Plate recognition camera integration & acoustic sensor stream." },
  { id: "cloud", name: "ZERO-TRUST CLOUD", category: "Multi-Cloud Security", x: 60, y: 80, description: "Terraform-provisioned AWS & GCP infrastructure with JWT biometrics." },
  { id: "ai", name: "AI FRAUD ENGINE", category: "Neural Sentiment Models", x: 80, y: 70, description: "Fake review verification & automated interview evaluation kernel." },
  { id: "core", name: "QLOAX PLATFORM ENGINE", category: "Central Architecture", x: 50, y: 50, description: "Unified Mobile & Enterprise Frontend Operating Architecture." },
];

const CONNECTIONS = [
  { from: "mobile", to: "ui" },
  { from: "ui", to: "web" },
  { from: "api", to: "core" },
  { from: "anpr", to: "core" },
  { from: "cloud", to: "core" },
  { from: "ai", to: "core" },
  { from: "mobile", to: "core" },
  { from: "web", to: "cloud" },
];

export default function T2SystemDiagram() {
  const [activeNode, setActiveNode] = useState<NodeData>(ECOSYSTEM_NODES[7]);

  return (
    <section className="bg-[#090D16] text-[#F1F5F9] py-20 sm:py-24 border-b border-[#1E293B] font-sans relative overflow-hidden transition-colors duration-500">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#3B82F6]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 sm:space-y-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1E293B]"
        >
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest block font-bold">
              // FRONTEND & SYSTEM ECOSYSTEM
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#F1F5F9]">
              SYSTEM ARCHITECTURE MAP
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-md">
            Interactive node network mapping cross-platform React Native, Web, and Cloud microservices.
          </p>
        </motion.div>

        {/* Diagram Canvas Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-[#131D31]/90 border border-[#1E293B] rounded-2xl p-4 sm:p-8 md:p-10 relative overflow-hidden space-y-6 sm:space-y-8 backdrop-blur-xl shadow-2xl"
        >
          
          {/* Control Bar */}
          <div className="flex flex-wrap items-center justify-between font-mono text-xs text-slate-400 border-b border-[#1E293B] pb-4 gap-3">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[#3B82F6] animate-pulse" />
              <span className="text-[#F1F5F9] font-bold">SYSTEM SIGNAL ACTIVE</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
              <span>ACTIVE: <strong className="text-[#3B82F6]">{activeNode.name}</strong></span>
              <span className="hidden sm:inline">PROTOCOL: ENTERPRISE V2.0</span>
            </div>
          </div>

          {/* Quick Node Select Bar for Mobile / Small Screens */}
          <div className="flex sm:hidden overflow-x-auto gap-2 pb-2 scrollbar-none">
            {ECOSYSTEM_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 border transition-all ${
                  activeNode.id === node.id
                    ? "bg-[#3B82F6] text-white border-white font-bold"
                    : "bg-[#090D16] text-slate-400 border-[#1E293B]"
                }`}
              >
                {node.name}
              </button>
            ))}
          </div>

          {/* Graph Visualizer with Horizontal Scroll Container on Mobile */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="relative h-[380px] sm:h-[460px] min-w-[620px] md:min-w-0 w-full bg-[#090D16] rounded-xl border border-[#1E293B] overflow-hidden">
              
              {/* SVG Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {CONNECTIONS.map((conn, idx) => {
                  const source = ECOSYSTEM_NODES.find((n) => n.id === conn.from);
                  const target = ECOSYSTEM_NODES.find((n) => n.id === conn.to);
                  if (!source || !target) return null;

                  const isHighlight =
                    activeNode.id === source.id || activeNode.id === target.id;

                  return (
                    <line
                      key={idx}
                      x1={`${source.x}%`}
                      y1={`${source.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={isHighlight ? "#3B82F6" : "#1E293B"}
                      strokeWidth={isHighlight ? 2.5 : 1}
                      strokeDasharray={isHighlight ? "4 4" : "none"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Interactive Nodes */}
              {ECOSYSTEM_NODES.map((node) => {
                const isActive = activeNode.id === node.id;
                const isCenter = node.id === "core";

                return (
                  <motion.button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    onMouseEnter={() => setActiveNode(node)}
                    whileHover={{ scale: 1.08 }}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-lg border transition-all duration-200 font-mono text-xs flex flex-col items-center gap-0.5 shadow-md ${
                      isActive
                        ? "bg-[#3B82F6] text-white border-white scale-105 sm:scale-110 z-20 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                        : isCenter
                        ? "bg-[#131D31] border-[#3B82F6] text-[#F1F5F9] z-10"
                        : "bg-[#131D31] border-[#1E293B] text-slate-300 hover:border-slate-500 z-10"
                    }`}
                  >
                    <span className="font-bold tracking-tight text-[10px] sm:text-[11px] font-sans whitespace-nowrap">{node.name}</span>
                    <span
                      className={`text-[8px] sm:text-[9px] whitespace-nowrap ${
                        isActive ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {node.category}
                    </span>
                  </motion.button>
                );
              })}

            </div>
          </div>

          {/* Selected Node Details Inspector */}
          <div className="bg-[#090D16] border border-[#1E293B] p-5 sm:p-6 rounded-xl font-mono text-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E293B] pb-3 gap-2">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-[#3B82F6] rounded-full animate-pulse shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-[#F1F5F9] uppercase font-sans">
                  {activeNode.name} SPECIFICATION
                </h3>
              </div>
              <span className="text-[#3B82F6] font-semibold text-[11px] sm:text-xs">{activeNode.category}</span>
            </div>

            <p className="text-slate-300 font-sans text-xs sm:text-sm font-light leading-relaxed">
              {activeNode.description}
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
