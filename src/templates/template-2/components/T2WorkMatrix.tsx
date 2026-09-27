"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  impactMetrics: { label: string; value: string }[];
  overview: string;
  mobileArchitecture: string[];
  techStack: string[];
  image: string;
}

const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "teacher-mobile-app",
    number: "01",
    title: "Teacher Mobile App & School Information System",
    subtitle: "EduNexus Institutional Mobile Platform",
    category: "React Native / Expo Mobile App",
    impactMetrics: [
      { label: "SYSTEM UPTIME", value: "99.9%" },
      { label: "ACTIVE USERS", value: "45,000+" },
      { label: "ADMIN EFFICIENCY BOOST", value: "60%" },
      { label: "MODULAR COMPONENTS", value: "120+" },
    ],
    overview:
      "A cross-platform React Native and Expo mobile app built for teachers and administrators. Features offline-first gradebook caching, instant attendance biometric scanning, and real-time synchronization.",
    mobileArchitecture: [
      "Offline-first SQLite & WatermelonDB sync kernel",
      "Expo SDK custom native module extensions",
      "Dynamic gradebook math processing engine",
      "Role-based JWT encryption & biometrics",
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "client-mobile-admin-portal",
    number: "02",
    title: "Client Mobile App & Administrative Portal",
    subtitle: "QHR & Society Management System",
    category: "Mobile App + Web Control Portal",
    impactMetrics: [
      { label: "API LATENCY", value: "< 50ms" },
      { label: "COMPLEXES DEPLOYED", value: "85+ Sites" },
      { label: "ANPR ACCURACY", value: "100%" },
      { label: "VERIFICATION SPEED", value: "3.5x Faster" },
    ],
    overview:
      "A unified multi-tenant ecosystem featuring a sleek React Native client app for residents and a high-density web admin portal for security managers. Integrates ANPR plate recognition hardware.",
    mobileArchitecture: [
      "Cross-platform shared React component design system",
      "Real-time WebSocket visitor gatepass validation",
      "Automated utility billing webhooks & payment gateways",
      "Granular role-based security access matrices",
    ],
    techStack: ["React Native", "Expo", "Next.js", "TypeScript", "Tailwind CSS", "Redis"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "fake-review-detection",
    number: "03",
    title: "Fake Review Detection & AI Evaluation Engine",
    subtitle: "IntervuAI & RevGen Fraud Analytics",
    category: "AI & Machine Intelligence",
    impactMetrics: [
      { label: "DETECTION ACCURACY", value: "98.4%" },
      { label: "REVIEWS ANALYZED", value: "1.2M+" },
      { label: "SCREENING VELOCITY", value: "4.2x" },
      { label: "EXECUTION TIME", value: "Sub-Second" },
    ],
    overview:
      "An enterprise machine learning evaluation engine and review fraud detection protocol. Analyzes user sentiment patterns, IP telemetry, and code execution outputs to eliminate fraudulent reviews.",
    mobileArchitecture: [
      "NLP sentiment analyzer & Transformer model pipelines",
      "Real-time candidate code execution isolation sandbox",
      "Interactive analytics dashboard built with WebGL charts",
      "Automated threat alert webhooks & margin protection rules",
    ],
    techStack: ["Python", "FastAPI", "PyTorch", "React", "TypeScript", "Vector DB"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600",
  },
];

export default function T2WorkMatrix() {
  return (
    <section id="projects" className="bg-[#FFFFFF] text-slate-900 py-24 border-b border-slate-200/80 font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200"
        >
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#2563EB] font-bold uppercase tracking-widest block">
              // FEATURED CASE STUDIES & METRICS
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-900 uppercase">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-slate-600 text-sm font-sans max-w-md">
            Quantifiable performance metrics, modular component scalability, and verified production deployments.
          </p>
        </motion.div>

        {/* Project Cards Grid - White Crystal Theme */}
        <div className="space-y-16">
          {FEATURED_PROJECTS.map((proj, index) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:border-[#2563EB]/50 hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] transition-all duration-300 group"
            >
              {/* Top Impact Metrics Strip */}
              <div className="bg-slate-50/80 border-b border-slate-200/80 p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {proj.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-medium">
                      {metric.label}
                    </span>
                    <div className="font-display font-bold text-2xl sm:text-3xl text-[#1E40AF]">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12 items-center">
                
                {/* Details Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#1D4ED8] bg-[#2563EB]/10 px-2.5 py-1 rounded border border-[#2563EB]/20">
                        PROJECT {proj.number}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {proj.category}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight">
                      {proj.title}
                    </h3>

                    <p className="font-mono text-xs text-slate-500">
                      "{proj.subtitle}"
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed font-sans font-normal">
                    {proj.overview}
                  </p>

                  {/* Architecture & Highlights */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    <span className="font-mono text-xs text-[#1D4ED8] uppercase tracking-wider block font-bold">
                      TECHNICAL HIGHLIGHTS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {proj.mobileArchitecture.map((arch, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#2563EB] shrink-0 mt-0.5" />
                          <span>{arch}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5 font-mono text-xs">
                    <span className="text-slate-400 uppercase text-[10px] tracking-wider mr-2 font-bold">
                      STACK:
                    </span>
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Showcase Column */}
                <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-mono shadow-md">
                    <span className="text-slate-800 font-bold">EXPO / REACT NATIVE</span>
                    <span className="text-[#2563EB] font-bold flex items-center gap-1">
                      VERIFIED <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
